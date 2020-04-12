import React from 'react'

const Message = ({ message, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (message.user === trimmedName) isSentByCurrentUser = true;

    return (
        isSentByCurrentUser
        ? (
            <div>
                <p>{trimmedName}</p>
                <div>
                    <p>{message.text}</p>
                </div>
            </div>
        )
        : (
            <div>
                <div>
                    <p>{message.text}</p>
                </div>
                <p>{message.user}</p>
            </div>
        )
    )
}

export default Message;