
const gameContainer = document.querySelector('.gameContainer')
const startBtn = document.querySelector('.startBtn')
const resetBtn = document.querySelector('.resetBtn')
const gameBtn = document.querySelector('.gameBtn')
const startForm = document.querySelector('.playerInputContainer')
const startModal = document.querySelector('.startModal')
const playerOneName = document.querySelector('.playerOneName')
const playerOneMarker = document.querySelector('.playerOneMarker')
const playerTwoName = document.querySelector('.playerTwoName')
const playerTwoMarker = document.querySelector('.playerTwoMarker')

// Global Variables
let gameStart = false
var playerTurn = 1

// Gameboard
const gameBoard = (() => {
    const playArea = 
        [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ]
    
    const createPlayArea = (playArea, playerOne, playerTwo) => {
        playArea.map(spot => {
            const gameSpot = document.createElement('div')
            gameSpot.classList.add('spot')
            gameSpot.addEventListener('click', () => {
                checkPlayerTurn(playerTurn, playerOne, gameSpot)
                
            })
            gameContainer.appendChild(gameSpot)
        })
    }

    const checkPlayerTurn = (playerTurn, player, gameSpot) => {
            
        const updatePlayerTurn = (newPlayerTurn) => {
            playerTurn = newPlayerTurn
            return playerTurn
        }

        if(playerTurn == 1) {
            console.log('Player one')
            updatePlayerTurn(2)
        } else {
            playerTurn = 1
            console.log('Player two')
        }
    }

    return {playArea, createPlayArea}
})()


// Player
const player = (name, symbol) => {
    const sayName = () => console.log('My name is ' + name)

    const placeMarker = (spot) => {
        if(gameStart == true) {
            spot.innerText = symbol  
             
        } else {
            alert('Must start game')
        }
        
    }
    
    return { sayName, placeMarker, symbol}
}

const startGame = (playerOneName, playerOneMarker, playerTwoName, playerTwoMarker) => {
    const playerOne = player(playerOneName.value, playerOneMarker.value)
    const playerTwo = player(playerTwoName.value, playerTwoMarker.value)

    gameStart = true

    // Create game board
    gameBoard.createPlayArea(gameBoard.playArea, playerOne, playerTwo)

    console.log(playerOne.symbol, playerTwo.symbol)

    startModal.classList.toggle('inactive')

    return { playerOne, playerTwo}
}

// Event Listeners
startBtn.addEventListener('click', () => {
    startModal.classList.toggle('inactive')
})
gameBtn.addEventListener('click', () => startGame(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker))

// Create character
const jeff = player('jeff', 'x')


//--- RUN PROGRAM ---
