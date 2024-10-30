import { Box, CameraControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Suspense, useMemo, useRef } from "react";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import * as THREE from "three";
import Move from "./Movement";

function RhinoModel() {
  const object = useLoader(
    Rhino3dmLoader,
    "src/assets/baken_mesh_color-var1.3dm",
    (loader) => {
      loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0/");
    }
  );
  object.rotation.set(-Math.PI / 2, 0, 0);
  object.position.set(0, 0, -10);
  var scale = 0.001;
  object.scale.set(scale, scale, scale);
  return <primitive object={object} dispose={null} />;
}

export default function Scene() {
  var cameraControlsRef = useRef();
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas>
        <Suspense>
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 0, 5]} />
          <CameraControls ref={cameraControlsRef} />
          <Physics debug>
            <RigidBody colliders={"hull"} restitution={0}></RigidBody>
            <RhinoModel />
            <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
            <Move angle={cameraControlsRef} />
          </Physics>
        </Suspense>
      </Canvas>
      <button onClick={() => getSphericalCoordinates(cameraControlsRef)}>
        Get Spherical Coordinates
      </button>
    </div>
  );
}
