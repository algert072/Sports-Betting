const express = require('express'); 
const gameRoutes = express.Router();

// require models 
let Bet = require('../../models/bets');
let Game = require('../../models/game');

// get a random document
gameRoutes.get('/', function (req, res) {
    Game.countDocuments().exec(function (err, count) {

        // get random number
        var random = Math.floor(Math.random() * count)

        // fetch one random document from database
        Game.findOne().skip(random).exec(
            function (err, result) {
                // send random document 
                res.send(result);
            })
    })
})

// adds new model (Bet) that stores users bet to database
gameRoutes.route('/add').post(function (req, res, next) {
    let bet = new Bet(req.body);
    console.log(req.body)
    // save  response to database
    bet.save()
        .then(bet => {
            res.status(200).send(req.body);
        })
        .catch(err => {
            res.status(400).send('****NEW BET FAILED TO ADD****')
        })
})

// change bet
// gameRoutes.route('/update/:id', function(req, res) {
//     Game.findById(req.params.id, function (err, game) {
//         console.log('Game',game);
//         if(!game) 
//             res.status(404).send('****DATA NO FOUND****');
//         else 
//             // game.awayName = req.body.awayName;
//             // game.createdAt = req.body.createdAt;
//             // game.group = req.body.group; 
//             // game.homeName = req.body.homeName; 
//             // game.id = req.body.id; 
//             // game.name = req.body.name; 
//             // game.objectId = req.body.objectId; 
//             // game.sport = req.body.sport; 
//             // game.country = req.body.country; 
//             // game.state = req.body.state; 
//             game.bet = req.body.bet; 
//     })
// }) 
 
module.exports = gameRoutes;