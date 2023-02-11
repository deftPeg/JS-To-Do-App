// declare variables
const taskInput = document.querySelector('.task-input input'),
    filterMenu = document.querySelectorAll('.filters span'),
    clearAll = document.querySelector('.clear-btn'),
    taskBox = document.querySelector('.task-box');

// declare edit state as false
let editId, isEditTask = false;

// get todo items from local storage
todos = JSON.parse(localStorage.getItem('todo-list'));

// make filter tab active or not
filterMenu.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showTodo(btn.id)
    }) 
})
// showTodo('all');

const showTodo = (filter) => {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) =>{
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += <li class="task">
                    <label for='${id}'>
                        <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class = "${completed}">${todo.name}</p>
                        
                    </label>
                            <div class="settings">
                                <i class="bi bi-gear-fill" onclick = "showMenu(this)"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}),"${todo.name}")'><i class="bi bi-pencil-square"></i>Edit</li>
                                    <li onclick='deleteTask(${id}),"${filter}")'><i class="bi bi-trash-fill"></i>Delete</li>
                                </ul>
                        </div>
                </li>;
            }
        })
    }
    taskBox.innerHTML = liTag || '<span>You do not have any tasks here</span>';
    let checkTask = taskBox.querySelectorAll|('.task');
    !checkTask.length 
        ? clearAll.classList.remove('active') 
        : clearAll.classList.add('active');
    taskBox.offsetHeight >= 300
        ? taskBox.classList.add('overflow')
        : taskBox.classList.remove('overflow')
}
showTodo('all');

// function to show menu
const showMenu = (selectedTask) => {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add('show');
    document.addEventListener('click' , (e) => {
        if(e.target.tagName != "I" || e.target != selectedTask ){
            menuDiv.classList.remove("show")
        }
    })
}

// function to update status
const updateStatus=(selectedTask) => {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

// function to edit task
const editTask = (taskID, textName) => {
    editId = taskID;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

// function to delete list from todo
const deleteTask = (deleteId, filter) => {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showTodo(filter)
}

// function to clear all
clearAll.addEventListener('click', () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showTodo();
})


taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditTask){
            todos = !todos ? [] : todos;
            let infoTask = {name: userTask, status:"pending"};
            todos.push(infoTask)
        }else {
            isEditTask=false;
            todos[editId].name = userTask
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id)
    }
})