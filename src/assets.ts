import path from 'path';

const ASSETS_PATH = path.resolve(__dirname, '../assets');

function createImageAssetPath(filename: string): string {
  return path.join(ASSETS_PATH, 'image', filename);
}

export const image = {
  logo: createImageAssetPath('logo.ico'),
};
