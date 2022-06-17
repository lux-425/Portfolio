import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Floor from './Floor.js';
import Panels from './Panels.js';
import Keshiki from './Keshiki.js';
import Polygon from './Polygon.js';
import Text from './Text.js';

import gamenFragmentShaderLecture from '../../Shaders/Gamen/fragment.glsl';

// import { gsap } from 'gsap';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.floor = new Floor();
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
    this.polygonCone = new Polygon('cone', -70, -70, 0.0001);

    this.polygonCircle = new Polygon('circle', -70, -70, -0.0005);
    this.polygonCircle.mesh.translateY(18);

    this.polygonCylinder = new Polygon('cylinder', 75, -75, 0.0001);

    this.polygonCube = new Polygon('cube', 0, 0, 0);

    /**
     * テスト!!!
     */
    this.debugParams = {};

    this.setText('000');

    // SHADER LECTURE
    this.leftPanels.gamenOne.material.fragmentShader =
      gamenFragmentShaderLecture;
    this.leftPanels.gamenTwo.material.fragmentShader =
      gamenFragmentShaderLecture;
    this.leftPanels.gamenThree.material.fragmentShader =
      gamenFragmentShaderLecture;
  }

  setText(panel) {
    this.panelText = new Text(panel);

    // setTimeout(() => {
    //   this.scene.add(this.panelText.text.textModel);
    // }, 3000);
    // setTimeout(() => {
    //   this.scene.remove(this.panelText.text.textModel);
    // }, 6000);
  }

  setPanels() {
    // Blender's model
    this.gltfLoader.load('../../models/frame.glb', (gltf) => {
      this.model = gltf.scene;
      // this.model.traverse((o) => {
      //   if (o.isMesh)
      //     o.material = new THREE.MeshPhysicalMaterial({
      //       // side: THREE.DoubleSide,
      //       // wireframe: true
      //     });
      // });

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
    // this.centerPanels = new Panels('center');
    /**
     * 右
     */
    // this.rightPanels = new Panels('right');
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
