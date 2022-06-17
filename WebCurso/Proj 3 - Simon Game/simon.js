var game_array = [];
var player_array = [];
var counter = 0;
var points = 0;

//0 means that cant listen keyboard_input to start the game
//1 means that can listen keyboard_input to start the game
//2 means that lost and will reload the page
var restart_allow = 1;

//function that will add a new color to the end of the array
function generateNewArray() {
    var color = ["green", "red", "yellow", "blue"];
    var new_color_index = Math.floor(Math.random() * 4);
    game_array.push(color[new_color_index]);
}

//function that select our clicked color
function colorSelector(color) {
    playSoundColor(color);
    fancyAnimation(color);
}

//Play the proper sound of each color
function playSoundColor(color) {
    var sound_str = "sounds/";
    switch (color) {
        case "green":
            sound_str += "green.mp3";
            break;
        case "red":
            sound_str += "red.mp3";
            break;
        case "yellow":
            sound_str += "yellow.mp3";
            break;
        case "blue":
            sound_str += "blue.mp3";
            break;
        case "lost":
            sound_str += "wrong.mp3";
    }
    var audio = new Audio(sound_str);
    audio.volume = 0.2;
    audio.play();
}

//Flashes the color that was intended
function fancyAnimation(color) {
    var color_class = ".btn." + color
    $(color_class).addClass("pressed");
    playSoundColor(color);
    setTimeout(function () {
        $(color_class).removeClass("pressed")
    }, 150);
}

//shows the player the next play
function showNextMove() {

    var i = 0;
    var pattern = setInterval(function () {
        if (game_array[i]) {

            fancyAnimation(game_array[i]);
            i++;
        }
        else {
            clearInterval(pattern);
        }
    }, 1000);

}

//Fuction to trigger the start of the game
function game_starts() {
    if (restart_allow==2)
    {
        location.reload();
    }
    if (restart_allow==1) {
        $("body").css("background-color", "#011F3F");
        $("#level-title").text("Level: 0");
        generateNewArray();
        showNextMove();

        console.log("COMEÇOU: " + game_array);

        //criar o event listener
        $(".btn").click(function () {
            gameplay(this.id);
            colorSelector(this.id);
        });
        restart_allow=0;
    }
}

//Reset the round
function playerReset() {
    player_array = [];
    counter = 0;
}

//gameplay fuction
//this is a total mess, but it works and don't think that its worth-
//-making it more efficient, its just for learning purpose :)
//(understand how js works) <--
function gameplay(color) {

    //make sure that the colors match with pattern
    //if something doesnt match, key==0 means that "LOST"
    player_array.push(color);
    var key=1;
    for (var t=0; player_array[t];t++)
    {
        if(game_array[t]!=player_array[t])
        {
            key=0;
        }
    }

    console.log(player_array+" AND "+game_array);
    if ((player_array.length == game_array.length) || key==0) {

        //compare the 2 arrays
        if (!key) {
            console.log("LOST");
            playerReset();
            points = 0;
            var new_text = "RIP, you lost :'(";
            $("#level-title").text(new_text);
            $("body").css("background-color", "#3f0101");
            playSoundColor("lost");
            game_array=[];
            restart_allow=2;
        }
        else {
            console.log("win");
            generateNewArray();
            showNextMove();
            playerReset();
            points++;
            var new_text = "Level: " + points;
            $("#level-title").text(new_text);
        }
    }
    else {
        counter++;
    }

}

//MAIN CODE DOWN HERE...
document.addEventListener("keypress", game_starts);
