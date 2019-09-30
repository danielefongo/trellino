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
            
            console.log("Creation Date:" + trelloDate(element.id))
            console.log(activities[0].data.listBefore)
            console.log(trelloDate(activities[0].id) - trelloDate(element.id))
            console.log("----------------------------------------------------------------")
            
            activities.forEach((activity, index) => {
                if(activity.type == "updateCard") {
                    console.log("Activity Date:" + trelloDate(activity.id))
                    console.log(activity.data.listAfter)
                    if(activities[index + 1] == undefined)
                        nextDate = new Date()
                    else
                        nextDate = trelloDate(activities[index + 1].id)
                    console.log(nextDate - trelloDate(activity.id))
                    console.log("----------------------------------------------------------------")
                }
            });
        });
    });
})