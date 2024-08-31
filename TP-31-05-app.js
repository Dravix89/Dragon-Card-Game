const objects = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
// const objects = ["A", "B"];

const objectDoubles = objects.concat(objects);
// console.log(objectDoubles);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(objectDoubles);
// console.log(objectDoubles);

const memoryGame = document.getElementById("memory-game");

objectDoubles.forEach((object) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.card = object;
  card.addEventListener("click", handleCardClick);

  const cardInner = document.createElement("div");
  cardInner.textContent = object;
  cardInner.classList.add("card-inner");

  card.appendChild(cardInner);
  memoryGame.appendChild(card);
});

// logique :
let selectedCards = [];
let attemps = 0;

function handleCardClick() {
  if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    selectedCards.push(this);

    if (selectedCards.length === 2) {
      setTimeout(() => {
        const [firstCard, secondCard] = selectedCards;
        if (firstCard.dataset.card === secondCard.dataset.card) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          checkwin();
        } else {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
        }
        selectedCards = [];
        attemps++;
        document.getElementById("attemps").textContent =
          "Nombre De Tentatives :" + attemps;
      }, 1000);
    }
  }
}

function checkwin() {
  const matchedCards = document.querySelectorAll(".matched");

  if (matchedCards.length === objects.length * 2) {
    document.getElementById("message").textContent =
      "Félicitations ! Vous Avez Gagné";
  }
}

// console.log(selectedCards);
