
import { useEffect, useState } from "react";
import { useExpense } from "../Context/ExpensesContext.jsx";

const initialForm = {
  Title: "",
  Description: "",
  Amount: "",
  Date: "",
  Category: "",
  Type: "Debit",
};

function Add() {
  const { handleAdd, editVal, clearEdit } = useExpense();

  const [input, setInput] = useState(initialForm);

  useEffect(() => {
    if (editVal) {
      setInput({
        Title: editVal.Title || "",
        Description: editVal.Description || "",
        Amount: editVal.Amount ?? "",
        Date: editVal.Date || "",
        Category: editVal.Category || "",
        Type: editVal.Type || "Debit",
      });
    } else {
      setInput(initialForm);
    }
  }, [editVal]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !input.Title.trim() ||
      !input.Description.trim() ||
      input.Amount === "" ||
      Number(input.Amount) < 0 ||
      !input.Date ||
      !input.Category ||
      !input.Type
    ) {
      alert("Please fill all fields with valid values.");
      return;
    }

    handleAdd(input);
    setInput(initialForm);
  };

  const handleCancel = () => {
    setInput(initialForm);
    clearEdit();
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h3 className="mb-4">
            {editVal ? "Update Expense" : "Add Expense"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="Title"
                  className="form-control"
                  placeholder="Enter expense title"
                  value={input.Title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Amount (₹)</label>
                <input
                  type="number"
                  name="Amount"
                  className="form-control"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  value={input.Amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="Description"
                  className="form-control"
                  placeholder="Enter description"
                  value={input.Description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="Date"
                  className="form-control"
                  value={input.Date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  name="Category"
                  className="form-select"
                  value={input.Category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Money Transfer">Money Transfer</option>
                  <option value="Cash Withdrawal">Cash Withdrawal</option>
                  <option value="General Expense">General Expense</option>
                  <option value="Food">Food</option>
                  <option value="Food&Dining">Food&Dining</option>
                  <option value="HealthCare">HealthCare</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select
                  name="Type"
                  className="form-select"
                  value={input.Type}
                  onChange={handleChange}
                  required
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>

              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editVal ? "Update Expense" : "Add Expense"}
                </button>

                {editVal && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
