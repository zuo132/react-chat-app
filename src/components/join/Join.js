import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className='container'>
            <div className='container'>
                <h1 className='heading'>Join</h1>
                <div>
                    <input
                        placeholder='Name'
                        type='text'
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder='Room'
                        type='text'
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={event => (!name || !room) ? event.preventDefault() : null}>
                    <button type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
