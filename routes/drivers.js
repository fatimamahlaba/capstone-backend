const express = require('express')
const router = express.Router()
const Drivers = require("../models/Drivers")

// GETTING ALL SUBCRIBER
router.get('/', async (req, res) => {
try {
const driver = await Drivers.find()
res.json(driver) 

} catch (err) {
res.status(500).json({ message: err.message})
}
})
// GETTING ONE SUBSCRIBER
router.get('/:id', getDriver, (req,res) => {
res.json (res.driver.name)
})
// CREATING ONE
router.post('/', async (req, res) => {
const driver = new Drivers({
    name: req.body.name,
    number: req.body.number,
    content: req.body.content,
    avatar: req.body.avatar
})
try{
const newDriver = await driver.save()
res.status(201).json(newDriver)
} catch (err) {
res.status(400).json({ message: err.message })
}
})
// DELETING ONE
 router.delete('/:id', getDriver, async (req,res) => {
    try{
await res.driver.remove()
res.json({ message:'Deleted Learner' })
    }catch (err){
res.status(500).json({ message: err.message })
    }
})

async function getDriver(req, res, next){
let driver
    try{
driver = await Driver.findById(req.params.id)
if (driver == null)
return res.status(404).json({ message: 'Cannot Find Learner' })
    }catch (err){
  return res.status(500).json({ message: err.message })     
    }
    res.driver = driver
    next()
}
module.exports = router