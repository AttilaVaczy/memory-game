let selectedCard = [];
let cardImages = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

const delayTime = 900;
const wrapper = document.createElement('div');

wrapper.classList.add('playground');
wrapper.id = 'game';
const header = document.getElementById('main-wrapper');

const randomizeCardImages = () => {
    return [...cardImages].sort(() => { return 0.5 - Math.random() });
}

const randomCardImages = randomizeCardImages();

const initCards = () => {
    return randomCardImages.forEach((elem, index) => {
        let memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');

        let upperPicture = document.createElement('img');
        upperPicture.classList.add('cover-img');
        upperPicture.setAttribute('src', 'img/0.png');

        let underPicture = document.createElement('img');
        underPicture.classList.add('under-img');
        underPicture.setAttribute('src', `img/${elem}.png`);

        let conatinerFront = document.createElement('div');
        conatinerFront.classList.add('front');
        conatinerFront.appendChild(upperPicture);

        let conatinerBack = document.createElement('div');
        conatinerBack.classList.add('back');
        conatinerBack.appendChild(underPicture);

        memoryCard.appendChild(conatinerFront);
        memoryCard.appendChild(conatinerBack);
        wrapper.appendChild(memoryCard);
        memoryCard.id = index;
    }
    );
}

document.querySelector('.main-wrapper').appendChild(wrapper);

wrapper.addEventListener('click', () => {
    let target = event.target.parentNode;
    target = target.parentNode;
    if (isNumeric(target.id)) { areCardsMatch(target.id) };
});

const areCardsMatch = (id) => {
    selectedCard.push(id);
    showCard(id);
    if (selectedCard.length == 1) return;
    if (selectedCard.length == 2) {
        if (randomCardImages[selectedCard[0]] == randomCardImages[selectedCard[1]] && selectedCard[0] != selectedCard[1]) hideMatchingCards(selectedCard[1], selectedCard[0]);
    } else if (selectedCard.length == 3) {
        if (randomCardImages[selectedCard[2]] == randomCardImages[selectedCard[1]] && selectedCard[2] != selectedCard[1]) {
            hideMatchingCards(selectedCard[1], selectedCard[2]);
            hideCard(selectedCard[0]);
            selectedCard = [];
        } else {
            hideCard(selectedCard[0]);
            hideCard(selectedCard[1]);
            selectedCard = [selectedCard[2]];
        }
    }
}

const showCard = (id) => {
    document.getElementById(id).classList.add('game-card-click');
}

const hideCard = (id) => {
    document.getElementById(id).classList.remove('game-card-click');
}

const restartGame = () => {
    selectedCard.pop();
    document.getElementById('game').innerHTML = "";
    initCards();
}

const hideMatchingCards = (id1, id2) => {
    setTimeout(() => {
        document.getElementById(id1).classList.add('hidden');
        document.getElementById(id2).classList.add('hidden');
        document.getElementById(id1).innerHTML = "";
        document.getElementById(id2).innerHTML = "";
    }, delayTime)
}

const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

initCards();