// Seleção de elementos
// const todoForm = document.querySelector('todo__form') 
const todoForm = document.getElementById('todo__form');
const todoInput = document.getElementById('todo__input');
const todoList  = document.querySelector('.todo__list');
const editFrom = document.getElementById('edit__form');
const editInput = document.getElementById('edite__input');
const cancelEditBtn = document.getElementById('cancel__edit_btn');

let oldInputValue;

// Funcões
const salvaTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("finish__todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
   
    const editBtn = document.createElement('button');
    editBtn.classList.add("edit__todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)
   
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("remove__todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

const toggleForm = () => {
    editFrom.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })

}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        salvaTodo(inputValue);
    }
});

document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest('div') //selecionou o elemento pai mais proximo, nesse caso a div
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText
    }

    if(targetEl.classList.contains("finish__todo")) {
        parentEl.classList.toggle('done');
    }
    
    if(targetEl.classList.contains("remove__todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit__todo")) {
        toggleForm();
        editInput.value = todoTitle;
        oldInputValue = todoTitle
    }

})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForm();
});

editFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForm();

})