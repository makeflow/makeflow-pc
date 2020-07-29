import {app} from 'electron';
import {appControl} from '..';

app.on('activate', appControl.showMainWin);
