const express = require('express')
const Rollbar = require('rollbar')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
var rollbar = new Rollbar({
    accessToken: 'a67e76b8f2ce4d808337e08eaf7d3e31',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
  
  // record a generic message and send it to Rollbar
  rollbar.log('Hello world!')


app.use(express.json())

app.get('/', (req, res) => {
    rollbar.log('Page requested');
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.js'))
})

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(botsArr)
    } catch (error) {
        rollbar.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        rollbar.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            rollbar.log('Player lost')
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            rollbar.log('Player won')
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        rollbar.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        rollbar.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})