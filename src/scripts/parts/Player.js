class Player {
    constructor(name, selector, src) {
        this.name = name;
        this.card = document.querySelector(selector);
        this.image = this.card.querySelector('img');
        this.setImage(src);
        this.healthValue = 100;
        this.healthMaxValue = this.healthValue;
        this.manaValue = 100;
        this.manaMaxValue = this.manaValue;
        this.action = document.querySelector(`.${this.name}-action`);
        this.healthbar = document.querySelector(`.${this.name}-healthbar`);
        this.manabar = document.querySelector(`.${this.name}-manabar`);
        this.health = document.querySelector(`.${this.name}-health`);
        this.mana = document.querySelector(`.${this.name}-mana`);
        this.healthFill = document.querySelector(`.${this.name}-health-fill`);
        this.manaFill = document.querySelector(`.${this.name}-mana-fill`);
        this.cardImage = document.querySelector(`.${this.name}-card`);
        this.attack = null;
        this.activeMagic = [];
        this.abilities = document.querySelector(`.${this.name}-abilities`);
        this.abilityBlocks = this.abilities.querySelectorAll(`.${this.name}-abilities .ability`);
        this.activeAbilities = {
            enemyDamage: 1
        };
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
                attackType: 1,
                position: 1,
                name: 'Удар в голову'
            },
            'KeyG': {
                damage: [10, 15],
                attackArea: [1, 2],
                attackType: 2,
                position: 1,
                name: 'Удар по корпусу'
            },
            'KeyH': {
                damage: [15, 10],
                attackArea: [1, 0],
                attackType: 1,
                position: 0,
                name: 'Удар в прыжке'
            },
            'KeyJ': {
                damage: [10, 5],
                attackArea: [1, 2],
                attackType: 3,
                position: 2,
                name: 'Подножка'
            },
            'KeyZ': {
                damage: [0],
                attackArea: [-1],
                position: 1,
                blockType: 1,
                blockPercentage: 70,
                name: 'Верхний блок'
            },
            'KeyX': {
                damage: [0],
                attackArea: [-1],
                position: 1,
                blockType: 2,
                blockPercentage: 70,
                name: 'Блок'
            },
            'KeyC': {
                damage: [0],
                attackArea: [-1],
                position: 1,
                blockType: 3,
                blockPercentage: 70,
                name: 'Нижний блок'
            },
            'KeyL': {
                damage: [0],
                attackArea: [-1],
                position: 1,
                name: 'Ничего не делать'
            }
        }
    }

    updateAISettings(enemyConfig) {
        this.controls = enemyConfig.attacks;
        this.healthValue = enemyConfig.health;
        this.manaValue = enemyConfig.mana;
        this.healthMaxValue = enemyConfig.health;
        this.manaMaxValue = enemyConfig.mana;
        this.setImage(enemyConfig.image);
    }

    getAIAttackCode() {
        let attack = this.randomize(this.controls);
        // if magic
        if (attack.name === 'magic') {
            let fakeMagics = attack.magic.slice(); // copy
            let max = 100;
            for (let i = 0; i < attack.magic.length; i++) {
                let magicType = this.randomize(fakeMagics, max);
                if (this.isInArray(magicType.id) || this.manaValue < magicType.manaRequired) { // if is using already
                    fakeMagics.splice(fakeMagics.indexOf(magicType), 1);
                    max -= magicType.chance;
                    // console.log('magic is using!!!');
                    if (i === attack.magic.length - 1) {
                        let fakeAttacks = this.controls.slice(); // copy
                        let magicChance = 100 - fakeAttacks[fakeAttacks.length - 1].chance;
                        fakeAttacks.splice(fakeAttacks.length - 1, 1);
                        attack = this.randomize(fakeAttacks, magicChance);
                        break;
                    }
                } else {
                    this.setMana(this.manaValue -= magicType.manaRequired);
                    this.addAbility(magicType);
                    attack = magicType;
                    // console.log('magic is active', magicType.id);
                    break;
                }
            }
        }
        return attack;
    }

    isInArray(id) {
        let result = false;
        this.activeMagic.forEach(function(elem) {
            if (elem.id === id) {
                result = true;
            }
        });
        return result;
    }

    addAbility(ability) {
        this.activeMagic.push(ability);
        this.updateAbilitiesCells();
        this.updateActiveAbilities();
    }

    updateAbilitiesCells() {
        for (let i = 0; i < this.abilityBlocks.length; i++) {
            if (this.activeMagic[i]) {
                this.abilityBlocks[this.abilityBlocks.length - 1 - i].style.background = `url(img/abilities/${this.activeMagic[i].image})`;
            } else {
                this.abilityBlocks[this.abilityBlocks.length - 1 - i].style.background = `url('')`;
            }
        }
    }

    updateActiveAbilities() {
        this.activeAbilities = {
            enemyDamage: 1
        };
        let that = this;
        this.activeMagic.forEach(function(ability) {
            for (let prop in ability.effects) {
                that.activeAbilities[prop] = that.activeAbilities[prop] + ability.effects[prop];
            }
        })
    }

    checkActiveAbilities() {
        let that = this;
        this.activeMagic.forEach(function(ability, index) {
            ability.turns--;
            if (ability.turns <= 0) {
                that.activeMagic.splice(index, 1);
                that.updateAbilitiesCells();
                that.updateActiveAbilities();
            }
        })
    }

    clearAbilities() {
        this.activeMagic = [];
        this.updateAbilitiesCells();
        this.updateActiveAbilities();
    }

    randomize(arr, max = 100) {
        let rand = Math.floor(Math.random() * (max + 1));
        let progress = 0;
        let result = null;
        for (let i = 0; i < arr.length; i++) {
            if (rand <= arr[i].chance + progress) {
                result = Object.assign({}, arr[i]);
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
        this.healthValue = value;
        if (this.healthValue > 0) {
            this.healthbar.innerHTML = value + ' / ' + this.healthMaxValue;
            this.healthFill.style.width = (value * 100 / this.healthMaxValue) + '%';
        } else {
            this.healthbar.innerHTML = 0 + ' / ' + this.healthMaxValue;
            this.healthFill.style.width = '0%';
        }
    }

    setMana(value) {
        this.manaValue = value;
        if (this.manaValue > 0) {
            this.manabar.innerHTML = value + ' / ' + this.manaMaxValue;
            this.manaFill.style.width = (value * 100 / this.manaMaxValue) + '%';
        } else {
            this.manabar.innerHTML = 0 + ' / ' + this.manaMaxValue;
            this.manaFill.style.width = '0%';
        }
    }

    reset() {
        this.setAttack({position: 1, damage: [0], attackArea: [0]});
        this.showDamage('hide');
        this.checkActiveAbilities();
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
        // if (!config) {
        //     this.healthValue = 100;
        // } else {
        //     this.healthValue = config.health;
        // }
        // this.setHealth(this.healthValue);
    }
}

export default Player;