let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskNameInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-button");
const taskList = document.querySelector(".todo__tasks-wrapper");

addTaskButton.addEventListener("click", addTaskHandler);

function createTask(taskName, isDone) {
  const div = document.createElement("div");
  div.classList.add("todo__task");
  div.innerHTML = `
            <div class="todo__content">
                <input class="todo__checkbox" id="task-checkbox" type="checkbox" ${
                  isDone ? "checked" : ""
                } onclick="completeTask(event)">
                <span class="todo__task-description ${
                  isDone ? "done" : ""
                }">${taskName}</span>
                <input class="todo__task-input hidden" id="task-input" type="text" value="${taskName}">
            </div>
            <div class="todo__buttons">
                <button class="todo__task-btn" id="correct-btn" onclick="toggleTaskInput(event)">
                    <img class="todo__img" src="img/pencil.png" alt="correction">
                </button>
                <button class="todo__task-btn hidden" id="apply-changes-btn" onclick="applyChanges(event)">
                    <img class="todo__img" src="img/check-mark.png" alt="correction">
                </button>
                <button class="todo__task-btn" onclick="deleteTask(event)">
                    <img class="todo__img" src="img/bin.png" alt="delete">
                </button>
            </div>
        `;
  return div;
}

function deleteTask(event) {
  const taskItem = event.target.closest(".todo__task");
  const taskDescription = taskItem.querySelector(
    ".todo__task-description"
  ).textContent;
  const updatedTasks = tasks.filter(
    (task) => task.taskName !== taskDescription
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  tasks = updatedTasks;
  displayTasks();
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
  if (
    tasks.some((task) => task.taskName.toLowerCase() == taskName.toLowerCase())
  ) {
    alert("Таке завдання вже є");
    return;
  }
  tasks.push({ taskName: taskName, isDone: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) =>
    taskList.append(createTask(task.taskName, task.isDone))
  );
}

function completeTask(event) {
  const taskItem = event.target.closest(".todo__task");
  const taskDescription = taskItem.querySelector(
    ".todo__task-description"
  ).textContent;

  const updatedTasks = tasks.map((task) => {
    if (task.taskName === taskDescription) {
      return { ...task, isDone: event.target.checked };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  tasks = updatedTasks;
  displayTasks();
}

displayTasks();

function toggleTaskInput(event) {
  const taskItem = event.target.closest(".todo__task");
  const correctBtn = taskItem.querySelector("#correct-btn");
  const applyChangesBtn = taskItem.querySelector("#apply-changes-btn");
  const taskDescription = taskItem.querySelector(".todo__task-description");
  const taskInput = taskItem.querySelector(".todo__task-input");

  taskDescription.classList.toggle("hidden");
  taskInput.classList.toggle("hidden");
  applyChangesBtn.classList.toggle("hidden");
  correctBtn.classList.toggle("hidden");
}

function applyChanges(event) {
  const taskItem = event.target.closest(".todo__task");
  const taskDescription = taskItem.querySelector(".todo__task-description");
  const taskInput = taskItem.querySelector(".todo__task-input");
  const updatedTasks = tasks.map((task) => {
    if (task.taskName === taskDescription.textContent) {
      return { ...task, taskName: taskInput.value };
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  tasks = updatedTasks;
  displayTasks();
}
