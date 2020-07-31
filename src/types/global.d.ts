import {BrowserWindow} from 'electron';

declare interface Electron {
  window: BrowserWindow;
}

declare global {
  interface Window {
    electron: Electron;
  }
}
