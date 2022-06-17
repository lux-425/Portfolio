import * as THREE from 'three';

import Experience from '../Experience.js';

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import TextProfil from './Texts/TextProfil.js';
import TextShoukai from './Texts/TextShoukai.js';

export default class Text {
  constructor(panel) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.panel = panel;

    switch (this.panel) {
      case '000':
        this.text = new TextProfil();
        break;
      case '001-2':
        this.text = new TextShoukai();
        break;
      default:
        break;
    }

    // Debug
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('text');
    }

    /**
     * テスト!!!
     */
    this.debugParams = {};
  }
}
