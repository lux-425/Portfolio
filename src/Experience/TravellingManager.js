import * as THREE from 'three';

import Experience from './Experience';

import gamenFragmentShaderLecture from '../Shaders/Gamen/fragment.glsl';

export default class TravellingManager {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    var TWEEN = require('@tweenjs/tween.js');

    // Gamen on/off functions
    this.opacityUp = (gamen) => {
      var tweenGamenOpacityUp = new TWEEN.Tween(gamen)
        .to({ value: 0.88 }, 2000)
        .easing(TWEEN.Easing.Bounce.In)
        .onComplete(() => {
          switch (this.experience.world.area) {
            case 'profil':
              this.experience.world.textProfil.animateText();
              break;
          }
        });
      tweenGamenOpacityUp.start();
    };
    this.opacityDown = (gamen) => {
      var tweenGamenOpacityDown = new TWEEN.Tween(gamen)
        .to({ value: 0.0 }, 2000)
        .easing(TWEEN.Easing.Bounce.In)
        .onComplete(() => {
          switch (this.experience.world.area) {
            case 'profil':
              this.experience.world.leftPanels.gamenOne.material.fragmentShader =
                gamenFragmentShaderLecture;
              this.opacityUp(
                this.experience.world.leftPanels.gamenOne.material.uniforms
                  .uOpacity
              );
              break;
          }
        });
      tweenGamenOpacityDown.start();
    };

    /**
     * PROFIL
     */
    this.transitionInProfil = () => {
      this.opacityDown(
        this.experience.world.leftPanels.gamenOne.material.uniforms.uOpacity
      );
    };
  }
}
