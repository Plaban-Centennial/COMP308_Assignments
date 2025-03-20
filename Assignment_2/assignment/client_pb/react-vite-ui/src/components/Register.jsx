import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password, role: "Player") {
      id
      username
      email
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

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [register] = useMutation(REGISTER_MUTATION);
  const [addPlayer] = useMutation(ADD_PLAYER_MUTATION);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: formData });
      const userId = data.addUser.id;
      await addPlayer({ variables: { userId: userId, ranking: getRandomInteger(1, 10000), tournaments: [] } });
      alert(`User registered and player added: ${data.addUser.username}`);
      navigate('/'); // Redirect to the home page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register. Please try again.');
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;