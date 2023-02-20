//This will get the number of elements which have the drum class. i.e. the number of drum elements.
var NumOfDrums = document.querySelectorAll(".drum").length;

// This will loop through all the drum elements.
for (var i=0; i<NumOfDrums; i++){

    // This will get the element which has the class drum and we loop through all such elements.
    // Then we add an event listener to those drum elements which will call the function
    // when a "drum" class element is clicked.
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){

        var drum_pressed = this.innerHTML;
        drum_sound(drum_pressed);
    });


    // This checks for Keyboard press.
    document.addEventListener("keypress", function(event){

        drum_sound(event.key);
    });


    function drum_sound(key){

        switch (key) {
            case "w":
                var audio = new Audio("sounds/tom-1.mp3");
                audio.play();
                break;

            case "s":
                var audio = new Audio("sounds/tom-2.mp3");
                audio.play();
                break;

            case "a":
                var audio = new Audio("sounds/tom-3.mp3");
                audio.play();
                break;

            case "d":
                var audio = new Audio("sounds/tom-4.mp3");
                audio.play();
                break;

            case "j":
                var audio = new Audio("sounds/snare.mp3");
                audio.play();
                break;

            case "k":
                var audio = new Audio("sounds/kick-bass.mp3");
                audio.play();
                break;

            case "l":
                var audio = new Audio("sounds/crash.mp3");
                audio.play();
                break;

            default:
                console.log(key);
        }
    }
}