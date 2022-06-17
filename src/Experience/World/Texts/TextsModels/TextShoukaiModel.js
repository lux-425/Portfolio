import * as THREE from 'three';

import Experience from '../../../Experience.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default class TextShoukaiModel {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Loaders
    this.gltfLoader = new GLTFLoader();
    // this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Blender's model
    this._loadingPromise = this.loadModel(
      this.gltfLoader,
      '../../../models/Gamen/gamen_001-2.glb'
    ).then((result) => {
      this.model = result.scene;
      // console.log(this.model);
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
}
