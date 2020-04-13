import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="join-container">
            <h1 className="heading">Join Group</h1>
            <div className="join-input">
                <input
                    placeholder="Name"
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="join-input">
                <input
                    placeholder="Room"
                    type="text"
                    onChange={(event) => setRoom(event.target.value)}
                />
            </div>
            <Link
                to={`/chat?name=${name}&room=${room}`}
                onClick={(event) =>
                    !name || !room ? event.preventDefault() : null
                }
            >
                <button className="join-button" type="submit">Sign In</button>
            </Link>
        </div>
    );
};

export default Join;
