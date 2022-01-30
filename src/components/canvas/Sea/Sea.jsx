import useStore from '@/helpers/store'
import { Plane, PositionalAudio, shaderMaterial, OrbitControls, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'


import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'

const SeaComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Plane args={[200, 200, 1026, 1026]} receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <meshPhysicalMaterial color='purple' />
      </Plane>
      <mesh
        ref={mesh}
        onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color={route === '/' ? 'orange' : 'hotpink'} />
      </mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />

    </>
  )
}
export default SeaComponent
