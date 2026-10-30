import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import React, { useMemo, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const IMAGE_URL = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwoqJMQHmK1De13DOQdN45qn3pVQmMSnVxDT1imEjlw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfefnPB5-XUOQZG9yg72piNQNdMSRPANXIswRz8e3KBLV9Z2NBtx-anLC7&s=10",
  "https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/09/luffy-gear-3.jpg?w=1200&h=900&fit=crop",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL8Wt3okh60ZuEnw5cWZv3aT3pisKyY4ijqrnQC_k2QqYllFtGARDfo7Xd&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJT_Fe_dr11ZHkGxTVlGzNLcUKSDwYOoX0dnEWdfAh1g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSwMJBdtUOnwVccCv98Cx5ZIXtNz-OGphQ6gMYX3hlxZhlDAwoAo1iGHw&s=10",
];

const CARD_H = 0.7;
const CARD_W = 1.4;
const RADIUS = 2;
const TOTAL_CARDS = IMAGE_URL.length;
const LERP_RATIO = 0.05;

const Card = ({ index, texture, scrollSpeedRef }) => {
  const angle = (index / TOTAL_CARDS) * Math.PI * 2;

  const position = useMemo(() => {
    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS;
    return [x, 0, z];
  }, [angle]);

  const rotation = [0, Math.PI / 2 - angle, 0];

  const uniforms = {
    uTexture: { value: texture },
    uScrollSpeed: { value: 0 },
  };

  const materialRef = useRef(null);
  useFrame(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uScrollSpeed.value = scrollSpeedRef.current;
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Experience = () => {
  const texture = useTexture(IMAGE_URL);

  const groupRef = useRef(0);

  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);

  const scrollSpeedRef = useRef(0);
  const targetScrollSpeedRef = useRef(0);

  const { gl } = useThree();

  const canvas = gl.domElement;
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      targetRotationRef.current += e.deltaY * 0.003;

      targetScrollSpeedRef.current = THREE.MathUtils.clamp(
        targetScrollSpeedRef.current + e.deltaY * 0.003,
        -0.6,
        0.6,
      );
    };
    canvas.addEventListener("wheel", handleScroll);

    return () => {
      canvas.removeEventListener("wheel", handleScroll);
    };
  }, [gl]);

  useFrame((state, delta) => {
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

    if (
      Math.abs(targetScrollSpeedRef.current) < 0.001 &&
      Math.abs(scrollSpeedRef.current) < 0.001
    ) {
      targetScrollSpeedRef.current = 0;
      scrollSpeedRef.current = 0;
    }
  });

  useEffect(() => {
    texture.forEach((tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
  }, [texture]);

  return (
    <>
      <group ref={groupRef}>
        {texture.map((texture, index) => {
          return (
            <Card
              scrollSpeedRef={scrollSpeedRef}
              key={IMAGE_URL[index]}
              index={index}
              texture={texture}
            />
          );
        })}
      </group>
    </>
  );
};

export default Experience;
