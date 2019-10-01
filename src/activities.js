module.exports = function(date) {
    this.last_activity_date = date;
    this.last_activity_list = undefined;
    this.activities = {}
    
    this.get = function(list) {
        if(list === this.last_activity_list)
            return __calculate_date(new Date(), this.last_activity_date) + this.activities[list]
        if(this.activities[list] !== undefined)
            return this.activities[list]

        return ""
    }
    this.add = function(oldList, newList, date) {
        if(this.activities[oldList] == undefined)
            this.activities[oldList] = 0
        this.activities[oldList] += __calculate_date(date, this.last_activity_date)
        this.last_activity_date = date
        this.last_activity_list = newList
    }

    __calculate_date = function(newDate, oldDate) {
        return Math.floor((newDate - oldDate) / 1000)
    }
}