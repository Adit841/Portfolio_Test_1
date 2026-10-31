import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { OrbitControls } from '@react-three/drei'

const Three = () => {
  return (
    <div className=' fixed top-0 left-0 z-[60] h-screen w-full'>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
      >
      {/* <OrbitControls/> */}
        <Experience />
      </Canvas>
    </div>
  )
}

export default Three
