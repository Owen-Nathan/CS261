function changed() {
    let color = document.getElementById('paragraphChange').value;
    let paragraphs = document.getElementsByClassName('paragraph');
    for(let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = color;
    }
}
function countCharacters() {
    let characterCount = document.getElementById('simpleText').value.length;
    document.getElementById('characterCount').innerText = "Characters: " + characterCount;
}

function loaded() {
    alert("Hello! This was run by the onload function!");
}

function mousedOver() {
    document.getElementById('mouseOverOutParagraph').innerHTML = "Hey you moused over me :) Now move your mouse away!"
}

function mousedOut() {
    document.getElementById('mouseOverOutParagraph').innerHTML = "Hey Mouse over me!";
}

function clicked() {
    document.getElementById('clickedParagraph').innerHTML = "Yay! You clicked me!";
}

function touched() {
    document.getElementById('touchParagraph').innerHTML = "Hey you touched me :) Now stop it!"
}

function untouched() {
    document.getElementById('touchParagraph').innerHTML = "Hey Touch Me!";
}

function playAnimation() {
    let animation = document.getElementsByClassName('animate')[0];
    animation.addEventListener('webkitAnimationEnd',updateButton);
    animation.addEventListener('animationend', updateButton);

    let button = document.getElementById('toggleButton');

    button.innerText = 'Playing';
    button.disabled = true;
    document.getElementsByClassName('animate')[0].style.animationPlayState = 'running';
}

function updateButton() {
    let button = document.getElementById('toggleButton');
    button.innerText = 'Play';
    button.disabled = false;

}

var transitioned = false;
function updateTransitionButton() {
    let button = document.getElementById('transitionButton');
    button.innerText = 'Play';
    button.disabled = false;
    transitioned = true;
}


function transition() {
    let square = document.getElementById('square2');

    let button = document.getElementById('transitionButton');
    button.innerText = 'Transitioning';
    button.disabled = true;

    square.addEventListener('transitionend', updateTransitionButton);
    if(transitioned) {
        square.style.width = '50px';
        square.style.height = '50px';
        square.style.backgroundColor = 'yellow';
    } else {
        square.style.width = '300px';
        square.style.height = '150px';
        square.style.backgroundColor = 'blue';
    }
}