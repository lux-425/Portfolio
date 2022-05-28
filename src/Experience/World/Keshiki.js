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
    this.debugObject.depthColor = '#bd2eff';
    this.debugObject.surfaceColor = '#ffffff';

    this.setKeshiki();
    this.setAnimation();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('keshiki');
      this.setDebug();
    }
  }

  setKeshiki() {
    // this.keshikiGeometry = new THREE.SphereGeometry(
    //   110,
    //   1024,
    //   1024,
    //   -Math.PI*2.165,
    //   -2.1,
    //   1.0,
    //   1.2
    // );

    this.keshikiGeometry = new THREE.PlaneGeometry(105, 55,512 ,512);
    this.keshikiMaterial = new THREE.ShaderMaterial({
      vertexShader: keshikiVertexShader,
      fragmentShader: keshikiFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.045   },
        uBigWavesFrequency: { value: new THREE.Vector2(-0.02, -5) },
        uBigWavesSpeed: { value: -0.04 },

        uSmallWavesElevation: { value:10 },
        uSmallWavesFrequency: { value: 0.025 },
        uSmallWavesSpeed: { value: 0.08},
        uSmallWavesIterations: { value: 1 },

        uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
        uSurfaceColor: {
          value: new THREE.Color(this.debugObject.surfaceColor),
        },
        uColorOffset: { value: 0.55 },
        uColorMultiplier: { value: 0.8 },
      },
    });

    this.keshiki = new THREE.Mesh(this.keshikiGeometry, this.keshikiMaterial);

    // this.keshiki.rotation.x = -Math.PI * 0.25;
    this.keshiki.position.set(0, 6.9, -55.5);

    this.scene.add(this.keshiki);

    this.keshiki.material.wireframe = true;

    // テスト！！！
    this.keshiki.rotateX(-Math.PI*0.15)
    this.keshiki.translateY(0)
    this.keshiki.translateZ(-25);
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
      .add(this.keshikiMaterial.uniforms.uBigWavesFrequency.value, 'x')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uBigWavesFrequencyX');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesFrequency.value, 'y')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uBigWavesFrequencyY');
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
      .add(this.keshikiMaterial.uniforms.uSmallWavesElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uSmallWavesElevation');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesFrequency, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uSmallWavesFrequency');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesIterations, 'value')
      .min(0)
      .max(8)
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
      .max(10)
      .step(0.001)
      .name('uColorMultiplier');
  }
}
