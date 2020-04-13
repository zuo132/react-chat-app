import React from "react";

import './Input.css'

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form>
            <input
                className="input-textfield"
                type='text'
                placeholder='Enter a message'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) =>
                    event.key === "Enter" ? sendMessage(event) : null
                }
            />
            <button className="input-button" onClick={(event) => sendMessage(event)}>
                Send Message
            </button>
        </form>
    );
};

export default Input;
