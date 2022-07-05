import * as THREE from 'three';

import Experience from '../Experience.js';

import keshikiVertexShader from '../../shaders/Keshiki/vertex.glsl';
import keshikiFragmentShader from '../../shaders/Keshiki/fragment.glsl';

import * as dat from 'lil-gui';

export default class Keshiki {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    this.debugObject = {};
    this.debugObject.depthColor = '#b152ff';
    this.debugObject.surfaceColor = '#6600ff';

    this.setKeshiki();
    this.setAnimation();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('keshiki');
      this.setDebug();
      this.debugFolder.close();
    }
  }

  setKeshiki() {
    this.keshikiGeometry = new THREE.PlaneGeometry(15, 9, 128, 128);
    this.keshikiMaterial = new THREE.ShaderMaterial({
      vertexShader: keshikiVertexShader,
      fragmentShader: keshikiFragmentShader,
      side: THREE.FrontSide,
      // transparent: true,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.02 },
        uBigWavesFrequency: { value: new THREE.Vector2(0, 0.55) },
        uBigWavesSpeed: { value: -0.55 },

        uSmallWavesElevation: { value: 2.55 },
        uSmallWavesFrequency: { value: 0.25 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 3 },

        uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
        uSurfaceColor: {
          value: new THREE.Color(this.debugObject.surfaceColor),
        },
        uColorOffset: { value: 1 },
        uColorMultiplier: { value: 1 },
      },
    });

    this.mesh = new THREE.Mesh(this.keshikiGeometry, this.keshikiMaterial);
    this.mesh.name = 'keshiki';

    // this.mesh.rotation.x = -Math.PI * 0.25;
    this.mesh.position.set(0, 4.5, -18);

    this.scene.add(this.mesh);

    this.mesh.material.wireframe = true;
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update keshiki
      this.keshikiMaterial.uniforms.uTime.value = elapsedTime;

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uBigWavesElevation');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesElevation, 'value')
      .min(-5)
      .max(20)
      .step(0.001)
      .name('uSmallWavesElevation');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesFrequency.value, 'x')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyX');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesFrequency.value, 'y')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyY');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesFrequency, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uSmallWavesFrequency');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uBigWavesSpeed');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uSmallWavesSpeed');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesIterations, 'value')
      .min(0)
      .max(4)
      .step(1)
      .name('uSmallWavesIterations');
    this.debugFolder
      .addColor(this.debugObject, 'depthColor')
      .name('depthColor')
      .onChange(() => {
        this.keshikiMaterial.uniforms.uDepthColor.value.set(
          this.debugObject.depthColor
        );
      });
    this.debugFolder
      .addColor(this.debugObject, 'surfaceColor')
      .name('surfaceColor')
      .onChange(() => {
        this.keshikiMaterial.uniforms.uSurfaceColor.value.set(
          this.debugObject.surfaceColor
        );
      });
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uColorOffset, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uColorOffset');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uColorMultiplier, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uColorMultiplier');
  }
}
