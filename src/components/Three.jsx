import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const Three = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default Three
