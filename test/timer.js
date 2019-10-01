const chai = require('chai');
const expect = chai.expect;
const Timer = require('../src/timer.js')

describe('timer', () => {
  it('calculate 0 working days', async() => {
      var timer = new Timer(9, 18)
      var time = timer.timeBetween(new Date(), new Date())

      expect(time).to.equal(0)
  });

  it('calculate 1 working day during week', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 10));
    var end = new Date(Date.UTC(2019, 09, 02, 10));

    var timer = new Timer(9, 18)
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(1)
  });

  it('calculate multiple working days during week', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 10));
    var end = new Date(Date.UTC(2019, 09, 03, 10));

    var timer = new Timer(9, 18)
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(2)
  });

  it('calculate 2 working day between friday and tuesday', async() => {
    var start = new Date(Date.UTC(2019, 09, 04, 10));
    var end = new Date(Date.UTC(2019, 09, 08, 10));

    var timer = new Timer(9, 18)
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(2)
  });

  it('calculate 1 full working day using effective hours', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 09));
    var end = new Date(Date.UTC(2019, 09, 01, 18));

    var timer = new Timer(9, 18)
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(1)
  });

  it('calculate rounded 0 working day using effective hours', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 09));
    var end = new Date(Date.UTC(2019, 09, 01, 12));

    var timer = new Timer(9, 18)
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(0)
  });

  it('calculate rounded 1 working day between two working days', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 12));
    var end = new Date(Date.UTC(2019, 09, 02, 12));

    var timer = new Timer(9, 18)
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(1)
  });
});
