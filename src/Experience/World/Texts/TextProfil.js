import * as THREE from 'three';

import Experience from '../../Experience.js';

export default class TextProfil {
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
    // this.buttonRefresh.position.set(-3, 1.2, 0);
    // this.buttonRefresh.name = 'buttonRefreshProfil';
    // this.scene.add(this.buttonRefresh);

    this.setModel();
  }

  async setModel() {
    switch (this.experience.world.language) {
      case 'francais':
        this.textModel = this.experience.world.texts.textModelProfilFrancais;
        break;
      case 'nihongo':
        this.textModel = this.experience.world.texts.textModelProfilNihongo;
        break;
      case 'english':
        this.textModel = this.experience.world.texts.textModelProfilEnglish;
        break;
    }

    this.textModel.translateX(-4);

    this.setVariables();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    this.titleProfil = this.textModel.children[1];
    this.titlePos = [-0.15, -0.2, -0.25, -0.35, 0.2, 0.2];
    this.headersProfil = this.textModel.children[4];
    this.paragraphsProfil = this.textModel.children[5];
    this.arrowProfil = this.textModel.children[3];
    this.arrowHitboxProfil = this.textModel.children[2];
    this.arrowTextProfil = this.textModel.children[0];
    this.homeArrowHitbox = this.textModel.children[7];
    this.homeArrow = this.textModel.children[6];

    this.titleProfil.children[0].material.emissive = new THREE.Color('white');

    // ARROW TEXT APPEARANCE
    this.tweenAppearTextProfil = () => {
      for (var i = 0; i < 5; i++) {
        this.arrowTextProfil.children[i].visible = true;
        this.arrowTextProfil.children[i].material.opacity = 0;
        var tweenAppearTextProfil = new TWEEN.Tween(
          this.arrowTextProfil.children[i].material
        )
          .to({ opacity: 1 }, 400 + i * 150)
          .easing(TWEEN.Easing.Exponential.In);
        tweenAppearTextProfil.start();
      }
    };
    this.tweenDisappearTextProfil = () => {
      for (var i = 0; i < 5; i++) {
        this.arrowTextProfil.children[i].visible = false;
        this.arrowTextProfil.children[i].material.opacity = 0;
      }
    };

    // ARROW TRANSLATION
    this.tweenTranslateRightArrowProfil = new TWEEN.Tween(
      this.arrowProfil.position
    )
      .to({ x: -0.195 }, 500)
      .easing(TWEEN.Easing.Exponential.In)
      .onStart(() => {
        this.tweenAppearTextProfil();
      });
    this.tweenTranslateLeftArrowProfil = new TWEEN.Tween(
      this.arrowProfil.position
    )
      .to({ x: -0.4595 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.tweenDisappearTextProfil();
      });

    // TITLE
    this.tweenAppearTitle = () => {
      for (var i = 0; i < 6; i++) {
        var tweenTranslateTitleProfil = new TWEEN.Tween(
          this.titleProfil.children[i].position
        )
          .to(
            {
              x: this.titleProfil.children[i].position.x,
              y: this.titleProfil.children[i].position.y,
              z: this.titleProfil.children[i].position.z - this.titlePos[i],
            },
            1000 + i * -100
          )
          .easing(TWEEN.Easing.Cubic.Out);
        var tweenInflateTitleProfil = new TWEEN.Tween(
          this.titleProfil.children[i].scale
        ).to(
          {
            x: 1.1,
            y: 1.1,
            z: 1.1,
          },
          100
        );
        tweenTranslateTitleProfil.chain(tweenInflateTitleProfil);
        tweenTranslateTitleProfil.start();
      }
    };

    // PARAGRAPHS
    this.paragraphsProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    this.tweenAppearParagraphs = new TWEEN.Tween(this.paragraphsProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out);

    // HEADERS
    this.headersProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    this.tweenAppearHeaders = new TWEEN.Tween(this.headersProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out)
      .onStart(() => {
        setTimeout(() => {
          this.tweenAppearParagraphs.start();
        }, 500);
      });

    // ARROWS
    this.arrowProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    for (var i = 0; i < 5; i++) {
      this.arrowTextProfil.children[i].material =
        new THREE.MeshStandardMaterial({
          emissive: 'white',
          emissiveIntensity: 5,
          transparent: true,
          opacity: 0,
        });
    }
    this.arrowHitboxProfil.visible = false;
    this.homeArrowHitbox.visible = false;

    // ARROW APPEARANCE
    this.tweenAppearArrowProfil = new TWEEN.Tween(this.arrowProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.In)
      .onComplete(() => {
        this.homeArrow.visible = true;
      });

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[0] = true;

    /**
     * ANIMATE
     */
    // this.animateText();
  }

  animateText() {
    this.arrowProfil.position.x = -0.4595;
    for (var i = 0; i < 5; i++) {
      this.arrowTextProfil.children[i].material.opacity = 0;
    }

    this.scene.add(this.textModel);

    /**
     * TITLE
     */
    this.titleProfil.children[0].translateZ(this.titlePos[0]);
    this.titleProfil.children[1].translateZ(this.titlePos[1]);
    this.titleProfil.children[2].translateZ(this.titlePos[2]);
    this.titleProfil.children[3].translateZ(this.titlePos[3]);
    this.titleProfil.children[4].translateZ(this.titlePos[4]);
    this.titleProfil.children[5].translateZ(this.titlePos[5]);
    for (var i = 0; i < 6; i++) {
      this.titleProfil.children[i].scale.set(1, 1, 1);
    }

    /**
     * ARROW
     */
    this.arrowProfil.material.opacity = 0;
    this.homeArrow.visible = false;

    /**
     * PARAGRAPHS
     */
    this.paragraphsProfil.material.opacity = 0;

    /**
     * HEADERS
     */
    this.headersProfil.material.opacity = 0;

    this.tweenAppearTitle();

    setTimeout(() => {
      this.tweenAppearHeaders.start();
    }, 200);

    setTimeout(() => {
      this.tweenAppearArrowProfil.start();
    }, 1000);
  }
}
