import {app} from 'electron';
import {setMainWindow} from '../../main-window';
import {setTray} from '../../tray';

app.on('ready', () => {
  setMainWindow();
  setTray();
});
