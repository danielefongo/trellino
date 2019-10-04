const chai = require('chai');
const expect = chai.expect;
const Timer = require('../src/timer.js')
const UtcHoursInterval = require('../src/utcHoursInterval.js')

describe('timer', () => {
  it('calculate 0 working hours', async() => {
      var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
      var time = timer.timeBetween(new Date(), new Date())

      expect(time).to.equal(0)
  });

  it('calculate 8 hours for 1 working day during week', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 09));
    var end = new Date(Date.UTC(2019, 09, 01, 18));

    var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(8)
  });

  it('calculate 16 hours for 2 working days during week', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 09));
    var end = new Date(Date.UTC(2019, 09, 02, 18));

    var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(16)
  });

  it('calculate 16 hours for 2 working day between friday and tuesday', async() => {
    var start = new Date(Date.UTC(2019, 09, 04, 09));
    var end = new Date(Date.UTC(2019, 09, 07, 18));

    var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(16)
  });

  it('calculate 3 working hours using', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 09));
    var end = new Date(Date.UTC(2019, 09, 01, 12));

    var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(3)
  });

  it('calculate 8 hours between two working days', async() => {
    var start = new Date(Date.UTC(2019, 09, 01, 12));
    var end = new Date(Date.UTC(2019, 09, 02, 12));

    var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(8)
  });

  it('calculate 8 hours with a weekend between', async() => {
    var start = new Date(Date.UTC(2019, 09, 04, 12));
    var end = new Date(Date.UTC(2019, 09, 07, 12));

    var timer = new Timer(new UtcHoursInterval(9, 13), new UtcHoursInterval(14, 18))
    var time = timer.timeBetween(start, end)

    expect(time).to.equal(8)
  });
});
