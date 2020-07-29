import {Menu} from 'electron';
import {appControl} from './app-control';
import {
  ENDPOINT,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  UA,
  WINDOW_TITLE,
} from './config';
import {resources} from './resources/resources';

export function setMainWindow(): void {
  const win = appControl.getMainWindow({
    minHeight: MIN_WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    title: WINDOW_TITLE,
    icon: resources.images.windowIcon,
  });

  win.once('ready-to-show', () => {
    win.center();
    win.show();
  });

  win.on('close', hideOnClose);

  win.loadURL(ENDPOINT, {
    userAgent: UA,
  });

  Menu.setApplicationMenu(null);
}

function hideOnClose(event: Electron.Event): void {
  event.preventDefault();
  appControl.hideMainWin();
}
