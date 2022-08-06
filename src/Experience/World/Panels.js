import * as THREE from 'three';

import Experience from '../Experience.js';

import Gamen from './Gamen.js';

import gamenFragmentShaderLecture from '../../Shaders/Gamen/fragment.glsl';

export default class Panels {
  constructor(position) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    this.debugObject = {};

    this.pos = position;

    this.setGamens();

    this.setAnimation();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('panels');
      this.setDebug();
      this.debugFolder.close();
    }
  }

  setGamens() {
    this.gamens = [];

    switch (this.pos) {
      case 'left':
        this.gamenParams = {
          ueBreathingSpeed: -0.4,
          shitaBreathingSpeed: 0.2,
          color: '#0000ff',
          opacity: 0,
          shader: 'left',
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.translateX(-4);
        this.gamenOne.mesh.rotateY(Math.PI);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen(this.gamenParams);
        this.gamenTwo.mesh.translateX(-4.534);
        this.gamenTwo.mesh.translateZ(-1.54);
        this.gamenTwo.mesh.rotateY(-Math.PI * 0.5);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen(this.gamenParams);
        this.gamenThree.mesh.translateX(-4.534);
        this.gamenThree.mesh.translateZ(-0.54);
        this.gamenThree.mesh.rotateY(Math.PI * 0.5);
        this.gamens.push(this.gamenThree.mesh);
        break;
      case 'center':
        this.gamenParams = {
          ueBreathingSpeed: 0.5,
          shitaBreathingSpeed: -0.4,
          color: '#ff0000',
          opacity: 0,
          shader: 'center',
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.rotateY((11 * Math.PI) / 6 - 0.086);
        this.gamenOne.mesh.translateX(-0.57);
        this.gamenOne.mesh.translateZ(0.056);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen(this.gamenParams);
        this.gamenTwo.mesh.rotateY((11 * Math.PI) / 6 - 0.086);
        this.gamenTwo.mesh.translateX(-1.57);
        this.gamenTwo.mesh.translateZ(0.055);
        this.gamenTwo.mesh.rotateY(Math.PI);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen(this.gamenParams);
        this.gamenThree.mesh.translateX(-0.22);
        this.gamenThree.mesh.translateZ(-1.234);
        this.gamens.push(this.gamenThree.mesh);

        this.gamenFour = new Gamen(this.gamenParams);
        this.gamenFour.mesh.translateX(-1.22);
        this.gamenFour.mesh.translateZ(-1.234);
        this.gamenFour.mesh.rotateY(Math.PI);
        this.gamens.push(this.gamenFour.mesh);
        break;
      case 'right':
        this.gamenParams = {
          ueBreathingSpeed: 0.055,
          shitaBreathingSpeed: 1.55,
          color: '#00ff00',
          opacity: 0,
          shader: 'right',
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.translateX(2.54);
        this.gamenOne.mesh.rotateY(Math.PI);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen(this.gamenParams);
        this.gamenTwo.mesh.translateX(3.54);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen(this.gamenParams);
        this.gamenThree.mesh.translateX(4.24);
        this.gamenThree.mesh.translateZ(-0.5);
        this.gamenThree.mesh.rotateY(Math.PI * 0.35 + 0.135);
        this.gamens.push(this.gamenThree.mesh);

        setTimeout(() => {
          this.gamenThree.material.fragmentShader = gamenFragmentShaderLecture;
          setTimeout(() => {
            this.gamenThree.resetShader('gengo');
          }, 420);
        }, 420);

        this.gamenFour = new Gamen(this.gamenParams);
        this.gamenFour.mesh.rotateY(-(11 * Math.PI) / 6 + 0.1725);
        this.gamenFour.mesh.translateX(2.12);
        this.gamenFour.mesh.translateZ(1.2255);

        this.gamens.push(this.gamenFour.mesh);
        break;
    }

    this.scene.add(...this.gamens);
  }

  setAnimation() {
    const tick = () => {
      // Update gamens
      for (let gamen of this.gamens) {
        gamen.material.uniforms.uTime.value =
          this.experience.time.elapsed * 0.001;

        gamen.material.uniforms.uUeBreathingSpeed.value =
          this.gamenParams.ueBreathingSpeed;
        gamen.material.uniforms.uShitaBreathingSpeed.value =
          this.gamenParams.shitaBreathingSpeed;

        gamen.material.uniforms.uColor.value = new THREE.Color(
          this.gamenParams.color
        );
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    this.debugFolder
      .add(this.gamenParams, 'ueBreathingSpeed')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('ueBreathingSpeed');
    this.debugFolder
      .add(this.gamenParams, 'shitaBreathingSpeed')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('shitaBreathingSpeed');
    this.debugFolder.addColor(this.gamenParams, 'color').name('color');
  }
}
