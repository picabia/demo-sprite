import { View, Wave, SpriteSheet, SpriteConverterTexturePackerPixiJs } from '@picabia/picabia';

import { PlayerView } from './player';
import { BgView } from './bg';

class GameView extends View {
  _constructor (game, cache) {
    this._game = game;
    this._cache = cache;
    this._camera = this._vm.getViewport('camera');

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

    this._createChild(BgView, [], '2d', 'camera', 'layer-1');

    this._game.on('new-player', (player) => {
      this._player = player;
      this._createChild(PlayerView, [player, cache], '2d', 'camera', 'layer-1');
    });
  }

  _preRender (delta, timestamp) {
    if (!this._wave) {
      this._wave = Wave.sine(timestamp, 0, Math.PI / 4, 5000);
    }

    const oscillatingNumber = this._wave(timestamp);
    this._camera.setRotation(oscillatingNumber);
    this._camera.setZoom(1 - Math.abs(oscillatingNumber / 2));
  }
}

export {
  GameView
};
