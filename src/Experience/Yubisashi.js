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
          case 'arrowHitboxProfil':
            this.scene.remove(this.experience.world.textProfil.textModel);
            break;
          case 'buttonRefreshProfil':
            this.scene.add(this.experience.world.textProfil.textModel);
            this.experience.world.textProfil.animateText();
            break;
          case 'zarrowHomeHitboxProfil':
            console.log('go home from profil');
            break;

          case 'arrowHitboxKeiken':
            this.scene.remove(this.experience.world.textKeiken.textModel);
            break;
          case 'buttonRefreshKeiken':
            this.experience.world.textKeiken.animate();
            break;
          case 'yarrowHomeHitbox':
            console.log('go home from keiken');
            break;

          case 'arrowHitboxProject':
            this.experience.world.textProject.animate();
            break;
          case 'buttonRefreshProject':
            this.experience.world.textProject.animate();
            break;
          case 'yhomeArrowHitbox':
            console.log('go home from project');
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
          case 'zgithubHitbox':
            console.log('visit repository');
            break;
          case 'visitHitbox':
            console.log('visit live');
            break;
          case 'buttonRefreshGaku':
            this.experience.world.textGaku.animateText();
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
          } else if (this.intersects[0].object.name === 'arrowHitboxProject') {
            this.experience.world.textProject.tweenTranslateLeftArrow.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxGakuRight'
          ) {
            this.experience.world.textGaku.tweenArrowRightToggle.start();
            // this.experience.world.textGaku.tweenArrowTextAppear(
            //   this.experience.world.textGaku.arrowTextGakuRight
            // );
          } else if (
            this.intersects[0].object.name === 'arrowHitboxGakuLeft001'
          ) {
            this.experience.world.textGaku.tweenArrowLeftToggle.start();
            // this.experience.world.textGaku.tweenArrowTextAppear(
            //   this.experience.world.textGaku.arrowTextGakuLeft
            // );
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
          } else if (this.currentIntersect === 'arrowHitboxProject') {
            this.experience.world.textProject.tweenTranslateRightArrow.start();
          } else if (this.currentIntersect === 'arrowHitboxGakuRight') {
            this.experience.world.textGaku.tweenArrowRightOrigin.start();
            // this.experience.world.textGaku.tweenArrowTextDisappear(
            //   this.experience.world.textGaku.arrowTextGakuRight
            // );
          } else if (this.currentIntersect === 'arrowHitboxGakuLeft001') {
            this.experience.world.textGaku.tweenArrowLeftOrigin.start();
            // this.experience.world.textGaku.tweenArrowTextDisappear(
            //   this.experience.world.textGaku.arrowTextGakuLeft
            // );
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
