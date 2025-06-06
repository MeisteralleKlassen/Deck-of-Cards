let suits = ['♥', '♦', '♣', '♠'];
let values = [...Array(10).keys()].map(i => (i + 1).toString()).concat(['J', 'Q', 'K', 'A']);
let deck = [];
let startTime = null;
let interval;
let isDeckEmpty = false;
let times = [];

// Neue Variablen für die Kartenanzeige
let currentCard = "";
let previousCardHTML = "";
let previousCardColor = ""; // speichert die zuletzt verwendete Farbe

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value: `${value} ${suit}`, suit: suit });
        }
    }
    deck.push({ value: 'Joker', suit: 'Joker' });
    deck.push({ value: 'Joker', suit: 'Joker' });
}
createDeck();

function updateTime() {
    if (startTime !== null) {
        let elapsedTime = Math.floor((new Date() - startTime) / 1000);
        document.getElementById("timeElapsed").innerText = `Zeit: ${elapsedTime}s`;
    }
}

interval = setInterval(updateTime, 1000);

function drawCard() {
    let cardElement = document.getElementById("card");

    // Vorherige Karte und deren Farbe speichern, falls bereits eine Karte angezeigt wird
    if (currentCard !== "") {
        previousCardHTML = currentCard;
        previousCardColor = cardElement.style.color;
    }

    if (deck.length === 0) {
        cardElement.innerHTML = "<span>All cards removed!</span>";
        cardElement.style.color = "black";

        if (!isDeckEmpty) {
            isDeckEmpty = true;
            stopTimer();
            updateLeaderboard();
        }
        return;
    }

    if (startTime === null) {
        startTime = new Date();
    }

    let randomIndex = Math.floor(Math.random() * deck.length);
    let drawnCard = deck.splice(randomIndex, 1)[0];

    // Erzeuge den neuen Karteninhalt
    currentCard = `
        <span class="card-value">${drawnCard.value.split(" ")[0]}</span>
        <span class="card-symbol">${drawnCard.suit}</span>
        <span class="card-value-bottom">${drawnCard.value.split(" ")[0]}</span>
    `;
    cardElement.innerHTML = currentCard;

    // Setze die Farbe abhängig vom Symbol
    let color = "black";
    if (drawnCard.suit === '♥' || drawnCard.suit === '♦') {
        color = "red";
    } else if (drawnCard.suit === 'Joker') {
        color = "purple";
    }

    cardElement.style.color = color;
}

function showPreviousCard() {
    if (previousCardHTML !== "") {
        let cardElement = document.getElementById("card");
        cardElement.innerHTML = previousCardHTML;
        cardElement.style.color = previousCardColor;
    } else {
        alert("Es wurde noch keine vorherige Karte gespeichert!");
    }
}

function stopTimer() {
    clearInterval(interval);
    let elapsedTime = Math.floor((new Date() - startTime) / 1000);
    times.push(elapsedTime);
    times.sort((a, b) => a - b);
}

function reshuffleDeck() {
    createDeck();
    startTime = null;
    clearInterval(interval);
    interval = setInterval(updateTime, 1000);
    let cardElement = document.getElementById("card");
    cardElement.innerText = "Draw a card";
    cardElement.style.color = "black";
    document.getElementById("timeElapsed").innerText = "Zeit: 0s";
    isDeckEmpty = false;
    // Zurücksetzen der gespeicherten Karten und Farben
    currentCard = "";
    previousCardHTML = "";
    previousCardColor = "";
}

function updateLeaderboard() {
    let leaderboard = document.getElementById("timeLeaderboard");
    leaderboard.innerHTML = "";
    times.slice(0, 5).forEach((time, index) => {
        let li = document.createElement("li");
        li.textContent = `Platz ${index + 1}: ${time}s`;
        leaderboard.appendChild(li);
    });
}

// Service Worker registrieren
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registriert:', registration);
        }).catch((error) => {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    });
}
