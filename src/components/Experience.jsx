import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import React, { useMemo, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const IMAGE_URL = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwoqJMQHmK1De13DOQdN45qn3pVQmMSnVxDT1imEjlw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfefnPB5-XUOQZG9yg72piNQNdMSRPANXIswRz8e3KBLV9Z2NBtx-anLC7&s=10",
  "https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/09/luffy-gear-3.jpg?w=1200&h=900&fit=crop",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL8Wt3okh60ZuEnw5cWZv3aT3pisKyY4ijqrnQC_k2QqYllFtGARDfo7Xd&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJT_Fe_dr11ZHkGxTVlGzNLcUKSDwYOoX0dnEWdfAh1g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSwMJBdtUOnwVccCv98Cx5ZIXtNz-OGphQ6gMYX3hlxZhlDAwoAo1iGHw&s=10",

];

const CARD_H = 0.5;
const CARD_W = 1;
const RADIUS = 2;
const TOTAL_CARDS = IMAGE_URL.length;
const LERP_RATIO = 0.05;

const Card = ({ index, texture }) => {
  const angle = (index / TOTAL_CARDS) * Math.PI * 2;

  const position = useMemo(() => {
    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS;
    return [x, 0, z];
  }, angle);

  const rotation = [0, Math.PI / 2 - angle, 0];

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Experience = () => {
  const texture = useTexture(IMAGE_URL);

  const groupRef = useRef(0);

  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);

  const { gl } = useThree();

  const canvas = gl.domElement;
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      targetRotationRef.current += e.deltaY * 0.03;
    };
    canvas.addEventListener("wheel", handleScroll);

    return () => {
      canvas.removeEventListener("wheel", handleScroll);
    };
  }, [gl]);

  useFrame(() => {
    if (!groupRef.current) return;

    currentRotationRef.current +=
      (targetRotationRef.current - currentRotationRef.current) * LERP_RATIO;

    groupRef.current.rotation.y = currentRotationRef.current;
  });

  useEffect(() => {
    texture.forEach((texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    });
  }, [texture]);

  return (
    <>
      <group ref={groupRef}>
        {texture.map((texture, index) => {
          return (
            <Card key={IMAGE_URL[index]} index={index} texture={texture} />
          );
        })}
      </group>
    </>
  );
};

export default Experience;
