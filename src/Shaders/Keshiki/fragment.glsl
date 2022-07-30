uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;

varying float vElevation;

void main() {
  float mixStrength = (vElevation + uColorOffset) * 5.0;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

  gl_FragColor = vec4(color, 1.0);
}