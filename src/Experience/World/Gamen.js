import * as THREE from 'three';

import Experience from '../Experience.js';

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Gamen {
  constructor(posX, posZ, rot, lColor1, lColor2) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.posX = posX;
    this.posZ = posZ;
    this.lColor1 = lColor1;
    this.lColor2 = lColor2;

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
    // this.material = new THREE.MeshPhongMaterial({
    //   shininess: 100,
    //   specular: 0xffffff,
    //   transparent: true,
    //   opacity: 0.2,
    // });
    // this.material = new THREE.MeshStandardMaterial({
    //   transparent: true,
    //   opacity: 0.2,
    //   roughness: 0.0,
    //   metalness: 0.0,
    //   color: 'white',
    // });
    this.material = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      metalness: 0,
      transparent: true,
      opacity: 0.25,
      color: 'white',
    });

    this.material.side = THREE.DoubleSide;
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = this.geometry.parameters.height / 2;

    this.mesh.position.x = this.posX;
    this.mesh.position.z = this.posZ;
    this.mesh.rotation.y = this.rot;

    this.mesh.castShadow = false;

    this.setLights();
  }

  setLights() {
    // 左
    this.rectAreaLight = new THREE.RectAreaLight(
      this.lColor1,
      0.01,
      0.01,
      0.01
    );

    this.rectAreaLight.height = 2;
    this.rectAreaLight.power = 130;

    this.rectAreaLight.position.set(this.posX, 1, this.posZ);
    this.rectAreaLight.rotateY(this.rot + Math.PI * 0.5);

    this.rectAreaLight.translateZ(0.5);

    this.scene.add(this.rectAreaLight);
    // this.rectAreaLightHelper = new RectAreaLightHelper(this.rectAreaLight);
    // this.scene.add(this.rectAreaLightHelper);

    // 右
    this.rectAreaLight2 = new THREE.RectAreaLight(
      this.lColor2,
      0.01,
      0.01,
      0.01
    );

    this.rectAreaLight2.height = 2;
    this.rectAreaLight2.power = 130;

    this.rectAreaLight2.position.set(this.posX, 1, this.posZ);
    this.rectAreaLight2.rotateY(this.rot - Math.PI * 0.5);

    this.rectAreaLight2.translateZ(0.5);

    this.scene.add(this.rectAreaLight2);
    // this.rectAreaLightHelper2 = new RectAreaLightHelper(this.rectAreaLight2);
    // this.scene.add(this.rectAreaLightHelper2);

    // テスト!!!
    // this.rectAreaLight.height = 0.1;
    // this.rectAreaLight2.height = 0.1;
    // this.rectAreaLight.translateY(-0.9);
    // this.rectAreaLight2.translateY(-0.9);
  }
}
