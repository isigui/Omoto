var bluetoothClient = function (socket) {
    var clientSocket = {};
    clientSocket.socket = socket;
    
    clientSocket.handleConnection = function () {
        
        clientSocket.socket.on('bluetooth-list', function () {
            console.log('client asked bluetooth list');
            socket.emit('bluetooth-list-result', {
                devices: 
 [
            
                    {
                        "name": "REMOTE_Sharp",
                        "address": "7abd1308-94f3-4eff-a08b-e6f6c18b8101"
                    },
                    {
                        "name": "REMOTE_Moss",
                        "address": "40865696-7df4-4174-83dc-265afdb001b4"
                    },
                    {
                        "name": "REMOTE_Wade",
                        "address": "9c25a457-2e32-4f21-9e5e-6b88da31f751"
                    },
                    {
                        "name": "REMOTE_Rhodes",
                        "address": "eae69726-bef1-43a2-97d3-23eec641539f"
                    },
                    {
                        "name": "REMOTE_Reid",
                        "address": "db20d1a3-cfcf-4a2c-8974-cb4d839a0ade"
                    },
                    {
                        "name": "REMOTE_Hahn",
                        "address": "2365e0dc-104c-43ab-9f18-0c9ebfcfcd76"
                    },
                    {
                        "name": "REMOTE_Mcneil",
                        "address": "318e9081-87a1-4fa5-ac2b-c117a79fcf68"
                    }
                ]
            });

 
        });
        clientSocket.socket.on('bluetooth-connect-device', function (device) {
            
            console.log("client try to connect to " + device.name);
            setTimeout(function () {
                clientSocket.socket.emit('bluetooth-connect-device-result', { result: 'connected' });
            }, 1000);
        });
        clientSocket.socket.on('bluetooth-disconnect-device', function (device) {
                console.log("client disconnectet from " + device.name);
                clientSocket.socket.emit('bluetooth-disconnect-device-result', { result: 'disconnected' });
        });
        clientSocket.socket.on('disconnect', function () {
            console.log('client ' + socket.id + ' disconnected');
            //clientSocket.socket.emit('disconnected-result');
        })
        clientSocket.socket.emit('connected-result');
    }
    return clientSocket;
};
module.exports = bluetoothClient;


