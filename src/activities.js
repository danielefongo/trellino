const Activity = require('./activity.js')

module.exports = function(date, timer) {
    this.timer = timer
    this.last_activity_date = date;
    this.last_activity = undefined;
    this.activities = {}
    
    this.get = function(listId) { 
        if(this.activities[listId] == undefined)
            return "{}"
        if(listId === this.last_activity.id) {
            this.last_activity.time = this.__calculate_date(new Date(), this.last_activity_date) + this.activities[listId].time
            return this.last_activity
        }
        return this.activities[listId]
    }

    this.add = function(oldList, newList, date) {
        this.__initialize_activity(oldList)
        this.__initialize_activity(newList)

        this.activities[oldList.id].time += this.__calculate_date(date, this.last_activity_date)
        this.last_activity_date = date
        this.last_activity = this.__create_activity_from(newList)
    }

    this.getAll = function() {
        return Object.keys(this.activities).map(function (key) {
            return this.get(key)
        }, this);
    }

    this.__calculate_date = function(newDate, oldDate) {
        return this.timer.timeBetween(oldDate, newDate)
    }

    this.__initialize_activity = function(list) {
        if(this.activities[list.id] == undefined)
            this.activities[list.id] = this.__create_activity_from(list)
    }

    this.__create_activity_from = function(list) {
        return new Activity(list.id, list.name)
    }
}