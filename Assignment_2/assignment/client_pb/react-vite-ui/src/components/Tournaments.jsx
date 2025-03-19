import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_UPCOMING_TOURNAMENTS = gql`
  query GetUpcomingTournaments {
    tournaments(status: "Upcoming") {
      id
      name
      date
    }
  }
`;

const GET_JOINED_TOURNAMENTS = gql`
  query GetJoinedTournaments($playerId: ID!) {
    player(id: $playerId) {
      tournaments {
        id
        name
        date
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
        username
      }
    }
  }
`;

const Tournaments = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user info

  // Use playerId if the user is of type Player
  const playerId = user?.role === 'Player' ? user.playerId : null;

  const { data: upcomingData, loading: loadingUpcoming, error: errorUpcoming } = useQuery(GET_UPCOMING_TOURNAMENTS);
  const { data: joinedData, loading: loadingJoined, error: errorJoined } = useQuery(GET_JOINED_TOURNAMENTS, {
    variables: { playerId },
    skip: !playerId, // Skip query if playerId is not available
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
      if (err.message.includes('already joined')) {
        alert('You have already joined this tournament.');
      } else {
        alert('Failed to join the tournament. Please try again later.');
      }
    }
  };

  if (loadingUpcoming || loadingJoined) return <p>Loading tournaments...</p>;

  if (errorUpcoming || errorJoined) {
    const errorMessage =
      errorUpcoming?.message || errorJoined?.message || 'An unexpected error occurred.';
    return <p style={styles.error}>Error: {errorMessage}</p>;
  }

  return (
    <div style={styles.container}>
      <h1>My Joined Tournaments</h1>
      <ul>
        {joinedData?.player?.tournaments?.length > 0 ? (
          joinedData.player.tournaments.map((tournament) => (
            <li key={tournament.id} style={styles.tournamentItem}>
              <span>
                {tournament.name} - {new Date(tournament.date).toLocaleDateString()}
              </span>
            </li>
          ))
        ) : (
          <p>You have not joined any tournaments yet.</p>
        )}
      </ul>

      <h1>Upcoming Tournaments</h1>
      <ul>
        {upcomingData?.tournaments?.length > 0 ? (
          upcomingData.tournaments.map((tournament) => (
            <li key={tournament.id} style={styles.tournamentItem}>
              <span>
                {tournament.name} - {new Date(tournament.date).toLocaleDateString()}
              </span>
              {playerId && (
                <button
                  style={styles.joinButton}
                  onClick={() => handleJoin(tournament.id)}
                >
                  Join
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No upcoming tournaments.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  tournamentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  joinButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Tournaments;