import promptSync from "prompt-sync";
import chalk from "chalk";
import fs from "fs";

const prompt = promptSync();

// ======================================
// ASCII ART TITULO
// ======================================

console.log(chalk.cyan(`
██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔════╝
██████╔╝██████╔╝██║  ███╗
██╔══██╗██╔═══╝ ██║   ██║
██║  ██║██║     ╚██████╔╝
╚═╝  ╚═╝╚═╝      ╚═════╝

⚔️ RPG SYSTEM ⚔️
`));

// ======================================
// CONSTRUCTOR PLAYER
// ======================================

function Player(name, level, hp, atk, weapon) {

    this.name = name;
    this.level = level;
    this.hp = hp;
    this.maxHp = hp;
    this.atk = atk;
    this.weapon = weapon;
    this.inventory = [];
    this.gold = 100;
    this.exp = 0;

    // ==================================
    // DESCRIBE
    // ==================================

    this.describe = function () {

        console.log(chalk.green(`
==========================
${this.name} (Lv.${this.level})
HP: ${this.hp}/${this.maxHp}
ATK: ${this.atk}
Weapon: ${this.weapon}
Gold: ${this.gold}
EXP: ${this.exp}
==========================
`));
    };

    // ==================================
    // ATTACK
    // ==================================

    this.attack = function (enemy) {

        let damage = Math.floor(Math.random() * this.atk) + 1;

        // CRITICO

        let criticalChance = Math.random();

        if (criticalChance < 0.2) {

            damage *= 2;

            console.log(chalk.red(`
💥 GOLPE CRÍTICO 💥
`));
        }

        enemy.hp -= damage;

        if (enemy.hp < 0) {
            enemy.hp = 0;
        }

        console.log(
            chalk.yellow(
                `${this.name} ataca a ${enemy.name} con ${this.weapon} y hace ${damage} daño`
            )
        );

        console.log(
            chalk.red(
                `${enemy.name} HP restante: ${enemy.hp}`
            )
        );

        // ENEMIGO DERROTADO

        if (enemy.hp === 0) {

            console.log(chalk.magenta(`
☠️ ${enemy.name} ha sido derrotado
`));

            // GOLD

            let goldReward = enemy.level * 20;

            this.gold += goldReward;

            console.log(
                chalk.yellow(
                    `Ganaste ${goldReward} gold`
                )
            );

            // EXP

            let expReward = enemy.level * 30;

            this.exp += expReward;

            console.log(
                chalk.blue(
                    `Ganaste ${expReward} EXP`
                )
            );

            // LEVEL UP

            if (this.exp >= this.level * 100) {

                this.level++;

                this.exp = 0;

                this.maxHp += 20;

                this.hp = this.maxHp;

                this.atk += 5;

                console.log(chalk.green(`
⬆️ SUBISTE A NIVEL ${this.level}
`));
            }
        }
    };

    // ==================================
    // HEAL
    // ==================================

    this.heal = function (amount) {

        this.hp = Math.min(
            this.hp + amount,
            this.maxHp
        );

        console.log(
            chalk.green(
                `${this.name} recuperó ${amount} HP`
            )
        );
    };

    // ==================================
    // INVENTARIO
    // ==================================

    this.addItem = function (item) {

        this.inventory.push(item);

        console.log(`${item} agregado al inventario`);
    };

    this.removeItem = function () {

        if (this.inventory.length > 0) {

            let removed = this.inventory.pop();

            console.log(`${removed} eliminado`);

        } else {

            console.log("Inventario vacío");
        }
    };
}

// ======================================
// PLAYER
// ======================================

const player = new Player(
    "Hackerman",
    1,
    100,
    20,
    "Sword"
);

// ======================================
// ENEMIGOS
// ======================================

const enemies = [

    {
        name: "Goblin",
        hp: 40,
        atk: 10,
        level: 2
    },

    {
        name: "Orc",
        hp: 70,
        atk: 15,
        level: 5
    },

    {
        name: "Dragon",
        hp: 200,
        atk: 50,
        level: 10
    }
];

// ======================================
// BOSS SPAWN
// ======================================

let finalBossSpawned = false;

// ======================================
// ASCII ART ENEMIGOS
// ======================================

function showEnemyArt(enemyName) {

    switch (enemyName.toLowerCase()) {

        case "goblin":

            console.log(chalk.green(`
      ,      ,
     /(.-""-.)\\
     |\\  \\/  /|
     | \\ / =/ |
     \\(_/\\_)/
      /  _  \\
     /__/ \\__\\

        GOBLIN
`));

            break;

        case "orc":

            console.log(chalk.green(`
        .-^^^^-.
      .'  >  <  '.
     /    ----    \\
    |   (______)   |
    |  /  __  \\   |
     \\ | |  | |  /
      \\| |__| | /
       '-.____.-'

          ORC
`));

            break;

        case "dragon":

            console.log(chalk.magenta(`
               / \\  //\\\\
      |\\___/|      \\\\
      /O  O  \\__     \\\\
     /     /  \\/_     \\\\
     @_^_@'/   \\/_   /
     //_^_/     \\/_ /
  ( //) |        \\\\/
( / /) _|_ /   )  //

         DRAGON
`));

            break;

        case "virus":

            console.log(chalk.green(`
                     .ed"""" """$$$$be.
                   -"           ^""**$$$e.
                 ."                   '$$$c
                /                      "4$$b
               d  3                      $$$$
               $  *                   .$$$$$$
              .$  ^c           $$$$$e$$$$$$$$.
              d$L  4.         4$$$$$$$$$$$$$$b
              $$$$b ^ceeeee.  4$$ECL.F*$$$$$$$
  e$""=.      $$$$P d$$$$F $ $$$$$$$$$- $$$$$$
 z$$b. ^c     3$$$F "$$$$b   $"$$$$$$$  $$$$*"      .=""$c
4$$$$L        $$P"  "$$b   .$ $$$$$...e$$        .=  e$$$.
^*$$$$$c  %..   *c    ..    $$ 3$$$$$$$$$$eF     zP  d$$$$$
  "**$$$ec   "   %ce""    $$$  $$$$$$$$$$*    .r" =$$$$P""
        "*$b.  "c  *$e.    *** d$$$$$"L$$    .d"  e$$***"
          ^*$$c ^$c $$$      4J$$$$$% $$$ .e*".eeP"
             "$$$$$$"'$=e....$*$$**$cz$$" "..d$*"
               "*$$$  *=%4.$ L L$ P3$$$F $$$P"
                  "$   "%*ebJLzb$e$$$$$b $P"
                    %..      4$$$$$$$$$$ "
                     $$$e   z$$$$$$$$$$%
                      "*$c  "$$$$$$$P"
                       ."""*$$$$$$$$bc
                    .-"    .$***$$$"""*e.
                 .-"    .e$"     "*$c  ^*b.
          .=*""""    .e$*"          "*bc  "*$e..
        .$"        .z*"               ^*$e.   "*****e.
        $$ee$c   .d"                     "*$.        3.
        ^*$E")$..$"                         *   .ee==d%
           $.d$$$*                           *  J$$$e*
            """""                              "$$$"

                ☣️ VIRUS ☣️
`));

            break;

        default:

            console.log(chalk.yellow(`
UNKNOWN ENEMY
`));
    }
}

// ======================================
// TIENDA
// ======================================

const shop = [

    {
        name: "Potion",
        price: 30
    },

    {
        name: "Mega Potion",
        price: 60
    },

    {
        name: "Elixir",
        price: 100
    }
];

// ======================================
// SAVE GAME
// ======================================

function saveGame() {

    const saveData = {

        name: player.name,
        level: player.level,
        hp: player.hp,
        maxHp: player.maxHp,
        atk: player.atk,
        weapon: player.weapon,
        inventory: player.inventory,
        gold: player.gold,
        exp: player.exp
    };

    fs.writeFileSync(
        "save.json",
        JSON.stringify(saveData, null, 2)
    );

    console.log(chalk.green(`
💾 PARTIDA GUARDADA
`));
}

// ======================================
// LOAD GAME
// ======================================

function loadGame() {

    if (!fs.existsSync("save.json")) {
        return;
    }

    const fileContent = fs.readFileSync(
        "save.json",
        "utf-8"
    );

    if (
        fileContent.trim() === "" ||
        fileContent.trim() === "{}"
    ) {

        return;
    }

    try {

        const data = JSON.parse(fileContent);

        if (
            typeof data.name === "string" &&
            typeof data.level === "number"
        ) {

            player.name = data.name;
            player.level = data.level;
            player.hp = data.hp;
            player.maxHp = data.maxHp;
            player.atk = data.atk;
            player.weapon = data.weapon;
            player.inventory = data.inventory || [];
            player.gold = data.gold || 100;
            player.exp = data.exp || 0;

            console.log(chalk.green(`
📂 PARTIDA CARGADA
`));
        }

    } catch {

        console.log(chalk.red(`
❌ ERROR AL CARGAR PARTIDA
`));
    }
}

// ======================================
// LOAD
// ======================================

loadGame();

// ======================================
// MENU
// ======================================

let option;

do {

    // ==================================
    // GAME OVER
    // ==================================

    if (player.hp <= 0) {

        console.log(chalk.red(`
☠️ GAME OVER ☠️
`));

        break;
    }

    console.log(chalk.cyan(`
=================================
1. Ver jugador
2. Atacar enemigo
3. Curarse
4. Agregar item
5. Ver inventario
6. Agregar enemigo
7. Ver enemigos
8. Buscar enemigo
9. Filtrar enemigos fuertes
10. Ver enemigos especiales
11. Eliminar último item
12. Tienda
13. Guardar partida
0. Salir
=================================
`));

    option = Number(
        prompt("Seleccione opción: ")
    );

    switch (option) {

        case 1:

            player.describe();

            break;

        case 2:

            // ==================================
            // SPAWN BOSS
            // ==================================

            if (
                enemies.length === 0 &&
                !finalBossSpawned
            ) {

                enemies.push({

                    name: "Virus",
                    hp: 500,
                    atk: 80,
                    level: 20
                });

                finalBossSpawned = true;

                console.log(chalk.red(`
🔥 EL BOSS FINAL HA APARECIDO 🔥
`));
            }

            if (enemies.length === 0) {

                console.log(chalk.green(`
🏆 HAS DERROTADO A TODOS LOS ENEMIGOS
`));

                break;
            }

            console.log(chalk.red(`
===== ENEMIGOS =====
`));

            for (let i = 0; i < enemies.length; i++) {

                console.log(
                    `${i + 1}. ${enemies[i].name} - HP:${enemies[i].hp}`
                );
            }

            let enemyIndex = parseInt(
                prompt("Seleccione enemigo: ")
            ) - 1;

            if (
                enemyIndex >= 0 &&
                enemyIndex < enemies.length
            ) {

                let selectedEnemy = enemies[enemyIndex];

                showEnemyArt(selectedEnemy.name);

                player.attack(selectedEnemy);

                // ENEMIGO MUERE

                if (selectedEnemy.hp <= 0) {

                    enemies.splice(enemyIndex, 1);

                } else {

                    // CONTRAATAQUE

                    let enemyDamage = Math.floor(
                        Math.random() * selectedEnemy.atk
                    ) + 1;

                    player.hp -= enemyDamage;

                    if (player.hp < 0) {
                        player.hp = 0;
                    }

                    console.log(
                        chalk.red(
                            `${selectedEnemy.name} contraataca y hace ${enemyDamage} daño`
                        )
                    );

                    console.log(
                        chalk.yellow(
                            `Tu HP: ${player.hp}/${player.maxHp}`
                        )
                    );
                }

            } else {

                console.log("Enemigo inválido");
            }

            break;

        case 3:

            let healAmount = parseInt(
                prompt("Cantidad curación: ")
            );

            player.heal(healAmount);

            break;

        case 4:

            let item = prompt("Nuevo item: ");

            player.addItem(item);

            break;

        case 5:

            console.log(chalk.green(`
===== INVENTARIO =====
`));

            if (player.inventory.length === 0) {

                console.log("Inventario vacío");

            } else {

                for (let i = 0; i < player.inventory.length; i++) {

                    console.log(
                        `${i + 1}. ${player.inventory[i]}`
                    );
                }
            }

            break;

        case 6:

            let enemyName = prompt("Nombre enemigo: ");

            let enemyHp = Number(
                prompt("HP enemigo: ")
            );

            let enemyAtk = parseFloat(
                prompt("ATK enemigo: ")
            );

            let enemyLevel = parseInt(
                prompt("Nivel enemigo: ")
            );

            enemies.push({

                name: enemyName,
                hp: enemyHp,
                atk: enemyAtk,
                level: enemyLevel
            });

            console.log("Enemigo agregado");

            break;

        case 7:

            console.log(chalk.red(`
===== ENEMIGOS =====
`));

            for (let enemy of enemies) {

                console.log(
                    `${enemy.name} | HP:${enemy.hp} | LV:${enemy.level}`
                );
            }

            break;

        case 8:

            let search = prompt(
                "Buscar enemigo: "
            );

            let foundEnemy = enemies.find(

                enemy =>
                    enemy.name.toLowerCase() ===
                    search.toLowerCase()
            );

            if (foundEnemy) {

                console.log(foundEnemy);

            } else {

                console.log("No encontrado");
            }

            break;

        case 9:

            let strongEnemies = enemies.filter(

                enemy => enemy.level >= 10
            );

            console.log(strongEnemies);

            break;

        case 10:

            let upperEnemies = enemies.map(

                enemy => enemy.name.toUpperCase()
            );

            console.log(upperEnemies);

            break;

        case 11:

            player.removeItem();

            break;

        case 12:

            console.log(chalk.yellow(`
===== TIENDA =====
`));

            for (let i = 0; i < shop.length; i++) {

                console.log(
                    `${i + 1}. ${shop[i].name} - ${shop[i].price} gold`
                );
            }

            let buyOption = parseInt(
                prompt("Comprar item: ")
            ) - 1;

            if (
                buyOption >= 0 &&
                buyOption < shop.length
            ) {

                let itemBuy = shop[buyOption];

                if (player.gold >= itemBuy.price) {

                    player.gold -= itemBuy.price;

                    player.inventory.push(
                        itemBuy.name
                    );

                    console.log(
                        `Compraste ${itemBuy.name}`
                    );

                } else {

                    console.log("Gold insuficiente");
                }
            }

            break;

        case 13:

            saveGame();

            break;

        case 0:

            console.log(chalk.cyan(`
Gracias por jugar ⚔️
`));

            break;

        default:

            console.log("Opción inválida");
    }

} while (option !== 0);
