import { useFrame } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Merkabah = () => {
  const gltf = useLoader(GLTFLoader, 'merkabah/scene.gltf')
  return (
    <>
      <Suspense fallback={null}>
        <primitive object={gltf.scene}
          position={[0, 2, 0]}
          scale={[.005, .005, .005]}
          rotation={[0, Math.PI / 4, 0]}
        />
      </Suspense>
    </>
  )
}

export { Merkabah }