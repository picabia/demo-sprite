import { Model, Emitter } from '@picabia/picabia';

class GameModel extends Model {
  constructor () {
    super();

    this._emitter = new Emitter();
    Emitter.mixin(this, this._emitter);

    this._controls = {
      'move:left': () => {},
      'move:right': () => {},
      'move:center': () => {},
      'jump:start': () => {},
      'jump:stop': () => {}
    };
  }

  // -- model

  _init () {

    // this._player = new PlayerModel();
    // this._addChild(this._player);
    // this._someController.addObject(this._player);
    // this._emitter.emit('new-player', this._player);

  }

  _destroy () {
    this._emitter.destroy();
  }

  // -- api

  input (control) {
    const args = [...arguments];
    args.unshift();
    this._controls[control](...args);
  }
}

export {
  GameModel
};
