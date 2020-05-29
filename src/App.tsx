import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import { setupScene, setupCamera, setupRenderer } from "./threeSetup";
import useWindowSize from "./hooks/useWindowSize";

import "./App.css";

let frameId: number | null;

// Setup Scene, Camera & Renderer for Three.js
// For details of how to setup each component
// Please check ./three/index.ts file
const scene = setupScene(0x000000);
const camera = setupCamera(window.innerWidth, window.innerHeight);
camera.position.z = 5;
const renderer = setupRenderer(window.innerWidth, window.innerHeight);

// Create BoxGeometry and add to the scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

camera.lookAt(box.position);

const renderScene = () => renderer.render(scene, camera);

// Animation functions
const rotate = (object: THREE.Mesh, speed: number) => {
  object.rotation.x += speed;
  object.rotation.y += speed;
};

const App = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  const onWindowResize = (width: number, height: number) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    frameId = window.requestAnimationFrame(animate);
    rotate(box, 0.01);
    renderScene();
  };

  const start = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(animate);
    }
  };

  const stop = () => {
    frameId && cancelAnimationFrame(frameId);
    frameId = null;
  };

  useEffect(() => {
    onWindowResize(width, height);

    start();

    const divEl = divRef.current;
    divEl?.appendChild(renderer.domElement);

    return () => {
      stop();
      divEl?.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  return <div ref={divRef} className="three-container"></div>;
};

export default App;
