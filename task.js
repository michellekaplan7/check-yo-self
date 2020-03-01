class Task {
  constructor(name) {
    this.taskName = name;
    this.completed = false;
    this.id = Date.now();
  }
}
