import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_TOURNAMENT_MUTATION = gql`
  mutation CreateTournament($name: String!, $game: String!, $date: String!) {
    addTournament(name: $name, game: $game, date: $date) {
      id
      name
      game
      date
    }
  }
`;

const CreateTournament = () => {
  const [formData, setFormData] = useState({ name: '', game: '', date: '' });
  const [createTournament] = useMutation(CREATE_TOURNAMENT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTournament({ variables: formData });
      alert(`Tournament ${data.addTournament.name} created successfully!`);
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tournament Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Game"
        value={formData.game}
        onChange={(e) => setFormData({ ...formData, game: e.target.value })}
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <button type="submit">Create Tournament</button>
    </form>
  );
};

export default CreateTournament;