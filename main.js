//contains all DOM related JS
var taskItemPlaceholder = document.querySelector(".task-items-placeholder");
var addTaskButton = document.querySelector(".add-task-item-btn");
var taskItem = document.querySelector(".task-item-input-field");
var titleHolder = document.querySelector(".task-title-input-field");
var main = document.querySelector(".main-section");
var makeTaskListButton = document.querySelector(".make-task-list-btn");
var toDos = [];
var temporaryTasks = [];

addTaskButton.addEventListener('click', addTaskItem);
taskItemPlaceholder.addEventListener('click', removeTaskItem);
taskItem.addEventListener("keyup", handleDisableButton);
makeTaskListButton.addEventListener('click', createToDoList);

function addTaskItem() {
  var task = new Task(taskItem.value);
  addTaskToTemporaryTasks(task);

  taskItemPlaceholder.insertAdjacentHTML('beforeend',
    `<p class="task" data-id=${task.id}><img class="delete-icon" src="assets/delete.svg" /> ${task.taskName}</p>`);
}

function removeTaskItem(event) {
  if (event.target.className === "delete-icon") {
    var taskElement = event.target.closest(".task");
    var taskId = taskElement.dataset.id;

    taskElement.remove();
    removeTaskFromTemporaryTasks(taskId);
  }
}

function handleDisableButton() {
  if (taskItem.value === "") {
    addTaskButton.disabled = true;
  } else {
    addTaskButton.disabled = false;
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
  var toDoList = new ToDoList(title, temporaryTasks);
  console.log(toDoList);
  console.log(main);
  var card = document.createElement("section");
  card.innerHTML = `<section class="todo-card">
    <h3>${toDoList.title}</h3>
    <hr>
    <span class="task-item"><img class="checkbox" src="assets/checkbox.svg" />${temporaryTasks[i]}</span>
    <span class="task-item"><img class="checkbox" src="assets/checkbox.svg" />Task Item #2</span>
    <span class="task-item"><img class="checkbox" src="assets/checkbox.svg" />Task Item #3</span>
    <hr>
    <section class="todo-card-bottom">
    <div>
      <img class="todo-card-image" src="assets/urgent.svg" />
      <p>URGENT</p>
    </div>
    <div>
      <img class="todo-card-image" src="assets/delete.svg" />
      <p>DELETE</p>
    </div>
  </section>
  </section>`
  main.appendChild(card);
}
