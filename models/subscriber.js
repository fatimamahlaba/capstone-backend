const mongoose = require('mongoose')
const Subscriber = require('../models/subscriber') 

const subscriberSchema = new mongoose.Schema({
 name: {
type: String,
required: true
 }, 

 email: {
type: String,
required: true
}, 
isAdmin: {
type: Boolean,
default: false
}, 

 contact: {
type: String,
required: true
 }, 

 password: {
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

 avatar: {
     type: String,
     required: false
 }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)