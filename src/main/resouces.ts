import path from 'path';

const RESOURCES_PATH = path.resolve(__dirname, '../../resources');

function getImagePath(filename: string): string {
  return path.join(RESOURCES_PATH, 'image', filename);
}

export const image = {
  logo: {
    ico: getImagePath('logo.ico'),
    png: getImagePath('logo.png'),
  },
  logoMac: {
    png: getImagePath('logo-mac.png'),
  },
};
