import * as THREE from 'three';

import Experience from '../../Experience.js';
import TextModel from './TextModel.js';

export default class TextProjects {
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
    // this.buttonRefresh.position.set(-2, 1.7, -1);
    // this.buttonRefresh.name = 'buttonRefreshProject';
    // this.scene.add(this.buttonRefresh);

    // LOAD MODEL
    this.modelIntro = new TextModel(
      '../../../models/Gamen/gamen_005-6_intro.glb'
    );

    this.model = new TextModel('../../../models/Gamen/gamen_005-6.glb');

    this.setModel();
  }

  async setModel() {
    // INTRO
    await this.modelIntro.waitForLoad();
    this.textModelIntro = this.modelIntro.model.children[0];

    this.textModelIntro.translateX(-4);

    this.textModelIntro.children[0].children[0].children[0].material.emissive =
      new THREE.Color('white');
    this.textModelIntro.children[0].children[0].children[0].material.transparent = true;

    /**
     * TEXT
     */
    await this.model.waitForLoad();
    this.textModel = this.model.model.children[0];

    this.textModel.position.set(
      this.experience.world.centerPanels.gamenFour.mesh.position.x,
      1,
      this.experience.world.centerPanels.gamenFour.mesh.position.z
    );

    // CONTENT
    this.textModel.children[0].children[3].material.emissive = new THREE.Color(
      'white'
    );
    this.textModel.children[0].children[3].material.transparent = true;

    /**
     * INIT
     */
    this.setVariables();
  }

  setVariables() {
    var TWEEN = require('@tweenjs/tween.js');

    this.actualTab = 'ichi';

    /**
     *
     *
     * INTRO
     *
     *
     */
    this.pu = this.textModelIntro.children[0].children[0];
    this.ro = this.textModelIntro.children[0].children[4];
    this.ji = this.textModelIntro.children[0].children[3];
    this.e = this.textModelIntro.children[0].children[5];
    this.ku = this.textModelIntro.children[0].children[2];
    this.to = this.textModelIntro.children[0].children[1];
    /**
     * MATERIAL
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
    this.jiDot = this.ji.children[0];
    this.jiTsubu1 = this.ji.children[1];
    this.jiTsubu2 = this.ji.children[2];
    this.jiTsubu3 = this.ji.children[3];
    this.jiSen = [
      this.ji.children[5],
      this.ji.children[6],
      this.ji.children[7],
    ];
    this.jiLosange = this.ji.children[4];

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

      this.tweenSenJi = () => {
        this.tweenSenTranslateJi = () => {
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
            this.tweenSenTranslateJi();
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
          this.tweenSenJi();
        });

      this.ji.visible = true;
      tweenAppearDot.start();
    };

    /**
     * プ
     */
    this.puDot = this.pu.children[0];
    this.puArrows = [this.pu.children[1], this.pu.children[2]];
    this.puPoints = this.pu.children[3];
    this.puSen = [
      this.pu.children[4],
      this.pu.children[5],
      this.pu.children[6],
    ];

    this.tweenSymbolPu = () => {
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

    this.tweenSenPu = () => {
      this.tweenSenTranslatePu = () => {
        for (var i = 0; i < 3; i++) {
          var tweenSenTranslate = new TWEEN.Tween(this.puSen[i].position)
            .to({ x: -2 }, 100)
            .easing(TWEEN.Easing.Cubic.In)
            .onComplete(() => {
              this.puPoints.visible = true;
              this.puSen[0].visible = false;
              this.puSen[1].visible = false;
              this.puSen[2].visible = false;
              this.tweenSymbolPu();
            });
          tweenSenTranslate.start();
        }
      };
      var tweenSenThird = new TWEEN.Tween(this.puSen[2].position)
        .to({ x: -0.8 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.puSen[2].visible = true;
        })
        .onComplete(() => {
          this.tweenSenTranslatePu();
        });
      var tweenSen = new TWEEN.Tween(this.puSen[1].position)
        .to({ x: -0.6 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.puSen[0].visible = true;
          this.puSen[1].visible = true;
        })
        .onComplete(() => {
          tweenSenThird.start();
        });
      tweenSen.start();
    };

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

    /**
     * ト
     */
    this.toDot = this.to.children[0];
    this.toArrowLeft = this.to.children[1];
    this.toArrowRight = this.to.children[2];
    this.toCircle = this.to.children[3];
    this.toSen = [
      this.to.children[4],
      this.to.children[5],
      this.to.children[6],
    ];

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
            setTimeout(() => {
              this.textModelIntro.visible = false;
            }, 300);
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
    this.roDot = this.ro.children[0];
    this.roKakkoLeft = this.ro.children[1];
    this.roKakkoRight = this.ro.children[2];
    this.roTriangle = this.ro.children[6];

    this.tweenSymbolRo = () => {
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

    this.tweenSenRo = () => {
      this.tweenSenTranslateRo = () => {
        for (var i = 0; i < 3; i++) {
          var tweenSenTranslate = new TWEEN.Tween(this.roSen[i].position)
            .to({ x: -2 }, 100)
            .easing(TWEEN.Easing.Cubic.In)
            .onComplete(() => {
              this.roTriangle.visible = true;
              this.roSen[0].visible = false;
              this.roSen[1].visible = false;
              this.roSen[2].visible = false;
              this.tweenSymbolRo();
            });
          tweenSenTranslate.start();
        }
      };
      var tweenSenThird = new TWEEN.Tween(this.roSen[2].position)
        .to({ x: -0.8 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.roSen[2].visible = true;
        })
        .onComplete(() => {
          this.tweenSenTranslateRo();
        });
      var tweenSen = new TWEEN.Tween(this.roSen[1].position)
        .to({ x: -0.6 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.roSen[0].visible = true;
          this.roSen[1].visible = true;
        })
        .onComplete(() => {
          tweenSenThird.start();
        });
      tweenSen.start();
    };

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

    /**
     * ク
     */
    this.kuDot = this.ku.children[0];
    this.kuSen = [
      this.ku.children[1],
      this.ku.children[2],
      this.ku.children[3],
    ];
    this.kuSquare = this.ku.children[4];

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
    this.eDot = this.e.children[0];
    this.eDashLeft = this.e.children[1];
    this.eDashRight = this.e.children[2];
    this.eWaveLeft = this.e.children[3];
    this.eWaveRight = this.e.children[4];
    this.eTriangle = this.e.children[8];

    this.tweenSymbolE = () => {
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

    this.tweenSenE = () => {
      this.tweenSenTranslate = () => {
        for (var i = 0; i < 3; i++) {
          var tweenSenTranslate = new TWEEN.Tween(this.eSen[i].position)
            .to({ x: -2 }, 100)
            .easing(TWEEN.Easing.Cubic.In)
            .onComplete(() => {
              this.eTriangle.visible = true;
              this.eSen[0].visible = false;
              this.eSen[1].visible = false;
              this.eSen[2].visible = false;
              this.tweenSymbolE();
            });
          tweenSenTranslate.start();
        }
      };
      var tweenSenThird = new TWEEN.Tween(this.eSen[2].position)
        .to({ x: -0.8 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.eSen[2].visible = true;
        })
        .onComplete(() => {
          this.tweenSenTranslate();
        });
      var tweenSen = new TWEEN.Tween(this.eSen[1].position)
        .to({ x: -0.6 }, 50)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(() => {
          this.eSen[0].visible = true;
          this.eSen[1].visible = true;
        })
        .onComplete(() => {
          tweenSenThird.start();
        });
      tweenSen.start();
    };

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

    /**
     *
     *
     * TEXT
     *
     *
     */
    this.githubLogo = this.textModel.children[2];
    this.githubLogoHitbox = this.textModel.children[0].children[1].children[17];
    this.visitLiveFrame = this.textModel.children[0].children[4];
    this.visitLiveButton = this.textModel.children[0].children[13];
    this.visitSoonButton = this.textModel.children[0].children[15];
    this.visitButtonHitbox =
      this.textModel.children[0].children[1].children[14];

    this.arrowProject = this.textModel.children[0].children[3];
    this.arrowHitboxProject = this.textModel.children[0].children[2];
    this.arrowTextProject = this.textModel.children[0].children[0];
    this.homeArrow = this.textModel.children[1].children[7];
    this.homeArrowHitbox = this.textModel.children[0].children[1].children[16];

    this.navbarFrame = this.textModel.children[0].children[5];
    this.navbarSep = this.textModel.children[0].children[14];
    this.navbarLanguette = this.textModel.children[0].children[1].children[15];

    this.navbarIchi = this.textModel.children[0].children[1].children[7];
    this.navbarNi = this.textModel.children[0].children[1].children[8];
    this.navbarSan = this.textModel.children[0].children[1].children[9];
    this.navbarYon = this.textModel.children[0].children[1].children[10];
    this.navbarGo = this.textModel.children[0].children[1].children[11];
    this.navbarRoku = this.textModel.children[0].children[1].children[12];
    this.navbarTsugi = this.textModel.children[0].children[1].children[13];

    this.navbarIchi.name = 'navbarIchi';
    this.navbarNi.name = 'navbarNi';
    this.navbarSan.name = 'navbarSan';
    this.navbarYon.name = 'navbarYon';
    this.navbarGo.name = 'navbarGo';
    this.navbarRoku.name = 'navbarRoku';
    this.navbarTsugi.name = 'navbarTsugi';

    this.project1 = this.textModel.children[1].children[0];
    this.project1Title = this.textModel.children[1].children[0].children[0];
    this.project1Description =
      this.textModel.children[1].children[0].children[1];
    this.project1Image = this.textModel.children[1].children[0].children[3];
    this.project1ImageBis = this.textModel.children[1].children[0].children[2];
    this.project1Stack = this.textModel.children[0].children[6];

    this.project2 = this.textModel.children[1].children[1];
    this.project2Title = this.textModel.children[1].children[1].children[0];
    this.project2Description =
      this.textModel.children[1].children[1].children[1];
    this.project2Image = this.textModel.children[1].children[1].children[2];
    this.project2ImageBis = this.textModel.children[1].children[1].children[3];
    this.project2Stack = this.textModel.children[0].children[7];

    this.project3 = this.textModel.children[1].children[2];
    this.project3Title = this.textModel.children[1].children[2].children[1];
    this.project3Description =
      this.textModel.children[1].children[2].children[0];
    this.project3Image = this.textModel.children[1].children[2].children[2];
    this.project3Stack = this.textModel.children[0].children[8];

    this.project4 = this.textModel.children[1].children[3];
    this.project4Title = this.textModel.children[1].children[3].children[1];
    this.project4Description =
      this.textModel.children[1].children[3].children[0];
    this.project4Stack = this.textModel.children[0].children[9];

    this.project5 = this.textModel.children[1].children[4];
    this.project5Title = this.textModel.children[1].children[4].children[1];
    this.project5Description =
      this.textModel.children[1].children[4].children[0];
    this.project5Image = this.textModel.children[1].children[4].children[2];
    this.project5Stack = this.textModel.children[0].children[10];

    this.project6 = this.textModel.children[1].children[5];
    this.project6Title = this.textModel.children[1].children[5].children[2];
    this.project6Description =
      this.textModel.children[1].children[5].children[0];
    this.project6TitleBis = this.textModel.children[1].children[5].children[3];
    this.project6DescriptionBis =
      this.textModel.children[1].children[5].children[1];
    this.project6Stack = this.textModel.children[0].children[11];

    this.project7 = this.textModel.children[1].children[6];
    this.project7Title = this.textModel.children[1].children[6].children[1];
    this.project7Description =
      this.textModel.children[1].children[6].children[0];
    this.project7Image = this.textModel.children[1].children[6].children[2];
    this.project7Stack = this.textModel.children[0].children[12];

    // IMAGES' TRANSPARENCE CORRECTION
    this.githubLogo.material.depthTest = true;
    this.githubLogo.material.depthWrite = true;
    this.project1Image.material.depthTest = true;
    this.project1Image.material.depthWrite = true;
    this.project1ImageBis.material.depthTest = true;
    this.project1ImageBis.material.depthWrite = true;
    this.project2Image.material.depthTest = true;
    this.project2Image.material.depthWrite = true;
    this.project2ImageBis.material.depthTest = true;
    this.project2ImageBis.material.depthWrite = true;
    this.project3Image.material.depthTest = true;
    this.project3Image.material.depthWrite = true;
    this.project5Image.material.depthTest = true;
    this.project5Image.material.depthWrite = true;

    /**
     * MATERIALS
     */
    this.projectTitleMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0,
    });
    this.projectParagraphMaterial = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0,
    });

    this.titleArr = [
      this.project1Title,
      this.project2Title,
      this.project3Title,
      this.project4Title,
      this.project5Title,
      this.project6Title,
      this.project7Title,
    ];
    this.paragraphArr = [
      this.project1Description,
      this.project1Stack,
      this.project2Description,
      this.project2Stack,
      this.project3Description,
      this.project3Stack,
      this.project4Description,
      this.project4Stack,
      this.project5Description,
      this.project5Stack,
      this.project6Description,
      this.project6Stack,
      this.project7Description,
      this.project7Stack,
    ];

    for (var i = 0; i < 3; i++) {
      this.arrowTextProject.children[i].material =
        new THREE.MeshStandardMaterial({
          emissive: 'white',
          transparent: true,
          opacity: 0,
        });
    }

    for (var i = 0; i < this.titleArr.length; i++) {
      this.titleArr[i].material = this.projectTitleMaterial;
    }
    for (var i = 0; i < this.paragraphArr.length; i++) {
      this.paragraphArr[i].material = this.projectParagraphMaterial;
    }

    this.navbarLanguette.material.emissive = new THREE.Color('white');

    /**
     * ANIMATIONS
     */
    // ARROW TEXT APPEARANCE
    this.tweenAppearTextArrow = () => {
      for (var i = 0; i < 3; i++) {
        this.arrowTextProject.children[i].visible = true;
        this.arrowTextProject.children[i].material.opacity = 0;
        var tweenAppearText = new TWEEN.Tween(
          this.arrowTextProject.children[i].material
        )
          .to({ opacity: 1 }, 400 + i * 150)
          .easing(TWEEN.Easing.Exponential.In);
        tweenAppearText.start();
      }
    };
    this.tweenDisappearTextArrow = () => {
      for (var i = 0; i < 3; i++) {
        this.arrowTextProject.children[i].visible = false;
        this.arrowTextProject.children[i].material.opacity = 0;
      }
    };

    // ARROW TRANSLATION
    this.tweenTranslateLeftArrow = new TWEEN.Tween(this.arrowProject.position)
      .to({ x: -0.24 }, 500)
      .easing(TWEEN.Easing.Exponential.In)
      .onStart(() => {
        this.tweenAppearTextArrow();
      });
    this.tweenTranslateRightArrow = new TWEEN.Tween(this.arrowProject.position)
      .to({ x: -0.4712 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.tweenDisappearTextArrow();
      });

    /**
     * OBJECT READY
     */
    this.experience.world.objectsReadyArr[3] = true;

    /**
     * ANIMATE
     */
    // this.animate();
  }

  animate() {
    this.scene.remove(this.textModel);
    this.scene.remove(this.textModelIntro);

    if (this.experience.world.language === 'nihongo') {
      this.animateIntro();
      setTimeout(() => {
        this.scene.add(this.textModel);
        this.animateText();
      }, 3000);
    } else {
      this.scene.add(this.textModel);
      this.animateText();
    }
  }

  animateIntro() {
    var TWEEN = require('@tweenjs/tween.js');

    this.scene.add(this.textModelIntro);

    this.textModelIntro.visible = true;

    this.ro.visible = false;
    this.ji.visible = false;
    this.e.visible = false;
    this.ku.visible = false;
    this.to.visible = false;

    /**
     * ジ
     */
    // console.log(this.ji);

    this.ji.position.set(0, 0, 0.8006);
    this.ji.rotation.set(0, 0, 0);

    // 点
    this.jiDot.material = this.dotMaterial;
    this.jiDot.scale.set(5, 5, 5);

    // 小雨
    this.jiTsubu1.position.set(-0.5, 0, -0.55);
    this.jiTsubu2.position.set(-0.35, 0, -0.55);
    this.jiTsubu3.position.set(0.5, 0, -0.55);
    this.jiTsubu1.visible = false;
    this.jiTsubu2.visible = false;
    this.jiTsubu3.visible = false;

    // 線
    this.jiSen[0].position.set(-0.3722, 0.0003, -0.1358);
    this.jiSen[1].position.set(-0.6134, 0.0003, -0.1358);
    this.jiSen[2].position.set(-0.8537, 0.0003, -0.1358);
    this.jiSen[0].visible = false;
    this.jiSen[1].visible = false;
    this.jiSen[2].visible = false;

    // ◇
    this.jiLosange.scale.set(0.077, 0.077, 0.077);
    this.jiLosange.rotation.set(0, 0, 0);
    this.jiLosange.visible = false;

    /**
     * プ
     */
    this.pu.visible = true;
    this.pu.position.set(0, 0, 0);
    this.pu.rotation.set(0, 0, 0);

    // 点
    this.puDot.scale.set(6, 6, 6);
    this.puDot.material = this.dotMaterial;

    // 矢印
    this.puArrows[0].position.set(-0.318, 0, -0.6489);
    this.puArrows[1].position.set(0.6339, 0, -0.5868);
    this.puArrows[0].visible = false;
    this.puArrows[1].visible = false;

    // 線
    this.puSen[0].position.set(-0.3722, 0.0003, -0.1071);
    this.puSen[1].position.set(-0.3722, 0.0003, -0.1071);
    this.puSen[2].position.set(-0.3722, 0.0003, -0.1071);
    this.puSen[0].visible = false;
    this.puSen[1].visible = false;
    this.puSen[2].visible = false;

    // Points
    this.puPoints.scale.set(0.077, 0.077, 0.077);
    this.puPoints.rotation.set(0, 0, 0);
    this.puPoints.visible = false;

    // ANIMATIONS
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
        this.tweenSenPu();
      });
    tweenAppearDot.start();

    /**
     * ト
     */
    // console.log(this.to);

    this.to.position.set(0, 0, 1.9974);
    this.to.rotation.set(0, 0, 0);

    // 点
    this.toDot.material = this.dotMaterial;
    this.toDot.scale.set(4, 4, 4);

    // <<< >>>
    this.toArrowLeft.position.set(-0.0666, 0, 0.0687);
    this.toArrowRight.position.set(0.0694, 0, 0.0731);
    this.toArrowLeft.visible = false;
    this.toArrowRight.visible = false;

    // 〇
    this.toCircle.scale.set(0.077, 0.077, 0.077);
    this.toCircle.rotation.set(0, 0, 0);
    this.toCircle.visible = false;

    // 線
    this.toSen[0].position.set(-0.3722, 0.0003, -0.1365);
    this.toSen[1].position.set(-0.6134, 0.0003, -0.1365);
    this.toSen[2].position.set(-0.8537, 0.0003, -0.1365);
    this.toSen[0].visible = false;
    this.toSen[1].visible = false;
    this.toSen[2].visible = false;

    // ANIMATIONS

    /**
     * ロ
     */
    // console.log(this.ro);

    setTimeout(() => {
      this.ro.position.set(0, 0, 0.4006);
      this.ro.rotation.set(0, 0, 0);

      // 点
      this.roDot.material = this.dotMaterial;
      this.roDot.scale.set(4, 4, 4);

      // 〚〛
      this.roKakkoLeft.position.set(-0.231, 0, -0.015);
      this.roKakkoRight.position.set(0.2255859375, 0, -0.01503384206444025);
      this.roKakkoLeft.visible = false;
      this.roKakkoRight.visible = false;

      // 線
      this.roSen = [
        this.ro.children[3],
        this.ro.children[4],
        this.ro.children[5],
      ];
      this.roSen[0].position.set(-0.3722, 0.0003, -0.1071);
      this.roSen[1].position.set(-0.3722, 0.0003, -0.1071);
      this.roSen[2].position.set(-0.3722, 0.0003, -0.1071);
      this.roSen[0].visible = false;
      this.roSen[1].visible = false;
      this.roSen[2].visible = false;

      // ▽
      this.roTriangle.scale.set(0.077, 0.077, 0.077);
      this.roTriangle.rotation.set(0, 0, 0);
      this.roTriangle.visible = false;

      // ANIMATIONS
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
          this.tweenSenRo();
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
    this.kuDot.scale.set(6, 6, 6);
    this.kuDot.material = this.dotMaterial;

    // 線
    this.kuSen[0].position.set(-0.3722, 0.0003, -0.1314);
    this.kuSen[1].position.set(-0.3722, 0.0003, -0.1314);
    this.kuSen[2].position.set(-0.3722, 0.0003, -0.1314);
    this.kuSen[0].visible = false;
    this.kuSen[1].visible = false;
    this.kuSen[2].visible = false;

    // □
    this.kuSquare.scale.set(0.077, 0.077, 0.077);
    this.kuSquare.rotation.set(0, 0, 0);
    this.kuSquare.visible = false;

    // ANIMATIONS

    /**
     * ェ
     */
    // console.log(this.e);

    this.e.position.set(0, 0, 1.2);
    this.e.rotation.set(0, 0, 0);

    // 点
    this.eDot.material = this.dotMaterial;
    this.eDot.scale.set(4, 4, 4);

    // |~||~|
    this.eDashLeft.position.set(-0.4105, 0, 0.0686);
    this.eDashRight.position.set(0.4105, 0, 0.0686);
    this.eWaveLeft.position.set(-0.2658, 0, -0.2289);
    this.eWaveRight.position.set(0.5484, 0, 0.1856);
    this.eDashLeft.visible = false;
    this.eDashRight.visible = false;
    this.eWaveLeft.visible = false;
    this.eWaveRight.visible = false;

    // ▽
    this.eTriangle.scale.set(0.077, 0.077, 0.077);
    this.eTriangle.rotation.set(0, 0, 0);
    this.eTriangle.visible = false;

    setTimeout(() => {
      // 線
      this.eSen = [this.e.children[5], this.e.children[6], this.e.children[7]];
      this.eSen[0].position.set(-0.3722, 0.0003, -0.0841);
      this.eSen[1].position.set(-0.6134, 0.0003, -0.0841);
      this.eSen[2].position.set(-0.8537, 0.0003, -0.0841);
      this.eSen[0].visible = false;
      this.eSen[1].visible = false;
      this.eSen[2].visible = false;

      // ANIMATIONS
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
          this.tweenSenE();
        });

      this.e.visible = true;
      tweenAppearDot.start();
    }, 1700);
  }

  animateText() {
    // console.log(this.textModel);

    this.arrowProject.position.x = -0.4712;

    /**
     * ARROW
     */
    this.arrowProject.translateY(-0.01);
    this.arrowProject.visible = false;

    this.arrowHitboxProject.visible = false;

    for (var i = 0; i < 3; i++) {
      this.arrowTextProject.children[i].material.opacity = 0;
    }

    this.homeArrow.visible = false;
    this.homeArrowHitbox.visible = false;

    /**
     * REFERENCES
     */
    this.githubLogoHitbox.visible = false;

    this.visitSoonButton.visible = false;

    this.visitButtonHitbox.visible = false;

    this.navbarIchi.visible = false;
    this.navbarNi.visible = false;
    this.navbarSan.visible = false;
    this.navbarYon.visible = false;
    this.navbarGo.visible = false;
    this.navbarRoku.visible = false;
    this.navbarTsugi.visible = false;

    // PROJECT 1
    this.project1.visible = false;
    this.project1Stack.visible = false;

    // PROJECT 2
    this.project2.visible = false;
    this.project2Stack.visible = false;

    // PROJECT 3
    this.project3.visible = false;
    this.project3Stack.visible = false;

    // PROJECT 4
    this.project4.visible = false;
    this.project4Stack.visible = false;

    // PROJECT 5
    this.project5.visible = false;
    this.project5Stack.visible = false;

    // PROJECT 6
    this.project6.visible = false;
    this.project6Stack.visible = false;

    // PROJECT 7
    this.project7.visible = false;
    this.project7Stack.visible = false;

    /**
     * INIT ACTUAL TEXT
     */
    this.actualProject = this.project1;
    this.actualTitle = this.project1Title;
    this.actualDescription = this.project1Description;
    this.actualStack = this.project1Stack;
    this.actualImage = this.project1Image;
    this.actualImageBis = this.project1ImageBis;

    this.actualImage.visible = false;
    this.actualImageBis.visible = false;

    setTimeout(() => {
      this.navigateIchi();

      this.homeArrow.visible = true;
      this.arrowProject.visible = true;
    }, 500);
  }

  appearProjectText() {
    var TWEEN = require('@tweenjs/tween.js');

    var tweenAppearTitle = new TWEEN.Tween(this.actualTitle.material)
      .to({ opacity: 1 }, 300)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onStart(() => {
        this.actualProject.visible = true;
        this.actualStack.visible = true;
      })
      .onComplete(() => {
        if (this.actualImage) this.actualImage.visible = true;
        if (this.actualImageBis) this.actualImageBis.visible = true;
      });
    var tweenAppearDescriptionStack = new TWEEN.Tween(
      this.actualDescription.material
    )
      .to({ opacity: 1 }, 400)
      .easing(TWEEN.Easing.Exponential.InOut);

    tweenAppearTitle.start();
    tweenAppearDescriptionStack.start();
  }

  disappearProjectText() {
    var TWEEN = require('@tweenjs/tween.js');

    var tweenDisappearTitle = new TWEEN.Tween(this.actualTitle.material)
      .to({ opacity: 0 }, 250)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onStart(() => {
        if (this.actualImage) this.actualImage.visible = false;
        if (this.actualImageBis) this.actualImageBis.visible = false;
      });
    var tweenDisappearDescriptionStack = new TWEEN.Tween(
      this.actualDescription.material
    )
      .to({ opacity: 0 }, 350)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onComplete(() => {
        this.actualProject.visible = false;
        this.actualStack.visible = false;
      });

    tweenDisappearTitle.start();
    tweenDisappearDescriptionStack.start();
  }

  navigateIchi() {
    this.disappearProjectText();

    this.actualTab = 'ichi';

    setTimeout(() => {
      this.actualProject = this.project1;
      this.actualTitle = this.project1Title;
      this.actualDescription = this.project1Description;
      this.actualStack = this.project1Stack;
      this.actualImage = this.project1Image;
      this.actualImageBis = this.project1ImageBis;

      this.visitLiveFrame.visible = true;
      this.visitLiveButton.visible = true;
      this.visitSoonButton.visible = false;
      this.githubLogo.visible = true;

      this.navbarLanguette.position.set(-0.0442, 0.001, -0.0127);

      this.appearProjectText();
    }, 700);
  }

  navigateNi() {
    this.disappearProjectText();

    this.actualTab = 'ni';

    setTimeout(() => {
      this.actualProject = this.project2;
      this.actualTitle = this.project2Title;
      this.actualDescription = this.project2Description;
      this.actualStack = this.project2Stack;
      this.actualImage = this.project2Image;
      this.actualImageBis = this.project2ImageBis;

      this.visitLiveFrame.visible = true;
      this.visitLiveButton.visible = true;
      this.visitSoonButton.visible = false;
      this.githubLogo.visible = true;

      this.navbarLanguette.position.set(-0.0442, 0.001, 0.06);

      this.appearProjectText();
    }, 700);
  }

  navigateSan() {
    this.disappearProjectText();

    this.actualTab = 'san';

    setTimeout(() => {
      this.actualProject = this.project3;
      this.actualTitle = this.project3Title;
      this.actualDescription = this.project3Description;
      this.actualStack = this.project3Stack;
      this.actualImage = this.project3Image;
      this.actualImageBis = null;

      this.visitLiveFrame.visible = true;
      this.visitLiveButton.visible = true;
      this.visitSoonButton.visible = false;
      this.githubLogo.visible = true;

      this.navbarLanguette.position.set(-0.0442, 0.001, 0.14);

      this.appearProjectText();
    }, 700);
  }

  navigateYon() {
    this.disappearProjectText();

    this.actualTab = 'yon';

    setTimeout(() => {
      this.actualProject = this.project4;
      this.actualTitle = this.project4Title;
      this.actualDescription = this.project4Description;
      this.actualStack = this.project4Stack;
      this.actualImage = null;
      this.actualImageBis = null;

      this.visitLiveFrame.visible = false;
      this.visitLiveButton.visible = false;
      this.visitSoonButton.visible = false;
      this.githubLogo.visible = true;

      this.navbarLanguette.position.set(-0.0442, 0.001, 0.22);

      this.appearProjectText();
    }, 700);
  }

  navigateGo() {
    this.disappearProjectText();

    this.actualTab = 'go';

    setTimeout(() => {
      this.actualProject = this.project5;
      this.actualTitle = this.project5Title;
      this.actualDescription = this.project5Description;
      this.actualStack = this.project5Stack;
      this.actualImage = this.project5Image;
      this.actualImageBis = null;

      this.visitLiveFrame.visible = false;
      this.visitLiveButton.visible = false;
      this.visitSoonButton.visible = false;
      this.githubLogo.visible = true;

      this.navbarLanguette.position.set(-0.0442, 0.001, 0.3);

      this.appearProjectText();
    }, 700);
  }

  navigateRoku() {
    this.disappearProjectText();

    this.actualTab = 'roku';

    setTimeout(() => {
      this.actualProject = this.project6;
      this.actualTitle = this.project6Title;
      this.actualDescription = this.project6Description;
      this.actualStack = this.project6Stack;
      this.actualImage = null;
      this.actualImageBis = null;

      this.visitLiveFrame.visible = false;
      this.visitLiveButton.visible = false;
      this.visitSoonButton.visible = false;
      this.githubLogo.visible = true;

      this.navbarLanguette.position.set(-0.0442, 0.001, 0.38);

      this.appearProjectText();
    }, 700);
  }

  navigateNana() {
    this.disappearProjectText();

    this.actualTab = 'nana';

    setTimeout(() => {
      this.actualProject = this.project7;
      this.actualTitle = this.project7Title;
      this.actualDescription = this.project7Description;
      this.actualStack = this.project7Stack;
      this.actualImage = this.project7Image;
      this.actualImageBis = null;

      this.visitLiveFrame.visible = true;
      this.visitLiveButton.visible = false;
      this.visitSoonButton.visible = true;
      this.githubLogo.visible = false;

      this.navbarLanguette.position.set(-0.0442, 0.001, 0.46);

      this.appearProjectText();
    }, 700);
  }
}
