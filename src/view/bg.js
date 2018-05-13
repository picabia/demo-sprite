import { View } from '@picabia/picabia';

class BgView extends View {
  // -- view

  _render (delta, timestamp) {
    const renderer = this._renderer;

    renderer.moveTo(-500, 0);
    renderer.lineTo(500, 0);
    renderer.stroke();

    renderer.strokeRect(-50, -50, 100, 100);
    renderer.fillRect(-450, -5, 900, 10);
  }
}

export {
  BgView
};
