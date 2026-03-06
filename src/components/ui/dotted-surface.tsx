'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DottedSurfaceProps {
  className?: string;
  dotColor?: [number, number, number];
  dotSize?: number;
  dotSpacing?: number;
  waveSpeed?: number;
  waveHeight?: number;
  cameraDistance?: number;
}

export function DottedSurface({
  className,
  dotColor = [200, 200, 200],
  dotSize = 0.06,
  dotSpacing = 0.4,
  waveSpeed = 0.5,
  waveHeight = 0.3,
  cameraDistance = 8,
}: DottedSurfaceProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, cameraDistance * 0.6, cameraDistance);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Dot grid
    const cols = Math.ceil(mount.clientWidth / (dotSpacing * 80));
    const rows = Math.ceil(mount.clientHeight / (dotSpacing * 80));
    const count = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);
    const [r, g, b] = dotColor.map((c) => c / 255);

    let idx = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions[idx * 3] = (col - cols / 2) * dotSpacing;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (row - rows / 2) * dotSpacing;
        colorArr[idx * 3] = r;
        colorArr[idx * 3 + 1] = g;
        colorArr[idx * 3 + 2] = b;
        idx++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));

    const material = new THREE.PointsMaterial({
      size: dotSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime() * waveSpeed;
      const pos = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const x = pos[i * 3];
        const z = pos[i * 3 + 2];
        pos[i * 3 + 1] =
          Math.sin(x * 1.5 + t) * Math.cos(z * 1.5 + t) * waveHeight;
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [dotColor, dotSize, dotSpacing, waveSpeed, waveHeight, cameraDistance]);

  return (
    <div
      ref={mountRef}
      className={cn('pointer-events-none absolute inset-0', className)}
    />
  );
}
