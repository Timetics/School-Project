import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import ClassicStudentDashboard from './pages/ClassicStudentDashboard';
import AdminRoleSelector from './pages/AdminRoleSelector';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/student-dashboard" element={<ClassicStudentDashboard />} />
            <Route path="/admin-role-selector" element={<AdminRoleSelector />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;