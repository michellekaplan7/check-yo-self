class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title
    this.tasks = tasks;
    this.urgent = false;
  }
  saveToStorage() {
    localStorage.setItem('list', JSON.stringify(toDos));
  }

  // deleteFromStorage() {
  //   localStorage.removeItem('list');
  // }

  updateToDo() {
    this.urgent != this.urgent;
    //should update the todo's title and urgency
  }
  updateTask() {
    //should update a task's content and if it has been completed
  }
}
