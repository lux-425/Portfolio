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
    // TWEEN = require('@tweenjs/tween.js');
    // console.log(TWEEN);

    this.experience = new Experience();

    /**
     * Mouse
     */
    this.mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / this.experience.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.experience.sizes.height) * 2 + 1;
      // console.log(this.mouse);
    });

    /**
     * Raycaster
     */
    this.raycaster = new THREE.Raycaster();

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

    this.buttonRefreshGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    this.buttonRefreshMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
      name: 'buttonRefresh',
    });
    this.buttonRefresh = new THREE.Mesh(
      this.buttonRefreshGeometry,
      this.buttonRefreshMaterial
    );
    this.buttonRefresh.position.set(-4, 2.2, 0);
    this.buttonRefresh.name = 'buttonRefresh';
    this.scene.add(this.buttonRefresh);

    this.leftPanels.gamenOne.material.fragmentShader =
      gamenFragmentShaderLecture;

    //

    window.addEventListener('click', () => {
      if (this.currentIntersect) {
        // console.log(this.currentIntersect);
        switch (this.currentIntersect) {
          case 'buttonRefresh':
            this.animateText();
            break;
        }
      }
    });
  }

  async setText() {
    this.text = new Text();
    await this.text.waitForLoad();
    this.textModel = this.text.model.children[0];
    this.scene.add(this.textModel);

    // console.log(this.textModel);
    this.textModel.translateX(-4);

    this.animateText();

    //

    this.setAnimation();
  }

  animateText() {
    var TWEEN = require('@tweenjs/tween.js');

    /**
     * TITLE
     */
    this.titleProfil = this.textModel.children[1];

    this.titleProfil.children[0].material.emissive = new THREE.Color('white');
    this.titleProfil.children[0].material.emissiveIntensity = 5;

    this.titleProfil.children[0].translateZ(-0.25);
    this.titleProfil.children[1].translateZ(-0.35);
    this.titleProfil.children[2].translateZ(-0.45);
    this.titleProfil.children[3].translateZ(-0.55);
    this.titleProfil.children[4].translateZ(0.3);
    this.titleProfil.children[5].translateZ(0.3);
    for (var i = 0; i < 6; i++) {
      this.titleProfil.children[i].scale.set(1, 1, 1);
    }

    for (var i = 0; i < 6; i++) {
      var tweenTranslateTitleProfil = new TWEEN.Tween(
        this.titleProfil.children[i].position
      )
        .to(
          {
            x: 0,
            y: 0.001,
            z: 0,
          },
          1000 + i * -100
        )
        .easing(TWEEN.Easing.Cubic.Out);
      var tweenInflateTitleProfil = new TWEEN.Tween(
        this.titleProfil.children[i].scale
      ).to(
        {
          x: 1.1,
          y: 1.1,
          z: 1.1,
        },
        100
      );
      tweenTranslateTitleProfil.chain(tweenInflateTitleProfil);
      tweenTranslateTitleProfil.start();
    }

    /**
     * HEADERS
     */
    this.headersProfil = this.textModel.children[4];
    this.headersProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    var tweenAppearHeaders = new TWEEN.Tween(this.headersProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out);
    setTimeout(() => {
      tweenAppearHeaders.start();
    }, 200);

    /**
     * PARAGRAPHS
     */
    this.paragraphsProfil = this.textModel.children[5];
    this.paragraphsProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });
    var tweenAppearParagraphs = new TWEEN.Tween(this.paragraphsProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.Out);
    setTimeout(() => {
      tweenAppearParagraphs.start();
    }, 600);

    /**
     * ARROW
     */
    this.arrowProfil = this.textModel.children[3];
    this.arrowProfil.material = new THREE.MeshStandardMaterial({
      emissive: 'white',
      emissiveIntensity: 5,
      transparent: true,
      opacity: 0,
    });

    this.arrowHitboxProfil = this.textModel.children[2];
    this.arrowHitboxProfil.visible = false;

    this.arrowTextProfil = this.textModel.children[0];
    for (var i = 0; i < 5; i++) {
      this.arrowTextProfil.children[i].material =
        new THREE.MeshStandardMaterial({
          emissive: 'white',
          emissiveIntensity: 5,
          transparent: true,
          opacity: 0,
        });
    }

    // ARROW APPEARANCE
    var tweenAppearArrowProfil = new TWEEN.Tween(this.arrowProfil.material)
      .to({ opacity: 1 }, 1500)
      .easing(TWEEN.Easing.Bounce.In)
      .onComplete(() => {});
    setTimeout(() => {
      tweenAppearArrowProfil.start();
    }, 1000);

    // ARROW TEXT APPEARANCE
    this.tweenAppearTextProfil = () => {
      for (var i = 0; i < 5; i++) {
        var tweenAppearTextProfil = new TWEEN.Tween(
          this.arrowTextProfil.children[i].material
        )
          .to({ opacity: 1 }, 400 + i * 150)
          .easing(TWEEN.Easing.Exponential.In)
          .onStart(() => {});
        tweenAppearTextProfil.start();
      }
    };
    this.tweenDisappearTextProfil = () => {
      for (var i = 0; i < 5; i++) {
        var tweenDisappearTextProfil = new TWEEN.Tween(
          this.arrowTextProfil.children[i].material
        )
          .to({ opacity: 0 }, 500)
          .easing(TWEEN.Easing.Exponential.Out)
          .onStart(() => {});
        tweenDisappearTextProfil.start();
      }
    };

    // ARROW TRANSLATION
    this.tweenTranslateRightArrowProfil = new TWEEN.Tween(
      this.arrowProfil.position
    )
      .to({ x: -0.175 }, 500)
      .easing(TWEEN.Easing.Exponential.In)
      .onStart(() => {
        this.tweenAppearTextProfil();
      });
    this.tweenTranslateLeftArrowProfil = new TWEEN.Tween(
      this.arrowProfil.position
    )
      .to({ x: -0.4595 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.tweenDisappearTextProfil();
      });
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
    var TWEEN = require('@tweenjs/tween.js');

    // const clock = new THREE.Clock();

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();

      TWEEN.update();

      // Raycasting
      this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance);

      this.objectsToTest = [this.buttonRefresh, this.arrowHitboxProfil];
      this.intersects = this.raycaster.intersectObjects(this.objectsToTest);

      if (this.intersects.length) {
        // console.log(this.intersects);
        if (!this.currentIntersect) {
          // console.log('mouse enter');
          if (this.intersects[0].object.name === 'arrowHitboxProfil') {
            this.tweenTranslateRightArrowProfil.start();
          }
        }
        this.currentIntersect = this.intersects[0].object.name;
      } else {
        if (this.currentIntersect) {
          // console.log('mouse leave');
          if (this.currentIntersect === 'arrowHitboxProfil') {
            this.tweenTranslateLeftArrowProfil.start();
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
