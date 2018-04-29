import { Container, Frame, ViewManager, Viewport, CanvasLayer2d, CanvasRenderer2d, KeyboardInput } from '@picabia/picabia';

import { GameModel } from './model/game';
import { GameView } from './view/game';

class Application {
  constructor (dom) {
    this._dom = dom;

    // -- model

    this._model = new GameModel();

    // -- view

    const containerOptions = {
      mode: 'contain',
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
      this._viewport.setScale(1);
    });

    this._vm.addRenderer(new CanvasRenderer2d('2d'));

    this._bgLayer = new CanvasLayer2d('layer-1');
    this._vm.addLayer('main', this._bgLayer);

    this._view = this._vm.createView(GameView, [this._model], '2d', 'layer-1', 'camera');

    // -- input

    this._keyboard = new KeyboardInput();
    this._keyboard.addGroup('move', {
      a: 'left',
      d: 'right'
    }, 'center');
    this._keyboard.addGroup('jump', {
      'space': 'start'
    }, 'stop');

    this._keyboard.on('control', (control) => this._model.input(control));

    // -- start

    this.resize();

    const frameOptions = {
      freeze: true,
      maxDelta: 20,
      interval: false,
      intervalMs: 1000 / 50
    };
    this._frame = new Frame(frameOptions);
    this._frame.on('update', (delta, timestamp) => this._model.update(delta, timestamp));
    this._frame.on('render', (delta, timestamp) => this._vm.render(delta, timestamp));
    this._frame.start();
  }

  resize () {
    this._container.resize();
  }
}

export {
  Application
};
