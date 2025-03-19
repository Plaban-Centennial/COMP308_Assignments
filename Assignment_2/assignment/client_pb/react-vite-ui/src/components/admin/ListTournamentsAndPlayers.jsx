import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TOURNAMENTS_AND_PLAYERS = gql`
  query GetTournamentsAndPlayers {
    tournaments {
      id
      name
      players {
        id
        username
      }
    }
  }
`;

const ListTournamentsAndPlayers = () => {
  const { data, loading, error } = useQuery(GET_TOURNAMENTS_AND_PLAYERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Tournaments and Players</h1>
      {data.tournaments.map((tournament) => (
        <div key={tournament.id}>
          <h2>{tournament.name}</h2>
          <ul>
            {tournament.players.map((player) => (
              <li key={player.id}>{player.username}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListTournamentsAndPlayers;