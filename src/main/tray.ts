import {Menu, Tray} from 'electron';
import {appControl} from './app-control';
import {TRAY_TOOLTIP} from './config';
import {image} from './resouces';
import {switchPlatform} from './utils';

const contextMenu = Menu.buildFromTemplate([
  {label: '显示主界面', click: appControl.showMainWin},
  {label: '退出', click: appControl.exit},
]);

export function createTray(): void {
  const iconPath = switchPlatform({
    win32: image.logo.ico,
    darwin: image.logoMac.png,
  });

  const tray = new Tray(iconPath);

  tray.setToolTip(TRAY_TOOLTIP);
  tray.setContextMenu(contextMenu);

  tray.on('double-click', appControl.showMainWin);

  appControl.tray = tray;
}
