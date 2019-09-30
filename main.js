require('dotenv').config()
var Trello = require("trello");
var trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);

function trelloDate(dateString) {
    return new Date(1000*parseInt(dateString.substring(0,8),16))
}

trello.getCardsOnBoard(process.env.BOARD_ID).then((cards) => {
    cards.forEach(element => {
        trello.makeRequest('get', '/1/cards/' + element.shortLink + '/actions', { webhooks: true })
        .then((activities) => {
            activities = activities.reverse()
            
            var start = {
                id: activities[0].data.listBefore.id,
                name: activities[0].data.listBefore.name,
                time: trelloDate(activities[0].id) - trelloDate(element.id)
            }

            var log = activities.map((activity, index) => {
                if(activity.type == "updateCard") {
                    if(activities[index + 1] == undefined)
                        nextDate = new Date()
                    else
                        nextDate = trelloDate(activities[index + 1].id)
                    return {id: activity.data.listAfter.id, name: activity.data.listAfter.name, time: nextDate - trelloDate(activity.id)}
                }
            });

            log.unshift(start)
            console.log(log)
        });
    });
})