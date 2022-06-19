import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextKeiken {
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
    this.buttonRefresh.position.set(-0.5, 2.2, -0.5);
    this.buttonRefresh.name = 'buttonRefreshKeiken';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/Gamen/gamen_003-4_intro.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    this.scene.add(this.textModel);

    this.textModel.position.set(
      this.experience.world.centerPanels.gamenOne.mesh.position.x,
      1,
      this.experience.world.centerPanels.gamenOne.mesh.position.z
    );

    this.animateText();

    this.setAnimation();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    console.log(this.textModel);

    this.textModel.children[0].children[0].children[0].material.emissive =
      new THREE.Color('white');

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
