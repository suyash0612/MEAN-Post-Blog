const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://eyantra21:ES8NGvfasRu3myUy@cluster0.d5wlnr4.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body; // added by body-parser
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  }); // added by body-parser
  post.save().then(createdPost => {
    res.status(201).json({
      message: "post added successfully",
      postId : createdPost._id
    })
  });
  // console.log(post.id + post.title + post.content);
  // res.status(201).json({
  //   message: "post added successfully",
  // });
});

app.get("/api/posts", (request, response, next) => {
  Post.find().then((documents) => {
    response.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });
  // const posts = [{
  //     id:'34f32f',
  //     title:'First server-side post',
  //     content:'This is coming from server'
  // },
  // {
  //     id:'fvbfdb8r',
  //     title:'Second server-side post',
  //     content:'This is coming from server!'
  // }
  // ];
  // return response.status(200).json({
  //     message : 'Posts fetched successfully',
  //     posts : posts
  // });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post was deleted..",
    });
  });
});

module.exports = app;
