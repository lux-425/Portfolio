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
    // this.buttonRefreshGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    // this.buttonRefreshMaterial = new THREE.MeshBasicMaterial({
    //   color: 'red',
    // });
    // this.buttonRefresh = new THREE.Mesh(
    //   this.buttonRefreshGeometry,
    //   this.buttonRefreshMaterial
    // );
    // this.buttonRefresh.position.set(3.5, 2.2, 0);
    // this.buttonRefresh.name = 'buttonRefreshGaku';
    // this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/Gamen/gamen_007-8.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];

    this.textModel.translateX(-4);

    this.setVariables();
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
    this.tweenArrowTextAppear = (text) => {
      var tweenArrowTextAppear = new TWEEN.Tween(text.material)
        .to({ opacity: 1 }, 1000)
        .easing(TWEEN.Easing.Cubic.InOut);
      tweenArrowTextAppear.start();
    };
    this.tweenArrowTextDisappear = (text) => {
      var tweenArrowTextAppear = new TWEEN.Tween(text.material)
        .to({ opacity: 0 }, 100)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenArrowTextAppear.start();
    };

    this.tweenArrowRightOrigin = new TWEEN.Tween(this.arrowGakuRight.position)
      .to({ x: -0.462 }, 500)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.tweenArrowTextDisappear(this.arrowTextGakuRight);
      });
    this.tweenArrowRightToggle = new TWEEN.Tween(this.arrowGakuRight.position)
      .to({ x: -0.33 }, 500)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onStart(() => {
        this.tweenArrowTextAppear(this.arrowTextGakuRight);
      });
    this.tweenArrowLeftOrigin = new TWEEN.Tween(this.arrowGakuLeft.position)
      .to({ x: -0.462 }, 500)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.tweenArrowTextDisappear(this.arrowTextGakuLeft);
      });
    this.tweenArrowLeftToggle = new TWEEN.Tween(this.arrowGakuLeft.position)
      .to({ x: -0.3 }, 500)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onStart(() => {
        this.tweenArrowTextAppear(this.arrowTextGakuLeft);
      });

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[4] = true;

    /**
     * ANIMATE
     */
    // this.animateText();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    this.scene.add(this.textModel);

    // console.log(this.textModel);

    this.arrowGakuRight.position.x = -0.462;
    this.arrowGakuLeft.position.x = -0.462;

    // INIT
    this.arrowGakuRight.visible = false;
    this.arrowGakuLeft.visible = false;
    this.logoLeft.visible = false;
    this.logoRight.visible = false;
    this.arrowHomeGakuLeft.visible = false;
    this.arrowHomeGakuRight.visible = false;
    this.titleLeft.material.opacity = 0;
    this.textLeft.material.opacity = 0;

    var tweenTitlesDates = new TWEEN.Tween(this.titleLeft.material)
      .to({ opacity: 1 }, 1000)
      .easing(TWEEN.Easing.Circular.InOut)
      .onStart(() => {
        this.logoLeft.visible = true;
        this.logoRight.visible = true;
      })
      .onComplete(() => {
        this.arrowGakuRight.visible = true;
        this.arrowGakuLeft.visible = true;
      });

    var tweenTexts = new TWEEN.Tween(this.textLeft.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.InOut)
      .onComplete(() => {
        this.arrowHomeGakuLeft.visible = true;
        this.arrowHomeGakuRight.visible = true;
      });

    tweenTexts.start();
    tweenTitlesDates.start();
  }
}
