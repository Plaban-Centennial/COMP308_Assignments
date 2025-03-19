import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
      game
      date
      status
    }
  }
`;

const Tournaments = () => {
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Upcoming Tournaments</h1>
      <ul>
        {data.tournaments.map((tournament) => (
          <li key={tournament.id}>
            {tournament.name} - {tournament.game} - {tournament.date} - {tournament.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tournaments;