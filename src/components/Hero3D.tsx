import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface Hero3DProps {
  isDark: boolean;
}

type Point = [number, number, number];

// Bar between two points, oriented and sized to span them.
function Bar({
  from,
  to,
  thickness,
  depth,
  material,
}: {
  from: Point;
  to: Point;
  thickness: number;
  depth: number;
  material: THREE.Material;
}) {
  const { position, quaternion, length } = useMemo(() => {
    const f = new THREE.Vector3(...from);
    const dir = new THREE.Vector3(...to).sub(f);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(1, 0, 0),
      dir.clone().normalize(),
    );
    return {
      position: f.addScaledVector(dir, 0.5),
      quaternion,
      length: dir.length(),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion} material={material}>
      <boxGeometry args={[length, thickness, depth]} />
    </mesh>
  );
}

// Round joint filling the gap where two angled bars meet at a point.
function Joint({
  at,
  thickness,
  depth,
  material,
}: {
  at: Point;
  thickness: number;
  depth: number;
  material: THREE.Material;
}) {
  return (
    <mesh position={at} rotation={[Math.PI / 2, 0, 0]} material={material}>
      <cylinderGeometry args={[thickness / 2, thickness / 2, depth, 24]} />
    </mesh>
  );
}

function CodeBrackets({ material }: { material: THREE.Material }) {
  const h = 2.4;
  const armW = 1.3;
  const slashW = 0.9;
  const thickness = 0.34;
  const depth = 0.36;
  const gap = 0.3;
  const slot = armW / 2 + gap + slashW / 2;

  return (
    <group>
      <group position={[-slot, 0, 0]}>
        <Bar
          material={material}
          from={[armW / 2, h / 2, 0]}
          to={[-armW / 2, 0, 0]}
          thickness={thickness}
          depth={depth}
        />
        <Bar
          material={material}
          from={[-armW / 2, 0, 0]}
          to={[armW / 2, -h / 2, 0]}
          thickness={thickness}
          depth={depth}
        />
        <Joint
          material={material}
          at={[-armW / 2, 0, 0]}
          thickness={thickness}
          depth={depth}
        />
      </group>

      <Bar
        material={material}
        from={[-slashW / 2, -h / 2, 0]}
        to={[slashW / 2, h / 2, 0]}
        thickness={thickness}
        depth={depth}
      />

      <group position={[slot, 0, 0]}>
        <Bar
          material={material}
          from={[-armW / 2, h / 2, 0]}
          to={[armW / 2, 0, 0]}
          thickness={thickness}
          depth={depth}
        />
        <Bar
          material={material}
          from={[armW / 2, 0, 0]}
          to={[-armW / 2, -h / 2, 0]}
          thickness={thickness}
          depth={depth}
        />
        <Joint
          material={material}
          at={[armW / 2, 0, 0]}
          thickness={thickness}
          depth={depth}
        />
      </group>
    </group>
  );
}

// Tilts its children toward the cursor, easing back to center when idle.
function TiltGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.18;
    const targetX = -state.pointer.y * 0.14;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      4,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      4,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

const Hero3D = ({ isDark }: Hero3DProps) => {
  const roomEnvironment = useMemo(() => new RoomEnvironment(), []);
  const isDesktop = useIsDesktop();

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(isDark ? "#5EDDB8" : "#00A37A"),
        roughness: 0.06,
        metalness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.8,
      }),
    [isDark],
  );
  useEffect(() => () => material.dispose(), [material]);

  return (
    <Canvas
      className="w-full h-full"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7.5], fov: 42, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <Environment background={false}>
        <primitive object={roomEnvironment} />
      </Environment>

      <ambientLight intensity={0.35} />
      <pointLight
        position={[4, 4, 4]}
        intensity={4.5}
        distance={18}
        color={isDark ? "#5eddb8" : "#00c891"}
      />
      <pointLight
        position={[-4, -2, 3]}
        intensity={1.0}
        distance={18}
        color="#ffffff"
      />
      <pointLight
        position={[0, -3, -3.5]}
        intensity={2.2}
        distance={14}
        color="#4455ff"
      />

      <group position={[0, 0, 0]}>
        <TiltGroup>
          <CodeBrackets material={material} />
        </TiltGroup>
      </group>
    </Canvas>
  );
};

export default Hero3D;
