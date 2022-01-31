import useStore from '@/helpers/store'
import { Plane, PositionalAudio, shaderMaterial, OrbitControls, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { Merkabah } from '../merkabah'

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'

const SeaComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  // const gltf = useLoader(GLTFLoader, 'merkabah/scene.gltf')
  // This reference will give us direct access to the THREE.Mesh object
  const box = useRef(null)
  const ocean = useRef(null)
  const merkaba = useRef(null);

  const gltf = useLoader(GLTFLoader, '/merkaba/scene.gltf')

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    box.current
      ? (box.current.rotation.y = box.current.rotation.x += 0.01)
      : null
    // ocean.current
    //   ? (ocean.current.rotation.z += hovered ? -0.01 : 0)
    //   : null
    if (merkaba.current && hovered) {
      merkaba.current.rotation.x += 0.004;
      merkaba.current.rotation.y -= 0.01;
      merkaba.current.rotation.z -= 0.002;

    }
  }
  )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Plane args={[200, 200, 1026, 1026]}
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0, 0]}
        ref={ocean}>
        <meshPhysicalMaterial color='purple' wireframe />
      </Plane>
      <primitive object={gltf.scene}
        ref={merkaba}
        position={[0, 1, 0]}
        scale={[.05, .05, .05]}
      // rotation={hovered? :[0, Math.PI / 4, 0]}

      />
      <mesh
        ref={box}
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
