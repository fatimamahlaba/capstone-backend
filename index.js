require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.get('/', (req, res) => {
    
    res.send('Fatima Api')
})

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

const port = app.set('port', process.env.PORT || 3270)

app.listen(port, console.log(`Server Started on ${app.get('port')}`)) 