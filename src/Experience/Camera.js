import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Experience from './Experience.js';

export default class Camera {
  constructor() {
    // Use the global variable solution
    // this.experience = window.experience

    // Use the parameter solution
    // this.experience = experience;

    // Instantiate the one and only singleton Experience object solution
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.instance.position.set(
      -0.007999302752496192,
      9.251169909796829,
      9.252459608785026
    );
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);

    // Make the animation smoother when dragging and dropping
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
