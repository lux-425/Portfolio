import * as THREE from 'three';

import Experience from '../Experience.js';

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
        this.polygonGeometry = new THREE.ConeGeometry(18, 36, 18, 4);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });
        break;
      case 'circle':
        this.polygonGeometry = new THREE.CircleGeometry(20, 13);
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.polygonGeometry.rotateX(Math.PI * 0.5);
        break;
      case 'cylinder':
        this.polygonGeometry = new THREE.CylinderGeometry(
          18,
          18,
          40,
          16,
          4,
          true
        );
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        break;
      case 'cube':
        this.polygonGeometry = new THREE.BoxGeometry(210, 210, 310, 5, 5);
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        break;
      default:
        console.log('無');
    }

    this.polygon = new THREE.Mesh(this.polygonGeometry, this.polygonMaterial);
    this.scene.add(this.polygon);

    this.polygon.position.set(this.posX, -5, this.posZ);

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
          this.polygon.rotateY(Math.sin(deltaTime * this.speed));
          break;
        case 'circle':
          this.polygon.rotateY(Math.sin(deltaTime * this.speed));
          break;
        case 'cylinder':
          this.polygon.rotateY(Math.tan(deltaTime * this.speed));
          break;
        case 'cube':
          break;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
