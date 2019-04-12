// Create a list that holds all the cards
const allCards = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"
]

// Specify the container of all cards
const cardsContainer = document.querySelector(".deck");

// Create an empty list to store cards for checking later
let ClickedCards = [];
let matchedCount = 0;

init();

// Start the game
function init() {
    for (let i = 0; i < allCards.length; i++) { // Create the cards one by one
        const card = document.createElement("li");
        cardsContainer.appendChild(card);
        card.classList.add("card");
        card.innerHTML = `<i class="${allCards[i]}"></i>`;

        // Add click event for each card
        viewCard(card);
    }
}

function viewCard(card) {

    // Add event listeners for clicking on the cards
    card.addEventListener("click", function () {

        // Assign cards to variables for readability
        const currentCard = this;
        const previousCard = ClickedCards[0];

        // Flip the card
        currentCard.classList.add("open", "show");

        // Check the number of clicked cards (for match checking and flipping cards back, etc)
        if (ClickedCards.length === 1) { // If a single card has been clicked already


            // Compare both opened cards to check if they match
            compare(currentCard, previousCard);

            // reset the clickedCards list to be used for next matchings
            ClickedCards = [];
        } else {
            ClickedCards.push(currentCard);
        }
    });
}

function compare(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) { // If the cards match:
        // Add the matching card style to them and leave them open
        previousCard.classList.add("match");
        currentCard.classList.add("match");

        // Increment the counter of matched cards to end the game when all cards are open
        matchedCount += 2;

        // Call endGame to end the game if all cards are open
        endGame();

    } else { // If the two cards don't match:
        setTimeout(function () { // Flip the cards back after 500 milliseconds
                    previousCard.classList.remove("open", "show");
                    currentCard.classList.remove("open", "show");

        }, 500);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Check if all cards are open, then show a congrats message
function endGame() {
    if (matchedCount === allCards.length)
        setTimeout(function () {
            alert("Congratulations! You solved the game 😃");
        }, 200)
}