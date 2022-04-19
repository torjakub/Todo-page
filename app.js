//Selectors
const todoInput = document.querySelector('.todoInput');
const todoList = document.querySelector('.todoList');
const todoButton = document.querySelector('.todoButton');
const todoSelect = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded',getLocaly)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
todoSelect.addEventListener('click',selectTodo);



//funcs
function addTodo(event){

    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    //
    saveLocaly(todoInput.value);

    //complete button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completedBtn');
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add('deletedBtn');
    todoDiv.appendChild(deleteButton);

    //Append to list
    todoList.appendChild(todoDiv);
    //reset
    todoInput.value="";
}

function deleteCheck(event){

    const item = event.target;

    if(item.classList[0]=== 'deletedBtn'){
        const todo = item.parentElement;
        removeLocaly(todo);
        todo.classList.add('deleteanim');
        todo.addEventListener('transitionend',function(){
            todo.remove()
        });
        
    }

    if(item.classList[0]=== 'completedBtn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}
function selectTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

function saveLocaly(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getLocaly(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);

        //complete button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completedBtn');
        todoDiv.appendChild(completedButton);

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('deletedBtn');
        todoDiv.appendChild(deleteButton);

        //Append to list
        todoList.appendChild(todoDiv);

    });

    
}
function removeLocaly(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const tdIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(tdIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));

}