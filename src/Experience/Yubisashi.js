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

    this.gamenNamesArr = [
      'leftAreaGamen',
      'centerAreaGamen',
      'centerAreaGamenBis',
      'rightAreaGamen',
      'rightAreaGamenBis',
    ];

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
          case 'contactHitbox':
            window.open('https://linktr.ee/garcialuc');
            break;

          case 'buttonRefreshKeshiki':
            this.experience.world.textKeshiki.animateText();
            break;

          case 'ball':
            this.experience.world.polygonBall.mesh.material.color =
              new THREE.Color(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              );
            break;
          case 'torus':
            this.experience.world.polygonTorus.mesh.material.color =
              new THREE.Color(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              );
            break;
          case 'globeTwo':
            this.experience.world.polygonGlobeTwo.mesh.material.color =
              new THREE.Color(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              );
            break;
          case 'gem':
            this.experience.world.polygonGem.mesh.material.color =
              new THREE.Color(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              );
            break;

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
          case 'Faurecia_Logo':
            window.open('https://www.faurecia.com/en');
            break;
          case 'xlogo-sterimed':
            window.open('https://www.sterimed.fr/');
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
            switch (this.experience.world.textProject.actualTab) {
              case 'ichi':
                window.open('https://github.com/Luke-425/Nomi-Uebu');
                break;
              case 'ni':
                window.open('https://github.com/Luke-425/KyouKyoku');
                break;
              case 'san':
                window.open('https://github.com/Luke-425/KimiKan');
                break;
              case 'yon':
                window.open('https://github.com/Luke-425/HonMen');
                break;
              case 'go':
                window.open('https://github.com/Luke-425/Byuffet');
                break;
              case 'roku':
                window.open('https://github.com/Luke-425/Portfolio');
                break;
              default:
                console.log('no github path');
                break;
            }
            break;
          case 'visitHitbox':
            console.log('visit live');
            break;

          case 'buttonRefreshGaku':
            this.experience.world.textGaku.animateText();
            break;
          case 'Logo_UT3':
            window.open(
              'https://en.wikipedia.org/wiki/Toulouse_III_-_Paul_Sabatier_University'
            );
            break;
          case 'Logo_Université_de_Franche-Comté_2018':
            window.open(
              'https://en.wikipedia.org/wiki/University_of_Franche-Comt%C3%A9'
            );
            break;

          case 'buttonRefreshKyoumi':
            this.experience.world.textKyoumi.animateText();
            break;

          case 'buttonRefreshGengo':
            this.experience.world.textGengo.animateText();
            break;
          case 'buttonHitboxHon':
            this.experience.world.textGengo.toggleHon();
            break;
          case 'buttonHitboxSoftwares':
            this.experience.world.textGengo.toggleSoftwares();
            break;
          case 'buttonHitboxJLPT':
            this.experience.world.textGengo.toggleJLPT();
            break;
          case 'anki':
            window.open('https://apps.ankiweb.net/');
            break;
          case 'bunpro':
            window.open('https://bunpro.jp/');
            break;
          case 'rtk':
            window.open(
              'https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi'
            );
            break;
        }
      }
    });

    this.setRaycasting();
  }

  toggleGamenKeshiki() {
    this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 1;
    this.experience.world.textKeshiki.contact.visible = false;
    this.experience.world.textKeshiki.select.visible = false;
    this.experience.world.particles.toggleSpeed = 5;
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
        document.body.style.cursor = 'pointer';
        // this.experience.togglePointer(true);

        // MOUSE ENTER
        if (!this.currentIntersect) {
          if (this.intersects[0].object.name === 'contactHitbox') {
            this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
              new THREE.Color(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              );
            this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 1;
          } else if (this.intersects[0].object.name === 'leftAreaGamen') {
            this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#0000d1');
            this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
              new THREE.Color('#b56cfe');
            this.experience.world.chikei.chikeiModel.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#0000ff');
            this.toggleGamenKeshiki();
            this.experience.world.textKeshiki.about(true, 'one');
          } else if (
            this.intersects[0].object.name === 'centerAreaGamen' ||
            this.intersects[0].object.name === 'centerAreaGamenBis'
          ) {
            this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#00ccff');
            this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
              new THREE.Color('#6b00b3');
            this.experience.world.chikei.chikeiModel.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#ff0000');
            this.toggleGamenKeshiki();
            this.experience.world.textKeshiki.about(true, 'two');
          } else if (
            this.intersects[0].object.name === 'rightAreaGamen' ||
            this.intersects[0].object.name === 'rightAreaGamenBis'
          ) {
            this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#ff00ae');
            this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
              new THREE.Color('#4e447e');
            this.experience.world.chikei.chikeiModel.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#00ff00');
            this.toggleGamenKeshiki();
            this.experience.world.textKeshiki.about(true, 'three');
          } else if (this.intersects[0].object.name === 'arrowHitboxProfil') {
            this.experience.world.textProfil.tweenTranslateRightArrowProfil.start();
          } else if (this.intersects[0].object.name === 'arrowHitboxKeiken') {
            this.experience.world.textKeiken.tweenTranslateRightArrowKeiken.start();
          } else if (this.intersects[0].object.name === 'arrowHitboxProject') {
            this.experience.world.textProject.tweenTranslateLeftArrow.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxGakuLeft001'
          ) {
            this.experience.world.textGaku.tweenArrowLeftToggle.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxGakuRight'
          ) {
            this.experience.world.textGaku.tweenArrowRightToggle.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxKyoumiLeft'
          ) {
            this.experience.world.textKyoumi.tweenToggleArrowLeft.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxKyoumiRight'
          ) {
            this.experience.world.textKyoumi.tweenToggleArrowRight.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxGengoLeft'
          ) {
            this.experience.world.textGengo.tweenToggleArrowLeft.start();
          } else if (
            this.intersects[0].object.name === 'arrowHitboxGengoRight'
          ) {
            this.experience.world.textGengo.tweenToggleArrowRight.start();
          }
        }
        this.currentIntersect = this.intersects[0].object.name;
      } else {
        document.body.style.cursor = 'default';
        // this.experience.togglePointer(false);

        // MOUSE LEAVE
        if (this.currentIntersect) {
          if (this.currentIntersect === 'contactHitbox') {
            this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#ffffff');
            this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 0;
          } else if (this.gamenNamesArr.includes(this.currentIntersect)) {
            this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#ffffff');
            this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
              new THREE.Color('#000000');
            this.experience.world.chikei.chikeiModel.material.uniforms.uSurfaceColor.value =
              new THREE.Color('#ffffff');
            this.experience.world.particles.toggleSpeed = 1;
            this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 0;
            this.experience.world.textKeshiki.contact.visible = true;
            this.experience.world.textKeshiki.select.visible = true;
            this.experience.world.textKeshiki.about(false, '');
          } else if (this.currentIntersect === 'arrowHitboxProfil') {
            this.experience.world.textProfil.tweenTranslateLeftArrowProfil.start();
          } else if (this.currentIntersect === 'arrowHitboxKeiken') {
            this.experience.world.textKeiken.tweenTranslateLeftArrowKeiken.start();
          } else if (this.currentIntersect === 'arrowHitboxProject') {
            this.experience.world.textProject.tweenTranslateRightArrow.start();
          } else if (this.currentIntersect === 'arrowHitboxGakuLeft001') {
            this.experience.world.textGaku.tweenArrowLeftOrigin.start();
          } else if (this.currentIntersect === 'arrowHitboxGakuRight') {
            this.experience.world.textGaku.tweenArrowRightOrigin.start();
          } else if (this.currentIntersect === 'arrowHitboxKyoumiLeft') {
            this.experience.world.textKyoumi.tweenOriginArrowLeft.start();
          } else if (this.currentIntersect === 'arrowHitboxKyoumiRight') {
            this.experience.world.textKyoumi.tweenOriginArrowRight.start();
          } else if (this.currentIntersect === 'arrowHitboxGengoLeft') {
            this.experience.world.textGengo.tweenOriginArrowLeft.start();
          } else if (this.currentIntersect === 'arrowHitboxGengoRight') {
            this.experience.world.textGengo.tweenOriginArrowRight.start();
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
