import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Gamen {
  constructor(posX, posZ, rot) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.posX = posX;
    this.posZ = posZ;

    rot = typeof rot === 'undefined' ? 0 : rot;
    this.rot = rot;

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
    this.material = new THREE.MeshPhongMaterial({
      shininess: 100,
      color: 'rgb(255, 0, 255)',
      specular: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    // this.material = new THREE.MeshStandardMaterial({
    //   transparent: true,
    //   opacity: 0.1,
    //   roughness: 0.1,
    //   metalness: 0.8,
    //   color: new THREE.Color(0xff00ff),
    // });

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
