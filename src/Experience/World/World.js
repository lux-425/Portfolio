import * as THREE from 'three';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Floor from './Floor.js';
import Gamen from './Gamen.js';

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.floor = new Floor();
    this.environment = new Environment();

    this.debug = this.experience.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('world');
    }

    // 物性
    this.floorWidth = this.floor.geometry.parameters.width;
    this.floorHeight = this.floor.geometry.parameters.height;
    this.gamenWidth = 1;
    this.gamenHeight = 2;

    /**
     *
     * 画面
     *
     */
    // this.setTopLeftGamens();
    this.setBottomLeftGamens();
    // this.setCenterTopGamens();
    // this.setCenterFrontGamens();

    /**
     * テスト!!!
     */
    // MIRROR
    var geometry = new THREE.PlaneBufferGeometry(1, 2);
    var verticalMirror = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x889999,
    });
    verticalMirror.position.x =
      -this.floorWidth / 2 +
      this.floorWidth / 5 -
      this.floorWidth / 50 +
      this.gamenWidth / 2;
    verticalMirror.position.y = 1;
    verticalMirror.position.z =
      this.floorHeight / 4 + this.gamenWidth / 2 + 0.001;
    // verticalMirror.rotation.set(-Math.PI * 0.5, 0, 0);
    // verticalMirror.material.transparent = true;
    // this.scene.add(verticalMirror);

    // RECT AREA LIGHT
    this.rectAreaLight = new THREE.RectAreaLight('orange', 0.01, 0.01, 0.01);
    this.rectAreaLight.position.set(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth / 2 -
        0.5,
      1,
      this.floorHeight / 4 + this.gamenWidth / 2 + 0.002
    );
    this.rectAreaLight.rotation.set(0, -Math.PI * 0.5, 0);

    this.rectAreaLight.height = 2;

    // this.rectAreaLight.intensity = 2;
    this.rectAreaLight.power = 13;

    // Looks at the center of the scene
    // this.rectAreaLight.lookAt(new THREE.Vector3());

    this.scene.add(this.rectAreaLight);
    this.rectAreaLightHelper = new RectAreaLightHelper(this.rectAreaLight);
    // this.scene.add(this.rectAreaLightHelper);

    // SECOND RECT AREA LIGHT
    this.rectAreaLight2 = new THREE.RectAreaLight('green', 0.01, 0.01, 0.01);
    this.rectAreaLight2.position.set(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth / 2 -
        0.5,
      1,
      this.floorHeight / 4 + this.gamenWidth / 2 + 0.002
    );
    this.rectAreaLight2.rotation.set(0, -Math.PI * 1.5, 0);

    this.rectAreaLight2.height = 2;

    // this.rectAreaLight2.intensity = 2;
    this.rectAreaLight2.power = 13;

    this.rectAreaLight2.translateZ(1);

    // Looks at the center of the scene
    // this.rectAreaLight.lookAt(new THREE.Vector3());

    this.scene.add(this.rectAreaLight2);
    this.rectAreaLightHelper2 = new RectAreaLightHelper(this.rectAreaLight2);
    // this.scene.add(this.rectAreaLightHelper2);

    /**
     * Debug
     */
    if (this.debug.active) {
      // RECT AREA LIGHT
      this.debugFolder
        .add(this.rectAreaLight.position, 'x')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('rectAreaLightX');
      this.debugFolder
        .add(this.rectAreaLight.position, 'z')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('rectAreaLightZ');
      this.debugFolder
        .add(this.rectAreaLight.rotation, 'y')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('rectAreaLightRotationY');
      this.debugFolder
        .add(this.rectAreaLight, 'power')
        .min(0)
        .max(300)
        .step(1)
        .name('rectAreaLightPower');
      this.debugFolder
        .add(this.rectAreaLight2, 'power')
        .min(0)
        .max(900)
        .step(1)
        .name('rectAreaLight2Power');
    }
  }

  /**
   * 左上隅
   */
  setTopLeftGamens() {
    this.groupTopLeftCorner = new THREE.Group();

    this.gamenTopLeftOne = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth / 2,
      this.floorHeight / 4 - this.gamenWidth * 3 - this.gamenWidth / 2,
      Math.PI
    );
    this.gamenTopLeftTwo = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth * 1.5,
      this.floorHeight / 4 - this.gamenWidth * 3 - this.gamenWidth / 2,
      Math.PI
    );
    this.gamenTopLeftThree = new Gamen(
      -this.floorWidth / 2 + this.floorWidth / 5 - this.floorWidth / 50,
      this.floorHeight / 4 - this.gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenTopLeftFour = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth,
      this.floorHeight / 4 - this.gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenTopLeftFive = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth * 2,
      this.floorHeight / 4 - this.gamenWidth * 3,
      Math.PI * 0.5
    );

    this.groupTopLeftCorner.add(
      this.gamenTopLeftOne.mesh,
      this.gamenTopLeftTwo.mesh,
      this.gamenTopLeftThree.mesh,
      this.gamenTopLeftFour.mesh,
      this.gamenTopLeftFive.mesh
    );
    this.scene.add(this.groupTopLeftCorner);
  }

  /**
   * 左下隅
   */
  setBottomLeftGamens() {
    this.groupBottomLeftCorner = new THREE.Group();

    this.gamenBottomLeftOne = new Gamen(
      -this.floorWidth / 2 + this.floorWidth / 5 - this.floorWidth / 50,
      this.floorHeight / 4 - this.gamenWidth,
      Math.PI * 0.5
    );
    this.gamenBottomLeftTwo = new Gamen(
      -this.floorWidth / 2 + this.floorWidth / 5 - this.floorWidth / 50,
      this.floorHeight / 4,
      Math.PI * 0.5
    );
    this.gamenBottomLeftThree = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth / 2,
      this.floorHeight / 4 + this.gamenWidth / 2,
      Math.PI
    );

    this.groupBottomLeftCorner.add(
      // this.gamenBottomLeftOne.mesh,
      // this.gamenBottomLeftTwo.mesh,
      this.gamenBottomLeftThree.mesh
    );
    this.scene.add(this.groupBottomLeftCorner);
  }

  /**
   * 中上
   */
  setCenterTopGamens() {
    this.groupCenterTop = new THREE.Group();

    this.gamenCenterTopOne = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth * 3,
      this.floorHeight / 4 - this.gamenWidth * 3 - this.gamenWidth / 2,
      Math.PI * 0.5
    );
    this.gamengamenCenterTopTwo = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth / 2 +
        this.gamenWidth * 3,
      this.floorHeight / 4 -
        this.gamenWidth * 3 -
        this.gamenWidth / 2 -
        this.gamenWidth / 2,
      Math.PI
    );
    this.gamengamenCenterTopThree = new Gamen(
      -this.floorWidth / 2 +
        this.floorWidth / 5 -
        this.floorWidth / 50 +
        this.gamenWidth * 1.5 +
        this.gamenWidth * 3,
      this.floorHeight / 4 -
        this.gamenWidth * 3 -
        this.gamenWidth / 2 -
        this.gamenWidth / 2,
      Math.PI
    );

    this.groupCenterTop.add(
      this.gamenCenterTopOne.mesh,
      this.gamengamenCenterTopTwo.mesh,
      this.gamengamenCenterTopThree.mesh
    );
    this.scene.add(this.groupCenterTop);
  }

  /**
   * 中前
   */
  setCenterFrontGamens() {
    this.groupCenterFront = new THREE.Group();

    this.gamenCenterFrontOne = new Gamen(
      this.gamenWidth / 2,
      this.gamenWidth,
      0
    );
    this.gamenCenterFrontTwo = new Gamen(
      this.gamenWidth * 1.5,
      this.gamenWidth,
      Math.PI
    );

    this.groupCenterFront.add(
      this.gamenCenterFrontOne.mesh,
      this.gamenCenterFrontTwo.mesh
    );
    this.scene.add(this.groupCenterFront);

    // I am bad at maths.
    this.groupCenterFront.position.set(-0.707, 0, -0.293);

    //

    this.groupCenterFrontRotated = new THREE.Group();

    this.gamenCenterFrontRotatedOne = new Gamen(
      this.gamenWidth / 2,
      this.gamenWidth,
      Math.PI
    );
    this.gamenCenterFrontRotatedTwo = new Gamen(
      this.gamenWidth * 1.5,
      this.gamenWidth,
      Math.PI
    );

    this.groupCenterFrontRotated.add(
      this.gamenCenterFrontRotatedOne.mesh,
      this.gamenCenterFrontRotatedTwo.mesh
    );
    this.scene.add(this.groupCenterFrontRotated);

    this.groupCenterFrontRotated.rotateY(-Math.PI * 0.25);
  }

  update() {
    return null;
  }
}
