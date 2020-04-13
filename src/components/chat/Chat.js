import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import cryptojs from "crypto-js";

import InfoBar from "../infobar/InfoBar";
import Input from "../input/Input";
import Messages from "../messages/Messages";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [isMember, setIsMember] = useState(false);
    const [key, setKey] = useState("");
    const [decrypt, setDecrypt] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:8080";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit("join", { name, room }, (error) =>
            error ? alert(error) : null
        );
        return () => {
            socket.emit("disconnect");
            socket.disconnect();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    useEffect(() => {
        decryptMessages();
    }, [key, messages]);

    const decryptMessages = () => {
        if (key !== "") {
            messages.forEach((message) => {
                if (!message.decryptionStatus && message.user !== "admin") {
                    const decryptedMessage = cryptojs.AES.decrypt(
                        message.text,
                        key
                    ).toString(cryptojs.enc.Utf8);
                    message.text = decryptedMessage;
                    message.decryptionStatus = true;
                }
            });
        }
    }

    const becomeMember = () => {
        setIsMember(true);
        socket.emit("becomeMember", { name, room }, (secretKey) => {
            setKey(secretKey);
            setDecrypt(!decrypt);
        });
    };

    const leaveGroup = () => {
        setIsMember(false);
        setKey("");
    };

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            const encryptedMessage = message;
            socket.emit("sendMessage", encryptedMessage, () => setMessage(""));
        }
    };

    return (
        <div>
            <div>
                <InfoBar
                    room={room}
                    isMember={isMember}
                    becomeMember={becomeMember}
                    leaveGroup={leaveGroup}
                />
                <Messages messages={messages} name={name} />
                {isMember && (
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                )}
            </div>
        </div>
    );
};

export default Chat;
