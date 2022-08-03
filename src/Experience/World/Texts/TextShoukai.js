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
    // this.buttonRefreshGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    // this.buttonRefreshMaterial = new THREE.MeshBasicMaterial({
    //   color: 'red',
    // });
    // this.buttonRefresh = new THREE.Mesh(
    //   this.buttonRefreshGeometry,
    //   this.buttonRefreshMaterial
    // );
    // this.buttonRefresh.position.set(-4.5, 2.2, -1);
    // this.buttonRefresh.name = 'buttonRefreshShoukai';
    // this.scene.add(this.buttonRefresh);

    this.setModel();
  }

  async setModel() {
    switch (this.experience.world.language) {
      case 'francais':
        this.textModel = this.experience.world.texts.textModelShoukaiFrancais;
        break;
      case 'nihongo':
        this.textModel = this.experience.world.texts.textModelShoukaiNihongo;
        break;
      case 'english':
        this.textModel = this.experience.world.texts.textModelShoukaiEnglish;
        break;
    }

    this.textModel.translateY(4);

    this.setVariables();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    this.arrowHitbox = this.textModel.children[0].children[0];
    this.arrowHitbox.visible = false;
    this.arrowShoukai = this.textModel.children[0].children[1];
    this.arrowTextShoukai = this.textModel.children[0].children[2];
    this.arrowTextShoukai.visible = false;
    this.textRight = this.textModel.children[0].children[3];
    this.textStack = this.textModel.children[0].children[4];
    this.stackImg = this.textModel.children[0].children[5];
    this.stackImg.material.depthTest = true;
    this.stackImg.material.depthWrite = true;

    this.arrowHome = this.textModel.children[1].children[0];
    this.homeHitbox = this.textModel.children[1].children[1];
    this.homeHitbox.visible = false;
    this.textLeft = this.textModel.children[1].children[2];

    this.textLeft.material.emissive = new THREE.Color('white');

    this.textRight.material.transparent = true;
    this.textRight.material.opacity = 0;

    /**
     * ANIMATIONS
     */
    // ARROW TRANSLATION
    this.tweenArrowOrigin = new TWEEN.Tween(this.arrowShoukai.position)
      .to({ x: 0.2185 }, 500)
      .easing(TWEEN.Easing.Exponential.In)
      .onStart(() => {
        this.arrowTextShoukai.visible = false;
      });
    this.tweenArrowToggle = new TWEEN.Tween(this.arrowShoukai.position)
      .to({ x: -0.1085 }, 600)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        this.arrowTextShoukai.visible = true;
      });
    // TEXT APPEARANCE
    this.tweenAppearText = new TWEEN.Tween(this.textRight.material)
      .to({ opacity: 1 }, 555)
      .easing(TWEEN.Easing.Circular.In);

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[1] = true;

    /**
     * ANIMATE
     */
    // this.animateText();
  }

  animateText() {
    this.textRight.material.opacity = 0;
    this.arrowTextShoukai.visible = false;
    this.arrowShoukai.position.x = 0.2185;

    this.scene.add(this.textModel);

    this.tweenAppearText.start();
  }
}
