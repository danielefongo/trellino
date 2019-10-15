const chai = require('chai');
const expect = chai.expect;
const Activities = require('../src/activities.js')
const FakeTimer = require('./fakeTimer.js')

describe('activities', () => {
  let timer = new FakeTimer()

  function list(id) { return {id: id, name: "anyName" }}

  it('with zero activity', async() => {
    let activities = new Activities(new Date(), timer, list("actualList"))
    expect(activities.get("actualList").time).to.be.equal(0);
  });

  it('with one activity', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);

    let activities = new Activities(creationDate, timer, list("anyList"))
    
    activities.add(list("oldList"), list("anyList"), oneSecondAfterCreationDate)
    expect(activities.get("oldList").time).to.be.equal(1);
  });

  it('with two activities', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);

    let activities = new Activities(creationDate, timer, list("anyList"))
    
    activities.add(list("oldList"), list("anyList"), oneSecondAfterCreationDate)
    activities.add(list("newList"), list("anyList"), twoSecondAfterCreationDate)
    
    expect(activities.get("oldList").time).to.be.equal(1);
    expect(activities.get("newList").time).to.be.equal(1);
  });

  it('update activity by adding time', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);
    let threeSecondAfterCreationDate = datePlusSeconds(creationDate, 3);

    let activities = new Activities(creationDate, timer, list("anyList"))
    
    activities.add(list("oldList"), list("anyList"), oneSecondAfterCreationDate)
    activities.add(list("newList"), list("anyList"), twoSecondAfterCreationDate)
    activities.add(list("oldList"), list("anyList"), threeSecondAfterCreationDate)
    
    expect(activities.get("oldList").time).to.be.equal(2);
  });

  it('get time for zero activities using the actual list', async() => {
    let creationDate = datePlusSeconds(new Date(), -1);

    let activities = new Activities(creationDate, timer, list("actualList"))
    
    expect(activities.get("actualList").time).to.be.equal(1);
  });

  it('get time for unique activity using a never used list', async() => {
    let creationDate = datePlusSeconds(new Date(), -1);
    let oneSecondAfterCreationDate = new Date();

    let activities = new Activities(creationDate, timer, list("neverSeenList"))
    
    activities.add(list("oldList"), list("neverSeenList"), oneSecondAfterCreationDate)
    expect(activities.get("neverSeenList").time).to.be.equal(0);
  });

  it('get time for the last added activity using actual time', async() => {
    let creationDate = datePlusSeconds(new Date(), -2)
    let oneSecondBeforeNow = datePlusSeconds(new Date(), -1)

    let activities = new Activities(creationDate, timer, list("oldList"))
  
    activities.add(list("oldList"), list("newList"), creationDate)
    activities.add(list("newList"), list("oldList"), oneSecondBeforeNow)
    
    expect(activities.get("oldList").time).to.be.equal(1);
  });
  
  it('get properly formed activities', async() => {
    let oneSecondAfterCreationDate = new Date();
    let creationDate = datePlusSeconds(oneSecondAfterCreationDate, -1)

    let activities = new Activities(creationDate, timer, list("newList"))
    
    activities.add(list("oldList"), list("newList"), oneSecondAfterCreationDate)
    expect(activities.get("oldList").time).to.be.equal(1);
    expect(activities.get("oldList").id).to.be.equal("oldList");
    expect(activities.get("oldList").name).to.be.equal("anyName");
    expect(activities.get("newList").time).to.be.equal(0);
    expect(activities.get("newList").id).to.be.equal("newList");
    expect(activities.get("newList").name).to.be.equal("anyName");
  });

  it('get all activities', async() => {
    let creationDate = datePlusSeconds(new Date(), -2)
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);

    let activities = new Activities(creationDate, timer, list("actualList"))
    
    activities.add(list("oldList"), list("newList"), oneSecondAfterCreationDate)
    activities.add(list("newList"), list("oldList"), twoSecondAfterCreationDate)
    
    expect(activities.getAll()).to.include.deep.members([
      {id: "oldList", name: "anyName", time: 1}, 
      {id: "newList", name: "anyName", time: 1} 
    ]);
  });

  function datePlusSeconds(date, seconds) {
    return new Date(date.getTime() + seconds * 1000)
  }
});
