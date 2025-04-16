// gamprogress-app/src / App.jsx
import './App.css';
import GameProgressComponent from './GameProgressComponent';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql', // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App({ userId }) {
  console.log('Received userId in gameprogress-app:', userId);

  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <GameProgressComponent userId={userId} />
      </ApolloProvider>
    </div>
  );
}

export default App;
