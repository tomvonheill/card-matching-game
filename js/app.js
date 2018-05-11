/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
*Card object
*/
class Card{
	constructor(cardType){
		this.cardType = cardType;
		this.up = false;
		this.matched = false;
		var newcard = document.createElement('li');
  		newcard.className = "card";
	  	var newi = document.createElement('i');
	  	newi.classList.add('fa', cardType);
	  	newcard.appendChild(newi);
	  	this.element=newcard;
	}
}





class Deck{

	constructor(){
		console.log("new deck being made")
		this.cards = [];
		this.deckNode = document.getElementById("deck");
		console.log(this.deckNode)
		this.cardTypes = ["fa-diamond", "fa-diamond", "fa-anchor","fa-anchor", "fa-bolt",
	 		"fa-bolt", "fa-cube", "fa-cube", "fa-leaf","fa-leaf", "fa-bicycle","fa-bicycle",
	  		"fa-bomb", "fa-bomb", "fa-paper-plane-o", "fa-paper-plane-o"];
	  	for(var i = 0; i<this.cardTypes.length; i++)
	  		{	
	  			var Cardi = new Card(this.cardTypes[i]);
	  			this.deckNode.appendChild(Cardi.element);
				this.cards.push(Cardi);
	  		}
	  	}

	 

	printDeckNode(){
	  	console.log(this.deckNode)
  	}

	


  	
  	restart(){
		console.log("restart my deck");
		console.log(this.cardTypes);
		console.log(this.deckNode);
		while(this.deckNode.firstChild){
	 		this.deckNode.removeChild(this.deckNode.firstChild);
		}
		this.cards = [];
		this.cardTypes = shuffle(this.cardTypes);

		for(var i = 0; i<this.cardTypes.length; i++){
			var Cardi = new Card(this.cardTypes[i]);
	  		this.deckNode.appendChild(Cardi.element);
			this.cards.push(Cardi);

		}
	}

	addCard(){
		this.deckNode.appendChild(Card.element);
		this.cards.append(Card);
	}	
}
card = new Card("cardtype");
console.log(card);
myDeck = new Deck();
var restartButton = document.getElementById("restart");
restartButton.addEventListener('click', myDeck.restart.bind(myDeck));
//myDeck.printDeckNode()



function startOver(){
	/*
	*Remove all children of class deck and then re-populate them
	*/
	console.log("start over clicked")
	var deckNode = document.getElementById("deck")
	while(deckNode.firstChild){
		deckNode.removeChild(deckNode.firstChild);
	}

	var cards = ["fa-diamond", "fa-diamond", "fa-anchor","fa-anchor", "fa-bolt",
 		"fa-bolt", "fa-cube", "fa-cube", "fa-leaf","fa-leaf", "fa-bicycle","fa-bicycle",
  		"fa-bomb", "fa-bomb", "fa-paper-plane-o", "fa-paper-plane-o"]
  	cards = shuffle(cards);

  	for(var i = 0; i<cards.length; i++)
  	{
  		cardType = cards[i];
  		var newcard = document.createElement('li');
  		newcard.className = "card";
  		var newi = document.createElement('i');
  		newi.classList.add('fa', cardType);
  		newcard.appendChild(newi);
  		deckNode.appendChild(newcard);

  	}


  	

}


 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
