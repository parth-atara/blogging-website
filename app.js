const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Simple blogging site created by Parth Atara to explore and demonstrate the use of techonologies like html, css, javascript, EJS (Embedded JavaScript templating), node.js & express.js and mongoDB & mongoose.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://parth:parth@cluster0.0hsxaet.mongodb.net/blogDB", {
  useNewUrlParser: true
});

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    if(!err){
      res.render("home",{homeContent: homeStartingContent, posts: posts});
    }
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  res.redirect("/");
})

app.get("/posts/:postName", function(req, res){
  Post.find({}, function(err, posts){
    if(!err){
      posts.forEach(function(post){
        if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
          const link = _.lowerCase(post.title);
          res.render("post",
          {
            title: post.title,
            content: post.content
          });
        }
      });
    }
  });
});


app.listen(3000, function() {
});
