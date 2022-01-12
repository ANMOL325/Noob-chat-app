const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 'https://noob-chat-app.herokuapp.com'; // Socket io Connection...
const port2 = process.env.PORT || 8000;  // Listening to this Port.......

const io = require('socket.io')(port, {
    cors: {
      origin: '*',
    }
  });

const users = {};


const static_path = path.join(__dirname, "");
console.log(static_path);
app.use(express.static(static_path));

app.get("", (req,res) => {
  res.render("index");
}) 

app.listen(port2, () => {
  console.log(`Listening to ${port2}`);
})


io.on('connection', socket => {
    socket.on('new-user-joined', name =>{
        
        console.log('New User', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
})



