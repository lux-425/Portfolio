import * as THREE from 'three';

import Experience from '../Experience.js';

import cubeVertexShader from '../../Shaders/Polygon/Cube/vertex.glsl';
import cubeFragmentShader from '../../Shaders/Polygon/Cube/fragment.glsl';

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
        this.polygonGeometry = new THREE.CircleGeometry(3, 9);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.polygonGeometry.rotateX(Math.PI * 0.5);
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'circle';
        break;
      case 'cylinder':
        this.polygonGeometry = new THREE.CylinderGeometry(2, 2, 5, 8, 10, true);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cylinder';
        break;
      case 'cube':
        this.polygonGeometry = new THREE.BoxGeometry(30, 15, 50, 100, 100, 100);
        this.polygonMaterial = new THREE.ShaderMaterial({
          vertexShader: cubeVertexShader,
          fragmentShader: cubeFragmentShader,
          side: THREE.DoubleSide,
          wireframe: true,
          uniforms: {
            uTime: { value: 0 },

            uBigWavesElevation: { value: 0.55 },
            uBigWavesFrequency: { value: new THREE.Vector2(0, 0.55) },
            uBigWavesSpeed: { value: -0.05 },

            uSmallWavesElevation: { value: 5.55 },
            uSmallWavesFrequency: { value: 0.055 },
            uSmallWavesSpeed: { value: 0.05 },
            uSmallWavesIterations: { value: 2 },

            uDepthColor: {
              value: new THREE.Color(this.debugObject.depthColor),
            },
            uSurfaceColor: {
              value: new THREE.Color(this.debugObject.surfaceColor),
            },
            uColorOffset: { value: 1 },
            uColorMultiplier: { value: 2 },
          },
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cube';
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
      case 'ball':
        this.polygonGeometry = new THREE.SphereGeometry(0.6, 9, 9);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'ball';
        break;
      case 'torus':
        this.polygonGeometry = new THREE.TorusKnotGeometry(1, 0.2, 13, 13);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'torus';
        break;
      default:
        console.log('無');
    }

    this.scene.add(this.mesh);

    this.mesh.position.set(this.posX, -5, this.posZ);
  }

  setAnimation() {
    var lastUpdate = Date.now();

    const clock = new THREE.Clock();

    const tick = () => {
      var now = Date.now();
      var deltaTime = now - lastUpdate;
      lastUpdate = now;

      const elapsedTime = clock.getElapsedTime();

      // Update polygon
      switch (this.type) {
        case 'cone':
          this.mesh.rotateY(Math.sin(deltaTime * this.speed));
          break;
        case 'circle':
          this.mesh.rotateY(Math.sin(deltaTime * this.speed));
          break;
        case 'cylinder':
          this.mesh.rotateY(Math.tan(deltaTime * this.speed));
          break;
        case 'cube':
          this.mesh.material.uniforms.uTime.value = elapsedTime;
          break;
        case 'gem':
          this.mesh.rotateX(Math.sin(deltaTime * this.speed));
          this.mesh.rotateY(Math.sin(deltaTime * this.speed));
          this.mesh.position.y = 5.5 + Math.sin(elapsedTime * 0.5);
          break;
        case 'globeOne':
          this.mesh.rotateY(Math.sin(deltaTime * this.speed));
          break;
        case 'globeTwo':
          this.mesh.rotateY(Math.sin(deltaTime * this.speed));
          this.mesh.position.x = Math.cos(elapsedTime * 0.5) * 4 + 7;
          this.mesh.position.z = Math.sin(elapsedTime * 0.5) * 4 + 16;
          break;
        case 'ball':
          this.mesh.position.x = Math.cos(elapsedTime) * 1.5 - 10;
          this.mesh.position.z = Math.sin(elapsedTime) * 1.5 - 11;
          this.mesh.position.y = Math.abs(Math.sin(elapsedTime * 1.5) + 5.61);
          this.mesh.rotateZ(deltaTime * 0.001);
          break;
        case 'torus':
          this.mesh.rotateX(-Math.sin(deltaTime * this.speed));
          this.mesh.rotateY(Math.sin(deltaTime * this.speed * 0.5));
          this.mesh.position.y = 2.6 + Math.sin(-elapsedTime * 0.3);
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
