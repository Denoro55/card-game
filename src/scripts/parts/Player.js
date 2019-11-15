class Player {
    constructor(name, selector, src) {
        this.name = name;
        this.card = document.querySelector(selector);
        this.image = this.card.querySelector('img');
        this.setImage(src);
        this.healthValue = 100;
        this.healthMaxValue = this.healthValue;
        this.action = document.querySelector(`.${this.name}-action`);
        this.healthbar = document.querySelector(`.${this.name}-healthbar`);
        this.manabar = document.querySelector(`.${this.name}-manabar`);
        this.health = document.querySelector(`.${this.name}-health`);
        this.mana = document.querySelector(`.${this.name}-mana`);
        this.healthFill = document.querySelector(`.${this.name}-health-fill`);
        this.cardImage = document.querySelector(`.${this.name}-card`);
        this.attack = null;
        this.activeMagic = [];
        this.controls = {
            'KeyW': {
                damage: [0],
                attackArea: [-1],
                position: 0,
                name: 'Прыжок'
            },
            'KeyS': {
                damage: [0],
                attackArea: [-1],
                position: 2,
                name: 'Присед'
            },
            'KeyF': {
                damage: [10, 15],
                attackArea: [0, 1],
                position: 1,
                name: 'Удар в голову'
            },
            'KeyG': {
                damage: [10, 15],
                attackArea: [1, 2],
                position: 1,
                name: 'Удар по корпусу'
            },
            'KeyH': {
                damage: [15, 10],
                attackArea: [1, 0],
                position: 0,
                name: 'Удар в прыжке'
            },
            'KeyJ': {
                damage: [10, 5],
                attackArea: [1, 2],
                position: 2,
                name: 'Подножка'
            }
        }
    }

    updateAISettings(enemyConfig) {
        this.controls = enemyConfig.attacks;
        this.setImage(enemyConfig.image);
    }

    getAIAttackCode() {
        let attack = this.randomize(this.controls);
        // if magic
        if (attack.name === 'magic') {
            let fakeMagics = attack.magic.slice();
            let max = 100;
            for (let i = 0; i < attack.magic.length; i++) {
                let magicType = this.randomize(fakeMagics, max);
                if (this.activeMagic.includes(magicType.id)) { // if is using already
                    fakeMagics.splice(fakeMagics.indexOf(magicType), 1);
                    max -= magicType.chance;
                    // console.log('magic is using!!!');
                    if (i === attack.magic.length - 1) {
                        let fakeAttacks = this.controls.slice();
                        let magicChance = 100 - fakeAttacks[fakeAttacks.length - 1].chance;
                        fakeAttacks.splice(fakeAttacks.length - 1, 1);
                        attack = this.randomize(fakeAttacks, magicChance);
                        break;
                    }
                } else {
                    this.activeMagic.push(magicType.id);
                    attack = magicType;
                    // console.log('magic is active', magicType.id);
                    break;
                }
            }
        }
        return attack;
    }

    randomize(arr, max = 100) {
        let rand = Math.floor(Math.random() * (max + 1));
        let progress = 0;
        let result = null;
        for (let i = 0; i < arr.length; i++) {
            if (rand <= arr[i].chance + progress) {
                result = arr[i];
                break;
            } else {
                progress += arr[i].chance;
            }
        }
        return result;
    }

    updateHealth(add) {
        this.healthValue += add;
        this.health.innerHTML = add;
        this.setHealth(this.healthValue);
    }

    getHealth() {
        return this.healthValue;
    }

    setHealth(value) {
        this.healthbar.innerHTML = value + ' / ' + this.healthMaxValue;
        if (this.healthValue > 0) {
            this.healthFill.style.width = this.healthValue + '%';
        } else {
            this.healthFill.style.width = '0%';
        }
    }

    reset() {
        this.setAttack({position: 1, damage: [0], attackArea: [0]});
        this.showDamage('hide');
        setTimeout(() => {
            this.health.innerHTML = 0;
        }, 300)
    }

    setAttack(attack) {
        this.attack = attack;
    }

    showDamage(type = 'show') {
        if (type === 'show') {
            this.health.classList.add('active');
        } else {
            this.health.classList.remove('active');
        }
    }

    changeAction(type = 'show') {
        if (type === 'show') {
            this.action.classList.add('active');
        } else {
            this.action.classList.remove('active');
        }
    }

    setImage(src) {
        this.image.setAttribute('src', src);
    }

    turn(cls) {
        if (cls) {
            this.cardImage.classList.add('active');
        } else {
            this.cardImage.classList.remove('active');
        }
    }

    init(config = null) {
        if (!config) {
            this.healthValue = 100;
        } else {
            this.healthValue = config.health;
        }
        this.setHealth(this.healthValue);
    }
}

export default Player;