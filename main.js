require('dotenv').config()
var Trello = require("trello");
var trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);

trello.getCardsOnBoard(process.env.BOARD_ID).then((cards) => {
    cards.forEach(element => {
        console.log(element.shortLink)
    });
})