/* 
crud operations : 
                A) Create -> Post metthod
                B) Read   -> Get Method
                C) Update -> Patch Method
                d) Delete -> Delete Method
*/

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "mithanshuhedau",
    content: "Mern Stack Developer",
  },
  {
    id: uuidv4(),
    username: "meharshchandure",
    content: "UI UX and Frontend Developer",
  },
  {
    id: uuidv4(),
    username: "radhikashukla",
    content: "PowerBi and Data Analyst Expert",
  },
  {
    id: uuidv4(),
    username: "nityajoshi",
    content: "Data Science and Machine Learning Expert",
  },
  {
    id: uuidv4(),
    username: "mrunalparashar",
    content: "Artificial Intelligence and Machine Learning Enthusiast",
  },
];

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let newId = uuidv4();
  posts.push({ username, content, id: newId });
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  console.log(post);
  res.render("show.ejs", { post });
  if (!post) {
    return res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id == p.id);
  post.content = newContent;
  res.redirect("/posts");
  // console.log(post);
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.filter((p) => id != p.id);
  posts = post;
  res.redirect("/posts");
});
