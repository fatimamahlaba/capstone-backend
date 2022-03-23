require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Posts = require("./routes/posts");
const subscribers = require("./routes/subscribers");
const drivers = require("./routes/drivers");

// Setting up MongoDB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

// Configure the Express app
const app = express();
app.set("port", process.env.PORT || 2425);
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res, next) => {
  res.send({
    message: "Welcome to the Capstone Blog API",
    subscribers_routes: {
      subscriber_register: {
        method: "POST",
        route: "/subscribers",
        request_body: {
          name: "String",
          email: "String",
          contact: "String",
          password: "String",
        },
        result: {
          jwt: "String token",
        },
      },
      subscriber_login: {
        method: "PATCH",
        route: "/subscribers",
        request_body: {
          email: "String",
          password: "String",
        },
        result: {
          jwt: "String token",
        },
      },
      all_subscribers: {
        method: "GET",
        route: "/subscribers",
        result: {
          subscribers: "Array",
        },
      },
      single_subscriber: {
        method: "GET",
        route: "/subscribers/:id",
        result: {
          subscriber: "Object",
        },
      },
      update_subscriber: {
        method: "PUT",
        request_body: {
          name: "String",
          email: "String",
          contact: "String",
          password: "String",
          avatar: "String",
          img: "String",
        },
        route: "/subscribers/:id",
        result: {
          subscriber: "Object",
        },
      },
      delete_subscriber: {
        method: "DELETE",
        route: "/subscribers/:id",
        result: {
          message: "Object",
        },
      },
    },
    post_routes: {
      all_posts: {
        method: "GET",
        route: "/posts",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        result: {
          posts: "Array",
        },
      },
      single_post: {
        method: "GET",
        route: "/posts/:id",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        result: {
          post: "Object",
        },
      },
      create_post: {
        method: "POST",
        route: "/posts/",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        request_body: {
          title: "String",
          body: "String",
          img: "String",
        },
        result: {
          post: "Object",
        },
      },
      update_post: {
        method: "PUT",
        route: "/posts/:id",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        request_body: {
          title: "String",
          body: "String",
          img: "Stringuser",
        },
        result: {
          post: "Object",
        },
      },
      delete_post: {
        method: "DELETE",
        route: "/posts/:id",
        result: {
          message: "Object",
        },
      },
    },
  });
});
app.use("/subscribers", subscribers);
app.use("/posts", Posts);
app.use("/drivers", drivers)

app.listen(app.get("port"), (server) => {subscribers
  console.info(`Server listen on port ${app.get("port")}`);
});