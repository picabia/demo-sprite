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

  render (delta, timestamp) {
    const renderer = this._renderer;

    if (this._player._speed.h) {
      this._moveTs += delta * (0.1 + 2 * this._player._speed.h);
      this._index = Math.round(this._moveTs / this._frameTime) % 8;
    } else {
      this._moveTs = 0;
    }

    const frame = this._sprite.getAnimationFrame('walk', this._index || 4);
    renderer.drawImage(frame.source, frame.pos.x, frame.pos.y, frame.size.w, frame.size.h, this._player._pos.x - frame.size.w / 2, this._player._pos.y - frame.size.h / 2, frame.size.w, frame.size.h);
  }
}

export {
  PlayerView
};
