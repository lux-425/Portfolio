import * as THREE from 'three';

import Experience from './Experience.js';

export default class Yubisashi {
  constructor(yubisashiMono) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    /**
     * 指差し物
     */
    this.yubisashiMono = yubisashiMono;

    /**
     * Raycaster
     */
    this.raycaster = new THREE.Raycaster();

    /**
     *
     * CLICK EVENTS
     *
     */
    window.addEventListener('click', () => {
      if (this.currentIntersect) {
        switch (this.currentIntersect) {
          case 'buttonRefreshProfil':
            this.scene.add(this.experience.world.textProfil.textModel);
            this.experience.world.textProfil.animateText();
            break;
          case 'arrowHitboxProfil':
            this.scene.remove(this.experience.world.textProfil.textModel);
            break;
          case 'buttonRefreshKeiken':
            this.experience.world.textKeiken.animate();
            break;
          case 'arrowHitboxKeiken':
            this.scene.remove(this.experience.world.textKeiken.textModel);
            break;
          case 'buttonRefreshProject':
            this.experience.world.textProject.animate();
            break;
          case 'navbarIchi':
            this.experience.world.textProject.navigateIchi();
            break;
          case 'navbarNi':
            this.experience.world.textProject.navigateNi();
            break;
          case 'navbarSan':
            this.experience.world.textProject.navigateSan();
            break;
          case 'navbarYon':
            this.experience.world.textProject.navigateYon();
            break;
          case 'navbarGo':
            this.experience.world.textProject.navigateGo();
            break;
          case 'navbarRoku':
            this.experience.world.textProject.navigateRoku();
            break;
          case 'navbarTsugi':
            this.experience.world.textProject.navigateNana();
            break;
        }
      }
    });

    this.setRaycasting();
  }

  setRaycasting() {
    const tick = () => {
      // Raycasting
      this.raycaster.setFromCamera(
        this.experience.mouse,
        this.experience.camera.instance
      );

      this.objectsToTest = this.yubisashiMono;
      this.intersects = this.raycaster.intersectObjects(this.objectsToTest);

      if (this.intersects.length) {
        // MOUSE ENTER
        if (!this.currentIntersect) {
          if (this.intersects[0].object.name === 'arrowHitboxProfil') {
            this.experience.world.textProfil.tweenTranslateRightArrowProfil.start();
          } else if (this.intersects[0].object.name === 'arrowHitboxKeiken') {
            this.experience.world.textKeiken.tweenTranslateRightArrowKeiken.start();
          }
        }
        this.currentIntersect = this.intersects[0].object.name;
      } else {
        // MOUSE LEAVE
        if (this.currentIntersect) {
          if (this.currentIntersect === 'arrowHitboxProfil') {
            this.experience.world.textProfil.tweenTranslateLeftArrowProfil.start();
          } else if (this.currentIntersect === 'arrowHitboxKeiken') {
            this.experience.world.textKeiken.tweenTranslateLeftArrowKeiken.start();
          }
        }
        this.currentIntersect = null;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
