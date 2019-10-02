module.exports = function(id, name, time) {
    this.id = id
    this.name = name
    this.time = initializeTime(time)

    function initializeTime(time) {
        if(time === undefined)
            return 0
        return time
    }
}