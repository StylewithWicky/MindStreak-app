// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landingpage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;


