if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const Activities = require("./activities.js");
const Activity = require("./activity.js");
const Timer = require("./timer.js");
const Trello = require("./trello.js");
const UtcHoursInterval = require("./utcHoursInterval.js");

const trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);
const timer = new Timer(new UtcHoursInterval(7, 11), new UtcHoursInterval(12, 16))
var app = express();
var port = process.env.PORT || 8080;

app.listen(port);

app.get('/cards/:id', async function(req, res) {
    var cardId = req.param('id');

    var card = await trello.card(cardId)
    var orderedList = await trello.lists(card.idBoard)
    var activities = await trello.activities(cardId)
    var actualList = await trello.list(card.idList)
    var report = generateReport(card, activities, orderedList, actualList)
    
    res.send(report)
});

app.get('/boards/:id', async function(req, res) {
    var boardId = req.param('id');

    var trelloCards = await trello.cards(boardId)
    var cards = mapCards(trelloCards)
    
    res.send(cards)
});

function generateReport(card, trelloActivities, orderedList, actualList) {
    trelloActivities = trelloActivities.reverse().filter((activity) => activity.type == "updateCard")
    
    var activities = new Activities(trello.dateFrom(card.id), timer, actualList)

    for(var i = 0; i < trelloActivities.length; i++) {
        activities.add(trelloActivities[i].data.listBefore, trelloActivities[i].data.listAfter, trello.dateFrom(trelloActivities[i].id))
    }

    not_sorted_activities = activities.getAll()
    sorted_activities = orderedList.map(list => {
        data = not_sorted_activities.filter(activity => activity.id == list.id)[0]
        if (data == null)
            data = new Activity(list.id, list.name)
        return data
    }).filter(list => list.time > 0)

    return {
        id: card.idShort,
        name: card.name,
        labels: getLabels(card),
        activities: sorted_activities
    };
}

function mapCards(trelloCards) {
    return trelloCards.map(card => {
        return {
            shortId: card.shortLink,
            number: card.idShort,
            name: card.name,
            labels: getLabels(card)
        }
    })
}

function getLabels(card) {
    return card.labels.map(label => label.name)
}