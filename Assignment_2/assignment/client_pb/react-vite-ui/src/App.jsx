import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClientProvider } from './apolloClient';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
      <AuthProvider>
        <Router>
          <GlobalStyle />
          <div style={styles.appContainer}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route
                path="/user/:id"
                element={
                  <ProtectedRoute>
                    <UserDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tournament/:id"
                element={
                  <ProtectedRoute>
                    <TournamentDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-user"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-tournament"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <CreateTournament />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assign-player"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AssignPlayers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list-tournaments"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <ListTournamentsAndPlayers />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApolloClientProvider>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    backgroundColor: '#0D1117',
    color: 'white',
    fontFamily: "'Press Start 2P', cursive",
  },
};

const globalStyles = `
  body {
    overflow: hidden;
  }
`;

const GlobalStyle = () => (
  <style>
    {globalStyles}
  </style>
);

export default App;