import {app, BrowserWindow, Tray} from 'electron';
import {resources} from '../resources';
import {isMac} from '../utils';

class AppControl {
  private mainWin!: BrowserWindow;
  private tray!: Tray;

  run() {
    import('./init/common');
    isMac(() => import('./init/mac'));
  }

  getMainWindow(
    options?: Electron.BrowserWindowConstructorOptions,
  ): BrowserWindow {
    if (!this.mainWin) {
      this.mainWin = new BrowserWindow({...options, show: false});
    }
    return this.mainWin;
  }

  getTray(): Tray {
    if (!this.tray) {
      this.tray = new Tray(resources.images.tray);
    }
    return this.tray;
  }

  exit(): void {
    delete appControl.mainWin;
    delete appControl.tray;
    app.exit(0);
  }

  hideMainWin(): void {
    appControl.mainWin.hide();
  }

  showMainWin(): void {
    this.mainWin.show();
  }
}

export const appControl = new AppControl();
