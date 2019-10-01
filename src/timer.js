module.exports = function(startHour, endHour) {
    this.dayLength = endHour - startHour
    this.timeBetween = function(startDate, endDate) {
        var result = 0
        
        var currentDate = startDate;

        while (just_day(currentDate) < just_day(endDate)) {
            if(is_working_day(currentDate)) {
                result += calculate_hours(currentDate.getUTCHours(), endHour)
            }
            currentDate.setDate(currentDate.getDate() + 1); 
            currentDate.setUTCHours(startHour); 
        }
        if(is_working_day(currentDate)) {
            result += calculate_hours(currentDate.getUTCHours(), endDate.getUTCHours())
        }
        return Math.floor(result / this.dayLength)
    };

    function calculate_hours(first, last) {
        if(first < last)
            return last - first
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