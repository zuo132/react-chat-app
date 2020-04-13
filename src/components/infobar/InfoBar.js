import React from "react";

const InfoBar = ({ room, isMember, becomeMember, leaveGroup }) => {
    return (
        <div>
            <div>
                <h1>{room}</h1>
            </div>
            <div>
                {isMember ? (
                    <button onClick={leaveGroup}>Leave Group</button>
                ) : (
                    <button onClick={becomeMember}>
                        Become a Group Member
                    </button>
                )}
            </div>
        </div>
    );
};

export default InfoBar;
