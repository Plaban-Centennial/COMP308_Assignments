import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClientProvider } from './apolloClient';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Tournaments from './components/Tournaments.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

const App = () => {
  return (
    <ApolloClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ApolloClientProvider>
  );
};

export default App;