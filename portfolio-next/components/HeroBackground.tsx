"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL hero field: particles + soft orbs + wireframe solids (frontend / “build in 3D” vibe).
 * Pixel ratio capped for performance; respects prefers-reduced-motion.
 */
export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const count = reduceMotion ? 220 : 480;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#39ff14");
    const c2 = new THREE.Color("#bf5fff");
    const c3 = new THREE.Color("#00f5d4");
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;
      const mix = Math.random();
      const c = mix < 0.33 ? c1 : mix < 0.66 ? c2 : c3;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: reduceMotion ? 0.028 : 0.036,
        vertexColors: true,
        transparent: true,
        opacity: reduceMotion ? 0.35 : 0.52,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(points);

    const wireGroup = new THREE.Group();
    wireGroup.position.set(0.1, 0.15, -0.8);

    const lineMatGreen = new THREE.LineBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.2,
    });
    const lineMatPurple = new THREE.LineBasicMaterial({
      color: 0xbf5fff,
      transparent: true,
      opacity: 0.18,
    });
    const lineMatCyan = new THREE.LineBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.16,
    });

    const tkGeo = new THREE.TorusKnotGeometry(0.48, 0.13, 40, 10);
    const tkWire = new THREE.WireframeGeometry(tkGeo);
    tkGeo.dispose();
    const knot = new THREE.LineSegments(tkWire, lineMatGreen);
    wireGroup.add(knot);

    const ocGeo = new THREE.OctahedronGeometry(0.34, 0);
    const ocWire = new THREE.WireframeGeometry(ocGeo);
    ocGeo.dispose();
    const oct = new THREE.LineSegments(ocWire, lineMatPurple);
    oct.position.set(-1.35, 0.45, 0.2);
    oct.rotation.set(0.4, 0.7, 0.2);
    wireGroup.add(oct);

    const icGeo = new THREE.IcosahedronGeometry(0.26, 1);
    const icWire = new THREE.WireframeGeometry(icGeo);
    icGeo.dispose();
    const ico = new THREE.LineSegments(icWire, lineMatCyan);
    ico.position.set(1.25, -0.35, 0.15);
    wireGroup.add(ico);

    scene.add(wireGroup);

    const orbs: THREE.Mesh[] = [];
    const orbGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const mats = [
      new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.32 }),
      new THREE.MeshBasicMaterial({ color: 0xbf5fff, transparent: true, opacity: 0.28 }),
      new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.26 }),
    ];
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(orbGeo, mats[i]!);
      m.position.set((i - 1) * 2.2, Math.sin(i) * 0.8, -1.2 - i * 0.4);
      scene.add(m);
      orbs.push(m);
    }

    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    const t0 = performance.now() / 1000;
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() / 1000 - t0;
      const speed = reduceMotion ? 0.12 : 1;

      points.rotation.y = t * 0.028 * speed;
      points.rotation.x = Math.sin(t * 0.1 * speed) * 0.07 * speed;

      wireGroup.rotation.y = t * 0.11 * speed;
      wireGroup.rotation.x = Math.sin(t * 0.25 * speed) * 0.12 * speed;
      knot.rotation.z = t * 0.15 * speed;
      oct.rotation.y = t * 0.22 * speed;
      ico.rotation.x = t * 0.18 * speed;

      camera.position.x += (mx * 0.38 - camera.position.x) * 0.045;
      camera.position.y += (-my * 0.28 - camera.position.y) * 0.045;
      camera.lookAt(0, 0, -1);

      orbs.forEach((o, i) => {
        o.position.y += Math.sin(t * 0.75 * speed + i) * 0.002 * speed;
        o.rotation.x = t * 0.18 * speed + i;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      geo.dispose();
      (points.material as THREE.Material).dispose();
      tkWire.dispose();
      ocWire.dispose();
      icWire.dispose();
      lineMatGreen.dispose();
      lineMatPurple.dispose();
      lineMatCyan.dispose();
      orbGeo.dispose();
      mats.forEach((m) => m.dispose());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 opacity-90"
      aria-hidden
    />
  );
}
