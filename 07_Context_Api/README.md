# Expense Tracker

A simple and responsive Expense Tracker application built with React and Bootstrap. It helps users manage their income and expenses, track their balance, and organize transactions using search, filters, and sorting.

## Features

- **Add Expense:** Add a new transaction with title, description, amount, date, category, and type.
- **Edit Expense:** Update existing transaction details.
- **Delete Expense:** Remove a transaction from the expense list.
- **Search Expenses:** Search transactions by title.
- **Filter Expenses:** Filter transactions by category and type (Credit or Debit).
- **Sort Expenses:** Sort transactions alphabetically or by amount.
- **Expense Summary:** View total credit, total debit, and current balance.
- **Responsive UI:** Bootstrap-based layout for different screen sizes.
- **State Management:** Manage application state using React Context API and `useReducer`.

## Tech Stack

- React
- Vite
- JavaScript
- Bootstrap 5
- React Context API
- React Hooks (`useState`, `useEffect`, `useMemo`, `useReducer`, `useContext`)

## Project Structure

```text
Expense-Tracker/
├── public/
├── src/
│   ├── Components/
│   │   ├── Add.jsx
│   │   ├── List.jsx
│   │   └── ExpenseStats.jsx
│   ├── Context/
│   │   └── ExpensesContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository URL.

### 2. Navigate to the project directory

```bash
cd Expense-Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Bootstrap

```bash
npm install bootstrap
```

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## How It Works

### Add Transactions

Enter the transaction details and select Credit or Debit. Submit the form to add the transaction to the list.

### Edit and Delete

Use the Edit button to load an existing transaction into the form. Save your changes to update the record. Use Delete to remove a transaction.

### Search, Filter, and Sort

- Search by transaction title.
- Filter by category.
- Filter by Credit or Debit.
- Sort titles from A–Z or Z–A.
- Sort amounts from low to high or high to low.
- Reset the filters to view all transactions.

### Expense Summary

The dashboard calculates:

- **Total Credit:** Sum of all credit transactions.
- **Total Debit:** Sum of all debit transactions.
- **Balance:** Total Credit minus Total Debit.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |

## Future Improvements

- Save transactions in LocalStorage.
- Add monthly expense reports and charts.
- Add date-range filtering.
- Export transactions to CSV or PDF.
- Add user authentication and cloud storage.

## Author

**Mohin Pathan**

GitHub: [mohinkhan16](https://github.com/mohinkhan16)

---

*Built with React, Vite, and Bootstrap.*
