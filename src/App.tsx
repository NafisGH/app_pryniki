// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DocumentsPage from './pages/DocumentsPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/documents"
        element={
          isAuthenticated ? (
            <DocumentsPage setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={
          isAuthenticated ? <Navigate to="/documents" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default App;
