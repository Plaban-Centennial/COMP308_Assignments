// filepath: /e:/College/Semester_6/COMP308_004_Emerging_Technologies/Assignments/Assignment_1/assignment/react-client/src/components/ThreeBackground.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, vertexColors: true });

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse move event listener
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      camera.position.x = mouseX * 2;
      camera.position.y = mouseY * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Mouse hover event listener
    const onMouseEnter = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Create a burst of particles at the hover position with glow effect
      const burstGeometry = new THREE.BufferGeometry();
      const burstMaterial = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
      const burstPositions = new Float32Array(300);
      const burstColors = new Float32Array(300);
      for (let i = 0; i < 300; i += 3) {
        burstPositions[i] = mouseX * 5 + (Math.random() - 0.5) * 0.5;
        burstPositions[i + 1] = mouseY * 5 + (Math.random() - 0.5) * 0.5;
        burstPositions[i + 2] = (Math.random() - 0.5) * 0.5;
        burstColors[i] = Math.random();
        burstColors[i + 1] = Math.random();
        burstColors[i + 2] = Math.random();
      }
      burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
      burstGeometry.setAttribute('color', new THREE.BufferAttribute(burstColors, 3));
      const burstParticles = new THREE.Points(burstGeometry, burstMaterial);
      scene.add(burstParticles);

      // Add glow effect
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          "c": { type: "f", value: 1.0 },
          "p": { type: "f", value: 1.4 },
          glowColor: { type: "c", value: new THREE.Color(0xffff00) },
          viewVector: { type: "v3", value: camera.position }
        },
        vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(c - dot(vNormal, vNormel), p);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity * 2.0; // Increase brightness
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const glowMesh = new THREE.Points(burstGeometry, glowMaterial);
      scene.add(glowMesh);

      // Remove burst particles and glow effect after a short delay
      setTimeout(() => {
        scene.remove(burstParticles);
        scene.remove(glowMesh);
      }, 500);
    };
    window.addEventListener('mouseenter', onMouseEnter);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;

      // Randomize particle positions
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] += (Math.random() - 0.5) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeBackground;