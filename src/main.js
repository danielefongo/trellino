require('dotenv').config()
var Trello = require("trello");
const Activities = require("./activities.js");
const Timer = require("./timer.js");
var trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);
var timer = new Timer(8, 17)

function trelloDate(dateString) {
    return new Date(1000*parseInt(dateString.substring(0,8),16))
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
            
            var log = new Activities(trelloDate(card.id), timer)

            if(activities.length === 0)
            return

            for(var i = 0; i < activities.length; i++) {
                log.add(activities[i].data.listBefore, activities[i].data.listAfter, trelloDate(activities[i].id))
            }
        
            console.log("Card #" + card.idShort)
            console.log("Card name: " + card.name)
            console.log(log.getAll())
        });
    });
})