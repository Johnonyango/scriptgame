switch (2) {
    case 0:
        status = 'Weekend'
        break
    case 6:
        status = 'Weekend'
        break
    case 5:
        status = 'Weekend'
        break
    default:
        status = 'weekday'
}

// Challenge 1
function ageInDays() {
    var birthYear= prompt('When were you born?');
    var yourYears = (2020 - birthYear);
    let result = (yourYears * 365)
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + result + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1)
};

function reset () {
    document.getElementById('ageInDays').remove();
}

// Challenge 2
function generateImage() {
    let image = document.createElement('img')
    image.src="static/images/coverd.png"
    let div = document.getElementById('flex-img')
    div.appendChild(image)
}

// Challenge 3
function rpsGame(yourChoice) {
    console.log(yourChoice)
    var humanChoice, botChoice;
    humanChoice = yourChoice.id
    
    botChoice = numberToChoice(randToRpsInt());
    console.log('comp:', botChoice);
    
    results = decideWinner(humanChoice, botChoice) //[0,1] human lost, bot won
    console.log(results)
   
    message = finalMessage(results) // 'You won' / 'you lost' / 'You tied'
    console.log(message)
    rpsFrontend(yourChoice.id, botChoice, message)
};
function randToRpsInt() {
    return Math.floor(Math.random() * 3)
};
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}
function decideWinner(yourChoice, computerChoice) {
     let rpsData = {
         'rock' : {'rock':0.5, 'paper':0, 'scissors':1},
         'paper' : {'rock':1, 'paper':0.5, 'scissors':0},
         'scissors' : {'rock':0, 'paper':1, 'scissors':0.5}
     }
     let yourScore = rpsData[yourChoice][computerChoice];
     let computerScore = rpsData[computerChoice][yourChoice];

     return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
    if (yourScore===0) {
        return {'message':'you lost!', 'color':'red'}
    }else if (yourScore===1) {
        return {'message':'You won!', 'color':'green'}
    }else {
        return {'message':'You tied!', 'color':'yellow'}
    };
};

function rpsFrontend(humanImagechoice, botImageChoice, finalMessage) {
    var imageData = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //Removing all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove(); 
    
    let humanDiv = document.createElement('div')
    let botDiv = document.createElement('div')
    let messageDiv = document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imageData[humanImagechoice] + "' height ='100' width ='100' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageData[botImageChoice] + "' height ='100' width ='100' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}


// Challenge 4
let allButtons = document.getElementsByTagName('button')

let copyAllButtons = []
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
};

function buttonColorChange(buttonThis) {
    if (buttonThis.value === 'red') {
        buttonsRed();
    } else if (buttonThis.value === 'green') {
        buttonsGreen();
    } else if (buttonThis.value === 'reset') {
        resetButtons();
    } else if (buttonThis.value === 'random') {
        randomColors();
    }
};

// Button functions
function buttonsRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    };
};
function buttonsGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    };
};
function resetButtons() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i])
    };
};
function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for (let i = 0; i < allButtons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4)
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    };
};

// Challenge 5 : Blackjack
let blackjackGame = {
'you': {'scoreSpan': '#your-blacjack-result', 'div': '#your-box', 'score': 0 },
'dealer': {'scoreSpan': '#dealer-blacjack-result', 'div': '#dealer-box', 'score': 0 },
'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
'cardsMap': {'2':2, '3':3, '4':4,'5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'K':10, 'Q':10, 'A':[1, 11]},
'wins':0,
'draws':0,
'losses':0,
'isStand':false,
'turnsOver':false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.mp3');
const winSound = new Audio('');
const lossSound = new Audio('');


document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand').addEventListener('click', secondplayer);

document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);



function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    // showScore(YOU);
    console.log(YOU['score'])
    }
};
function secondplayer() {
    blackjackGame['isStand'] = true;
    let card = randomCard();
    console.log(card);
    showCard(card, DEALER);
    updateScore(card, DEALER);
    // showScore(DEALER);

    if (DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showMessage(winner);
        console.log(blackjackGame['turnsOver'])
    }
};
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/cards/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    // hitSound.play();
    }
}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13 );
    return blackjackGame['cards'][randomIndex];
}
function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
    
    blackjackGame['isStand'] = false
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
 
    console.log(yourImages);
    
    for (i = 0; i<yourImages.length; i++) {
        yourImages[i].remove();
    };
    for (i = 0; i<dealerImages.length; i++) {
        dealerImages[i].remove();
    };

    YOU['score'] = 0
    DEALER['score'] = 0

    document.querySelector('#your-blackjack-result').textContent = 0
    document.querySelector('#dealer-blackjack-result').textContent = 0

    document.querySelector('#your-blackjack-result').style.color = '#ffffff'
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'

    document.querySelector('#blackjack-result').textContent = `Let's play`
    document.querySelector('#blackjack-result').style.color = `black`

    blackjackGame['turnsOver'] = true;
    };
};
function updateScore(card, activePlayer) {
    if (card === 'A'){
        // If adding 11 keeps me below 21, add 11; otherwise add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
           activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];  
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    };  
};
function showScore(activePlayer) {
    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    };
};

// Decide Winner Logic
// Also updates wins, draws and losses table
let winner;
function computeWinner() {
    if (YOU['score'] <= 21) {
        // when YOU score more than the dealer or dealer busts
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
           console.log('You won!') 
           blackjackGame['wins']++;
           winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            console.log('You lost!')
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++
            console.log('You drew!')
        } 
    }
    // when YOU burst but DEALER doesn't
    if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('You lost!');
        blackjackGame['losses']++;
        winner = DEALER;

        // When you both burst
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++
        console.log('You drew!');
    };
    console.log(blackjackGame);
    return winner;
}
let message, messageColor; 
function showMessage() {
    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins']
            message = 'You won!'
            messageColor = 'green'
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses']
            message = 'You lost!'
            messageColor ='red'
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws']
            message = 'You drew!'
            messageColor = 'yellow'
        }
        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
    }
};
//  no values