"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function StarfieldPage({
  color,
  size,
  count,
}: {
  color: string;
  size: number;
  count: number;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.2} />
        <Starfield
          count={count}
          radius={1.2}
          speed={0.1}
          size={size}
          color={color}
        />
        <Preload all />
      </Canvas>
    </motion.div>
  );
}

function Starfield({
  count = 4000,
  radius = 1.2,
  speed = 0.02,
  size = 0.006,
  color = "white",
  fade = 0.3,
}: {
  count?: number;
  radius?: number; // world units (camera z=1)
  speed?: number; // base rotation speed
  size?: number; // point size
  color?: string; // CSS color
  fade?: number; // 0..1 fade near edges
}) {
  const ref = useRef<any>(null);

  // Randomly distribute points in a sphere
  const positions = useMemo(
    () => randomInSphere(count, radius),
    [count, radius]
  );

  // Mouse-based parallax
  const mouseRef = useRef({ x: 0, y: 0 });
  // Attach listener once per mount
  useMemo(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = ref.current as THREE.Group;
    if (!g) return;

    // gentle rotation
    g.rotation.y += delta * speed;
    g.rotation.x += delta * (speed * 0.2);

    // subtle parallax
    const { x, y } = mouseRef.current;
    g.rotation.y += x * 0.0015;
    g.rotation.x += y * 0.0015;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} frustumCulled={false}>
        {/* sizeAttenuation makes points appear smaller with distance */}
        <PointMaterial
          transparent
          size={size}
          sizeAttenuation
          depthWrite={false}
          color={color}
          // fade stars at edges by reducing opacity through alphaTest
          opacity={1 - Math.min(Math.max(fade, 0), 1) * 0.2}
        />
      </Points>
    </group>
  );
}

/** Create N random positions uniformly within a sphere of `radius`. */
function randomInSphere(n: number, radius = 1) {
  const positions = new Float32Array(n * 3);
  let i = 0;
  while (i < n) {
    // Gaussian-ish distribution for more depth variety
    const u = Math.random();
    const v = Math.random();
    const w = Math.random();

    // Spherical coords -> cartesian
    const r = radius * Math.cbrt(u); // cube root for uniform volume
    const theta = 2 * Math.PI * v;
    const phi = Math.acos(2 * w - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    i++;
  }
  return positions;
}
