import React, { useEffect, useState } from "react";


const AddTodo = ({ handleAdd, editValue }) => {
  const [input, setInput] = useState({
    task: "",
    description: "",
  });

  useEffect(() => {
    if (editValue) {
      setInput({
        task: editValue.task,
        description: editValue.description,
      });
    }
  }, [editValue]);

  const handleChange = (field, e) => {
    setInput((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAdd(input);

    if (!editValue) {
      setInput({
        task: "",
        description: "",
      });
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0 ">
          { "Add Todo"}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Task</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter task"
                value={input.task}
                onChange={(e) =>
                  handleChange("task", e)
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Description
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter description"
                value={input.description}
                onChange={(e) =>
                  handleChange("description", e)
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
          >
            {editValue ? "Update" : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;