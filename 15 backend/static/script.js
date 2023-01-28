let notesBlock = document.querySelector('#notesBlock');
let btnCreate = document.querySelector('.btnCreate');
let inputColor = document.querySelector('#inputColor');
let inputSearch = document.querySelector('#inputSearch')
let flag = 0;
console.log(document.location)

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

let notes =[];

let trimFull = (str) => { 
    let arrRes = []
    for(let i=0; i<= str.length-1; i++){ 
        if(str[i] == " "){ 
            arrRes.push(i)
        }
    }
    for(let i=0; i<= arrRes.length-1; i++) {
        let str1 = str.slice(0,arrRes[i]);
        let str2 = str.slice(arrRes[i]+1, str.length);
        str = str1+str2;
    }
    return str;
}

let searchText = (inputValue,notes, notesStore) => { 
    inputValue = inputValue.toLowerCase()
    inputValue = trimFull(inputValue)
    let notesToSearch = notes.map((el) => (
            trimFull(el.toLowerCase())
            )   
    )
    let result = [];
    for(let i = 0; i<=notesToSearch.length-1;i++){
        result[i] = 0;
        let newWord = notesToSearch[i]
        for(let j=0; j<= newWord.length-1;j++){ 
            if(newWord[j] == inputValue[j]) {
                result[i] += 1;
            }
        }
    }
    let resultSearch = []
    for(let i = 0; i<=notes.length-1; i++) {
        if(result[i]> (inputValue.length)/100*60){ 
            resultSearch.push(notesStore[i]);
        }
    }
    return resultSearch;
}

let generateNotes = () => {
    notesBlock.innerHTML = null
    if (notesStore.length != 0) {
        notesStore.map((el, index) => {
            if(!el.statusDelete) {
                notesBlock.innerHTML += `
                    <div class="note" id = "note${index}" style = "background-color: ${el.color}">
                        <p class="noteText" id="noteText${index}">
                        ${el.text}</p>
                        <button class="noteEdit" id="btnEdite${index}">Edit</button>
                        <button class="noteDelete" id="btnDelete${index}">Delete</button>
                    </div>
                `
            } 
        })
        for(let i=0; i<=notesStore.length-1; i++){
            if(!notesStore[i].statusDelete) {
                notes[i] = document.querySelector(`#note${i}`);
                notes[i].addEventListener('click', (e)=>{
                    if(e.target.id == `btnDelete${i}`){
                        notesStore[i].statusDelete = true
                        generateNotes()
                    }
                    if(e.target.id == `btnEdite${i}`){
                        if(flag == 0){
                            document.querySelector(`#noteText${i}`).outerHTML = `
                            <textarea class="textarea"></textarea>
                            `
                            document.querySelector(`#btnEdite${i}`).textContent = 'Save';
                            flag = 1;
                        }
                        else if(flag == 1){
                            notesStore[i].text = document.querySelector('.textarea').value;
                            flag = 0;
                            generateNotes();
                        }
                    }
                    
                });
            }
        }
    }
}

let wereIsYouNow = setInterval(()=>{
    if(document.location.pathname == '/'){
        document.querySelector('#link2Main').style.color = 'red';
    }
    if(document.location.pathname == '/blog.html'){
        document.querySelector('#link2Blog').style.color = 'red';
    }
    if(document.location.pathname == '/about.html'){
        document.querySelector('#link2About').style.color = 'red';
    }
    if(document.location.pathname == '/advertising.html'){
        document.querySelector('#link2Advertising').style.color = 'red';
    }
},100);

console.log(document.querySelector('#link2Main').style);

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