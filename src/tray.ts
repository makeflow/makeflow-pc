import {Menu, Tray} from 'electron';
import {appControl} from './app-control';
import {image} from './assets';
import {TRAY_TOOLTIP} from './config';

const contextMenu = Menu.buildFromTemplate([
  {label: '显示主界面', click: appControl.showMainWin},
  {label: '退出', click: appControl.exit},
]);

export function createTray(): void {
  const tray = new Tray(image.logo);

  tray.setToolTip(TRAY_TOOLTIP);
  tray.setContextMenu(contextMenu);

  tray.on('double-click', appControl.showMainWin);

  appControl.tray = tray;
}
