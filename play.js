function openPage(path){
    location.href = path;
}

var pbls = document.getElementById("n_Pebbles").value;
var player_1 = document.getElementById("P1").value;
var player_2 = document.getElementById("P2").value;
var take1 = document.getElementById("moves1").value;
var take2 = document.getElementById("moves2").value;
var take3 = document.getElementById("moves3").value;

const Btn1 = document.getElementById("choice1btn");
const Btn2 = document.getElementById("choice2btn");
const Btn3 = document.getElementById("choice3btn");

var counter = 0


function setclick() {
    pbls = document.getElementById("n_Pebbles").value;
    player_1 = document.getElementById("P1").value;
    player_2 = document.getElementById("P2").value;
    take1 = document.getElementById("moves1").value;
    take2 = document.getElementById("moves2").value;
    take3 = document.getElementById("moves3").value;
    document.getElementById("pebbles").innerHTML = pbls;
    document.getElementById("choice1").innerHTML = take1;
    document.getElementById("choice2").innerHTML = take2;
    document.getElementById("choice3").innerHTML = take3;
    document.getElementById("player-name").innerHTML = player_1 + "'s turn!";
}

function player_move(current_move){
    if((pbls - current_move) < 0){
        console.log("invalid move");
    } else {
        counter++;
        pbls = pbls - current_move;
        document.getElementById("pebbles").innerHTML = pbls;
        if (counter % 2 == 1){
            document.getElementById("player-name").innerHTML = player_2 + "'s turn!";
            var current_player = player_2
        } else {
            document.getElementById("player-name").innerHTML = player_1 + "'s turn!";
            var current_player = player_1
        }
    }
    console.log(pbls + " X")
    console.log(counter)
    if(pbls == 0){
        document.getElementById("player-name").innerHTML = current_player + " won!"
        counter = 0;
    }
}

Btn1.onclick = function () {player_move(take1);}
Btn2.onclick = function () {player_move(take2);}
Btn3.onclick = function () {player_move(take3);}

