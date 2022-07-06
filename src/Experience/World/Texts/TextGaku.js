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

    this.setVariables();

    // this.setAnimation();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    /**
     * ARROWS
     */
    // RIGHT
    this.arrowGakuRight = this.textModel.children[0].children[0];
    this.arrowHitboxGakuRight = this.textModel.children[0].children[1];
    this.arrowHitboxGakuRight.visible = false;
    this.arrowTextGakuRight = this.textModel.children[0].children[4];
    this.arrowHomeGakuRight = this.textModel.children[0].children[2];
    this.arrowHomeHitboxGaku = this.textModel.children[0].children[3];
    this.arrowHomeHitboxGaku.visible = false;
    //LEFT
    this.arrowGakuLeft = this.textModel.children[1].children[0];
    this.arrowHitboxGakuLeft = this.textModel.children[1].children[1];
    this.arrowHitboxGakuLeft.visible = false;
    this.arrowHomeGakuLeft = this.textModel.children[1].children[2];
    this.arrowTextGakuLeft = this.textModel.children[1].children[3];

    // TITLES, TEXTS, DATES
    this.titleRight = this.textModel.children[0].children[7];
    this.titleLeft = this.textModel.children[1].children[6];

    this.textRight = this.textModel.children[0].children[6];
    this.textLeft = this.textModel.children[1].children[5];

    this.dateRight = this.textModel.children[0].children[5];
    this.dateLeft = this.textModel.children[1].children[4];

    // LOGOS
    this.logoRight = this.textModel.children[0].children[8];
    this.logoLeft = this.textModel.children[1].children[7];
    this.logoRight.material.depthTest = true;
    this.logoRight.material.depthWrite = true;
    this.logoLeft.material.depthTest = true;
    this.logoLeft.material.depthWrite = true;

    /**
     * MATERIALS
     */
    this.arrowGakuRight.material.emissive = new THREE.Color('white');

    this.arrowRightTextMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowLeftTextMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowTextGakuRight.material = this.arrowRightTextMaterial;
    this.arrowTextGakuLeft.material = this.arrowLeftTextMaterial;

    this.dateTitleMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.titleRight.material = this.dateTitleMaterial;
    this.titleLeft.material = this.dateTitleMaterial;
    this.dateRight.material = this.dateTitleMaterial;
    this.dateLeft.material = this.dateTitleMaterial;

    this.textMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.textRight.material = this.textMaterial;
    this.textLeft.material = this.textMaterial;

    /**
     * INIT VISIBILITY
     */
    this.arrowGakuRight.visible = false;
    this.arrowGakuLeft.visible = false;
    this.arrowHomeGakuRight.visible = false;
    this.arrowHomeGakuLeft.visible = false;
    this.logoRight.visible = false;
    this.logoLeft.visible = false;

    /**
     * ANIMATIONS
     */
    this.tweenArrowRightOrigin = new TWEEN.Tween(this.arrowGakuRight.position)
      .to({ x: -0.462 }, 500)
      .easing(TWEEN.Easing.Exponential.Out);
    this.tweenArrowRightToggle = new TWEEN.Tween(this.arrowGakuRight.position)
      .to({ x: -0.3 }, 500)
      .easing(TWEEN.Easing.Exponential.InOut);

    this.tweenArrowLeftOrigin = new TWEEN.Tween(this.arrowGakuLeft.position)
      .to({ x: -0.462 }, 500)
      .easing(TWEEN.Easing.Exponential.Out);
    this.tweenArrowLeftToggle = new TWEEN.Tween(this.arrowGakuLeft.position)
      .to({ x: -0.3 }, 500)
      .easing(TWEEN.Easing.Exponential.InOut);

    /**
     * ANIMATE
     */
    this.animateText();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    console.log(this.textModel);

    /**
     * ARROWS
     */
    this.arrowGakuRight.visible = true;
    this.arrowGakuLeft.visible = true;
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
