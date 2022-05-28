import * as THREE from 'three';

import Experience from '../Experience.js';

import gamenVertexShader from '../../Shaders/Gamen/vertex.glsl';
import gamenFragmentShader from '../../Shaders/Gamen/fragment.glsl';

export default class Gamen {
  constructor() {
    this.experience = new Experience();

    // this.scene = this.experience.scene;

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
    // this.material = new THREE.MeshPhysicalMaterial({
    //   roughness: 0,
    //   metalness: 0,
    //   transparent: true,
    //   opacity: 0.15
    //   ,
    //   color: 'cyan',
    // });
    // this.material.side = THREE.DoubleSide;

    this.material = new THREE.ShaderMaterial({
      vertexShader: gamenVertexShader,
      fragmentShader: gamenFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: {value:0},

      },

      
    });

  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = this.geometry.parameters.height / 2;
  }

  // setLights() {
  //   // 左
  //   this.rectAreaLight = new THREE.RectAreaLight(
  //     this.lColor1,
  //     0.01,
  //     0.01,
  //     0.01
  //   );

  //   this.rectAreaLight.height = 2;
  //   this.rectAreaLight.power = 130;

  //   this.rectAreaLight.position.set(this.posX, 1, this.posZ);
  //   this.rectAreaLight.rotateY(this.rot + Math.PI * 0.5);

  //   this.rectAreaLight.translateZ(0.5);

  //   this.scene.add(this.rectAreaLight);
  //   // this.rectAreaLightHelper = new RectAreaLightHelper(this.rectAreaLight);
  //   // this.scene.add(this.rectAreaLightHelper);

  //   // 右
  //   this.rectAreaLight2 = new THREE.RectAreaLight(
  //     this.lColor2,
  //     0.01,
  //     0.01,
  //     0.01
  //   );

  //   this.rectAreaLight2.height = 2;
  //   this.rectAreaLight2.power = 130;

  //   this.rectAreaLight2.position.set(this.posX, 1, this.posZ);
  //   this.rectAreaLight2.rotateY(this.rot - Math.PI * 0.5);

  //   this.rectAreaLight2.translateZ(0.5);

  //   this.scene.add(this.rectAreaLight2);
  //   // this.rectAreaLightHelper2 = new RectAreaLightHelper(this.rectAreaLight2);
  //   // this.scene.add(this.rectAreaLightHelper2);

  //   // テスト!!!
  //   // this.rectAreaLight.height = 0.1;
  //   // this.rectAreaLight2.height = 0.1;
  //   // this.rectAreaLight.translateY(-0.9);
  //   // this.rectAreaLight2.translateY(-0.9);
  // }
}
