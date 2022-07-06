import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextGaku {
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
    this.buttonRefresh.position.set(3.5, 2.2, 0);
    this.buttonRefresh.name = 'buttonRefreshGaku';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/Gamen/gamen_007-8.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    this.scene.add(this.textModel);

    this.textModel.translateX(-4);

    this.animateText();

    this.setAnimation();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    console.log(this.textModel);

    /**
     * ARROW
     */
    // this.arrowHitboxShoukai = this.textModel.children[1];
    // this.arrowHitboxShoukai.visible = false;
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
