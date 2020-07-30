import path from 'path';
import {switchPlatform} from '../utils';

const RESOURCES_PATH = path.resolve(__dirname, '../../../resources');

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

  js = {
    preload: this.getJsPath('preload.js'),
  };

  private getImagePath(filename: string): string {
    return path.join(RESOURCES_PATH, 'image', filename);
  }

  private getJsPath(filename: string): string {
    return path.join(RESOURCES_PATH, 'js', filename);
  }
}

export const resources = new Resources();
