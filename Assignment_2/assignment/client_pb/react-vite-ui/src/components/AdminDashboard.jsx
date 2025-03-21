import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import custom CSS for styling

// Query to fetch all users
const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      email
      role
    }
  }
`;

// Query to fetch all tournaments
const GET_ALL_TOURNAMENTS = gql`
  query GetAllTournaments {
    tournaments {
      id
      name
      game
      date
      status
    }
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch users
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery(GET_ALL_USERS);

  // Fetch tournaments
  const {
    loading: loadingTournaments,
    error: errorTournaments,
    data: dataTournaments,
  } = useQuery(GET_ALL_TOURNAMENTS);

  // Handle loading and error states
  if (loadingUsers || loadingTournaments) return <p>Loading data, please wait...</p>;

  if (errorUsers) {
    console.error('Error fetching users:', errorUsers.message);
    return <p className="text-red-500">Unable to fetch users. Please try again later.</p>;
  }

  if (errorTournaments) {
    console.error('Error fetching tournaments:', errorTournaments.message);
    return <p className="text-red-500">Unable to fetch tournaments. Please try again later.</p>;
  }

  // Safely handle cases where data might be null or undefined
  const users = dataUsers?.users || [];
  const tournaments = dataTournaments?.tournaments || [];

  return (
    <div className="full-screen bg-dark font-segoe">
      {/* Menu Bar */}
      <nav className="navbar">
        <h1>Admin Dashboard</h1>
        <ul>
          <li>
            <a href="/" className="text-white hover:underline">Home</a>
          </li>
          <li>
            <a href="/create-user" className="text-white hover:underline">Create User</a>
          </li>
          <li>
            <a href="/create-tournament" className="text-white hover:underline">Create Tournament</a>
          </li>
          <li>
            <a href="/assign-player" className="text-white hover:underline">Assign Player</a>
          </li>
        </ul>
      </nav>

      {/* Users Section */}
      <div className="user-section" width="100%">
        <h2>Users</h2>
        {users.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => navigate(`/user/${user.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Tournaments Section */}
      <div className="tournament-section">
        <h2>Tournaments</h2>
        {tournaments.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Game</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament) => (
                <tr key={tournament.id}>
                  <td>{tournament.name}</td>
                  <td>{tournament.game}</td>
                  <td>{tournament.date}</td>
                  <td>{tournament.status}</td>
                  <td>
                    <button onClick={() => navigate(`/tournament/${tournament.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tournaments found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;