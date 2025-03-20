import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Updated Mutation
const CREATE_TOURNAMENT_MUTATION = gql`
  mutation AddTournament(
    $name: String!
    $game: String!
    $date: String!
    $players: [ID!]
    $status: String!
  ) {
    addTournament(name: $name, game: $game, date: $date, players: $players, status: $status) {
      id
      name
      game
      date
      status
      players {
        id
      }
    }
  }
`;

const CreateTournament = () => {
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    date: '',
    status: 'Upcoming',
  });

  const [createTournament, { loading, error }] = useMutation(CREATE_TOURNAMENT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createTournament({
        variables: {
          name: formData.name,
          game: formData.game,
          date: formData.date,
          players: [], // Send an empty list for players
          status: formData.status,
        },
      });
      alert(`Tournament "${data.addTournament.name}" created successfully!`);
      setFormData({ name: '', game: '', date: '', status: 'Upcoming' }); // Reset form
    } catch (err) {
      console.error('Error creating tournament:', err);
      alert('Failed to create tournament.');
    }
  };

  return (
    <div>
      <h1>Create Tournament</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Tournament Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Game"
          value={formData.game}
          onChange={(e) => setFormData({ ...formData, game: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Tournament'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default CreateTournament;