import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment');
    }

    this.setSunLight();
    // this.setSpotLight();

    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#b9d8e3', 4);

    this.sunLight.castShadow = false;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(0, Math.PI * 2, 0);

    // HELPER
    const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
    // this.scene.add(helper);

    this.sunLight.intensity = 2;

    this.scene.add(this.sunLight);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity')
        .min(0)
        .max(10)
        .step(0.1)
        .name('sunLightIntensity');

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('sunLightX');

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('sunLightY');

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('sunLightZ');
    }
  }

  setSpotLight() {
    this.spotLight = new THREE.SpotLight('#b4dbe4');
    this.spotLight.intensity = 1.5;
    this.spotLight.position.set(-1.4, 8, 1.4);

    this.spotLight.castShadow = false;
    this.spotLight.shadow.mapSize.width = 1024 * 2;
    this.spotLight.shadow.mapSize.height = 1024 * 2;
    this.spotLight.shadow.focus = 1;

    this.spotLight.shadow.camera.near = 0.1;
    this.spotLight.shadow.camera.far = 10;
    this.spotLight.shadow.camera.fov = 300;

    // HELPER
    const helper = new THREE.DirectionalLightHelper(this.spotLight, 5);
    // this.scene.add(helper);

    this.spotLight.intensity = 20;

    this.scene.add(this.spotLight);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.spotLight, 'intensity')
        .min(0)
        .max(100)
        .step(0.1)
        .name('spotLightIntensity');

      this.debugFolder
        .add(this.spotLight.position, 'x')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('spotLightX');

      this.debugFolder
        .add(this.spotLight.position, 'y')
        .min(-5)
        .max(20)
        .step(0.001)
        .name('spotLightY');

      this.debugFolder
        .add(this.spotLight.position, 'z')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('spotLightZ');
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
  }
}
