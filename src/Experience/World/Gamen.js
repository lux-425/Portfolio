import * as THREE from 'three';

import Experience from '../Experience.js';

import gamenVertexShader from '../../Shaders/Gamen/vertex.glsl';
import gamenFragmentShader from '../../Shaders/Gamen/fragment.glsl';

export default class Gamen {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    this.debugObject = {};

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('gamen');
      this.setDebug();
      this.debugFolder.close()
    }
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

        uUeBreathingElevation: { value: 0.44 },
        uUeBreathingFrequency: { value: new THREE.Vector2(1.24, 2.4) },
        uUeBreathingSpeed: { value: -0.8 },

        uShitaBreathingElevation: { value: 10.0 },
        uShitaBreathingFrequency: { value: 5.0 },
        uShitaBreathingSpeed: { value: 0.3 },
        uShitaBreathingIterations: { value: 3 },
      },
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = this.geometry.parameters.height / 2;
  }



  setDebug() {
    this.debugFolder
      .add(this.material.uniforms.uUeBreathingElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uUeBreathingElevation');
    this.debugFolder
      .add(this.material.uniforms.uShitaBreathingElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uShitaBreathingElevation');
    this.debugFolder
      .add(this.material.uniforms.uUeBreathingFrequency.value, 'x')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uUeBreathingFrequencyX');
    this.debugFolder
      .add(this.material.uniforms.uUeBreathingFrequency.value, 'y')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uUeBreathingFrequencyY');
    this.debugFolder
      .add(this.material.uniforms.uShitaBreathingFrequency, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uShitaBreathingFrequency');
    this.debugFolder
      .add(this.material.uniforms.uUeBreathingSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uUeBreathingSpeed');
    this.debugFolder
      .add(this.material.uniforms.uShitaBreathingSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uShitaBreathingSpeed');
    this.debugFolder
      .add(this.material.uniforms.uShitaBreathingIterations, 'value')
      .min(0)
      .max(4)
      .step(1)
      .name('uShitaBreathingIterations');
  }
}
