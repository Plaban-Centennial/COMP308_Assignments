import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';

const ASSIGN_PLAYERS_MUTATION = gql`
  mutation AssignPlayers($tournamentId: ID!, $playerIds: [ID!]!) {
    updateTournament(id: $tournamentId, players: $playerIds) {
      id
      name
      players {
        id
        username
      }
    }
  }
`;

const AssignPlayers = () => {
  const [formData, setFormData] = useState({ tournamentId: '', playerIds: [] });
  const [assignPlayers] = useMutation(ASSIGN_PLAYERS_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await assignPlayers({ variables: formData });
      alert(`Players assigned to tournament ${data.updateTournament.name} successfully!`);
    } catch (error) {
      console.error('Error assigning players:', error);
      alert('Failed to assign players.');
    }
  };

  return (
    <div>
      {/* Menu Bar */}
      <nav style={{ backgroundColor: '#f4f4f4', padding: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0, marginRight: '20px' }}>Admin Dashboard</h1>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginRight: '20px' }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? 'red' : 'blue',
              })}
            >
              Home
            </NavLink>
          </li>
          <li style={{ marginRight: '20px' }}>
            <NavLink
              to="/create-user"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? 'red' : 'blue',
              })}
            >
              Create User
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Form for Assigning Players */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tournament ID"
          value={formData.tournamentId}
          onChange={(e) => setFormData({ ...formData, tournamentId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Player IDs (comma-separated)"
          value={formData.playerIds.join(',')}
          onChange={(e) =>
            setFormData({ ...formData, playerIds: e.target.value.split(',') })
          }
        />
        <button type="submit">Assign Players</button>
      </form>
    </div>
  );
};

export default AssignPlayers;