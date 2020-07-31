import path from 'path';
import {getContentString, root, switchPlatform} from '../utils';

const RESOURCES_PATH = root('resources');

class Resources {
  images = {
    tray: switchPlatform({
      win32: this.getImagePath('logo.ico'),
      darwin: this.getImagePath('mac-tray-Template.png'),
    }),

    windowIcon: switchPlatform({
      win32: this.getImagePath('logo.ico'),
      darwin: this.getImagePath('mac-tray-Template.png'),
    }),
  };

  css = {
    common: this.getCSS('common.css'),
    platform: switchPlatform({
      win32: this.getCSS('win.css'),
      darwin: this.getCSS('mac.css'),
    }),
  };

  html = {
    win: {
      titlebar: this.getHTML('win-titlebar.html'),
    },
  };

  private getImagePath(filename: string): string {
    return path.join(RESOURCES_PATH, 'image', filename);
  }

  private getCSS(filename: string): string {
    let filepath = path.join(RESOURCES_PATH, 'css', filename);
    return getContentString(filepath);
  }

  private getHTML(filename: string): string {
    let filepath = path.join(RESOURCES_PATH, 'html', filename);
    return getContentString(filepath);
  }
}

export const resources = new Resources();
