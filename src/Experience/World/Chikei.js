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
    // this.debug = this.experience.debug;
    this.debugObject = {};
    this.debugObject.depthColor = '#000000';
    this.debugObject.surfaceColor = '#ffffff';

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

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
