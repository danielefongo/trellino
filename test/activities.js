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
    
    activities.add("oldList", oneSecondAfterCreationDate)
    expect(activities.get("oldList")).to.be.equal(1);
  });

  it('with two activities', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);

    let activities = new Activities(creationDate)
    
    activities.add("oldList", oneSecondAfterCreationDate)
    activities.add("newList", twoSecondAfterCreationDate)
    
    expect(activities.get("oldList")).to.be.equal(1);
    expect(activities.get("newList")).to.be.equal(1);
  });

  it('update activity by adding time', async() => {
    let creationDate = new Date()
    let oneSecondAfterCreationDate = datePlusSeconds(creationDate, 1);
    let twoSecondAfterCreationDate = datePlusSeconds(creationDate, 2);
    let threeSecondAfterCreationDate = datePlusSeconds(creationDate, 3);

    let activities = new Activities(creationDate)
    
    activities.add("oldList", oneSecondAfterCreationDate)
    activities.add("newList", twoSecondAfterCreationDate)
    activities.add("oldList", threeSecondAfterCreationDate)
    
    expect(activities.get("oldList")).to.be.equal(2);
  });

  function datePlusSeconds(date, seconds) {
    return new Date(date.getTime() + seconds * 1000)
  }
});
