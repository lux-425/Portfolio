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
    this.buttonRefreshGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    this.buttonRefreshMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
    });
    this.buttonRefresh = new THREE.Mesh(
      this.buttonRefreshGeometry,
      this.buttonRefreshMaterial
    );
    this.buttonRefresh.position.set(-2.5, 9.2, -10);
    this.buttonRefresh.name = 'buttonRefreshKeshiki';
    this.scene.add(this.buttonRefresh);

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

    // this.setAnimation();
  }

  setVariables() {
    /**
     * INIT
     */
    this.select = this.textModel.children[10];
    this.contact = this.textModel.children[2];
    this.contactHitbox = this.textModel.children[3];
    this.contactHitbox.visible = false;
    this.nihongo = this.textModel.children[6];
    this.nihongoHitbox = this.textModel.children[9];
    this.nihongoHitbox.visible = false;
    this.francais = this.textModel.children[7];
    this.francaisHitbox = this.textModel.children[5];
    this.francaisHitbox.visible = false;
    this.english = this.textModel.children[8];
    this.englishHitbox = this.textModel.children[4];
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
      this.textModel.children[1].children[4],
      this.textModel.children[1].children[5],
      this.textModel.children[1].children[6],
      this.textModel.children[1].children[11],
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
    this.select.material = this.contactSelectMaterial;

    this.erabuMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    this.aboutNihongo1.material = this.erabuMaterial;
    this.aboutNihongo2.material = this.erabuMaterial;
    this.aboutNihongo3.material = this.erabuMaterial;
    this.aboutFrancais1.material = this.erabuMaterial;
    this.aboutFrancais2.material = this.erabuMaterial;
    this.aboutFrancais3.material = this.erabuMaterial;
    this.aboutEnglish1.material = this.erabuMaterial;
    this.aboutEnglish2.material = this.erabuMaterial;
    this.aboutEnglish3.material = this.erabuMaterial;

    this.messageMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      transparent: true,
      opacity: 0,
    });
    for (var i = 0; i < this.bienvenue.length; i++) {
      this.bienvenue[i].material = this.messageMaterial;
      this.welcome[i].material = this.messageMaterial;
      this.youkoso[i].material = this.messageMaterial;
    }

    this.animateText();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    console.log(this.textModel);

    this.nihongo.visible = false;
    this.francais.visible = false;
    this.english.visible = false;

    setTimeout(() => {
      this.nihongo.visible = true;
      this.francais.visible = true;
      this.english.visible = true;
    }, 1000);
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
