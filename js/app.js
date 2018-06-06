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

	flipCard(){
		if (this.element.classList.contains("open")){
			this.element.classList.remove("open", "show");
			this.up = false;
		}

		else{
			this.element.classList.add("open", "show");
			document.getElementById("moves").textContent=Number(document.getElementById("moves").textContent)+1
			this.up = true;
		}
		
	}

	wrong(){
		this.up = false;

		if (this.element.classList.contains("open")){
			this.element.classList.add("wrong");
			this.element.classList.remove("open", "show");
			}
		else{
			this.element.classList.add("wrong");
		}
		

	}

	match(){
		this.matched = true;
		this.up = false;
		this.element.classList.remove("open", "show", "wrong");
		this.element.classList.add("match");
	}
}


class Deck{

	constructor(){
		console.log("new deck being made");
		this.cards = [];
		this.deckNode = document.getElementById("deck");
		this.cardTypes = ["fa-diamond", "fa-diamond", "fa-anchor","fa-anchor", "fa-bolt",
	 		"fa-bolt", "fa-cube", "fa-cube", "fa-leaf","fa-leaf", "fa-bicycle","fa-bicycle",
	  		"fa-bomb", "fa-bomb", "fa-paper-plane-o", "fa-paper-plane-o"];
	  	this.flipped1 = null;
	  	this.flipped2 = null;
	  	document.getElementById("moves").textContent=0;
	  	for(var i = 0; i<this.cardTypes.length; i++)
	  		{	
	  			var Cardi = new Card(this.cardTypes[i]);
	  			this.deckNode.appendChild(Cardi.element);
				this.cards.push(Cardi);
	  		}

	  	//timer variables
	  	//Timer 


	  	}
  	
  	restart(){
  		clearInterval(interval)
  		setInterval(interval)
		console.log("restart my deck");
		modal.style.visibility = 'hidden';
		restoreStars();
		while(this.deckNode.firstChild){
	 		this.deckNode.removeChild(this.deckNode.firstChild);
		}
		this.cards = [];
		this.cardTypes = shuffle(this.cardTypes);
		document.getElementById("moves").textContent=0;

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

	countFlipped(){
		var flipped = 0;
		for (var i=0; i<this.cards.length; i++){
			flipped = flipped + this.cards[i].up;
		}
		return flipped
	}

	countMatched(){
		var matched = 0;
		for (var i=0; i<this.cards.length; i++){
			matched = matched + this.cards[i].matched;
		}
		console.log(matched)
		return matched
	}

	removeAllWrongs(){
		for(var i=0; i<this.deckNode.children.length;i++){
			if(this.deckNode.children[i].classList.remove("wrong"));
		}
	}

	flipCard(clickedCard){
		var cardNode = clickedCard.target;
		if(cardNode.classList.contains("match")){
			return;
		}
		var currentlyFlipped = this.countFlipped()
		this.removeAllWrongs();


		if(currentlyFlipped==1){
			for (var i=0; i<this.cards.length; i++){
				if(cardNode==this.cards[i].element & this.cards[i]!==this.flipped1){
				/*
				* Flip over second card if there is one flipped card and then
				*deal with how to handle them
				*/
					//this.cards[i].flipCard();
					this.flipped2 = this.cards[i];
					if(this.flipped1.element.firstChild.classList[1]== this.flipped2.element.firstChild.classList[1]){
						document.getElementById("moves").textContent=Number(document.getElementById("moves").textContent)+1
						this.flipped1.match();
						this.flipped2.match();
						if(this.countMatched() == this.cards.length){
							console.log("somehow equal");
							console.log(this.cards.length);
							modal.style.visibility = 'visible';
							copyToModalStars();
							stopTimer();
						}
					}
					else{
						document.getElementById("moves").textContent=Number(document.getElementById("moves").textContent)+1
						this.flipped1.wrong();
						this.flipped2.wrong();
						this.flipped1 = null;
						this.flipped2 = null;

					}

					conditionallyRemoveStar(Number(document.getElementById("moves").textContent))
				}
			}
		}

		if(currentlyFlipped== 0){
			for (var i=0; i<this.cards.length; i++){
				if(cardNode==this.cards[i].element){
				/*
				* Flip ove the card if there are 1 or less cards flipped
				*/
					this.flipped1 = this.cards[i]
					this.flipped1.flipCard();
					conditionallyRemoveStar(Number(document.getElementById("moves").textContent))
					
				}	
			}
		}
	}
}

card = new Card("cardtype");
myDeck = new Deck();

var seconds = 0; 
var tens = 0; 
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var appendTensPlay = document.getElementById("tensPlay");
var appendSecondsPlay = document.getElementById("secondsPlay");
var interval = setInterval(startTimer,10)

var restartButton = document.getElementById("restart");
restartButton.addEventListener('click', myDeck.restart.bind(myDeck));
myDeck.deckNode.addEventListener('click', myDeck.flipCard.bind(myDeck));
restartButton.addEventListener('click', restartTimer)

var playAgainButton = document.getElementById("play-again-button")
playAgainButton.addEventListener('click', myDeck.restart.bind(myDeck))
playAgainButton.addEventListener('click',restartTimer)


function restoreStars(){
	var mystars = document.getElementsByClassName("fa fa-star-o")
	console.log(mystars)
	while (mystars.length>0) {
		mystars.item(mystars.length-1).classList.replace('fa-star-o', 'fa-star')
		console.log("replaced")
	}
}

function conditionallyRemoveStar(moves){
	//Remove a star every 15 moves
	if(moves%15==0){
			var panelStars = document.getElementById("panel-stars")
			var stars = panelStars.getElementsByClassName('fa-star')
	//Make sure there is at least one star, then remove the last one
		if (stars.length!=0 && stars!=null) {
			stars[stars.length-1].classList.replace('fa-star', 'fa-star-o')
		}

	}

}


function startTimer () {

	//timer logic taken from https://codepen.io/cathydutton/pen/GBcvo/ on 5/20/2018
	tens++; 
	if(tens < 9){
	  appendTens.innerHTML = "0" + tens;
	}

	if (tens > 9){
	  appendTens.innerHTML = tens;
	  
	} 

	if (tens > 99) {
	  seconds++;
	  appendSeconds.innerHTML = "0" + seconds;
	  tens = 0;
	  appendTens.innerHTML = "0" + 0;
	}

	if (seconds > 9){
	  appendSeconds.innerHTML = seconds;
	}
}

function restartTimer(){
	seconds = 0; 
	tens = 0; 
	clearInterval(interval);
	interval = setInterval(startTimer, 10);
}

function stopTimer(){
	appendTensPlay.textContent = appendTens.textContent;
	appendSecondsPlay.textContent = appendSeconds.textContent;
	clearInterval(interval);
}

function copyToModalStars(){
	var panelStars = document.getElementById('panel-stars');
	var modalStars = document.getElementById('modal-stars');
	modalStars.innerHTML = panelStars.innerHTML;

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

