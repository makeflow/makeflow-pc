import {app, BrowserWindow, Menu, Tray} from 'electron';
import {
  ENDPOINT,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  TRAY_TOOLTIP,
  UA,
  WINDOW_TITLE,
} from '../config';
import {resources} from '../resources';
import {isMac, isWindows} from '../utils';

class AppControl {
  private mainWindow!: BrowserWindow;
  private tray!: Tray;

  shouldExitOnMacOS = false;

  run() {
    app.once('ready', () => {
      this.createMainWindow();
      this.createTray();
      isMac(() => import('./init/mac'));
      isWindows(() => import('./init/windows'));
    });
  }

  getMainWindow(): BrowserWindow {
    return this.mainWindow;
  }

  getTray(): Tray {
    return this.tray;
  }

  exit(): void {
    delete appControl.mainWindow;
    delete appControl.tray;
    app.exit(0);
  }

  hideMainWindow(): void {
    appControl.mainWindow.hide();
  }

  showMainWindow(): void {
    this.mainWindow.show();
  }

  private createMainWindow(): void {
    const win = new BrowserWindow({
      show: false,
      height: MIN_WINDOW_HEIGHT,
      width: MIN_WINDOW_WIDTH,
      minHeight: MIN_WINDOW_HEIGHT,
      minWidth: MIN_WINDOW_WIDTH,
      title: WINDOW_TITLE,
      icon: resources.images.windowIcon,
    });

    win.once('ready-to-show', () => {
      win.center();
      win.show();
    });

    win.loadURL(ENDPOINT, {
      userAgent: UA,
    });

    Menu.setApplicationMenu(null);

    this.mainWindow = win;
  }

  private createTray(): void {
    const tray = new Tray(resources.images.tray);

    tray.setContextMenu(
      Menu.buildFromTemplate([
        {label: '显示主界面', click: () => this.showMainWindow()},
        {label: '退出', click: () => this.exit()},
      ]),
    );

    tray.setToolTip(TRAY_TOOLTIP);

    this.tray = tray;
  }
}

export const appControl = new AppControl();
