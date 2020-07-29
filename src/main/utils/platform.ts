export function isWindows(callback?: () => void): boolean {
  if (process.platform === 'win32') {
    callback?.();
    return true;
  }
  return false;
}

export function isMac(callback?: () => void): boolean {
  if (process.platform === 'darwin') {
    callback?.();
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
