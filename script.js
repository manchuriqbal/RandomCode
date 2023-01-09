// Finding Element 

const container = document.querySelector('.container');
const todoFrom = document.querySelector('#todo-from');
const inputTodo = document.querySelector('#inputTodo');
const addTodoButton = document.querySelector('#btn');
const todoLists = document.querySelector('#lists');
const messageElement = document.querySelector('#message');


// getTodosFromLocalStorage

const getTodosFromLocalStorage = () => {
    return localStorage.getItem('myTodos') ? JSON.parse(localStorage.getItem('myTodos')) : [];

}


// Show Message

const showMessage = (text, status) => {
    messageElement.innerHTML = text;
    messageElement.classList.add(`todo-${status}`);
    setTimeout(() =>{
        messageElement.innerHTML = '';
        messageElement.classList.remove(`todo-${status}`);
    }, 1500)

}

// createTodo

const createTodo = (todoId, todoValue) =>{

    const todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add('li-style');
    todoElement.innerHTML = `<span> ${todoValue}</span>
    <span> <button class="addTodoButton" id="deleteBtn"><i class="fa-solid fa-trash"></i></button> </span>`
    todoLists.appendChild(todoElement);

    const deleteBtn =  todoElement.querySelector('#deleteBtn');
    deleteBtn.addEventListener('click', deleteTodo);

}

// deleteTodo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage('Todo is Deleted', 'danger');

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem('myTodos', JSON.stringify(todos));

}


// add todo 
const addTodo =(event) => {
    const todoValue = inputTodo.value;
    event.preventDefault();
    


    // uniqe id 
    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage('Todo is success', 'success');

    // adding todo to localStorage 

    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem('myTodos', JSON.stringify(todos));

    inputTodo.value = '';

}


// loadTodos
const loadTodos = () => {
    let todos = getTodosFromLocalStorage();
    todos.map((todo)=> createTodo(todo.todoId, todo.todoValue));
}

// add event listeners 

todoFrom.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', loadTodos);



// step 1 : create html basis 
// step 2 : style html element  
// step 3 : finding element by DOM and add listeners 
// step 4 : add todo  
// step 5 : show message 
// step 6 : adding todos in localstorage  
// step 7 : delete todos 
// step 8 : read todos  




