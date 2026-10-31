import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import React, { useMemo, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { IMAGE_URL } from "../data/cards.js";

const CARD_H = 0.7;
const CARD_W = 1.4;
const RADIUS = 2;
const TOTAL_CARDS = IMAGE_URL.length;
const PLANE_ASPECT = CARD_W / CARD_H;
const HALF_HEIGHT = CARD_H / 2;

const Card = ({ index, texture, scrollSpeedRef, dragRef, onSelect }) => {
  const angle = (index / TOTAL_CARDS) * Math.PI * 2;
  const materialRef = useRef(null);

  const position = useMemo(() => {
    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS;
    return [x, 0, z];
  }, [angle]);

  const rotation = [0, Math.PI / 2 - angle, 0];

  const imageAspect = useMemo(() => {
    const image = texture?.image;
    if (!image || !image.width || !image.height) return PLANE_ASPECT;
    return image.width / image.height;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScrollSpeed: { value: 0 },
      uHalfHeight: { value: HALF_HEIGHT },
      uPlaneAspect: { value: PLANE_ASPECT },
      uImageAspect: { value: imageAspect },
    }),
    [texture, imageAspect],
  );

  useFrame(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uScrollSpeed.value = scrollSpeedRef.current;
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (dragRef.current) return;
        onSelect(index);
      }}
    >
      <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        toneMapped={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Experience = ({ onSelect }) => {
  const textures = useTexture(IMAGE_URL);

  const groupRef = useRef(null);
  const dragRef = useRef(false);

  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);

  const scrollSpeedRef = useRef(0);
  const targetScrollSpeedRef = useRef(0);

  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    const applyDelta = (deltaY) => {
      targetRotationRef.current += deltaY * 0.003;
      targetScrollSpeedRef.current = THREE.MathUtils.clamp(
        targetScrollSpeedRef.current + deltaY * 0.003,
        -0.6,
        0.6,
      );
    };

    const onWheel = (event) => {
      event.preventDefault();
      applyDelta(event.deltaY);
    };

    let lastTouchY = 0;
    const onTouchStart = (event) => {
      lastTouchY = event.touches[0].clientY;
    };
    const onTouchMove = (event) => {
      if (event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      const delta = lastTouchY - y;
      if (Math.abs(delta) < 2) return;
      event.preventDefault();
      applyDelta(delta);
      lastTouchY = y;
    };

    let dragging = false;
    let lastPointerY = 0;
    const onPointerDown = (event) => {
      if (event.target.closest("a, nav, footer, [data-card-details]")) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      dragRef.current = false;
      lastPointerY = event.clientY;
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const delta = lastPointerY - event.clientY;
      if (Math.abs(delta) > 6) dragRef.current = true;
      applyDelta(delta);
      lastPointerY = event.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };

    const onMouseMove = (event) => {
      targetMouseRef.current.x =
        (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseRef.current.y =
        (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    textures.forEach((tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
  }, [textures]);

  useFrame((state, delta) => {
    const targetZ = state.size.width / state.size.height < 0.85 ? 6.8 : 5;
    if (Math.abs(state.camera.position.z - targetZ) > 0.01) {
      state.camera.position.z = targetZ;
      state.camera.updateProjectionMatrix();
    }

    if (!groupRef.current) return;

    currentRotationRef.current = THREE.MathUtils.damp(
      currentRotationRef.current,
      targetRotationRef.current,
      5,
      delta,
    );
    groupRef.current.rotation.y = currentRotationRef.current;

    scrollSpeedRef.current = THREE.MathUtils.damp(
      scrollSpeedRef.current,
      targetScrollSpeedRef.current,
      8,
      delta,
    );

    targetScrollSpeedRef.current *= Math.exp(-5 * delta);

    groupRef.current.rotation.x +=
      (targetMouseRef.current.y * 0.15 - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.z +=
      (-targetMouseRef.current.x * 0.08 - groupRef.current.rotation.z) * 0.1;

    if (
      Math.abs(targetScrollSpeedRef.current) < 0.001 &&
      Math.abs(scrollSpeedRef.current) < 0.001
    ) {
      targetScrollSpeedRef.current = 0;
      scrollSpeedRef.current = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => (
        <Card
          key={IMAGE_URL[index]}
          index={index}
          texture={texture}
          scrollSpeedRef={scrollSpeedRef}
          dragRef={dragRef}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
};

export default Experience;
