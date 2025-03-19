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

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [register] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: formData });
      alert(`User registered: ${data.addUser.username}`);
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