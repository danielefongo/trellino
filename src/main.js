if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const Trello = require("trello");
const Activities = require("./activities.js");
const Timer = require("./timer.js");
const UtcHoursInterval = require("./utcHoursInterval.js");

var trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);
var timer = new Timer(new UtcHoursInterval(7, 11), new UtcHoursInterval(12, 16))
var app = express();
var port = process.env.PORT || 8080;

app.listen(port);

app.get('/card', async function(req, res) {
    var cardId = req.param('id');

    var card = await callApi('/1/cards/' + cardId)
    var cardActivities = await callApi('/1/cards/' + card.shortLink + '/actions')
    var report = generateReport(card, cardActivities)
    
    res.send(report)
});

app.get('/board', async function(req, res) {
    var boardId = req.param('id');

    var trelloCards = await callApi("/1/boards/" + boardId + "/cards/all")
    var cards = trelloCards.map(card => {
        return {
            shortId: card.shortLink,
            name: card.name,
            labels: getLabels(card)
        }
    })
    
    res.send(cards)
});

async function callApi(path) {
    return await trello.makeRequest('get', path)
    .then((data) => {
        return data
    })
}

function generateReport(card, activities) {
    activities = activities.reverse().filter((activity) => activity.type == "updateCard")
    
    var log = new Activities(trelloDate(card.id), timer)

    if(activities.length > 0) {
        for(var i = 0; i < activities.length; i++) {
            log.add(activities[i].data.listBefore, activities[i].data.listAfter, trelloDate(activities[i].id))
        }
    }

    return {
        id: card.idShort,
        name: card.name,
        labels: getLabels(card),
        activities: log.getAll()
    };
}

function trelloDate(dateString) {
    return new Date(1000*parseInt(dateString.substring(0,8),16))
}

function getLabels(card) {
    return card.labels.map(label => label.name)
}