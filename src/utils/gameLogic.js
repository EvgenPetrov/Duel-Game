// Функция инициализации игры
export function initializeGame(canvasWidth, canvasHeight) {
    // Инициализируем двух героев с начальными позициями, размерами, скоростью и другими параметрами
    const heroes = [
        {
            x: 50, // Начальная позиция по X для первого героя
            y: canvasHeight / 2, // Начальная позиция по Y (середина канваса)
            radius: 20, // Радиус героя
            speed: 2, // Скорость движения героя
            direction: 1, // Направление движения (1 - вниз, -1 - вверх)
            fireRate: 0.02, // Частота выстрелов (вероятность выстрела в каждом кадре)
            spellColor: "#FF0000", // Цвет спеллов, выпускаемых героем
            spellSpeed: 1, // Скорость спеллов
            hits: 0, // Количество попаданий, совершенных героем
            id: 1, // Идентификатор героя
        },
        {
            x: canvasWidth - 50, // Начальная позиция по X для второго героя
            y: canvasHeight / 2, // Начальная позиция по Y (середина канваса)
            radius: 20, // Радиус героя
            speed: 2, // Скорость движения героя
            direction: -1, // Направление движения (-1 - вверх, 1 - вниз)
            fireRate: 0.02, // Частота выстрелов (вероятность выстрела в каждом кадре)
            spellColor: "#0000FF", // Цвет спеллов, выпускаемых героем
            spellSpeed: 1, // Скорость спеллов
            hits: 0, // Количество попаданий, совершенных героем
            id: 2, // Идентификатор героя
        },
    ];

    const spells = []; // Изначально спеллы пустые, добавляются в процессе игры
    return { heroes, spells }; // Возвращаем начальные состояния героев и спеллов
}

// Проверка столкновения спелла с героем
function checkCollision(hero, spell) {
    // Вычисляем расстояние между центрами героя и спелла
    const dx = hero.x - spell.x;
    const dy = hero.y - spell.y;
    const distance = Math.sqrt(dx * dx + dy * dy); // Дистанция между объектами
    // Проверяем, меньше ли это расстояние суммы радиусов героя и спелла (значит, произошло столкновение)
    return distance < hero.radius + spell.radius;
}

// Основная функция обновления состояния игры
export function updateGame(context, canvasWidth, canvasHeight, heroes, spells, mousePos) {
    context.clearRect(0, 0, canvasWidth, canvasHeight); // Очищаем канвас перед перерисовкой

    // Обновляем состояние героев
    const updatedHeroes = heroes.map((hero) => {
        // Обновляем положение героя на основе его скорости и направления
        hero.y += hero.speed * hero.direction;

        // Проверка на столкновение с границами канваса и изменение направления движения
        if (hero.y <= hero.radius || hero.y >= canvasHeight - hero.radius) {
            hero.direction *= -1;
        }

        // Проверка на столкновение героя с курсором мыши и изменение направления движения
        const dx = hero.x - mousePos.x;
        const dy = hero.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < hero.radius) {
            hero.direction *= -1;
        }

        // Рисуем героя на канвасе
        context.beginPath();
        context.arc(hero.x, hero.y, hero.radius, 0, 2 * Math.PI);
        context.fillStyle = hero.spellColor; // Используем цвет спелла как цвет героя
        context.fill();

        return hero; // Возвращаем обновленного героя
    });

    // Обновляем состояние спеллов
    const updatedSpells = spells
        .map((spell) => {
            spell.x += spell.speed * spell.direction; // Обновляем положение спелла

            // Рисуем спелл на канвасе
            context.beginPath();
            context.arc(spell.x, spell.y, spell.radius, 0, 2 * Math.PI);
            context.fillStyle = spell.color;
            context.fill();

            // Проверяем, вышел ли спелл за границы канваса, если да - удаляем его
            if (spell.x < 0 || spell.x > canvasWidth) {
                return null;
            }
            return spell; // Возвращаем обновленный спелл
        })
        .filter((spell) => spell !== null); // Убираем спеллы, которые вышли за границы канваса

    const remainingSpells = []; // Список спеллов, оставшихся на поле после проверки столкновений
    updatedSpells.forEach((spell) => {
        let hasHit = false; // Флаг, указывающий, что спелл попал в цель

        const targetHero = heroes.find((hero) => hero.id !== spell.ownerId); // Находим героя, который не является владельцем спелла

        // Проверка на столкновение спелла с героем
        if (targetHero && checkCollision(targetHero, spell) && !hasHit) {
            const shooterHero = heroes.find((hero) => hero.id === spell.ownerId); // Находим героя, который выпустил спелл
            if (shooterHero) {
                shooterHero.hits += 1; // Увеличиваем количество попаданий у стрелявшего героя
                console.log(
                    `Герой ${shooterHero.id} попал в Героя ${targetHero.id}! Новое количество попаданий: ${shooterHero.hits}`
                );
            }
            hasHit = true; // Устанавливаем флаг попадания
        }

        // Если спелл не попал в цель, оставляем его на поле
        if (!hasHit) {
            remainingSpells.push(spell);
        }
    });

    const newSpells = []; // Список новых спеллов, созданных в этом обновлении
    heroes.forEach((hero) => {
        const adjustedFireRate = hero.fireRate * hero.spellSpeed; // Корректируем частоту выстрелов на основе скорости спеллов

        // Определяем вероятность выстрела
        if (Math.random() < adjustedFireRate) {
            const targetHero = heroes.find((h) => h.id !== hero.id); // Находим цель для выстрела

            if (targetHero) {
                const direction = targetHero.x > hero.x ? 1 : -1; // Определяем направление выстрела
                const newSpell = {
                    x: hero.x, // Позиция спелла по X
                    y: hero.y, // Позиция спелла по Y
                    radius: 5, // Радиус спелла
                    speed: hero.spellSpeed, // Скорость спелла
                    direction: direction, // Направление движения спелла
                    color: hero.spellColor, // Цвет спелла
                    ownerId: hero.id, // Идентификатор владельца спелла
                    id: Date.now() + Math.random(), // Уникальный идентификатор спелла
                };

                newSpells.push(newSpell); // Добавляем новый спелл в список
            }
        }
    });

    return { updatedHeroes, updatedSpells: remainingSpells.concat(newSpells) }; // Возвращаем обновленные списки героев и спеллов
}
