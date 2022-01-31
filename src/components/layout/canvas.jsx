import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useEffect, useRef, Suspense } from 'react'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} zoomSpeed={.2} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{ position: [0, 3, 8], fov: 75, far: 10000 }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <Suspense fallback={null}>
        <LControl />
        <Preload all />
        {children}
      </Suspense>
    </Canvas>
  )
}

export default LCanvas
