const ListTodo = ({
  todos,
  handleDelete,
  handleEdit,
  handleComplete,
}) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0 ">My Todo List</h5>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-bordered table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Complete</th>
                <th>Task</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {todos.map((t, index) => (
                <tr key={t.id}>
                  <td>{index + 1}</td>

                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={t.completed}
                      onChange={() => handleComplete(t.id)}
                    />
                  </td>

                  <td>
                    <span
                      className={
                        t.completed
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }
                    >
                      {t.task}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        t.completed
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }
                    >
                      {t.description}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(t.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTodo;