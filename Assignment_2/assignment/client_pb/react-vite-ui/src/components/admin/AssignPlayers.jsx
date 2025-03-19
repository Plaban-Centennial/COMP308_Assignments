import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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
  );
};

export default AssignPlayers;