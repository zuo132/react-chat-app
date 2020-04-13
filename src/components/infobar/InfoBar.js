import React from "react";

import './InfoBar.css'

const InfoBar = ({ room, isMember, becomeMember, leaveGroup }) => {
    return (
        <div>
            <div>
                <h1 className="infobar-title">{room}</h1>
            </div>
            <div>
                {isMember ? (
                    <button className="infobar-button" onClick={leaveGroup}>Leave Group</button>
                ) : (
                    <button className="infobar-button" onClick={becomeMember}>
                        Become a Group Member
                    </button>
                )}
            </div>
        </div>
    );
};

export default InfoBar;
