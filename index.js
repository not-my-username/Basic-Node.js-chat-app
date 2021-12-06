const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");

app.use(express.static(__dirname + '/public'));

io.on("connection", (socket) => {
    socket.on("message", function(data) {
        console.log(data);
        socket.broadcast.emit("message", data);
        fs.appendFileSync("./public/history.txt", data.username + ": " + data.message + "<br/><br/>");
    });
});

server.listen(app.get('port'), () => {
    console.log("listening on *:3000");
});