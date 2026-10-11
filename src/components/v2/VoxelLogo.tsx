import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 7-row bitmaps; "#" = cube
const GLYPHS: Record<string, string[]> = {
  "{": ["..##", ".#..", ".#..", "#...", ".#..", ".#..", "..##"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  "}": ["##..", "..#.", "..#.", "...#", "..#.", "..#.", "##.."],
};

type Cube = { x: number; y: number; z: number; brace: boolean; from: THREE.Vector3; delay: number };

function buildCubes(text: string): { cubes: Cube[]; width: number } {
  const cubes: Cube[] = [];
  let col = 0;
  for (const ch of text) {
    const rows = GLYPHS[ch];
    const brace = ch === "{" || ch === "}";
    rows.forEach((row, r) => {
      [...row].forEach((cell, c) => {
        if (cell !== "#") return;
        const layers = brace ? [0] : [0, -1];
        for (const z of layers) {
          cubes.push({
            x: col + c,
            y: 3 - r,
            z,
            brace,
            from: new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, 10 + Math.random() * 20),
            delay: Math.random() * 0.5,
          });
        }
      });
    });
    col += rows[0].length + 1;
  }
  const width = col - 1;
  cubes.forEach((c) => (c.x -= width / 2 - 0.5));
  return { cubes, width };
}

const Voxels = ({ active }: { active: boolean }) => {
  const { cubes, width } = useMemo(() => buildCubes("{SP}"), []);
  const letters = useMemo(() => cubes.filter((c) => !c.brace), [cubes]);
  const braces = useMemo(() => cubes.filter((c) => c.brace), [cubes]);
  const lettersRef = useRef<THREE.InstancedMesh>(null);
  const bracesRef = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const place = (mesh: THREE.InstancedMesh | null, list: Cube[], p: number, time: number) => {
    if (!mesh) return;
    list.forEach((c, i) => {
      const t = THREE.MathUtils.clamp((p - c.delay) / 0.5, 0, 1);
      const e = 1 - Math.pow(1 - t, 3);
      dummy.position.set(
        THREE.MathUtils.lerp(c.from.x, c.x, e),
        THREE.MathUtils.lerp(c.from.y, c.y, e) + Math.sin(time * 1.2 + c.x * 0.6) * 0.06 * e,
        THREE.MathUtils.lerp(c.from.z, c.z, e)
      );
      dummy.rotation.set((1 - e) * 3, (1 - e) * 2, 0);
      dummy.scale.setScalar(0.92 * Math.max(e, 0.001));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    place(lettersRef.current, letters, 0, 0);
    place(bracesRef.current, braces, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (active) progress.current = Math.min(progress.current + delta * 0.6, 1);
    const p = progress.current;
    const time = state.clock.elapsedTime;
    place(lettersRef.current, letters, p, time);
    place(bracesRef.current, braces, p, time);
    if (group.current) {
      const scale = Math.min(1, (viewport.width * 0.82) / (width + 2));
      group.current.scale.setScalar(scale);
      group.current.rotation.y += (state.pointer.x * 0.35 - 0.12 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-state.pointer.y * 0.2 + 0.08 - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, 1.2, 0]}>
      <instancedMesh ref={lettersRef} args={[undefined, undefined, letters.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2f5378" roughness={0.35} metalness={0.15} />
      </instancedMesh>
      <instancedMesh ref={bracesRef} args={[undefined, undefined, braces.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#b9cfe3" roughness={0.3} metalness={0.05} />
      </instancedMesh>
    </group>
  );
};

/** "{SP}" built from 3D cubes that fly into place once `active` turns true. */
export const VoxelLogo = ({ active }: { active: boolean }) => (
  <Canvas
    camera={{ position: [0, 0, 30], fov: 40 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
    eventSource={typeof document !== "undefined" ? document.body : undefined}
    eventPrefix="client"
  >
    <ambientLight intensity={0.9} />
    <directionalLight position={[-8, 12, 10]} intensity={2.2} color="#fff1e0" />
    <directionalLight position={[10, -4, 6]} intensity={0.6} color="#9ec5ff" />
    <Voxels active={active} />
  </Canvas>
);
