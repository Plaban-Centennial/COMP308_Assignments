import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch tournament details by ID
const GET_TOURNAMENT_DETAILS = gql`
  query GetTournamentDetails($id: ID!) {
    tournament(id: $id) {
      id
      name
      game
      date
      status
      players {
        id
        user {
          id
          username
          email
        }
      }
    }
  }
`;

const TournamentDetails = () => {
  const { id } = useParams(); // Get the tournament ID from the URL

  // Fetch tournament details using the ID
  const { loading: loadingTournament, error: errorTournament, data: dataTournament } = useQuery(GET_TOURNAMENT_DETAILS, {
    variables: { id },
  });

  // Handle loading and error states for the tournament
  if (loadingTournament) return <p>Loading tournament details...</p>;
  if (errorTournament) {
    console.error('Error fetching tournament details:', errorTournament.message);
    return <p style={{ color: 'red' }}>Unable to fetch tournament details. Please try again later.</p>;
  }

  // Extract tournament data
  const tournament = dataTournament?.tournament;

  return (
    <div>
      <h1>Tournament Details</h1>
      {tournament ? (
        <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '20px' }}>
          <p><strong>ID:</strong> {tournament.id}</p>
          <p><strong>Name:</strong> {tournament.name}</p>
          <p><strong>Game:</strong> {tournament.game}</p>
          <p><strong>Date:</strong> {new Date(tournament.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {tournament.status}</p>
          <h3>Players</h3>
          {tournament.players.length > 0 ? (
            <ul>
              {tournament.players.map((player) => (
                <li key={player.id}>
                  <p><strong>Username:</strong> {player.user.username}</p>
                  <p><strong>Email:</strong> {player.user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No players assigned to this tournament.</p>
          )}
        </div>
      ) : (
        <p>No tournament details found.</p>
      )}
    </div>
  );
};

export default TournamentDetails;