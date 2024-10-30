import { Box, Torus, Sphere, CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react";

export default function Scene() {
return (
    <div style={{ height: "100vh", width: "100vw" }}>
    <Canvas>
      <Suspense>
        <CameraControls />
          <Physics debug>
          <RigidBody colliders={"hull"} restitution={0}>
            <Box />
          </RigidBody>
          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
        </Physics>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Suspense>
    </Canvas>
    </div>
);
}