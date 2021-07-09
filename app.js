
const gameContainer = document.querySelector('.gameContainer')

// Gameboard
const gameBoard = (() => {
    const playArea = 
        [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ]
    
    const createPlayArea = (playArea) => {
        playArea.map(spot => {
            const gameSpot = document.createElement('div')
            gameSpot.classList.add('spot')
            gameSpot.addEventListener('click', () => jeff.placeMarker(gameSpot))
            gameContainer.appendChild(gameSpot)
        })
    }

    return {playArea, createPlayArea}
})()

// Player
const player = (name, symbol) => {
    const sayName = () => console.log('My name is ' + name)

    const placeMarker = (spot) => {
        console.log(spot)
        console.log('placed ' + symbol + ' at ' + spot)
        spot.innerText = symbol
    }
    
    return { sayName, placeMarker, symbol}
}

// Create character
const jeff = player('jeff', 'x')

//--- RUN PROGRAM ---
// Create game board
gameBoard.createPlayArea(gameBoard.playArea)