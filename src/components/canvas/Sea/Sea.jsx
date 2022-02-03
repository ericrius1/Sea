import useStore from '@/helpers/store'
import { Plane, shaderMaterial, Stars, Stage } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { Leva, folder, useControls } from 'leva'
import Pyramid from '@/components/Pyramid'
import Merkaba from '@/components/Merkaba'
import guid from 'short-uuid'
import { Color } from 'three'

import { Stats } from '@react-three/drei'

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'


//TOTO get shader material working
const SeaComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  const box = useRef(null)
  const ocean = useRef(null)
  const {
    animate,
    bigWavesElevation,
    bigWavesFrequency,
    bigWaveSpeed,
    surfaceColor,
    depthColor,
    colorOffset,
    colorMultiplier,
    smallWavesElevation,
    smallWavesFrequency,
    smallWavesSpeed,
    smallIterations
  } = useControls({
    animate: true,
    colors: folder({ surfaceColor: '#c1e4fe', depthColor: '#0066b3', colorOffset: 0.08, colorMultiplier: 1.4 }),
    bigWaves: folder({ bigWavesElevation: 0.8, bigWavesFrequency: [0.2, 0.7,], bigWaveSpeed: 0.75 }),
    smallWaves: folder({ smallWavesElevation: 0.15, smallWavesFrequency: 3, smallWavesSpeed: 0.2, smallIterations: 4 }),
  })

  const shaderRef = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    box.current
      ? (box.current.rotation.y = box.current.rotation.x += 0.01)
      : null

    animate && (shaderRef.current.uTime += delta)
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Stats></Stats>
      <Leva
        hidden
      />
      <Plane args={[200, 200, 1026, 1026]}
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0.5, 0]}
        ref={ocean}>
        <seaMaterial
          key={SeaMaterial.key}
          ref={shaderRef}
          uBigWavesElevation={bigWavesElevation}
          uBigWavesFrequency={bigWavesFrequency}
          uBigWavesSpeed={bigWaveSpeed}
          uSurfaceColor={surfaceColor}
          uDepthColor={depthColor}
          uColorOffset={colorOffset}
          uColorMultiplier={colorMultiplier}
          uSmallWavesElevation={smallWavesElevation}
          uSmallWavesFrequency={smallWavesFrequency}
          uSmallWavesSpeed={smallWavesSpeed}
          uSmallIterations={smallIterations}
        />
      </Plane>

      <Stars radius={100} depth={50} count={10000} factor={4} saturation={10} fade />
      <color attach="background" args={['#141852']} />
      <Suspense fallback={null}>
        <Merkaba
          scale={.02}
          rotation={[Math.PI / 4, 0, 0]}
        >
        </Merkaba>
      </Suspense>

      <Pyramid />


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

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
SeaMaterial.key = guid.generate();

extend({ SeaMaterial })

export default SeaComponent
