module.exports = function(morningHours, eveningHours) {
    this.timeBetween = function(startDate, endDate) {
        var result = 0
        
        var currentDate = startDate;

        while (just_day(currentDate) < just_day(endDate)) {
            result += calculate_hours(currentDate, eveningHours.end)
            currentDate.setUTCDate(currentDate.getUTCDate() + 1); 
            currentDate.setUTCHours(morningHours.start); 
        }
        result += calculate_hours(currentDate, endDate.getUTCHours())
        
        return Math.floor(result)
    };

    function calculate_hours(date, lastHour) {
        var actualHour = date.getUTCHours()
        
        var hours = 0
        if(is_working_day(date) && actualHour < lastHour) {
            hours = lastHour - actualHour
        
            if(actualHour < morningHours.end && eveningHours.start < lastHour)
                hours -= (eveningHours.start - morningHours.end)
        }
        
        return hours
    }

    function is_working_day(date) {
        var day = date.getDay();
        return day != 0 && day != 6
    }

    function just_day(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    }
}