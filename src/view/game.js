import { View, Wave, SpriteSheet, SpriteConverterTexturePackerPixiJs } from '@picabia/picabia';

import { PlayerView } from './player';
import { BgView } from './bg';

class GameView extends View {
  constructor (v, target, game, cache) {
    super(v, target);

    this._game = game;
    this._cache = cache;

    this._viewport = this._v.get('viewport:camera');

    const spriteImg = this._cache.get('./assets/pixi-js.png');
    const spriteData = this._cache.get('./assets/pixi-js.json');
    const converted = SpriteConverterTexturePackerPixiJs.convert(spriteImg, spriteData, /^capguy/);
    const index = {
      'walk': [
        'capguy/walk/0001.png',
        'capguy/walk/0002.png',
        'capguy/walk/0003.png',
        'capguy/walk/0004.png',
        'capguy/walk/0005.png',
        'capguy/walk/0006.png',
        'capguy/walk/0007.png',
        'capguy/walk/0008.png'
      ]
    };
    const sprite = new SpriteSheet(converted.source, converted.frames, index);
    this._cache.add('guywalk.sprite', sprite);

    this._createChild(BgView, { layer: 'stage' });

    this._game.on('new-player', (player) => {
      this._player = player;
      this._createChild(PlayerView, { layer: 'stage' }, player, cache);
    });
  }

  _preUpdate () {
    if (!this._wave) {
      this._wave = Wave.sine(this._time.t, 0, Math.PI / 4, 5000);
    }

    const oscillatingNumber = this._wave(this._time);
    this._viewport.setRotation(oscillatingNumber);
    this._viewport.setZoom(1 - Math.abs(oscillatingNumber / 2));
  }
}

export {
  GameView
};
