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

server.listen(process.env.PORT || 5000, () => {
    console.log(`listening on *:${process.env.PORT || 5000}`);
});