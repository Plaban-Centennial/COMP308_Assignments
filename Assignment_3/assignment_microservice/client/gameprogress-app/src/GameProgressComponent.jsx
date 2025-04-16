// gameprogress-app/src/GameProgressComponent.jsx
import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { Container, Alert, Row, Col, Card } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js
import './GameProgressComponent.css'; // Custom CSS for gamer theme

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

  // Chart data for experience points and score
  const barChartData = {
    labels: ['Experience Points', 'Score'],
    datasets: [
      {
        label: 'Metrics',
        data: [gameProgress?.experiencePoints || 0, gameProgress?.score || 0],
        backgroundColor: ['#4caf50', '#2196f3'],
        borderColor: ['#388e3c', '#1976d2'],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for achievements (Doughnut Chart)
  const doughnutChartData = {
    labels: gameProgress?.achievements || [],
    datasets: [
      {
        label: 'Achievements',
        data: gameProgress?.achievements.map(() => 1) || [],
        backgroundColor: ['#ff5722', '#ff9800', '#ffc107', '#8bc34a', '#00bcd4'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="gamer-theme">
      <h2 className="gamer-title">Game Progress</h2>
      <Row>
        {/* Player Stats as Cards */}
        <Col md={4}>
          <Card className="gamer-card">
            <Card.Body>
              <Card.Title>Level</Card.Title>
              <h3>{gameProgress?.level || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="gamer-card">
            <Card.Body>
              <Card.Title>Rank</Card.Title>
              <h3>{gameProgress?.rank || 'N/A'}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="gamer-card">
            <Card.Body>
              <Card.Title>Progress</Card.Title>
              <h3>{gameProgress?.progress || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 row-equal-height">
        {/* Metrics Chart */}
        <Col md={6}>
          <Card className="gamer-card">
            <Card.Body>
              <Card.Title>Metrics</Card.Title>
              <Bar data={barChartData} />
            </Card.Body>
          </Card>
        </Col>
        {/* Achievements Chart (Doughnut) */}
        <Col md={6}>
          <Card className="gamer-card">
            <Card.Body>
              <Card.Title>Achievements</Card.Title>
              <div className="doughnut-chart-container">
                <Doughnut data={doughnutChartData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GameProgressComponent;
