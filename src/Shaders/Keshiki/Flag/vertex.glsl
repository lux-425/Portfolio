uniform float uTime;

varying vec2 vUv;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.z += sin(modelPosition.x * 2.0 - uTime * 2.2) * 0.55;

  vec4 projectedPosition = projectionMatrix * (viewMatrix * modelPosition);

  gl_Position = projectedPosition;

      // UV mapping!
  vUv = uv;

}