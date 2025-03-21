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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={styles.input}
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Register</button>
          <button type="button" onClick={() => navigate('/')} style={{ ...styles.button, ...styles.backButton }}>Back</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%', // Ensure the container takes the full width of the viewport
    backgroundColor: '#0D1117', // Dark background color
    color: 'white',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#161B22', // Dark form background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#58A6FF', // Bright color for heading
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the buttons
    width: '100%',
    gap: '10px', // Add some space between the buttons
  },
  button: {
    backgroundColor: '#58A6FF', // Bright button background
    color: '#0D1117',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    transition: 'background-color 0.3s, color 0.3s',
  },
  backButton: {
    backgroundColor: '#FF6347', // Different color for the back button
  },
};

export default Register;