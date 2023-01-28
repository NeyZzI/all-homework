let hFirst = document.querySelector('h1');
let unList = document.querySelector('ul');
let inputProduct = document.querySelector('#input');
let btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    if (input.value.length != 0) {
    unList.innerHTML += `
    <li>
        ${inputProduct.value}
    </li>
    `
    inputProduct.value = ""
    }
});
inputProduct.addEventListener('keypress', (event) => {
    hFirst.textContent = event.key;
});


