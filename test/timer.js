const chai = require('chai');
const expect = chai.expect;
const Timer = require('../src/timer.js')

describe('timer', () => {
  it('calculate 0 working days', async() => {
      var timer = new Timer()
      var time = timer.timeBetween(new Date(), new Date())

      expect(time).to.equal(0)
  });

  it('calculate 1 working day during week', async() => {
    var start = new Date(Date.UTC(2019, 09, 01));
    var end = new Date(Date.UTC(2019, 09, 02));

    var timer = new Timer()
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(1)
  });

  it('calculate multiple working days during week', async() => {
    var start = new Date(Date.UTC(2019, 09, 01));
    var end = new Date(Date.UTC(2019, 09, 03));

    var timer = new Timer()
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(2)
  });

  it('calculate 2 working day between friday and tuesday', async() => {
    var start = new Date(Date.UTC(2019, 09, 04));
    var end = new Date(Date.UTC(2019, 09, 08));

    var timer = new Timer()
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(2)
  });
});
