let notesBlock = document.querySelector('#notesBlock');
let btnCreate = document.querySelector('.btnCreate');
let inputColor = document.querySelector('#inputColor');
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
                
                console.log(flag);
                
                if(flag == 0) {
                document.querySelector(`#noteText${i}`).outerHTML = `
                <textarea class = "textarea" id = "textarea${i}" placeholder = "Введите текст"></textarea>
                `
                btnsEdit[i].textContent = 'OK'
                flag = 1;
                
                }
                else if (flag == 1) {
                    notesStore.map((el, index) => {
                        if(index == i){
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

btnCreate.addEventListener('click', createNote);