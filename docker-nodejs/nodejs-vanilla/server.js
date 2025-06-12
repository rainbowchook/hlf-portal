// Handle SIGINT/SIGTERM
var sighandler = function() {
  console.log('Exiting..');
  process.exit();
}
process.on("SIGINT", sighandler);
process.on("SIGTERM", sighandler);

// Overload console.log and console.error to log to a file and also to stdout
var appLogDir = process.env.APP_LOG_DIR
var path = require('path');
var lf = "server.log"
if (appLogDir) {
  lf = path.join(appLogDir, lf)
}
var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream(lf, { flags: 'a'})
var logStdout = process.stdout

console.log("Setting up logging to file " + lf)
console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n')
  logStdout.write(util.format.apply(null, arguments) + '\n')
}
console.error = console.log


// Load the http module to create an http server
var http = require('http');

// Configure the HTTP server to respond with Hello World to all requests
var server = http.createServer(function (request, response) {
  console.log("Request from " + (request.headers['x-forwarded-for'] || request.connection.remoteAddress()));
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World!\n");
  console.log("Response sent..")
});

// Listen on port 8080, IP defaults to 127.0.0.1
server.listen(8000, "0.0.0.0");
console.log("Server running at http://0.0.0.0:8080/");