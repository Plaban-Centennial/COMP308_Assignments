import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Tournament Management System</h1>
      <p style={styles.description}>
        Manage tournaments, register players, and view tournament history with ease.
      </p>
      <div style={styles.links}>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
        <Link to="/tournaments" style={styles.link}>
          View Tournaments
        </Link>
        <Link to="/admin" style={styles.link}>
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#007BFF',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1rem',
  },
};

export default Home;