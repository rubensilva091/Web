//Give Event Listener to all drums with mouse
var drums = document.querySelectorAll(".drum");
for (var i = 0; drums[i]; i++) {
    drums[i].addEventListener("click", eventHandler);
}


function eventHandler(key) {
    // Take the text of the selected drum
    drum = this.textContent;

    //in case that doesnt exist, which means that is keypress input
    //it re-creates drum for event.key
    if (drum == undefined) 
    {
        drum = key;
        console.log(drum);
    }
    var sound_name = "sounds/";
    switch (drum) {
        case "w":
            sound_name += "tom-1.mp3";
            break;
        case "a":
            sound_name += "tom-2.mp3";
            break;
        case "s":
            sound_name += "tom-3.mp3";
            break;
        case "d":
            sound_name += "tom-4.mp3";
            break;
        case "j":
            sound_name += "snare.mp3";
            break;
        case "k":
            sound_name += "kick-bass.mp3";
            break;
        case "l":
            sound_name += "crash.mp3";
            break;
    }
    var audioElement = new Audio(sound_name);
    audioElement.play();
}

//Need to use callback function just because "event" is ...outdated???...
document.addEventListener("keypress", function (event) {
    eventHandler(event.key);
});