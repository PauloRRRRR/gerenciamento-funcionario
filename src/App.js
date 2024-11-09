// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/form" element={<EmployeeFormPage />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

const EmployeeFormPage = () => (
  <div>
    <h1>Cadastro de Funcionário</h1>
    <EmployeeForm />
    <Link to="/employee-list">
      <button>Próximo</button>
    </Link>
  </div>
);

export default App;
