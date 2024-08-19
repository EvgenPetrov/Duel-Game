// Функция инициализации игры
export function initializeGame(canvasWidth, canvasHeight) {
    const heroes = [
        {
            x: 50,
            y: canvasHeight / 2,
            radius: 20,
            speed: 2,
            direction: 1,
            fireRate: 0.02,
            spellColor: "#0095DD", // Цвет спелла для первого героя
            hits: 0, // Счетчик попаданий
        },
        {
            x: canvasWidth - 50,
            y: canvasHeight / 2,
            radius: 20,
            speed: 2,
            direction: -1,
            fireRate: 0.02,
            spellColor: "#DD9500", // Цвет спелла для второго героя
            hits: 0, // Счетчик попаданий
        },
    ];

    const spells = []; // Изначально спеллы пустые
    return { heroes, spells };
}

// Проверка столкновения спелла с героем
function checkCollision(hero, spell) {
    const dx = hero.x - spell.x;
    const dy = hero.y - spell.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < hero.radius + spell.radius;
}

// Функция обновления состояния игры
export function updateGame(context, canvasWidth, canvasHeight, heroes, spells, mousePos) {
    if (!context) {
        console.error("Context is null");
        return { updatedHeroes: heroes, updatedSpells: spells };
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Отрисовка границ канваса (для отладки)
    context.beginPath();
    context.rect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = "#FF0000"; // Ярко-красный цвет для границы
    context.stroke();

    const updatedHeroes = heroes.map((hero) => {
        hero.y += hero.speed * hero.direction;
        if (hero.y <= hero.radius || hero.y >= canvasHeight - hero.radius) {
            hero.direction *= -1;
        }

        const dx = hero.x - mousePos.x;
        const dy = hero.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < hero.radius) {
            hero.direction *= -1;
        }

        // Отрисовка героя
        context.beginPath();
        context.arc(hero.x, hero.y, hero.radius, 0, 2 * Math.PI);
        context.fillStyle = hero.spellColor;
        context.fill();
        context.strokeStyle = "#000";
        context.stroke();

        return hero;
    });

    const updatedSpells = spells
        .map((spell) => {
            spell.x += spell.speed * spell.direction;

            // Проверка на столкновение с героями
            const targetHero = heroes.find((hero) => checkCollision(hero, spell));
            if (targetHero) {
                targetHero.hits += 1; // Увеличиваем счетчик попаданий
                return null; // Удаляем спелл
            }

            // Отрисовка заклинания
            context.beginPath();
            context.arc(spell.x, spell.y, spell.radius, 0, 2 * Math.PI);
            context.fillStyle = spell.color;
            context.fill();
            context.strokeStyle = "#000";
            context.stroke();

            return spell;
        })
        .filter((spell) => spell !== null);

    // Создание новых заклинаний
    const newSpells = [];
    heroes.forEach((hero, index) => {
        if (Math.random() < hero.fireRate) {
            const newSpell = {
                x: hero.x,
                y: hero.y,
                radius: 5,
                speed: 2,
                direction: index === 0 ? 1 : -1,
                color: hero.spellColor, // Используем цвет героя
            };

            // Отладка: логируем новые заклинания
            console.log("New spell created:", newSpell);

            newSpells.push(newSpell);
        }
    });

    return { updatedHeroes, updatedSpells: [...updatedSpells, ...newSpells] };
}
