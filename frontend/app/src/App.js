import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Verify from './pages/Verify';
import Register from './pages/Register';
import Home from './pages/Home';
import Guide from './pages/Guide';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateAuth = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuth({ token, role });
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setAuth({ token, role });
    } else {
      clearAuth();
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login updateAuth={updateAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={auth?.role === 'admin' ? <AdminDashboard clearAuth={clearAuth} /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={auth?.role === 'user' ? <UserDashboard clearAuth={clearAuth} /> : <Navigate to="/login" />}
        />
       

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;