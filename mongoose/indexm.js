const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("./db");

const app = express();
const mongoose=require("mongoose");
const jwt_SECRET = "asdas123@123";

mongoose.connect("mongodb+srv://amantop102525:hHAHI7h8uoOZ0OeK@cluster0.xenku0q.mongodb.net/todo-aman-2");

app.use(express.json());

app.post("/signup", async function(req, res) {

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.create({
        email:email,
        password:password,
        name:name
    });

    res.json({
        message: "You are signed up"
    });
});

app.post("/signin", async function(req, res) {
    y;
    const email=req.body.email;
    const password=req.body.password;

    const user = await UserModel.findOne({
         email, 
         password
         });
        console.log(user);

    if (user) {
        const token = jwt.sign({ 
            id: user._id }, 
        jwt_SECRET
    );

        res.json({ 
            token 
        });
        
    } 
    else {
        res.status(403).json({ 
            message: "Incorrect credentials" 
        });
    }
});

app.post("/todo", function(req, res) {
    // To be implemented
});

app.get("/todos", function(req, res) {
    // To be implemented
});

app.listen(3000, () => console.log("Server running on port 3000"));
