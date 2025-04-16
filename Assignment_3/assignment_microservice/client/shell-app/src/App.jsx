// shell-app/src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

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

  console.log('Query Data:', data);
  console.log('Extracted userId:', userId);

  console.log('Is Logged In:', isLoggedIn);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  console.log('Final userId:', userId);

  return (
    <div className="App">
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
