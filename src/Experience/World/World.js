import * as THREE from 'three';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Floor from './Floor.js';
import Panels from './Panels.js';
import Keshiki from './Keshiki.js';
import Polygon from './Polygon.js';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.floor = new Floor();
    this.environment = new Environment();

    this.keshiki = new Keshiki();

    this.debug = this.experience.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('world');
    }

    /**
     *
     * 画面
     *
     */
    this.setBottomLeftPanels();

    /**
     * ポリゴン
     */
    this.polygonCone = new Polygon("cone",-70,-30, 0.0001)

    this.polygonCircle = new Polygon("circle", -70, -30, -0.0005)
    this.polygonCircle.polygon.translateY(25)

    this.polygonCylinder = new Polygon('cylinder', 75, -45, 0.0001);


    /**
     * テスト!!!
     */
    this.debugParams = {};

    /**
     * Debug
     */
    if (this.debug.active) {
    }
  }

  /**
   * 左下隅
   */
  setBottomLeftPanels() {
    this.bottomLeftPanels = new Panels();
  }

  update() {}
}
