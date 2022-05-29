import * as THREE from 'three';

import Experience from '../Experience.js';

import Gamen from './Gamen.js';

export default class Panels {
  constructor(position) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.pos = position;

    this.setGamens();

    this.setAnimation();
  }

  setGamens() {
    this.gamens = [];

    switch (this.pos) {
      case 'left':
        this.gamenOne = new Gamen();
        this.gamenOne.mesh.translateX(-4);
        this.gamenOne.mesh.translateZ(2);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen();
        this.gamenTwo.mesh.translateX(-4.534);
        this.gamenTwo.mesh.translateZ(1.47);
        this.gamenTwo.mesh.rotateY(-Math.PI * 0.5);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen();
        this.gamenThree.mesh.translateX(-4.534);
        this.gamenThree.mesh.translateZ(0.47);
        this.gamenThree.mesh.rotateY(-Math.PI * 0.5);
        this.gamens.push(this.gamenThree.mesh);
        break;
      case 'center':
        this.gamenOne = new Gamen();
        this.gamenOne.mesh.rotateY((11 * Math.PI) / 6 - 0.086);
        this.gamenOne.mesh.translateX(-0.425);
        this.gamenOne.mesh.translateZ(1.695);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen();
        this.gamenTwo.mesh.rotateY((11 * Math.PI) / 6 - 0.086);
        this.gamenTwo.mesh.translateX(0.57);
        this.gamenTwo.mesh.translateZ(1.696);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen();
        this.gamenThree.mesh.translateX(-0.22);
        this.gamenThree.mesh.translateZ(0.766);
        this.gamens.push(this.gamenThree.mesh);

        this.gamenFour = new Gamen();
        this.gamenFour.mesh.translateX(-1.22);
        this.gamenFour.mesh.translateZ(0.766);
        this.gamens.push(this.gamenFour.mesh);
        break;
      case 'right':
        this.gamenOne = new Gamen();
        this.gamenOne.mesh.translateX(3.54);
        this.gamenOne.mesh.translateZ(2.0);
        this.gamens.push(this.gamenOne.mesh);

        this.gamenTwo = new Gamen();
        this.gamenTwo.mesh.translateX(2.54);
        this.gamenTwo.mesh.translateZ(2.0);
        this.gamens.push(this.gamenTwo.mesh);

        this.gamenThree = new Gamen();
        this.gamenThree.mesh.rotateY(-(11 * Math.PI) / 6 + 0.1725);
        this.gamenThree.mesh.translateX(0.82);
        this.gamenThree.mesh.translateZ(2.76);
        this.gamens.push(this.gamenThree.mesh);

        this.gamenFour = new Gamen();
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
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
