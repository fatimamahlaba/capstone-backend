const {subscriber} = require("../models/subscriber")
const {post} = require("../models/Posts")
const access = require("./access")
const Drivers = require('../models/Drivers');
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) res.status(404).json({ message: "Could not find subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  next();
}

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ message: "Could not find post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}
async function getDriver(req, res, next) {
  let driver;
  try {
    driver = await Drivers.findById(req.params.id);
    if (!driver) res.status(404).json({ message: "Could not find driver" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.driver = driver;
  next();
}

module.exports = { getSubscriber, getPost , getDriver};