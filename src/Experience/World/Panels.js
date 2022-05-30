import * as THREE from 'three';

import Experience from '../Experience.js';

import Gamen from './Gamen.js';

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
          ueBreathingElevation: 8.0,
          shitaBreathingElevation: 10.0,
          ueBreathingFrequency: { x: 1.24, y: 2.4 },
          shitaBreathingFrequency: 5.0,
          ueBreathingSpeed: -0.8,
          shitaBreathingSpeed: 0.3,
          shitaBreathingIterations: 1.0,
          color: '#0000ff',
          opacity: 0.66,
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.translateX(-4);
        this.gamenOne.mesh.translateZ(2);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen(this.gamenParams);
        this.gamenTwo.mesh.translateX(-4.534);
        this.gamenTwo.mesh.translateZ(1.47);
        this.gamenTwo.mesh.rotateY(-Math.PI * 0.5);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen(this.gamenParams);
        this.gamenThree.mesh.translateX(-4.534);
        this.gamenThree.mesh.translateZ(0.47);
        this.gamenThree.mesh.rotateY(-Math.PI * 0.5);
        this.gamens.push(this.gamenThree.mesh);
        break;
      case 'center':
        this.gamenParams = {
          ueBreathingElevation: 8.0,
          shitaBreathingElevation: 10.0,
          ueBreathingFrequency: { x: 1.24, y: 2.4 },
          shitaBreathingFrequency: 5.0,
          ueBreathingSpeed: -0.8,
          shitaBreathingSpeed: 0.3,
          shitaBreathingIterations: 3.0,
          color: '#ff0000',
          opacity: 0.66,
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.rotateY((11 * Math.PI) / 6 - 0.086);
        this.gamenOne.mesh.translateX(-0.425);
        this.gamenOne.mesh.translateZ(1.695);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen(this.gamenParams);
        this.gamenTwo.mesh.rotateY((11 * Math.PI) / 6 - 0.086);
        this.gamenTwo.mesh.translateX(0.57);
        this.gamenTwo.mesh.translateZ(1.696);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen(this.gamenParams);
        this.gamenThree.mesh.translateX(-0.22);
        this.gamenThree.mesh.translateZ(0.766);
        this.gamens.push(this.gamenThree.mesh);

        this.gamenFour = new Gamen(this.gamenParams);
        this.gamenFour.mesh.translateX(-1.22);
        this.gamenFour.mesh.translateZ(0.766);
        this.gamens.push(this.gamenFour.mesh);
        break;
      case 'right':
        this.gamenParams = {
          ueBreathingElevation: 8.0,
          shitaBreathingElevation: 10.0,
          ueBreathingFrequency: { x: 1.24, y: 2.4 },
          shitaBreathingFrequency: 5.0,
          ueBreathingSpeed: -0.8,
          shitaBreathingSpeed: 0.3,
          shitaBreathingIterations: 2.0,
          color: '#00ff00',
          opacity: 0.66,
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.translateX(3.54);
        this.gamenOne.mesh.translateZ(2.0);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen(this.gamenParams);
        this.gamenTwo.mesh.translateX(2.54);
        this.gamenTwo.mesh.translateZ(2.0);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen(this.gamenParams);
        this.gamenThree.mesh.rotateY(-(11 * Math.PI) / 6 + 0.1725);
        this.gamenThree.mesh.translateX(0.82);
        this.gamenThree.mesh.translateZ(2.76);
        this.gamens.push(this.gamenThree.mesh);

        this.gamenFour = new Gamen(this.gamenParams);
        this.gamenFour.mesh.translateX(4.24);
        this.gamenFour.mesh.translateZ(1.498);
        this.gamenFour.mesh.rotateY(Math.PI * 1.35 + 0.135);
        this.gamens.push(this.gamenFour.mesh);
        break;
      default:
        console.log('宇宙中');
    }

    this.scene.add(...this.gamens);
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update gamens
      for (let gamen of this.gamens) {
        gamen.material.uniforms.uTime.value = elapsedTime;

        gamen.material.uniforms.uUeBreathingElevation.value =
          this.gamenParams.ueBreathingElevation;
        gamen.material.uniforms.uUeBreathingFrequency.value.x =
          this.gamenParams.ueBreathingFrequency.x;
        gamen.material.uniforms.uUeBreathingFrequency.value.y =
          this.gamenParams.ueBreathingFrequency.y;
        gamen.material.uniforms.uUeBreathingSpeed.value =
          this.gamenParams.ueBreathingSpeed;

        gamen.material.uniforms.uShitaBreathingElevation.value =
          this.gamenParams.shitaBreathingElevation;
        gamen.material.uniforms.uShitaBreathingFrequency.value =
          this.gamenParams.shitaBreathingFrequency;
        gamen.material.uniforms.uShitaBreathingSpeed.value =
          this.gamenParams.shitaBreathingSpeed;
        gamen.material.uniforms.uShitaBreathingIterations.value =
          this.gamenParams.shitaBreathingIterations;

        gamen.material.uniforms.uColor.value = new THREE.Color(
          this.gamenParams.color
        );
        gamen.material.uniforms.uOpacity.value = this.gamenParams.opacity;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  updateUniforms() {
    // for (let gamen of this.gamens) {
    //   console.log(gamen);
    // }
  }

  setDebug() {
    this.debugFolder
      .add(this.gamenParams, 'ueBreathingElevation')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('ueBreathingElevation');
    this.debugFolder
      .add(this.gamenParams, 'shitaBreathingElevation')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('shitaBreathingElevation');
    this.debugFolder
      .add(this.gamenParams.ueBreathingFrequency, 'x')
      .min(0)
      .max(5)
      .step(0.001)
      .name('ueBreathingFrequencyX');
    this.debugFolder
      .add(this.gamenParams.ueBreathingFrequency, 'y')
      .min(0)
      .max(5)
      .step(0.001)
      .name('ueBreathingFrequencyY');
    this.debugFolder
      .add(this.gamenParams, 'shitaBreathingFrequency')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('shitaBreathingFrequency');
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
    this.debugFolder
      .add(this.gamenParams, 'shitaBreathingIterations')
      .min(0)
      .max(4)
      .step(1)
      .name('shitaBreathingIterations');
    this.debugFolder
      .addColor(this.gamenParams, 'color')
      .name('color');
    this.debugFolder
      .add(this.gamenParams, 'opacity')
      .min(0)
      .max(2)
      .step(0.05)
      .name('opacity');
  }
}
