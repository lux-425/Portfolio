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
          ueBreathingElevation: 5.0,
          shitaBreathingElevation: 10.0,
          ueBreathingFrequency: { x: 0.8, y: 0.8 },
          shitaBreathingFrequency: -5.0,
          ueBreathingSpeed: -0.4,
          shitaBreathingSpeed: 0.2,
          shitaBreathingIterations: 1.0,
          color: '#0000ff',
          opacity: 0.58,
          shader: 'left',
        };

        this.gamenOne = new Gamen(this.gamenParams);
        this.gamenOne.mesh.translateX(-4);
        //
        this.gamenOne.mesh.translateZ(5);
        this.gamenOne.mesh.translateX(4);
        //
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
          ueBreathingElevation: 10.0,
          shitaBreathingElevation: 8.0,
          ueBreathingFrequency: { x: 5.0, y: 5.0 },
          shitaBreathingFrequency: 5.0,
          ueBreathingSpeed: 0.5,
          shitaBreathingSpeed: -0.4,
          shitaBreathingIterations: 2.0,
          color: '#ff0000',
          opacity: 0.88,
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
          ueBreathingElevation: 10.0,
          shitaBreathingElevation: 3.0,
          ueBreathingFrequency: { x: 2.0, y: 2.0 },
          shitaBreathingFrequency: 2.0,
          ueBreathingSpeed: -0.3,
          shitaBreathingSpeed: -0.5,
          shitaBreathingIterations: 1.0,
          color: '#00ff00',
          opacity: 0.88,
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

        this.gamenFour = new Gamen(this.gamenParams);
        this.gamenFour.mesh.rotateY(-(11 * Math.PI) / 6 + 0.1725);
        this.gamenFour.mesh.translateX(2.120);
        this.gamenFour.mesh.translateZ(1.2255);

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

        // TWEAKING
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

        // テスト！！！


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
    this.debugFolder.addColor(this.gamenParams, 'color').name('color');
    this.debugFolder
      .add(this.gamenParams, 'opacity')
      .min(0)
      .max(2)
      .step(0.05)
      .name('opacity');
  }
}
