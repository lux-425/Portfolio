import * as THREE from 'three';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Floor from './Floor.js';
import Gamen from './Gamen.js';

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

    /**
     *
     *
     * 画面
     *
     *
     */
    // 物性
    const gamenWidth = 1;
    const gamenHeight = 2;
    const floorWidth = this.floor.geometry.parameters.width;
    const floorHeight = this.floor.geometry.parameters.height;

    /**
     *
     * 左
     *
     */
    /**
     * 左上隅
     */
    this.groupTopLeftCorner = new THREE.Group();

    this.gamenTopLeftOne = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth / 2,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI
    );
    this.gamenTopLeftTwo = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 1.5,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI
    );
    this.gamenTopLeftThree = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenTopLeftFour = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenTopLeftFive = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 2,
      floorHeight / 4 - gamenWidth * 3,
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

    /**
     * 左下隅
     */
    this.groupBottomLeftCorner = new THREE.Group();

    this.gamenBottomLeftOne = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50,
      floorHeight / 4 - gamenWidth,
      Math.PI * 0.5
    );
    this.gamenBottomLeftTwo = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50,
      floorHeight / 4,
      Math.PI * 0.5
    );
    this.gamenBottomLeftThree = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth / 2,
      floorHeight / 4 + gamenWidth / 2,
      Math.PI
    );

    this.groupBottomLeftCorner.add(
      this.gamenBottomLeftOne.mesh,
      this.gamenBottomLeftTwo.mesh,
      this.gamenBottomLeftThree.mesh
    );
    this.scene.add(this.groupBottomLeftCorner);

    /**
     * 中上
     */
    this.groupCenterTop = new THREE.Group();

    this.gamenCenterTopOne = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI * 0.5
    );
    this.gamengamenCenterTopTwo = new Gamen(
      -floorWidth / 2 +
        floorWidth / 5 -
        floorWidth / 50 +
        gamenWidth / 2 +
        gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2 - gamenWidth / 2,
      Math.PI
    );
    this.gamengamenCenterTopThree = new Gamen(
      -floorWidth / 2 +
        floorWidth / 5 -
        floorWidth / 50 +
        gamenWidth * 1.5 +
        gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2 - gamenWidth / 2,
      Math.PI
    );

    this.groupCenterTop.add(
      this.gamenCenterTopOne.mesh,
      this.gamengamenCenterTopTwo.mesh,
      this.gamengamenCenterTopThree.mesh
    );
    this.scene.add(this.groupCenterTop);

    /**
     * 中前
     */
    this.groupCenterFront = new THREE.Group();

    this.gamenCenterFrontOne = new Gamen(gamenWidth / 2, gamenWidth, 0);
    this.gamenCenterFrontTwo = new Gamen(gamenWidth * 1.5, gamenWidth, Math.PI);

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
      gamenWidth / 2,
      gamenWidth,
      Math.PI
    );
    this.gamenCenterFrontRotatedTwo = new Gamen(
      gamenWidth * 1.5,
      gamenWidth,
      Math.PI
    );

    this.groupCenterFrontRotated.add(
      this.gamenCenterFrontRotatedOne.mesh,
      this.gamenCenterFrontRotatedTwo.mesh
    );
    this.scene.add(this.groupCenterFrontRotated);

    // I am bad at maths.
    this.groupCenterFrontRotated.rotateY(-Math.PI * 0.25);
  }

  update() {
    return null;
  }
}
