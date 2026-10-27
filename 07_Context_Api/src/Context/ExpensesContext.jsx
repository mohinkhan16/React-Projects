
import { createContext, useContext, useReducer } from "react";

export const expenseContext = createContext({
  expenseList: [],
  editVal: null,
  Debit: 0,
  Credit: 0,
  Balance: 0,
  handleAdd: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
});

const initialvalues = {
  expenseList: [
    {
      id: 1,
      Title: "Food",
      Description: "Lunch",
      Amount: 1000,
      Date: "2026-10-14",
      Category: "Food",
      Type: "Debit",
    },
    {
      id: 2,
      Title: "Salary",
      Description: "Monthly salary",
      Amount: 25000,
      Date: "2026-10-14",
      Category: "Money Transfer",
      Type: "Credit",
    },
  ],
  editVal: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const newExpense = {
        ...action.payload,
        id: Date.now(),
        Amount: Number(action.payload.Amount),
      };

      return {
        ...state,
        expenseList: [...state.expenseList, newExpense],
        editVal: null,
      };
    }

    case "Delete":
      return {
        ...state,
        expenseList: state.expenseList.filter(
          (expense) => expense.id !== action.payload
        ),
        editVal:
          state.editVal?.id === action.payload ? null : state.editVal,
      };

    case "Edit":
      return {
        ...state,
        editVal:
          state.expenseList.find(
            (expense) => expense.id === action.payload
          ) || null,
      };

    case "update":
      return {
        ...state,
        expenseList: state.expenseList.map((expense) =>
          expense.id === state.editVal?.id
            ? {
                ...expense,
                ...action.payload,
                id: expense.id,
                Amount: Number(action.payload.Amount),
              }
            : expense
        ),
        editVal: null,
      };

    case "clearEdit":
      return {
        ...state,
        editVal: null,
      };

    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialvalues);

  const handleAdd = (input) => {
    if (
      !input ||
      !input.Title?.trim() ||
      !input.Description?.trim() ||
      input.Amount === "" ||
      input.Amount === undefined ||
      !input.Date ||
      !input.Category ||
      !input.Type
    ) {
      alert("Please fill all fields");
      return;
    }

    if (state.editVal) {
      dispatch({ type: "update", payload: input });
    } else {
      dispatch({ type: "add", payload: input });
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: "Delete", payload: id });
  };

  const handleEdit = (id) => {
    dispatch({ type: "Edit", payload: id });
  };

  const clearEdit = () => {
    dispatch({ type: "clearEdit" });
  };

  const Credit = state.expenseList
    .filter((item) => item.Type.toLowerCase() === "credit")
    .reduce((total, item) => total + Number(item.Amount || 0), 0);

  const Debit = state.expenseList
    .filter((item) => item.Type.toLowerCase() === "debit")
    .reduce((total, item) => total + Number(item.Amount || 0), 0);

  const Balance = Credit - Debit;

  return (
    <expenseContext.Provider
      value={{
        expenseList: state.expenseList,
        editVal: state.editVal,
        handleAdd,
        handleDelete,
        handleEdit,
        clearEdit,
        Credit,
        Debit,
        Balance,
        
        credit: Credit,
        debit: Debit,
        balance: Balance,
        addExpense: handleAdd,
        updateExpense: (expense) =>
          dispatch({ type: "update", payload: expense }),
        deleteExpense: handleDelete,
      }}
    >
      {children}
    </expenseContext.Provider>
  );
}

export function useExpense() {
  return useContext(expenseContext);
}

export default ExpenseContextProvider;
