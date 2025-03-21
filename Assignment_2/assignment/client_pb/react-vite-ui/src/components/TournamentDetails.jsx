import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './TournamentDetails.css'; // Import the CSS file

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
  const navigate = useNavigate(); // Hook for navigation

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
    <div className="tournament-details">
      <h1>Tournament Details</h1>
      {tournament ? (
        <div className="tournament-info">
          <table>
            <tbody>
              <tr>
                <td><strong>ID:</strong></td>
                <td>{tournament.id}</td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{tournament.name}</td>
              </tr>
              <tr>
                <td><strong>Game:</strong></td>
                <td>{tournament.game}</td>
              </tr>
              <tr>
                <td><strong>Date:</strong></td>
                <td>{new Date(tournament.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>{tournament.status}</td>
              </tr>
            </tbody>
          </table>
          <h3>Players</h3>
          {tournament.players.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {tournament.players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.user.username}</td>
                    <td>{player.user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No players assigned to this tournament.</p>
          )}
        </div>
      ) : (
        <p>No tournament details found.</p>
      )}
      <button className="back-button" onClick={() => navigate('/admin')}>
        Back to Admin
      </button>
    </div>
  );
};

export default TournamentDetails;