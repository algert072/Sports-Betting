const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const PORT = 1337;
const gameRoutes = require('./routes/api/bets')

// require models 
let Game = require('./models/game');

// store json file as a variable
const gameData = JSON.parse(fs.readFileSync(__dirname + '/data/test-assignment.json', 'utf-8'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/gameBets', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
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
    // LOAD JSON DATA to database
    loadGames()
})

app.use('/gameBets', gameRoutes);
app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`)
})