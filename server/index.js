const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cryptojs = require("crypto-js");

const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom, setUserKey } = require("./user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on("connection", (socket) => {
    console.log("We have a new connection");
    socket.on("join", ({ name, room }, callback) => {
        const { user, error } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);
        socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcome to the group ${user.room}`,
        });
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name}, has joined`,
        });
        socket.join(user.room);
        // io.to(user.room).emit('groupMembers', { room: user.room, users: getUsersInRoom(user.room) })
        callback();
    });

    socket.on("becomeMember", ({ name, room }, callback) => {
        const key = setUserKey(socket.id);
        io.to(room).emit("message", {
            user: "admin",
            text: `${name} is now a group member!`,
        });
        callback(key)
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        const encryptedMessage = cryptojs.AES.encrypt(message, user.key).toString();
        io.to(user.room).emit("message", {
            user: user.name,
            text: encryptedMessage,
        });
        // io.to(user.room).emit('groupMembers', { room: user.room, users: getUsersInRoom(user.room) })
        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has left`,
            });
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
