import React from "react";

const InfoBar = ({ room }) => {
    return (
        <div>
            <div>
                <h1>{room}</h1>
            </div>
            <div>
                <a href='/'>Leave Group</a>
            </div>
        </div>
    );
};

export default InfoBar;
