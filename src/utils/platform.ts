export function whenWindows(callback: () => void): void {
  if (process.platform === 'win32') {
    callback();
  }
}

export function whenMacOS(callback: () => void): void {
  if (process.platform === 'darwin') {
    callback();
  }
}

export function switchPlatform<T>(cases: SwitchPlatformCases<T>): T {
  const platform = process.platform;
  if (typeof cases[platform] === 'undefined') {
    throw new Error(`platform '${platform}' not supported!`);
  }
  return cases[platform]!;
}
