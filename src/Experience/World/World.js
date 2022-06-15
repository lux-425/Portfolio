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
    var TWEEN = require('@tweenjs/tween.js');
    // console.log(TWEEN);

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
    this.polygonCircle.polygon.translateY(18);

    this.polygonCylinder = new Polygon('cylinder', 75, -75, 0.0001);

    this.polygonCube = new Polygon('cube', 0, 0, 0);

    /**
     * テスト!!!
     */
    this.debugParams = {};

    this.setText();

    this.setAnimation();

    this.leftPanels.gamenOne.material.fragmentShader =
      gamenFragmentShaderLecture;
  }

  async setText() {
    var TWEEN = require('@tweenjs/tween.js');

    this.text = new Text();
    await this.text.waitForLoad();
    // console.log(this.text);
    this.textModel = this.text.model;
    this.scene.add(this.textModel);

    this.textModel.children[0].children[0].material.color = new THREE.Color(
      0xffffff
    );
    this.textModel.children[0].children[0].material.emissive = new THREE.Color(
      0xffffff
    );

    this.textModel.translateX(-4);
    this.textModel.translateZ(0.001)
    // this.textModel.translateZ(5.001);

    console.log(this.textModel);

    //

    /**
     * PROFIL
     */
    this.textModel.children[0].children[0].translateZ(-0.21);
    this.textModel.children[0].children[1].translateZ(-0.32);
    this.textModel.children[0].children[2].translateZ(-0.43);
    this.textModel.children[0].children[3].translateZ(-0.54);
    this.textModel.children[0].children[4].translateZ(0.55);
    this.textModel.children[0].children[5].translateZ(0.55);

    for (var i = 0; i < 6; i++) {
      var tweenTranslate = new TWEEN.Tween(
        this.textModel.children[0].children[i].position
      )
        .to(
          {
            x: 0,
            y: 0.001,
            z: 0,
          },
          1000 + i * -100
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .onStart(() => {
          console.log('tween start');
        });

      var tweenInflate = new TWEEN.Tween(
        this.textModel.children[0].children[i].scale
      )
        .to(
          {
            x: 1.1,
            y: 1,
            z: 1.1,
          },
          100
        )
        .onComplete(() => {
          console.log('tween stop');
        });
      tweenTranslate.chain(tweenInflate);
      tweenTranslate.start();
    }

    /**
     * TITLE
     */

    this.textModel.children[1].material = new THREE.MeshBasicMaterial({
      color: 'white',
      transparent: true,
      opacity: 0,
      // wireframe: true,
    });
    var tweenAppear = new TWEEN.Tween(this.textModel.children[1].material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out)
      .onComplete(() => {
        // this.textModel.children[1].material.color = new THREE.Color("white");
      });
    tweenAppear.start();

    //
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
    this.centerPanels = new Panels('center');
    /**
     * 右
     */
    this.rightPanels = new Panels('right');
  }

  update() {}

  setAnimation() {
    var TWEEN = require('@tweenjs/tween.js');

    // const clock = new THREE.Clock();

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();

      TWEEN.update();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
