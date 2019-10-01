require('dotenv').config()
var Trello = require("trello");
var trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);

function trelloDate(dateString) {
    return new Date(1000*parseInt(dateString.substring(0,8),16))
}

function logObject(list, time) {
    return {
        id: list.id,
        name: list.name,
        time: time / 1000
    }
}

function processArray(items, process) {
    var todo = items.concat();

    setTimeout(function() {
        process(todo.shift());
        if(todo.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

trello.getCardsOnBoard(process.env.BOARD_ID).then((cards) => {
    processArray(cards, function(card) {
        trello.makeRequest('get', '/1/cards/' + card.shortLink + '/actions', { webhooks: true })
        .then((activities) => {
            activities = activities.reverse().filter((activity) => activity.type == "updateCard")

            if(activities.length === 0)
                return
            
            var start = logObject(
                activities[0].data.listBefore,
                trelloDate(activities[0].id) - trelloDate(card.id))

            var log = activities.map((activity, index) => {
                if(activities[index + 1] == undefined)
                    nextDate = new Date()
                else
                    nextDate = trelloDate(activities[index + 1].id)
                return logObject(activity.data.listAfter, nextDate - trelloDate(activity.id))
            });

            log.unshift(start)

            var times = {}
            log.forEach(log => {
                if(times[log.id] == undefined) {
                    times[log.id] = {}
                    times[log.id].time = 0
                }
                times[log.id].name = log.name
                times[log.id].time += log.time
            })

            console.log("Card #" + card.idShort)
            console.log(times)
        });
    });
})