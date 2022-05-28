import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Polygon {
  constructor(type, posX, posZ, RotY) {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.posX = posX;
    // this.posY = typeof posY !== 'undefined' ? posY : -6;
    this.posZ = posZ;
    this.RotY = RotY;

    this.type = type;

    this.setPolygon();
    this.setAnimation();
  }

  setPolygon() {
    switch (this.type) {
      case 'cone':
        this.polygonGeometry = new THREE.ConeGeometry(25, 50, 18, 4);
        this.polygonMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });
        break;
      case 'circle':
        this.polygonGeometry = new THREE.CircleGeometry(30, 13);
        this.polygonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.polygonGeometry.rotateX(Math.PI * 0.5);
        break;
      case 'cylinder':
        this.polygonGeometry = new THREE.CylinderGeometry(18, 18, 40, 16, 4, true);
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
          this.polygon.rotateY(Math.sin(deltaTime * this.RotY));
          break;
        case 'circle':
          this.polygon.rotateY(Math.sin(deltaTime * this.RotY));
          break;
        case 'cylinder':
          this.polygon.rotateY(Math.tan(deltaTime * this.RotY ));
          break;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
