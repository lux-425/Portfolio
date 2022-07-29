import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Polygon {
  constructor(type, posX, posZ, speed) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    // Debug
    this.debug = this.experience.debug;
    this.debugObject = {};
    this.debugObject.depthColor = '#000000';
    this.debugObject.surfaceColor = '#ffffff';

    this.posX = posX;
    // this.posY = typeof posY !== 'undefined' ? posY : -6;
    this.posZ = posZ;
    this.speed = speed;

    this.type = type;

    this.setPolygon();
    this.setAnimation();

    if (this.debug.active && type === 'cube') {
      this.debugFolder = this.debug.ui.addFolder('polygon');
      this.setDebug();
      this.debugFolder.close();
    }
  }

  setPolygon() {
    switch (this.type) {
      case 'cone':
        this.polygonGeometry = new THREE.ConeGeometry(3.5, 4, 10, 12);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cone';
        break;
      case 'circle':
        this.polygonGeometry = new THREE.CircleGeometry(2.88, 18);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.polygonGeometry.rotateX(Math.PI * 0.5);
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'circle';
        break;
      case 'ball':
        this.polygonGeometry = new THREE.SphereGeometry(0.6, 9, 9);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'ball';
        break;
      case 'cylinder':
        this.polygonGeometry = new THREE.CylinderGeometry(2, 2, 5, 8, 5, true);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cylinder';
        break;
      case 'torus':
        this.polygonGeometry = new THREE.TorusKnotGeometry(1, 0.2, 16, 8, 1, 1);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'torus';
        break;
      case 'gem':
        this.polygonGeometry = new THREE.SphereGeometry(1, 1, 1);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'gem';
        break;
      case 'globeOne':
        this.polygonGeometry = new THREE.SphereGeometry(2.5, 9, 9);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'globeOne';
        break;
      case 'globeTwo':
        this.polygonGeometry = new THREE.SphereGeometry(0.5, 9, 9);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'globeTwo';
        break;
      case 'pyramidOne':
        this.polygonGeometry = new THREE.ConeGeometry(5, 4, 4, 5);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'pyramidOne';
        break;
      case 'pyramidTwo':
        this.polygonGeometry = new THREE.ConeGeometry(3, 2.5, 4, 4);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'pyramidTwo';
        break;
      case 'pyramidThree':
        this.polygonGeometry = new THREE.ConeGeometry(1.5, 1, 4, 3);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'pyramidThree';
        break;
    }

    this.scene.add(this.mesh);

    this.mesh.position.set(this.posX, -5, this.posZ);
  }

  setAnimation() {
    const tick = () => {
      // Update polygons
      switch (this.type) {
        case 'cone':
          this.mesh.rotateY(Math.sin(this.experience.time.delta * this.speed));
          break;
        case 'circle':
          this.mesh.rotateY(Math.sin(this.experience.time.delta * this.speed));
          break;
        case 'ball':
          this.mesh.position.x =
            Math.cos(this.experience.time.elapsed * 0.001) * 1.5 - 12.5;
          this.mesh.position.z =
            Math.sin(this.experience.time.elapsed * 0.001) * 1.5 - 11;
          this.mesh.position.y = Math.abs(
            Math.sin(this.experience.time.elapsed * 0.001 * 1.5) + 5.61
          );
          this.mesh.rotateZ(this.experience.time.delta * 0.001);
          break;
        case 'cylinder':
          this.mesh.rotateY(-Math.tan(this.experience.time.delta * this.speed));
          break;
        case 'torus':
          this.mesh.rotateX(-Math.sin(this.experience.time.delta * this.speed));
          this.mesh.position.y =
            2.6 + Math.sin(-this.experience.time.elapsed * 0.001 * 0.155);
          this.mesh.geometry = new THREE.TorusKnotGeometry(
            1,
            0.2,
            10,
            10,
            this.experience.time.elapsed * 0.001 * 0.15,
            Math.sin(this.experience.time.elapsed * 0.001 * 0.15)
          );
          break;
        case 'gem':
          this.mesh.rotateX(Math.sin(this.experience.time.delta * this.speed));
          this.mesh.rotateY(Math.sin(this.experience.time.delta * this.speed));
          this.mesh.position.y =
            5.5 + Math.sin(this.experience.time.elapsed * 0.001 * 0.5);
          break;
        case 'globeOne':
          this.mesh.rotateY(Math.sin(this.experience.time.delta * this.speed));
          break;
        case 'globeTwo':
          this.mesh.rotateY(Math.sin(this.experience.time.delta * this.speed));
          this.mesh.position.x =
            Math.cos(this.experience.time.elapsed * 0.001 * 0.5) * 4 + 12;
          this.mesh.position.z =
            Math.sin(this.experience.time.elapsed * 0.001 * 0.5) * 4 + 30;
          break;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    this.debugFolder
      .add(this.mesh.material.uniforms.uBigWavesElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uBigWavesElevation');
    this.debugFolder
      .add(this.mesh.material.uniforms.uSmallWavesElevation, 'value')
      .min(-5)
      .max(20)
      .step(0.001)
      .name('uSmallWavesElevation');
    this.debugFolder
      .add(this.mesh.material.uniforms.uBigWavesFrequency.value, 'x')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyX');
    this.debugFolder
      .add(this.mesh.material.uniforms.uBigWavesFrequency.value, 'y')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyY');
    this.debugFolder
      .add(this.mesh.material.uniforms.uSmallWavesFrequency, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uSmallWavesFrequency');
    this.debugFolder
      .add(this.mesh.material.uniforms.uBigWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uBigWavesSpeed');
    this.debugFolder
      .add(this.mesh.material.uniforms.uSmallWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uSmallWavesSpeed');
    this.debugFolder
      .add(this.mesh.material.uniforms.uSmallWavesIterations, 'value')
      .min(0)
      .max(4)
      .step(1)
      .name('uSmallWavesIterations');
    this.debugFolder
      .addColor(this.debugObject, 'depthColor')
      .name('depthColor')
      .onChange(() => {
        this.mesh.material.uniforms.uDepthColor.value.set(
          this.debugObject.depthColor
        );
      });
    this.debugFolder
      .addColor(this.debugObject, 'surfaceColor')
      .name('surfaceColor')
      .onChange(() => {
        this.mesh.material.uniforms.uSurfaceColor.value.set(
          this.debugObject.surfaceColor
        );
      });
    this.debugFolder
      .add(this.mesh.material.uniforms.uColorOffset, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uColorOffset');
    this.debugFolder
      .add(this.mesh.material.uniforms.uColorMultiplier, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uColorMultiplier');
  }
}
