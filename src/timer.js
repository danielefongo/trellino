module.exports = function() {
    this.timeBetween = function(startDate, endDate) {
        var result = 0
        
        var currentDate = startDate;

        while (currentDate < endDate) {
            var weekDay = currentDate.getDay();
            if(weekDay != 0 && weekDay != 6)
                result++;
    
            currentDate.setDate(currentDate.getDate() + 1); 
        }
        return result
    };
}