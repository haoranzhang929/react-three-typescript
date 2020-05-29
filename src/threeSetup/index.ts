import { Scene, Color, PerspectiveCamera, WebGLRenderer } from "three";

export const setupScene = (bgColor: string | number | Color | undefined) => {
  const scene = new Scene();
  scene.background = new Color(bgColor);
  return scene;
};

export const setupCamera = (windowWidth: number, windowHeight: number) =>
  new PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);

export const setupRenderer = (windowWidth: number, windowHeight: number) => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(windowWidth, windowHeight);
  return renderer;
};
