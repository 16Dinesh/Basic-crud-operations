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
        content: "This is the First Post"
    },
    {
        id: uuidv4(),
        username: "Zeke",
        content: "This is the Second Post"
    },
    {
        id: uuidv4(),
        username: "Tom",
        content: "This is the Third Post"
    }
];


app.get("/posts", (req,res) => {
    res.render("index", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("form");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content }); 
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("show", { post });
});


app.patch("/posts/:id", (req,res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts")
})

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
  


const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}/posts`)
})
