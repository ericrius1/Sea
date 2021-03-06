import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useEffect, useRef, Suspense } from 'react'
import { EffectComposer, SSAO } from 'three-stdlib'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} zoomSpeed={.2} target={[0, 3, 0]} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      // frameloop='demand'
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{ position: [0, 3, 6], fov: 25, far: 10000 }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      {/* <EffectComposer multisampling={0}>
        <SSAO samples={31} radius={10} intensity={20} luminanceInfluence={0.1} color="red" />
      </EffectComposer> */}
      <Suspense fallback={null}>
        <LControl />
        <Preload all />
        {children}
      </Suspense>
    </Canvas>
  )
}

export default LCanvas
