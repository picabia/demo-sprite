import { View, Wave } from '@picabia/picabia';

class GameView extends View {
  _constructor (game) {
    this._game = game;
    this._camera = this._vm.getViewport('camera');

    // this._vm.createView(BackgroundView, [], '2d', 'layer-1', 'camera');

    this._game.on('new-player', (player) => {

    });
  }

  render (delta, timestamp) {
    if (!this._wave) {
      this._wave = Wave.sine(timestamp, 0, Math.PI / 4, 5000);
    }

    const oscillatingNumber = this._wave(timestamp);
    this._camera.setAngle(oscillatingNumber);

    const renderer = this._renderer;

    renderer.fillRect(0, 0, 10, 10);
    renderer.fillRect(50, 50, 10, 10);
  }
}

export {
  GameView
};
