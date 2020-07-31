import {app} from 'electron';
import {appControl} from './app-control';

app.once('ready', () => appControl.run());
