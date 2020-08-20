import {switchDevAndProd} from '@src/utils';

export const ENDPOINT = switchDevAndProd({
  prod: 'https://www.makeflow.com/app/workbench',
  dev: 'http://localhost:8060/app/workbench',
});

export const MIN_WINDOW_WIDTH = 1280;

export const MIN_WINDOW_HEIGHT = 800;

export const WINDOW_TITLE = 'Makeflow';

export const TRAY_TOOLTIP = 'Makeflow';
