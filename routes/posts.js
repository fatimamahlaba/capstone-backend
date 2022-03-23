require("dotenv").config;

const express = require("express");
const Post = require("../models/Posts");
const access = require("../middleware/access");
const { getSubscriber, getPost } = require("../middleware/functions");

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one post
router.get("/:id", (req, res, next) => {
  res.send(res.post);
});

// CREATE a post
router.post("/",async (req, res, next) => {
  const { title, body, img } = req.body;
  let post;
  img
    ? (post = new Post({
        title,
        body,
        author: req.subscriber._id,
        img,
      }))
    : (post = new Post({
        title,
        body,
        author: req.subscriber._id,
      }));

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a post
router.put("/:id", async (req, res, next) => {
  if (req.subscriber._id !== res.post.author)
    res
      .status(400)
      .json({ message: "You do not have the permission to update this post" });
  const { title, body, img } = req.body;
  if (title) res.post.title = title;
  if (body) res.post.body = body;
  if (img) res.post.img = img;

  try {
    const updatedPost = await res.post.save();
    res.status(201).send(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a post
router.delete("/:id", async (req, res, next) => {
  if (req.subscriber._id !== res.post.author)
    res
      .status(400)
      .json({ message: "You do not have the permission to delete this post" });
  try {
    await res.post.remove();
    res.json({ message: "Deleted post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;