
var playing = false;

function play() {
    if(playing) {
        document.getElementById('playPauseButton').innerText = 'Play';
        document.getElementById('sunMovement').style.animationPlayState = 'paused';
        document.getElementById('sky').style.animationPlayState = 'paused';

        playing = false;
    } else {
        document.getElementById('playPauseButton').innerText = 'Pause';
        document.getElementById('sunMovement').style.animationPlayState = 'running';
        document.getElementById('sky').style.animationPlayState = 'running';

        playing = true;
    }
}

function transition() {

    let square = document.getElementById('square');
    square.style.width = '300px';
    square.style.height = '150px';
    square.style.backgroundColor = 'blue';


}