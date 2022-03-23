const mongoose = require('mongoose')
const Drivers = require('../models/Drivers') 

const subscriberSchema = new mongoose.Schema({
 name: {
type: String,
required: true
 }, 

 number: {
type: String,
required: true
 },
 
 avatar: {
    type: String,
    required: true
},

content: {
    type: String,
    required: true
},

 bookingDate: {
type: Date,
required: true,
default: Date.now
 },
})

module.exports = mongoose.model('Drivers', subscriberSchema)