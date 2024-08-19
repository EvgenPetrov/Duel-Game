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
            spellColor: "#FF0000",
            spellSpeed: 1,
            hits: 0,
            id: 1,
        },
        {
            x: canvasWidth - 50,
            y: canvasHeight / 2,
            radius: 20,
            speed: 2,
            direction: -1,
            fireRate: 0.02,
            spellColor: "#0000FF",
            spellSpeed: 1,
            hits: 0,
            id: 2,
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

export function updateGame(context, canvasWidth, canvasHeight, heroes, spells, mousePos) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

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

        context.beginPath();
        context.arc(hero.x, hero.y, hero.radius, 0, 2 * Math.PI);
        context.fillStyle = hero.spellColor;
        context.fill();

        return hero;
    });

    const updatedSpells = spells
        .map((spell) => {
            spell.x += spell.speed * spell.direction;

            context.beginPath();
            context.arc(spell.x, spell.y, spell.radius, 0, 2 * Math.PI);
            context.fillStyle = spell.color;
            context.fill();

            if (spell.x < 0 || spell.x > canvasWidth) {
                return null;
            }
            return spell;
        })
        .filter((spell) => spell !== null);

    const remainingSpells = [];
    updatedSpells.forEach((spell) => {
        let hasHit = false;

        const targetHero = heroes.find((hero) => hero.id !== spell.ownerId);

        if (targetHero && checkCollision(targetHero, spell) && !hasHit) {
            const shooterHero = heroes.find((hero) => hero.id === spell.ownerId);
            if (shooterHero) {
                shooterHero.hits += 1;
                console.log(
                    `Hero ${shooterHero.id} scored a hit on Hero ${targetHero.id}! New hits: ${shooterHero.hits}`
                );
            }
            hasHit = true;
        }

        if (!hasHit) {
            remainingSpells.push(spell);
        }
    });

    const newSpells = [];
    heroes.forEach((hero) => {
        // Теперь частота создания спеллов зависит от скорости спелла
        const adjustedFireRate = hero.fireRate * hero.spellSpeed;

        if (Math.random() < adjustedFireRate) {
            const targetHero = heroes.find((h) => h.id !== hero.id);

            if (targetHero) {
                const direction = targetHero.x > hero.x ? 1 : -1;
                const newSpell = {
                    x: hero.x,
                    y: hero.y,
                    radius: 5,
                    speed: hero.spellSpeed, // Используем spellSpeed
                    direction: direction,
                    color: hero.spellColor,
                    ownerId: hero.id,
                    id: Date.now() + Math.random(),
                };

                newSpells.push(newSpell);
            }
        }
    });

    return { updatedHeroes, updatedSpells: remainingSpells.concat(newSpells) };
}
