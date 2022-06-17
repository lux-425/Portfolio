import * as THREE from 'three';

import Experience from '../../Experience.js';

import TextShoukaiModel from './TextsModels/TextShoukaiModel.js';

export default class TextProfil {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    /**
     * REFRESH ANIMATION BUTTON
     */
    this.buttonRefreshGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    this.buttonRefreshMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
      name: 'buttonRefresh',
    });
    this.buttonRefresh = new THREE.Mesh(
      this.buttonRefreshGeometry,
      this.buttonRefreshMaterial
    );
    this.buttonRefresh.position.set(-4.5, 2.2, -1);
    this.buttonRefresh.name = 'buttonRefreshShoukai';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextShoukaiModel();
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    this.scene.add(this.textModel);

    this.textModel.translateY(4);

    this.animateText();

    this.setAnimation();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    console.log(this.textModel);

    /**
     * ARROW
     */
    this.arrowHitboxShoukai = this.textModel.children[1];
    this.arrowHitboxShoukai.visible = false;
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
