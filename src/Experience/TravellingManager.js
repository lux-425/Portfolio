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
        .to({ value: 0.88 }, 1111)
        .easing(TWEEN.Easing.Bounce.Out)
        .onComplete(() => {
          switch (this.experience.world.area) {
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
        });
      tweenGamenOpacityUp.start();
    };
    this.opacityDown = (gamen) => {
      var tweenGamenOpacityDown = new TWEEN.Tween(gamen)
        .to({ value: 0.18 }, 1111)
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
            case 'keiken':
              this.experience.world.centerPanels.gamenOne.material.fragmentShader =
                gamenFragmentShaderLecture;
              this.experience.world.centerPanels.gamenTwo.material.fragmentShader =
                gamenFragmentShaderLecture;
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
              this.experience.world.rightPanels.gamenOne.material.fragmentShader =
                gamenFragmentShaderLecture;
              this.experience.world.rightPanels.gamenTwo.material.fragmentShader =
                gamenFragmentShaderLecture;
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

    /**
     * KEIKEN
     */
    this.transitionInKeiken = () => {
      this.opacityDown(
        this.experience.world.centerPanels.gamenOne.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.centerPanels.gamenTwo.material.uniforms.uOpacity
      );
    };

    /**
     * GAKU
     */
    this.transitionInGaku = () => {
      this.opacityDown(
        this.experience.world.rightPanels.gamenOne.material.uniforms.uOpacity
      );
      this.opacityDown(
        this.experience.world.rightPanels.gamenTwo.material.uniforms.uOpacity
      );
    };
  }
}
