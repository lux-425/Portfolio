import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextProfil {
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
    this.buttonRefresh.position.set(-3, 1.2, 0);
    this.buttonRefresh.name = 'buttonRefreshProfil';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/Gamen/gamen_000.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    // this.scene.add(this.textModel);

    this.textModel.translateX(-4);

    this.setVariables();

    this.setAnimation();
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
    var TWEEN = require('@tweenjs/tween.js');

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

    /**
     * HEADERS
     */
    this.headersProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    var tweenAppearHeaders = new TWEEN.Tween(this.headersProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out);
    setTimeout(() => {
      tweenAppearHeaders.start();
    }, 200);

    /**
     * PARAGRAPHS
     */
    this.paragraphsProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    var tweenAppearParagraphs = new TWEEN.Tween(this.paragraphsProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out);
    setTimeout(() => {
      tweenAppearParagraphs.start();
    }, 600);

    /**
     * ARROW
     */
    this.arrowProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });

    this.arrowHitboxProfil.visible = false;

    for (var i = 0; i < 5; i++) {
      this.arrowTextProfil.children[i].material =
        new THREE.MeshStandardMaterial({
          emissive: 'white',
          emissiveIntensity: 5,
          transparent: true,
          opacity: 0,
        });
    }

    this.homeArrowHitbox.visible = false;
    this.homeArrow.visible = false;

    // ARROW APPEARANCE
    var tweenAppearArrowProfil = new TWEEN.Tween(this.arrowProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.In)
      .onComplete(() => {
        this.homeArrow.visible = true;
      });
    setTimeout(() => {
      tweenAppearArrowProfil.start();
    }, 1000);

    // ARROW TEXT APPEARANCE
    this.tweenAppearTextProfil = () => {
      for (var i = 0; i < 5; i++) {
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
        var tweenDisappearTextProfil = new TWEEN.Tween(
          this.arrowTextProfil.children[i].material
        )
          .to({ opacity: 0 }, 500)
          .easing(TWEEN.Easing.Exponential.Out);
        tweenDisappearTextProfil.start();
      }
    };

    // ARROW TRANSLATION
    this.tweenTranslateRightArrowProfil = new TWEEN.Tween(
      this.arrowProfil.position
    )
      .to({ x: -0.175 }, 500)
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
