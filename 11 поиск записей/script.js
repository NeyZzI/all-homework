let notesBlock = document.querySelector('#notesBlock');
let btnCreate = document.querySelector('.btnCreate');
let inputColor = document.querySelector('#inputColor');
let inputSearch = document.querySelector('#inputSearch')
let flag = 0;

let notesStore = [
    {
        id:1,
        text:"Text",
        color: '#FFF'
    },
    {
        id:2,
        text:"Hello",
        // timeCreated:{
        //     hours: 10,
        //     minutes: 20,
        //     seconds: 25
        // }
    }
]

let btnsDelete =[];
let btnsEdit = [];

let trimFull = (str) => { 
    let arrRes = []
    for(let i=0; i<= str.length-1; i++){ 
        if(str[i] == " "){ 
            arrRes.push(i)
        }
    }
    for(let i=0; i<= arrRes.length-1; i++) {
        let str1 = str.slice(0,arrRes[i])
        let str2 = str.slice(arrRes[i]+1, str.length)
        str = str1+str2
    }
    return str
}

let searchText = (inputValue,notes, notesStore) => { 
    inputValue = inputValue.toLowerCase()
    inputValue = trimFull(inputValue)
    let notesToSearch = notes.map((el) => (
            trimFull(el.toLowerCase())
            )   
    )
    let result = []
    for(let i = 0; i<=notesToSearch.length-1;i++){
        result[i] = 0;
        let newWord = notesToSearch[i]
        for(let j=0; j<= newWord.length-1;j++){ 
            if(newWord[j] == inputValue[j]) {
                result[i] += 1
            }
        }
    }
    let resultSearch = []
    for(let i = 0; i<=notes.length-1; i++) {
        if(result[i]> (inputValue.length)/100*60){ 
            resultSearch.push(notesStore[i])
        }
    }
    return resultSearch
}

let generateNotes = () => {
    notesBlock.innerHTML = null
    if (notesStore.length != 0) {
        notesStore.map((el, index) => {
            if(!el.statusDelete) {
                notesBlock.innerHTML += `
                    <div class="note" style = "background-color: ${el.color}">
                        <p class="noteText" id="noteText${index}">
                        ${el.text}</p>
                        <button class="noteEdit" id="btnEdit${index}">Edit</button>
                        <button class="noteDelete" id="btnDelete${index}">Delete</button>
                    </div>
                `
            } 
        })
        for(let i=0; i<=notesStore.length-1; i++){
            if(!notesStore[i].statusDelete) {
            btnsDelete[i] = document.querySelector(`#btnDelete${i}`);
            btnsDelete[i].addEventListener('click', () => {
                notesStore[i].statusDelete = true
                generateNotes()
            });
            btnsEdit[i] = document.querySelector(`#btnEdit${i}`);
            btnsEdit[i].addEventListener('click', () => {    
                if(flag == 0) {
                    document.querySelector(`#noteText${i}`).outerHTML = `
                    <textarea class = "textarea" id = "textarea${i}" placeholder = "Введите текст"></textarea>
                    `
                    btnsEdit[i].textContent = 'OK'
                    flag = 1;
                }
                else if (flag == 1 ) {
                    notesStore.map((el, index) => {
                        if((index == i) && (document.querySelector(`#textarea${i}`).value != 0)){
                            el.text = document.querySelector(`#textarea${i}`).value;
                            generateNotes()
                        }
                    });
                    flag = 0;
                }
            });
            }
        }
    }
}

console.log(notesStore);
generateNotes();

// let getCurentTime() => {

// }

let createNote = () => {
    if (inputText.value.length != 0) {
        notesStore.push(
            {
                id: notesStore.length>0 ? notesStore[notesStore.length-1].id + 1 : 1,
                text: inputText.value,
                color: inputColor.value
            }
        )
        inputText.value = '';
        generateNotes(notesStore);
    }
}

let genereteNotesSearch = (notes) => { 
    notesBlock.innerHTML = null
    notes.map((el,index) => {
        if(!el.statusDelete){
        notesBlock.innerHTML += `
        <div class="note" id="note${index}" style="background:${el.color}">
            <p id="noteText${index}">${el.text}</p>
        </div>
        `     
        }
    })
}

let startSearch = () => {
    if(inputSearch.value.length != 0){
        notesBlock.innerHTML = null
        let notesStoreToSearch = []
        notesStore.map((el) => {
            if (!el.statusDelete){
                notesStoreToSearch.push(el.text)
            }
        })
        let resultSearch = searchText(inputSearch.value, notesStoreToSearch, notesStore)
        if(resultSearch.length == 0) { 
            notesStoreToSearch = []
            notesStore.map((el) => {
                if (!el.statusDelete){
                    notesStoreToSearch.push(el.title)
                }
            })
            resultSearch = searchText(inputSearch.value, notesStoreToSearch, notesStore)
        } 
        genereteNotesSearch(resultSearch)
    } else {
        genereteNotes()
    }
}

inputSearch.addEventListener('change', startSearch)
btnCreate.addEventListener('click', createNote);