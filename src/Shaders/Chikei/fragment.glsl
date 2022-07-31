uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

varying float vElevation;

void main() {
  float mixStrength = (vElevation + 0.55);

  gl_FragColor = vec4(mix(uDepthColor, uSurfaceColor, mixStrength), 1.0);
}