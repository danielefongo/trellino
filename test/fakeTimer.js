module.exports = function() {
    this.timeBetween = function(startDate, endDate) {
        return Math.floor((endDate - startDate) / 1000)
    };
}