import * as THREE from 'three';

import Experience from '../Experience.js';

import cubeVertexShader from '../../Shaders/Polygon/Cube/vertex.glsl';
import cubeFragmentShader from '../../Shaders/Polygon/Cube/fragment.glsl';

export default class Polygon {
  constructor(type, posX, posZ, speed) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.posX = posX;
    // this.posY = typeof posY !== 'undefined' ? posY : -6;
    this.posZ = posZ;
    this.speed = speed;

    this.type = type;

    this.setPolygon();
    this.setAnimation();
  }

  setPolygon() {
    switch (this.type) {
      case 'cone':
        this.polygonGeometry = new THREE.ConeGeometry(2, 3, 8, 4);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff, wireframe: true
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cone';
        break;
      case 'circle':
        this.polygonGeometry = new THREE.CircleGeometry(2, 9);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        });
        this.polygonGeometry.rotateX(Math.PI * 0.5);
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'circle';
        break;
      case 'cylinder':
        this.polygonGeometry = new THREE.CylinderGeometry(
          1.5,
          1.5,
          4,
          16,
          4,
          true
        );
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cylinder';
        break;
      case 'cube':
        this.polygonGeometry = new THREE.BoxGeometry(30, 15, 50, 100, 100, 100);
        // this.polygonMaterial = new THREE.MeshBasicMaterial({
        //   color: 0xffffff,
        //   // color: 0x000000,
        //   opacity: 0.05,
        //   transparent: true,
        // });
        this.polygonMaterial = new THREE.ShaderMaterial({
          vertexShader: cubeVertexShader,
          fragmentShader: cubeFragmentShader,
          side: THREE.DoubleSide,
          wireframe: true,
          uniforms: {
            uTime: { value: 0 },

            uBigWavesElevation: { value: 0.55 },
            uBigWavesFrequency: { value: new THREE.Vector2(0, 0.55) },
            uBigWavesSpeed: { value: -0.55 },

            uSmallWavesElevation: { value: 5.55 },
            uSmallWavesFrequency: { value: 0.25 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallWavesIterations: { value: 3 },

            uDepthColor: {
              value: new THREE.Color('#000000'),
            },
            uSurfaceColor: {
              value: new THREE.Color('#f000ff'),
            },
            uColorOffset: { value: 1 },
            uColorMultiplier: { value: 1 },
          },
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cube';
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
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
