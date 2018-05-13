import { Container, Frame, ViewManager, Viewport, CanvasLayer2d, CanvasRenderer2d, KeyboardInput } from '@picabia/picabia';

import { GameModel } from './model/game';
import { GameView } from './view/game';

class Application {
  constructor (dom, cache) {
    this._dom = dom;
    this._cache = cache;

    // -- model

    this._game = new GameModel();

    // -- view

    const containerOptions = {
      mode: 'cover',
      ratio: 4 / 3,
      maxPixels: 1500 * 1500
    };
    this._container = new Container('main', this._dom, containerOptions);

    this._vm = new ViewManager();
    this._vm.addContainer(this._container);

    const viewportOptions = {
      pos: { x: 0, y: 0 }
    };
    this._viewport = new Viewport('camera', viewportOptions);
    this._vm.addViewport(this._viewport);

    this._container.on('resize', (size) => {
      this._viewport.setSize(size);
      if (this._container._ratio >= 1) {
        this._viewport.setScale(size.h / 1000);
        this._viewport.setAngle(Math.PI / 2);
      } else {
        this._viewport.setScale(size.w / 1000);
        this._viewport.setAngle(0);
      }
    });

    this._vm.addRenderer(new CanvasRenderer2d('2d'));

    this._bgLayer = new CanvasLayer2d('layer-1');
    this._vm.addLayer('main', this._bgLayer);

    const rootView = new GameView(this._vm, [this._game, this._cache]);

    // -- input

    this._keyboard = new KeyboardInput();
    this._keyboard.addGroup('move', {
      a: 'left',
      d: 'right'
    }, 'center');
    this._keyboard.addGroup('jump', {
      'space': 'start'
    }, 'stop');

    this._keyboard.on('control', (control) => this._game.input(control));

    // -- start

    this.resize();

    const frameOptions = {
      freeze: true,
      maxDelta: 20,
      interval: false,
      intervalMs: 1000 / 50
    };
    this._frame = new Frame(frameOptions);
    this._frame.on('update', (delta, timestamp) => this._game.update(delta, timestamp));
    this._frame.on('render', (delta, timestamp) => this._vm.render(rootView, delta, timestamp));
    this._frame.start();
  }

  resize () {
    this._container.resize();
  }
}

export {
  Application
};
