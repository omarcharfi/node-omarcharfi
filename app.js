const express = require("express");
const app = express();
const logger = require("morgan")
const createError =require('http-errors')
const contactsRouter = require('./routes/contacts.js');
const mongoose= require('mongoose');
const dbconfig= require('./database/connection.json')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/contacts', contactsRouter);
app.use('/addcontact',contactsRouter);


app.use((req,res,next)=>{
    next(createError(404));
})

mongoose.connect(dbconfig.mongo.uri);
module.exports = app ;