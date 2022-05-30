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
      this.debugFolder.close();
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry =
    new THREE.PlaneGeometry(25, 6.9, 10, 10);
  }

  setTextures() {
    this.textures = {};
  }

  setMaterial() {
    this.material = new THREE.MeshPhysicalMaterial({
      metalness: 0.9,
      roughness: 0,
      color: new THREE.Color('white'),
      // wireframe: true,
      transparent: true,
      opacity: 0.90
    });

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

    this.mesh.receiveShadow = false;

    this.mesh.rotateX(-Math.PI * 0.5);
    this.mesh.position.set(0, 0, 2);

    this.scene.add(this.mesh);

    // テスト　！！！
    this.geometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
    );
  }
}
