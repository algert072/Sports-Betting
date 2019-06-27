const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bet = new Schema({
    awayName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    group: {
        type: String
    },
    homeName: {
        type: String
    },
    id: {
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
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Bet', Bet);