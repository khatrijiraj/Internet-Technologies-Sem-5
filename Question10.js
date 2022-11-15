const http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('HELLO WORLD, THIS IS MY NODE.JS SERVER');
}).listen(10069);
console.log('Server up and running at port http://127.0.0.1:10069/');
