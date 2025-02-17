let game = {
	lockMode: false,
	firstCard: null,
	secondCard: null,
	difficulty: 'medium', // Padrão inicial

	setDifficulty: function (level) {
		const difficulties = {
			easy: 6,
			medium: 10,
			hard: 16
		};

		this.difficulty = level;
		this.pairCount = difficulties[level] || 10; // Define o número de pares conforme a dificuldade
		console.log('Dificuldade:', this.difficulty, 'Pares:', this.pairCount);
	},

	setCard: function (id) {
		let card = this.cards.find(card => card.id === id);

		if (!card || card.flipped || this.lockMode) {
			return false;
		}

		if (!this.firstCard) {
			this.firstCard = card;
			this.firstCard.flipped = true;
			return true;
		} else {
			this.secondCard = card;
			this.secondCard.flipped = true;
			this.lockMode = true;
			return true;
		}
	},

	checkMatch: function () {
		return this.firstCard && this.secondCard && this.firstCard.icon === this.secondCard.icon;
	},

	clearCards: function () {
		this.firstCard = null;
		this.secondCard = null;
		this.lockMode = false;
	},

	unflipCards: function () {
		if (this.firstCard && this.secondCard) {
			this.firstCard.flipped = false;
			this.secondCard.flipped = false;
		}
		this.clearCards();
	},

	checkGameOver: function () {
		return this.cards.every(card => card.flipped);
	},

	techs: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'],
	cards: null,

	createCardsFromTechs: function () {
		this.cards = [];

		// Pegamos apenas os pares necessários conforme a dificuldade
		let selectedTechs = this.techs.slice(0, this.pairCount);

		selectedTechs.forEach((tech) => {
			this.cards.push(this.createPairFromTech(tech));
		});

		this.cards = this.cards.flatMap(pair => pair);
		this.shuffleCards();
		return this.cards;
	},

	createPairFromTech: function (tech) {
		return [{
			id: this.createIdWithTech(tech),
			icon: tech,
			flipped: false,
		}, {
			id: this.createIdWithTech(tech),
			icon: tech,
			flipped: false,
		}];
	},

	createIdWithTech: function (tech) {
		return tech + Math.floor(Math.random() * 1000);
	},

	shuffleCards: function () {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	},

	eggCracking: function () {
		let egg = new Audio('assets/sons/egg-cracking.mp3');
		egg.playbackRate = 2;
		egg.play();
	},

	roarMatch: function () {
		let roar = new Audio('assets/sons/dino-roar.mp3');
		roar.play();
	},

	flipCard: function (cardId, gameOverCallback, noMatchCallback) {
		this.eggCracking();

		if (!this.setCard(cardId)) return;

		if (this.secondCard) {
			if (this.checkMatch()) {
				this.clearCards();
				this.roarMatch();
				if (this.checkGameOver()) {
					gameOverCallback();
				}
			} else {
				setTimeout(() => {
					this.unflipCards();
					noMatchCallback();
				}, 1000);
			}
		}
	}
};

export default game;
