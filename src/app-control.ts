import {app, BrowserWindow, Tray} from 'electron';

type AppControl = {
  mainWin: BrowserWindow;
  tray: Tray;
  exit: () => void;
  hideMainWin: () => void;
  showMainWin: () => void;
};

export const appControl = {
  exit: () => {
    delete appControl.mainWin;
    delete appControl.tray;
    app.exit(0);
  },

  hideMainWin: () => {
    appControl.mainWin.hide();
  },

  showMainWin: () => {
    appControl.mainWin.show();
  },
} as AppControl;
