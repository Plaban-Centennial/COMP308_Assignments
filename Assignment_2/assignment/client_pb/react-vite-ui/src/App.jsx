import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClientProvider } from './apolloClient';
import AppRoutes from './components/AppRoutes.jsx';

const App = () => {
  return (
    <ApolloClientProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ApolloClientProvider>
  );
};

export default App;