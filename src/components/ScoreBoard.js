const Scoreboard = ({ heroes }) => {
    // Проверка, что данные о героях переданы и их количество не меньше двух
    if (!heroes || heroes.length < 2) {
        return <div className="scoreboard">Загрузка...</div>; // Отображаем сообщение "Загрузка..." при отсутствии данных
    }

    return (
        <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div>
                <span
                    style={{
                        display: "inline-block", // Блочный элемент для круга
                        width: "20px", // Ширина круга
                        height: "20px", // Высота круга
                        borderRadius: "50%", // Закругление до формы круга
                        backgroundColor: heroes[0].spellColor, // Цвет круга соответствует цвету спеллов первого героя
                        marginRight: "10px", // Отступ справа
                    }}
                />
                <span>Hero 1: {heroes[0] ? heroes[0].hits : 0} hits</span>{" "}
                {/* Количество попаданий первого героя */}
            </div>
            <div>
                <span
                    style={{
                        display: "inline-block", // Блочный элемент для круга
                        width: "20px", // Ширина круга
                        height: "20px", // Высота круга
                        borderRadius: "50%", // Закругление до формы круга
                        backgroundColor: heroes[1].spellColor, // Цвет круга соответствует цвету спеллов второго героя
                        marginRight: "10px", // Отступ справа
                    }}
                />
                <span>Hero 2: {heroes[1] ? heroes[1].hits : 0} hits</span>{" "}
                {/* Количество попаданий второго героя */}
            </div>
        </div>
    );
};

export default Scoreboard;
