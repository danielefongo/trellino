const Trello = require("trello");

module.exports = function(key, token) {
    this.trelloApi = new Trello(key, token);
    this.cards = async function(boardId) {
        return await this.__callApi('/1/boards/' + boardId + '/cards/all')
    }
    this.card = async function(cardId) {
        return await this.__callApi('/1/cards/' + cardId)
    }
    this.activities = async function(cardId) {
        return await this.__callApi('/1/cards/' + cardId + '/actions')
    }

    this.dateFrom = function (dateString) {
        return new Date(1000*parseInt(dateString.substring(0,8),16))
    }

    this.__callApi = async function(path) {
        return await this.trelloApi.makeRequest('get', path)
        .then((data) => {
            return data
        })
    }
}