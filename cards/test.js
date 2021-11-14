var assert = require('assert');
var cardService = require('./service');

describe('Test card service', function() {
  describe('#Deck test case', function(){
    it('should return 52 playing card', function(){
      let deck = cardService.createDeckOfCards();
      assert.equal(52, deck.length);
    });

    it('should shuffle successfully', function(){
      const deck = cardService.createDeckOfCards();
      cardService.shuffle(deck);
      assert.notEqual(2, deck[0][0]);
    });
  });

  describe('#getHighestHand', function() {
    it('should return Full House', function() {
      const fiveCards = ["10 Club","9 Club","9 Spades","10 Diamonds","10 Heart"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Full house", result);
    });
    it('should return Royal flush', function() {
      const fiveCards = ["10 Club","11 Club","12 Club","13 Club","14 Club"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Royal flush", result);
    });
    it('should return Straight flush', function() {
      const fiveCards = ["10 Club","11 Club","12 Club","13 Club","9 Club"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Straight flush", result);
    });

    it('should return Flush', function() {
      const fiveCards = ["10 Club","1 Club","12 Club","5 Club","14 Club"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Flush", result);
    });

    it('should return Straight', function() {
      const fiveCards = ["10 Club","9 Club","11 Spades","8 Diamonds","7 Spades"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Straight", result);
    });

    it('should return Four of kind', function() {
      const fiveCards = ["10 Club","9 Club","10 Spades","10 Diamonds","10 Heart"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Four of kind", result);
    });

    it('should return Tree of kind', function() {
      const fiveCards = ["10 Club","9 Club","10 Spades","10 Diamonds","7 Heart"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Tree of kind", result);
    });

    it('should return Two pair', function() {
      const fiveCards = ["10 Club","9 Club","10 Spades","7 Diamonds","7 Heart"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Two pair", result);
    });

    it('should return Pair', function() {
      const fiveCards = ["10 Club","9 Club","10 Spades","11 Diamonds","2 Heart"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("Pair", result);
    });

    it('should return High card', function() {
      const fiveCards = ["10 Club","9 Club","4 Spades","1 Diamonds","14 Heart"];
      const result = cardService.findTheHighestHand(fiveCards);
      assert.equal("High card", result);
    });
  });
});