import * as THREE from 'three';

import Experience from '../Experience.js';

import gamenVertexShaderLeft from '../../Shaders/Gamen/LeftSide/vertex.glsl';
import gamenFragmentShaderLeft from '../../Shaders/Gamen/LeftSide/fragment.glsl';
import gamenVertexShaderCenter from '../../Shaders/Gamen/Center/vertex.glsl';
import gamenFragmentShaderCenter from '../../Shaders/Gamen/Center/fragment.glsl';
import gamenVertexShaderRight from '../../Shaders/Gamen/RightSide/vertex.glsl';
import gamenFragmentShaderRight from '../../Shaders/Gamen/RightSide/fragment.glsl';

export default class Gamen {
  constructor(gamenParams) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.ueBreathingSpeed = gamenParams.ueBreathingSpeed;
    this.shitaBreathingSpeed = gamenParams.shitaBreathingSpeed;
    this.color = gamenParams.color;
    this.opacity = gamenParams.opacity;

    switch (gamenParams.shader) {
      case 'left':
        this.shader = {
          vertex: gamenVertexShaderLeft,
          fragment: gamenFragmentShaderLeft,
        };
        break;
      case 'center':
        this.shader = {
          vertex: gamenVertexShaderCenter,
          fragment: gamenFragmentShaderCenter,
        };
        break;
      case 'right':
        this.shader = {
          vertex: gamenVertexShaderRight,
          fragment: gamenFragmentShaderRight,
        };
        break;
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(0.9, 1.9, 1, 1);
  }

  // setTextures() {
  //   this.textures = {};
  // }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: this.shader.vertex,
      fragmentShader: this.shader.fragment,
      side: THREE.DoubleSide,
      // wireframe: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },

        uUeBreathingSpeed: { value: this.ueBreathingSpeed },
        uShitaBreathingSpeed: { value: this.shitaBreathingSpeed },

        uColor: { value: new THREE.Color(this.color) },
        uOpacity: { value: this.opacity },
      },
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = 'gamen';

    this.mesh.position.y = this.geometry.parameters.height / 2;
  }

  resetShader(gamen) {
    switch (gamen) {
      case 'profil':
      case 'shoukai':
        this.mesh.material.fragmentShader = gamenFragmentShaderLeft;
        break;
      case 'keiken':
      case 'projects':
        this.mesh.material.fragmentShader = gamenFragmentShaderCenter;
        break;
      case 'gaku':
      case 'kyoumi':
      case 'gengo':
        this.mesh.material.fragmentShader = gamenFragmentShaderRight;
        break;
    }
  }
}
