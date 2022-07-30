import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextGengo {
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
    // this.buttonRefresh.position.set(3, 2.2, -0.5);
    // this.buttonRefresh.name = 'buttonRefreshGengo';
    // this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.modelRight = new TextModel('../../../models/Gamen/gamen_009.glb');
    this.modelLeft = new TextModel('../../../models/Gamen/gamen_009bis.glb');
    this.setModel();
  }

  async setModel() {
    await this.modelRight.waitForLoad();
    this.textModelRight = this.modelRight.model.children[0];

    await this.modelLeft.waitForLoad();
    this.textModelLeft = this.modelLeft.model.children[0];

    this.textModelRight.position.set(
      this.experience.world.rightPanels.gamenFour.mesh.position.x,
      this.experience.world.rightPanels.gamenFour.mesh.position.y,
      this.experience.world.rightPanels.gamenFour.mesh.position.z
    );
    this.textModelLeft.position.set(
      this.experience.world.rightPanels.gamenThree.mesh.position.x,
      this.experience.world.rightPanels.gamenThree.mesh.position.y,
      this.experience.world.rightPanels.gamenThree.mesh.position.z
    );

    this.setVariables();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModelLeft);

    /**
     * LEFT PANEL
     */
    this.hitboxHon = this.textModelLeft.children[0].children[0];
    this.hitboxJLPT = this.textModelLeft.children[0].children[1];
    this.hitboxSoftwares = this.textModelLeft.children[0].children[2];
    this.hitboxHon.visible = false;
    this.hitboxJLPT.visible = false;
    this.hitboxSoftwares.visible = false;

    this.hon = this.textModelLeft.children[0].children[3];
    this.honFrame = this.textModelLeft.children[0].children[4];
    this.jlpt = this.textModelLeft.children[0].children[5];
    this.jlptFrame = this.textModelLeft.children[0].children[6];
    this.softwares = this.textModelLeft.children[0].children[7];
    this.softwaresFrame = this.textModelLeft.children[0].children[8];

    /**
     * RIGHT PANEL
     */
    // ARROWS
    this.hitboxHome = this.textModelRight.children[0].children[3];
    this.hitboxHome.visible = false;
    this.hitboxLeft = this.textModelRight.children[0].children[4];
    this.hitboxLeft.visible = false;
    this.hitboxRight = this.textModelRight.children[0].children[5];
    this.hitboxRight.visible = false;

    this.arrowHome = this.textModelRight.children[0].children[0];
    this.arrowLeft = this.textModelRight.children[0].children[1];
    this.arrowRight = this.textModelRight.children[0].children[2];
    this.arrowTextLeft = this.textModelRight.children[0].children[6];
    this.arrowTextRight = this.textModelRight.children[0].children[7];

    // 画像
    for (var i = 11; i < 22; i++) {
      switch (this.textModelRight.children[0].children[i].name) {
        case 'anki':
          this.anki = this.textModelRight.children[0].children[i];
          break;
        case 'bunproStats':
          this.bunproStats = this.textModelRight.children[0].children[i];
          break;
        case 'bunpro':
          this.bunpro = this.textModelRight.children[0].children[i];
          break;
        case 'jlpt':
          this.jlptPhoto = this.textModelRight.children[0].children[i];
          break;
        case 'ankiStats':
          this.ankiStats = this.textModelRight.children[0].children[i];
          break;
        case 'tobira':
          this.tobira = this.textModelRight.children[0].children[i];
          break;
        case 'rtk':
          this.rtk = this.textModelRight.children[0].children[i];
          break;
        case 'kanzenN2':
          this.kanzenN2 = this.textModelRight.children[0].children[i];
          break;
        case 'kanzenN3':
          this.kanzenN3 = this.textModelRight.children[0].children[i];
          break;
        case 'mnn1':
          this.mnn1 = this.textModelRight.children[0].children[i];
          break;
        case 'mnn2':
          this.mnn2 = this.textModelRight.children[0].children[i];
          break;
      }
    }

    // 本
    this.honNames = this.textModelRight.children[0].children[8];

    // ソフトエア
    this.softwaresNames = this.textModelRight.children[0].children[10];

    // ＪＬＰＴ
    this.jlptWaiting = this.textModelRight.children[0].children[9];

    /**
     * MATERIALS
     */
    this.arrowHome.material.emissive = new THREE.Color('white');

    this.arrowsMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowLeft.material = this.arrowsMaterial;
    this.arrowRight.material = this.arrowsMaterial;

    this.arrowTextLeftMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowTextRightMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowTextLeft.material = this.arrowTextLeftMaterial;
    this.arrowTextRight.material = this.arrowTextRightMaterial;

    this.namesMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.honNames.material = this.namesMaterial;
    this.softwaresNames.material = this.namesMaterial;
    this.jlptWaiting.material = this.namesMaterial;

    this.panelLeftMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.hon.material = this.panelLeftMaterial;
    this.softwares.material = this.panelLeftMaterial;
    this.jlpt.material = this.panelLeftMaterial;

    /**
     * IMAGES' TRANSPARENCE CORRECTION
     */
    this.imagesArr = [
      this.rtk,
      this.mnn1,
      this.mnn2,
      this.tobira,
      this.kanzenN2,
      this.kanzenN3,
      this.jlptPhoto,
      this.ankiStats,
      this.bunproStats,
      this.anki,
      this.bunpro,
    ];
    for (var i = 0; i < this.imagesArr.length; i++) {
      this.imagesArr[i].material.depthTest = true;
      this.imagesArr[i].material.depthWrite = true;
    }

    /**
     * ARROWS' TRANSLATION
     */
    this.tweenToggleArrowLeft = new TWEEN.Tween(this.arrowLeft.position)
      .to({ x: 0.3507 }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.arrowTextLeft.material.opacity = 1;
      });
    this.tweenOriginArrowLeft = new TWEEN.Tween(this.arrowLeft.position)
      .to({ x: 0.4607 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.arrowTextLeft.material.opacity = 0;
      });

    this.tweenToggleArrowRight = new TWEEN.Tween(this.arrowRight.position)
      .to({ x: -0.3769 }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.arrowTextRight.material.opacity = 1;
      });
    this.tweenOriginArrowRight = new TWEEN.Tween(this.arrowRight.position)
      .to({ x: -0.4969 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.arrowTextRight.material.opacity = 0;
      });

    this.tweenAppearLeftPanel = new TWEEN.Tween(this.jlpt.material)
      .to({ opacity: 1 }, 1000)
      .easing(TWEEN.Easing.Bounce.InOut);
    this.tweenAppearArrows = new TWEEN.Tween(this.arrowLeft.material)
      .to({ opacity: 1 }, 1000)
      .easing(TWEEN.Easing.Bounce.InOut)
      .onComplete(() => {
        this.arrowHome.visible = true;
      });

    this.appearPanel = new TWEEN.Tween(this.jlptWaiting.material)
      .to({ opacity: 1 }, 500)
      .easing(TWEEN.Easing.Cubic.InOut);

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[5] = true;

    this.actualTab = 'jlpt';

    /**
     * ANIMATE
     */
    // this.animateText();
  }

  animateText() {
    this.scene.add(this.textModelRight);
    this.scene.add(this.textModelLeft);

    this.arrowRight.position.x = -0.4969;
    this.arrowLeft.position.x = 0.4607;

    this.tokoroDatta = true;

    /**
     * INIT
     */
    // LEFT
    this.honFrame.visible = false;
    this.jlptFrame.visible = false;
    this.softwaresFrame.visible = false;
    this.hon.material.opacity = 0;

    // RIGHT
    this.arrowLeft.material.opacity = 0;
    this.arrowRight.material.opacity = 0;
    this.arrowHome.visible = false;
    this.jlptWaiting.material.opacity = 0;
    for (var i = 0; i < this.imagesArr.length; i++) {
      this.imagesArr[i].visible = false;
    }

    this.tweenAppearLeftPanel.start();

    this.tweenAppearArrows.start();

    this.toggleJLPT();
  }

  disappearPanel() {
    for (var i = 0; i < this.imagesArr.length; i++) {
      this.imagesArr[i].visible = false;
    }
    this.jlptWaiting.material.opacity = 0;

    this.honNames.visible = false;
    this.softwaresNames.visible = false;
    this.jlptWaiting.visible = false;

    this.honFrame.visible = false;
    this.jlptFrame.visible = false;
    this.softwaresFrame.visible = false;
  }

  toggleHon() {
    this.disappearPanel();

    this.actualTab = 'hon';

    this.honNames.visible = true;

    this.honFrame.visible = true;

    for (var i = 0; i < 6; i++) {
      this.imagesArr[i].visible = true;
    }

    this.appearPanel.start();
  }

  toggleJLPT() {
    this.disappearPanel();

    this.actualTab = 'jlpt';

    this.jlptWaiting.visible = true;

    if (this.tokoroDatta) {
      setTimeout(() => {
        this.jlptFrame.visible = true;
        this.jlptPhoto.visible = true;
        this.tokoroDatta = false;
      }, 333);
    } else {
      this.jlptFrame.visible = true;
      this.jlptPhoto.visible = true;
    }

    this.appearPanel.start();
  }

  toggleSoftwares() {
    this.disappearPanel();

    this.actualTab = 'softwares';

    this.softwaresNames.visible = true;
    this.anki.visible = true;
    this.bunpro.visible = true;
    this.ankiStats.visible = true;
    this.bunproStats.visible = true;

    this.softwaresFrame.visible = true;

    this.appearPanel.start();
  }
}
