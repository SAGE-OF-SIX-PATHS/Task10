"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
class TodoList {
    todos = [];
    nextId = 1;
    filePath = "todos.json";
    constructor() {
        this.loadTodos();
    }
    saveTodos() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.todos, null, 2));
    }
    loadTodos() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, "utf-8");
            this.todos = JSON.parse(data);
            this.nextId = this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1;
        }
    }
    addTodo(task) {
        const newTodo = {
            id: this.nextId++,
            task,
            completed: false,
        };
        this.todos.push(newTodo);
        this.saveTodos();
    }
    completeTodo(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = true;
            this.saveTodos();
        }
    }
    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.saveTodos();
    }
    listTodos() {
        console.log("\nYour To-Do List:");
        this.todos.forEach((todo) => {
            console.log(`${todo.id}. [${todo.completed ? "✔" : "✖"}] ${todo.task}`);
        });
    }
    filterByStatus(completed) {
        const filteredTodos = this.todos.filter((todo) => todo.completed === completed);
        console.log(`\n${completed ? "Completed" : "Pending"} Tasks:`);
        filteredTodos.forEach((todo) => console.log(`${todo.id}. ${todo.task}`));
    }
    updateTaskDescription(id, newTask) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.task = newTask;
            this.saveTodos();
        }
    }
    clearCompleted() {
        this.todos = this.todos.filter((todo) => !todo.completed);
        this.saveTodos();
    }
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const todoList = new TodoList();
function showMenu() {
    console.log("\nTo-Do List CLI");
    console.log("1. Add a new Task");
    console.log("2. View All Tasks");
    console.log("3. Mark Task as Completed");
    console.log("4. Remove Task from Todo");
    console.log("5. Filter by Completed/Pending");
    console.log("6. Update Task Description");
    console.log("7. Clear Completed Tasks");
    console.log("8. Exit");
    rl.question("\nChoose an option: ", (option) => {
        switch (option.trim()) {
            case "1":
                rl.question("Enter task description: ", (task) => {
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
                rl.question("Enter task ID to mark as completed: ", (id) => {
                    todoList.completeTodo(parseInt(id));
                    console.log("Task marked as completed!");
                    showMenu();
                });
                break;
            case "4":
                rl.question("Enter task ID to remove: ", (id) => {
                    todoList.removeTodo(parseInt(id));
                    console.log("Task removed successfully!");
                    showMenu();
                });
                break;
            case "5":
                rl.question("Filter by (completed: yes / no): ", (input) => {
                    const completed = input.trim().toLowerCase() === "yes";
                    todoList.filterByStatus(completed);
                    showMenu();
                });
                break;
            case "6":
                rl.question("Enter task ID to update: ", (id) => {
                    rl.question("Enter new task description: ", (newTask) => {
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
//# sourceMappingURL=index.js.map