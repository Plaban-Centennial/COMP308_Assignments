import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      user {
        id
        username
      }
    }
  }
`;

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
      players {
        id
      }
    }
  }
`;

const ASSIGN_PLAYERS_MUTATION = gql`
  mutation AssignPlayers($tournamentId: ID!, $playerIds: [ID!]!) {
    assignTournamentPlayers(tournamentId: $tournamentId, playerIds: $playerIds) {
      id
      name
      players {
        id
        user {
          username
        }
      }
    }
  }
`;

const AssignPlayers = () => {
  const [formData, setFormData] = useState({ tournamentId: '', playerIds: [] });
  const { data: playersData, loading: loadingPlayers, error: errorPlayers } = useQuery(GET_PLAYERS);
  const { data: tournamentsData, loading: loadingTournaments, error: errorTournaments } = useQuery(GET_TOURNAMENTS);
  const [assignPlayers] = useMutation(ASSIGN_PLAYERS_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await assignPlayers({ variables: formData });
      const assignedPlayerNames = data.assignTournamentPlayers.players.map(player => player.user.username).join(', ');
      alert(`Players (${assignedPlayerNames}) assigned to tournament ${data.assignTournamentPlayers.name} successfully!`);
    } catch (error) {
      console.error('Error assigning players:', error);
      alert('Failed to assign players.');
    }
  };

  if (loadingPlayers || loadingTournaments) return <p>Loading...</p>;
  if (errorPlayers || errorTournaments) return <p>Error loading data.</p>;

  // Filter out players who are already part of the selected tournament
  const availablePlayers = formData.tournamentId
    ? playersData.players.filter(
        (player) =>
          !tournamentsData.tournaments
            .find((tournament) => tournament.id === formData.tournamentId)
            .players.some((tournamentPlayer) => tournamentPlayer.id === player.id)
      )
    : playersData.players;

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
        <select
          value={formData.tournamentId}
          onChange={(e) => setFormData({ ...formData, tournamentId: e.target.value })}
        >
          <option value="">Select Tournament</option>
          {tournamentsData.tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
        <select
          multiple
          value={formData.playerIds}
          onChange={(e) =>
            setFormData({ ...formData, playerIds: Array.from(e.target.selectedOptions, (option) => option.value) })
          }
        >
          {availablePlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.user.username}
            </option>
          ))}
        </select>
        <button type="submit">Assign Players</button>
      </form>
    </div>
  );
};

export default AssignPlayers;