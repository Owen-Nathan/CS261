function changeHeader() {
    let color = document.getElementById('headerChange').value;
    let headers = document.getElementsByClassName('header');
    for(let i = 0; i < headers.length; i++) {
        headers[i].style.color = color;
    }
}

function changeParagraph() {
    let fontSize = document.getElementById('paragraphChange').value;
    let paragraphs = document.getElementsByClassName('paragraph');
    for(let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.fontSize = fontSize;
    }
}