import {app} from 'electron';

export let ENDPOINT = app.isPackaged
  ? 'https://www.makeflow.com/app/workbench'
  : 'http://localhost:8080/app/workbench';

export const MIN_WINDOW_WIDTH = 1280;

export const MIN_WINDOW_HEIGHT = 800;

export const WINDOW_TITLE = 'Makeflow';

export const TRAY_TOOLTIP = 'Makeflow';
