import {app} from 'electron';
import {createTray} from './tray';
import {createMainWindow} from './window';

app.on('ready', main);

function main(): void {
  createMainWindow();
  createTray();
}
