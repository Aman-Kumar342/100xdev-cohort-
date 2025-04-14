const express = require("express");
const app = express();

app.use(express.json());
const users = [];
function generateToken(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username.length < 5) {
        res.json({ message: "your username is too small" });
        return;
    }

    if (password.length < 5) {
        res.json({ message: "your password is too weak" });
        return;
    }

    users.push({ username, password });
    res.json({ message: "you are signed in" });
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            founduser = users[i];
        }
    }

    if (founduser) {
        const token = generateToken();
        res.json({
            message: "signin successful",
            token: token
        });
    } else {
        res.status(401).json({
            message: "invalid username or password"
        });
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
