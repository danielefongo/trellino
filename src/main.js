require('dotenv').config()
var Trello = require("trello");
const Activities = require("./activities.js");
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
            
            var log = new Activities(trelloDate(card.id))

            if(activities.length === 0)
            return

            for(var i = 0; i < activities.length; i++) {
                log.add(activities[i].data.listBefore.id, activities[i].data.listAfter.id, trelloDate(activities[i].id))
            }
        
            console.log("Card #" + card.idShort)
            console.log(log.getAll())
        });
    });
})