export function isWindows(): boolean {
  return process.platform === 'win32';
}

export function isMac(): boolean {
  return process.platform === 'darwin';
}

type Cases<T> = {
  [platform in typeof process.platform]?: T;
};

export function switchPlatform<T>(cases: Cases<T>): T {
  const platform = process.platform;
  if (!cases[platform]) {
    throw new Error(`platform '${platform}' not supported!`);
  }
  return cases[platform]!;
}
