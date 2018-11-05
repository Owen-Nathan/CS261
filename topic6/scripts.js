function insert() {
    let element = createElement();
    document.body.appendChild(element);
}

function createElement() {
    let id = Math.floor(Math.random() * 101).toString();
    let element = document.createElement("h3");
    let message = "ID: " + id + " Message: " + document.getElementById('message').value + " ";
    let t = document.createTextNode(message);
    element.id = id;
    element.appendChild(t);

    let delButton = document.createElement("button");
    delButton.onclick = function() {
            let element = document.getElementById(id);
            document.body.removeChild(element);
    };

    delButton.innerText = "Delete";
    element.appendChild(delButton);
    return element;
}
function before() {
    let element = createElement();
    let nextElement = document.getElementById(document.getElementById('id').value);

    document.body.insertBefore(element, nextElement);
}

