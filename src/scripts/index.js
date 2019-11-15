import config from './parts/Config';
import View from './parts/View';
import Player from './parts/Player';

const menu = new View(config);

const gameBlock = document.querySelector('.game');
const finalText = document.querySelector('.final-text');

const buttonFindEnemy = document.querySelector('.js-find-enemy');

class Game {
    constructor(player1, player2, config, view) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
        this.currentTurnPlayer = player1;
        this.view = view;
        this.config = config;
        this.fullTurn = 0;
        this.canTurn = true;
        this.turnTimer = null;
        // this.AIKeys = ['KeyW', 'KeyS', 'KeyF', 'KeyG', 'KeyH', 'KeyJ'];
        this.play = false;
        this.view.updateMenu();
    }

    makeTurn(code) {
        let attack = this.convertAttack(code);
        clearTimeout(this.turnTimer);
        this.currentPlayer.setAttack(attack);
        this.currentPlayer.changeAction();
        this.currentPlayer.action.innerHTML = attack.name;
        this.fullTurn++;
        if (this.fullTurn >= 2) {
            this.endTurn();
        } else {
            this.changePlayer();
            this.turnTimer = setTimeout(() => {
                this.endTurn();
            }, 1000);
        }
    }

    convertAttack(code) {
        if (typeof code === "string") {
            return this.currentPlayer.controls[code];
        } else {
            return code;
        }
    }

    endTurn() {
        clearTimeout(this.turnTimer);
        this.canTurn = false;
        this.turnTimer = setTimeout(() => {
            this.calculateDamage(this.player1.attack, this.player2.attack);
            this.turnTimer = setTimeout(() => {
                this.player1.changeAction('hide');
                this.player2.changeAction('hide');
                this.player1.turn(false);
                this.player2.turn(false);
                this.turnTimer = setTimeout(() => {
                    this.player1.reset();
                    this.player2.reset();
                    this.changeTurnPlayer();
                    this.currentPlayer = this.currentTurnPlayer;
                }, 300);
            }, 800);
        }, 400);
        this.fullTurn = 0;
    }

    calculateDamage(attack1, attack2) {
        let player1 = this.player1;
        let player2 = this.player2;
        for (let i = 0; i < 2; i++) {
            if (i > 0) {
                [attack1, attack2] = [attack2, attack1];
                [player1, player2] = [player2, player1];
            }
            if (attack1) {
                for (let aa = 0; aa < attack1.attackArea.length; aa++) {
                    if (attack1.attackArea[aa] === attack2.position) {
                        player2.updateHealth(-attack1.damage[aa]);
                        break;
                    }
                }
            }
        }
        this.player1.showDamage();
        this.player2.showDamage();
        this.checkWinner();
    }

    checkWinner() {
        if (this.player1.getHealth() <= 0 || this.player2.getHealth() <= 0) {
            gameBlock.classList.add('completed');
            game.pauseGame();
            if (this.player1.getHealth() <= 0) {
                finalText.innerHTML = 'Вы потерпели неудачу!';
            } else {
                finalText.innerHTML = 'Гоблин повержен!';
            }
        }
    }

    changePlayer() {
        if (this.currentPlayer.name === 'player1') {
            this.currentPlayer = this.player2;
            this.player2.turn(true);
            this.player1.turn(false);
            this.canTurn = false;
            this.makeAITurn();
        } else {
            this.canTurn = true;
            this.currentPlayer = this.player1;
            this.player2.turn(false);
            this.player1.turn(true);
        }
    }

    changeTurnPlayer() {
        if (this.currentTurnPlayer.name === 'player1') {
            if (this.play) {
                this.currentTurnPlayer = this.player2;
                this.player2.turn(true);
                this.makeAITurn();
            }
        } else {
            this.canTurn = true;
            if (this.play) {
                this.currentTurnPlayer = this.player1;
                this.player1.turn(true);
                this.turnTimer = setTimeout(() => {
                    this.endTurn();
                }, 1000);
            }
        }
    }

    makeAITurn() {
        this.canTurn = false;
        setTimeout(() => {
            if (this.play) {
                this.makeTurn(this.currentPlayer.getAIAttackCode());
            }
        }, 500)
    }

    restart() {
        this.player1.init(this.config);
        this.player2.init();
        this.currentPlayer = player1;
        this.currentTurnPlayer = player1;
        this.fullTurn = 0;
        this.canTurn = true;
        this.player1.turn(true);
        this.player2.turn(false);
        this.player1.changeAction('hide');
        this.player2.changeAction('hide');
        this.player1.reset();
        this.player2.reset();
        this.pauseGame();
        clearTimeout(this.turnTimer);
    }

    goMenu() {
        gameBlock.classList.remove('play');
        gameBlock.classList.remove('completed');
        this.restart();
        this.view.updateMenu();
    }

    startGame() {
        gameBlock.classList.add('play');
        this.play = true;
        this.canTurn = true;
        // Randomize enemy
        let enemyIndex = Math.floor(Math.random() * this.config.enemies[this.config.locationIndex].length);
        let enemyConfig = this.config.enemies[this.config.locationIndex][enemyIndex];
        this.config.currentEnemy = enemyConfig;
        this.view.updateGame();
        this.player2.setImage('');
        this.player2.updateAISettings(enemyConfig);
    }

    playGame() {
        this.play = true;
    }

    pauseGame() {
        this.play = false;
    }
}

const player1 = new Player('player1', '.player-1', 'img/player/1.jpg');
const player2 = new Player('player2', '.player-2', 'img/enemy/goblin.jpg');

const game = new Game(player1, player2, config, menu);

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyR') {
        gameBlock.classList.remove('completed');
        game.restart();
        game.playGame();
    } else if (event.code === 'KeyP') {
        game.pauseGame();
    } else if (event.code === 'KeyM') {
        game.goMenu();
    } else if (game.play && game.canTurn && game.currentPlayer.name === 'player1') {
        game.makeTurn(event.code);
    }
});

buttonFindEnemy.addEventListener('click', (event) => {
    game.startGame();
});
