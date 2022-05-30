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

    this.ueBreathingElevation = gamenParams.ueBreathingElevation;
    this.shitaBreathingElevation = gamenParams.shitaBreathingElevation;
    this.ueBreathingFrequency = gamenParams.ueBreathingFrequency;
    this.shitaBreathingFrequency = gamenParams.shitaBreathingFrequency;
    this.ueBreathingSpeed = gamenParams.ueBreathingSpeed;
    this.shitaBreathingSpeed = gamenParams.shitaBreathingSpeed;
    this.shitaBreathingIterations = gamenParams.shitaBreathingIterations;
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
      default:
        '透明';
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(0.9, 1.9, 32, 32);
  }

  // setTextures() {
  //   this.textures = {};
  // }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: this.shader.vertex,
      fragmentShader: this.shader.fragment,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },

        uUeBreathingElevation: { value: this.ueBreathingElevation },
        uUeBreathingFrequency: {
          value: new THREE.Vector2(
            Object.values(this.ueBreathingFrequency)[0],
            Object.values(this.ueBreathingFrequency)[1]
          ),
        },
        uUeBreathingSpeed: { value: this.ueBreathingSpeed },

        uShitaBreathingElevation: { value: this.shitaBreathingElevation },
        uShitaBreathingFrequency: { value: this.shitaBreathingFrequency },
        uShitaBreathingSpeed: { value: this.shitaBreathingSpeed },
        uShitaBreathingIterations: { value: this.shitaBreathingIterations },

        uColor: { value: new THREE.Color(this.color) },
        uOpacity: { value: this.opacity },
      },
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = this.geometry.parameters.height / 2;
  }
}
