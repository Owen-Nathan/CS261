function drawAmericanFlag() {
    var canvas = document.getElementById('americanFlag');
    var context = canvas.getContext('2d');

    context.moveTo(0,0); //Start in top left corner.
    context.fillStyle = "blue";
    context.fillRect(0,0,100,83);
    context.fillStyle = "red";
    context.fillRect(100,0,200,11.53);
    context.fillRect(100,23,200,11.53);
    context.fillRect(100,46,200,11.53);
    context.fillRect(100,69,200,11.53);
    context.fillRect(0,92,300,11.53);
    context.fillRect(0,115,300,11.53);
    context.fillRect(0,138,300,11.53);
    context.fillRect(0,161,300,11.53);
}