const app = require('./app.js');
const http = require('http');
var mongoose = require('mongoose');
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);





app.get('/chat',async(req, res ,next)=>{
   
    
    res.render('../views/form.twig')
})



io.on('connection', (socket) => {
console.log('a user connected');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });



server.listen(2000, () => console.log('Server started'));      