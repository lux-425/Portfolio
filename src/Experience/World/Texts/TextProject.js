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

    console.log(this.textModelIntro);

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
     * ジ
     */
    // console.log(this.ji);

    this.ji.position.set(0, 0, 0.8006);
    this.ji.rotation.set(0, 0, 0);

    // 点
    this.jiDot = this.ji.children[0];
    this.jiDot.material = this.dotMaterial;
    this.jiDot.scale.set(5, 5, 5);

    // 小雨
    this.jiTsubu1 = this.ji.children[1];
    this.jiTsubu2 = this.ji.children[2];
    this.jiTsubu3 = this.ji.children[3];
    this.jiTsubu1.position.set(-0.5, 0, -0.55);
    this.jiTsubu2.position.set(-0.35, 0, -0.55);
    this.jiTsubu3.position.set(0.5, 0, -0.55);
    this.jiTsubu1.visible = false;
    this.jiTsubu2.visible = false;
    this.jiTsubu3.visible = false;

    // 線
    this.jiSen = [
      this.ji.children[5],
      this.ji.children[6],
      this.ji.children[7],
    ];
    this.jiSen[0].position.set(-0.3722, 0.0003, -0.1358);
    this.jiSen[1].position.set(-0.6134, 0.0003, -0.1358);
    this.jiSen[2].position.set(-0.8537, 0.0003, -0.1358);
    this.jiSen[0].visible = false;
    this.jiSen[1].visible = false;
    this.jiSen[2].visible = false;

    // ◇
    this.jiLosange = this.ji.children[4];
    this.jiLosange.scale.set(0.077, 0.077, 0.077);
    this.jiLosange.rotation.set(0, 0, 0);
    this.jiLosange.visible = false;

    // ANIMATIONS
    this.animateJi = () => {
      this.tweenSymbolJi = () => {
        var tweenRotationSymbolJi = new TWEEN.Tween(this.jiLosange.rotation)
          .to({ x: 0, y: -Math.PI * 2, z: 0 }, 200)
          .easing(TWEEN.Easing.Circular.InOut)
          .onComplete(() => {
            this.jiLosange.visible = false;
            setTimeout(() => {
              this.ji.translateX(-0.75);
            }, 50);
          });
        var tweenScaleSymbolJi = new TWEEN.Tween(this.jiLosange.scale)
          .to({ x: 0.8, y: 0.8, z: 0.8 }, 200)
          .easing(TWEEN.Easing.Exponential.In)
          .onStart(() => {
            setTimeout(() => {
              tweenRotationSymbolJi.start();
            }, 200);
          });
        tweenScaleSymbolJi.start();
      };

      //

      this.tweenSen = () => {
        this.tweenSenTranslate = () => {
          for (var i = 0; i < 3; i++) {
            var tweenSenTranslate = new TWEEN.Tween(this.jiSen[i].position)
              .to({ x: -2 }, 100)
              .easing(TWEEN.Easing.Cubic.In)
              .onComplete(() => {
                this.jiLosange.visible = true;
                this.jiSen[0].visible = false;
                this.jiSen[1].visible = false;
                this.jiSen[2].visible = false;
                this.tweenSymbolJi();
              });
            tweenSenTranslate.start();
          }
        };
        var tweenSenThird = new TWEEN.Tween(this.jiSen[2].position)
          .to({ x: -0.8 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.jiSen[2].visible = true;
          })
          .onComplete(() => {
            this.tweenSenTranslate();
          });
        var tweenSen = new TWEEN.Tween(this.jiSen[1].position)
          .to({ x: -0.6 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.jiSen[0].visible = true;
            this.jiSen[1].visible = true;
          })
          .onComplete(() => {
            tweenSenThird.start();
          });
        tweenSen.start();
      };

      //

      this.tweenJiKosame = () => {
        this.jiTsubu1.visible = true;
        this.jiTsubu2.visible = true;
        this.jiTsubu3.visible = true;
        var tweenJiTsubu1 = new TWEEN.Tween(this.jiTsubu1.position)
          .to({ x: -0.5, z: 0.65 }, 800)
          .easing(TWEEN.Easing.Back.In);
        tweenJiTsubu1.start();
        var tweenJiTsubu2 = new TWEEN.Tween(this.jiTsubu2.position)
          .to({ x: -0.35, z: 0.65 }, 600)
          .easing(TWEEN.Easing.Back.In);
        tweenJiTsubu2.start();
        var tweenJiTsubu3 = new TWEEN.Tween(this.jiTsubu3.position)
          .to({ x: 0.5, z: 0.65 }, 800)
          .easing(TWEEN.Easing.Back.In)
          .onComplete(() => {
            this.jiTsubu1.visible = false;
            this.jiTsubu2.visible = false;
            this.jiTsubu3.visible = false;
          });
        tweenJiTsubu3.start();
      };

      //

      var tweenAppearDot = new TWEEN.Tween(this.jiDot.material)
        .to({ opacity: 1 }, 100)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.tweenJiKosame();
        })
        .onComplete(() => {
          tweenScaleDot.start();
        });
      var tweenScaleDot = new TWEEN.Tween(this.jiDot.scale)
        .to({ x: 0, y: 0, z: 0 }, 300)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          this.tweenSen();
        });

      this.ji.visible = true;
      tweenAppearDot.start();
    };

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
     * ト
     */
    // console.log(this.to);

    this.to.position.set(0, 0, 1.9974);
    this.to.rotation.set(0, 0, 0);

    // 点
    this.toDot = this.to.children[0];
    this.toDot.material = this.dotMaterial;
    this.toDot.scale.set(4, 4, 4);

    // <<< >>>
    this.toArrowLeft = this.to.children[1];
    this.toArrowRight = this.to.children[2];
    this.toArrowLeft.position.set(-0.0666, 0, 0.0687);
    this.toArrowRight.position.set(0.0694, 0, 0.0731);
    this.toArrowLeft.visible = false;
    this.toArrowRight.visible = false;

    // 〇
    this.toCircle = this.to.children[3];
    this.toCircle.scale.set(0.077, 0.077, 0.077);
    this.toCircle.rotation.set(0, 0, 0);
    this.toCircle.visible = false;

    // 線
    this.toSen = [
      this.to.children[4],
      this.to.children[5],
      this.to.children[6],
    ];
    this.toSen[0].position.set(-0.3722, 0.0003, -0.1365);
    this.toSen[1].position.set(-0.6134, 0.0003, -0.1365);
    this.toSen[2].position.set(-0.8537, 0.0003, -0.1365);
    this.toSen[0].visible = false;
    this.toSen[1].visible = false;
    this.toSen[2].visible = false;

    // ANIMATIONS
    this.animateTo = () => {
      this.tweenSymbolTo = () => {
        var tweenRotationSymbolTo = new TWEEN.Tween(this.toCircle.rotation)
          .to({ x: 0, y: Math.PI * 2, z: 0 }, 200)
          .easing(TWEEN.Easing.Circular.InOut)
          .onComplete(() => {
            this.toCircle.visible = false;

            setTimeout(() => {
              this.to.translateX(-0.75);
            }, 50);
          });
        var tweenScaleSymbolTo = new TWEEN.Tween(this.toCircle.scale)
          .to({ x: 0.8, y: 0.8, z: 0.8 }, 200)
          .easing(TWEEN.Easing.Exponential.In)
          .onStart(() => {
            setTimeout(() => {
              tweenRotationSymbolTo.start();
            }, 200);
          });
        tweenScaleSymbolTo.start();
      };

      //

      this.tweenSenTo = () => {
        this.tweenSenTranslateTo = () => {
          for (var i = 0; i < 3; i++) {
            var tweenSenTranslateTo = new TWEEN.Tween(this.toSen[i].position)
              .to({ x: -2 }, 100)
              .easing(TWEEN.Easing.Cubic.In)
              .onComplete(() => {
                this.toCircle.visible = true;
                this.toSen[0].visible = false;
                this.toSen[1].visible = false;
                this.toSen[2].visible = false;
                this.tweenSymbolTo();
              });
            tweenSenTranslateTo.start();
          }
        };
        var tweenSenThirdTo = new TWEEN.Tween(this.toSen[2].position)
          .to({ x: -0.8 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.toSen[2].visible = true;
          })
          .onComplete(() => {
            this.tweenSenTranslateTo();
          });
        var tweenSenTo = new TWEEN.Tween(this.toSen[1].position)
          .to({ x: -0.6 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.toSen[0].visible = true;
            this.toSen[1].visible = true;
          })
          .onComplete(() => {
            tweenSenThirdTo.start();
          });
        tweenSenTo.start();
      };

      //

      this.tweenToArrows = () => {
        this.toArrowLeft.visible = true;
        this.toArrowRight.visible = true;
        var tweenToArrowLeft = new TWEEN.Tween(this.toArrowLeft.position)
          .to({ x: -0.2, z: 0.2 }, 500)
          .easing(TWEEN.Easing.Exponential.Out);
        tweenToArrowLeft.start();
        var tweenToArrowRight = new TWEEN.Tween(this.toArrowRight.position)
          .to({ x: 0.2, z: 0.2 }, 500)
          .easing(TWEEN.Easing.Exponential.Out);
        tweenToArrowRight.start();
        setTimeout(() => {
          this.toArrowLeft.visible = false;
          this.toArrowRight.visible = false;
        }, 500);
      };

      //

      var tweenAppearDotTo = new TWEEN.Tween(this.toDot.material)
        .to({ opacity: 1 }, 100)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          tweenScaleDotTo.start();
        });
      var tweenScaleDotTo = new TWEEN.Tween(this.toDot.scale)
        .to({ x: 0, y: 0, z: 0 }, 300)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          this.tweenToArrows();
          this.tweenSenTo();
        });

      this.to.visible = true;
      tweenAppearDotTo.start();
    };

    /**
     * ロ
     */
    // console.log(this.ro);

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
          .to({ x: 0, y: -Math.PI * 2, z: 0 }, 200)
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
          .easing(TWEEN.Easing.Back.Out)
          .onComplete(() => {
            this.animateJi();
          });
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

    /**
     * ク
     */
    // console.log(this.ku);

    this.ku.position.set(0, 0, 1.5971);
    this.ku.rotation.set(0, 0, 0);

    // 点
    this.kuDot = this.ku.children[0];
    this.kuDot.scale.set(6, 6, 6);
    this.kuDot.material = this.dotMaterial;

    // 線
    this.kuSen = [
      this.ku.children[1],
      this.ku.children[2],
      this.ku.children[3],
    ];
    this.kuSen[0].position.set(-0.3722, 0.0003, -0.1314);
    this.kuSen[1].position.set(-0.3722, 0.0003, -0.1314);
    this.kuSen[2].position.set(-0.3722, 0.0003, -0.1314);
    this.kuSen[0].visible = false;
    this.kuSen[1].visible = false;
    this.kuSen[2].visible = false;

    // □
    this.kuSquare = this.ku.children[4];
    this.kuSquare.scale.set(0.077, 0.077, 0.077);
    this.kuSquare.rotation.set(0, 0, 0);
    this.kuSquare.visible = false;

    // ANIMATIONS
    this.animateKu = () => {
      this.tweenSymbolKu = () => {
        var tweenRotationSymbolKu = new TWEEN.Tween(this.kuSquare.rotation)
          .to({ x: 0, y: -Math.PI * 2, z: 0 }, 200)
          .easing(TWEEN.Easing.Circular.InOut)
          .onComplete(() => {
            this.kuSquare.visible = false;

            setTimeout(() => {
              this.ku.translateX(-0.75);
            }, 50);
          });
        var tweenScaleSymbolKu = new TWEEN.Tween(this.kuSquare.scale)
          .to({ x: 0.8, y: 0.8, z: 0.8 }, 200)
          .easing(TWEEN.Easing.Exponential.In)
          .onStart(() => {
            setTimeout(() => {
              tweenRotationSymbolKu.start();
            }, 200);
          });
        tweenScaleSymbolKu.start();
      };

      //

      this.tweenSenKu = () => {
        this.tweenSenTranslateKu = () => {
          for (var i = 0; i < 3; i++) {
            var tweenSenTranslate = new TWEEN.Tween(this.kuSen[i].position)
              .to({ x: -2 }, 100)
              .easing(TWEEN.Easing.Cubic.In)
              .onComplete(() => {
                this.kuSquare.visible = true;
                this.kuSen[0].visible = false;
                this.kuSen[1].visible = false;
                this.kuSen[2].visible = false;
                this.tweenSymbolKu();
              });
            tweenSenTranslate.start();
          }
        };
        var tweenSenThird = new TWEEN.Tween(this.kuSen[2].position)
          .to({ x: -0.8 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.kuSen[2].visible = true;
          })
          .onComplete(() => {
            this.tweenSenTranslateKu();
          });
        var tweenSen = new TWEEN.Tween(this.kuSen[1].position)
          .to({ x: -0.6 }, 50)
          .easing(TWEEN.Easing.Linear.None)
          .onStart(() => {
            this.kuSen[0].visible = true;
            this.kuSen[1].visible = true;
          })
          .onComplete(() => {
            tweenSenThird.start();
          });
        tweenSen.start();
      };

      //

      var tweenAppearDotKu = new TWEEN.Tween(this.kuDot.material)
        .to({ opacity: 1 }, 100)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          tweenScaleDotKu.start();
        });
      var tweenScaleDotKu = new TWEEN.Tween(this.kuDot.scale)
        .to({ x: 0, y: 0, z: 0 }, 300)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          this.tweenSenKu();
        });

      this.ku.visible = true;
      tweenAppearDotKu.start();
    };

    /**
     * ェ
     */
    // console.log(this.e);

    this.e.position.set(0, 0, 1.2);
    this.e.rotation.set(0, 0, 0);

    // 点
    this.eDot = this.e.children[0];
    this.eDot.material = this.dotMaterial;
    this.eDot.scale.set(4, 4, 4);

    // |~||~|
    this.eDashLeft = this.e.children[1];
    this.eDashRight = this.e.children[2];
    this.eWaveLeft = this.e.children[3];
    this.eWaveRight = this.e.children[4];
    this.eDashLeft.position.set(-0.4105, 0, 0.0686);
    this.eDashRight.position.set(0.4105, 0, 0.0686);
    this.eWaveLeft.position.set(-0.2658, 0, -0.2289);
    this.eWaveRight.position.set(0.5484, 0, 0.1856);
    this.eDashLeft.visible = false;
    this.eDashRight.visible = false;
    this.eWaveLeft.visible = false;
    this.eWaveRight.visible = false;

    // ▽
    this.eTriangle = this.e.children[8];
    this.eTriangle.scale.set(0.077, 0.077, 0.077);
    this.eTriangle.rotation.set(0, 0, 0);
    this.eTriangle.visible = false;

    setTimeout(() => {
      // 線
      this.sen = [this.e.children[5], this.e.children[6], this.e.children[7]];
      this.sen[0].position.set(-0.3722, 0.0003, -0.0841);
      this.sen[1].position.set(-0.6134, 0.0003, -0.0841);
      this.sen[2].position.set(-0.8537, 0.0003, -0.0841);
      this.sen[0].visible = false;
      this.sen[1].visible = false;
      this.sen[2].visible = false;

      // ANIMATIONS
      this.tweenSymbol = () => {
        var tweenRotationSymbol = new TWEEN.Tween(this.eTriangle.rotation)
          .to({ x: 0, y: Math.PI * 2, z: 0 }, 200)
          .easing(TWEEN.Easing.Circular.InOut)
          .onComplete(() => {
            this.eTriangle.visible = false;

            setTimeout(() => {
              this.e.translateX(-0.75);
            }, 50);
          });
        var tweenScaleSymbol = new TWEEN.Tween(this.eTriangle.scale)
          .to({ x: 0.8, y: 0.8, z: 0.8 }, 200)
          .easing(TWEEN.Easing.Exponential.In)
          .onStart(() => {
            setTimeout(() => {
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
                this.eTriangle.visible = true;
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

      this.tweenEWaves = () => {
        this.eWaveLeft.visible = true;
        this.eWaveRight.visible = true;
        var tweenEWaveLeft = new TWEEN.Tween(this.eWaveLeft.position)
          .to({ z: 0.3 }, 500)
          .easing(TWEEN.Easing.Exponential.Out);
        tweenEWaveLeft.start();
        var tweenEWaveRight = new TWEEN.Tween(this.eWaveRight.position)
          .to({ z: -0.3 }, 500)
          .easing(TWEEN.Easing.Exponential.Out);
        tweenEWaveRight.start();
        setTimeout(() => {
          this.eWaveLeft.visible = false;
          this.eWaveRight.visible = false;
        }, 500);
      };

      this.tweenEDashes = () => {
        this.eDashLeft.visible = true;
        this.eDashRight.visible = true;
        var tweenEDashLeft = new TWEEN.Tween(this.eDashLeft.position)
          .to({ z: -0.3 }, 500)
          .easing(TWEEN.Easing.Exponential.Out);
        tweenEDashLeft.start();
        var tweenEDashRight = new TWEEN.Tween(this.eDashRight.position)
          .to({ z: 0.3 }, 500)
          .easing(TWEEN.Easing.Exponential.Out)
          .onStart(() => {
            this.tweenEWaves();
            this.animateTo();
          });
        tweenEDashRight.start();
        setTimeout(() => {
          this.eDashLeft.visible = false;
          this.eDashRight.visible = false;
        }, 500);
      };

      //

      var tweenAppearDot = new TWEEN.Tween(this.eDot.material)
        .to({ opacity: 1 }, 100)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          this.tweenEDashes();
          tweenScaleDot.start();
          this.animateKu();
        });
      var tweenScaleDot = new TWEEN.Tween(this.eDot.scale)
        .to({ x: 0, y: 0, z: 0 }, 300)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          this.tweenSen();
        });

      this.e.visible = true;
      tweenAppearDot.start();
    }, 1700);
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
