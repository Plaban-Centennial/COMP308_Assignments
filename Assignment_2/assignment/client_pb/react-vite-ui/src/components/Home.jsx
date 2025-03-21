import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/'); // Redirect to home page
  };

  return (
    <>
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
        <h1 style={styles.heading}>Welcome to the Tournament Management System</h1>
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
    padding: '60px 20px',
    paddingLeft: '10%', // Add padding to the left
    paddingRight: '10%', // Add padding to the right
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    marginTop: '100px', // Add margin to avoid overlap with the fixed navbar
    backgroundImage: 'url("/path/to/your/gamer-background.jpg")', // Add a gamer-themed background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 100px)', // Ensure the container takes at least the full height of the viewport minus the navbar height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#E0E0E0', // Ensure text is readable on dark background
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '25px',
    color: '#FF6347', // Muted vibrant color for heading
    textAlign: 'center', // Center the heading text
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '35px',
    color: '#ADFF2F', // Muted vibrant color for description
    maxWidth: '600px', // Limit the width of the description for better readability
  },
  links: {
    display: 'flex',
    justifyContent: 'space-around', // Spread links evenly
    gap: '25px',
    marginTop: '25px',
    flexWrap: 'wrap', // Allow links to wrap to the next line if needed
  },
  link: {
    textDecoration: 'none',
    color: '#FFFFFF',
    backgroundColor: '#FF6347', // Muted vibrant button background
    padding: '12px 25px',
    borderRadius: '5px',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s, color 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  },
};

export default Home;