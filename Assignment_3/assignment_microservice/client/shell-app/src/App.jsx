// shell-app/src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

// Lazy-loaded micro-frontends
const UserApp = lazy(() => import('userApp/App'));
const GameProgressApp = lazy(() => import('gameprogressApp/App'));

// GraphQL query to check the current user's authentication status
const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Use Apollo's useQuery hook to perform the authentication status check on app load
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
  });

  const userId = data?.currentUser?.id;
  const username = data?.currentUser?.username;

  useEffect(() => {
    // Listen for the custom loginSuccess event from the UserApp
    const handleLoginSuccess = (event) => {
      setIsLoggedIn(event.detail.isLoggedIn);
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);

    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      console.log('Current User Data:', data); // Log the data object
      setIsLoggedIn(!!data.currentUser);
    }
  }, [loading, error, data]);

  const handleLogout = () => {
    console.log('User logged out');
    setIsLoggedIn(false);
    // Add your logout logic here, e.g., clearing tokens, redirecting to login page, etc.
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="App">
      {isLoggedIn && (
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Game Dashboard</h1>
            <div className="user-info">
              <span className="username">Hi, {username || 'Player'}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>
        </header>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        {!isLoggedIn ? (
          <UserApp />
        ) : userId ? (
          <GameProgressApp userId={userId} />
        ) : (
          <div>Loading user data...</div>
        )}
      </Suspense>
    </div>
  );
}

export default App;
