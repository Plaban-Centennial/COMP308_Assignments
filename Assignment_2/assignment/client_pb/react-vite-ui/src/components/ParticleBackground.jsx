import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const particles = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const trails = new Float32Array(particleCount * 6); // For trails
    const trailColors = new Float32Array(particleCount * 6); // For trail colors
    const trailSizes = new Float32Array(particleCount * 2); // For trail sizes

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();

      sizes[i] = Math.random() * 2;

      // Initialize trails
      trails[i * 6] = positions[i * 3];
      trails[i * 6 + 1] = positions[i * 3 + 1];
      trails[i * 6 + 2] = positions[i * 3 + 2];
      trails[i * 6 + 3] = positions[i * 3];
      trails[i * 6 + 4] = positions[i * 3 + 1];
      trails[i * 6 + 5] = positions[i * 3 + 2];

      // Initialize trail colors
      trailColors[i * 6] = Math.random();
      trailColors[i * 6 + 1] = Math.random();
      trailColors[i * 6 + 2] = Math.random();
      trailColors[i * 6 + 3] = Math.random();
      trailColors[i * 6 + 4] = Math.random();
      trailColors[i * 6 + 5] = Math.random();

      // Initialize trail sizes
      trailSizes[i * 2] = Math.random() * 2;
      trailSizes[i * 2 + 1] = Math.random() * 2;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      opacity: 0.8,
      transparent: true,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create trails
    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trails, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
    trailGeometry.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1));
    const trailMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5 });
    const trailSystem = new THREE.LineSegments(trailGeometry, trailMaterial);
    scene.add(trailSystem);

    // Create speed lines
    const speedLineGeometry = new THREE.BufferGeometry();
    const speedLinePositions = new Float32Array([
      -window.innerWidth / 2, window.innerHeight / 2, -500,
      window.innerWidth / 2, window.innerHeight / 2, -500,
      -window.innerWidth / 2, -window.innerHeight / 2, -500,
      window.innerWidth / 2, -window.innerHeight / 2, -500,
    ]);
    speedLineGeometry.setAttribute('position', new THREE.BufferAttribute(speedLinePositions, 3));
    const speedLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const speedLines = new THREE.LineSegments(speedLineGeometry, speedLineMaterial);
    scene.add(speedLines);
    speedLines.visible = false;

    camera.position.z = 5;

    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      particleSystem.rotation.x = mouseY * 0.1;
      particleSystem.rotation.y = mouseX * 0.1;
    };

    const onMouseDown = () => {
      setIsMouseDown(true);
      speedLines.visible = true;
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
      speedLines.visible = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);

      // Twinkling effect
      const time = Date.now() * 0.005;
      for (let i = 0; i < particleCount; i++) {
        const color = particles.attributes.color;
        color.array[i * 3] = (1 + Math.sin(time + i * 0.1)) / 2;
        color.array[i * 3 + 1] = (1 + Math.sin(time + i * 0.1)) / 2;
        color.array[i * 3 + 2] = (1 + Math.sin(time + i * 0.1)) / 2;
      }
      particles.attributes.color.needsUpdate = true;

      // Move particles to simulate spaceship travel
      particleSystem.position.z -= isMouseDown ? 1 : 0.1;
      if (particleSystem.position.z < -1000) {
        particleSystem.position.z = 0;
      }

      // Update trails
      const trailPositions = trailGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        trailPositions[i * 6] = trailPositions[i * 6 + 3];
        trailPositions[i * 6 + 1] = trailPositions[i * 6 + 4];
        trailPositions[i * 6 + 2] = trailPositions[i * 6 + 5];
        trailPositions[i * 6 + 3] = positions[i * 3];
        trailPositions[i * 6 + 4] = positions[i * 3 + 1];
        trailPositions[i * 6 + 5] = positions[i * 3 + 2];
      }
      trailGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeChild(renderer.domElement);
    };
  }, [isMouseDown]);

  return <div ref={containerRef} style={styles.particleContainer}></div>;
};

const styles = {
  particleContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999, // Ensure it stays above other elements
    pointerEvents: 'none', // Make sure it doesn't interfere with UI interactions
    overflow: 'hidden', // Hide the scrollbar
  },
};

export default ParticleBackground;