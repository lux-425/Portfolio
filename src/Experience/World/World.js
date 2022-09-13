import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Chikei from './Chikei.js';
import Panels from './Panels.js';
import Keshiki from './Keshiki.js';
import Polygon from './Polygon.js';
import Particles from './Particles.js';

import Yubisashi from '../Yubisashi.js';

import Texts from './Texts/Texts.js';
import TextKeshiki from './Texts/TextKeshiki.js';
import TextProfil from './Texts/TextProfil.js';
import TextShoukai from './Texts/TextShoukai.js';
import TextKeiken from './Texts/TextKeiken.js';
import TextProjects from './Texts/TextProjects.js';
import TextGaku from './Texts/TextGaku.js';
import TextKyoumi from './Texts/TextKyoumi.js';
import TextGengo from './Texts/TextGengo.js';

import TravellingManager from '../TravellingManager.js';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // LOADERS
    this.loadingManager = this.experience.loadingManager;

    const progressBar = document.getElementById('progress-bar');
    const loadingAsset = document.getElementById('loading-asset');

    this.loadingManager.onProgress = function (url, loaded, total) {
      console.log(`Loading: ${url}`);

      loadingAsset.innerHTML = `[${url}]`;

      progressBar.value = (loaded / total) * 100;
    };

    // START's kamera travelling
    var TWEEN = require('@tweenjs/tween.js');
    this.tweenKameraHome = () => {
      const angle = Math.PI * 0.5;

      let boxMaxY = new THREE.Box3().setFromObject(
        this.experience.world.keshiki.mesh
      ).max.y;

      let distance = boxMaxY + 22;

      let positionKamera = {
        x:
          this.experience.world.keshiki.mesh.position.x +
          Math.cos(angle) * distance,
        y: this.experience.world.keshiki.mesh.position.y + 2,
        z:
          this.experience.world.keshiki.mesh.position.z +
          Math.sin(angle) * distance,
      };
      let positionTarget = {
        x: this.experience.world.keshiki.mesh.position.x,
        y: this.experience.world.keshiki.mesh.position.y - 1,
        z: this.experience.world.keshiki.mesh.position.z,
      };

      let moveKamera = new TWEEN.Tween(this.experience.camera.instance.position)
        .to(positionKamera, 2222)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
          this.experience.camera.controls.enabled = true;
        });
      let moveTarget = new TWEEN.Tween(this.experience.camera.controls.target)
        .to(positionTarget, 2222)
        .easing(TWEEN.Easing.Quadratic.InOut);

      this.experience.camera.controls.enabled = false;

      moveKamera.start();
      moveTarget.start();
    };

    const progressBarContainer = document.querySelector(
      '.progress-bar-container'
    );
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
      progressBarContainer.style.display = 'none';
      this.tweenKameraHome();
    });

    this.loadingManager.onLoad = function () {
      console.log(`Finished loading.`);

      loadingAsset.innerHTML = `READY`;

      startButton.style.visibility = 'visible';
    };

    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Local variables for managers' classes
    this.language = '';
    this.area = '';

    // Lights
    this.environment = new Environment();

    // Main front screen
    this.keshiki = new Keshiki();

    // Big and small particles
    this.particles = new Particles();

    // Debug
    // this.debugParams = {};
    // this.debug = this.experience.debug;
    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder('world');
    // }

    /**
     * Landscapes
     */
    this.chikei = new Chikei();

    /**
     * 画面
     */
    this.setPanels();

    /**
     * ポリゴン~~~~
     */
    this.setPolygons();

    /**
     * SET TEXTS AND YUBISASHI'S PENDING
     */
    this.objectsReadyArr = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    this.waitObjectsReady();

    // Initialize three languages' loaded models
    this.texts = new Texts();

    // Initialize text on main screen for user's selection
    this.textKeshiki = new TextKeshiki();
  }

  waitObjectsReady() {
    if (!this.objectsReadyArr.every(Boolean)) {
      setTimeout(() => {
        this.waitObjectsReady();
      }, 255);
    } else {
      this.yubisashiMono = [
        this.textKeshiki.contactHitbox,

        this.chikei.saru,

        this.leftPanels.gamenOne.mesh,
        this.centerPanels.gamenOne.mesh,
        this.centerPanels.gamenTwo.mesh,
        this.rightPanels.gamenOne.mesh,
        this.rightPanels.gamenTwo.mesh,

        this.polygonBall.mesh,
        this.polygonTorus.mesh,
        this.polygonGlobeTwo.mesh,
        this.polygonGem.mesh,

        this.textProfil.arrowHitboxProfil,
        this.textProfil.homeArrowHitbox,

        this.textShoukai.arrowHitbox,
        this.textShoukai.homeHitbox,

        this.textKeiken.arrowHitboxKeiken,
        this.textKeiken.arrowHomeHitbox,
        this.textKeiken.faureciaLogo,
        this.textKeiken.sterimedLogo,

        this.textProjects.arrowHitboxProject,
        this.textProjects.homeArrowHitbox,
        this.textProjects.navbarIchi,
        this.textProjects.navbarNi,
        this.textProjects.navbarSan,
        this.textProjects.navbarYon,
        this.textProjects.navbarGo,
        this.textProjects.navbarRoku,
        this.textProjects.navbarTsugi,
        this.textProjects.visitButtonHitbox,
        this.textProjects.githubLogoHitbox,

        this.textGaku.arrowHitboxGakuRight,
        this.textGaku.arrowHitboxGakuLeft,
        this.textGaku.arrowHomeHitboxGaku,
        this.textGaku.logoLeft,
        this.textGaku.logoRight,

        this.textKyoumi.arrowRightHitbox,
        this.textKyoumi.arrowLeftHitbox,
        this.textKyoumi.arrowHomeHitbox,

        this.textGengo.hitboxRight,
        this.textGengo.hitboxLeft,
        this.textGengo.hitboxHome,
        this.textGengo.hitboxHon,
        this.textGengo.hitboxSoftwares,
        this.textGengo.hitboxJLPT,
        this.textGengo.anki,
        this.textGengo.bunpro,
        this.textGengo.rtk,
        this.textGengo.jlptPhoto,
      ];

      this.travellingManager = new TravellingManager();

      this.experience.world.textKeshiki.nihongo.visible = false;
      this.experience.world.textKeshiki.francais.visible = false;
      this.experience.world.textKeshiki.english.visible = false;

      this.yubisashi = new Yubisashi(this.yubisashiMono);
    }
  }

  setPolygons() {
    this.polygonCone = new Polygon('cone', -13, -8, 0.0001);
    this.polygonCone.mesh.position.set(-12.5, 2.01, -11);

    this.polygonCircle = new Polygon('circle', 16, -11, -0.0003);
    this.polygonCircle.mesh.position.set(-12.5, 4.01, -11);

    this.polygonBall = new Polygon('ball', 0, 0, 0.001);

    this.polygonCylinder = new Polygon('cylinder', 16, -11, 0.0001);
    this.polygonCylinder.mesh.position.set(13, 2.51, -14);

    this.polygonTorus = new Polygon('torus', 0, 0, 0.0006);
    this.polygonTorus.mesh.position.set(13, 2.51, -14);

    this.polygonGem = new Polygon('gem', 0, 0, 0.0005);
    this.polygonGem.mesh.position.set(-8.5, 2.01, 14);

    this.polygonGlobeOne = new Polygon('globeOne', 0, 0, 0.0001);
    this.polygonGlobeOne.mesh.position.set(12, 5, 30);
    this.polygonGlobeTwo = new Polygon('globeTwo', 0, 0, 0.001);
    this.polygonGlobeTwo.mesh.position.set(0, 5, 0);

    this.polygonPyramidOne = new Polygon('pyramidOne', 0, 0, 0.0001);
    this.polygonPyramidOne.mesh.position.set(-4, 2.01, 14);
    this.polygonPyramidTwo = new Polygon('pyramidTwo', 0, 0, 0.0001);
    this.polygonPyramidTwo.mesh.position.set(-12, 1.26, 19);
    this.polygonPyramidTwo.mesh.rotateY(-Math.PI / 0.8);
    this.polygonPyramidThree = new Polygon('pyramidThree', 0, 0, 0.0001);
    this.polygonPyramidThree.mesh.position.set(-10, 0.505, 11);
    this.polygonPyramidThree.mesh.rotateY(Math.PI / 3);
  }

  setTexts() {
    this.textProfil = new TextProfil();
    this.textShoukai = new TextShoukai();

    this.textKeiken = new TextKeiken();
    this.textProjects = new TextProjects();

    this.textGaku = new TextGaku();
    this.textKyoumi = new TextKyoumi();
    this.textGengo = new TextGengo();
  }

  setPanels() {
    // Panels' Blender model
    this.gltfLoader.load('../../models/frame.glb', (gltf) => {
      this.model = gltf.scene;

      this.scene.add(this.model);

      this.model.translateX(-4);
    });

    /**
     * 左
     */
    this.leftPanels = new Panels('left');

    this.leftPanels.gamenOne.mesh.name = 'leftAreaGamen';
    /**
     * 中心
     */
    this.centerPanels = new Panels('center');

    this.centerPanels.gamenOne.mesh.name = 'centerAreaGamen';
    this.centerPanels.gamenTwo.mesh.name = 'centerAreaGamenBis';
    /**
     * 右
     */
    this.rightPanels = new Panels('right');

    this.rightPanels.gamenOne.mesh.name = 'rightAreaGamen';
    this.rightPanels.gamenTwo.mesh.name = 'rightAreaGamenBis';
  }
}
