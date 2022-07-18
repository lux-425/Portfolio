import * as THREE from 'three';

import Experience from '../Experience.js';

import keshikiVertexShader from '../../shaders/Keshiki/vertex.glsl';
import keshikiFragmentShader from '../../shaders/Keshiki/fragment.glsl';

import flagVertexShader from '../../shaders/Keshiki/Flag/vertex.glsl';
import flagFragmentShader from '../../shaders/Keshiki/Flag/fragment.glsl';

export default class Keshiki {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    /**
     * Raycaster
     */
    this.raycaster = new THREE.Raycaster();

    this.objectsToTest = [];

    this.area = 'gengoErabu';

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    this.flagTextureFrance = textureLoader.load('/textures/flag-france.jpg');
    this.flagTextureNippon = textureLoader.load('/textures/flag-nippon.jpg');
    this.flagTextureKokusai = textureLoader.load('/textures/flag-kokusai.jpg');

    /**
     *
     * CLICK EVENTS
     *
     */
    window.addEventListener('click', () => {
      if (this.currentIntersect) {
        switch (this.currentIntersect) {
          case 'francaisHitbox':
            this.confirmLanguage();
            this.experience.world.textKeshiki.contact.material.opacity = 1;
            break;
          case 'nihongoHitbox':
            this.confirmLanguage();
            this.experience.world.textKeshiki.contact.material.opacity = 1;
            break;
          case 'englishHitbox':
            this.confirmLanguage();
            this.experience.world.textKeshiki.contact.material.opacity = 1;
            break;
          case 'contactHitbox':
            window.open('https://linktr.ee/garcialuc');
            break;
        }
      }
    });

    // Debug
    this.debug = this.experience.debug;
    this.debugObject = {};
    this.debugObject.depthColor = '#000000';
    this.debugObject.surfaceColor = '#ffffff';

    this.setKeshiki();

    this.setAnimation();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('keshiki');
      this.setDebug();
      this.debugFolder.close();
    }
  }

  confirmLanguage() {
    this.area = 'gamenErabu';

    this.mesh.material = this.material;

    this.experience.world.objectsReadyArr[8] = true;
    this.experience.world.textKeshiki.nihongo.visible = false;
    this.experience.world.textKeshiki.francais.visible = false;
    this.experience.world.textKeshiki.english.visible = false;
  }

  hideLanguages() {
    this.experience.world.textKeshiki.nihongo.visible = false;
    this.experience.world.textKeshiki.francais.visible = false;
    this.experience.world.textKeshiki.english.visible = false;
  }

  showLanguages() {
    this.experience.world.textKeshiki.nihongo.visible = true;
    this.experience.world.textKeshiki.francais.visible = true;
    this.experience.world.textKeshiki.english.visible = true;
  }

  setKeshiki() {
    /**
     * MATERIALS
     */
    // DEFAULT
    this.material = new THREE.ShaderMaterial({
      vertexShader: keshikiVertexShader,
      fragmentShader: keshikiFragmentShader,
      side: THREE.FrontSide,
      // transparent: true,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.02 },
        uBigWavesFrequency: { value: new THREE.Vector2(0, 0.55) },
        uBigWavesSpeed: { value: -0.55 },

        uSmallWavesElevation: { value: 2.55 },
        uSmallWavesFrequency: { value: 0.25 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 3 },

        uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
        uSurfaceColor: {
          value: new THREE.Color(this.debugObject.surfaceColor),
        },
        uColorOffset: { value: 1 },
        uColorMultiplier: { value: 1 },
      },
    });

    // FRANCE
    this.flagMaterialFrance = new THREE.ShaderMaterial({
      vertexShader: flagVertexShader,
      fragmentShader: flagFragmentShader,
      wireframe: true,
      // transparent: true,
      uniforms: {
        uFrequency: { value: new THREE.Vector2(2, 6) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('white') },
        uTexture: { value: this.flagTextureFrance },
      },
    });

    // 日本
    this.flagMaterialNippon = new THREE.ShaderMaterial({
      vertexShader: flagVertexShader,
      fragmentShader: flagFragmentShader,
      wireframe: true,
      // transparent: true,
      uniforms: {
        uFrequency: { value: new THREE.Vector2(2, 6) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('white') },
        uTexture: { value: this.flagTextureNippon },
      },
    });

    // 国際
    this.flagMaterialKokusai = new THREE.ShaderMaterial({
      vertexShader: flagVertexShader,
      fragmentShader: flagFragmentShader,
      wireframe: true,
      // transparent: true,
      uniforms: {
        uFrequency: { value: new THREE.Vector2(2, 6) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('white') },
        uTexture: { value: this.flagTextureKokusai },
      },
    });

    /**
     * GEOMETRY
     */
    this.keshikiGeometry = new THREE.PlaneGeometry(15, 9, 128, 128);
    this.keshikiMaterial = this.material;

    /**
     * MESH
     */
    this.mesh = new THREE.Mesh(this.keshikiGeometry, this.keshikiMaterial);
    this.mesh.name = 'keshiki';
    // this.mesh.rotation.x = -Math.PI * 0.25;
    this.mesh.position.set(0, 4.5, -18);

    this.scene.add(this.mesh);
  }

  setAnimation() {
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Raycasting
      this.raycaster.setFromCamera(
        this.experience.mouse,
        this.experience.camera.instance
      );

      this.intersects = this.raycaster.intersectObjects(this.objectsToTest);

      // Update keshiki
      this.mesh.material.uniforms.uTime.value = elapsedTime;

      if (this.intersects.length) {
        document.body.style.cursor = 'pointer';

        // MOUSE ENTER
        if (!this.currentIntersect) {
          if (this.area === 'gengoErabu') {
            if (this.intersects[0].object.name === 'francaisHitbox') {
              this.hideLanguages();
              this.mesh.material = this.flagMaterialFrance;
            } else if (this.intersects[0].object.name === 'nihongoHitbox') {
              this.hideLanguages();
              this.mesh.material = this.flagMaterialNippon;
            } else if (this.intersects[0].object.name === 'englishHitbox') {
              this.hideLanguages();
              this.mesh.material = this.flagMaterialKokusai;
            }
          } else if (this.area === 'gamenErabu') {
            if (this.intersects[0].object.name === 'contactHitbox') {
              // enter contact hitbox
            }
          }
        }
        this.currentIntersect = this.intersects[0].object.name;
      } else {
        document.body.style.cursor = 'default';

        // MOUSE LEAVE
        if (this.currentIntersect) {
          if (this.area === 'gengoErabu') {
            if (this.currentIntersect === 'francaisHitbox') {
              this.showLanguages();
              this.mesh.material = this.material;
            } else if (this.currentIntersect === 'nihongoHitbox') {
              this.showLanguages();
              this.mesh.material = this.material;
            } else if (this.currentIntersect === 'englishHitbox') {
              this.showLanguages();
              this.mesh.material = this.material;
            }
          } else if (this.area === 'gamenErabu') {
            if (this.currentIntersect === 'contactHitbox') {
              // leave contact hitbox
            }
          }
        }
        this.currentIntersect = null;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  setDebug() {
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesElevation, 'value')
      .min(-5)
      .max(10)
      .step(0.001)
      .name('uBigWavesElevation');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesElevation, 'value')
      .min(-5)
      .max(20)
      .step(0.001)
      .name('uSmallWavesElevation');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesFrequency.value, 'x')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyX');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesFrequency.value, 'y')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uBigWavesFrequencyY');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesFrequency, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uSmallWavesFrequency');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uBigWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uBigWavesSpeed');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesSpeed, 'value')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('uSmallWavesSpeed');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uSmallWavesIterations, 'value')
      .min(0)
      .max(4)
      .step(1)
      .name('uSmallWavesIterations');
    this.debugFolder
      .addColor(this.debugObject, 'depthColor')
      .name('depthColor')
      .onChange(() => {
        this.keshikiMaterial.uniforms.uDepthColor.value.set(
          this.debugObject.depthColor
        );
      });
    this.debugFolder
      .addColor(this.debugObject, 'surfaceColor')
      .name('surfaceColor')
      .onChange(() => {
        this.keshikiMaterial.uniforms.uSurfaceColor.value.set(
          this.debugObject.surfaceColor
        );
      });
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uColorOffset, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uColorOffset');
    this.debugFolder
      .add(this.keshikiMaterial.uniforms.uColorMultiplier, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uColorMultiplier');
  }
}
