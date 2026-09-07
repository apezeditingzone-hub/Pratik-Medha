import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AICoreProps {
  progress: number;
  isCinematicActive: boolean;
  onCoreClick?: () => void;
  reducedMotion?: boolean;
}

export const AICore: React.FC<AICoreProps> = ({
  progress,
  isCinematicActive,
  onCoreClick,
  reducedMotion = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pulseRef = useRef<THREE.Mesh | null>(null);
  const pulseScale = useRef(1);
  const pulseOpacity = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Parallax
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // --- 1. Central Core Sphere ---
    // Inner Glow Sphere
    const innerGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // Outer Geodesic Energy Cage
    const cageGeo = new THREE.IcosahedronGeometry(0.95, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00a8ff),
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const cageSphere = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageSphere);

    // Core Point Light
    const coreLight = new THREE.PointLight(0x00f0ff, 3, 10);
    coreGroup.add(coreLight);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x02071a, 2);
    scene.add(ambientLight);

    // --- 2. 3D Rotating Rings ---
    // Ring 1 (Inner X-tilt)
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
      transparent: true,
      opacity: 0.85
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Ring 2 (Middle Y-tilt, segmented)
    const ring2Geo = new THREE.TorusGeometry(1.8, 0.025, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x7928ca),
      transparent: true,
      opacity: 0.7
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // Ring 3 (Outer Wide Horizon)
    const ring3Geo = new THREE.TorusGeometry(2.2, 0.015, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
      transparent: true,
      opacity: 0.6
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 6;
    coreGroup.add(ring3);

    // --- 3. Scanning Laser Line / Disc ---
    const scanGeo = new THREE.RingGeometry(0.1, 2.3, 64);
    const scanMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const scanDisc = new THREE.Mesh(scanGeo, scanMat);
    scanDisc.rotation.x = Math.PI / 2;
    coreGroup.add(scanDisc);

    // --- 4. Orbiting Particles Field ---
    const particleCount = reducedMotion ? 120 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const isCyan = Math.random() > 0.3;
      colors[i * 3] = isCyan ? 0.0 : 0.8;
      colors[i * 3 + 1] = isCyan ? 0.94 : 0.9;
      colors[i * 3 + 2] = 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleSystem);

    // --- 5. Click Shockwave Mesh ---
    const pulseGeo = new THREE.RingGeometry(0.8, 1.0, 64);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    coreGroup.add(pulseMesh);
    pulseRef.current = pulseMesh;

    // Mouse Movement Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x * 0.4;
      mousePos.current.targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      coreGroup.rotation.y = mousePos.current.x + elapsedTime * 0.2;
      coreGroup.rotation.x = -mousePos.current.y + Math.sin(elapsedTime * 0.5) * 0.08;

      // Rotate Rings at different speeds & axes
      ring1.rotation.z += 0.018;
      ring1.rotation.x += 0.009;

      ring2.rotation.z -= 0.024;
      ring2.rotation.y += 0.012;

      ring3.rotation.z += 0.008;
      ring3.rotation.x -= 0.014;

      // Pulse the inner cage
      const pulseSpeed = 2.5 + (progress / 100) * 3;
      const cageScale = 1 + Math.sin(elapsedTime * pulseSpeed) * 0.06;
      cageSphere.scale.set(cageScale, cageScale, cageScale);

      // Scanning Disc vertical oscillation
      scanDisc.position.y = Math.sin(elapsedTime * 2.2) * 1.8;
      scanDisc.rotation.z = elapsedTime * 0.5;

      // Particle orbit drift
      particleSystem.rotation.y = elapsedTime * 0.15;
      particleSystem.rotation.x = elapsedTime * 0.08;

      // Handle Click Shockwave Animation
      if (pulseOpacity.current > 0.01) {
        pulseScale.current += 0.08;
        pulseOpacity.current *= 0.92;
        pulseMesh.scale.set(pulseScale.current, pulseScale.current, 1);
        (pulseMesh.material as THREE.MeshBasicMaterial).opacity = pulseOpacity.current;
      }

      // Cinematic surge adjustments
      if (isCinematicActive) {
        coreGroup.scale.multiplyScalar(0.97);
        coreLight.intensity = 15;
        (innerSphere.material as THREE.MeshBasicMaterial).opacity = 1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      scanGeo.dispose();
      scanMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
    };
  }, [reducedMotion, isCinematicActive]);

  const triggerShockwave = () => {
    pulseScale.current = 1;
    pulseOpacity.current = 0.9;
    if (onCoreClick) onCoreClick();
  };

  return (
    <div
      ref={containerRef}
      onClick={triggerShockwave}
      className="relative w-full h-full max-w-[500px] max-h-[500px] cursor-pointer touch-none select-none flex items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-300"
      title="Click AI Core to trigger energy pulse"
    />
  );
};
