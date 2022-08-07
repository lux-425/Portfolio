import * as THREE from 'three';

import Experience from '../Experience.js';

import chikeiVertexShader from '../../Shaders/Chikei/vertex.glsl';
import chikeiFragmentShader from '../../Shaders/Chikei/fragment.glsl';

import TextModel from './Texts/TextModel.js';

export default class Chikei {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    this.debugObject = {};
    this.debugObject.depthColor = '#000000';
    this.debugObject.surfaceColor = '#ffffff';
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('landscapes');
      this.setDebug();
      this.debugFolder.close();
    }

    // Set model
    this.model = new TextModel('../../models/chikei.glb');
    this.setChikei();
  }

  async setChikei() {
    await this.model.waitForLoad();
    this.chikeiModel = this.model.model.children[0];

    // Œuf de Pâques
    this.saru = this.chikeiModel.children[0];

    this.chikeiModel.material = new THREE.ShaderMaterial({
      vertexShader: chikeiVertexShader,
      fragmentShader: chikeiFragmentShader,
      // precision: 'lowp',
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },

        uDepthColor: {
          value: new THREE.Color(this.debugObject.depthColor),
        },
        uSurfaceColor: {
          value: new THREE.Color(this.debugObject.surfaceColor),
        },
      },
    });

    this.scene.add(this.chikeiModel);

    this.setAnimation();
  }

  setAnimation() {
    const tick = () => {
      // Update chikei
      this.chikeiModel.material.uniforms.uTime.value =
        this.experience.time.elapsed * 0.001;

      this.chikeiModel.material.uniforms.uSurfaceColor.value = new THREE.Color(
        this.debugObject.surfaceColor
      );
      this.chikeiModel.material.uniforms.uDepthColor.value = new THREE.Color(
        this.debugObject.depthColor
      );

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    this.debugFolder
      .addColor(this.debugObject, 'surfaceColor')
      .name('surfaceColor');
    this.debugFolder
      .addColor(this.debugObject, 'depthColor')
      .name('depthColor');
  }
}
