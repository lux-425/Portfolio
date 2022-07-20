import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Particles {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.setBigParticles();
    this.setSmallParticles();

    this.setAnimation();
  }

  setBigParticles() {
    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(
      '/textures/particles/hotaru.png'
    );

    this.particlesGeometry = new THREE.BufferGeometry();
    this.count = 5555;

    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 155;
      colors[i] = 1;
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
      size: 0.08,
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
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(
      '/textures/particles/hotaru.png'
    );

    this.smallParticlesGeometry = new THREE.BufferGeometry();
    this.countBis = 555;

    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.countBis * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 55;
      colors[i] = 1;
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
      size: 0.025,
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

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update particles
      this.particles.rotation.y = -elapsedTime * 0.002;
      this.particles.position.y = Math.sin(elapsedTime * 0.1);

      this.smallParticles.rotation.y = elapsedTime * 0.1;
      this.smallParticles.position.y = Math.cos(elapsedTime * 0.2);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
