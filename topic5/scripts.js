
function checkCompatibility() {
    if(typeof(Storage) !== "undefined") {
        return true;
    } else {
        alert("Your browser doesn't support the local web storage api!");
        return false;
    }
}
function saveData() {
    var compatible = checkCompatibility();

    if(compatible) {
        localStorage.setItem("firstName",document.getElementById('firstName').value);
        localStorage.setItem("lastName",document.getElementById('lastName').value);
    }
}

function retrieveData() {
    if(checkCompatibility()) {
        if(localStorage.getItem('firstName') !== null) {
            document.getElementById('firstNameOutput').innerText = "From Storage: " +  localStorage.getItem("firstName");
            document.getElementById('lastNameOutput').innerText = "From Storage: " +  localStorage.getItem("lastName");


            let sportsArray = JSON.parse(localStorage.getItem("sports"));
            let  sportsOutput = "";
            sportsArray.forEach(sport=> {
                sportsOutput += "<li>" + sport + "</li>";
            });
            document.getElementById("sportsOutput").innerHTML = "From Storage: <br>" + sportsOutput;

            let student = JSON.parse(localStorage.getItem("student"));

            let studentOutput = "Name: ";
            studentOutput += student.Name + "<br>";
            studentOutput += "Classes: <br>";
            student.Classes.forEach(subject=> {
                studentOutput += "<li>" + subject + "</li>";
            });

            document.getElementById('studentOutput').innerHTML = "From Storage: <br>" + studentOutput;
        }
    }
}

function createStudent() {
    var name = document.getElementById('name').value;
    var c1 = document.getElementById("class1").value;
    var c2 = document.getElementById("class2").value;
    var c3 = document.getElementById("class3").value;

    var student =
        {
            "Name": name,
            "Classes": [
                c1,
                c2,
                c3
            ]
        };

    var studentString = JSON.stringify(student);
    if(checkCompatibility()) {
        localStorage.setItem("student",studentString);
    }
}

function createSportsArray() {
    var a1 = document.getElementById("sport1").value;
    var a2 = document.getElementById("sport2").value;
    var a3 = document.getElementById("sport3").value;

    if (a1 != "" && a2 != "" && a3 != "") {
        var sports = [];

        sports[0] = a1;
        sports[1] = a2;
        sports[2] = a3;
        var sportString = JSON.stringify(sports);
        if(checkCompatibility()){
            localStorage.setItem("sports",sportString);
        }
    }
}

//This is just a simple function that receives in a document id and hides that element
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

//This is just a simple function that receives in a document id and shows that element
function show(id) {
    document.getElementById(id).style.display = 'block';
}
