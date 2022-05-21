import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import Experience from '../Experience.js';

export default class Frame {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Loaders
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Model
    this.gltfLoader.load('../../models/frame.glb', (gltf) => {
      this.model = gltf.scene;

      this.scene.add(this.model);

      this.model.traverse((o) => {
        if (o.isMesh)
          o.material = new THREE.MeshPhysicalMaterial({
            side: THREE.DoubleSide,
            color: "white"
          });
      });

      this.model.position.set(-2.1,0,1.5)
    });
  }
}
