import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

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
    // this.setSpotLight();
    this.setCenterPointLight();
    // this.setTestLight();

    this.setEnvironmentMap();

    this.setAnimation();

    // Fog
    // this.fog = new THREE.FogExp2('#3e6684', 0.1);
    // this.fog = new THREE.Fog('#6d9abb', 0, 18);
    // this.scene.fog = this.fog;
  }

  setTestLight() {
    this.centerPointLight1 = new THREE.PointLight('#ff0000', 5, 5);
    this.centerPointLight1.position.set(0, 1.5, 7);
    this.scene.add(this.centerPointLight1);

    this.centerPointLight2 = new THREE.PointLight('#00ff00', 5, 5);
    this.centerPointLight2.position.set(0, 1, 7.5);
    this.scene.add(this.centerPointLight2);
  }

  setCenterPointLight() {
    this.centerPointLight = new THREE.PointLight('#ffffff', 5, 15);
    this.centerPointLight.position.set(0, 0.5, 10);
    this.scene.add(this.centerPointLight);

    this.centerPointLight.shadow.mapSize.width = 256;
    this.centerPointLight.shadow.mapSize.height = 256;
    this.centerPointLight.shadow.camera.far = 7;

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.centerPointLight, 'intensity')
        .min(0)
        .max(100)
        .step(0.1)
        .name('centerPointLightIntensity');
      this.debugFolder
        .add(this.centerPointLight, 'distance')
        .min(0)
        .max(20)
        .step(0.1)
        .name('centerPointLightDistance');
    }
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight();
    this.ambientLight.color = new THREE.Color('white');
    this.ambientLight.intensity = 0.4;
    this.scene.add(this.ambientLight);

    this.ambientLight.castShadow = false;

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.ambientLight, 'intensity')
        .min(0)
        .max(10)
        .step(0.1)
        .name('ambientLightIntensity');
    }
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#b9d8e3', 4);

    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(-3, 10, 5);

    this.sunLight.castShadow = false;

    // HELPER
    const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
    // this.scene.add(helper);

    this.sunLight.intensity = 1;

    this.scene.add(this.sunLight);

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
    this.spotLight.intensity = 5;
    this.spotLight.position.set(0, 5, 5);

    this.spotLight.shadow.mapSize.width = 1024 * 2;
    this.spotLight.shadow.mapSize.height = 1024 * 2;
    this.spotLight.shadow.focus = 1;

    this.spotLight.shadow.camera.near = 0.1;
    this.spotLight.shadow.camera.far = 10;
    this.spotLight.shadow.camera.fov = 300;

    this.spotLight.angle = Math.PI / 2;

    // HELPER
    const helper = new THREE.DirectionalLightHelper(this.spotLight, 5);
    this.scene.add(helper);

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
        .min(-10)
        .max(20)
        .step(0.001)
        .name('spotLightX');
      this.debugFolder
        .add(this.spotLight.position, 'y')
        .min(0)
        .max(20)
        .step(0.001)
        .name('spotLightY');
      this.debugFolder
        .add(this.spotLight.position, 'z')
        .min(-20)
        .max(40)
        .step(0.001)
        .name('spotLightZ');
      this.debugFolder
        .add(this.spotLight, 'distance')
        .min(0)
        .max(100)
        .step(0.001)
        .name('spotLightDistance');
      this.debugFolder
        .add(this.spotLight, 'angle')
        .min(-1)
        .max(1)
        .step(0.001)
        .name('spotLightAngle');
      this.debugFolder
        .add(this.spotLight, 'penumbra')
        .min(0)
        .max(1)
        .step(0.001)
        .name('spotPenumbra');
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
  }

  /**
   * Animate
   */
  setAnimation() {
    this.clock = new THREE.Clock();

    this.tick = () => {
      this.elapsedTime = this.clock.getElapsedTime();

      // Update Lights
      this.centerPointLightAngle = this.elapsedTime;

      this.centerPointLight.position.x =
        Math.cos(this.centerPointLightAngle) * 2;
      this.centerPointLight.position.z =
        Math.sin(this.centerPointLightAngle) * 2;

      // this.centerPointLight1.position.x =
      //   Math.cos(this.centerPointLightAngle) * 3;
      // this.centerPointLight1.position.z =
      //   Math.sin(this.centerPointLightAngle) * 3 + 1.5;

      // this.centerPointLight2.position.x =
      //   Math.cos(this.centerPointLightAngle) * 2 + 4.5;
      // this.centerPointLight2.position.z =
      //   Math.sin(this.centerPointLightAngle) * 2 + 1.5;

      // Call tick again on the next frame
      window.requestAnimationFrame(this.tick);
    };

    this.tick();
  }
}
