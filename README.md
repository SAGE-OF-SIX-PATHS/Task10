<h1 align="center">Intro to TypeScript </h1>

## Introduction
This project is a simple To-Do List Command-Line Interface (CLI) Application** built using TypeScript. It allows users to add, complete, delete, and list tasks, ensuring that tasks persist across multiple runs by saving them in a JSON file.

I employed the following approach:
- Setting up my TypeScript project.
- Working with readline for user input.
- Read and write data to a JSON file (For storage basically).
- I implemented object-oriented programming (OOP) principles in TypeScript.

## 1.0  Steps to Build the To-Do List CLI App:

### 1.1 Set Up the TypeScript Project
Start by initializing a Node.js project and setting up TypeScript.
Initialize TypeScript

### 1.2 Install Required Dependencies
We'll use `readline` for user input and `fs` for file handling.

### 1.3 Create the TypeScript Files
Inside the project folder, create a `src` directory and add an `index.ts` file.

### 1.4 Define the To-Do Interface and Class
Create an interface `TodoItem` that defines the structure of a task. Then, implement a `TodoList` class that handles task operations.

### 1.5 Implement the To-Do List Class
I primarily created the To-Do List Class for implementing these methods:
- Load and Save Tasks: Reads and writes tasks to `tasks.json`.
- Add Task: Adds a new task with a unique ID.
- Complete Task: Marks a task as completed.
- Delete TasK: Removes a task.
- List Tasks: Displays all tasks.
- Filter Tasks: Filters tasks by completion status.
- Update Tasks: Modifies the task description or due date.

### 1.6 Create a CLI Menu
Use `readline` to prompt users for input.
A loop is used to display options and handle user choices dynamically.

### 1.7 Compile and Run the App

## 2.0  Requirements and Imports Used:
### 2.1  typescript
### 2.2 `readline` – for handling user input in the terminal.
### 2.3 `fs` – for reading and writing data to a JSON file.

## 3.0 Interface for this Task:
typescript
interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

## Conclusion
I used this TypeScript To-Do List CLI App to demonstrate how to build a command-line application using TypeScript. 