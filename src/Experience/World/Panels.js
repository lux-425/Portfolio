import * as THREE from 'three';

import Experience from '../Experience.js';

import Gamen from './Gamen.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default class Panels {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // LOADER
    // this.dracoLoader = new DRACOLoader();
    // this.dracoLoader.setDecoderPath('/draco/');

    this.gltfLoader = new GLTFLoader();
    // this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.setPanels();
  }

  setPanels() {
    this.gltfLoader.load('../../models/frame.glb', (gltf) => {
      this.model = gltf.scene;
      this.model.traverse((o) => {
        if (o.isMesh)
          o.material = new THREE.MeshPhysicalMaterial({
            side: THREE.DoubleSide,
            color: 'white',
          });
      });

      this.scene.add(this.model);

      this.model.translateX(-3);
      this.model.translateZ(2);
      this.model.rotateY(Math.PI * 0.5);
    });

    this.gamen = new Gamen();
    this.scene.add(this.gamen.mesh);

    this.gamen.mesh.translateX(-3);
    this.gamen.mesh.translateZ(2);
  }
}
