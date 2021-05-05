//const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
let connectCounter = 0;
let data;

//const publicPath = path.join(__dirname, '/../');
const port = process.env.PORT || 3000;
const INDEX = '/index.html';
let app = express()
        .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
        .listen(PORT, () => console.log(`A escuta na porta ${PORT}`));;

//app.use(express.static('public'));
//let server = require('http').server(app);

//let server = http.createServer(app);
//let io = socketIO(server);
//app.get('/', (res, res) => res.sendFile(__dirname + 'index.html'));

let io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('A user just connected.');
    connectCounter++;
    console.log(connectCounter);
    socket.emit('userCount', connectCounter)
    socket.on('disconnect', function() {
        connectCounter--;
        console.log('A user has disconnected.');
    });
});


data = {
    userCount: connectCounter,
};

    //commit ConectBransh
// socket.on('startGame', () => {
//     io.emit('startGame');
// });
