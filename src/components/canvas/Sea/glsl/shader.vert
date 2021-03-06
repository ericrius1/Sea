#pragma glslify: cnoise2 = require(glsl-noise/classic/2d.glsl)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl)
uniform float uTime;
uniform float uBigWavesElevation;
uniform float uBigWavesSpeed;
uniform vec2 uBigWavesFrequency;


varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
    sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
    (cnoise3(vec3(modelPosition.xz / 5.0, (uTime / 5.0))) * 2.0) * uBigWavesElevation;

  modelPosition.y += elevation;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  vElevation = elevation;
}