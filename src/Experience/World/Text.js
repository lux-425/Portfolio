import * as THREE from 'three';

import Experience from '../Experience.js';

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default class Text {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('text');
    }

    // Loaders
    this.gltfLoader = new GLTFLoader();
    // this.gltfLoader.setDRACOLoader(this.dracoLoader);

    /**
     * テスト!!!
     */
    this.debugParams = {};

    //

    // Blender's model
    this._loadingPromise = this.loadModel(
      this.gltfLoader,
      '../../models/Gamen/gamen_000.glb'
    ).then((result) => {
      this.model = result.scene;
      // console.log(this.model);
      this.setAnimation();
    });
  }

  waitForLoad() {
    return this._loadingPromise;
  }

  loadModel(loader, url) {
    return new Promise((resolve, reject) => {
      loader.load(
        url,

        (gltf) => {
          resolve(gltf);
        },

        undefined,

        (error) => {
          console.error('An error happened.', error);
          reject(error);
        }
      );
    });
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update text
      this.model.children[0].children[0].material.emissiveIntensity =
        Math.cos(elapsedTime * 0.66) + 1.5;

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
