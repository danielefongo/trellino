module.exports = function(startHour, endHour) {
    this.dayLength = endHour - startHour
    this.timeBetween = function(startDate, endDate) {
        var result = 0
        
        var currentDate = startDate;

        while (just_day(currentDate) < just_day(endDate)) {
            result += calculate_hours(currentDate, endHour)
            currentDate.setUTCDate(currentDate.getUTCDate() + 1); 
            currentDate.setUTCHours(startHour); 
        }
        result += calculate_hours(currentDate, endDate.getUTCHours())
        
        return Math.floor(result / this.dayLength)
    };

    function calculate_hours(date, lastHour) {
        var actualHour = date.getUTCHours()
        
        if(is_working_day(date) && actualHour < lastHour)
            return lastHour - actualHour
        return 0
    }

    function is_working_day(date) {
        var day = date.getDay();
        return day != 0 && day != 6
    }

    function just_day(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    }
}