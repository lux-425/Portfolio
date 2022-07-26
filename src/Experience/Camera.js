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

    this.updatingControlls = true;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.1,
      999
    );

    // this.instance.position.set(0, 4, 13);

    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    // this.controls.enabled = false;

    this.controls.rotateSpeed = 0.25;

    // Make the animation smoother when dragging and dropping
    this.controls.enableDamping = true;

    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    // this.controls.enableRotate = false;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (this.updatingControlls) {
      this.controls.update();
    }
  }
}
