import * as THREE from 'three';

import Experience from '../Experience.js';

import gamenVertexShader from '../../Shaders/Gamen/vertex.glsl';
import gamenFragmentShader from '../../Shaders/Gamen/fragment.glsl';

export default class Gamen {
  constructor(gamenParams) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.ueBreathingElevation = gamenParams.ueBreathingElevation;
    this.shitaBreathingElevation = gamenParams.shitaBreathingElevation;
    this.ueBreathingFrequency = gamenParams.ueBreathingFrequency;
    this.shitaBreathingFrequency = gamenParams.shitaBreathingFrequency;
    this.ueBreathingSpeed = gamenParams.ueBreathingSpeed;
    this.shitaBreathingSpeed = gamenParams.shitaBreathingSpeed;
    this.shitaBreathingIterations = gamenParams.shitaBreathingIterations;
    this.color = gamenParams.color;
    this.opacity = gamenParams.opacity;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(0.9, 1.9, 32, 32);
  }

  // setTextures() {
  //   this.textures = {};
  // }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: gamenVertexShader,
      fragmentShader: gamenFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },

        uUeBreathingElevation: { value: this.ueBreathingElevation },
        uUeBreathingFrequency: {
          value: new THREE.Vector2(
            Object.values(this.ueBreathingFrequency)[0],
            Object.values(this.ueBreathingFrequency)[1]
          ),
        },
        uUeBreathingSpeed: { value: this.ueBreathingSpeed },

        uShitaBreathingElevation: { value: this.shitaBreathingElevation },
        uShitaBreathingFrequency: { value: this.shitaBreathingFrequency },
        uShitaBreathingSpeed: { value: this.shitaBreathingSpeed },
        uShitaBreathingIterations: { value: this.shitaBreathingIterations },

        uColor: { value: new THREE.Color(this.color) },
        uOpacity: { value: this.opacity },
      },
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = this.geometry.parameters.height / 2;
  }
}
