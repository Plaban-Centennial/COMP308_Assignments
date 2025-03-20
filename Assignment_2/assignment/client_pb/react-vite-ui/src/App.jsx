import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClientProvider } from './apolloClient';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Tournaments from './components/Tournaments.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import CreateUser from './components/admin/CreateUser.jsx';
import CreateTournament from './components/admin/CreateTournament.jsx';
import AssignPlayers from './components/admin/AssignPlayers.jsx';
import ListTournamentsAndPlayers from './components/admin/ListTournamentsAndPlayers.jsx';
import UserDetails from './components/UserDetails';
import TournamentDetails from './components/TournamentDetails';

const App = () => {
  return (
    <ApolloClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/tournament/:id" element={<TournamentDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-tournament" element={<CreateTournament />} />
          <Route path="/assign-player" element={<AssignPlayers />} />
          <Route path="/list-tournaments" element={<ListTournamentsAndPlayers />} />
        </Routes>
      </Router>
    </ApolloClientProvider>
  );
};

export default App;