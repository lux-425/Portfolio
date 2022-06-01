uniform float uTime;

uniform float uUeBreathingElevation;
uniform vec2 uUeBreathingFrequency;
uniform float uUeBreathingSpeed;

uniform float uShitaBreathingElevation;
uniform float uShitaBreathingFrequency;
uniform float uShitaBreathingSpeed;
uniform float uShitaBreathingIterations;

uniform vec3 uColor;
uniform float uOpacity;

#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

//	Perlin Noise 
float rand(vec2 c) {
  return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p, float freq) {
  // float unit = screenWidth / freq;
  float unit = 1.0 / freq;
  vec2 ij = floor(p / unit);
  vec2 xy = mod(p, unit) / unit;
	// xy = 3.*xy*xy-2.*xy*xy*xy;
  xy = .5 * (1. - cos(PI * xy));
  float a = rand((ij + vec2(0., 0.)));
  float b = rand((ij + vec2(1., 0.)));
  float c = rand((ij + vec2(0., 1.)));
  float d = rand((ij + vec2(1., 1.)));
  float x1 = mix(a, b, xy.x);
  float x2 = mix(c, d, xy.x);
  return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res) {
  float persistance = .5;
  float n = 0.;
  float normK = 0.;
  float f = 4.;
  float amp = 1.;
  int iCount = 0;
  for(int i = 0; i < 50; i++) {
    n += amp * noise(p, f);
    f *= 2.;
    normK += amp;
    amp *= persistance;
    if(iCount == res)
      break;
    iCount++;
  }
  float nf = n / normK;
  return nf * nf * nf * nf;
}

void main() {
  vec3 uvColor = vec3(vUv, 1.0);

  int res = 3;

  float breathing = sin(uvColor.y * uUeBreathingFrequency.x + uTime * uUeBreathingSpeed) * sin(uvColor.y * uUeBreathingFrequency.y + uTime * uUeBreathingSpeed) * uUeBreathingElevation;
  for(float i = 1.0; i <= uShitaBreathingIterations; i++) {
    breathing *= abs(pNoise(vec2(-uvColor.xy * (uShitaBreathingFrequency * i * uShitaBreathingSpeed)), res) * uShitaBreathingElevation);
  }
  float strength = 1.0 - abs(pNoise(breathing / uvColor.xy, res));

  // Clamp the strength
  strength = clamp(strength, 0.0, 1.0);

  vec3 mixedColor = mix(uColor, uvColor, strength / breathing);

  /**
  */
  gl_FragColor = vec4(mixedColor, strength * uOpacity);

}