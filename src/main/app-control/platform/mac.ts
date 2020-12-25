import {app} from 'electron';
import {appControl} from '../app-control';
import {recordFixedEventHandler} from '../browser-window-events';

const win = appControl.getMainWindow();

app.on('activate', () => appControl.showMainWindow());

app.once('before-quit', () => {
  appControl.shouldExitOnMacOS = true;
});

function onClose(event: Electron.Event): void {
  if (!appControl.shouldExitOnMacOS) {
    event.preventDefault();

    if (win.isFullScreen()) {
      win.once('leave-full-screen', () => {
        appControl.hideMainWindow();
      });

      win.setFullScreen(false);
    } else {
      appControl.hideMainWindow();
    }
  } else {
    appControl.exit();
  }
}

win.on('close', onClose);

recordFixedEventHandler(win, 'close', onClose);
