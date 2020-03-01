class ToDoList {
  constructor(title, tasks) {
    this.id = Date.now();
    this.title = title
    this.tasks = tasks;
    this.urgent = false;
  }
  saveToStorage() {

  }
  deleteFromStorage() {

  }
  updateToDo() {
    //should update the todo's title and urgency
  }
  updateTask() {
    //should update a task's content and if it has been completed
  }
}


//Each todo list on the page should be created as an instance of the ToDoList class.
