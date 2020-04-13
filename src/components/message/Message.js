import React from 'react'

import './Message.css'

const Message = ({ message, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (message.user === trimmedName) isSentByCurrentUser = true;

    return (
        isSentByCurrentUser
        ? (
            <div className="own-message">
                <p className="sender-name">{trimmedName}</p>
                <div>
                    <p className="message-content">{message.text}</p>
                </div>
            </div>
        )
        : (
            <div className="message">
                <div>
                    <p className="message-content">{message.text}</p>
                </div>
                <p className="sender-name">{message.user}</p>
            </div>
        )
    )
}

export default Message;