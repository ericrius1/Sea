import { useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";


export default function Pyramid({ ...props }) {
  const [active, setActive] = useState(false);
  const { scale, rotation } = useSpring({
    loop: true,
    scale: active ? 1.5 : 1,
    rotation: active ? [Math.random() * 3, Math.random() * 3, Math.random() * 3] : [Math.random(), Math.random(), Math.random()],
    config: config.wobblt
  })
  return (
    <animated.mesh
      position={[0,
        5, 0]}
      scale={scale}
      rotation={rotation}
      onClick={() => setActive(!active)}
    >
      <cylinderGeometry args={[0, 2.3, 3, 3, 10]}
      ></cylinderGeometry>
      <meshPhysicalMaterial color="#ffa537" />
    </animated.mesh>
  )

}