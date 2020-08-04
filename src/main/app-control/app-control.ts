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
  WINDOW_TITLE,
} from '../config';

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
      preload: src('renderer/preload.js'),
    },
  };

  private trayTemplate: MenuItemConstructorOptions[] = [
    {label: '显示主界面', click: () => this.showMainWindow()},
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

    import('./platform/common');
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
}

export const appControl = new AppControl();
