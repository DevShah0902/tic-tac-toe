const Game = (function() {
    const gameboard = ["","","","","","","","","",]
    let isTurn1 = true
    let marker = 'x'

    function startGame(){
        console.log("start")
    }

    function render(){
        console.log(gameboard)
    }
    
    function addMarker(position){
        checkCurrentMarker()
        
        if(gameboard[position] === ""){
            gameboard[position] = marker
        }
        else{
            console.log("invalid move")
            return
        }
        render()
        changePlayer()
    }

    function checkCurrentMarker(){
        if(isTurn1 === true){
            marker = "X"
        }
        else{
            marker = "O"
        }
    }

    function changePlayer(){
        isTurn1 = !isTurn1
        console.log(isTurn1)
    }

    function checkWin(){

    }

    return{
        render: render,
        addMarker: addMarker,
        checkCurrentMarker: checkCurrentMarker,
        changePlayer: changePlayer,
    };
})();

