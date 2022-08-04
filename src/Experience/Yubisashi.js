import * as THREE from 'three';

import Experience from './Experience.js';

export default class Yubisashi {
  constructor(yubisashiMono) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    var color = 0;

    /**
     * 指差し物
     */
    this.yubisashiMono = yubisashiMono;

    console.log(yubisashiMono);

    this.gamenNamesArr = [
      'leftAreaGamen',
      'centerAreaGamen',
      'centerAreaGamenBis',
      'rightAreaGamen',
      'rightAreaGamenBis',
    ];
    this.homeHitboxNamesArr = [
      'zarrowHomeHitboxProfil',
      'hitboxHome',
      'yarrowHomeHitbox',
      'yhomeArrowHitbox',
      'arrowHomeHitboxGaku001',
      'arrowHitboxKyoumiHome',
      'arrowHitboxGengoHome',
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
      var index = null;

      if (this.currentIntersect) {
        switch (this.experience.world.area) {
          /**
           * HOME
           */
          case 'home':
            switch (this.currentIntersect) {
              case 'contactHitbox':
                window.open('https://linktr.ee/garcialuc');
                break;
              case 'leftAreaGamen':
                index = this.yubisashiMono.indexOf(
                  this.experience.world.leftPanels.gamenOne.mesh
                );
                this.yubisashiMono.splice(index, 1);

                this.experience.world.chikei.debugObject.surfaceColor =
                  '#0000ff';
                this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
                  new THREE.Color('#b56cfe');
                this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
                  new THREE.Color('#0000d1');

                this.kameraTravelling('home', 'profil');
                break;
              case 'centerAreaGamen':
              case 'centerAreaGamenBis':
                index = this.yubisashiMono.indexOf(
                  this.experience.world.centerPanels.gamenOne.mesh
                );
                this.yubisashiMono.splice(index, 1);
                index = this.yubisashiMono.indexOf(
                  this.experience.world.centerPanels.gamenTwo.mesh
                );
                this.yubisashiMono.splice(index, 1);

                this.experience.world.chikei.debugObject.surfaceColor =
                  '#ff0000';

                this.kameraTravelling('home', 'keiken');
                break;
              case 'rightAreaGamen':
              case 'rightAreaGamenBis':
                index = this.yubisashiMono.indexOf(
                  this.experience.world.rightPanels.gamenOne.mesh
                );
                this.yubisashiMono.splice(index, 1);
                index = this.yubisashiMono.indexOf(
                  this.experience.world.rightPanels.gamenTwo.mesh
                );
                this.yubisashiMono.splice(index, 1);

                this.experience.world.chikei.debugObject.surfaceColor =
                  '#00ff00';

                this.kameraTravelling('home', 'gaku');
                break;
            }
            break;
          /**
           * PROFIL
           */
          case 'profil':
            switch (this.currentIntersect) {
              case 'arrowHitboxProfil':
                this.kameraTravelling('profil', 'shoukai');
                break;
              case 'zarrowHomeHitboxProfil':
                this.kameraTravelling('profil', 'home');
                break;
            }
            break;
          /**
           * SHOUKAI
           */
          case 'shoukai':
            switch (this.currentIntersect) {
              case 'arrowHitboxShoukai':
                this.kameraTravelling('shoukai', 'profil');
                break;
              case 'hitboxHome':
                this.kameraTravelling('shoukai', 'home');
                break;
            }
            break;
          /**
           * KEIKEN
           */
          case 'keiken':
            switch (this.currentIntersect) {
              case 'arrowHitboxKeiken':
                this.kameraTravelling('keiken', 'projects');
                break;
              case 'yarrowHomeHitbox':
                this.kameraTravelling('keiken', 'home');
                break;
              case 'faurecia':
                window.open('https://www.faurecia.com/en');
                break;
              case 'sterimed':
                window.open('https://www.sterimed.fr/');
                break;
            }
            break;
          /**
           * PROJECTS
           */
          case 'projects':
            switch (this.currentIntersect) {
              case 'arrowHitboxProject':
                this.kameraTravelling('projects', 'keiken');
                break;
              case 'yhomeArrowHitbox':
                this.kameraTravelling('projects', 'home');
                break;
              case 'navbarIchi':
                this.experience.world.textProjects.navigateIchi();
                break;
              case 'navbarNi':
                this.experience.world.textProjects.navigateNi();
                break;
              case 'navbarSan':
                this.experience.world.textProjects.navigateSan();
                break;
              case 'navbarYon':
                this.experience.world.textProjects.navigateYon();
                break;
              case 'navbarGo':
                this.experience.world.textProjects.navigateGo();
                break;
              case 'navbarRoku':
                this.experience.world.textProjects.navigateRoku();
                break;
              case 'navbarTsugi':
                this.experience.world.textProjects.navigateNana();
                break;
              case 'zgithubHitbox':
                switch (this.experience.world.textProjects.actualTab) {
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
                }
                break;
              case 'visitHitbox':
                switch (this.experience.world.textProjects.actualTab) {
                  case 'ichi':
                    console.log('open ichi');
                    // window.open('');
                    break;
                  case 'ni':
                    console.log('open ni');
                    // window.open('');
                    break;
                  case 'san':
                    console.log('open san');
                    // window.open('');
                    break;
                }
                break;
            }
            break;
          /**
           * GAKU
           */
          case 'gaku':
            switch (this.currentIntersect) {
              case 'arrowHitboxGakuRight':
                this.kameraTravelling('gaku', 'kyoumi');
                break;
              case 'arrowHitboxGakuLeft001':
                this.kameraTravelling('gaku', 'gengo');
                break;
              case 'arrowHomeHitboxGaku001':
                this.kameraTravelling('gaku', 'home');
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
            }
            break;
          /**
           * KYOUMI
           */
          case 'kyoumi':
            switch (this.currentIntersect) {
              case 'arrowHitboxKyoumiRight':
                this.kameraTravelling('kyoumi', 'gengo');
                break;
              case 'arrowHitboxKyoumiLeft':
                this.kameraTravelling('kyoumi', 'gaku');
                break;
              case 'arrowHitboxKyoumiHome':
                this.kameraTravelling('kyoumi', 'home');
                break;
            }
            break;
          /**
           * GENGO
           */
          case 'gengo':
            switch (this.currentIntersect) {
              case 'arrowHitboxGengoRight':
                this.kameraTravelling('gengo', 'gaku');
                break;
              case 'arrowHitboxGengoLeft':
                this.kameraTravelling('gengo', 'kyoumi');
                break;
              case 'arrowHitboxGengoHome':
                this.kameraTravelling('gengo', 'home');
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
              case 'rtk':
                if (this.experience.world.textGengo.actualTab === 'hon') {
                  window.open(
                    'https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi'
                  );
                }
                break;
              case 'anki':
                if (this.experience.world.textGengo.actualTab === 'softwares') {
                  window.open('https://apps.ankiweb.net/');
                }
                break;
              case 'bunpro':
                if (this.experience.world.textGengo.actualTab === 'softwares') {
                  window.open('https://bunpro.jp/');
                }
                break;
              case 'jlpt':
                if (this.experience.world.textGengo.actualTab === 'jlpt') {
                  window.open('https://www.jlpt.jp/e/about/levelsummary.html');
                }
                break;
            }
            break;
        }
        switch (this.currentIntersect) {
          case 'ball':
            color = new THREE.Color(
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            );
            this.experience.world.polygonBall.mesh.material.color = color;
            this.experience.world.chikei.debugObject.surfaceColor = color;
            break;
          case 'torus':
            color = new THREE.Color(
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            );
            this.experience.world.polygonTorus.mesh.material.color = color;
            this.experience.world.chikei.debugObject.surfaceColor = color;
            break;
          case 'globeTwo':
            color = new THREE.Color(
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            );
            this.experience.world.polygonGlobeTwo.mesh.material.color = color;
            this.experience.world.chikei.debugObject.surfaceColor = color;
            break;
          case 'gem':
            color = new THREE.Color(
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            );
            this.experience.world.polygonGem.mesh.material.color = color;
            this.experience.world.chikei.debugObject.surfaceColor = color;
            break;
          case 'saru':
            color = new THREE.Color(
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            );
            this.experience.renderer.instance.setClearColor(
              new THREE.Color(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              )
            );
            this.experience.world.chikei.debugObject.surfaceColor = color;
            break;
        }
      }
    });

    this.setRaycasting();
  }

  // KAMERA OUT
  kameraTravelling(origine, destination) {
    this.experience.world.area = null;

    this.experience.world.travellingManager.travellingAlready = true;
    this.experience.world.travellingManager.toggledAlready = false;
    this.experience.world.travellingManager.toggledAlreadyBis = false;
    this.experience.world.travellingManager.toggledAlreadyTer = false;

    switch (origine) {
      case 'home':
        this.experience.world.travellingManager.transitionHome(false);
        break;
      case 'profil':
        this.experience.world.travellingManager.transitionProfil(false);
        break;
      case 'shoukai':
        this.experience.world.travellingManager.transitionShoukai(false);
        break;
      case 'keiken':
        this.experience.world.travellingManager.transitionKeiken(false);
        break;
      case 'projects':
        if (destination === 'keiken') {
          this.experience.world.travellingManager.fixPath = true;
        } else if (destination === 'home') {
          this.experience.world.travellingManager.fixPath = true;
        }
        this.experience.world.travellingManager.transitionProjects(false);
        break;
      case 'gaku':
        this.experience.world.travellingManager.transitionGaku(false);
        break;
      case 'kyoumi':
        if (destination === 'gengo') {
          this.experience.world.travellingManager.fixPath = true;
        }
        this.experience.world.travellingManager.transitionKyoumi(false);
        break;
      case 'gengo':
        if (destination === 'kyoumi' || destination === 'gaku') {
          this.experience.world.travellingManager.fixPath = true;
        }
        this.experience.world.travellingManager.transitionGengo(false);
        break;
    }

    this.waitTravellingEnds(origine, destination);
  }

  // KAMERA IN
  waitTravellingEnds(origine, destination) {
    if (this.experience.world.travellingManager.travellingAlready) {
      setTimeout(() => {
        this.waitTravellingEnds(origine, destination);
      }, 100);
    } else {
      this.experience.world.travellingManager.toggledAlready = false;
      this.experience.world.travellingManager.toggledAlreadyBis = false;
      this.experience.world.travellingManager.toggledAlreadyTer = false;

      switch (destination) {
        case 'home':
          switch (origine) {
            case 'profil':
            case 'shoukai':
              this.yubisashiMono.push(
                this.experience.world.leftPanels.gamenOne.mesh
              );
              this.experience.world.textKeshiki.about(false, 'one');
              break;
            case 'keiken':
            case 'projects':
              this.yubisashiMono.push(
                this.experience.world.centerPanels.gamenOne.mesh,
                this.experience.world.centerPanels.gamenTwo.mesh
              );
              this.experience.world.textKeshiki.about(false, 'two');
              break;
            case 'gaku':
            case 'kyoumi':
            case 'gengo':
              this.yubisashiMono.push(
                this.experience.world.rightPanels.gamenOne.mesh,
                this.experience.world.rightPanels.gamenTwo.mesh
              );
              this.experience.world.textKeshiki.about(false, 'three');
              break;
          }

          this.experience.world.travellingManager.transitionHome(true);
          break;
        case 'profil':
          this.experience.world.travellingManager.transitionProfil(true);
          break;
        case 'shoukai':
          this.experience.world.travellingManager.transitionShoukai(true);
          break;
        case 'keiken':
          this.experience.world.travellingManager.transitionKeiken(true);
          break;
        case 'projects':
          this.experience.world.travellingManager.transitionProjects(true);
          break;
        case 'gaku':
          this.experience.world.travellingManager.transitionGaku(true);
          break;
        case 'kyoumi':
          this.experience.world.travellingManager.transitionKyoumi(true);
          break;
        case 'gengo':
          this.experience.world.travellingManager.transitionGengo(true);
          break;
      }
    }
  }

  toggleGamenKeshiki() {
    this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 1;
    this.experience.world.textKeshiki.contact.visible = false;
    this.experience.world.textKeshiki.select.visible = false;
    this.experience.world.particles.toggleSpeed = 10;
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

      /**
       *
       * MOUSE ENTER
       *
       */
      if (this.intersects.length) {
        document.body.style.cursor = 'pointer';

        if (!this.currentIntersect) {
          switch (this.experience.world.area) {
            /**
             * HOME
             */
            case 'home':
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
                this.experience.world.chikei.debugObject.surfaceColor =
                  '#0000ff';
                this.toggleGamenKeshiki();
                this.experience.world.textKeshiki.about(true, 'one');
                this.experience.world.particles.switchParticleTexture('left');
              } else if (
                this.intersects[0].object.name === 'centerAreaGamen' ||
                this.intersects[0].object.name === 'centerAreaGamenBis'
              ) {
                this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
                  new THREE.Color('#00ccff');
                this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
                  new THREE.Color('#6b00b3');
                this.experience.world.chikei.debugObject.surfaceColor =
                  '#ff0000';
                this.toggleGamenKeshiki();
                this.experience.world.textKeshiki.about(true, 'two');
                this.experience.world.particles.switchParticleTexture('center');
              } else if (
                this.intersects[0].object.name === 'rightAreaGamen' ||
                this.intersects[0].object.name === 'rightAreaGamenBis'
              ) {
                this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
                  new THREE.Color('#ff00ae');
                this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
                  new THREE.Color('#4e447e');
                this.experience.world.chikei.debugObject.surfaceColor =
                  '#00ff00';
                this.toggleGamenKeshiki();
                this.experience.world.textKeshiki.about(true, 'three');
                this.experience.world.particles.switchParticleTexture('right');
              }
              break;
            /**
             * PROFIL
             */
            case 'profil':
              if (this.intersects[0].object.name === 'arrowHitboxProfil') {
                this.experience.world.textProfil.tweenTranslateRightArrowProfil.start();
              }
              break;
            /**
             * SHOUKAI
             */
            case 'shoukai':
              if (this.intersects[0].object.name === 'arrowHitboxShoukai') {
                this.experience.world.textShoukai.tweenArrowToggle.start();
              }
              break;
            /**
             * KEIKEN
             */
            case 'keiken':
              if (this.intersects[0].object.name === 'arrowHitboxKeiken') {
                this.experience.world.textKeiken.tweenTranslateRightArrowKeiken.start();
              }
              break;
            /**
             * PROJECTS
             */
            case 'projects':
              if (this.intersects[0].object.name === 'arrowHitboxProject') {
                this.experience.world.textProjects.tweenTranslateLeftArrow.start();
              }
              break;
            /**
             * GAKU
             */
            case 'gaku':
              if (this.intersects[0].object.name === 'arrowHitboxGakuLeft001') {
                this.experience.world.textGaku.tweenArrowLeftToggle.start();
              } else if (
                this.intersects[0].object.name === 'arrowHitboxGakuRight'
              ) {
                this.experience.world.textGaku.tweenArrowRightToggle.start();
              }
              break;
            /**
             * KYOUMI
             */
            case 'kyoumi':
              if (this.intersects[0].object.name === 'arrowHitboxKyoumiLeft') {
                this.experience.world.textKyoumi.tweenToggleArrowLeft.start();
              } else if (
                this.intersects[0].object.name === 'arrowHitboxKyoumiRight'
              ) {
                this.experience.world.textKyoumi.tweenToggleArrowRight.start();
              }
              break;
            /**
             * GENGO
             */
            case 'gengo':
              if (this.intersects[0].object.name === 'arrowHitboxGengoLeft') {
                this.experience.world.textGengo.tweenToggleArrowLeft.start();
              } else if (
                this.intersects[0].object.name === 'arrowHitboxGengoRight'
              ) {
                this.experience.world.textGengo.tweenToggleArrowRight.start();
              }
              break;
          }
        }

        this.currentIntersect = this.intersects[0].object.name;
      } else {
        /**
         *
         * MOUSE LEAVE
         *
         */
        document.body.style.cursor = 'default';
        // document.body.style.cursor = 'crosshair';

        if (this.currentIntersect) {
          switch (this.experience.world.area) {
            /**
             * HOME
             */
            case 'home':
              if (this.currentIntersect === 'contactHitbox') {
                this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
                  new THREE.Color('#ffffff');
                this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 0;
              } else if (this.gamenNamesArr.includes(this.currentIntersect)) {
                this.experience.world.keshiki.mesh.material.uniforms.uSurfaceColor.value =
                  new THREE.Color('#ffffff');
                this.experience.world.keshiki.mesh.material.uniforms.uDepthColor.value =
                  new THREE.Color('#000000');
                this.experience.world.chikei.debugObject.surfaceColor =
                  '#ffffff';
                this.experience.world.particles.toggleSpeed = 1;
                this.experience.world.keshiki.mesh.material.uniforms.uColorOffset.value = 0;
                this.experience.world.textKeshiki.contact.visible = true;
                this.experience.world.textKeshiki.select.visible = true;
                this.experience.world.textKeshiki.about(false, '');
              }
              break;
            /**
             * PROFIL
             */
            case 'profil':
              if (this.currentIntersect === 'arrowHitboxProfil') {
                this.experience.world.textProfil.tweenTranslateLeftArrowProfil.start();
              }
              break;
            /**
             * SHOUKAI
             */
            case 'shoukai':
              if (this.currentIntersect === 'arrowHitboxShoukai') {
                this.experience.world.textShoukai.tweenArrowOrigin.start();
              }
              break;
            /**
             * KEIKEN
             */
            case 'keiken':
              if (this.currentIntersect === 'arrowHitboxKeiken') {
                this.experience.world.textKeiken.tweenTranslateLeftArrowKeiken.start();
              }
              break;
            /**
             * PROJECTS
             */
            case 'projects':
              if (this.currentIntersect === 'arrowHitboxProject') {
                this.experience.world.textProjects.tweenTranslateRightArrow.start();
              }
              break;
            /**
             * GAKU
             */
            case 'gaku':
              if (this.currentIntersect === 'arrowHitboxGakuLeft001') {
                this.experience.world.textGaku.tweenArrowLeftOrigin.start();
              } else if (this.currentIntersect === 'arrowHitboxGakuRight') {
                this.experience.world.textGaku.tweenArrowRightOrigin.start();
              }
              break;
            /**
             * KYOUMI
             */
            case 'kyoumi':
              if (this.currentIntersect === 'arrowHitboxKyoumiLeft') {
                this.experience.world.textKyoumi.tweenOriginArrowLeft.start();
              } else if (this.currentIntersect === 'arrowHitboxKyoumiRight') {
                this.experience.world.textKyoumi.tweenOriginArrowRight.start();
              }
              break;
            /**
             * GENGO
             */
            case 'gengo':
              if (this.currentIntersect === 'arrowHitboxGengoLeft') {
                this.experience.world.textGengo.tweenOriginArrowLeft.start();
              } else if (this.currentIntersect === 'arrowHitboxGengoRight') {
                this.experience.world.textGengo.tweenOriginArrowRight.start();
              }
              break;
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
