import useStore from '@/helpers/store'
import { Plane, shaderMaterial, Stars, Stage } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { Leva, folder, useControls } from 'leva'
import Pyramid from '@/components/Pyramid'
import Merkaba from '@/components/Merkaba'
import { Particles } from '@/components/Particles/Particles'
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
    colorMultiplier
  } = useControls({
    animate: true,
    colors: folder({ surfaceColor: '#ffd183', depthColor: '#0066b3', colorOffset: 0.08, colorMultiplier: 2.4 }),
    bigWaves: folder({ bigWavesElevation: 1.8, bigWavesFrequency: [0.2, 0.7,], bigWaveSpeed: 0.75 }),
  })


  // const props = 

  const shaderRef = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // animate && (shaderRef.current.uTime += delta)
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Stats></Stats>
      {/* <Leva/> */}
      {/* <Plane args={[100, 100, 100, 100]}
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0.5, 0]}
        ref={ocean}>
        <seaMaterial
          key={SeaMaterial.key}
          ref={shaderRef}
          // wireframe
          uBigWavesElevation={bigWavesElevation}
          uBigWavesFrequency={bigWavesFrequency}
          uBigWavesSpeed={bigWaveSpeed}
          uSurfaceColor={surfaceColor}
          uDepthColor={depthColor}
          uColorOffset={colorOffset}
          uColorMultiplier={colorMultiplier}
        />
      </Plane> */}

      {/* <Stars radius={100} depth={50} count={10000} factor={4} saturation={10} fade /> */}
      <color attach="background" args={['#141852']} />
      <Suspense fallback={null}>
        <Merkaba
          scale={.02}
          rotation={[Math.PI / 4, 0, 0]}
        >
        </Merkaba>
      </Suspense>

      {/* <Pyramid /> */}
      {/* <Particles
        focus={5.1}
        speed={0.07}
        aperture={1.8}
        fov={60}
        curl={0.11}
        position={[0, 3, 0]}
        size={512}
      /> */}



      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}

const SeaMaterial = new shaderMaterial(
  {
    uTime: 1,
    uBigWavesElevation: 20.1,
    uBigWavesFrequency: [1, 1],
    uBigWavesSpeed: 0.12,
    uSurfaceColor: new Color('#ffe4a3'), //=> morph to #ffd9c2 on beat or something like that
    uDepthColor: new Color('#0066b3'),
    uColorOffset: 0.08,
    uColorMultiplier: 2.4,
    uSmallWavesElevation: 1,
    uSmallWavesFrequency: .1,
    uSmallWavesSpeed: 0.10,
    uSmallIterations: 2,
  },
  vertex,
  fragment
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
SeaMaterial.key = guid.generate();

extend({ SeaMaterial })

export default SeaComponent
