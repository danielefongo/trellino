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
        this.activities[list.listBefore] = __calculate_date(date, this.last_activity_date)
        this.last_activity_date = date
    }

    __calculate_date = function(newDate, oldDate) {
        return (newDate - oldDate) / 1000
    }
}