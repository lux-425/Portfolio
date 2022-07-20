import * as THREE from 'three';

import Experience from '../Experience.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import chikeiVertexShader from '../../Shaders/Chikei/vertex.glsl';
import chikeiFragmentShader from '../../Shaders/Chikei/fragment.glsl';

import TextModel from './Texts/TextModel.js';

export default class Chikei {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Loaders
    this.gltfLoader = new GLTFLoader();
    // this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Debug
    this.debug = this.experience.debug;

    this.debugObject = {};
    this.debugObject.depthColor = '#000000';
    this.debugObject.surfaceColor = '#ffffff';

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('chikei');
      this.debugFolder.close();
    }

    // Set model
    this.model = new TextModel('../../models/chikei.glb');
    this.setChikei();
  }

  async setChikei() {
    await this.model.waitForLoad();
    this.chikeiModel = this.model.model.children[0];

    this.chikeiModel.material = new THREE.ShaderMaterial({
      vertexShader: chikeiVertexShader,
      fragmentShader: chikeiFragmentShader,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.55 },
        uBigWavesFrequency: { value: new THREE.Vector2(0, 0.55) },
        uBigWavesSpeed: { value: -0.05 },

        uSmallWavesElevation: { value: 5.55 },
        uSmallWavesFrequency: { value: 0.055 },
        uSmallWavesSpeed: { value: 0.05 },
        uSmallWavesIterations: { value: 2 },

        uDepthColor: {
          value: new THREE.Color(this.debugObject.depthColor),
        },
        uSurfaceColor: {
          value: new THREE.Color(this.debugObject.surfaceColor),
        },
        uColorOffset: { value: 1 },
        uColorMultiplier: { value: 0.55 },
      },
    });

    this.scene.add(this.chikeiModel);

    this.setAnimation();

    this.setDebug();
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update chikei
      this.chikeiModel.material.uniforms.uTime.value = elapsedTime;

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uBigWavesElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uBigWavesElevation');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uSmallWavesElevation, 'value')
      .min(-5)
      .max(20)
      .step(0.001)
      .name('uSmallWavesElevation');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uBigWavesFrequency.value, 'x')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyX');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uBigWavesFrequency.value, 'y')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyY');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uSmallWavesFrequency, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uSmallWavesFrequency');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uBigWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uBigWavesSpeed');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uSmallWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uSmallWavesSpeed');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uSmallWavesIterations, 'value')
      .min(0)
      .max(4)
      .step(1)
      .name('uSmallWavesIterations');
    this.debugFolder
      .addColor(this.debugObject, 'depthColor')
      .name('depthColor')
      .onChange(() => {
        this.chikeiModel.material.uniforms.uDepthColor.value.set(
          this.debugObject.depthColor
        );
      });
    this.debugFolder
      .addColor(this.debugObject, 'surfaceColor')
      .name('surfaceColor')
      .onChange(() => {
        this.chikeiModel.material.uniforms.uSurfaceColor.value.set(
          this.debugObject.surfaceColor
        );
      });
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uColorOffset, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uColorOffset');
    this.debugFolder
      .add(this.chikeiModel.material.uniforms.uColorMultiplier, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uColorMultiplier');
  }
}
