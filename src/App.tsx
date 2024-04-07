import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/Login.tsx';
import Home from './pages/home.tsx';
import './App.css';

const App: React.FC = () => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
