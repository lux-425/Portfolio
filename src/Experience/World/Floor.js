import * as THREE from 'three';

import Experience from '../Experience.js';

import floorVertexShader from '../../Shaders/Floor/vertex.glsl';
import floorFragmentShader from '../../Shaders/Floor/fragment.glsl';

export default class Floor {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // Debug
    this.debug = this.experience.debug;

    this.debugObject = {};
    this.debugObject.floorColor = '#5a4635';

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('floor');
      this.debugFolder.close();
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

    this.setDebug();

    this.setAnimation();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(15, 10, 200, 200);
  }

  setTextures() {
    this.textures = {};
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: floorVertexShader,
      fragmentShader: floorFragmentShader,
      // side: THREE.DoubleSide,
      // transparent: true,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(this.debugObject.floorColor) },
        uOpacity: { value: 1.0 },
        uOpacityColor: { value: 1.0 },
        uSpeed: { value: 0.05 },
        uMargin: { value: 0.15 },
      },
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = 'floor';

    this.mesh.receiveShadow = false;

    this.mesh.translateZ(2);
    this.mesh.rotateX(-Math.PI * 0.5);

    this.scene.add(this.mesh);

    // テスト　！！！
    this.geometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
    );
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update floor
      this.material.uniforms.uTime.value = elapsedTime;

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.material.uniforms.uSpeed, 'value')
        .min(0)
        .max(10)
        .step(0.001)
        .name('speed');
      this.debugFolder
        .add(this.material.uniforms.uMargin, 'value')
        .min(0)
        .max(1)
        .step(0.0001)
        .name('margin');
      this.debugFolder
        .add(this.material.uniforms.uOpacity, 'value')
        .min(0)
        .max(1)
        .step(0.001)
        .name('opacity');
      this.debugFolder
        .add(this.material.uniforms.uOpacityColor, 'value')
        .min(0)
        .max(1)
        .step(0.001)
        .name('opacityColor');
      this.debugFolder
        .addColor(this.material.uniforms.uColor, 'value')
        .name('color');
    }
  }
}
