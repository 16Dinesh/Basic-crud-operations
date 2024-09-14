const exp = require('constants');
const express = require('express');
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Alex",
        content: "You can Add, Edit, Delete, Read all the Post"
    },
    {
        id: uuidv4(),
        username: "Zeke",
        content: "On Top There is a Create New Post Button to add"
    },
    {
        id: uuidv4(),
        username: "Tom",
        content: "Basic CURD Operations"
    }
];


// Get all posts
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// Show form for creating new post
app.get("/new", (req, res) => {
    res.render("form");
});

// Create a new post
app.post("/", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/");
});

// Show a single post
app.get("/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("show", { post });
});

// Edit a post
app.patch("/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    post.content = newContent;
    res.redirect("/");
});

// Show form to edit a post
app.get("/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("edit", { post });
});

// Delete a post
app.delete("/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 