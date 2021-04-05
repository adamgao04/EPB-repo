function openPage(path){
    location.href = path;
}

var pbls = document.getElementById("n_Pebbles").value;
var take1 = document.getElementById("moves1").value;
var take2 = document.getElementById("moves2").value;
var take3 = document.getElementById("moves3").value;
var bot_diff = document.getElementById("diff").value;

const Btn1 = document.getElementById("choice1btn");
const Btn2 = document.getElementById("choice2btn");
const Btn3 = document.getElementById("choice3btn");

var counter = 0;
var states = [];
var moves = [];
var bot_start = 0;

function setclick() {
    pbls = document.getElementById("n_Pebbles").value;
    take1 = document.getElementById("moves1").value;
    take2 = document.getElementById("moves2").value;
    take3 = document.getElementById("moves3").value;
    bot_diff = document.getElementById("diff").value;
    moves = Array.from(new Set([parseInt(take1), parseInt(take2), parseInt(take3)]));

    document.getElementById("pebbles").innerHTML = pbls;
    document.getElementById("choice1").innerHTML = take1;
    document.getElementById("choice2").innerHTML = take2;
    document.getElementById("choice3").innerHTML = take3;

    counter = 0

    game_analysis();
    game_start();
}

// game_analysis function => calculate the winning and losing states for number of pebbles. returns a list with booleans
// game_start function => calculate whether the bot goes second or first. if state = win, go first
// game_move_bot function => decide what the best optimal move is. If bot is in a losing state, there is no optimal move, random choice
// game_move_pl function => records the player's choice and subtracts from pebbles

function game_analysis(){
    states = [false];
    var moves = [parseInt(take1), parseInt(take2), parseInt(take3)];
    var win_state = true
    var lose_state = false
    for (var i=2; i<=pbls; i++){
      states.push(lose_state)
      for (var x=0; x<moves.length; x++){
        if (states[i - 1 - moves[x]] == lose_state){
          states[i-1] = win_state;
        }
      }
    }
    return states
  }

function game_start(){
    if (states[pbls-1] == false){
        document.getElementById("player-name").innerHTML = "Your turn!";
        bot_start = false
    } else{
        game_move_bot();
        bot_start = true
    }
}

function game_move_bot(){
    counter++;
    if (states[pbls-1] == false || bot_diff < Math.floor(Math.random()*101)){
        var first_move = moves[Math.floor(Math.random()*3)];
        do {
            first_move = moves[Math.floor(Math.random()*3)];
        }
        while (pbls - first_move < 0);
        pbls = pbls - first_move;
        document.getElementById("pebbles").innerHTML = pbls;
        document.getElementById("player-name").innerHTML = "Bot took away " + first_move + "!";
    } else{
        for (var i = 0; i < moves.length; i++){
            if(states[pbls - moves[i] - 1] == false){
                if (pbls == 1){
                    pbls = pbls - 1
                } else if(pbls - moves[i] < 0){
                    continue;
                } else {
                    pbls = pbls - moves[i]
                }
                document.getElementById("pebbles").innerHTML = pbls;
                document.getElementById("player-name").innerHTML = "Bot took away " + moves[i] + "!";
            }
        }
    }
    if(pbls == 0){
        document.getElementById("player-name").innerHTML = "You won! The bot you defeated was level " + bot_diff + "."
        return counter = 0;
    }
}

function game_move_pl(current_move){
    counter++;
    pbls = pbls - current_move;
    document.getElementById("pebbles").innerHTML = pbls;
}


                    
function game(current_move){
    if (bot_start == true && counter % 2 == 1){
        if (pbls - current_move < 0){
            return document.getElementById("player-name").innerHTML = "Invalid move!" 
        }
        game_move_pl(current_move);
        if(pbls == 0){
            document.getElementById("player-name").innerHTML = "Level " + bot_diff + " bot defeated you!" 
            return counter = 0;
        }
        game_move_bot();
    }
    if (bot_start == false && counter % 2 == 0){
        if (pbls - current_move < 0){
            return document.getElementById("player-name").innerHTML = "Invalid move!" 
        }
        game_move_pl(current_move);
        if(pbls == 0){
            document.getElementById("player-name").innerHTML = "Level " + bot_diff + " bot defeated you!" 
            return counter = 0;
        }
        game_move_bot();
    }
}
    
Btn1.onclick = function () {game(take1);}
Btn2.onclick = function () {game(take2);}
Btn3.onclick = function () {game(take3);}

