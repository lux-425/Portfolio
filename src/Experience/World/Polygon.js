import * as THREE from 'three';

import Experience from '../Experience.js';

// import cubeVertexShader from '../../Shaders/Polygon/Cube/vertex.glsl';
// import cubeFragmentShader from '../../Shaders/Polygon/Cube/fragment.glsl';

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
        this.polygonGeometry = new THREE.ConeGeometry(4, 6, 8, 4);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cone';
        break;
      case 'circle':
        this.polygonGeometry = new THREE.CircleGeometry(6, 6);
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.polygonGeometry.rotateX(Math.PI * 0.5);
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'circle';
        break;
      case 'cylinder':
        this.polygonGeometry = new THREE.CylinderGeometry(3, 5, 6, 16, 4, true);
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cylinder';
        break;
      case 'cube':
        this.polygonGeometry = new THREE.BoxGeometry(100, 50, 100, 2, 1);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          opacity: 0.1,
          transparent: true,
        });
        // this.polygonMaterial = new THREE.ShaderMaterial({
        //   vertexShader: cubeVertexShader,
        //   fragmentShader: cubeFragmentShader,
        //   // side: THREE.DoubleSide,
        //   // transparent: true,
        //   // wireframe: true,
        //   uniforms: {
        //     uTime: { value: 0 },
        //   },
        // });
        this.mesh = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
        this.mesh.name = 'cube';
        break;
      default:
        console.log('無');
    }

    this.scene.add(this.mesh);

    this.mesh.position.set(this.posX, -5, this.posZ);

    this.polygonMaterial.wireframe = true;
  }

  setAnimation() {
    var lastUpdate = Date.now();

    const tick = () => {
      var now = Date.now();
      var deltaTime = now - lastUpdate;
      lastUpdate = now;

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
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
