import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const Three = () => {
  return (
    <div>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  )
}

export default Three
