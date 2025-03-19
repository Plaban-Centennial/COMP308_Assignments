import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_USERS_AND_TOURNAMENTS = gql`
  query GetAllData {
    users {
      id
      username
      email
      role
    }
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
  const { loading, error, data } = useQuery(GET_ALL_USERS_AND_TOURNAMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Safely handle cases where data might be null or undefined
  const users = data?.users || [];
  const tournaments = data?.tournaments || [];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
      <h2>Tournaments</h2>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            {tournament.name} - {tournament.game} - {tournament.date} - {tournament.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;