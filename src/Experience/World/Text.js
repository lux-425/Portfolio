import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Text {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('text');
    }

    /**
     * テスト!!!
     */
    this.debugParams = {};

    //

    this.paragraphs = [
      {
        position: new THREE.Vector3(0, 1.7, 5),
        element: document.querySelector('.paragraph-0'),
      },
    ];

    this.setAnimation();
  }

  setAnimation() {

    const tick = () => {
      for (const paragraph of this.paragraphs) {
        const screenPosition = paragraph.position.clone();
        screenPosition.project(this.scene.children[0]);

        const translateX = screenPosition.x * this.experience.sizes.width * 0.5;
        const translateY = -screenPosition.y * this.experience.sizes.height * 0.5;
        paragraph.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
