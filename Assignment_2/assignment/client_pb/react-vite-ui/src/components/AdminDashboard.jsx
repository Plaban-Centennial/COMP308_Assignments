import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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
    return <p style={{ color: 'red' }}>Unable to fetch users. Please try again later.</p>;
  }

  if (errorTournaments) {
    console.error('Error fetching tournaments:', errorTournaments.message);
    return <p style={{ color: 'red' }}>Unable to fetch tournaments. Please try again later.</p>;
  }

  // Safely handle cases where data might be null or undefined
  const users = dataUsers?.users || [];
  const tournaments = dataTournaments?.tournaments || [];

  return (
    <div>
      {/* Menu Bar */}
      <nav style={{ backgroundColor: '#f4f4f4', padding: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0, marginRight: '20px' }}>Admin Dashboard</h1>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginRight: '20px' }}>
            <a href="/" style={{ textDecoration: 'none', color: 'blue' }}>Home</a>
          </li>
          <li style={{ marginRight: '20px' }}>
            <a href="/create-user" style={{ textDecoration: 'none', color: 'blue' }}>Create User</a>
          </li>
          <li style={{ marginRight: '20px' }}>
            <a href="/create-tournament" style={{ textDecoration: 'none', color: 'blue' }}>Create Tournament</a>
          </li>
          <li>
            <a href="/assign-player" style={{ textDecoration: 'none', color: 'blue' }}>Assign Player to Tournaments</a>
          </li>
        </ul>
      </nav>

      {/* Users Section */}
      <h2>Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => navigate(`/user/${user.id}`)} // Redirect to user details page
                style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {user.username}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      {/* Tournaments Section */}
      <h2>Tournaments</h2>
      {tournaments.length > 0 ? (
        <ul>
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              <button
                onClick={() => navigate(`/tournament/${tournament.id}`)} // Redirect to tournament details page
                style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {tournament.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tournaments found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;