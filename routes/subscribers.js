require("dotenv").config;

const express = require("express");
const Subscriber = require("../models/subscriber");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getSubscriber } = require("../middleware/functions");
const { authenticationToken} = require("../middleware/access.js")

const router = express.Router();

// GET all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one subscriber
router.get("/:id", authenticationToken, (req, res, next) => {
  res.send(res.subscriber);
});

// LOGIN subscriber with email + password
router.patch("/", async (req, res, next) => {
  const { email, password } = req.body;
  const subscriber = await Subscriber.findOne({ email });

  if (!subscriber) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare(password, user.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
});

// REGISTER a subscriber
router.post("/", authenticationToken ,async (req, res, next) => {
  const { name, email, contact, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const subscriber = new Subscriber({
    name,
    email,
    contact,
    password: hashedPassword,
  });

  try {
    const newSubscriber = await subscriber.save();

    try {
      const access_token = jwt.sign(
        JSON.stringify(newUser),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a subscriber
router.put("/:id", async (req, res, next) => {
  const { name, contact, password, avatar, about } = req.body;
  if (name) res.user.name = name;
  if (contact) res.user.contact = contact;
  if (avatar) res.user.avatar = avatar;
  if (about) res.user.about = about;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.user.password = hashedPassword;
  }

  try {
    const updatedSubscriber = await res.user.save();
    res.status(201).send(updatedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a subscriberer
router.delete("/:id", async (req, res, next) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;