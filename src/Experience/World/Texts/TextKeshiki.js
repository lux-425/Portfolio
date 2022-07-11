import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextKeshiki {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    /**
     * REFRESH ANIMATION BUTTON
     */
    this.buttonRefreshGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    this.buttonRefreshMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
    });
    this.buttonRefresh = new THREE.Mesh(
      this.buttonRefreshGeometry,
      this.buttonRefreshMaterial
    );
    this.buttonRefresh.position.set(-2.5, 9.2, -10);
    this.buttonRefresh.name = 'buttonRefreshKeshiki';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/keshiki.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    this.scene.add(this.textModel);

    this.textModel.rotateZ(Math.PI);
    this.textModel.position.set(
      this.experience.world.keshiki.mesh.position.x,
      this.experience.world.keshiki.mesh.position.y,
      this.experience.world.keshiki.mesh.position.z
    );
    this.textModel.translateZ(-3);
    this.textModel.translateY(0.01);

    this.setVariables();

    // this.setAnimation();
  }

  setVariables() {
    /**
     * INIT
     */
    this.contact = this.textModel.children[0];
    this.mouse = this.textModel.children[1];

    this.animateText();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    console.log(this.textModel);
  }

  setAnimation() {
    var TWEEN = require('@tweenjs/tween.js');

    const tick = () => {
      TWEEN.update();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
