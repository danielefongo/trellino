module.exports = function(date) {
    this.creation_date = date;
    this.last_activity_date = date;
    this.activities = {}
    this.get = function(list) {
        if(this.activities[list] !== undefined)
            return this.activities[list]
        return ""
    }
    this.add = function(list, date) {
        if(this.activities[list] == undefined)
            this.activities[list] = 0
        this.activities[list] += __calculate_date(date, this.last_activity_date)
        this.last_activity_date = date
    }

    __calculate_date = function(newDate, oldDate) {
        return (newDate - oldDate) / 1000
    }
}