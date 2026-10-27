import React, { useContext } from "react";
import { expenseContext } from "./Context/ExpensesContext";
import List from "./Components/List";
import Add from "./Components/Add";

const App = () => {
  const { expenseList, setExpenseList } = useContext(expenseContext);

  const handleAdd = (input) => {
    AddExpense(input);
  };

  return (
    <>
      <Add handleAdd={handleAdd} />
  
      <List expenseList={expenseList}/>
      
    </>
  );
};

export default App;