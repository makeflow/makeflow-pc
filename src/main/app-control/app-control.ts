import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  MenuItemConstructorOptions,
  Tray,
} from 'electron';
import {resources} from '../../resources';
import {src, whenMacOS, whenWindows} from '../../utils';
import {
  ENDPOINT,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  TRAY_TOOLTIP,
  UA,
  WINDOW_TITLE,
} from '../config';

class AppControl {
  private mainWindow!: BrowserWindow;

  private tray!: Tray;

  private browserWindowConfig: BrowserWindowConstructorOptions = {
    show: false,
    height: MIN_WINDOW_HEIGHT,
    width: MIN_WINDOW_WIDTH,
    minHeight: MIN_WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    title: WINDOW_TITLE,
    icon: resources.images.windowIcon,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: {x: 7, y: 31},
    fullscreenWindowTitle: true,
    backgroundColor: '#FFF',
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: src('renderer/preload.js'),
    },
  };

  private trayTemplate: MenuItemConstructorOptions[] = [
    {label: '显示主界面', click: () => this.showMainWindow()},
    {label: '退出', click: () => this.exit()},
  ];

  shouldExitOnMacOS = false;

  run() {
    this.createMainWindow();
    this.createTray();

    whenMacOS(() => import('./platform/mac'));
    whenWindows(() => import('./platform/windows'));

    if (!app.isPackaged) {
      this.mainWindow.webContents.openDevTools();
    }
  }

  getMainWindow(): BrowserWindow {
    return this.mainWindow;
  }

  getTray(): Tray {
    return this.tray;
  }

  exit(): void {
    delete this.mainWindow;
    delete this.tray;
    app.exit(0);
  }

  hideMainWindow(): void {
    this.mainWindow.hide();
  }

  showMainWindow(): void {
    this.mainWindow.show();
  }

  private createMainWindow(): void {
    let win = new BrowserWindow(this.browserWindowConfig);

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
    let tray = new Tray(resources.images.tray);
    tray.setContextMenu(Menu.buildFromTemplate(this.trayTemplate));
    tray.setToolTip(TRAY_TOOLTIP);
    this.tray = tray;
  }
}

export const appControl = new AppControl();
