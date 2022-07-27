import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextKeshiki {
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
    // this.buttonRefresh.position.set(-2.5, 9.2, -10);
    // this.buttonRefresh.name = 'buttonRefreshKeshiki';
    // this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.model = new TextModel('../../../models/keshiki.glb');
    this.setModel();
  }

  async setModel() {
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    this.scene.add(this.textModel);

    this.textModel.rotateZ(Math.PI);
    this.textModel.position.set(
      this.experience.world.keshiki.mesh.position.x,
      this.experience.world.keshiki.mesh.position.y,
      this.experience.world.keshiki.mesh.position.z
    );
    this.textModel.translateZ(-3);
    this.textModel.translateY(0.01);

    this.setVariables();

    this.setAnimation();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    /**
     * INIT
     */
    this.select = this.textModel.children[2];
    this.mouse = this.textModel.children[2].children[6];
    this.select1a = this.textModel.children[2].children[0];
    this.select1b = this.textModel.children[2].children[1];
    this.select2a = this.textModel.children[2].children[2];
    this.select2b = this.textModel.children[2].children[3];
    this.select3a = this.textModel.children[2].children[4];
    this.select3b = this.textModel.children[2].children[5];
    this.selectArr = [
      this.select1a,
      this.select1b,
      this.select2a,
      this.select2b,
      this.select3a,
      this.select3b,
      this.mouse,
    ];

    this.select.translateY(0.01);

    this.contact = this.textModel.children[3];
    this.contactHitbox = this.textModel.children[4];
    this.contactHitbox.visible = false;
    this.nihongo = this.textModel.children[7];
    this.nihongoHitbox = this.textModel.children[10];
    this.nihongoHitbox.visible = false;
    this.francais = this.textModel.children[8];
    this.francaisHitbox = this.textModel.children[6];
    this.francaisHitbox.visible = false;
    this.english = this.textModel.children[9];
    this.englishHitbox = this.textModel.children[5];
    this.englishHitbox.visible = false;

    this.aboutNihongo1 = this.textModel.children[0].children[0];
    this.aboutNihongo2 = this.textModel.children[0].children[1];
    this.aboutNihongo3 = this.textModel.children[0].children[2];
    this.aboutFrancais1 = this.textModel.children[0].children[3];
    this.aboutFrancais2 = this.textModel.children[0].children[4];
    this.aboutFrancais3 = this.textModel.children[0].children[5];
    this.aboutEnglish1 = this.textModel.children[0].children[6];
    this.aboutEnglish2 = this.textModel.children[0].children[7];
    this.aboutEnglish3 = this.textModel.children[0].children[8];

    this.bienvenue = [
      this.textModel.children[1].children[0],
      this.textModel.children[1].children[1],
      this.textModel.children[1].children[2],
      this.textModel.children[1].children[3],
    ];
    this.welcome = [
      this.textModel.children[1].children[11],
      this.textModel.children[1].children[4],
      this.textModel.children[1].children[5],
      this.textModel.children[1].children[6],
    ];
    this.youkoso = [
      this.textModel.children[1].children[7],
      this.textModel.children[1].children[8],
      this.textModel.children[1].children[9],
      this.textModel.children[1].children[10],
    ];

    this.nihongo.visible = false;
    this.francais.visible = false;
    this.english.visible = false;

    /**
     * MATERIALS
     */
    this.nihongo.material.emissive = new THREE.Color('white');

    this.contactSelectMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.contact.material = this.contactSelectMaterial;
    for (var i = 0; i < this.selectArr.length; i++) {
      this.selectArr[i].material = this.contactSelectMaterial;
    }

    this.erabuMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
    });
    this.aboutNihongoArr = [
      this.aboutNihongo1,
      this.aboutNihongo2,
      this.aboutNihongo3,
    ];
    this.aboutFrancaisArr = [
      this.aboutFrancais1,
      this.aboutFrancais2,
      this.aboutFrancais3,
    ];
    this.aboutEnglishArr = [
      this.aboutEnglish1,
      this.aboutEnglish2,
      this.aboutEnglish3,
    ];
    for (var i = 0; i < this.aboutNihongoArr.length; i++) {
      this.aboutNihongoArr[i].translateY(0.3);
      this.aboutFrancaisArr[i].translateY(0.3);
      this.aboutEnglishArr[i].translateY(0.3);
      this.aboutNihongoArr[i].visible = false;
      this.aboutFrancaisArr[i].visible = false;
      this.aboutEnglishArr[i].visible = false;
      this.aboutNihongoArr[i].material = this.erabuMaterial;
      this.aboutFrancaisArr[i].material = this.erabuMaterial;
      this.aboutEnglishArr[i].material = this.erabuMaterial;
    }

    this.messageMaterialOne = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.messageMaterialTwo = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.messageMaterialThree = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.messageMaterialFour = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.bienvenue[0].material = this.messageMaterialOne;
    this.welcome[0].material = this.messageMaterialOne;
    this.youkoso[0].material = this.messageMaterialOne;
    this.bienvenue[1].material = this.messageMaterialTwo;
    this.welcome[1].material = this.messageMaterialTwo;
    this.youkoso[1].material = this.messageMaterialTwo;
    this.bienvenue[2].material = this.messageMaterialThree;
    this.welcome[2].material = this.messageMaterialThree;
    this.youkoso[2].material = this.messageMaterialThree;
    this.bienvenue[3].material = this.messageMaterialFour;
    this.welcome[3].material = this.messageMaterialFour;
    this.youkoso[3].material = this.messageMaterialFour;
    for (var i = 0; i < this.bienvenue.length; i++) {
      this.bienvenue[i].visible = false;
      this.welcome[i].visible = false;
      this.youkoso[i].visible = false;
    }

    /**
     * TWEEN ANIMATIONS
     */
    this.select1a.position.set(-0.8, 0, -0.8);
    this.select1b.position.set(0.8, 0, 0.8);
    this.select2a.position.set(-0.5, 0, 0);
    this.select2b.position.set(0.5, 0, 0);
    this.select3a.position.set(-0.8, 0, -0.8);
    this.select3b.position.set(0.8, 0, 0.8);
    this.mouse.translateZ(0.55);

    this.select1a.material.opacity = 0;

    this.translateSelects = () => {
      for (var i = 0; i < this.selectArr.length; i++) {
        this.tweenTranslateSelects = new TWEEN.Tween(this.selectArr[i].position)
          .to({ x: 0, y: 0, z: 0 }, 3333)
          .easing(TWEEN.Easing.Cubic.Out);
        this.tweenTranslateSelects.start();
      }
    };
    this.tweenAppearSelects = new TWEEN.Tween(this.select1a.material)
      .to({ opacity: 1 }, 5555)
      .easing(TWEEN.Easing.Cubic.Out)
      .onStart(() => {
        this.experience.world.textKeshiki.nihongo.visible = false;
        this.experience.world.textKeshiki.francais.visible = false;
        this.experience.world.textKeshiki.english.visible = false;
        this.translateSelects();
      });

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[7] = true;

    this.experience.world.keshiki.objectsToTest.push(
      this.englishHitbox,
      this.nihongoHitbox,
      this.francaisHitbox
    );

    /**
     * ANIMATE
     */
    this.animateText();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModel);

    this.nihongo.visible = false;
    this.francais.visible = false;
    this.english.visible = false;

    setTimeout(() => {
      this.nihongo.visible = true;
      this.francais.visible = true;
      this.english.visible = true;
    }, 1000);
  }

  about(toggle, area) {
    if (toggle) {
      switch (this.experience.world.language) {
        case 'francais':
          switch (area) {
            case 'one':
              this.aboutFrancaisArr[0].visible = true;
              break;
            case 'two':
              this.aboutFrancaisArr[1].visible = true;
              break;
            case 'three':
              this.aboutFrancaisArr[2].visible = true;
              break;
          }
          break;
        case 'nihongo':
          switch (area) {
            case 'one':
              this.aboutNihongoArr[0].visible = true;
              break;
            case 'two':
              this.aboutNihongoArr[1].visible = true;
              break;
            case 'three':
              this.aboutNihongoArr[2].visible = true;
              break;
          }
          break;
        case 'english':
          switch (area) {
            case 'one':
              this.aboutEnglishArr[0].visible = true;
              break;
            case 'two':
              this.aboutEnglishArr[1].visible = true;
              break;
            case 'three':
              this.aboutEnglishArr[2].visible = true;
              break;
          }
          break;
      }
    } else {
      this.aboutFrancaisArr.forEach((element) => (element.visible = false));
      this.aboutNihongoArr.forEach((element) => (element.visible = false));
      this.aboutEnglishArr.forEach((element) => (element.visible = false));
    }
  }

  coucou(coucou) {
    var TWEEN = require('@tweenjs/tween.js');

    switch (coucou) {
      case 'bienvenue':
        this.bienvenue.forEach((element) => (element.visible = true));
        break;
      case 'youkoso':
        this.youkoso.forEach((element) => (element.visible = true));
        break;
      case 'welcome':
        this.welcome.forEach((element) => (element.visible = true));
        break;
    }

    for (var i = 0; i < this.youkoso.length; i++) {
      this.tweenCoucou = new TWEEN.Tween(this.youkoso[i].material)
        .to({ opacity: 1 }, 500 + i * 1000)
        .easing(TWEEN.Easing.Cubic.InOut);
      this.tweenCoucou.start();
    }

    setTimeout(() => {
      switch (coucou) {
        case 'bienvenue':
          this.bienvenue.forEach((element) => (element.visible = false));
          break;
        case 'youkoso':
          this.youkoso.forEach((element) => (element.visible = false));
          break;
        case 'welcome':
          this.welcome.forEach((element) => (element.visible = false));
          break;
      }
    }, 3333);
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
