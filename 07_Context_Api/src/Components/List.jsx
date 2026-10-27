
import { useContext, useMemo, useState } from "react";
import { expenseContext } from "../Context/ExpensesContext.jsx";

const List = () => {
  const { expenseList, handleDelete, handleEdit } =
    useContext(expenseContext);

  const [expenseQuery, setExpenseQuery] = useState({
    Title: "",
    Category: "all",
    Type: "all",
    sortBy: "all",
  });

  const handleChange = (field, value) => {
    setExpenseQuery((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setExpenseQuery({
      Title: "",
      Type: "all",
      Category: "all",
      sortBy: "all",
    });
  };

  const filterList = useMemo(() => {
    const list = expenseList.filter((expense) => {
      const title = String(expense.Title || "");

      const matchesTitle = title
        .toLowerCase()
        .includes(expenseQuery.Title.toLowerCase());

      const matchesType =
        expenseQuery.Type === "all" ||
        expense.Type.toLowerCase() === expenseQuery.Type.toLowerCase();

      const matchesCategory =
        expenseQuery.Category === "all" ||
        expense.Category === expenseQuery.Category;

      return matchesTitle && matchesType && matchesCategory;
    });

    switch (expenseQuery.sortBy) {
      case "asc":
        list.sort((a, b) =>
          String(a.Title).localeCompare(String(b.Title))
        );
        break;

      case "desc":
        list.sort((a, b) =>
          String(b.Title).localeCompare(String(a.Title))
        );
        break;

      case "moneyAsc":
        list.sort((a, b) => Number(a.Amount) - Number(b.Amount));
        break;

      case "moneyDesc":
        list.sort((a, b) => Number(b.Amount) - Number(a.Amount));
        break;

      default:
        break;
    }

    return list;
  }, [expenseList, expenseQuery]);

  return (
    <div className="container my-4">
      <div className="card p-3 shadow-sm">
        <h4 className="mb-3">Search Expenses</h4>

        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter title"
              value={expenseQuery.Title}
              onChange={(e) => handleChange("Title", e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={expenseQuery.Type}
              onChange={(e) => handleChange("Type", e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={expenseQuery.Category}
              onChange={(e) =>
                handleChange("Category", e.target.value)
              }
            >
              <option value="all">All Categories</option>
              <option value="Money Transfer">Money Transfer</option>
              <option value="Cash Withdrawal">Cash Withdrawal</option>
              <option value="General Expense">General Expense</option>
              <option value="Food">Food</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={expenseQuery.sortBy}
              onChange={(e) => handleChange("sortBy", e.target.value)}
            >
              <option value="all">Default</option>
              <option value="asc">Title A-Z</option>
              <option value="desc">Title Z-A</option>
              <option value="moneyAsc">Amount Low-High</option>
              <option value="moneyDesc">Amount High-Low</option>
            </select>
          </div>

          <div className="col-md-2">
              
          </div>
        </div>
      </div>

      <h4 className="mt-4 mb-3">Expense List</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterList.map((expense, index) => (
              <tr key={expense.id}>
                <td>{index + 1}</td>
                <td>{expense.Title}</td>
                <td>{expense.Description}</td>
                <td>{expense.Category}</td>
                <td>₹{Number(expense.Amount).toLocaleString("en-IN")}</td>
                <td>{expense.Date}</td>
                <td>
                  <span
                    className={` ${
                      expense.Type.toLowerCase() === "credit"
                        
                    }`}
                  >
                    {expense.Type}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-2 mb-1"
                    onClick={() => handleEdit(expense.id)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm mb-1"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filterList.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
