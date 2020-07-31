import fs from 'fs';

export function getContentString(path: string): string {
  return fs.readFileSync(path, {encoding: 'utf8'});
}
