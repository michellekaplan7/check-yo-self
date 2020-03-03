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

  // updateToDo() {
  //   this.urgent != this.urgent;
  // }

  updateTask(currentTaskId) {
    for (var i = 0; i < this.tasks.length; i++) {
      if (currentTaskId == this.tasks[i].id) {
        this.tasks[i].completed = !this.tasks[i].completed;
        this.saveToStorage();
      }
    }
  }
}
