import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!, $role: String!) {
    addUser(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

const ADD_PLAYER_MUTATION = gql`
 mutation AddPlayer($userId: ID!, $ranking: Int!, $tournaments: [ID!]) {
  addPlayer(userId: $userId, ranking: $ranking, tournaments: $tournaments) {
    id
    user {
      id
      username
      email
    }
    ranking
    tournaments {
      id
      name
    }
  }
}
`;

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generates a random integer between min and max (inclusive)
};

const CreateUser = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Player' });
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [addPlayer] = useMutation(ADD_PLAYER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: formData });
      const userId = data.addUser.id;
      if (data.addUser.role === 'Player') {
        await addPlayer({ variables: { userId, ranking: getRandomInteger(1, 10000), tournaments: [] } });
      }
      alert(`User ${data.addUser.username} created successfully!`);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="Player">Player</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;