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
      this.debugFolder.close();
    }

    // this.setAmbientLight();
    this.setSunLight();
    this.setCenterPointLight();

    this.setAnimation();

    // Fog
    // this.fog = new THREE.FogExp2('#3e6684', 0.1);
    // this.fog = new THREE.Fog('#6d9abb', 0, 18);
    // this.scene.fog = this.fog;
  }

  setCenterPointLight() {
    this.centerPointLight = new THREE.PointLight('#ffffff', 4, 15);
    this.scene.add(this.centerPointLight);

    this.centerPointLight.castShadow = false;

    this.centerPointLight.position.set(0, 2, 0);

    // HELPER
    // const helper = new THREE.PointLightHelper(this.centerPointLight, 0.5);
    // this.scene.add(helper);
  }

  // setAmbientLight() {
  //   this.ambientLight = new THREE.AmbientLight();
  //   this.ambientLight.color = new THREE.Color('white');
  //   this.ambientLight.intensity = 0.4;
  //   this.scene.add(this.ambientLight);

  //   this.ambientLight.castShadow = false;

  //   // Debug
  //   if (this.debug.active) {
  //     this.debugFolder
  //       .add(this.ambientLight, 'intensity')
  //       .min(0)
  //       .max(10)
  //       .step(0.1)
  //       .name('ambientLightIntensity');
  //   }
  // }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 5.5);
    this.sunLightBis = new THREE.DirectionalLight('#ffffff', 5.5);
    this.sunLightEncore = new THREE.DirectionalLight('#ffffff', 5.5);

    this.sunLight.position.set(-15, 15, 15);
    this.sunLightBis.position.set(13, 15, -7);
    this.sunLightEncore.position.set(-5, 15, -7);

    this.sunLight.castShadow = false;
    this.sunLightBis.castShadow = false;
    this.sunLightEncore.castShadow = false;

    // HELPER
    // const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
    // this.scene.add(helper);
    // const helperBis = new THREE.DirectionalLightHelper(this.sunLightBis, 5);
    // this.scene.add(helperBis);
    // const helperEncore = new THREE.DirectionalLightHelper(
    //   this.sunLightEncore,
    //   5
    // );
    // this.scene.add(helperEncore);

    this.scene.add(this.sunLight);
    this.scene.add(this.sunLightBis);
    this.scene.add(this.sunLightEncore);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity')
        .min(0)
        .max(20)
        .step(0.1)
        .name('sunLightIntensity');
      this.debugFolder
        .add(this.sunLight.position, 'x')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightX');
      this.debugFolder
        .add(this.sunLight.position, 'y')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightY');
      this.debugFolder
        .add(this.sunLight.position, 'z')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightZ');

      this.debugFolder
        .add(this.sunLightBis, 'intensity')
        .min(0)
        .max(20)
        .step(0.1)
        .name('sunLightBisIntensity');
      this.debugFolder
        .add(this.sunLightBis.position, 'x')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightBisX');
      this.debugFolder
        .add(this.sunLightBis.position, 'y')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightBisY');
      this.debugFolder
        .add(this.sunLightBis.position, 'z')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightBisZ');

      this.debugFolder
        .add(this.sunLightEncore, 'intensity')
        .min(0)
        .max(20)
        .step(0.1)
        .name('sunLightEncoreIntensity');
      this.debugFolder
        .add(this.sunLightEncore.position, 'x')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightEncoreX');
      this.debugFolder
        .add(this.sunLightEncore.position, 'y')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightEncoreY');
      this.debugFolder
        .add(this.sunLightEncore.position, 'z')
        .min(-15)
        .max(15)
        .step(0.001)
        .name('sunLightEncoreZ');
    }
  }

  // setEnvironmentMap() {
  //   this.environmentMap = {};
  // }

  /**
   * Animate
   */
  setAnimation() {
    this.tick = () => {
      // Update Lights
      this.centerPointLightAngle = this.experience.time.elapsed * 0.001;

      this.centerPointLight.position.x =
        Math.cos(this.centerPointLightAngle) * 10;
      this.centerPointLight.position.z =
        Math.sin(this.centerPointLightAngle) * 10;

      // Call tick again on the next frame
      window.requestAnimationFrame(this.tick);
    };

    this.tick();
  }
}
