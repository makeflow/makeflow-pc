import path from 'path';
import {switchPlatform} from '../utils';
import {RESOURCES_PATH} from './path';

class Images {
  tray = switchPlatform({
    win32: this.getImagePath('logo.ico'),
    darwin: this.getImagePath('logo-mac-32.png'),
  });

  windowIcon = switchPlatform({
    win32: this.getImagePath('logo.ico'),
    darwin: this.getImagePath('logo-mac-32.png'),
  });

  private getImagePath(filename: string): string {
    return path.join(RESOURCES_PATH, 'image', filename);
  }
}

export const images = new Images();
