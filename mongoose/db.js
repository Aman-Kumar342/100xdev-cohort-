
/*since we are crteating a another folder for storing the database as  we use db.js so, we need to export the 
content of the debugger.js to indexm.js */


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    email: String,
    password: String,
    name: String
});

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
});

const UserModel = mongoose.model('users', user);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
};
