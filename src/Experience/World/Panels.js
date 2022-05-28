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
      // this.model.traverse((o) => {
      //   if (o.isMesh)
      //     o.material = new THREE.MeshPhysicalMaterial({
      //       // side: THREE.DoubleSide,
      //       // wireframe: true
      //     });
      // });

      this.scene.add(this.model);

      this.model.translateX(-3);
      this.model.translateY(-3);
      this.model.translateZ(2);
      // this.model.rotateY(Math.PI * 0.25);
    });

    this.gamenOne = new Gamen();
    this.gamenOne.mesh.translateX(-3);
    this.gamenOne.mesh.translateY(-3);
    this.gamenOne.mesh.translateZ(2);

    this.gamenTwo = new Gamen();
    this.gamenTwo.mesh.translateX(-3.534);
    this.gamenTwo.mesh.translateY(-3);
    this.gamenTwo.mesh.translateZ(1.47);
    this.gamenTwo.mesh.rotateY(-Math.PI * 0.5);

    this.gamenThree = new Gamen();
    this.gamenThree.mesh.translateX(-3.534);
    this.gamenThree.mesh.translateY(-3);
    this.gamenThree.mesh.translateZ(0.47);
    this.gamenThree.mesh.rotateY(-Math.PI * 0.5);

    this.scene.add(
      this.gamenOne.mesh,
      this.gamenTwo.mesh,
      this.gamenThree.mesh
    );
  }
}
