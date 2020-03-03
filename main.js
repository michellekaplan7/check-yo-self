var taskItemPlaceholder = document.querySelector('.task-items-placeholder');
var addTaskButton = document.querySelector('.add-task-item-btn');
var taskItem = document.querySelector('.task-item-input-field');
var titleHolder = document.querySelector('.task-title-input-field');
var main = document.querySelector('.main-section');
var makeTaskListButton = document.querySelector('.make-task-list-btn');
var clearAllButton = document.querySelector('#clear-all-btn');
var card = document.querySelector('.main-section');
var toDoMessage = document.querySelector('.message');
var toDos = [];
var temporaryTasks = [];

addTaskButton.addEventListener('click', addTaskItem);
taskItemPlaceholder.addEventListener('click', removeTaskItem);
makeTaskListButton.addEventListener('click', createToDoList);
clearAllButton.addEventListener('click', clearInputs);
main.addEventListener('click', updateCard);
window.addEventListener('load', retrieveStorage);

function retrieveStorage() {
  var savedToDos = JSON.parse(localStorage.getItem('list'));
  if (savedToDos === null) {
    userMessage();
    return;
  }
  for (var i = 0; i < savedToDos.length; i++) {
    var toDoList = new ToDoList(savedToDos[i].id, savedToDos[i].title, savedToDos[i].tasks, savedToDos[i].urgent);
    toDos.push(toDoList);
  }
  displayToDoCardsFromStorage(toDos);
}

function displayToDoCardsFromStorage(toDos) {
  for (var i = 0; i < toDos.length; i++) {
    card.innerHTML +=
      `<section class="todo-card">
    <h3>${toDos[i].title}</h3>
    <hr>
    <div class="card-tasks" data-id=${toDos[i].id}></div>
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
    displayTasksFromStorage(toDos[i])
  }
}

function displayTasksFromStorage(toDo) {
  var insertTask = document.querySelector(`.card-tasks[data-id='${toDo.id}']`);
  var completedImage;
  for (var i = 0; i < toDo.tasks.length; i++) {
    if (toDo.tasks[i].completed === true) {
      completedImage = "assets/checkbox-active.svg";
    } else {
      completedImage = "assets/checkbox.svg";
    }
    insertTask.innerHTML += `
  <span class="task-item"><img class="checkbox checkbox${toDo.id}" data-id=${toDo.id} data-taskid=${toDo.tasks[i].id} src=${completedImage} />${toDo.tasks[i].taskName}</span>`
  }
}

function addTaskItem(event) {
  if (taskItem.value != "") {
    var task = new Task(taskItem.value);
    addTaskToTemporaryTasks(task);

    taskItemPlaceholder.insertAdjacentHTML('beforeend',
      `<p class="task" data-id='${task.id}'><img class="delete-icon" data-id='${task.id}' src="assets/delete.svg" /> ${task.taskName}</p>`);
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
  if (titleHolder.value && temporaryTasks.length > 0) {
    var toDoList = new ToDoList(Date.now(), titleHolder.value, temporaryTasks);
    toDos.push(toDoList);
    userMessage();
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
      <span class="task-item"><img class="checkbox checkbox${toDoList.id}" data-id=${toDoList.id} data-taskid=${toDoList.tasks[i].id} src="assets/checkbox.svg" />${toDoList.tasks[i].taskName}</span>`
    }
  }
  toDoList.saveToStorage();
  clearInputs();
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

function userMessage() {
  if (toDos.length === 0) {
    toDoMessage.classList.remove('hide');
  } else {
    toDoMessage.classList.add('hide');
  }
}

function updateCard() {
  var currentTaskId = event.target.dataset.taskid
  var checkTaskComplete = event.target;
  var currentList = event.target.closest(".card-tasks");
  var index;
  var taskCheckBox = event.target.closest(".task-item");
  if (checkTaskComplete.getAttribute('src') == "assets/checkbox.svg") {
    checkTaskComplete.src = "assets/checkbox-active.svg";
    taskCheckBox.classList.add("completed-task");
  } else {
    checkTaskComplete.src = "assets/checkbox.svg";
    taskCheckBox.classList.remove("completed-task");
  }
  for (var i = 0; i < toDos.length; i++) {
    if (currentList.dataset.id == toDos[i].id) {
      index = i;
      var currentListUpdate = toDos[i]
      currentListUpdate.updateTask(currentTaskId);
    }
  }
}
