// Author @patriciogv - 2015
// Title: Ikeda Data Stream

// Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.
//
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

#define PI 3.14159265359

uniform float uTime;

uniform vec3 uColor;
uniform float uOpacity;
uniform float uOpacityColor;

uniform float uSpeed;
uniform float uMargin;

varying vec2 vUv;

float random(in float x) {
  return fract(sin(x) * 1e4);
}

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
  vec2 p = floor(st + v);
  return step(t, random(100. + p * .000001) + random(p.x) * 0.5);
}

void main() {
  vec2 st = vUv;

  vec2 grid = vec2(50.0, 25.);
  st *= grid;

  vec2 ipos = floor(st);  // integer
  vec2 fpos = fract(st);  // fraction

  vec2 vel = vec2(uTime * uSpeed * max(grid.x, grid.y)); // time
  vel *= vec2(0.0, -1.) * random(1.0 + ipos.x); // direction

  // Assign a random value base on the integer coord
  vec2 offset = vec2(0.1, 0.);

  vec3 color = vec3(0.);
  color.r = pattern(st + offset, vel, uColor.r);
  color.g = pattern(st + offset, vel, uColor.g);
  color.b = pattern(st + offset, vel, uColor.b);

  // Margins
  color /= step(uMargin, fpos.x);

  gl_FragColor = vec4(uOpacityColor - color, uOpacity);
}
