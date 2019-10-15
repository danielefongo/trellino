if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const Activities = require("./activities.js");
const Timer = require("./timer.js");
const Trello = require("./trello.js");
const UtcHoursInterval = require("./utcHoursInterval.js");

const trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);
const timer = new Timer(new UtcHoursInterval(7, 11), new UtcHoursInterval(12, 16))
var app = express();
var port = process.env.PORT || 8080;

app.listen(port);

app.get('/card', async function(req, res) {
    var cardId = req.param('id');

    var card = await trello.card(cardId)
    var activities = await trello.activities(cardId)
    var report = generateReport(card, activities)
    
    res.send(report)
});

app.get('/board', async function(req, res) {
    var boardId = req.param('id');

    var trelloCards = await trello.cards(boardId)
    var cards = mapCards(trelloCards)
    
    res.send(cards)
});

function generateReport(card, activities) {
    activities = activities.reverse().filter((activity) => activity.type == "updateCard")
    
    var log = new Activities(trello.dateFrom(card.id), timer)

    if(activities.length > 0) {
        for(var i = 0; i < activities.length; i++) {
            log.add(activities[i].data.listBefore, activities[i].data.listAfter, trello.dateFrom(activities[i].id))
        }
    }

    return {
        id: card.idShort,
        name: card.name,
        labels: getLabels(card),
        activities: log.getAll()
    };
}

function mapCards(trelloCards) {
    return trelloCards.map(card => {
        return {
            shortId: card.shortLink,
            name: card.name,
            labels: getLabels(card)
        }
    })
}

function getLabels(card) {
    return card.labels.map(label => label.name)
}