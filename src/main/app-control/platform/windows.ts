import {appControl} from '../app-control';

const tray = appControl.getTray();
const win = appControl.getMainWindow();

tray.on('double-click', () => appControl.showMainWindow());

win.on('close', event => {
  event.preventDefault();
  appControl.hideMainWindow();
});
