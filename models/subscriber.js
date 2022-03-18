const mongoose = require('mongoose')
const Subscriber = require('../models/subscriber') 

const subscriberSchema = new mongoose.Schema({
 name: {
type: String,
required: true
 }, 

 subscribedToBlog: {
type: String,
required: true
 },

 subscriberDate: {
type: Date,
required: true,
default: Date.now
 },

 subscriberImg: {
     type: String,
     required: true
 }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)