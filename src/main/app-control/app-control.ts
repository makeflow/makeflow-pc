import {
  ENDPOINT,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  TRAY_TOOLTIP,
  WINDOW_TITLE,
} from '@src/main/config';
import {resources} from '@src/resources';
import {SharedGlobalVars} from '@src/types/shared-var';
import {absolute, getHostFromUrl, whenMacOS, whenWindows} from '@src/utils';
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  MenuItemConstructorOptions,
  Tray,
} from 'electron';
import logger from 'electron-log';
import {autoUpdater} from 'electron-updater';

logger.transports.file.level = 'info';
autoUpdater.logger = logger;

class AppControl {
  private primaryInstance = app.requestSingleInstanceLock();

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
      // this is the path of preload.js after being built by webpack.
      preload: absolute('../renderer/preload.js'),
    },
  };

  private trayTemplate: MenuItemConstructorOptions[] = [
    {label: '显示主界面', click: () => this.showMainWindow()},
    {label: '检查更新', click: () => this.checkUpdate()},
    {label: '退出', click: () => this.exit()},
  ];

  private macOSAppMenuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'Makeflow',
      submenu: [
        // {role: 'about'},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'},
      ],
    },
    {
      role: 'editMenu',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
      ],
    },
    {
      role: 'viewMenu',
      submenu: [{role: 'togglefullscreen'}],
    },
    {
      role: 'window',
      submenu: [{role: 'minimize'}, {role: 'close'}],
    },
  ];

  shouldExitOnMacOS = false;

  run() {
    this.makeSingleInstance();

    this.createMainWindow();
    this.createTray();

    this.setSharedGlobalVars();

    import('./platform/common');
    whenMacOS(() => import('./platform/mac'));
    whenWindows(() => import('./platform/windows'));

    if (!app.isPackaged) {
      this.mainWindow.webContents.openDevTools();
    }

    this.checkUpdate();
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

  checkUpdate(): void {
    autoUpdater.checkForUpdatesAndNotify({
      title: 'Makeflow 更新',
      body: 'Makeflow {version} 已下载，将在应用退出后自动安装',
    });
  }

  private makeSingleInstance(): void {
    if (!this.primaryInstance) {
      app.quit();
      return;
    }

    app.on('second-instance', () => this.showMainWindow());
  }

  private createMainWindow(): void {
    let win = new BrowserWindow(this.browserWindowConfig);

    whenWindows(() => Menu.setApplicationMenu(null));
    whenMacOS(() =>
      Menu.setApplicationMenu(
        Menu.buildFromTemplate(this.macOSAppMenuTemplate),
      ),
    );

    win.once('ready-to-show', () => {
      win.center();
      win.show();
    });

    win.loadURL(ENDPOINT);

    this.mainWindow = win;
  }

  private createTray(): void {
    let tray = new Tray(resources.images.tray);
    tray.setContextMenu(Menu.buildFromTemplate(this.trayTemplate));
    tray.setToolTip(TRAY_TOOLTIP);
    this.tray = tray;
  }

  private setSharedGlobalVars(): void {
    Reflect.set(global, SharedGlobalVars.AppHost, getHostFromUrl(ENDPOINT));
  }
}

export const appControl = new AppControl();
