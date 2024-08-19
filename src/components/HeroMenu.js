import React, { useState } from "react";
import "../styles/Canvas.css";

const HeroMenu = ({ hero, onColorChange, onSpeedChange }) => {
    const [color, setColor] = useState(hero.spellColor);
    const [speed, setSpeed] = useState(hero.speed);

    const handleColorChange = (e) => {
        setColor(e.target.value);
        onColorChange(e.target.value);
    };

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        onSpeedChange(newSpeed);
    };

    return (
        <div className="hero-menu">
            <h3>Hero Menu</h3>
            <div>
                <label>Spell Color:</label>
                <input type="color" value={color} onChange={handleColorChange} />
            </div>
            <div>
                <label>Speed:</label>
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
        </div>
    );
};

export default HeroMenu;
