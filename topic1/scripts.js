function sayHello(numberOfTimes, name) {
    var name = document.getElementById(name).value;
    var num = document.getElementById(numberOfTimes).value;
    var output = '';
    if(num > 0 && name != "") {
    for (var i = 0; i < num; i++) {
        output += 'Hello ' + name + '<br>';
    }

    } else {
        output = "Ahh come on why don't you want to play or at least follow the rules?";
    }

    document.getElementById('output').innerHTML = output;


}

function createSportsArray() {
    var a1 = document.getElementById("sport1").value;
    var a2 = document.getElementById("sport2").value;
    var a3 = document.getElementById("sport3").value;

    if(a1 != "" && a2 != "" && a3 != "") {
    var sports = [];

    sports[0] = a1;
    sports[1] = a2;
    sports[2] = a3;

    document.getElementById("output2").innerHTML =
        "<h4>Sports Array</h4>" +
        "sports[0] = " + sports[0] + "<br>" +
        "sports[1] = " + sports[1] + "<br>" +
        "sports[2] = " + sports[2] + "<br>";
    } else {
        document.getElementById("output2").innerHTML = "Well I wanted to show you an array, but you decided to not play along :(";
    }
}