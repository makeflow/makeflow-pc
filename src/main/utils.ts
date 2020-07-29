export function isWindows(cb?: () => void): boolean {
  if (process.platform === 'win32') {
    cb?.();
    return true;
  }
  return false;
}

export function isMac(cb?: () => void): boolean {
  if (process.platform === 'darwin') {
    cb?.();
    return true;
  }
  return false;
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
