const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
 name: {
type: String,
required: true
 }, 

 postedToBlog: {
type: String,
required: true
 },

 postedDate: {
type: Date,
required: true,
default: Date.now
 },

 subscriberImg: {
     type: String,
     required: true
 }
})

module.exports = mongoose.model('Post', PostSchema)