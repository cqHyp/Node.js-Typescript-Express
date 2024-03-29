#!/usr/bin/env node
"use strict";
 
const server = require("../dist/server");
const debug = require("debug")("express:server");
const http = require("http");
 
const httpPort = normalizePort(process.env.Port || 8193);
const app = server.Server.bootstrap().app;
app.set("port", httpPort);
const httpServer = http.createServer(app);
 
httpServer.listen(httpPort);
 
httpServer.on("error", onError);
 
httpServer.on("listening", onListening);
 
function normalizePort(val) {
  const port = parseInt(val, 10);
  
  if (isNaN(port)) {
    return val;
  }
 
  if (port >= 0) {
    return port;
  }
 
  return false;
}
 
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
 
  const bind = typeof httpPort === 'string'
    ? "Pipe " + httpPort
    : "Port " + httpPort;
 
  switch(error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " alreay is use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
 
function onListening() {
  const addr = httpServer.address();
  const bind = typeof httpPort === 'string'
    ? "Pipe " + httpPort
    : "Port " + httpPort;
  debug("Listening on " + bind);
}