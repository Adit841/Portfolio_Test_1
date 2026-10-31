import React, { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import Experience from "./Experience.jsx";

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <p className="m-0 text-sm uppercase tracking-wide">
        Loading {Math.round(progress)}%
      </p>
    </Html>
  );
};

const Three = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-dvh w-full [&_*]:!pointer-events-none"
    >
      <SceneErrorBoundary
        fallback={
          <div className="flex h-full items-center justify-center">
            <p className="text-sm uppercase">Could not load 3D scene</p>
          </div>
        }
      >
        <Canvas
          gl={{ alpha: true }}
          camera={{
            position: [0, 0, 5],
            fov: 50,
          }}
        >
          <SceneErrorBoundary
            fallback={
              <Html center>
                <p className="m-0 text-sm uppercase">Could not load 3D scene</p>
              </Html>
            }
          >
            <Suspense fallback={<Loader />}>
              <Experience />
            </Suspense>
          </SceneErrorBoundary>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
};

export default Three;
