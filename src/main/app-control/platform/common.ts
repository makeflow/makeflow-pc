import {appControl} from '../app-control';

const win = appControl.getMainWindow();

win.prependListener('close', () => {
  win.blur();
});
