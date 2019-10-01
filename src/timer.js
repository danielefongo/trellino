module.exports = function() {
    this.timeBetween = function(startDate, endDate) {
        var result = 0
        
        var currentDate = startDate;

        while (__just_day(currentDate) < __just_day(endDate)) {
            var weekDay = currentDate.getDay();
            if(weekDay != 0 && weekDay != 6)
                result+=8;
    
            currentDate.setDate(currentDate.getDate() + 1); 
        }
        result += hoursBetween(currentDate, endDate)
        return Math.floor(result / 8)
    };

    function hoursBetween(startDate, endDate) {
        return (endDate - startDate) / (1000 * 60 * 60)
    }

    function __just_day(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    }
}