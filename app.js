const express = require("express");
const app = express();
const logger = require("morgan")
const createError =require('http-errors')
const contactsRouter = require('./routes/contacts.js');
const mongoose= require('mongoose');
const dbconfig= require('./database/connection.json')
const StudentsRouter = require('./routes/Students.js');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/contacts', contactsRouter);
app.use('/addcontact',contactsRouter);
app.use('/addstudent',StudentsRouter);
app.use('/students',StudentsRouter);


mongoose.connect(dbconfig.mongo.uri);
module.exports = app ;