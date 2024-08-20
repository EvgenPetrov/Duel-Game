import React, { useEffect, useRef, useState } from "react";
import { initializeGame, updateGame } from "../utils/gameLogic";
import Scoreboard from "./ScoreBoard";
import HeroMenu from "./HeroMenu";
import "../styles/Canvas.css";

// Главный компонент Canvas, который будет управлять игровым процессом
const Canvas = () => {
    const canvasRef = useRef(null); // Реф для доступа к элементу canvas
    const gameState = useRef({ heroes: [], spells: [] }); // Реф для хранения состояния игры (герои и спеллы)
    const mousePos = useRef({ x: 0, y: 0 }); // Реф для хранения позиции мыши
    const [heroes, setHeroes] = useState([]); // Состояние для хранения списка героев

    // useEffect, который запускается при первом рендере компонента
    useEffect(() => {
        const canvas = canvasRef.current; // Доступ к элементу canvas через ref
        const ctx = canvas.getContext("2d"); // Получаем 2D контекст для рисования на холсте

        canvas.width = 800; // Устанавливаем ширину холста
        canvas.height = 400; // Устанавливаем высоту холста

        // Инициализация игры с помощью функции initializeGame, которая возвращает начальное состояние игры
        gameState.current = initializeGame(canvas.width, canvas.height);
        setHeroes(gameState.current.heroes); // Обновляем состояние героев в соответствии с инициализированным состоянием игры

        // Функция-обработчик для обновления позиции мыши при движении
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect(); // Получаем положение холста относительно окна браузера
            mousePos.current = {
                x: event.clientX - rect.left, // Рассчитываем x-координату курсора относительно холста
                y: event.clientY - rect.top, // Рассчитываем y-координату курсора относительно холста
            };
        };

        // Основной игровой цикл
        const gameLoop = () => {
            const { heroes, spells } = gameState.current; // Достаем текущее состояние героев и спеллов
            const { updatedHeroes, updatedSpells } = updateGame(
                ctx,
                canvas.width,
                canvas.height,
                heroes,
                spells,
                mousePos.current // Передаем текущую позицию мыши
            );
            gameState.current = { heroes: updatedHeroes, spells: updatedSpells }; // Обновляем текущее состояние игры
            setHeroes(updatedHeroes); // Обновляем состояние героев
            requestAnimationFrame(gameLoop); // Рекурсивно вызываем игровой цикл с помощью requestAnimationFrame
        };

        canvas.addEventListener("mousemove", handleMouseMove); // Добавляем слушатель для отслеживания движений мыши
        gameLoop(); // Запускаем игровой цикл

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove); // Удаляем слушатель при размонтировании компонента
        };
    }, []);

    // Обработчик изменения цвета спелла героя
    const handleColorChange = (heroIndex, color) => {
        const updatedHeroes = [...heroes]; // Создаем копию массива героев
        updatedHeroes[heroIndex].spellColor = color; // Изменяем цвет спелла у выбранного героя
        setHeroes(updatedHeroes); // Обновляем состояние героев
    };

    // Обработчик изменения скорости героя
    const handleSpeedChange = (heroIndex, speed) => {
        const updatedHeroes = [...heroes]; // Создаем копию массива героев
        updatedHeroes[heroIndex].speed = speed; // Изменяем скорость у выбранного героя
        setHeroes(updatedHeroes); // Обновляем состояние героев
    };

    // Обработчик изменения скорости спеллов героя
    const handleSpellSpeedChange = (heroIndex, spellSpeed) => {
        const updatedHeroes = [...heroes]; // Создаем копию массива героев
        updatedHeroes[heroIndex].spellSpeed = spellSpeed; // Изменяем скорость спеллов у выбранного героя
        setHeroes(updatedHeroes); // Обновляем состояние героев
    };

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} width="800" height="400" className="game-canvas"></canvas>
            {/* Компонент для отображения табло с результатами */}
            <Scoreboard heroes={heroes} />
            {/* Меню для настройки героев */}
            <div className="hero-menus">
                {heroes.map((hero, index) => (
                    <HeroMenu
                        key={index}
                        hero={hero} // Передаем текущего героя в компонент HeroMenu
                        onColorChange={(color) => handleColorChange(index, color)} // Обработчик изменения цвета
                        onSpeedChange={(speed) => handleSpeedChange(index, speed)} // Обработчик изменения скорости
                        onSpellSpeedChange={(spellSpeed) =>
                            handleSpellSpeedChange(index, spellSpeed)
                        } // Обработчик изменения скорости спеллов
                    />
                ))}
            </div>
        </div>
    );
};

export default Canvas;
