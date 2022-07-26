import * as THREE from 'three';

import Experience from './Experience';

import gamenFragmentShaderLecture from '../Shaders/Gamen/fragment.glsl';

export default class TravellingManager {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    var TWEEN = require('@tweenjs/tween.js');

    this.travellingAlready = false;

    this.toggleReading = false;
    this.toggledAlready = false;
    this.toggledAlreadyBis = false;
    this.toggledAlreadyTer = false;

    /**
     *
     * OPACITY DOWN => OPACITY UP + SHADERS' SWITCH => ANIMATION
     *
     */
    this.opacityUp = (gamen) => {
      var tweenGamenOpacityUp = new TWEEN.Tween(gamen)
        .to({ value: 0.88 }, 555)
        .easing(TWEEN.Easing.Bounce.Out)
        .onComplete(() => {
          if (!this.toggledAlreadyTer) {
            this.toggledAlreadyTer = true;

            if (this.toggleReading) {
              switch (this.toggledArea) {
                case 'profil':
                  this.experience.world.textProfil.animateText();
                  break;
                case 'shoukai':
                  this.experience.world.textShoukai.animateText();
                  break;
                case 'keiken':
                  this.experience.world.textKeiken.animate();
                  break;
                case 'projects':
                  this.experience.world.textProjects.animate();
                  break;
                case 'gaku':
                  this.experience.world.textGaku.animateText();
                  break;
                case 'kyoumi':
                  this.experience.world.textKyoumi.animateText();
                  break;
                case 'gengo':
                  this.experience.world.textGengo.animateText();
                  break;
              }
            }
          }
          this.travellingAlready = false;
        });
      tweenGamenOpacityUp.start();
    };
    this.opacityDown = (gamen) => {
      var tweenGamenOpacityDown = new TWEEN.Tween(gamen)
        .to({ value: 0.18 }, 555)
        .easing(TWEEN.Easing.Bounce.In)
        .onStart(() => {
          if (!this.toggledAlreadyBis) {
            this.toggledAlreadyBis = true;

            if (this.toggleReading) {
              switch (this.toggledArea) {
                case 'profil':
                  this.translationProfil();
                  break;
                case 'shoukai':
                  this.translationShoukai();
                  break;
                case 'keiken':
                  this.translationKeiken();
                  break;
                case 'projects':
                  this.translationProjects();
                  break;
                case 'gaku':
                  this.translationGaku();
                  break;
                case 'kyoumi':
                  this.translationKyoumi();
                  break;
                case 'gengo':
                  this.translationGengo();
                  break;
              }
            }
          }
        })
        .onComplete(() => {
          if (!this.toggledAlready) {
            this.toggledAlready = true;

            switch (this.toggledArea) {
              case 'profil':
                if (this.toggleReading) {
                  this.experience.world.leftPanels.gamenOne.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(this.experience.world.textProfil.textModel);
                  this.experience.world.leftPanels.gamenOne.resetShader(
                    'profil'
                  );
                }
                this.opacityUp(
                  this.experience.world.leftPanels.gamenOne.material.uniforms
                    .uOpacity
                );
                break;
              case 'shoukai':
                if (this.toggleReading) {
                  this.experience.world.leftPanels.gamenTwo.material.fragmentShader =
                    gamenFragmentShaderLecture;
                  this.experience.world.leftPanels.gamenThree.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(
                    this.experience.world.textShoukai.textModel
                  );
                  this.experience.world.leftPanels.gamenTwo.resetShader(
                    'shoukai'
                  );
                  this.experience.world.leftPanels.gamenThree.resetShader(
                    'shoukai'
                  );
                }
                this.opacityUp(
                  this.experience.world.leftPanels.gamenTwo.material.uniforms
                    .uOpacity
                );
                this.opacityUp(
                  this.experience.world.leftPanels.gamenThree.material.uniforms
                    .uOpacity
                );
                break;
              case 'keiken':
                if (this.toggleReading) {
                  this.experience.world.centerPanels.gamenOne.material.fragmentShader =
                    gamenFragmentShaderLecture;
                  this.experience.world.centerPanels.gamenTwo.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(this.experience.world.textKeiken.textModel);
                  this.experience.world.centerPanels.gamenOne.resetShader(
                    'keiken'
                  );
                  this.experience.world.centerPanels.gamenTwo.resetShader(
                    'keiken'
                  );
                }
                this.opacityUp(
                  this.experience.world.centerPanels.gamenOne.material.uniforms
                    .uOpacity
                );
                this.opacityUp(
                  this.experience.world.centerPanels.gamenTwo.material.uniforms
                    .uOpacity
                );
                break;
              case 'projects':
                if (this.toggleReading) {
                  this.experience.world.centerPanels.gamenThree.material.fragmentShader =
                    gamenFragmentShaderLecture;
                  this.experience.world.centerPanels.gamenFour.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(
                    this.experience.world.textProjects.textModel
                  );
                  this.experience.world.centerPanels.gamenThree.resetShader(
                    'projects'
                  );
                  this.experience.world.centerPanels.gamenFour.resetShader(
                    'projects'
                  );
                }
                this.opacityUp(
                  this.experience.world.centerPanels.gamenThree.material
                    .uniforms.uOpacity
                );
                this.opacityUp(
                  this.experience.world.centerPanels.gamenFour.material.uniforms
                    .uOpacity
                );
                break;
              case 'gaku':
                if (this.toggleReading) {
                  this.experience.world.rightPanels.gamenOne.material.fragmentShader =
                    gamenFragmentShaderLecture;
                  this.experience.world.rightPanels.gamenTwo.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(this.experience.world.textGaku.textModel);
                  this.experience.world.rightPanels.gamenOne.resetShader(
                    'gaku'
                  );
                  this.experience.world.rightPanels.gamenTwo.resetShader(
                    'gaku'
                  );
                }
                this.opacityUp(
                  this.experience.world.rightPanels.gamenOne.material.uniforms
                    .uOpacity
                );
                this.opacityUp(
                  this.experience.world.rightPanels.gamenTwo.material.uniforms
                    .uOpacity
                );
                break;
              case 'kyoumi':
                if (this.toggleReading) {
                  this.experience.world.rightPanels.gamenThree.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(this.experience.world.textKyoumi.textModel);
                  this.experience.world.rightPanels.gamenThree.resetShader(
                    'kyoumi'
                  );
                }
                this.opacityUp(
                  this.experience.world.rightPanels.gamenThree.material.uniforms
                    .uOpacity
                );
                break;
              case 'gengo':
                if (this.toggleReading) {
                  this.experience.world.rightPanels.gamenThree.material.fragmentShader =
                    gamenFragmentShaderLecture;
                  this.experience.world.rightPanels.gamenFour.material.fragmentShader =
                    gamenFragmentShaderLecture;
                } else {
                  this.scene.remove(
                    this.experience.world.textGengo.textModelRight
                  );
                  this.scene.remove(
                    this.experience.world.textGengo.textModelLeft
                  );
                  this.experience.world.rightPanels.gamenThree.resetShader(
                    'gengo'
                  );
                  this.experience.world.rightPanels.gamenFour.resetShader(
                    'gengo'
                  );
                }
                this.opacityUp(
                  this.experience.world.rightPanels.gamenThree.material.uniforms
                    .uOpacity
                );
                this.opacityUp(
                  this.experience.world.rightPanels.gamenFour.material.uniforms
                    .uOpacity
                );
                break;
            }
          }
        });
      tweenGamenOpacityDown.start();
    };

    /**
     *
     * TRANSITIONS / TRANSLATIONS
     *
     */
    /**
     * HOME
     */
    this.transitionHome = (toggleReading) => {
      if (toggleReading) {
        this.experience.world.textKeshiki.contact.visible = true;
        this.experience.world.textKeshiki.select.visible = true;
        this.translationHome();
      } else {
        this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
          new THREE.Color('#ffffff');
        this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
          new THREE.Color('#000000');
        this.experience.world.particles.toggleSpeed = 1;
        this.experience.world.textKeshiki.contact.visible = false;
        this.experience.world.textKeshiki.select.visible = false;
      }
      this.travellingAlready = false;
    };
    this.translationHome = () => {
      // move kamera...
      this.experience.world.chikei.debugObject.surfaceColor = '#ffffff';
      this.experience.world.area = 'home';
    };

    /**
     * PROFIL
     */
    this.transitionProfil = (toggleReading) => {
      this.toggledArea = 'profil';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.leftPanels.gamenOne.material.uniforms.uOpacity
      );
    };
    this.translationProfil = () => {
      // move kamera
      setTimeout(() => {
        this.experience.world.area = 'profil';
      }, 2000);
    };

    /**
     * SHOUKAI
     */
    this.transitionShoukai = (toggleReading) => {
      this.toggledArea = 'shoukai';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.leftPanels.gamenTwo.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.leftPanels.gamenThree.material.uniforms.uOpacity
      );
    };
    this.translationShoukai = () => {
      // move kamera
      setTimeout(() => {
        this.experience.world.area = 'shoukai';
      }, 2000);
    };

    /**
     * KEIKEN
     */
    this.transitionKeiken = (toggleReading) => {
      this.toggledArea = 'keiken';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.centerPanels.gamenOne.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.centerPanels.gamenTwo.material.uniforms.uOpacity
      );
    };
    this.translationKeiken = () => {
      // move kamera...
      setTimeout(() => {
        this.experience.world.area = 'keiken';
      }, 2000);
    };

    /**
     * PROJECTS
     */
    this.transitionProjects = (toggleReading) => {
      this.toggledArea = 'projects';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.centerPanels.gamenThree.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.centerPanels.gamenFour.material.uniforms.uOpacity
      );
    };
    this.translationProjects = () => {
      // move kamera...
      setTimeout(() => {
        this.experience.world.area = 'projects';
      }, 2000);
    };

    /**
     * GAKU
     */
    this.transitionGaku = (toggleReading) => {
      this.toggledArea = 'gaku';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.rightPanels.gamenOne.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.rightPanels.gamenTwo.material.uniforms.uOpacity
      );
    };
    this.translationGaku = () => {
      // move kamera...
      setTimeout(() => {
        this.experience.world.area = 'gaku';
      }, 2000);
    };

    /**
     * KYOUMI
     */
    this.transitionKyoumi = (toggleReading) => {
      this.toggledArea = 'kyoumi';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.rightPanels.gamenThree.material.uniforms.uOpacity
      );
    };
    this.translationKyoumi = () => {
      // move kamera...
      setTimeout(() => {
        this.experience.world.area = 'kyoumi';
      }, 2000);
    };

    /**
     * GENGO
     */
    this.transitionGengo = (toggleReading) => {
      this.toggledArea = 'gengo';

      if (toggleReading) {
        this.toggleReading = true;
      } else {
        this.toggleReading = false;
      }

      this.opacityDown(
        this.experience.world.rightPanels.gamenThree.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.rightPanels.gamenFour.material.uniforms.uOpacity
      );
    };
    this.translationGengo = () => {
      // move kamera...
      setTimeout(() => {
        this.experience.world.area = 'gengo';
      }, 2000);
    };
  }
}
