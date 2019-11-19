class View {
    constructor (stats) {
        this.stats = stats;
        this.health = document.querySelector('.js-health');
        this.mana = document.querySelector('.js-mana');
        this.gold = document.querySelector('.js-gold');
        this.crystals = document.querySelector('.js-crystals');
        this.kills = document.querySelector('.js-kills');
        this.level = document.querySelector('.js-level');
        this.levelProgress = document.querySelector('.js-level-progress');
        this.levelProgressFill = document.querySelector('.js-level-fill');
        this.currentLocation = document.querySelector('.js-location');
        this.stage = document.querySelector('.stage');
        // boss
        this.bossRequireLevel = document.querySelector('.js-boss-level');
        this.bossRequireGold = document.querySelector('.js-boss-gold');
        this.bossRequireCrystals = document.querySelector('.js-boss-crystals');
        // game
        this.gameHealth = document.querySelector('.player1-healthbar');
        this.gameHealthProgress = document.querySelector('.player1-health-fill');
        this.gameMana = document.querySelector('.player1-manabar');
        this.gameManaProgress = document.querySelector('.player1-mana-fill');
        this.stageName = document.querySelector('.js-stage-name');
        this.stageLevel = document.querySelector('.js-stage-level');
        // enemy
        this.enemyHealth = document.querySelector('.js-enemy-health');
        this.enemyMana = document.querySelector('.js-enemy-mana');
    }

    updateMenu () {
        this.health.innerHTML = this.stats.health;
        this.mana.innerHTML = this.stats.mana;
        this.gold.innerHTML = this.stats.goldCount;
        this.crystals.innerHTML = this.stats.crystalsCount;
        this.kills.innerHTML = this.stats.kills;
        this.level.innerHTML = "Уровень " + this.stats.level;
        this.levelProgress.innerHTML = this.stats.levelProgress + " / " + this.stats.levelProgressEnd;
        this.currentLocation.innerHTML = this.stats.currentLocation;
        this.levelProgressFill.style.width = (this.stats.levelProgress * 100 / this.stats.levelProgressEnd) + "%";
        // boss
        this.bossRequireLevel.innerHTML = this.stats.boss[this.stats.currentBoss].requireLevel;
        this.bossRequireGold.innerHTML = this.stats.boss[this.stats.currentBoss].requireGold;
        this.bossRequireCrystals.innerHTML = this.stats.boss[this.stats.currentBoss].requireCrystals;
    }
    
    updateGame() {
        // game
        this.gameHealth.innerHTML = this.stats.health + " / " + this.stats.maxHealth;
        this.gameHealthProgress.style.width = (this.stats.health * 100 / this.stats.maxHealth) + "%";
        this.gameMana.innerHTML = this.stats.mana + " / " + this.stats.maxMana;
        this.gameManaProgress.style.width = (this.stats.mana * 100 / this.stats.maxMana) + "%";
        this.stageName.innerHTML = this.stats.currentEnemy.name;
        this.stageLevel.innerHTML = "Уровень " + this.stats.currentEnemy.level;
        // enemy
        this.enemyHealth.innerHTML = this.stats.currentEnemy.health + " / " + this.stats.currentEnemy.health;
        this.enemyMana.innerHTML = this.stats.currentEnemy.mana + " / " + this.stats.currentEnemy.mana;
        // background
        this.stage.style.background = "url(" + this.stats.locationImage[this.stats.locationIndex] + ")";
    }
}

export default View;