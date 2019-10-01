module.exports = function(date) {
    this.date = date;
    this.activities = {}
    this.get = function(list) {
        if(this.activities[list] !== undefined)
            return this.activities[list]
        return ""
    }
    this.add = function(list, date) {
        this.activities[list.listBefore] = (date - this.date) / 1000
    }
}