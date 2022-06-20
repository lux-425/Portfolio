import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextKeiken {
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
    this.buttonRefresh.position.set(-0.5, 2.2, -0.5);
    this.buttonRefresh.name = 'buttonRefreshKeiken';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.modelIntro = new TextModel(
      '../../../models/Gamen/gamen_003-4_intro.glb'
    );
    this.model = new TextModel('../../../models/Gamen/gamen_003-4.glb');

    this.setModel();
  }

  async setModel() {
    /**
     * INTRO
     */
    await this.modelIntro.waitForLoad();
    this.textModelIntro = this.modelIntro.model.children[0];
    this.scene.add(this.textModelIntro);

    this.textModelIntro.position.set(
      this.experience.world.centerPanels.gamenOne.mesh.position.x,
      1,
      this.experience.world.centerPanels.gamenOne.mesh.position.z
    );

    this.textModelIntro.children[0].children[0].children[0].material.emissive =
      new THREE.Color('white');
    this.textModelIntro.children[0].children[0].children[0].material.transparent = true;

    /**
     * TEXT
     */
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];
    // this.scene.add(this.textModel);

    console.log(this.textModel);

    this.textModel.position.set(
      this.experience.world.centerPanels.gamenOne.mesh.position.x,
      1,
      this.experience.world.centerPanels.gamenOne.mesh.position.z
    );

    // LOGOS
    // this.textModel.children[1].children[3].material.depthTest = true;
    // this.textModel.children[1].children[3].material.depthWrite = true;

    // this.textModel.children[1].children[4].material.depthTest = true;
    // this.textModel.children[1].children[4].material.depthWrite = true;

    // CONTENT
    this.textModel.children[0].children[2].material.emissive =
      new THREE.Color('white');
    // this.textModel.children[0].children[0].children[0].material.transparent = true;

    /**
     * ANIMATIONS
     */
    this.animateText();

    this.setAnimation();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModelIntro);

    this.animateIntro();

    /**
     * ARROW
     */
  }

  animateIntro() {
    var TWEEN = require('@tweenjs/tween.js');

    this.textModelIntro.visible = true;
    this.textModelIntro.children[0].children[0].children[0].material.opacity = 1;

    /**
     * 実
     */
    this.jitsu = this.textModelIntro.children[0].children[2];

    this.animateIntroJitsu();

    /**
     * 務
     */
    this.mu = this.textModelIntro.children[0].children[0];

    this.mu.visible = false;

    setTimeout(() => {
      this.animateIntroMu();
    }, 950);

    /**
     * 経
     */
    this.kei = this.textModelIntro.children[0].children[1];

    this.kei.visible = false;

    setTimeout(() => {
      this.animateIntroKei();
    }, 1450);

    /**
     * 験
     */
    this.ken = this.textModelIntro.children[0].children[3];

    this.ken.visible = false;

    setTimeout(() => {
      this.animateIntroKen();
    }, 2950);

    setTimeout(() => {
      var tweenJitsumukeikenDisappear = new TWEEN.Tween(
        this.textModelIntro.children[0].children[0].children[0].material
      )
        .to({ opacity: 0 }, 400)
        .easing(TWEEN.Easing.Cubic.Out);
      tweenJitsumukeikenDisappear.start();
    }, 5000);

    setTimeout(() => {
      this.textModelIntro.visible = false;
    }, 5200);
  }

  animateIntroJitsu() {
    var TWEEN = require('@tweenjs/tween.js');

    this.jitsuArr = [
      this.jitsu.children[1],
      this.jitsu.children[2],
      this.jitsu.children[3],
      this.jitsu.children[5],
      this.jitsu.children[4],
      this.jitsu.children[0],
    ];
    this.jitsuPos = [
      { x: 0.011739253997802734, y: 0, z: -0.20095087587833405 },
      {
        x: 0.011739253997802734,
        y: 0.00012731552124023438,
        z: -0.20095087587833405,
      },
      {
        x: 0.011739253997802734,
        y: 0.00012731552124023438,
        z: -0.20095087587833405,
      },
      {
        x: 0.011739253997802734,
        y: 0.00012731552124023438,
        z: -0.20095087587833405,
      },
      { x: 0.011739253997802734, y: 0, z: -0.20095087587833405 },
      { x: 0.011739253997802734, y: 0, z: -0.20095087587833405 },
    ];

    //　一画
    this.jitsuArr[0].translateZ(-0.15);
    // 二画
    this.jitsuArr[1].translateX(-0.3);
    this.jitsuArr[1].visible = false;
    // 三画
    this.jitsuArr[2].translateX(-0.4);
    this.jitsuArr[2].visible = false;
    // 四画
    this.jitsuArr[3].translateX(-0.5);
    this.jitsuArr[3].visible = false;
    // 五画
    this.jitsuArr[4].translateZ(0.2);
    this.jitsuArr[4].visible = false;
    // 六画
    this.jitsuArr[5].translateZ(0.15);
    this.jitsuArr[5].translateX(0.15);
    this.jitsuArr[5].visible = false;

    var tweenJitsuTranslate = new TWEEN.Tween(this.jitsuArr[0].position)
      .to(this.jitsuPos[0], 400)
      .easing(TWEEN.Easing.Cubic.Out);
    tweenJitsuTranslate.start();

    setTimeout(() => {
      for (var i = 1; i < 4; i++) {
        this.jitsuArr[i].visible = true;
        var tweenJitsuTranslate = new TWEEN.Tween(this.jitsuArr[i].position)
          .to(this.jitsuPos[i], 50 + 100 * i)
          .easing(TWEEN.Easing.Exponential.In);
        tweenJitsuTranslate.start();
      }
    }, 200);

    setTimeout(() => {
      this.jitsuArr[4].visible = true;
      var tweenJitsuTranslate = new TWEEN.Tween(this.jitsuArr[4].position)
        .to(this.jitsuPos[4], 150)
        .easing(TWEEN.Easing.Back.In);
      tweenJitsuTranslate.start();
    }, 600);

    setTimeout(() => {
      this.jitsuArr[5].visible = true;
      var tweenJitsuTranslate = new TWEEN.Tween(this.jitsuArr[5].position)
        .to(this.jitsuPos[5], 150)
        .easing(TWEEN.Easing.Back.Out);
      tweenJitsuTranslate.start();
    }, 800);
  }

  animateIntroMu() {
    var TWEEN = require('@tweenjs/tween.js');

    this.muArr = [
      this.mu.children[2],
      this.mu.children[0],
      this.mu.children[1],
      this.mu.children[3],
    ];
    this.muPos = [
      { x: -0.03281068801879883, y: 0, z: -0.14692486822605133 },
      { x: -0.03281068801879883, y: 0, z: -0.14692486822605133 },
      { x: -0.03281068801879883, y: 0, z: -0.14692486822605133 },
      { x: -0.03281068801879883, y: 0, z: -0.14692486822605133 },
    ];

    //　一画
    this.muArr[0].translateZ(-0.2);
    // 二画
    this.muArr[1].translateZ(0.3);
    // 三画
    this.muArr[2].translateX(0.4);
    // 四画
    this.muArr[3].translateX(0.25);
    this.muArr[3].translateZ(0.25);

    for (var i = 0; i < this.muArr.length; i++) {
      this.mu.visible = true;
      var tweenMuTranslate = new TWEEN.Tween(this.muArr[i].position)
        .to(this.muPos[i], 150 + 100 * i)
        .easing(TWEEN.Easing.Quintic.In);
      tweenMuTranslate.start();
    }
  }

  animateIntroKei() {
    var TWEEN = require('@tweenjs/tween.js');

    this.keiArr = [
      this.kei.children[6],
      this.kei.children[0],
      this.kei.children[1],
      this.kei.children[8],
      this.kei.children[7],
      this.kei.children[2],
      this.kei.children[5],
      this.kei.children[3],
      this.kei.children[4],
    ];
    this.keiPos = [
      { x: -0.12884235382080078, y: 0, z: -0.14070619642734528 },
      { x: -0.12884235382080078, y: 0, z: -0.14070619642734528 },
      { x: -0.12884235382080078, y: 0, z: -0.14070619642734528 },
      { x: -0.12884235382080078, y: 0, z: -0.14070619642734528 },
      { x: -0.12884235382080078, y: 0, z: -0.14070619642734528 },
      { x: -0.12884235382080078, y: 0, z: -0.14070619642734528 },
      {
        x: -0.12781119346618652,
        y: 0.0008783340454101562,
        z: -0.14021135866641998,
      },
      {
        x: -0.12781119346618652,
        y: 0.002004861831665039,
        z: -0.14021135866641998,
      },
      {
        x: -0.12781119346618652,
        y: 0.002004861831665039,
        z: -0.14021135866641998,
      },
    ];

    //　一画
    this.keiArr[0].translateZ(-0.2);
    this.keiArr[0].translateX(-0.2);
    // 二画
    this.keiArr[1].translateX(0.3);
    // 三画
    this.keiArr[2].translateZ(0.35);
    // 四画
    this.keiArr[3].translateX(-0.15);
    this.keiArr[3].translateZ(0.25);
    this.keiArr[3].visible = false;
    // 五画
    this.keiArr[4].translateX(0.15);
    this.keiArr[4].translateZ(0.25);
    this.keiArr[4].visible = false;
    // 六画
    this.keiArr[5].translateZ(-0.5);
    this.keiArr[5].visible = false;
    // 七画
    this.keiArr[6].translateX(0.2);
    this.keiArr[6].visible = false;
    // 八画
    this.keiArr[7].translateZ(0.3);
    this.keiArr[7].visible = false;
    // 九画
    this.keiArr[8].translateX(0.2);
    this.keiArr[8].visible = false;

    for (var i = 0; i < 3; i++) {
      this.kei.visible = true;
      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[i].position).to(
        this.keiPos[i],
        300 + 100 * i
      );
      tweenKeiTranslate.start();
    }

    setTimeout(() => {
      this.keiArr[3].visible = true;

      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[3].position)
        .to(this.keiPos[3], 800)
        .easing(TWEEN.Easing.Exponential.InOut);
      tweenKeiTranslate.start();
    }, 150);

    setTimeout(() => {
      this.keiArr[4].visible = true;

      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[4].position)
        .to(this.keiPos[4], 700)
        .easing(TWEEN.Easing.Exponential.InOut);
      tweenKeiTranslate.start();
    }, 300);

    setTimeout(() => {
      this.keiArr[5].visible = true;
      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[5].position)
        .to(this.keiPos[5], 1000)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKeiTranslate.start();
    }, 700);

    setTimeout(() => {
      this.keiArr[6].visible = true;
      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[6].position)
        .to(this.keiPos[6], 600)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKeiTranslate.start();
    }, 1000);

    setTimeout(() => {
      this.keiArr[7].visible = true;
      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[7].position)
        .to(this.keiPos[7], 400)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKeiTranslate.start();
    }, 1200);

    setTimeout(() => {
      this.keiArr[8].visible = true;
      var tweenKeiTranslate = new TWEEN.Tween(this.keiArr[8].position)
        .to(this.keiPos[8], 800)
        .easing(TWEEN.Easing.Cubic.Out);
      tweenKeiTranslate.start();
    }, 1300);
  }

  animateIntroKen() {
    var TWEEN = require('@tweenjs/tween.js');

    this.kenArr = [
      this.ken.children[13],
      this.ken.children[8],
      this.ken.children[9],
      this.ken.children[10],
      this.ken.children[16],
      this.ken.children[15],
      this.ken.children[14],
      this.ken.children[11],
      this.ken.children[12],
      this.ken.children[0],
      this.ken.children[1],
      this.ken.children[2],
      this.ken.children[3],
      this.ken.children[4],
      this.ken.children[5],
      this.ken.children[6],
      this.ken.children[7],
    ];
    this.kenPos = [
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      {
        x: -0.17416763305664062,
        y: 0.00011301040649414062,
        z: -0.0840793326497078,
      },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.20796465873718262, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
      {
        x: -0.17416763305664062,
        y: 0.00011301040649414062,
        z: -0.0840793326497078,
      },
      { x: -0.17416763305664062, y: 0, z: -0.0840793326497078 },
    ];

    //　一画
    this.kenArr[0].translateZ(-0.15);
    this.kenArr[0].translateX(-0.15);
    // 二画
    this.kenArr[1].translateX(-0.06);
    this.kenArr[1].visible = false;
    // 三画
    this.kenArr[2].translateX(0.3);
    this.kenArr[2].visible = false;
    // 四画
    this.kenArr[3].translateX(0.3);
    this.kenArr[3].visible = false;
    // 五画
    this.kenArr[4].translateX(0.3);
    this.kenArr[4].visible = false;
    // 六画
    this.kenArr[5].translateX(0.2);
    this.kenArr[5].rotateY(-Math.PI * 1.5);

    this.kenArr[5].visible = false;
    // 七画
    this.kenArr[6].visible = false;
    // 八画
    this.kenArr[7].visible = false;
    // 九画
    this.kenArr[8].visible = false;
    // 十画
    this.kenArr[9].visible = false;
    // 十一画
    this.kenArr[10].translateZ(-0.1);
    this.kenArr[10].visible = false;
    // 十二画
    this.kenArr[11].translateX(0.3);
    this.kenArr[11].visible = false;
    // 十三画
    this.kenArr[12].translateZ(0.1);
    this.kenArr[12].visible = false;
    // 十四画
    this.kenArr[13].translateX(0.1);
    this.kenArr[13].visible = false;
    // 十五画
    this.kenArr[14].translateZ(0.3);
    this.kenArr[14].visible = false;
    // 十六画
    this.kenArr[15].translateZ(0.4);
    this.kenArr[15].translateX(-0.1);
    this.kenArr[15].visible = false;
    // 十七画
    this.kenArr[16].translateZ(0.1);
    this.kenArr[16].translateX(0.05);
    this.kenArr[16].visible = false;

    this.ken.visible = true;

    var tweenKenTranslate = new TWEEN.Tween(this.kenArr[0].position)
      .to(this.kenPos[0], 300)
      .easing(TWEEN.Easing.Cubic.Out);
    tweenKenTranslate.start();

    setTimeout(() => {
      this.kenArr[1].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[1].position)
        .to(this.kenPos[1], 300)
        .easing(TWEEN.Easing.Cubic.Out);
      tweenKenTranslate.start();
    }, 200);

    setTimeout(() => {
      for (var i = 2; i < 5; i++) {
        this.kenArr[i].visible = true;
        var tweenKenTranslate = new TWEEN.Tween(this.kenArr[i].position)
          .to(this.kenPos[i], 100 + i * 100)
          .easing(TWEEN.Easing.Exponential.InOut);
        tweenKenTranslate.start();
      }
    }, 400);

    setTimeout(() => {
      this.kenArr[5].visible = true;
      var tweenKenRotate = new TWEEN.Tween(this.kenArr[5].rotation)
        .to(
          {
            x: -0,
            y: -0,
            z: -0,
          },
          500
        )
        .easing(TWEEN.Easing.Cubic.Out);
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[5].position)
        .to(this.kenPos[5], 500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onStart(() => {
          tweenKenRotate.start();
        });
      tweenKenTranslate.start();
    }, 600);

    setTimeout(() => {
      this.kenArr[6].visible = true;
    }, 1000);

    setTimeout(() => {
      this.kenArr[7].visible = true;
    }, 1050);

    setTimeout(() => {
      this.kenArr[8].visible = true;
    }, 1150);

    setTimeout(() => {
      this.kenArr[9].visible = true;
    }, 1200);

    setTimeout(() => {
      this.kenArr[10].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[10].position)
        .to(this.kenPos[10], 100)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKenTranslate.start();
    }, 1220);

    setTimeout(() => {
      this.kenArr[11].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[11].position)
        .to(this.kenPos[11], 150)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKenTranslate.start();
    }, 1250);

    setTimeout(() => {
      this.kenArr[12].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[12].position)
        .to(this.kenPos[12], 150)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKenTranslate.start();
    }, 1300);

    setTimeout(() => {
      this.kenArr[13].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[13].position)
        .to(this.kenPos[13], 150)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKenTranslate.start();
    }, 1400);

    setTimeout(() => {
      this.kenArr[14].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[14].position)
        .to(this.kenPos[14], 150)
        .easing(TWEEN.Easing.Exponential.Out);
      tweenKenTranslate.start();
    }, 1500);

    setTimeout(() => {
      this.kenArr[15].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[15].position)
        .to(this.kenPos[15], 300)
        .easing(TWEEN.Easing.Back.In);
      tweenKenTranslate.start();
    }, 1600);

    setTimeout(() => {
      this.kenArr[16].visible = true;
      var tweenKenTranslate = new TWEEN.Tween(this.kenArr[16].position)
        .to(this.kenPos[16], 300)
        .easing(TWEEN.Easing.Back.In);
      tweenKenTranslate.start();
    }, 1650);
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
