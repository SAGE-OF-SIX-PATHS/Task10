//interface type
interface TodoItem {
          id: number;
          task: string;
          completed: boolean;
          dueDate: Date | null;
}

class TodoList {
          private todos: TodoItem[] = [];
          private nextId: number = 1;

          addTodo(task: string, dueDate: Date | null = null): void {
                    const newTodo: TodoItem = {
                              id: this.nextId++,
                              task,
                              completed: false,
                              dueDate
                    };
                    this.todos.push(newTodo);
          }

          completeTodo(id: number): void {
                    const todoIndex = this.todos.findIndex(todo => todo.id === id);
                    if (todoIndex !== -1) {
                              this.todos[todoIndex].completed = true;
                    }
          }

          removeTodo(id: number): void {
                    this.todos = this.todos.filter(todo => todo.id !== id);
          }

          listTodos(): TodoItem[] {
                    return [...this.todos];
          }

          // Method to filter todos by completed status
          filterByStatus(completed: boolean): TodoItem[] {
                    return this.todos.filter(todo => todo.completed === completed);
          }

          // Method to update the task description
          updateTaskDescription(id: number, newTask: string): void {
                    const todoIndex = this.todos.findIndex(todo => todo.id === id);
                    if (todoIndex !== -1) {
                              this.todos[todoIndex].task = newTask;
                    }
          }

          // Method to clear all completed todos
          clearCompleted(): void {
                    this.todos = this.todos.filter(todo => !todo.completed);
          }

          // Method to update the due date
          updateDueDate(id: number, newDueDate: Date | null): void {
                    const todoIndex = this.todos.findIndex(todo => todo.id === id);
                    if (todoIndex !== -1) {
                              this.todos[todoIndex].dueDate = newDueDate;
                    }
          }
}