import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Particles {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.setParticles();

    this.setAnimation();
  }

  setParticles() {
    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('/textures/particles/hotaru.png');

    this.particlesGeometry = new THREE.BufferGeometry();
    this.count = 15555;

    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 60;
      colors[i] = Math.random();
    }

    this.particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    this.particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    this.particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
    });

    this.particlesMaterial.transparent = true;
    this.particlesMaterial.alphaMap = particleTexture;
    // this.particlesMaterial.alphaTest = 0.001;
    // this.particlesMaterial.depthTest = false;
    this.particlesMaterial.depthWrite = false;
    this.particlesMaterial.blending = THREE.AdditiveBlending;
    this.particlesMaterial.vertexColors = true;

    this.particles = new THREE.Points(
      this.particlesGeometry,
      this.particlesMaterial
    );
    this.scene.add(this.particles);
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update particles
      this.particles.rotation.y = elapsedTime * 0.01;
      this.particles.position.y = Math.sin(elapsedTime * 0.1);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
