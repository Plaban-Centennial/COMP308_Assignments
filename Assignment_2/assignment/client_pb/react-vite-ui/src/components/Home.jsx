import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/'); // Redirect to home page
  };

  return (
    <>
      <ParticleBackground />
      {/* Menu Bar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Tournament Management</h2>
        <div style={styles.navLinks}>
          {user ? (
            <>
              <span style={styles.greeting}>Hello, {user.username}</span>
              <button onClick={handleLogout} style={styles.navButton}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.navLink}>
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome to the Tournament Management System</h2>
        <p style={styles.description}>
          Manage tournaments, register players, and view tournament history with ease.
        </p>
        <div style={styles.links}>
          {!user && (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </>
          )}
          {user && user.role !== 'Admin' && (
            <>
              <Link to="/tournaments" style={styles.link}>
                View Tournaments
              </Link>
            </>
          )}
          {user && user.role === 'Admin' && (
            <Link to="/admin" style={styles.link}>
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  navbar: {
    position: 'fixed', // Make the navbar fixed
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#2C2C2C', // Dark background color
    color: '#E0E0E0',
    zIndex: 1000, // Ensure it stays above other elements
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#FF6347', // Muted vibrant color for logo
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  greeting: {
    color: '#ADFF2F', // Muted vibrant color for greeting
    fontSize: '1.2rem',
    marginRight: '15px',
  },
  navLink: {
    color: '#87CEEB', // Muted vibrant color for nav links
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'color 0.3s',
  },
  navButton: {
    backgroundColor: '#FF6347', // Muted vibrant button background
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s, color 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  },
  container: {
    textAlign: 'center',
    padding: '30px 10px', // Reduce padding
    paddingLeft: '5%', // Reduce padding to the left
    paddingRight: '5%', // Reduce padding to the right
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    marginTop: '0px', // Add margin to avoid overlap with the fixed navbar
    backgroundImage: 'url("/path/to/your/gamer-background.jpg")', // Add a gamer-themed background image
    backgroundSize: 'width',
    backgroundPosition: 'bottom',
    // minHeight: 'calc(100vh - 100px)', // Ensure the container takes at least the full height of the viewport minus the navbar height
    color: '#E0E0E0', // Ensure text is readable on dark background
    overflow: 'hidden', // Hide the scrollbar
    positiony: 'absolute', // Ensure z-index works as expected
    maxHeight: '50%', // Ensure the container does not exceed the viewport height
  },
  heading: {
    fontSize: '2.5rem', // Reduce font size
    marginBottom: '20px', // Reduce margin
    color: '#FF6347', // Muted vibrant color for heading
    textAlign: 'center', // Center the heading text
  },
  description: {
    fontSize: '1.2rem', // Reduce font size
    marginBottom: '25px', // Reduce margin
    color: '#ADFF2F', // Muted vibrant color for description
    maxWidth: '500px', // Reduce max width
    margin: '0 auto', // Center the description
  },
  links: {
    display: 'block',
    textAlign: 'center',
    gap: '15px', // Reduce gap
    marginTop: '20px', // Reduce margin
  },
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    color: '#FFFFFF',
    backgroundColor: '#FF6347', // Muted vibrant button background
    padding: '10px 20px', // Reduce padding
    borderRadius: '5px',
    fontSize: '1rem', // Reduce font size
    transition: 'background-color 0.3s, color 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
    margin: '8px', // Reduce margin
  },
};

// Global styles to hide the scrollbar
const globalStyles = `
  body, html {
    overflow: hidden;
  }
`;

const GlobalStyle = () => (
  <style>
    {globalStyles}
  </style>
);

export default () => (
  <>
    <GlobalStyle />
    <Home />
  </>
);