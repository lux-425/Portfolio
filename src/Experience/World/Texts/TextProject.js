import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextProject {
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
    this.buttonRefresh.position.set(-0.7, 2.2, -1);
    this.buttonRefresh.name = 'buttonRefreshProject';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.modelIntro = new TextModel('../../../models/Gamen/gamen_005-6_intro.glb');
    this.setModel();
  }

  async setModel() {
    // INTRO
    await this.modelIntro.waitForLoad();
    this.textModelIntro = this.modelIntro.model.children[0];
    this.scene.add(this.textModelIntro);

    console.log(this.textModelIntro);

    this.textModelIntro.translateX(-4);

    this.textModelIntro.children[0].children[0].children[0].material.emissive =
      new THREE.Color('white');
    this.textModelIntro.children[0].children[0].children[0].material.transparent = true;

    /**
     * ANIMATIONS
     */
    this.animate();

    this.setAnimation();
  }

  animate() {
    // this.scene.remove(this.textModel);

    this.animateIntro();

    // setTimeout(() => {
    //   this.scene.add(this.textModel);
    //   this.animateText();
    // }, 5250);
  }

  animateIntro() {
    var TWEEN = require('@tweenjs/tween.js');


  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModel);

    /**
     * ARROW
     */
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
