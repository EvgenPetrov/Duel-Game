import React, { useEffect, useRef, useState } from "react";
import { initializeGame, updateGame } from "../utils/gameLogic";
import Scoreboard from "./ScoreBoard";
import HeroMenu from "./HeroMenu";
import "../styles/Canvas.css";

const Canvas = () => {
    const canvasRef = useRef(null);
    const gameState = useRef({ heroes: [], spells: [] });
    const mousePos = useRef({ x: 0, y: 0 });
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 400;

        // Инициализация игры
        gameState.current = initializeGame(canvas.width, canvas.height);
        setHeroes(gameState.current.heroes);

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        };

        const gameLoop = () => {
            const { heroes, spells } = gameState.current;
            const { updatedHeroes, updatedSpells } = updateGame(
                ctx,
                canvas.width,
                canvas.height,
                heroes,
                spells,
                mousePos.current
            );
            gameState.current = { heroes: updatedHeroes, spells: updatedSpells };
            setHeroes(updatedHeroes);
            requestAnimationFrame(gameLoop);
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        gameLoop();

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleColorChange = (heroIndex, color) => {
        const updatedHeroes = [...heroes];
        updatedHeroes[heroIndex].spellColor = color;
        setHeroes(updatedHeroes);
    };

    const handleSpeedChange = (heroIndex, speed) => {
        const updatedHeroes = [...heroes];
        updatedHeroes[heroIndex].speed = speed;
        setHeroes(updatedHeroes);
    };

    const handleSpellSpeedChange = (heroIndex, spellSpeed) => {
        const updatedHeroes = [...heroes];
        updatedHeroes[heroIndex].spellSpeed = spellSpeed;
        setHeroes(updatedHeroes);
    };

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} width="800" height="400" className="game-canvas"></canvas>
            <Scoreboard heroes={heroes} />
            <div className="hero-menus">
                {heroes.map((hero, index) => (
                    <HeroMenu
                        key={index}
                        hero={hero}
                        onColorChange={(color) => handleColorChange(index, color)}
                        onSpeedChange={(speed) => handleSpeedChange(index, speed)}
                        onSpellSpeedChange={(spellSpeed) =>
                            handleSpellSpeedChange(index, spellSpeed)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Canvas;
