
const inputArea = document.querySelector('.todo-header__input-area');
const btnAdd = document.querySelector('.todo-header___input-add');


const listActive = document.querySelector('.todo__list-active');
const listReadyInner = document.querySelector('.todo__list-ready-inner');
const listReady = document.querySelector('.todo__list-ready');

const readeButtonMore =  document.querySelector('.todo__list-ready-title');
const readyButtonDel = document.querySelector('.todo__list-ready-del-item');

let tasksAdd = [];
let tasksDell = [];

if(localStorage.getItem('tasksAdd')){
    tasksAdd = JSON.parse(localStorage.getItem('tasksAdd'));
    
    tasksAdd.forEach(function(task){
        let temlateTask = `<li id="${task.id}" class="todo__list-item todo__list-active-item">
        <button class="todo__list-item-btn todo__list-active-btn" data-btn="done"></button>
        <p class="todo__list-active-text">${task.text}</p> 
        </li>
        `;
    
        listActive.insertAdjacentHTML('afterbegin', temlateTask)
    })
    
}
if(localStorage.getItem('tasksDell')){
    tasksDell = JSON.parse(localStorage.getItem('tasksDell'))

    tasksDell.forEach(function(task){
    
        let temlateTask = `<li id="${task.id}" class="todo__list-item todo__list-ready-item">
        <span class="todo__list-item-btn todo__list-ready-btn"></span>
        <p class="todo__list-ready-text">${task.text}</p> 
        </li>
        `;
    
        listReady.insertAdjacentHTML('afterbegin', temlateTask);
    })
}


    
    
    
    







btnAdd.addEventListener('click', addingTask);
listActive.addEventListener('click', delActiveTaskAddReadyTask)
inputArea.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        addingTask()
    }
})



function addingTask(){
    let inputAreaText = inputArea.value;
    if(inputAreaText === ''){
        return
    }
    const newTask =  {
        id: Date.now(),
        text: inputAreaText,
    }

    tasksAdd.push(newTask)

    let temlateTask = `<li id="${newTask.id}" class="todo__list-item todo__list-active-item">
    <button class="todo__list-item-btn todo__list-active-btn" data-btn="done"></button>
    <p class="todo__list-active-text">${newTask.text}</p> 
    </li>
    `;

    listActive.insertAdjacentHTML("afterbegin", temlateTask)


    inputArea.value = '';
    inputArea.focus();
    
    saveToLocalStorageAdd()
    
}




function delActiveTaskAddReadyTask(event){
    let currentEl = event.target;
    
    if(!currentEl.classList.contains('todo__list-active-btn')){
        return
    }
    
    let parentNode = currentEl.closest('.todo__list-active-item');

    let currentTextContent = parentNode.querySelector('p').innerText;
    let currentItemId = parentNode.id;
    const dellTasks = {
        id: currentItemId,
        text: currentTextContent,
        dell: true
    }

    tasksDell.push(dellTasks)
    console.log(tasksAdd)
    const index = tasksAdd.findIndex(function(task){
        if(task.id === Number(currentItemId)){
            return true
        }
    })
    
    tasksAdd.splice(index, 1)


    let temlateTask = `<li  class="todo__list-item todo__list-ready-item">
    <span class="todo__list-item-btn todo__list-ready-btn"></span>
    <p class="todo__list-ready-text">${dellTasks.text}</p> 
    </li>
    `;

    listReady.insertAdjacentHTML('afterbegin', temlateTask);

 
    parentNode.remove()

    if(listActive.children.length === 0){
        listActive.classList.remove('--active')
    }
    saveToLocalStorageAdd()
    saveToLocalStorageDell()
}



readeButtonMore.addEventListener('click', function(){
    if(listReady.children.length === 0){
        return
    }
    listReadyInner.classList.toggle('--active')
})





readyButtonDel.addEventListener('click', function(){
    if(listReady.children.length > 0){
        listReady.innerHTML = "";
        if(tasksDell.length > 0){
            tasksDell = [];
        }
        listReadyInner.classList.remove('--active')
        saveToLocalStorageDell()
    }
    return
})






function saveToLocalStorageAdd(){
    localStorage.setItem('tasksAdd', JSON.stringify(tasksAdd))
}
function saveToLocalStorageDell(){
    localStorage.setItem('tasksDell', JSON.stringify(tasksDell))
}
