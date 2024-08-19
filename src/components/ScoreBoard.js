import React from "react";

const Scoreboard = ({ heroes }) => {
    if (!heroes || heroes.length < 2) {
        return <div className="scoreboard">Загрузка...</div>;
    }

    return (
        <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div>
                <span>Hero 1: {heroes[0] ? heroes[0].hits : 0} hits</span>
            </div>
            <div>
                <span>Hero 2: {heroes[1] ? heroes[1].hits : 0} hits</span>
            </div>
        </div>
    );
};

export default Scoreboard;
