const Cards = {
  DEMON: {
    name: "Demon",
    description: "it's a demon OMG :O",
    stats: {
      mana: 2,
      attack: 3,
      attackMana: 4
    }
  },
  LORD_OF_DARKNESS: {
    name: "Lord of Darkness",
    description: "beware of the sight of this lord of darkness",
    stats: {
      mana: 8,
      attack: 10,
      attackMana: 1
    }
  },
  SKELETON: {
    name: "Skeleton",
    description: "death costs nothing, living costs everything.",
    stats: {
      mana: 0,
      attack: 2,
      attackMana: 5
    }
  },
}



class Player {
  constructor(selector) {
    this.selector = selector;
    this.cardsContainerElement = document.querySelector(`.${this.selector} .cards`);
    this.rows = Array.from(document.querySelectorAll(`.${this.selector} .field-row`)).map(el => ({cards: [], element: el}));
    console.log(this.rows);
    this.cards = [];
    this.mana = 5;
    this.hp = 10;
    this.ui = {
      mana: document.querySelector(`.${this.selector} .ui .mana`),
      hp: document.querySelector(`.${this.selector} .ui .hp`),
    }
    console.log(this.ui);

    this.onTurnStart();
    this.updateUI();
  }
  onTurnStart() {
    this.drewCard = false;
  }
  drawCard(useMana) {
    if (this.cards.length >= 5) return;
    if (useMana && (this.mana <= 0 || this.drewCard)) return;
    if (useMana && !this.drewCard) {
      this.mana --;
      this.drewCard = true;
    } 
    const allCards = Object.keys(Cards);
    const randomCardIndex = allCards[Math.floor(Math.random() * allCards.length)];
    const card = Cards[randomCardIndex];
    this.addCardToHand(card);
    this.updateUI();
  }
  addCardToHand(card) {
    let newCard = JSON.parse(JSON.stringify(card))
    this.cards.push(newCard);
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = Card.createCard(newCard);
    newCard.element = cardElement;
    this.cardsContainerElement.appendChild(cardElement);
  }
  updateUI() {
    this.ui.mana.innerText = this.mana;
    this.ui.hp.innerText = this.hp;
  }
}

class Card {
  constructor() {
    this.state = {};
  }
  onInit() {

  }
  onPlayCard() {

  }
  static createCard(options) {
    return `
      <div class="card-name">${options.name}</div>
      <div class="card-description">${options.description}</div>
      <div class="card-stats">
        <span class="card-stat mp">${options.stats.mana}</span>
        <span class="card-stat atk">${options.stats.attack}</span>
        <span class="card-stat atk-mp">${options.stats.attackMana}</span>
      </div>
    `;
  }
}


const player1 = new Player("player-1");

player1.drawCard();
player1.drawCard();
player1.drawCard();
























