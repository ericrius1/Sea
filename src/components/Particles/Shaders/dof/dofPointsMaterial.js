import * as THREE from 'three'
import { extend } from '@react-three/fiber'

import vertex from './shader.vert'
import fragment from './shader.frag'

class DofPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        positions: { value: null },
        uTime: { value: 0 },
        uFocus: { value: 5.1 },
        uFov: { value: 50 },
        uBlur: { value: 30 }
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    })
  }
}

extend({ DofPointsMaterial })
