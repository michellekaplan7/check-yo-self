//contains all DOM related JS
var taskItemPlaceholder = document.querySelector(".task-items-placeholder");
var addTaskButton = document.querySelector(".add-task-item-btn");
var taskItem = document.querySelector(".task-item-input-field");
var titleHolder = document.querySelector(".task-title-input-field");
var main = document.querySelector(".main-section");
var makeTaskListButton = document.querySelector(".make-task-list-btn");
var clearAllButton = document.querySelector("#clear-all-btn");
var toDos = [];
var temporaryTasks = [];

addTaskButton.addEventListener('click', addTaskItem);
taskItemPlaceholder.addEventListener('click', removeTaskItem);
makeTaskListButton.addEventListener('click', createToDoList);
clearAllButton.addEventListener('click', clearInputs);

function addTaskItem(event) {
  console.log(event);
  if (taskItem.value != "") {
  var task = new Task(taskItem.value);
  addTaskToTemporaryTasks(task);

  taskItemPlaceholder.insertAdjacentHTML('beforeend',
    `<p class="task" data-id=${task.id}><img class="delete-icon" src="assets/delete.svg" /> ${task.taskName}</p>`);
  taskItem.value = '';
  }
}

function removeTaskItem(event) {
  if (event.target.className === "delete-icon") {
    var taskElement = event.target.closest(".task");
    var taskId = taskElement.dataset.id;

    taskElement.remove();
    removeTaskFromTemporaryTasks(taskId);
  }
}

function addTaskToTemporaryTasks(task) {
  temporaryTasks.push(task);
}

function removeTaskFromTemporaryTasks(taskId) {
  var formattedTaskId = parseInt(taskId);
  for (var i = 0; i < temporaryTasks.length; i++) {
    var currentTask = temporaryTasks[i]
    if (currentTask.id === formattedTaskId) {
      temporaryTasks.splice(i, 1);
      break;
    }
  }
}

function createToDoList() {
  var title = titleHolder.value;
  if (title && temporaryTasks.length > 0) {
    var toDoList = new ToDoList(title, temporaryTasks);
    toDos.push(toDoList);
    console.log(toDos);
    // console.log(toDoList);
    // console.log(main);
    var card = document.querySelector(".main-section");
    card.innerHTML +=
        `<section class="todo-card">
          <h3>${toDoList.title}</h3>
            <hr>
            <div class="card-tasks" data-id=${toDoList.id}></div>
            <hr>
          <section class="todo-card-bottom">
          <div>
          <img class="todo-card-image" src="assets/urgent.svg">
          <p class="card-text-bottom">Urgent</p>
          </div>
          <div>
          <img class="todo-card-image" src="assets/delete.svg">
          <p class="card-text-bottom">Delete</p>
          </div>
          </section>
          </section>`

    var insertTask = document.querySelector(`.card-tasks[data-id='${toDoList.id}']`);

    for (var i = 0; i < toDoList.tasks.length; i++) {
      insertTask.innerHTML += `
      <span class="task-item"><img class="checkbox" src="assets/checkbox.svg" />${toDoList.tasks[i].taskName}</span>`
    }
  }
  clearInputs();
  // messageOnPage();
}

function clearInputs() {
  if (taskItem.value === '' && titleHolder.value === '') {
    return
  } else {
    taskItem.value = '';
    titleHolder.value = '';
    taskItemPlaceholder.innerHTML = ``;
    temporaryTasks = [];
  }
}

// function messageOnPage() {
//   var message = document.querySelector(".message");
//   if (toDos.length > 0) {
//     message.classList.remove(message);
//   }
// }
