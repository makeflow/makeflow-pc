import {BrowserWindow, Menu} from 'electron';
import {appControl} from './app-control';
import {
  ENDPOINT,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  UA,
  WINDOW_TITLE,
} from './config';
import {image} from './resouces';
import {switchPlatform} from './utils';

export function createMainWindow(): void {
  const iconPath = switchPlatform({
    win32: image.logo.ico,
    darwin: image.logoMac.png,
  });

  const mainWin = new BrowserWindow({
    minWidth: MIN_WINDOW_WIDTH,
    minHeight: MIN_WINDOW_HEIGHT,
    title: WINDOW_TITLE,
    icon: iconPath,
    show: false,
  });

  mainWin.once('ready-to-show', () => {
    mainWin.center();
    mainWin.show();
  });

  mainWin.on('close', hideOnClose);

  mainWin.loadURL(ENDPOINT, {
    userAgent: UA,
  });

  Menu.setApplicationMenu(null);

  appControl.mainWin = mainWin;
}

function hideOnClose(event: Electron.Event): void {
  event.preventDefault();
  appControl.hideMainWin();
}
