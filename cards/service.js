// declare card elements
const suits = ["Spades", "Diamonds", "Club", "Heart"];
const card_values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14"
];

module.exports.createDeckOfCards = function(){
  let deck = [];
  // create a deck of cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < card_values.length; x++) {
          let card = { Value: card_values[x], Suit: suits[i] };
          deck.push(card);
      }
  }
  return deck;
}

module.exports.shuffle = function(deck) {
  if (deck.length < 2) {
    console.log("Can not shuffle");
    return [];
  }
  for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
  }
  return deck;
}


module.exports.getFiveCard = function(deck) {
  const fiveCards = [];
  for (let i = 0; i < 5; i++) {
    fiveCards.push(`${deck[i].Value} ${deck[i].Suit}`)
  }
  return fiveCards;
}

function checkFlush(cardSuit) {
  return cardSuit.every((card) => card === cardSuit[0]);
}

function checkStraight(cardNumber) {
  const setData = new Set(cardNumber);
  if (setData.size !== cardNumber.length) {
    return false;
  }
  cardNumber.sort( (a,b) => b-a );
  if (cardNumber[0] - cardNumber[4] == 4) {
    return true;
  }
  return false;
}

module.exports.findTheHighestHand = function(fiveCards) {
  if (fiveCards.length < 5) {
    console.log("Game cannot start, not enough card");
    return;
  }
  let cardNumber = [];
  let cardSuit = [];
  let cardOrdered = [];
  for (var i = 0 ; i < fiveCards.length ; i++) {
    const number = fiveCards[i].split(" ")[0];
    const suit = fiveCards[i].split(" ")[1]
    cardNumber.push(number);
    cardSuit.push(suit);
    let index = card_values.indexOf(number);
    cardOrdered[i] = [index, fiveCards[i]];
  }
  cardOrdered.sort((a, b) => {
    return a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0;
  });
  const isFlush = checkFlush(cardSuit);
  const isStraight = checkStraight(cardNumber);
  const highestPlayedCards = cardOrdered[0][0];
  if (
    isStraight &&
    isFlush
  ) {
    if (highestPlayedCards === 12) {
      return "Royal flush";
    } else {
      return "Straight flush";
    }
  } else if (isStraight) {
      return "Straight";
  } else if (isFlush) {
    return "Flush";
  } else {
    return checkAnotherCase(cardNumber);
  }
}


function checkAnotherCase(cardNumber) {
  var a = [], b = [], prev;
  cardNumber.sort();
  for ( var i = 0; i < cardNumber.length; i++ ) {
      if ( cardNumber[i] !== prev ) {
          a.push(cardNumber[i]);
          b.push(1);
      } else {
          b[b.length-1]++;
      }
      prev = cardNumber[i];
  }
  if (b.length === 5) {
    return "High card";
  } else {
    if (b.find((value) => value === 4)) {
      return "Four of kind";
    } else if (b.find((value) => value === 3)) {
      if (b.find((value) => value === 2)) {
        return "Full house";
      } else {
        return "Tree of kind";
      }
    } else {
      if (b.find((value) => value === 2)) {
        if(b.length === 3) {
          return "Two pair";
        } else {
          return "Pair";
        }
      }
    }
  }
}