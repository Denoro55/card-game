const config = {
	level: 1,
	levelProgress: 0,
	levelProgressEnd: 80,
	health: 100,
	maxHealth: 100,
	mana: 50,
	maxMana: 50,
	regenHealth: 1,
	regenMana: 1,
	goldCount: 50,
	crystalsCount: 5,
	kills: 0,
	currentLocation: 'Заброшенный лес',
	currentEnemy: null,
	locationIndex: 0,
	locationImage: ['img/menu.jpg'],
	currentBoss: 0,
	boss: [
		{
			name: `Острый глаз`,
			requireLevel: 2,
			requireGold: 50,
			requireCrystals: 5
		}
	],
	enemies: [
		[ // список для 1 уровня
			{
				name: `Тыквоголов`,
				level: 1,
				health: 140,
				mana: 40,
				image: 'img/enemy/pumpkin.jpg',
				attacksChance: [30, 30, 40],
				reward: {
					exp: 10,
					gold: [5, 3],
					crystals: 1
				},
				attacks: [
					{
						damage: [0],
						attackArea: [-1],
						position: 0,
						name: 'Прыжок',
						chance: 10
					},
					{
						damage: [0],
						attackArea: [-1],
						position: 2,
						name: 'Присед',
						chance: 10
					},
					{
						damage: [10, 15],
						attackArea: [1, 2],
						attackType: 2,
						position: 1,
						name: 'Удар по корпусу',
						chance: 25
					},
					{
						damage: [10, 15],
						attackArea: [0, 1],
						attackType: 1,
						position: 1,
						name: 'Удар в голову',
						chance: 20
					},
					{
						damage: [0],
						attackArea: [-1],
						position: 1,
						blockType: 1,
						blockPercentage: 70,
						name: 'Верхний блок',
						chance: 15
					},
                    {
                        damage: [0],
                        attackArea: [-1],
                        position: 1,
                        name: 'magic',
                        chance: 20,
                        magic: [
                            {
                                damage: [0],
                                attackArea: [-1],
                                position: 1,
                                name: 'Устрашающий вид',
                                chance: 100,
								manaRequired: 5,
                                type: 0,
                                turns: 4,
                                id: 'fear',
                                image: 'fear.jpg',
                                text: 'Тыквоголов приобретает демонический вид, что сбивает противников с толку и они теряют уверенность. -30% урона ко всем атакам.',
								effects: {
									enemyDamage: -0.4
								}
                            }
                        ]
                    }
				]
			}
			// {
			// 	name: `Заросший`,
			// 	level: 1,
			// 	health: 120,
			// 	mana: 0,
			// 	image: 'img/enemy/goblin3.jpg',
			// 	attacksChance: [30,30,40],
			// 	attacks: [
			// 		{
			// 			damage: [0],
			// 			attackArea: [-1],
			// 			position: 0,
			// 			name: 'Прыжок',
			// 			chance: 30
			// 		},
			// 		{
			// 			damage: [0],
			// 			attackArea: [-1],
			// 			position: 2,
			// 			name: 'Присед',
			// 			chance: 30
			// 		},
			// 		{
			// 			damage: [10, 15],
			// 			attackArea: [1, 2],
			// 			position: 1,
			// 			name: 'Удар по корпусу',
			// 			chance: 40
			// 		}
			// 	]
			// },
			// {
			// 	name: `Охотник`,
			// 	level: 1,
			// 	health: 130,
			// 	mana: 0,
			// 	image: 'img/enemy/goblin2.jpg',
			// 	attacksChance: [30,30,40],
			// 	attacks: [
			// 		{
			// 			damage: [0],
			// 			attackArea: [-1],
			// 			position: 0,
			// 			name: 'Прыжок',
			// 			chance: 30
			// 		},
			// 		{
			// 			damage: [0],
			// 			attackArea: [-1],
			// 			position: 2,
			// 			name: 'Присед',
			// 			chance: 30
			// 		},
			// 		{
			// 			damage: [10, 15],
			// 			attackArea: [1, 2],
			// 			position: 1,
			// 			name: 'Удар по корпусу',
			// 			chance: 40
			// 		}
			// 	]
			// }
		]
	]
};

export default config;