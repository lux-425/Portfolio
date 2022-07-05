import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Floor from './Floor.js';
import Panels from './Panels.js';
import Keshiki from './Keshiki.js';
import Polygon from './Polygon.js';

import Yubisashi from '../Yubisashi.js';

import TextProfil from './Texts/TextProfil.js';
import TextShoukai from './Texts/TextShoukai.js';
import TextKeiken from './Texts/TextKeiken.js';
import TextProject from './Texts/TextProject.js';

import gamenFragmentShaderLecture from '../../Shaders/Gamen/fragment.glsl';

// import { gsap } from 'gsap';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // this.floor = new Floor();
    this.environment = new Environment();
    this.keshiki = new Keshiki();

    // Loaders
    this.gltfLoader = new GLTFLoader();
    // this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Debug
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('world');
    }

    /**
     *
     * 画面
     *
     */
    this.setPanels();

    /**
     * ポリゴン
     */
    this.polygonCone = new Polygon('cone', -13, -8, 0.0001);
    this.polygonCone.mesh.position.set(-10, 2.01, -11);

    this.polygonCircle = new Polygon('circle', 16, -11, -0.0005);
    this.polygonCircle.mesh.position.set(-10, 4.01, -11);

    this.polygonCylinder = new Polygon('cylinder', 16, -11, 0.0001);
    this.polygonCylinder.mesh.position.set(10, 2.51, -16);

    this.polygonCube = new Polygon('cube', 0, 0, 0);
    this.polygonCube.mesh.translateY(12.5);

    this.polygonGem = new Polygon('gem', 0, 0, 0.0005);
    this.polygonGem.mesh.position.set(-8.5, 2.01, 14);

    this.polygonGlobeOne = new Polygon('globeOne', 0, 0, 0.0001);
    this.polygonGlobeOne.mesh.position.set(7, 5, 16);
    this.polygonGlobeTwo = new Polygon('globeTwo', 0, 0, 0.001);
    this.polygonGlobeTwo.mesh.position.set(3, 5.5, 16);

    this.polygonPyramidOne = new Polygon('pyramidOne', 0, 0, 0.0001);
    this.polygonPyramidOne.mesh.position.set(-4, 2.01, 14);
    this.polygonPyramidTwo = new Polygon('pyramidTwo', 0, 0, 0.0001);
    this.polygonPyramidTwo.mesh.position.set(-12, 1.26, 19);
    this.polygonPyramidTwo.mesh.rotateY(-Math.PI / 0.8);
    this.polygonPyramidThree = new Polygon('pyramidThree', 0, 0, 0.0001);
    this.polygonPyramidThree.mesh.position.set(-10, 0.505, 11);
    this.polygonPyramidThree.mesh.rotateY(Math.PI / 3);

    this.ball = new Polygon('ball', 0, 0, 0.001);

    this.torus = new Polygon('torus', 0, 0, 0.0006);
    this.torus.mesh.position.set(10, 2.51, -16);

    /**
     * テスト!!!
     */
    this.debugParams = {};

    this.setTexts();

    // SHADER LECTURE
    // this.leftPanels.gamenOne.material.fragmentShader =
    //   gamenFragmentShaderLecture;
    // this.leftPanels.gamenTwo.material.fragmentShader =
    //   gamenFragmentShaderLecture;
    // this.leftPanels.gamenThree.material.fragmentShader =
    //   gamenFragmentShaderLecture;
    // this.centerPanels.gamenOne.material.fragmentShader =
    //   gamenFragmentShaderLecture;
    // this.centerPanels.gamenTwo.material.fragmentShader =
    // gamenFragmentShaderLecture;
    this.centerPanels.gamenThree.material.fragmentShader =
      gamenFragmentShaderLecture;
    this.centerPanels.gamenFour.material.fragmentShader =
      gamenFragmentShaderLecture;
  }

  setTexts() {
    // this.textProfil = new TextProfil();
    // this.textShoukai = new TextShoukai();
    // this.textKeiken = new TextKeiken();
    this.textProject = new TextProject();

    setTimeout(() => {
      this.yubisashiMono = [
        // this.textProfil.arrowHitboxProfil,
        // this.textProfil.buttonRefresh,
        // this.textKeiken.arrowHitboxKeiken,
        // this.textKeiken.buttonRefresh,
        this.textProject.arrowHitboxProject,
        this.textProject.buttonRefresh,
        this.textProject.navbarIchi,
        this.textProject.navbarNi,
        this.textProject.navbarSan,
        this.textProject.navbarYon,
        this.textProject.navbarGo,
        this.textProject.navbarRoku,
        this.textProject.navbarTsugi,
        this.textProject.visitButtonHitbox,
      ];
      this.yubisashi = new Yubisashi(this.yubisashiMono);
    }, 7000);
  }

  setPanels() {
    // Blender's model
    this.gltfLoader.load('../../models/frame.glb', (gltf) => {
      this.model = gltf.scene;
      // this.model.traverse((o) => {
      //   if (o.isMesh)
      //     o.material = new THREE.MeshPhysicalMaterial({
      //       side: THREE.DoubleSide,
      //       wireframe: true
      //     });
      // });
      // this.model.children[0].material.wireframe = true

      this.scene.add(this.model);

      this.model.translateX(-4);
      // this.model.translateZ(5);
    });
    /**
     * 左
     */
    this.leftPanels = new Panels('left');
    /**
     * 中心
     */
    this.centerPanels = new Panels('center');
    /**
     * 右
     */
    this.rightPanels = new Panels('right');
  }

  update() {}

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
