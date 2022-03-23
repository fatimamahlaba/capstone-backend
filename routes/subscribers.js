require("dotenv").config;

const express = require("express");
const Subscriber = require("../models/subscriber");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getSubscriber } = require("../middleware/functions");
const { authToken, authTokenAndAuthorization, authTokenAndAdmin} = require("../middleware/access.js")

const router = express.Router();

// GET all subscribers
router.get("/", authTokenAndAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one subscriber
router.get("/:id", authTokenAndAdmin, async (req, res, next) => {
 try{
   const subscriber = await Subscriber.findById(req.params.id);
   const { password, ...others} = subscriber._doc;
   res.status(200).json(others)
 }catch (error) {
   res.status(500).json(err)
 }
});

// LOGIN subscriber with email + password
router.patch("/", async (req, res, next) => {
  const { email, password } = req.body;
  const subscriber = await Subscriber.findOne({ email });

  if (!subscriber) res.status(404).json({ message: "Could not find subscriber" });
  if (await bcrypt.compare(password, subscriber.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(subscriber),
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
router.post("/", async (req, res, next) => {
  const { name, email, contact, password } = req.body;


  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const subscriber = new Subscriber({
    name,
    email,
    contact,
    password: hashedPassword,
  });

  console.log(subscriber)

  try {
    const newSubscriber = await subscriber.save();

    try {
      const access_token = jwt.sign(
        JSON.stringify(newSubscriber),
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
router.put("/:id", authTokenAndAuthorization, async (req, res, next) => {
  const { name, contact, password, avatar, about } = req.body;
  if (name) res.subscriber.name = name;
  if (contact) res.subscriber.contact = contact;
  if (avatar) res.subscriber.avatar = avatar;
  if (about) res.subscriberr.about = about;
  if (password) {
    const salt = await res.subscriber.save();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.subscriber.password = hashedPassword;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.status(201).send(updatedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a subscriberer
router.delete("/:id", authTokenAndAuthorization, async (req, res, next) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;