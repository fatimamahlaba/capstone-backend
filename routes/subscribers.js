const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// GETTING ALL POSTS 
router.get('/', async (req, res) => {
try {
const subscribers = await Subscriber.find()
res.json(subscribers) 

} catch (err) {
res.status(500).json({ message: err.message})
}
})
// GETTING ONE
router.get('/:id', getSubscriber, (req,res) => {
res.json (res.subscriber.name)
})
// CREATING ONE
router.post('/', async (req, res) => {
const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToBlog: req.body.subscribedToBlog
})
try{
const newSubscriber = await subscriber.save()
res.status(201).json(newSubscriber)
} catch (err) {
res.status(400).json({ message: err.message })
}
})
// UPDATING ONE
router.patch('/:id', getSubscriber, async (req, res) => {
if (req.body.name != null) {
    res.subscriber.name = req.body.name
}
if (req.body.subscribedToBlog != null) {
    res.subscriber.subscribedToBlog = req.body.subscribedToBlog
}
try{
    const updateSubcriber = await res.subscriber.save()
    res.json(updatedSubcriber)
}catch (err){
res.status(400).json({ message: err.message})
}
})
// DELETING ONE
 router.delete('/:id', getSubscriber, async (req,res) => {
    try{
await res.subscriber.remove()
res.json({ message:'Deleted Subscriber' })
    }catch (err){
res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next){
let subscriber
    try{
subscriber = await Subscriber.findById(req.params.id)
if (subscriber == null)
return res.status(404).json({ message: 'Cannot find subscriber' })
    }catch (err){
  return res.status(500).json({ message: err.message })     
    }
    res.subscriber = subscriber
    next()
}
module.exports = router