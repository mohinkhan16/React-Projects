# Todo Application

A simple and responsive Todo Application built with **React.js** and **Bootstrap**.
This project allows users to add, edit, delete, and complete tasks while displaying real-time task statistics.

# Live Link
https://clever-parfait-54d492.netlify.app/

## Features

* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Display total task count
* Display completed task count
* Display pending task count
* Responsive UI using Bootstrap
* Simple and clean user interface

## Technologies Used

* React.js
* JavaScript
* Bootstrap
* Vite
* React Hooks

## React Concepts Used

* `useState`
* `useEffect`
* Props
* Components
* Event Handling
* Conditional Rendering
* Array Methods such as `map()`, `filter()`, and `find()`

## Project Structure

```text
src/
├── components/
│   ├── AddTodo.jsx
│   └── ListTodo.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Go to the project folder:

```bash
cd todo-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will run on the local Vite development server.

## Task Statistics

The dashboard displays:

* **Total Tasks** — Total number of tasks
* **Completed** — Number of completed tasks
* **Pending** — Number of incomplete tasks

The counts update automatically whenever a task is added, deleted, edited, or completed.

## Example

```text
Total Tasks: 5
Completed:   2
Pending:     3
```

## Main Functionality

### Add Todo

Users can enter a task and description and add it to the Todo list.

### Edit Todo

Users can edit an existing task and update its task name and description.

### Delete Todo

Users can remove a task from the Todo list.

### Complete Todo

Users can mark a task as completed or pending.

### Task Count

The application calculates task statistics using JavaScript array methods:

```js
const totalTask = todos.length;

const completedTask = todos.filter(
  (todo) => todo.completed
).length;

const pendingTask = totalTask - completedTask;
```

## Future Improvements

* Local Storage
* Search functionality
* Filter by Completed/Pending
* Dark Mode
* Task due dates
* Task priority
* Backend integration
* User authentication

## Author

**Mohin Pathan**

## License

This project is created for learning and educational purposes.
