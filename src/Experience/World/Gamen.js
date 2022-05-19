import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Gamen {
  constructor(posX, posZ, rot, text) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.posX = posX;
    this.posZ = posZ;

    rot = typeof rot === 'undefined' ? 0 : rot;
    this.rot = rot;

    text = typeof text === 'undefined' ? null : text;
    this.text = text;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 2);
  }

  setTextures() {
    this.textures = {};
  }

  setMaterial() {
    // this.material = new THREE.MeshBasicMaterial({ color: 'gray' });

    this.material = new THREE.MeshPhongMaterial({
      shininess: 100,
      color: 'cyan',
      specular: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    this.material.side = THREE.DoubleSide;
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = this.geometry.parameters.height / 2;
    this.mesh.position.x = this.posX;
    this.mesh.position.z = this.posZ;
    this.mesh.rotation.y = this.rot;

    this.mesh.castShadow = true;
  }
}
