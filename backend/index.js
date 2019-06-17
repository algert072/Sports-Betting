const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const gameRoutes = express.Router();
const PORT = 2000;

// require models
let Bet = require('./models/bets');
let Game = require('./models/game');  

// store json file as a variable
const gameData = JSON.parse(fs.readFileSync(__dirname + '/data/test-assignment.json', 'utf-8'));
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/gameBets', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB, database connection established successfully');
    // load json file to the database
    async function loadGames() {
        try {
            await Game.insertMany(gameData);
            console.log('Done!');
            process.exit();
        } catch (e) {
            console.log(e);
            process.exit();
        } 
    };
    // LOAD JSON DATA once to database then comment out
    //loadGames()
})

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

app.use('/gameBets', gameRoutes);

app.listen(PORT, function() {
    console.log(`Server running on port: ${PORT}`)
})