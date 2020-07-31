import path from 'path';

export const ROOT_PATH = path.resolve(__dirname, '../../');
export const SRC_PATH = path.resolve(__dirname, '../');

export function src(relativePath: string): string {
  return path.join(SRC_PATH, relativePath);
}

export function root(relativePath: string): string {
  return path.join(ROOT_PATH, relativePath);
}
