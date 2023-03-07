const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var Student = new Schema({
    name : String ,
    age : Number ,
    classe: String,
    note : Number
})


module.exports = Student = mongoose.model('Students',Student);