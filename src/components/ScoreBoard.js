const Scoreboard = ({ heroes }) => {
    if (!heroes || heroes.length < 2) {
        return <div className="scoreboard">Загрузка...</div>;
    }

    return (
        <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div>
                <span
                    style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: heroes[0].spellColor,
                        marginRight: "10px",
                    }}
                />
                <span>Hero 1: {heroes[0] ? heroes[0].hits : 0} hits</span>
            </div>
            <div>
                <span
                    style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: heroes[1].spellColor,
                        marginRight: "10px",
                    }}
                />
                <span>Hero 2: {heroes[1] ? heroes[1].hits : 0} hits</span>
            </div>
        </div>
    );
};

export default Scoreboard;
