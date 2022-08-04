import Experience from '../../Experience.js';

import TextModel from './TextModel.js';

export default class Texts {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    /**
     *
     * PRELOAD TEXTS' MODELS
     *
     */
    this.loadModelProjects();
    this.loadModelGengo();

    /**
     * FRANCAIS
     */
    this.loadModelProfilFrancais();
    this.loadModelShoukaiFrancais();
    this.loadModelKeikenFrancais();

    /**
     * 日本語
     */
    this.loadModelKeikenIntro();
    this.loadModelProjectsIntro();

    this.loadModelProfilNihongo();
    this.loadModelShoukaiNihongo();
    this.loadModelKeikenNihongo();

    /**
     * ENGLISH
     */
    this.loadModelProfilEnglish();
    this.loadModelShoukaiEnglish();
    this.loadModelKeikenEnglish();
  }

  async loadModelProjects() {
    const modelProjects = new TextModel(
      '../../../models/Gamen/gamen_005-6.glb'
    );
    await modelProjects.waitForLoad();
    this.textModelProjects = modelProjects.model.children[0];
  }

  async loadModelGengo() {
    const modelGengo = new TextModel('../../../models/Gamen/gamen_009.glb');
    await modelGengo.waitForLoad();
    this.textModelGengo = modelGengo.model.children[0];
  }

  /**
   * FRANCAIS
   */
  async loadModelProfilFrancais() {
    const modelProfilFrancais = new TextModel(
      '../../../models/Gamen/Francais/gamen_000.glb'
    );
    await modelProfilFrancais.waitForLoad();
    this.textModelProfilFrancais = modelProfilFrancais.model.children[0];
  }

  async loadModelShoukaiFrancais() {
    const modelShoukaiFrancais = new TextModel(
      '../../../models/Gamen/Francais/gamen_001-2.glb'
    );
    await modelShoukaiFrancais.waitForLoad();
    this.textModelShoukaiFrancais = modelShoukaiFrancais.model.children[0];
  }

  async loadModelKeikenFrancais() {
    const modelKeikenFrancais = new TextModel(
      '../../../models/Gamen/Francais/gamen_003-4.glb'
    );
    await modelKeikenFrancais.waitForLoad();
    this.textModelKeikenFrancais = modelKeikenFrancais.model.children[0];
  }

  /**
   * 日本語
   */
  async loadModelKeikenIntro() {
    const modelKeikenIntro = new TextModel(
      '../../../models/Gamen/Nihongo/gamen_003-4_intro.glb'
    );
    await modelKeikenIntro.waitForLoad();
    this.textModelKeikenIntro = modelKeikenIntro.model.children[0];
  }

  async loadModelProjectsIntro() {
    const modelProjectsIntro = new TextModel(
      '../../../models/Gamen/Nihongo/gamen_005-6_intro.glb'
    );
    await modelProjectsIntro.waitForLoad();
    this.textModelProjectsIntro = modelProjectsIntro.model.children[0];
  }

  async loadModelProfilNihongo() {
    const modelProfilNihongo = new TextModel(
      '../../../models/Gamen/Nihongo/gamen_000.glb'
    );
    await modelProfilNihongo.waitForLoad();
    this.textModelProfilNihongo = modelProfilNihongo.model.children[0];
  }

  async loadModelShoukaiNihongo() {
    const modelShoukaiNihongo = new TextModel(
      '../../../models/Gamen/Nihongo/gamen_001-2.glb'
    );
    await modelShoukaiNihongo.waitForLoad();
    this.textModelShoukaiNihongo = modelShoukaiNihongo.model.children[0];
  }

  async loadModelKeikenNihongo() {
    const modelKeikenNihongo = new TextModel(
      '../../../models/Gamen/Nihongo/gamen_003-4.glb'
    );
    await modelKeikenNihongo.waitForLoad();
    this.textModelKeikenNihongo = modelKeikenNihongo.model.children[0];
  }

  /**
   * ENGLISH
   */
  async loadModelProfilEnglish() {
    const modelProfilEnglish = new TextModel(
      '../../../models/Gamen/English/gamen_000.glb'
    );
    await modelProfilEnglish.waitForLoad();
    this.textModelProfilEnglish = modelProfilEnglish.model.children[0];
  }

  async loadModelShoukaiEnglish() {
    const modelShoukaiEnglish = new TextModel(
      '../../../models/Gamen/English/gamen_001-2.glb'
    );
    await modelShoukaiEnglish.waitForLoad();
    this.textModelShoukaiEnglish = modelShoukaiEnglish.model.children[0];
  }

  async loadModelKeikenEnglish() {
    const modelKeikenEnglish = new TextModel(
      '../../../models/Gamen/English/gamen_003-4.glb'
    );
    await modelKeikenEnglish.waitForLoad();
    this.textModelKeikenEnglish = modelKeikenEnglish.model.children[0];
  }
}
