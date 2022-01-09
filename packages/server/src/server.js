"use strict";
exports.__esModule = true;
require("reflect-metadata");
var app_1 = require("./app");
var debug_1 = require("debug");
var http = require("http");
var socket_1 = require("./socket");
var port = normalizePort(process.env.PORT || '9000');
app_1["default"].set('port', port);
var server = http.createServer(app_1["default"]);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
var io = (0, socket_1["default"])(server);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    (0, debug_1["default"])("Listening on " + bind);
    console.log("Server Running on Port: ", port);
}
