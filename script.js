let taskNameInput = document.querySelector("#todo-input");
let addTaskButton = document.querySelector("#add-button");
let taskList = document.querySelector(".todo__tasks-wrapper")

addTaskButton.addEventListener("click", addTaskHandler);

function createTask(text) {
    let div = document.createElement("div");
    div.classList.add("todo__task");
    div.innerHTML = `
            <span class="todo__task-description">${text}</span>
            <div class="todo__buttons">
                <button class="todo__task-btn">
                    <img class="todo__img" src="img/pencil.png" alt="correction">
                </button>
                <button class="todo__task-btn" onclick="deletetask(event)">
                    <img class="todo__img" src="img/bin.png" alt="delete">
                </button>
            </div>
        `
    return div;
}

function deletetask(event) {
    event.target.parentElement.parentElement.parentElement.remove();
}

function addTaskHandler() {
    if (taskNameInput.value) {
        let newTask = createTask(taskNameInput.value);
        taskList.append(newTask);
        taskNameInput.value = "";
    } else { 
        alert("Введіть ім'я задачі");
    }
}