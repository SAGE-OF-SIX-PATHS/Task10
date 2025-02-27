"use strict";
class TodoList {
    todos = [];
    nextId = 1;
    addTodo(task) {
        const newTodo = {
            id: this.nextId++,
            task,
            completed: false
        };
        this.todos.push(newTodo);
    }
    completeTodo(id) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            this.todos[todoIndex].completed = true;
        }
    }
    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    listTodos() {
        return [...this.todos];
    }
}
//# sourceMappingURL=index.js.map