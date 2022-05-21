import * as THREE from 'three';

import Experience from '../Experience.js';

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class GroundLight {
  constructor(tX, power, Y) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.tX = tX;
    this.power = power;
    this.y = Y

    this.rectAreaLight = new THREE.RectAreaLight('white', 0.1, 0.15, 0.1);

    this.rectAreaLight.height = 8;
    this.rectAreaLight.power = this.power;

    this.rectAreaLight.rotateX(-Math.PI * 0.5);
    this.rectAreaLight.translateZ(this.y);

    this.rectAreaLight.translateX(this.tX);

    this.scene.add(this.rectAreaLight);
    // this.rectAreaLightHelper = new RectAreaLightHelper(this.rectAreaLight);
    // this.scene.add(this.rectAreaLightHelper);
  }
}
