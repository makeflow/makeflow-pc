import path from 'path';

export function absolute(relativePath: string): string {
  return path.resolve(__dirname, relativePath);
}
