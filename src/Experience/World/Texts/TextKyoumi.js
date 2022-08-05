import * as THREE from 'three';

import Experience from '../../Experience.js';

export default class TextKyoumi {
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
    // this.buttonRefresh.position.set(4.5, 2.2, -0.5);
    // this.buttonRefresh.name = 'buttonRefreshKyoumi';
    // this.scene.add(this.buttonRefresh);

    this.setModel();
  }

  async setModel() {
    switch (this.experience.world.language) {
      case 'francais':
        this.textModel = this.experience.world.texts.textModelKyoumiFrancais;
        break;
      case 'nihongo':
        this.textModel = this.experience.world.texts.textModelKyoumiNihongo;
        break;
      case 'english':
        this.textModel = this.experience.world.texts.textModelKyoumiEnglish;
        break;
    }

    this.textModel.position.set(
      this.experience.world.rightPanels.gamenThree.mesh.position.x,
      this.experience.world.rightPanels.gamenThree.mesh.position.y,
      this.experience.world.rightPanels.gamenThree.mesh.position.z
    );

    this.setVariables();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModel);

    /**
     * ARROWS
     */
    this.arrowLeft = this.textModel.children[4];
    this.arrowLeftHitbox = this.textModel.children[1];
    this.arrowLeftHitbox.visible = false;
    this.arrowTextLeft = this.textModel.children[6];

    this.arrowRight = this.textModel.children[5];
    this.arrowRightHitbox = this.textModel.children[2];
    this.arrowRightHitbox.visible = false;
    this.arrowTextRight = this.textModel.children[7];

    this.arrowHome = this.textModel.children[3];
    this.arrowHomeHitbox = this.textModel.children[0];
    this.arrowHomeHitbox.visible = false;

    /**
     * TITLE
     */
    this.title = this.textModel.children[10];

    /**
     * TEXT
     */
    this.shingijutsu = this.textModel.children[13];
    this.rekishi = this.textModel.children[12];
    this.escalade = this.textModel.children[8];
    this.mv = this.textModel.children[11];
    this.gaikoku = this.textModel.children[9];
    this.textArr = [
      this.shingijutsu,
      this.rekishi,
      this.escalade,
      this.mv,
      this.gaikoku,
    ];

    /**
     * MATERIALS
     */
    this.arrowHome.material.emissive = new THREE.Color('white');

    this.arrowMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowLeft.material = this.arrowMaterial;
    this.arrowRight.material = this.arrowMaterial;

    this.arrowTextLeftMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowTextLeft.material = this.arrowTextLeftMaterial;
    this.arrowTextRightMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.arrowTextRight.material = this.arrowTextRightMaterial;

    this.titleMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.title.material = this.titleMaterial;

    this.textMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.shingijutsu.material = this.textMaterial;
    this.rekishi.material = this.textMaterial;
    this.escalade.material = this.textMaterial;
    this.mv.material = this.textMaterial;
    this.gaikoku.material = this.textMaterial;

    /**
     * ANIMATIONS
     */
    this.tweenTitleAppear = new TWEEN.Tween(this.title.material)
      .to({ opacity: 1 }, 1555)
      .easing(TWEEN.Easing.Circular.InOut);

    this.tweenArrowsAppear = new TWEEN.Tween(this.arrowLeft.material)
      .to({ opacity: 1 }, 2222)
      .easing(TWEEN.Easing.Bounce.InOut)
      .onStart(() => {
        this.arrowHome.visible = true;
      });

    this.tweenTextTranslate = () => {
      for (var i = 0; i < this.textArr.length; i++) {
        this.textArr[i].position.x = -0.25;

        var tweenTextTranslate = new TWEEN.Tween(this.textArr[i].position)
          .to({ x: -0.38 }, 1000 + i * 200)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onStart(() => {
            this.tweenTitleAppear.start();
          })
          .onComplete(() => {
            this.tweenArrowsAppear.start();
          });
        tweenTextTranslate.start();
      }
    };

    this.tweenTextAppear = new TWEEN.Tween(this.rekishi.material)
      .to({ opacity: 1 }, 1555)
      .easing(TWEEN.Easing.Circular.InOut)
      .onStart(() => {
        this.tweenTextTranslate();
      });

    /**
     * ARROWS' TRANSLATION
     */
    this.tweenToggleArrowLeft = new TWEEN.Tween(this.arrowLeft.position)
      .to({ x: -0.34 }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.arrowTextLeft.material.opacity = 1;
      });
    this.tweenOriginArrowLeft = new TWEEN.Tween(this.arrowLeft.position)
      .to({ x: -0.4747 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.arrowTextLeft.material.opacity = 0;
      });

    this.tweenToggleArrowRight = new TWEEN.Tween(this.arrowRight.position)
      .to({ x: 0.275 }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.arrowTextRight.material.opacity = 1;
      });
    this.tweenOriginArrowRight = new TWEEN.Tween(this.arrowRight.position)
      .to({ x: 0.4648 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.arrowTextRight.material.opacity = 0;
      });

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[6] = true;

    /**
     * ANIMATE
     */
    // this.animateText();
  }

  animateText() {
    this.scene.add(this.textModel);

    this.arrowRight.position.x = 0.4648;
    this.arrowLeft.position.x = -0.4747;

    this.arrowTextRight.material.opacity = 0;
    this.arrowTextLeft.material.opacity = 0;

    /**
     * INIT VARIABLES
     */
    this.arrowHome.visible = false;
    this.arrowLeft.material.opacity = 0;
    this.arrowRight.material.opacity = 0;
    this.title.material.opacity = 0;
    this.arrowLeft.position.x = -0.4747;
    this.arrowRight.position.x = 0.4648;

    for (var i = 0; i < this.textArr.length; i++) {
      this.textArr[i].material.opacity = 0;
      this.textArr[i].translateX(-0.25);
    }

    /**
     * APPEARANCE
     */
    setTimeout(() => {
      this.tweenTextAppear.start();
    }, 555);
  }
}
