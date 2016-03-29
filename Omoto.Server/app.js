
var app = require('express')();
var routes = require('./routes.js');
app.use('/', routes);
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*' });

var bluetoothClient = require('./clientSocket.mock.js');

server.listen(5000, '', '', function () { console.log('listening on port 5000') });




io.sockets.on('connection', function (socket) {

    console.log('client ' + socket.id + ' connected. transport: ' + socket.conn.transport.name);
    
    bluetoothClient(socket).handleConnection();
});

