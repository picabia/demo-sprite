import { Model, Emitter } from '@picabia/picabia';
import { PlayerModel } from './player.js';

class GameModel extends Model {
  constructor () {
    super();

    this._emitter = new Emitter();
    Emitter.mixin(this, this._emitter);

    this._controls = {
      'move:left': () => this._player.setDirection(-1),
      'move:right': () => this._player.setDirection(1),
      'move:center': () => this._player.stop(),
      'dash:start': () => this._player.startDash(),
      'dash:stop': () => this._player.stopDash(),
      'jump:start': () => this._player.startJump(),
      'jump:stop': () => this._player.stopJump(),
      'thrust:up': () => this._player.applyThrust(-1),
      'thrust:down': () => this._player.applyThrust(1),
      'thrust:center': () => this._player.applyThrust(0)
    };
  }

  // -- model

  _init () {
    this._player = new PlayerModel();
    this._addChild(this._player);
    this._emitter.emit('new-player', this._player);
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
