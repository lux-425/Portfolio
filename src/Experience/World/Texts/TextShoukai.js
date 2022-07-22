import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextShoukai {
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
    this.buttonRefresh.position.set(-4.5, 2.2, -1);
    this.buttonRefresh.name = 'buttonRefreshShoukai';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/Gamen/gamen_001-2.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    this.scene.add(this.textModel);

    this.textModel.translateY(4);

    this.setVariables();

    this.setAnimation();
  }

  setVariables() {
    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[1] = true;

    /**
     * ANIMATE
     */
    this.animateText();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModel);
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
