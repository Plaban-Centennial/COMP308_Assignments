import * as THREE from 'three';

export function createThreeScene(mountRef) {
  console.log('Creating Three.js scene...');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  mountRef.current.appendChild(renderer.domElement);

  console.log('Renderer added to DOM.');

  // Create particles
  const particleCount = 1000;
  const particleGeometry = new THREE.BufferGeometry();
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x44aa88,
    size: 3, // Increased size for better visibility
    transparent: true,
    opacity: 1, // Full opacity
  });

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  camera.position.z = 100; // Move the camera further back

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate particles
    particleSystem.rotation.y += 0.01;

    console.log('Rendering scene...');
    renderer.render(scene, camera);
  };

  animate();

  // Cleanup function
  return () => {
    console.log('Cleaning up Three.js scene...');
    window.removeEventListener('resize', onWindowResize);
    mountRef.current.removeChild(renderer.domElement);
    renderer.dispose();
  };
}