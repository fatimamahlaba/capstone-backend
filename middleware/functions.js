const subscriber = require("../models/subscriber")
const post = require("../models/Posts")
const access = require("./access")

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await User.findById(req.params.id);

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

module.exports = { getSubscriber, getPost };