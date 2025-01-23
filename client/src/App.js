import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import Search from './components/Search';
import { Routes, Route, Navigate } from "react-router-dom"; // Removed BrowserRouter import

import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

function App() {
  return (
    <>
      <Navbaar />
      <Routes>
        {/* Public Routes (Login and Signup) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Only accessible after login) */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><Edit /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute><Details /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />

        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
