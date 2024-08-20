// Компонент HeroMenu для настройки параметров героя
import React, { useState, useEffect } from "react";
import "../styles/Canvas.css";

// Компонент HeroMenu, который позволяет изменять параметры героя
const HeroMenu = ({ hero, onColorChange, onSpeedChange, onSpellSpeedChange }) => {
    const [color, setColor] = useState(hero.spellColor); // Локальное состояние для цвета спелла
    const [speed, setSpeed] = useState(hero.speed); // Локальное состояние для скорости героя
    const [spellSpeed, setSpellSpeed] = useState(hero.spellSpeed || 2); // Локальное состояние для скорости спелла (значение по умолчанию 2)

    // Обновляем локальное состояние при изменении пропсов
    useEffect(() => {
        setColor(hero.spellColor);
        setSpeed(hero.speed);
        setSpellSpeed(hero.spellSpeed || 2);
    }, [hero]);

    // Обработчик изменения цвета
    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        onColorChange(newColor); // Вызываем переданный пропс onColorChange с новым значением цвета
    };

    // Обработчик изменения скорости героя
    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        onSpeedChange(newSpeed); // Вызываем переданный пропс onSpeedChange с новым значением скорости
    };

    // Обработчик изменения скорости спелла
    const handleSpellSpeedChange = (e) => {
        const newSpellSpeed = parseFloat(e.target.value);
        setSpellSpeed(newSpellSpeed);
        if (onSpellSpeedChange) {
            onSpellSpeedChange(newSpellSpeed); // Вызываем переданный пропс onSpellSpeedChange с новым значением скорости спелла
        } else {
            console.warn("onSpellSpeedChange is not defined"); // Если обработчик не передан, выводим предупреждение в консоль
        }
    };

    return (
        <div className="hero-menu">
            <h3>Hero Menu</h3>
            <div>
                <label>Spell Color:</label>
                <input type="color" value={color} onChange={handleColorChange} />
            </div>
            <div>
                <label>Hero Speed:</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={speed}
                    onChange={handleSpeedChange}
                />
                <span>{speed.toFixed(1)}</span> {/* Отображаем текущее значение скорости */}
            </div>
            <div>
                <label>Spell Speed:</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={spellSpeed}
                    onChange={handleSpellSpeedChange}
                />
                <span>{spellSpeed.toFixed(1)}</span>{" "}
                {/* Отображаем текущее значение скорости спелла */}
            </div>
        </div>
    );
};

export default HeroMenu;
