import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PLAYER_DETAILS = gql`
  query GetPlayerDetails($playerId: ID!) {
    player(id: $playerId) {
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

  // Use playerId if the user is of type Player
  const playerId = user?.role === 'Player' ? user.playerId : null;

  const { data: playerData, loading: loadingPlayer, error: errorPlayer } = useQuery(GET_PLAYER_DETAILS, {
    variables: { playerId },
    skip: !playerId, // Skip query if playerId is not available
  });

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

  return (
    <div style={styles.container}>
      <h1>My Joined Tournaments</h1>
      <ul>
        {playerData?.player?.tournaments?.length > 0 ? (
          playerData.player.tournaments.map((tournament) => (
            <li key={tournament.id} style={styles.tournamentItem}>
              <span>
                {tournament.name} - {tournament.game} - {new Date(tournament.date).toLocaleDateString()}
              </span>
            </li>
          ))
        ) : (
          <p>You have not joined any tournaments yet.</p>
        )}
      </ul>

      <h1>Upcoming Tournaments</h1>
      <ul>
        {upcomingData?.upcomingTournaments?.length > 0 ? (
          upcomingData.upcomingTournaments.map((tournament) => (
            <li key={tournament.id} style={styles.tournamentItem}>
              <span>
                {tournament.name} - {tournament.game} - {new Date(tournament.date).toLocaleDateString()}
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