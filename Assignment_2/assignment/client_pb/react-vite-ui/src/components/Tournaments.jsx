import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_PLAYER_BY_USER_ID = gql`
  query GetPlayerByUserId($userId: ID!) {
    playerByUserId(userId: $userId) {
      id
      user {
        id
        username
        email
        role
      }
      ranking
      tournaments {
        id
        name
        game
        date
        status
        players {
          id
        }
      }
    }
  }
`;

const GET_UPCOMING_TOURNAMENTS = gql`
  query GetUpcomingTournaments($status: String!) {
    upcomingTournaments(status: $status) {
      id
      name
      game
      date
      status
      players {
        id
      }
    }
  }
`;

const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($tournamentId: ID!, $playerId: ID!) {
    joinTournament(tournamentId: $tournamentId, playerId: $playerId) {
      id
      name
      players {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

const Tournaments = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user info
  const navigate = useNavigate(); // Initialize the navigate function

  const { data: playerData, loading: loadingPlayer, error: errorPlayer } = useQuery(GET_PLAYER_BY_USER_ID, {
    variables: { userId: user?.id },
    skip: !user?.id, // Skip query if userId is not available
  });

  const playerId = playerData?.playerByUserId?.id;

  const { data: upcomingData, loading: loadingUpcoming, error: errorUpcoming } = useQuery(GET_UPCOMING_TOURNAMENTS, {
    variables: { status: "Upcoming" },
  });

  const [joinTournament] = useMutation(JOIN_TOURNAMENT);

  const handleJoin = async (tournamentId) => {
    if (!playerId) {
      alert('Only authenticated players can join tournaments.');
      return;
    }

    try {
      await joinTournament({
        variables: {
          tournamentId,
          playerId,
        },
      });
      alert('Successfully joined the tournament!');
    } catch (err) {
      console.error('Error joining tournament:', err);
      alert('Failed to join the tournament. Please try again later.');
    }
  };

  if (loadingPlayer || loadingUpcoming) return <p>Loading tournaments...</p>;

  if (errorPlayer || errorUpcoming) {
    const errorMessage = errorPlayer?.message || errorUpcoming?.message || 'An unexpected error occurred.';
    return <p style={styles.error}>Error: {errorMessage}</p>;
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Upcoming':
        return { color: '#FFA500' }; // Bright orange for Upcoming
      case 'Completed':
        return { color: '#28A745' }; // Green for Completed
      case 'Ongoing':
        return { color: '#FFC107' }; // Yellow for Ongoing
      default:
        return {};
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.playerName}>{user?.username}</h1>
        <h1 style={styles.heading}>My Tournaments</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Game</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {playerData?.playerByUserId?.tournaments?.length > 0 ? (
              playerData.playerByUserId.tournaments.map((tournament) => (
                <tr key={tournament.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{tournament.name}</td>
                  <td style={styles.tableCell}>{tournament.game}</td>
                  <td style={styles.tableCell}>{new Date(tournament.date).toLocaleDateString()}</td>
                  <td style={{ ...styles.tableCell, ...getStatusStyle(tournament.status) }}>{tournament.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.tableCell}>You have not joined any tournaments yet.</td>
              </tr>
            )}
          </tbody>
        </table>

        <h1 style={styles.heading}>Upcoming Tournaments</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Game</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingData?.upcomingTournaments?.length > 0 ? (
              upcomingData.upcomingTournaments.map((tournament) => {
                const hasJoined = tournament.players.some(player => player.id === playerId);
                return (
                  <tr key={tournament.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{tournament.name}</td>
                    <td style={styles.tableCell}>{tournament.game}</td>
                    <td style={styles.tableCell}>{new Date(tournament.date).toLocaleDateString()}</td>
                    <td style={styles.tableCell}>
                      {playerId && !hasJoined ? (
                        <button
                          style={styles.joinButton}
                          onClick={() => handleJoin(tournament.id)}
                        >
                          Join
                        </button>
                      ) : (
                        <span style={styles.joinedText}>Joined</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={styles.tableCell}>No upcoming tournaments.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => navigate('/')} style={styles.backButton}>Back</button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#0D1117', // Dark background color
    color: 'white',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
  },
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#0D1117', // Dark background color
    color: 'white',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
    maxWidth: '800px',
    margin: '20px auto',
  },
  playerName: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#FF6347', // Different color for player name
    marginBottom: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#58A6FF', // Bright color for heading
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '30px',
  },
  tableHeader: {
    backgroundColor: '#161B22', // Dark header background
    color: '#58A6FF', // Bright header text
    padding: '15px',
    border: '1px solid #58A6FF',
  },
  tableRow: {
    backgroundColor: '#161B22', // Dark row background
  },
  tableCell: {
    padding: '15px',
    border: '1px solid #58A6FF',
    color: '#E0E0E0', // Light text color
  },
  joinButton: {
    backgroundColor: '#58A6FF', // Bright button background
    color: '#0D1117',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    transition: 'background-color 0.3s, color 0.3s',
  },
  joinedText: {
    color: '#28A745', // Green color for joined text
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FF6347', // Different color for the back button
    color: '#0D1117',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: "'Press Start 2P', cursive", // Gamer-themed font
    transition: 'background-color 0.3s, color 0.3s',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default Tournaments;