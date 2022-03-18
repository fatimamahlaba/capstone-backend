const mongoose = require('mongoose')
const Drivers = require('../models/drivers') 

const subscriberSchema = new mongoose.Schema({
 name: {
type: String,
required: true
 }, 

 number: {
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