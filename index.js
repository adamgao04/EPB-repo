const localBtn = document.getElementById("local");
const botBtn = document.getElementById("bot");
const setBtn = document.getElementById("set");

function openPage(path){
    location.href = path;
}

botBtn.onclick = function () {openPage("bot.html");}
localBtn.onclick = function () {openPage("play.html");}
