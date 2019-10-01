const chai = require('chai');
const expect = chai.expect;
const Activities = require('../src/activities.js')

describe('activities', () => {
  it('with zero activity', async() => {
    let activities = new Activities(new Date())
    expect(activities.get("aList")).to.be.empty;
  });

  it('with one activity', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);

    let activities = new Activities(creationDate)
    
    activities.add("oldList", "anyList", oneSecondAfterCreationDate)
    expect(activities.get("oldList")).to.be.equal(1);
  });

  it('with two activities', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);

    let activities = new Activities(creationDate)
    
    activities.add("oldList", "anyList", oneSecondAfterCreationDate)
    activities.add("newList", "anyList", twoSecondAfterCreationDate)
    
    expect(activities.get("oldList")).to.be.equal(1);
    expect(activities.get("newList")).to.be.equal(1);
  });

  it('update activity by adding time', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);
    let threeSecondAfterCreationDate = datePlusSeconds(creationDate, 3);

    let activities = new Activities(creationDate)
    
    activities.add("oldList", "anyList", oneSecondAfterCreationDate)
    activities.add("newList", "anyList", twoSecondAfterCreationDate)
    activities.add("oldList", "anyList", threeSecondAfterCreationDate)
    
    expect(activities.get("oldList")).to.be.equal(2);
  });

  it('get rounded time for unique activity using a never used list', async() => {
    let creationDate = datePlusSeconds(new Date(), -1);
    let oneSecondAfterCreationDate = new Date();

    let activities = new Activities(creationDate)
    
    activities.add("oldList", "neverSeenList", oneSecondAfterCreationDate)
    expect(activities.get("neverSeenList")).to.be.equal(0);
  });

  it('get rounded time for the last added activity using actual time', async() => {
    let creationDate = datePlusSeconds(new Date(), -2)
    let oneSecondBeforeNow = datePlusMilliseconds(new Date(), -1400)

    let activities = new Activities(creationDate)
  
    activities.add("oldList", "newList", creationDate)
    activities.add("newList", "oldList", oneSecondBeforeNow)
    
    expect(activities.get("oldList")).to.be.equal(1);

  });

  function datePlusSeconds(date, seconds) {
    return new Date(date.getTime() + seconds * 1000)
  }

  function datePlusMilliseconds(date, ms) {
    return new Date(date.getTime() + ms)
  }
});
