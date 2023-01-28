let notesBlock = document.querySelector('#notesBlock');
let btnCreate = document.querySelector('.btnCreate');

let notesStore = [
    {
        id:1,
        text:"Text"
    },
    {
        id:2,
        text:"Hello"
    }
]

let btnsDelete =[];

let generateNotes = () => {
    notesBlock.innerHTML = null
    if (notesStore.length != 0) {
        notesStore.map((el, index) => {
            notesBlock.innerHTML += `
                <div class="note">
                    <p class="noteText">${el.text}</p>
                </div>
            `
            btnsDelete.push(document.querySelector(`#btnDelete${el.id}`))
        })
    }
}

generateNotes(notesStore);

let createNote = () => {
    if (inputText.value.length != 0) {
        notesStore.push(
            {
                id: notesStore.length>0 ? notesStore[notesStore.length-1].id + 1 : 1,
                text: inputText.value
            }
        )
        inputText.value = '';
        generateNotes(notesStore);
    }
}

let deleteNote = () => {
    
    alert();
}

btnCreate.addEventListener('click', createNote);