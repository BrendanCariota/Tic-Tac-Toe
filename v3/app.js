
// CREATE PLAYER
const Player = (marker) => {
    this.marker = marker;

    const getMarker = () => {
        return marker
    }

    return { getMarker }
}

// GAME BOARD
const gameBoard =  (() => {
    const gameBoard = ['', '', '', '', '', '', '', '', '']

    const placeMarker = (box, marker) => {
        gameBoard[box.id] = marker
        box.innerText = marker
        gameController.checkWin(gameBoard, marker)
    }

    const getMarkerSpot = (index) => {
        return gameBoard[index]
    }

    const reset = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = ''
            displayController.boxes[i].innerText = ''
        }
        gameController.resetRound()
        displayController.resetPlayText()
        gameController.resetGameOver()

    }

    return { placeMarker, getMarkerSpot, reset, gameBoard }
})()

// GAME CONTROLLER
const gameController =  (() => {
    const playerX = Player('X')
    const playerO = Player('O')
    let round = 1
    let gameOver = false

    const playRound = (box) => {
        if(round % 2 === 1) {
            gameBoard.placeMarker(box, playerX.getMarker())   
        } else {
            gameBoard.placeMarker(box, playerO.getMarker()) 
        }
        round ++
        if (round > 9 && gameOver === false) {

            gameOver = true
            displayController.playText.innerText = `It's a Tie!`
        }
    }

    const getIsOver = () => {
        return gameOver
    }

    const checkWin = (gameBoard, marker) => {
        if (gameBoard[0] === marker) {
            if (gameBoard[1] === marker && gameBoard[2] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
            if (gameBoard[4] === marker && gameBoard[8] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
            if (gameBoard[3] === marker && gameBoard[6] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
        }
        if (gameBoard[8] === marker) {
            if (gameBoard[2] === marker && gameBoard[5] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
            if (gameBoard[6] === marker && gameBoard[7] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
        }
        if (gameBoard[6] === marker) {
            if (gameBoard[4] === marker && gameBoard[2] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
        }
        if (gameBoard[4] === marker) {
            if (gameBoard[1] === marker && gameBoard[7] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
            if (gameBoard[3] === marker && gameBoard[5] === marker) {
                gameOver = true
                displayController.setPlayText(marker)
            }
        }

    }

    const resetRound = () => {
        round = 1
    }

    const resetGameOver = () => {
        gameOver = false
    }

    return { playRound, getIsOver, checkWin, resetRound, resetGameOver }
})()

// DISPLAY CONTROLLER
const displayController =  (() => {
    const boxes = document.querySelectorAll('.box')
    const restartBtn = document.querySelector('#restartBtn')
    let playText = document.querySelector('#playText')

    restartBtn.addEventListener('click', gameBoard.reset)

    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            if (gameController.getIsOver() || e.target.textContent !== '') {
                return
            }
            gameController.playRound(box)
        })
    })

    const setPlayText = (marker) => {
        playText.innerText = `${marker} has won!`
    }

    const resetPlayText = (marker) => {
        playText.innerText = `Let's Play!`
    }

    return { boxes, setPlayText, resetPlayText, playText }

})()
