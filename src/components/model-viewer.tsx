import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Group } from "three";

function Model() {
  const glb = useGLTF("/humanoid_robot_ai.glb");
  const modelRef = useRef<Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.025;
    }
  });

  return <primitive ref={modelRef} object={glb.scene} scale={3} />;
}


export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0.7, 5] }}>
      <ambientLight />
      <directionalLight position={[2, 2, 0]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </Canvas>
  );
}
