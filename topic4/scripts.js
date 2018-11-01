function getData() {
    var output = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(xhttp.response);
                for(var i = 0; i < data.length; i++) {
                    for(let key in data[i])
                    {
                        if(key === "address") {
                            for(let key2 in data[i][key]) {
                                if(key2 !== "geo")
                                    output += "&nbsp; &nbsp; " +key2 + ": " + data[i][key][key2] + "<br>";
                            }
                        } else if (key === "company") {
                            output += key + ": " + data[i][key]['name'] + "<br>";
                        } else {
                            output += key + ": " + data[i][key] + "<br>";
                        }
                    }
                    output += "<br>";
                }


                document.getElementById('output').innerHTML = output;
        }
    };

    xhttp.open("GET", 'https://jsonplaceholder.typicode.com/users', true);
    xhttp.send();
}