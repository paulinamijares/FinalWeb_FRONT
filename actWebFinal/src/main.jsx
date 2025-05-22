// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './paginas/login';
import Dashboard from './paginas/dashboard';
import RegistroPage from './paginas/register';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    {/* <Router> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registro" element={<RegistroPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

