import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

const COUNT = 9000;

// ---------- target shapes ----------

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Points on a slightly thick spherical shell. */
function spherePoints(n: number, radius: number) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const r = radius * (0.97 + Math.random() * 0.06);
    const s = Math.sqrt(1 - u * u);
    out[i * 3] = r * s * Math.cos(phi);
    out[i * 3 + 1] = r * u;
    out[i * 3 + 2] = r * s * Math.sin(phi);
  }
  return out;
}

/** Points tracing the Kubernetes logo: heptagon, helm ring, hub, 7 spokes with handles. */
function wheelPoints(n: number, size: number) {
  const out = new Float32Array(n * 3);
  const sides = 7;
  const start = Math.PI / 2;
  const angle = (k: number) => start + (k * Math.PI * 2) / sides;
  const R = size; // heptagon
  const ring = size * 0.56;
  const hub = size * 0.13;
  const handle = size * 0.78;

  const put = (i: number, x: number, y: number, depth = 0.08) => {
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = rand(-depth, depth);
  };

  for (let i = 0; i < n; i++) {
    const pick = Math.random();
    if (pick < 0.3) {
      // heptagon outline (rounded-ish band)
      const k = Math.floor(Math.random() * sides);
      const t = Math.random();
      const a0 = angle(k);
      const a1 = angle(k + 1);
      const w = rand(-0.05, 0.05) * size;
      const x = THREE.MathUtils.lerp(Math.cos(a0), Math.cos(a1), t) * (R + w);
      const y = THREE.MathUtils.lerp(Math.sin(a0), Math.sin(a1), t) * (R + w);
      put(i, x, y);
    } else if (pick < 0.52) {
      // helm ring
      const a = Math.random() * Math.PI * 2;
      const r = ring + rand(-0.06, 0.06) * size;
      put(i, Math.cos(a) * r, Math.sin(a) * r);
    } else if (pick < 0.6) {
      // hub disc
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * hub;
      put(i, Math.cos(a) * r, Math.sin(a) * r);
    } else if (pick < 0.82) {
      // spokes, from hub to ring
      const a = angle(Math.floor(Math.random() * sides));
      const r = rand(hub, ring);
      const w = rand(-0.035, 0.035) * size;
      put(i, Math.cos(a) * r - Math.sin(a) * w, Math.sin(a) * r + Math.cos(a) * w);
    } else {
      // handles outside the ring, ending in a knob
      const a = angle(Math.floor(Math.random() * sides));
      if (Math.random() < 0.55) {
        const r = rand(ring, handle);
        const w = rand(-0.045, 0.045) * size;
        put(i, Math.cos(a) * r - Math.sin(a) * w, Math.sin(a) * r + Math.cos(a) * w);
      } else {
        const ka = Math.random() * Math.PI * 2;
        const kr = Math.sqrt(Math.random()) * size * 0.07;
        put(i, Math.cos(a) * handle + Math.cos(ka) * kr, Math.sin(a) * handle + Math.sin(ka) * kr);
      }
    }
  }
  return out;
}

// ---------- shaders ----------

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSpin;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aWheel;
  attribute vec3 aRandom;
  varying float vAlpha;

  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0., -s, c, 0., 0., 0., 1.); }

  void main() {
    // each particle starts its trip at a slightly different time
    float delay = aRandom.x * 0.45;
    float t = clamp((uProgress - delay) / 0.55, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 sphere = rotY(uSpin) * position;
    sphere += normalize(position) * sin(uTime * 0.8 + aRandom.y * 30.0) * 0.015;
    vec3 wheel = rotZ(uSpin * 0.35) * aWheel;

    vec3 pos = mix(sphere, wheel, t);
    // dissolve: particles scatter mid-flight, then regroup
    float scatter = sin(t * 3.14159);
    pos += (aRandom - 0.5) * 2.8 * scatter;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom.z * 0.9) / -mv.z;
    vAlpha = 0.35 + aRandom.y * 0.65;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d) * vAlpha;
    gl_FragColor = vec4(vec3(1.0), a);
  }
`;

// ---------- scene ----------

const Particles = ({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, camera, gl } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(spherePoints(COUNT, 1.9), 3));
    g.setAttribute("aWheel", new THREE.BufferAttribute(wheelPoints(COUNT, 2.0), 3));
    const r = new Float32Array(COUNT * 3);
    for (let i = 0; i < r.length; i++) r[i] = Math.random();
    g.setAttribute("aRandom", new THREE.BufferAttribute(r, 3));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSpin: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!material.current || !group.current) return;
    const u = material.current.uniforms;
    // keep the whole shape on screen on narrow (portrait) viewports
    const aspect = size.width / size.height;
    const targetZ = aspect < 1 ? 6.2 * Math.min(1.05 / aspect, 2.6) : 6.2;
    camera.position.z += (targetZ - camera.position.z) * 0.1;

    const p = progress.get();
    // morph happens in the middle of the pinned scroll
    const morph = THREE.MathUtils.clamp((p - 0.18) / 0.5, 0, 1);
    u.uProgress.value += (morph - u.uProgress.value) * 0.12;
    if (!reduceMotion) {
      u.uTime.value += delta;
      u.uSpin.value += delta * 0.12;
    }
    u.uPixelRatio.value = gl.getPixelRatio();

    // gentle parallax toward the pointer
    const px = state.pointer.x;
    const py = state.pointer.y;
    pointer.current.x += (px - pointer.current.x) * 0.05;
    pointer.current.y += (py - pointer.current.y) * 0.05;
    group.current.rotation.y = pointer.current.x * 0.25;
    group.current.rotation.x = -pointer.current.y * 0.15;
    // In the intro the sphere sits beside the name (right on wide screens, lower on phones),
    // then glides to centre as it becomes the wheel; finally drifts up as the scene ends.
    const settle = 1 - THREE.MathUtils.smoothstep(p, 0.08, 0.35);
    const wide = aspect > 1.1;
    const phone = aspect < 0.7;
    // on phones the sphere tucks in small below the buttons
    const introY = wide ? 0 : phone ? -4.6 : -1.4;
    const introScale = wide ? 0.88 : phone ? 0.6 : 0.75;
    group.current.position.x = (wide ? 1.75 : 0) * settle;
    group.current.position.y = introY * settle + THREE.MathUtils.clamp((p - 0.75) * 3, 0, 1) * 1.2;
    group.current.scale.setScalar(THREE.MathUtils.lerp(1, introScale, settle));
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const ParticleMorph = ({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) => (
  <Canvas
    camera={{ position: [0, 0, 6.2], fov: 45 }}
    dpr={[1, 2]}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    eventSource={typeof document !== "undefined" ? document.body : undefined}
    eventPrefix="client"
  >
    <Particles progress={progress} reduceMotion={reduceMotion} />
  </Canvas>
);
