import {app} from 'electron';

export let ENDPOINT = app.isPackaged
  ? 'https://www.makeflow.com/app/workbench'
  : 'http://localhost:8060/app/workbench';

export const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.122 Safari/537.36';

export const MIN_WINDOW_WIDTH = 1280;

export const MIN_WINDOW_HEIGHT = 800;

export const WINDOW_TITLE = 'Makeflow';

export const TRAY_TOOLTIP = 'Makeflow';
