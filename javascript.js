const Gameboard = (function() {
    const gameboard = ["", "", "","", "", "","", "", ""]
    
    function getBoard(){
        return(gameboard)
    }

    function endGame(endState){
        Display.gameOver(endState)
        Display.render()
    }

    function clear(){
        for(let i = 0; i < gameboard.length; i++){
            gameboard[i] = ""
        }
    }

    function isMarked(position){
        if (gameboard[position] === ""){
            return false
        }
        else{
            return true
        }
    }

    function markSquare(position, marker){
        gameboard[position] = marker

        checkWin(marker)
        checkTie()
    }

    function checkWin(marker){
        let markedSquares = []
        for(let i = 0; i < gameboard.length; i++){
            if(gameboard[i] === marker){
                markedSquares += i
            }
        }

        winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    
        for(let i = 0; i < winCombinations.length; i++){
            let win = winCombinations[i]
            let checker = (marked, win) => win.every(v => marked.includes(v))
            if(checker(markedSquares, win) === true){
                endGame(Game.getCurrentPlayer().name)
            }
        }
    }

    function checkTie(){
        let isTie = true;
        for(let i = 0; i < gameboard.length; i++){
            console.log[gameboard[i]]
            if(gameboard[i] === ""){
                isTie = false
            }
        }

        if (isTie === true){
            endGame("tie")
            console.log("tie")
        }
        
    }


    return{
        isMarked,
        markSquare,
        checkWin,
        getBoard,
        clear
    }

})();

function Player(marker, name){
    return{
        name: name,
        marker: marker,
        getMarker: function(){
            return marker
        }
    }
}

const Game = (function() {

    function namePlayers(){
        const nameX = document.querySelector("#playerX")
        const nameO = document.querySelector("#playerO")
        playerX.name = nameX.value
        playerO.name = nameO.value
    }

    const playerX = Player("X")
    const playerO = Player("O")

    let turnX = true

    function addMarker(position, square){
        if (Gameboard.isMarked(position) === false){
            let player = getCurrentPlayer()
            Gameboard.markSquare(position, player.getMarker())
            Display.markSquareDisplay(square)
            changePlayer()
            Display.displayTurn(getCurrentPlayer())
        }
    }

    function changePlayer(){
        turnX = !turnX
    }

    function getCurrentPlayer(){
        if(turnX === true){
            return playerX
        }
        else if(turnX === false){
            return playerO
        }
    }



    return{
        addMarker,
        changePlayer,
        getCurrentPlayer,
        namePlayers
    }
})();

const Display = (function(){
    const display = document.querySelector(".gameboard")
    const startScreen = document.querySelector(".start-screen")
    const startForm = document.querySelector(".start-form")
    const endScreen = document.querySelector(".end-screen")
    const againButton = document.querySelector(".play-again")
    const turn = document.querySelector(".turn")
    const winText = document.querySelector(".winner")
    const restart = document.querySelector(".restart")

    againButton.addEventListener('click', () => {
        playAgain()
    })

    startForm.addEventListener('submit', () => {
        event.preventDefault()
        Game.namePlayers()
        Display.displayTurn(Game.getCurrentPlayer())
        startGame()
    })

    restart.addEventListener('click', () => {
        Gameboard.clear()
        render()
        if(Game.getCurrentPlayer().marker === "O"){
            Game.changePlayer()
            displayTurn(Game.getCurrentPlayer())
    }
    })

    function startGame(){
        startScreen.close()
        event.preventDefault()
        render()
    }

    function render(){
        display.textContent = ""
        let gameboard = Gameboard.getBoard()
        for (let i = 0; i < gameboard.length; i++){
            const square = document.createElement("div")
            square.classList.add("square")
            display.appendChild(square)

            if(gameboard[i] != ""){
                square.textContent = gameboard[i]
            }
            else{
                square.addEventListener('click', () => {
                    Game.addMarker(i, square)
                    
                })
                
            }

        }
    }

    function markSquareDisplay(square){
        let player = Game.getCurrentPlayer()
        square.textContent = player.getMarker()
    }

    function gameOver(state){
        if(state == "tie"){
            winText.textContent = "it's a tie!"
        }
        else{
            winText.textContent = state + " wins!"
        }
        endScreen.showModal()
    }

    function playAgain(){
        endScreen.close()
        Gameboard.clear()
        render()
    }

    function displayTurn(player){
        turn.textContent = player.name +"'s Turn"
    }

    return{
        render,
        gameOver,
        startScreen,
        markSquareDisplay,
        displayTurn
    }
})()

Display.startScreen.showModal()


