import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Particles {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.textureLoader = new THREE.TextureLoader();

    this.setBigParticles();
    this.setSmallParticles();

    this.toggleSpeed = 1;

    this.setAnimation();
  }

  setBigParticles() {
    /**
     * Textures
     */
    const particleTexture = this.textureLoader.load(
      '/textures/particles/hoshi.png'
    );

    this.particlesGeometry = new THREE.BufferGeometry();
    this.count = 5555;

    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 1555;
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
      size: 1,
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

  setSmallParticles() {
    /**
     * Textures
     */
    const particleTexture = this.textureLoader.load(
      '/textures/particles/hotaru.png'
    );

    this.smallParticlesGeometry = new THREE.BufferGeometry();
    this.countBis = 555;

    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.countBis * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 55;
      colors[i] = Math.random();
    }

    this.smallParticlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    this.smallParticlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    this.smallParticlesMaterial = new THREE.PointsMaterial({
      size: 0.25,
      sizeAttenuation: true,
    });

    this.smallParticlesMaterial.transparent = true;
    this.smallParticlesMaterial.alphaMap = particleTexture;
    this.smallParticlesMaterial.depthWrite = false;
    this.smallParticlesMaterial.blending = THREE.AdditiveBlending;
    this.smallParticlesMaterial.vertexColors = true;

    this.smallParticles = new THREE.Points(
      this.smallParticlesGeometry,
      this.smallParticlesMaterial
    );
    this.scene.add(this.smallParticles);
  }

  switchParticleTexture(area) {
    switch (area) {
      case 'left':
        this.particleTexture = this.textureLoader.load(
          '/textures/particles/awa.png'
        );
        break;
      case 'center':
        this.particleTexture = this.textureLoader.load(
          '/textures/particles/honoo.png'
        );
        break;
      case 'right':
        this.particleTexture = this.textureLoader.load(
          '/textures/particles/hotaru.png'
        );
        break;
    }
    this.smallParticles.material.alphaMap = this.particleTexture;
  }

  setAnimation() {
    const tick = () => {
      // Update particles
      this.particles.rotation.y = -this.experience.time.elapsed * 0.000002;

      this.smallParticles.rotation.y =
        this.experience.time.elapsed * 0.000025 * this.toggleSpeed;
      this.smallParticles.position.y = Math.cos(
        this.experience.time.elapsed * 0.00025
      );

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
