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
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    zIndex: 1000, // Ensure it stays above other elements
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  greeting: {
    color: 'white',
    fontSize: '1rem',
    marginRight: '10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  navButton: {
    backgroundColor: 'white',
    color: '#007BFF',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
    marginTop: '80px', // Add margin to avoid overlap with the fixed navbar
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