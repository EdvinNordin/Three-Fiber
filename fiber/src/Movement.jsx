import React, { useState, useEffect, useRef } from "react";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export default function move(angleRef) {
  let forwardBool,
    backwardBool,
    leftBool,
    rightBool = false;

  /*function clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
  }*/

  function applyQuaternion(vec, quat) {
    const x = vec.x,
      y = vec.y,
      z = vec.z;
    const qx = quat.x,
      qy = quat.y,
      qz = quat.z,
      qw = quat.w;

    // calculate quat * vec
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    vec.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    vec.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    vec.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return vec;
  }
  const getSphericalCoordinates = (angleRef) => {
    if (angleRef.current) {
      const spherical = angleRef.current.getSpherical();
      return spherical;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  });

  function handleKeyDown(event) {
    if (event.key === "w") {
      forwardBool = true;
    }
    if (event.key === "s") {
      backwardBool = true;
    }
    if (event.key === "a") {
      leftBool = true;
    }
    if (event.key === "d") {
      rightBool = true;
    }

    console.log(getSphericalCoordinates(angleRef));
  }

  function handleKeyUp(event) {
    if (event.key === "w") {
      forwardBool = false;
    }
    if (event.key === "s") {
      backwardBool = false;
    }
    if (event.key === "a") {
      leftBool = false;
    }
    if (event.key === "d") {
      rightBool = false;
    }
  }
}
