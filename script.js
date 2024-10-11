const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskNameInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-button");
const taskList = document.querySelector(".todo__tasks-wrapper")

addTaskButton.addEventListener("click", addTaskHandler);

function createTask(text) {
    const div = document.createElement("div");
    div.classList.add("todo__task");
    div.innerHTML = `
            <span class="todo__task-description">${text}</span>
            <div class="todo__buttons">
                <button class="todo__task-btn">
                    <img class="todo__img" src="img/pencil.png" alt="correction">
                </button>
                <button class="todo__task-btn" onclick="deleteTask(event)">
                    <img class="todo__img" src="img/bin.png" alt="delete">
                </button>
            </div>
        `
    return div;
}

function deleteTask(event) {
    const taskItem = event.target.closest(".todo__task");
    if (taskItem) {
        taskItem.remove();
    }
}

function addTaskHandler() {
    if (taskNameInput.value) {
        addTaskToLocalStorage(taskNameInput.value); 
        displayTasks();
        taskNameInput.value = "";
    } else { 
        alert("Введіть ім'я задачі");
    }
}

function addTaskToLocalStorage(taskName) {
    tasks.push(taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach(element => {
        const newTask = createTask(element);
        taskList.append(newTask);
    })
}

displayTasks();