import useStore from '@/helpers/store'
import { Plane, shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import Merkaba from '../merkaba'
import guid from 'short-uuid'
import { Color } from 'three'

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'

const SeaComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  // const gltf = useLoader(GLTFLoader, 'merkabah/scene.gltf')
  // This reference will give us direct access to the THREE.Mesh object
  const box = useRef(null)
  const ocean = useRef(null)


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

  }
  )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Plane args={[200, 200, 1026, 1026]}
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0.5, 0]}
        ref={ocean}>
        <meshPhysicalMaterial color='purple' wireframe />
      </Plane>
      <Suspense fallback={null}>
        <Merkaba
          scale={.02}
          rotation={[Math.PI / 4, 0, 0]}
        >

        </Merkaba>
      </Suspense>

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

const SeaMaterial = new shaderMaterial(
  {
    uTime: 1,
    uBigWavesElevation: 0.8,
    uBigWavesFrequency: [0.2, 0.7],
    uBigWavesSpeed: 0.75,
    uSurfaceColor: new Color('#c1e4fe'),
    uDepthColor: new Color('#0066b3'),
    uColorOffset: 0.08,
    uColorMultiplier: 1.4,
    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 4,
  },
  vertex,
  fragment
)

// SeaMaterial.key = Math.random();

// extend({ SeaMaterial })

export default SeaComponent
