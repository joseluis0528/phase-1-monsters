let currentPage = 1

document.addEventListener('DOMContentLoaded', () => {
    pageEventListener()
    getMonstersList(currentPage)
    handleSubmit()
    createForm()
})

function pageEventListener() {
    const nextPage = document.getElementById('forward')
    const previousPage = document.getElementById('back')

    nextPage.addEventListener('click', () => {
        if(currentPage < 20) {
            currentPage++
            getMonstersList(currentPage)
        } 
        else {
            alert('You have reached the last page!')
        }
    })
    previousPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--
            getMonstersList(currentPage)
        }
        else {
            alert('This is the first page!')
        }
    })
}

function getMonstersList(page) {
    document.getElementById('monster-container').innerHTML ="";
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(data => {
        for (monster in data) {
            renderMonsters(data[monster])
        }
    })
}

function createForm() {
    const getForm = document.getElementById('create-monster')
    const form = document.createElement('form')
    
    const nameField = document.createElement('input')
    nameField.type = 'text'
    nameField.id = 'monsterName'
    nameField.placeholder = 'Name...'
    
    const ageField = document.createElement('input')
    ageField.type = 'text'
    ageField.id = 'monsterAge'
    ageField.placeholder = 'Age...'
    
    const descriptionField = document.createElement('input')
    descriptionField.type = 'text'
    descriptionField.id = 'monsterDescription'
    descriptionField.placeholder = 'Description...'

    const createButton = document.createElement('button')
    createButton.innerText = 'Create Monster'
    createButton.type = 'submit'
    createButton.form = 'createMonster'

    getForm.append(form)
    form.append(nameField, ageField, descriptionField, createButton)
}

// function createMonster(monsterName, monsterAge, monsterDescription) {
    
//     const newMonster = {
//         name: `${monsterName}`,
//         age: `${monsterAge}`,
//         description: `${monsterDescription}`,
//     }
    
//     const newMonsterList = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Acceptt: 'application/json'
//         },
//         body: JSON.stringify(newMonster)
//     }

//     fetch('http://localhost:3000/monsters')
//     .then(response => response.json)
//     .then(response => console.log(response))
// }

function handleSubmit() {
    const createMonster = document.getElementById('create-monster')
    createMonster.addEventListener('submit', (e) => {
        e.preventDefault()
        
        let submitMonster = {}
        submitMonster.name = e.target.monsterName.value
        submitMonster.age = e.target.monsterAge.value
        submitMonster.description = e.target.monsterDescription.value
        renderMonsters(submitMonster, 'top')
    })
}

function renderMonsters(monster, position='bottom') {
    const monsterContainer = document.getElementById('monster-container')
    
    const monsterName = document.createElement('h1')
    monsterName.innerText = monster.name

    const monsterAge = document.createElement('p')
    monsterAge.innerText = `Age: ${monster.age}`
    
    const monsterDescription = document.createElement('p')
    monsterDescription.innerText = `Description: ${monster.description}`

    if(position === 'top') {
        monsterContainer.prepend(monsterName, monsterAge, monsterDescription)
    }
    else if(position === 'bottom') {
        monsterContainer.append(monsterName, monsterAge, monsterDescription)
    }
}