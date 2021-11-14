const cardService = require('./cards/service');

console.log("1. Start generate a deck");
let deck = cardService.createDeckOfCards();
console.log("2. Finish, shuffle deck");
deck = cardService.shuffle(deck);
const fiveCards = cardService.getFiveCard(deck);
console.log(`3. Five cards: ${fiveCards}`);
console.log("4. Highest hand: ", cardService.findTheHighestHand(fiveCards));