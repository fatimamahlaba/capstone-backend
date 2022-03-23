const express = require('express')
const router = express.Router()
const Driver = require('../models/drivers')

// GETTING ALL SUBCRIBER
router.get('/', async (req, res) => {
try {
const drivers = await Driver.find()
res.json(drivers) 

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
const driver = new Driver({
    name: req.body.name,
    number: req.body.number,
    bookingDate: req.body.bookingDate
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