// 1
let divById = document.getElementById('container');
let divByClass = document.getElementsByClassName('container');

// 2
let textField = document.getElementById('textForParagraph');
let textP = document.getElementById('paragraph');
let btn = document.getElementById('submitBtn');

let btnClick = () => {
    let textInField = textField.value;
    textP.textContent = textField.value;
    textField.value = '';
    //3
    alert(textP.textContent.startsWith('zxc'));
    alert(textP.textContent.endsWith('abc'));
}
console.log(textP.textContent);
btn.onclick = btnClick;
