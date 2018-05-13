import { View } from '@picabia/picabia';

class PlayerView extends View {
  _constructor (player, cache) {
    this._player = player;
    this._cache = cache;

    this._player.setPos(0, 0);

    this._moveTs = 0;
    this._moveIndex = 0;
    this._frameTime = 100;

    this._sprite = this._cache.get('guywalk.sprite');
  }

  // -- view

  _render (delta, timestamp) {
    const renderer = this._renderer;

    if (this._player._speed.h) {
      this._moveTs += delta * (0.1 + 2 * this._player._speed.h);
      this._index = Math.round(this._moveTs / this._frameTime) % 8;
    } else {
      this._moveTs = 0;
    }

    this._sprite.renderAnimationFrame('walk', this._index || 4, renderer, this._player._pos, { x: 0.5, y: 1 });
  }
}

export {
  PlayerView
};
