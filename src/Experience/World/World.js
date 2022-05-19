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
     * 右上隅
     */
    this.groupTopRightCorner = new THREE.Group();

    this.gamenTopRightOne = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth / 2,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI
    );
    this.gamenTopRightTwo = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 1.5,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI
    );
    this.gamenTopRightThree = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenTopRightFour = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenTopRightFive = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 2,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );

    this.groupTopRightCorner.add(
      this.gamenTopRightOne.mesh,
      this.gamenTopRightTwo.mesh,
      this.gamenTopRightThree.mesh,
      this.gamenTopRightFour.mesh,
      this.gamenTopRightFive.mesh
    );
    this.scene.add(this.groupTopRightCorner);
    this.groupTopRightCorner.rotation.set(0, -Math.PI * 0.5, 0);
    this.groupTopRightCorner.position.set(gamenWidth * 3, 0, 0);

    /**
     * 右下隅
     */
    this.groupBottomRightCorner = new THREE.Group();

    this.gamenBottomRightOne = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth / 2,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI
    );
    this.gamenBottomRightTwo = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 1.5,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2,
      Math.PI
    );
    this.gamenBottomRightThree = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenBottomRightFour = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );
    this.gamenBottomRightFive = new Gamen(
      -floorWidth / 2 + floorWidth / 5 - floorWidth / 50 + gamenWidth * 2,
      floorHeight / 4 - gamenWidth * 3,
      Math.PI * 0.5
    );

    this.groupBottomRightCorner.add(
      this.gamenBottomRightOne.mesh,
      this.gamenBottomRightTwo.mesh,
      this.gamenBottomRightThree.mesh,
      this.gamenBottomRightFour.mesh,
      this.gamenBottomRightFive.mesh
    );
    this.scene.add(this.groupBottomRightCorner);
    this.groupBottomRightCorner.rotation.set(0, -Math.PI * 1, 0);
    this.groupBottomRightCorner.position.set(gamenWidth * 0.5, 0, 0);

    /**
     * 中前
     */
    this.groupCenterFront = new THREE.Group();

    this.gamenCenterFrontOne = new Gamen(
      -floorWidth / 2 +
        floorWidth / 5 -
        floorWidth / 50 +
        gamenWidth / 2 +
        gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2 - gamenWidth / 2,
      Math.PI
    );
    this.gamenCenterFrontTwo = new Gamen(
      -floorWidth / 2 +
        floorWidth / 5 -
        floorWidth / 50 +
        gamenWidth * 1.5 +
        gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2 - gamenWidth / 2,
      Math.PI
    );
    this.groupCenterFront.add(
      this.gamenCenterFrontOne.mesh,
      this.gamenCenterFrontTwo.mesh
    );
    this.scene.add(this.groupCenterFront);
    this.groupCenterFront.position.set(-gamenWidth, 0, gamenWidth * 3);
    //
    this.groupCenterFrontRotated = new THREE.Group();

    this.gamenCenterFrontThree = new Gamen(
      -floorWidth / 2 +
        floorWidth / 5 -
        floorWidth / 50 +
        gamenWidth * 1.5 +
        gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2 - gamenWidth / 2,
      Math.PI
    );
    this.gamenCenterFrontThree.mesh.translateX(gamenWidth * 2);
    this.gamenCenterFrontThree.mesh.translateZ(-gamenWidth * 3);

    this.gamenCenterFrontFour = new Gamen(
      -floorWidth / 2 +
        floorWidth / 5 -
        floorWidth / 50 +
        gamenWidth * 1.5 +
        gamenWidth * 3,
      floorHeight / 4 - gamenWidth * 3 - gamenWidth / 2 - gamenWidth / 2,
      Math.PI
    );
    this.gamenCenterFrontFour.mesh.translateX(gamenWidth);
    this.gamenCenterFrontFour.mesh.translateZ(-gamenWidth * 3);

    this.groupCenterFrontRotated.add(
      this.gamenCenterFrontThree.mesh,
      this.gamenCenterFrontFour.mesh
    );
    this.groupCenterFrontRotated.rotateY(5.6);
    this.groupCenterFrontRotated.position.set(0.35, 0, 1);
    this.scene.add(this.groupCenterFrontRotated);
  }

  update() {
    return null;
  }
}
