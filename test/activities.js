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
    let oneSecondAfterCreationDate = new Date(creationDate.getTime() + 1000);

    let activities = new Activities(creationDate)
    
    activities.add({listBefore: "oldList", listAfter: "newList"}, oneSecondAfterCreationDate)
    expect(activities.get("oldList")).to.be.equal(1);
  });

  it('with two activities', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = new Date(creationDate.getTime() + 1000);
    let twoSecondAfterCreationDate = new Date(creationDate.getTime() + 2000);

    let activities = new Activities(creationDate)
    
    activities.add({listBefore: "oldList", listAfter: "newList"}, oneSecondAfterCreationDate)
    activities.add({listBefore: "newList", listAfter: "oldList"}, twoSecondAfterCreationDate)
    
    expect(activities.get("oldList")).to.be.equal(1);
    expect(activities.get("newList")).to.be.equal(1);
  });
});
