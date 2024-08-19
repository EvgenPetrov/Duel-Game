import React, { useState, useEffect } from "react";
import "../styles/Canvas.css";

const HeroMenu = ({ hero, onColorChange, onSpeedChange, onSpellSpeedChange }) => {
    const [color, setColor] = useState(hero.spellColor);
    const [speed, setSpeed] = useState(hero.speed);
    const [spellSpeed, setSpellSpeed] = useState(hero.spellSpeed || 2); // Значение по умолчанию для скорости спеллов

    // Обновление локального состояния при изменении пропсов
    useEffect(() => {
        setColor(hero.spellColor);
        setSpeed(hero.speed);
        setSpellSpeed(hero.spellSpeed || 2);
    }, [hero]);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        onColorChange(newColor);
    };

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        onSpeedChange(newSpeed);
    };

    const handleSpellSpeedChange = (e) => {
        const newSpellSpeed = parseFloat(e.target.value);
        setSpellSpeed(newSpellSpeed);
        if (onSpellSpeedChange) {
            onSpellSpeedChange(newSpellSpeed);
        } else {
            console.warn("onSpellSpeedChange is not defined");
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
                <span>{speed.toFixed(1)}</span>
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
                <span>{spellSpeed.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default HeroMenu;
