// gameprogress-app/src/GameProgressComponent.jsx
import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { Container, Alert } from 'react-bootstrap';

// GraphQL queries and subscriptions
const GET_GAME_PROGRESS_QUERY = gql`
  query GetGameProgress($userId: ID!) {
    getGameProgress(userId: $userId) {
      level
      experiencePoints
      score
      rank
      achievements
      progress
    }
  }
`;

const GAME_PROGRESS_SUBSCRIPTION = gql`
  subscription OnGameProgressUpdated($userId: ID!) {
    gameProgressUpdated(userId: $userId) {
      level
      experiencePoints
      score
      rank
      achievements
      progress
    }
  }
`;

function GameProgressComponent({ userId }) {
  console.log('User ID:', userId);

  const { data, loading, error } = useQuery(GET_GAME_PROGRESS_QUERY, {
    variables: { userId },
  });

  const { data: subscriptionData } = useSubscription(GAME_PROGRESS_SUBSCRIPTION, {
    variables: { userId },
  });

  const [gameProgress, setGameProgress] = useState(null);

  useEffect(() => {
    if (data) {
      setGameProgress(data.getGameProgress);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData) {
      setGameProgress(subscriptionData.gameProgressUpdated);
    }
  }, [subscriptionData]);

  if (loading) return <p>Loading game progress...</p>;
  if (error) return <Alert variant="danger">Error loading game progress: {error.message}</Alert>;

  return (
    <Container>
      <h2>Game Progress</h2>
      {gameProgress && (
        <div>
          <p>Level: {gameProgress.level}</p>
          <p>Experience Points: {gameProgress.experiencePoints}</p>
          <p>Score: {gameProgress.score}</p>
          <p>Rank: {gameProgress.rank}</p>
          <p>Progress: {gameProgress.progress}</p>
          <p>Achievements: {gameProgress.achievements.join(', ')}</p>
        </div>
      )}
    </Container>
  );
}

export default GameProgressComponent;
