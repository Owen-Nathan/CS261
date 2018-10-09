var person;
var animalArray = [];
var jsonObject;
function createPersonObject()
{
    var fn = document.getElementById("firstName").value;
    var ln = document.getElementById("lastName").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;


    person =
        {
            "First Name": fn,
            "Last Name": ln,
            "City" : city,
            "State": state
        };
    document.getElementById("output").innerHTML =
        "<h4>Person Object Properties</h4>" +
        "First Name: " + person["First Name"] +"<br>" +
        "Last Name: " + person["Last Name"] +"<br>" +
        "City: " + person["City"] +"<br>" +
        "State: " + person["State"] + "<br>";

}

function createAnimalArray() {
    var a1 = document.getElementById("animal1").value;
    var a2 = document.getElementById("animal2").value;
    var a3 = document.getElementById("animal3").value;

    animalArray[0] = a1;
    animalArray[1] = a2;
    animalArray[2] = a3;

    document.getElementById("animalArrayOutput").innerHTML =
        "<h4>Animal Array</h4>" +
        "animalArray[0] = " + animalArray[0] + "<br>" +
        "animalArray[1] = " + animalArray[1] + "<br>" +
        "animalArray[2] = " + animalArray[2] + "<br>";

}
function convertToString(elementID,object)
{
    switch (object) {
        case "person":
            object = person;
            document.getElementById("jsonOBJString").value = JSON.stringify(object);
            break;
        case "animalArray":
            object = animalArray;
            document.getElementById("jsonArrayString").value = JSON.stringify(object);
            break;
    }
    document.getElementById(elementID).innerHTML = JSON.stringify(object);
}

function parseJSON(input,output) {
    var jsonString = document.getElementById(input).value;
    var jsonObject = JSON.parse(jsonString);
    var outputText = "";
    for(let key in jsonObject) {
        if(jsonObject.hasOwnProperty(key)) {
            outputText += key + ": " + jsonObject[key] + "<br>";
        }
    }

    document.getElementById(output).innerHTML = outputText;
}


//This is just a simple function that receives in a document id and hides that element
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

//This is just a simple function that receives in a document id and shows that element
function show(id) {
    document.getElementById(id).style.display = 'block';
}

function toggle(id,link)
{
    var display = document.getElementById(id).style.display;
    if(display === 'none')
    {
        show(id);
        document.getElementById(link).innerText = "Hide";
    } else {
        hide(id);
        document.getElementById(link).innerText = "Show";
    }
}