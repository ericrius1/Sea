import useStore from '@/helpers/store'
import { Plane, shaderMaterial, Stars, Stage } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState, Suspense, useEffect } from 'react'
import { Leva, folder, useControls } from 'leva'
import Pyramid from '@/components/Pyramid'
import Merkaba from '@/components/Merkaba'
import { Particles } from '@/components/Particles/Particles'
import guid from 'short-uuid'
import { Color } from 'three'
import { useSpring, animated, config } from "@react-spring/three";


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
    colors: folder({ surfaceColor: '#ffd183', depthColor: '#0066b3', colorOffset: 0.08, colorMultiplier: 0.7 }),
    bigWaves: folder({ bigWavesElevation: 1.8, bigWavesFrequency: [0.2, 0.44,], bigWaveSpeed: 0.01 }),
  })

  const [particleProps, set] = useControls(() => ({
    focus: { value: 5.1, min: 3, max: 7, step: 0.01 },
    speed: { value: 0.1, min: 0.1, max: 100, step: 0.1 },
    aperture: { value: 3.5, min: 1, max: 5.6, step: 0.1 },
    fov: { value: 60, min: 0, max: 200 },
    curl: { value: 0.01, min: 0.001, max: 1, step: 0.0001 },
    position: { value: [0, 3, 0] }
  }))

  // TODO: get change in curl valu entegrated with react spring



  const { shnur } = useSpring({ config: { duration: 10000 }, shnur: 1 })
  useEffect(() => {
    shnur.start({ from: 0, to: 1 })
    set({ curl: shnur })
  })

  const shaderRef = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    animate && (shaderRef.current.uTime += delta)

  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Stats></Stats>
      {/* <Leva/> */}
      <Plane args={[200, 200, 512, 512]}
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
      </Plane>

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
      <Particles
        {...particleProps}
      // position={[0, 3, 0]}

      />

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
