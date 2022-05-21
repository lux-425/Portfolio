import * as THREE from 'three';

import Experience from '../Experience.js';

import Environment from './Environment.js';
import Floor from './Floor.js';
import Panels from './Panels.js';

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
    this.setBottomLeftPanels();

    /**
     * テスト!!!
     */
    this.debugParams = {};

    /**
     * Debug
     */
    if (this.debug.active) {
      // this.debugFolder
      //   .add(this.debugParams, 'gLsPower')
      //   .min(0)
      //   .max(100)
      //   .step(0.1)
      //   .name('groundLightsPower');
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
