import {app} from 'electron';
import {appControl} from '../app-control';

const win = appControl.getMainWindow();

app.on('activate', () => appControl.showMainWindow());

app.once('before-quit', () => {
  appControl.shouldExitOnMacOS = true;
});

win.on('close', event => {
  if (!appControl.shouldExitOnMacOS) {
    event.preventDefault();
    appControl.hideMainWindow();
  } else {
    appControl.exit();
  }
});
