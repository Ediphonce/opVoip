var app = require('./app');
var fs = require('fs');
var config = require('./config')();
var options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};
var http = require("https"), // Use HTTPs here -------------
    server = http.createServer(options, app);   
var serverMsg='Server Message';
if(server.listen(config.port)){
	serverMsg = 'Server Stated on https://localhost:' + config.port;
	console.log(serverMsg);
}else{
	serverMsg = 'Unable to Start the Server';
	console.log(serverMsg);
}
//require('rtcmulticonnection-v3/Signaling-Server.js')(server);
