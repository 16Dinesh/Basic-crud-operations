const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public/")));

let posts = [
    {
        id: uuidv4(),
        username: "Dinesh",
        content: "Learning MERN"
    },
    {
        id: uuidv4(),
        username: "Varsha",
        content: "Learning DSA"
    },
    {
        id: uuidv4(),
        username: "Brutu",
        content: "I'm just a Dog"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("form.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content }); // adds the data to posts and id
    res.redirect("/posts"); // by default sends the get request
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); // Finding the post with the matching 'id'
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    // console.log("Patch Requested ID:", id);
    // console.log("New Content:", newContent);
    // res.send('patch req working');
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")

    // let post = posts.find((p) => id === p.id);
    // if (post) {
    //     post.content = newContent;
    //     res.status(200).json(post);
    // } else {
    //     res.status(404).send('Post not found');
    // }
});

app.get("/posts/:id/edit", (req ,res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit" , {post});
})

app.delete("/posts/:id/", (req , res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts")
})

app.listen(port, () => {
    console.log(`listening to the port: ${port}`);
});
