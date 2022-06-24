import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextProject {
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
    this.buttonRefresh.position.set(-2, 1.7, -1);
    this.buttonRefresh.name = 'buttonRefreshProject';
    this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.modelIntro = new TextModel(
      '../../../models/Gamen/gamen_005-6_intro.glb'
    );
    this.setModel();
  }

  async setModel() {
    // INTRO
    await this.modelIntro.waitForLoad();
    this.textModelIntro = this.modelIntro.model.children[0];
    this.scene.add(this.textModelIntro);

    this.textModelIntro.translateX(-4);

    this.textModelIntro.children[0].children[0].children[0].material.emissive =
      new THREE.Color('white');
    this.textModelIntro.children[0].children[0].children[0].material.transparent = true;

    /**
     * ANIMATIONS
     */
    this.animate();

    this.setAnimation();
  }

  animate() {
    // this.scene.remove(this.textModel);

    this.animateIntro();

    // setTimeout(() => {
    //   this.scene.add(this.textModel);
    //   this.animateText();
    // }, 5250);
  }

  animateIntro() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModelIntro);

    this.pu = this.textModelIntro.children[0].children[0];
    this.ro = this.textModelIntro.children[0].children[4];
    this.ji = this.textModelIntro.children[0].children[3];
    this.e = this.textModelIntro.children[0].children[5];
    this.ku = this.textModelIntro.children[0].children[2];
    this.to = this.textModelIntro.children[0].children[1];

    this.ro.visible = false;
    this.ji.visible = false;
    this.e.visible = false;
    this.ku.visible = false;
    this.to.visible = false;

    /**
     * MATERIALS
     */
    this.dotMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0,
    });

    /**
     * プ
     */
    this.pu.visible = true;
    this.pu.position.set(0, 0, 0);
    this.pu.rotation.set(0, 0, 0);

    // 点
    this.puDot = this.pu.children[0];
    this.puDot.scale.set(6, 6, 6);
    this.puDot.material = this.dotMaterial;

    // 矢印
    this.puArrows = [this.pu.children[1], this.pu.children[2]];
    this.puArrows[0].position.set(-0.318, 0, -0.6489);
    this.puArrows[1].position.set(0.6339, 0, -0.5868);
    this.puArrows[0].visible = false;
    this.puArrows[1].visible = false;

    // 線
    this.sen = [this.pu.children[4], this.pu.children[5], this.pu.children[6]];
    this.sen[0].position.set(-0.3722, 0.0003, -0.1071);
    this.sen[1].position.set(-0.3722, 0.0003, -0.1071);
    this.sen[2].position.set(-0.3722, 0.0003, -0.1071);
    this.sen[0].visible = false;
    this.sen[1].visible = false;
    this.sen[2].visible = false;

    // Points
    this.puPoints = this.pu.children[3];
    this.puPoints.scale.set(0.077, 0.077, 0.077);
    this.puPoints.rotation.set(0, 0, 0);
    this.puPoints.visible = false;

    // ANIMATIONS
    this.tweenSymbol = () => {
      var tweenRotationSymbol = new TWEEN.Tween(this.puPoints.rotation)
        .to({ x: 0, y: Math.PI * 2, z: 0 }, 200)
        .easing(TWEEN.Easing.Circular.InOut)
        .onComplete(() => {
          this.puPoints.visible = false;
          setTimeout(() => {
            this.pu.translateX(-0.75);
          }, 50);
        });
      var tweenScaleSymbol = new TWEEN.Tween(this.puPoints.scale)
        .to({ x: 1, y: 1, z: 1 }, 200)
        .easing(TWEEN.Easing.Exponential.In)
        .onStart(() => {
          setTimeout(() => {
            this.puArrows[0].visible = false;
            this.puArrows[1].visible = false;
            tweenRotationSymbol.start();
          }, 200);
        });
      tweenScaleSymbol.start();
    };

    //

    this.tweenSen = () => {
      this.tweenSenTranslate = () => {
        for (var i = 0; i < 3; i++) {
          var tweenSenTranslate = new TWEEN.Tween(this.sen[i].position)
            .to({ x: -2 }, 100)
            .easing(TWEEN.Easing.Cubic.In)
            .onComplete(() => {
              this.puPoints.visible = true;
              this.sen[0].visible = false;
              this.sen[1].visible = false;
              this.sen[2].visible = false;
              this.tweenSymbol();
            });
          tweenSenTranslate.start();
        }
      };
      var tweenSenThird = new TWEEN.Tween(this.sen[2].position)
        .to({ x: -0.8 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.sen[2].visible = true;
        })
        .onComplete(() => {
          this.tweenSenTranslate();
        });
      var tweenSen = new TWEEN.Tween(this.sen[1].position)
        .to({ x: -0.6 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.sen[0].visible = true;
          this.sen[1].visible = true;
        })
        .onComplete(() => {
          tweenSenThird.start();
        });
      tweenSen.start();
    };

    //

    this.tweenPuArrows = () => {
      var tweenPuArrows = new TWEEN.Tween(this.puArrows[0].position)
        .to({ x: -0.1, z: -0.485 }, 200)
        .easing(TWEEN.Easing.Back.Out)
        .onComplete(() => {});
      tweenPuArrows.start();
      var tweenPuArrows = new TWEEN.Tween(this.puArrows[1].position)
        .to({ x: 0.35, z: -0.32 }, 200)
        .easing(TWEEN.Easing.Back.Out)
        .onComplete(() => {});
      tweenPuArrows.start();
    };

    //

    var tweenAppearDot = new TWEEN.Tween(this.puDot.material)
      .to({ opacity: 1 }, 100)
      .easing(TWEEN.Easing.Linear.None)
      .onComplete(() => {
        tweenScaleDot.start();
      });
    var tweenScaleDot = new TWEEN.Tween(this.puDot.scale)
      .to({ x: 0, y: 0, z: 0 }, 200)
      .easing(TWEEN.Easing.Linear.None)
      .onComplete(() => {
        this.puArrows[0].visible = true;
        this.puArrows[1].visible = true;
        this.tweenPuArrows();
        this.tweenSen();
      });
    tweenAppearDot.start();

    /**
     * ロ
     */
    console.log(this.ro);

    setTimeout(() => {
      this.ro.position.set(0, 0, 0.4006);
      this.ro.rotation.set(0, 0, 0);

      // 点
      this.roDot = this.ro.children[0];
      this.roDot.material = this.dotMaterial;
      this.roDot.scale.set(4, 4, 4);

      // 〚〛
      this.roKakkoLeft = this.ro.children[1];
      this.roKakkoRight = this.ro.children[2];
      this.roKakkoLeft.position.set(-0.231, 0, -0.015);
      this.roKakkoRight.position.set(0.2255859375, 0, -0.01503384206444025);
      this.roKakkoLeft.visible = false;
      this.roKakkoRight.visible = false;

      // 線
      this.sen = [
        this.ro.children[3],
        this.ro.children[4],
        this.ro.children[5],
      ];
      this.sen[0].position.set(-0.3722, 0.0003, -0.1071);
      this.sen[1].position.set(-0.3722, 0.0003, -0.1071);
      this.sen[2].position.set(-0.3722, 0.0003, -0.1071);
      this.sen[0].visible = false;
      this.sen[1].visible = false;
      this.sen[2].visible = false;

      // ▽
      this.roTriangle = this.ro.children[6];
      this.roTriangle.scale.set(0.077, 0.077, 0.077);
      this.roTriangle.rotation.set(0, 0, 0);
      this.roTriangle.visible = false;

      // ANIMATIONS
      this.tweenSymbol = () => {
        var tweenRotationSymbol = new TWEEN.Tween(this.roTriangle.rotation)
          .to({ x: 0, y: Math.PI * 2, z: 0 }, 200)
          .easing(TWEEN.Easing.Circular.InOut)
          .onComplete(() => {
            this.roTriangle.visible = false;
            setTimeout(() => {
              this.ro.translateX(-0.75);
            }, 50);
          });
        var tweenScaleSymbol = new TWEEN.Tween(this.roTriangle.scale)
          .to({ x: 0.8, y: 0.8, z: 0.8 }, 200)
          .easing(TWEEN.Easing.Exponential.In)
          .onStart(() => {
            setTimeout(() => {
              this.roKakkoLeft.visible = false;
              this.roKakkoRight.visible = false;
              tweenRotationSymbol.start();
            }, 200);
          });
        tweenScaleSymbol.start();
      };

      //

      this.tweenSen = () => {
        this.tweenSenTranslate = () => {
          for (var i = 0; i < 3; i++) {
            var tweenSenTranslate = new TWEEN.Tween(this.sen[i].position)
              .to({ x: -2 }, 100)
              .easing(TWEEN.Easing.Cubic.In)
              .onComplete(() => {
                this.roTriangle.visible = true;
                this.sen[0].visible = false;
                this.sen[1].visible = false;
                this.sen[2].visible = false;
                this.tweenSymbol();
              });
            tweenSenTranslate.start();
          }
        };
        var tweenSenThird = new TWEEN.Tween(this.sen[2].position)
          .to({ x: -0.8 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.sen[2].visible = true;
          })
          .onComplete(() => {
            this.tweenSenTranslate();
          });
        var tweenSen = new TWEEN.Tween(this.sen[1].position)
          .to({ x: -0.6 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.sen[0].visible = true;
            this.sen[1].visible = true;
          })
          .onComplete(() => {
            tweenSenThird.start();
          });
        tweenSen.start();
      };

      //

      this.tweenRoKakko = () => {
        this.roKakkoLeft.visible = true;
        this.roKakkoRight.visible = true;
        var tweenRoKakkoLeft = new TWEEN.Tween(this.roKakkoLeft.position)
          .to({ x: -0.8 }, 200)
          .easing(TWEEN.Easing.Back.Out);
        tweenRoKakkoLeft.start();
        var tweenRoKakkoRight = new TWEEN.Tween(this.roKakkoRight.position)
          .to({ x: 0.8 }, 200)
          .easing(TWEEN.Easing.Back.Out);
        tweenRoKakkoRight.start();
      };

      //

      var tweenAppearDot = new TWEEN.Tween(this.roDot.material)
        .to({ opacity: 1 }, 100)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          tweenScaleDot.start();
        });
      var tweenScaleDot = new TWEEN.Tween(this.roDot.scale)
        .to({ x: 0, y: 0, z: 0 }, 300)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          this.tweenRoKakko();
          this.tweenSen();
        });

      this.ro.visible = true;
      tweenAppearDot.start();
    }, 550);

    //
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    // console.log(this.textModel);

    /**
     * ARROW
     */
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
