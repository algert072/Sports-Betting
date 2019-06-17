const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
    awayName: {
        type: String
    },
    createdAt: {
        type: Date
    },
    group:{
        type: String
    },
    homeName:{
        type: String
    },
    id:{
        type: Number
    },
    name: {
        type: String
    },
    objectId: {
        type: String
    },
    sport: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    bet: {
        type: String
    }
})

module.exports = mongoose.model('Game', Game);