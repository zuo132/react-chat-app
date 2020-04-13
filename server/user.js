const users = [];
const roomKeys = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find(
        (user) => user.room === room && user.name === name
    );
    if (existingUser) {
        return { error: "Username is taken" };
    }
    const user = { id, name, room };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
    users.filter((user) => user.room === room);
};

const setUserKey = (id) => {
    const user = getUser(id);
    const keyObject = roomKeys.find((roomKey) => roomKey.room === user.room);
    let groupKey;
    if (keyObject) {
        groupKey = keyObject.key;
    } else {
        groupKey = Math.random().toString(36).slice(2);
        roomKeys.push({ room: user.room, key: groupKey });
    }
    user.key = groupKey;
    return groupKey;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, setUserKey };
