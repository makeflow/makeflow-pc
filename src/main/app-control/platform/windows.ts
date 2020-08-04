import {appControl} from '../app-control';
import {recordFixedEventHandler} from '../browser-window-events';

const tray = appControl.getTray();
const win = appControl.getMainWindow();

tray.on('double-click', () => appControl.showMainWindow());

function onClose(event: Electron.Event): void {
  event.preventDefault();
  appControl.hideMainWindow();
}

win.on('close', onClose);

recordFixedEventHandler(win, 'close', onClose);
