# 03 Employee Management (Axios)

Pure React Employee Management System built using standard HTML forms and **Axios** for API integration.

## Features
- **Axios HTTP Methods**: Uses `src/API/EmployeeAxios.jsx` for API requests.
  - `getAllEmployee()`: `GET /allEmployee`
  - `addEmployee()`: `POST /add`
  - `UpdateEmployee()`: `PATCH /:id`
  - `deleteEmployee()`: `DELETE /:id`
  - `getEmpById()`: `GET /:id`
- **Pure Functionality**: Standard React `useState`, pure HTML `<form>` and `<table>`. No Formik, no React-Bootstrap, no CSS bloat.

## Scripts
- `npm run dev`: Start Vite development server
- `npm run build`: Build for production
