require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://fatimamahlaba:UVVbmfcl6UrQCswW@cluster0.rwwo0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))
 
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)


app.listen(3270, console.log('Server Started')) 