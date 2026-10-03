import { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  const AllTodo = [
    {
      id: 1,
      task: "Learn",
      description: "You have to learn everyday new things",
      completed: false,
    },
    {
      id: 2,
      task: "Playing",
      description: "They are playing cricket",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(AllTodo);
  const [editValue, setEditValue] = useState(null);

  const handleAdd = (input) => {
    if (editValue) {
      setTodos(
        todos.map((todo) =>
          todo.id === editValue.id
            ? {
                ...todo,
                task: input.task,
                description: input.description,
              }
            : todo
        )
      );

      setEditValue(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          task: input.task,
          description: input.description,
          completed: false,
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditValue(todo);
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };


 const totaltask = todos.length;

const completedTask = todos.filter((t) => t.completed).length;

const pendingtask = totaltask - completedTask;

  return (
    <>
    <div className="container mt-4">
      <AddTodo
        handleAdd={handleAdd}
        editValue={editValue}
      />

      <ListTodo
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleComplete={handleComplete}
      />
    </div>

  <div className="container mt-4">
        <div className="row g-3">

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">
                  Total Tasks
                </h6>

                <h2 className="fw-bold">
                  {totaltask}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">
                  Completed
                </h6>

                <h2 className="fw-bold text-success">
                  {completedTask}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">
                  Pending
                </h6>

                <h2 className="fw-bold text-warning">
                  {pendingtask}
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>


    </>

    
  );
};

export default App;