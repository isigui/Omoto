

var app = require('express')();
var routes = require('./routes.js');
var BTSP = require('bluetooth-serial-port');

var bluetoothClient = require('./clientSocket.mock.js');

app.use('/', routes);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("AccessControlAllowCredentials", true);
    next();
});
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*' });

server.listen(5001, '', '', function () { console.log('listening on port 5001') });




io.sockets.on('connection', function (socket) {
    
    console.log('client ' + socket.id + ' connected. transport: ' + socket.conn.transport.name);
    
    bluetoothClient(socket, BTSP).handleConnection();
});



