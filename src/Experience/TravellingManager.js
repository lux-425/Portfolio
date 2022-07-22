import * as THREE from 'three';

import Experience from './Experience';

import gamenFragmentShaderLecture from '../Shaders/Gamen/fragment.glsl';

export default class TravellingManager {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    var TWEEN = require('@tweenjs/tween.js');

    /**
     * PROFIL
     */
    this.transitionInProfil = () => {
      var tweenGamenOpacityUp = new TWEEN.Tween(
        this.experience.world.leftPanels.gamenOne.material.uniforms.uOpacity
      )
        .to({ value: 0.88 }, 2000)
        .easing(TWEEN.Easing.Bounce.In)
        .onComplete(() => {
          this.experience.world.textProfil.animateText();
        });

      var tweenGamenOpacityDown = new TWEEN.Tween(
        this.experience.world.leftPanels.gamenOne.material.uniforms.uOpacity
      )
        .to({ value: 0 }, 2000)
        .easing(TWEEN.Easing.Bounce.Out)
        .onComplete(() => {
          this.experience.world.leftPanels.gamenOne.material.fragmentShader =
            gamenFragmentShaderLecture;
          tweenGamenOpacityUp.start();
        });
      tweenGamenOpacityDown.start();
    };
  }
}
