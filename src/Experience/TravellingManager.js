import * as THREE from 'three';

import Experience from './Experience';

import gamenFragmentShaderLecture from '../Shaders/Gamen/fragment.glsl';

export default class TravellingManager {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    var TWEEN = require('@tweenjs/tween.js');

    this.toggleReading = null;
    this.toggledAlready = null;
    this.toggledAlreadyBis = null;

    // Gamen on/off functions
    this.opacityUp = (gamen) => {
      var tweenGamenOpacityUp = new TWEEN.Tween(gamen)
        .to({ value: 0.88 }, 1111)
        .easing(TWEEN.Easing.Bounce.Out)
        .onComplete(() => {
          if (!this.toggledAlreadyBis) {
            this.toggledAlreadyBis = true;

            if (this.toggleReading) {
              switch (this.toggledArea) {
                case 'profil':
                  this.experience.world.textProfil.animateText();
                  break;
                case 'keiken':
                  this.experience.world.textKeiken.animate();
                  break;
                case 'gaku':
                  this.experience.world.textGaku.animateText();
                  break;
              }
            }
          }
        });
      tweenGamenOpacityUp.start();
    };
    this.opacityDown = (gamen) => {
      var tweenGamenOpacityDown = new TWEEN.Tween(gamen)
        .to({ value: 0.18 }, 1111)
        .easing(TWEEN.Easing.Bounce.In)
        .onStart(() => {
          if (!this.toggledAlready) {
            if (this.toggleReading) {
              switch (this.toggledArea) {
                case 'profil':
                  this.translationProfil();
                  break;
                case 'keiken':
                  this.translationKeiken();
                  break;
                case 'gaku':
                  this.translationGaku();
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
            }
          }
        });
      tweenGamenOpacityDown.start();
    };

    /**
     * GO HOME
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
    };
    this.translationHome = () => {
      // move kamera...
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

      // oncomplete...
      this.experience.world.area = 'profil';
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
      this.experience.world.area = 'keiken';
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
      this.experience.world.area = 'gaku';
    };
  }
}
