import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Floor {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('floor');
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(10, 8);
  }

  setTextures() {
    this.textures = {};
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial();
    this.material.color.set('#9ea4ab');
    this.material.color.set('white');
    this.material.roughness = 0.0;
    this.material.metalness = 0.5;
    // this.material = new THREE.MeshPhysicalMaterial({
    //   color: new THREE.Color('white'),
    //   roughness: 0,
    //   metalness: 0,
    //   ior: 2.3,
    //   reflectivity: 1
    // });

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.material, 'roughness')
        .min(0)
        .max(1)
        .step(0.001)
        .name('roughness');

      this.debugFolder
        .add(this.material, 'metalness')
        .min(0)
        .max(1)
        .step(0.001)
        .name('metalness');
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;

    this.mesh.receiveShadow = false;

    this.scene.add(this.mesh);
  }
}
