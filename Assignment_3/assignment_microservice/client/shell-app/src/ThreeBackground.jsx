import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Rain Effect (Particles)
    const rainCount = 2250;
    const rainGeometry = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    const rainSpeeds = new Float32Array(rainCount);
    const rainColors = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 50; // x
      rainPositions[i * 3 + 1] = Math.random() * 50; // y
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z

      rainSpeeds[i] = Math.random() * 0.05 + 0.02;

      rainColors[i * 3] = Math.random(); // Red
      rainColors[i * 3 + 1] = Math.random(); // Green
      rainColors[i * 3 + 2] = Math.random(); // Blue
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    rainGeometry.setAttribute('color', new THREE.BufferAttribute(rainColors, 3));

    const rainMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    const rain = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rain);

    // Mouse Interactivity
    const mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = rain.geometry.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= rainSpeeds[i];
        if (positions[i * 3 + 1] < -25) {
          positions[i * 3 + 1] = 25;
        }
      }
      rain.geometry.attributes.position.needsUpdate = true;

      rain.rotation.x = mouse.y * 0.1;
      rain.rotation.y = mouse.x * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', null);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
      }}
    />
  );
}

export default ThreeBackground;