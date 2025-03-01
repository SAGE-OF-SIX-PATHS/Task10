import * as fs from "fs";
import * as readline from "readline";

interface TodoItem {
          id: number;
          task: string;
          completed: boolean;
}

class TodoList {
          private todos: TodoItem[] = [];
          private nextId: number = 1;
          private filePath: string = "todos.json";

          constructor() {
                    this.loadTodos();
          }

          private saveTodos(): void {
                    fs.writeFileSync(this.filePath, JSON.stringify(this.todos, null, 2));
          }

          private loadTodos(): void {
                    if (fs.existsSync(this.filePath)) {
                              const data = fs.readFileSync(this.filePath, "utf-8");
                              this.todos = JSON.parse(data);
                              this.nextId = this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1;
                    }
          }

          addTodo(task: string): void {
                    const newTodo: TodoItem = {
                              id: this.nextId++,
                              task,
                              completed: false,
                    };
                    this.todos.push(newTodo);
                    this.saveTodos();
          }

          completeTodo(id: number): void {
                    const todo = this.todos.find((todo) => todo.id === id);
                    if (todo) {
                              todo.completed = true;
                              this.saveTodos();
                    }
          }

          removeTodo(id: number): void {
                    this.todos = this.todos.filter((todo) => todo.id !== id);
                    this.saveTodos();
          }

          listTodos(): void {
                    console.log("\nYour To-Do List:");
                    this.todos.forEach((todo) => {
                              console.log(`${todo.id}. [${todo.completed ? "✔" : "✖"}] ${todo.task}`);
                    });
          }

          filterByStatus(completed: boolean): void {
                    const filteredTodos = this.todos.filter((todo) => todo.completed === completed);
                    console.log(`\n${completed ? "Completed" : "Pending"} Tasks:`);
                    filteredTodos.forEach((todo) => console.log(`${todo.id}. ${todo.task}`));
          }

          updateTaskDescription(id: number, newTask: string): void {
                    const todo = this.todos.find((todo) => todo.id === id);
                    if (todo) {
                              todo.task = newTask;
                              this.saveTodos();
                    }
          }

          clearCompleted(): void {
                    this.todos = this.todos.filter((todo) => !todo.completed);
                    this.saveTodos();
          }
}

const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
});

const todoList = new TodoList();

function showMenu(): void {
          console.log("\nTo-Do List CLI");
          console.log("1. Add Task");
          console.log("2. View All Tasks");
          console.log("3. Mark Task as Completed");
          console.log("4. Remove Task");
          console.log("5. Filter by Completed/Pending");
          console.log("6. Update Task Description");
          console.log("7. Clear Completed Tasks");
          console.log("8. Exit");

          rl.question("\nChoose an option: ", (option: string) => {
                    switch (option.trim()) {
                              case "1":
                                        rl.question("Enter task description: ", (task: string) => {
                                                  todoList.addTodo(task);
                                                  console.log("Task added successfully!");
                                                  showMenu();
                                        });
                                        break;

                              case "2":
                                        todoList.listTodos();
                                        showMenu();
                                        break;

                              case "3":
                                        rl.question("Enter task ID to mark as completed: ", (id: string) => {
                                                  todoList.completeTodo(parseInt(id));
                                                  console.log("Task marked as completed!");
                                                  showMenu();
                                        });
                                        break;

                              case "4":
                                        rl.question("Enter task ID to remove: ", (id: string) => {
                                                  todoList.removeTodo(parseInt(id));
                                                  console.log("Task removed successfully!");
                                                  showMenu();
                                        });
                                        break;

                              case "5":
                                        rl.question("Filter by (completed: yes / no): ", (input: string) => {
                                                  const completed = input.trim().toLowerCase() === "yes";
                                                  todoList.filterByStatus(completed);
                                                  showMenu();
                                        });
                                        break;

                              case "6":
                                        rl.question("Enter task ID to update: ", (id: string) => {
                                                  rl.question("Enter new task description: ", (newTask: string) => {
                                                            todoList.updateTaskDescription(parseInt(id), newTask);
                                                            console.log("Task updated successfully!");
                                                            showMenu();
                                                  });
                                        });
                                        break;

                              case "7":
                                        todoList.clearCompleted();
                                        console.log("Completed tasks cleared!");
                                        showMenu();
                                        break;

                              case "8":
                                        console.log("Goodbye!");
                                        rl.close();
                                        break;

                              default:
                                        console.log("Invalid option, please try again.");
                                        showMenu();
                    }
          });
}

showMenu();
