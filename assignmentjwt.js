const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET = "AMAN123";

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next(); // You missed this line before!
}

// Serve frontend
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Signup route
app.post("/signup", logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password,
    });
    res.json({
        message: "you are signed in",
    });
});

// Signin route
app.post("/signin", logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            founduser = users[i];
        }
    }
    if (!founduser) {
        res.status(401).json({
            message: "credential is incorrect",
        });
        return;
    } else {
        const token = jwt.sign(
            {
                username: founduser.username,
            },
            JWT_SECRET
        );
        res.header("jwt", token);
        res.json({
            token: token,
        });
    }
});

// Middleware to verify token
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        if (decodedData.username) {
            req.username = decodedData.username;
            next();
        } else {
            res.status(403).json({
                message: "Invalid token",
            });
        }
    } catch (e) {
        res.status(403).json({
            message: "Token verification failed",
        });
    }
}

// Protected route to get user info
app.get("/me", logger, auth, function (req, res) {
    let founduser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === req.username) {
            founduser = users[i];
        }
    }

    if (founduser) {
        res.json({
            username: founduser.username,
            password: founduser.password,
        });
    } else {
        res.status(404).json({
            message: "User not found",
        });
    }
});

app.listen(3000);
