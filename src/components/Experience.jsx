import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import React, { useMemo, useEffect } from 'react'

const IMAGE_URL = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuUhTzrZZSzEyuHZxQukAgUjDj8GB0Q21t1ttCcmjMdg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprAzYX8p_1mmLFqfx7PtdqB5O3-rSp7EHK5H8M7LxysWfUOP1mNX8ow23&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuw5L2SppxazuaZCP2prOseRv97TC3M8utBDr6cWdAP6sajjzRJXPFUMH&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUgILWPAxBoJgYc3F-52V4mrNgnZkc7v_82GN7ttwjZGc24WZJYg2tHf0&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HwfbP3vgytOuGESGaJD1O77MFwzkL2UhfRrYH1w_Kw&s=10"
];


const CARD_H = .5;
const CARD_W = 1;
const RADIUS = 3;
const TOTAL_CARDS = IMAGE_URL.length;

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
      <planeGeometry args={[CARD_W, CARD_H,32,32] }/>
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Experience = () => {

    const texture = useTexture(IMAGE_URL);


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
    <group>
        {texture.map((texture, index) => {
                return <Card key= {IMAGE_URL[index]} index={index} texture={texture} />
        })}
    </group>
    </>
  )
}

export default Experience
