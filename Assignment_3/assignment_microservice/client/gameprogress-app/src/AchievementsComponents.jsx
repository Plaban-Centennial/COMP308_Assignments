import React, { useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import * as THREE from 'three';

// GraphQL query to fetch achievements
const GET_ACHIEVEMENTS_QUERY = gql`
  query GetAchievements($userId: ID!) {
    getGameProgress(userId: $userId) {
      achievements
    }
  }
`;

function AchievementsComponent({ userId }) {
    const mountRef = useRef(null);

    // Fetch achievements data
    const { data, loading, error } = useQuery(GET_ACHIEVEMENTS_QUERY, {
        variables: { userId },
    });

    useEffect(() => {
        if (!data || !data.getGameProgress) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create 3D elements for each achievement
        data.getGameProgress.achievements.forEach((achievement, index) => {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // Gold color for badges
            const sphere = new THREE.Mesh(geometry, material);

            sphere.position.x = index * 2 - (data.getGameProgress.achievements.length - 1); // Spread out badges
            scene.add(sphere);

            // Add glowing effect
            const pointLight = new THREE.PointLight(0xffd700, 1, 10);
            pointLight.position.set(sphere.position.x, 0, 2);
            scene.add(pointLight);
        });

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            scene.children.forEach((child) => {
                if (child instanceof THREE.Mesh) {
                    child.rotation.y += 0.01; // Rotate badges
                }
            });
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [data]);

    if (loading) return <p>Loading achievements...</p>;
    if (error) return <p>Error loading achievements: {error.message}</p>;

    return <div ref={mountRef}></div>;
}

export default AchievementsComponent;