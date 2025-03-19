import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/login'); // Redirect to login page
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
      <div style={styles.content}>
        <Outlet /> {/* Render child components here */}
      </div>
    </>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    zIndex: 1000,
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
  content: {
    marginTop: '80px', // Add margin to avoid overlap with the fixed navbar
    padding: '20px',
  },
};

export default Layout;