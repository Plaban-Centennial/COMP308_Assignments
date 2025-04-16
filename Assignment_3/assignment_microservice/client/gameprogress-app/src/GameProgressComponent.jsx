// gameprogress-app/src/GameProgressComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import * as THREE from 'three';
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

  const mountRef = useRef(null);
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

  useEffect(() => {
    if (!gameProgress) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a 3D progress bar
    const geometry = new THREE.BoxGeometry(gameProgress.level, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const progressBar = new THREE.Mesh(geometry, material);
    scene.add(progressBar);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      progressBar.rotation.y += 0.01; // Smooth rotation for visual effect
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [gameProgress]);

  if (loading) return <p>Loading game progress...</p>;
  if (error) return <Alert variant="danger">Error loading game progress: {error.message}</Alert>;

  return (
    <Container>
      <h2>Game Progress</h2>
      <div ref={mountRef}></div>
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

function GameProgressApp({ userId }) {
  console.log('Received userId in GameProgressApp:', userId);
}

export default GameProgressComponent;
