type SwitchPlatformCases<T> = {
  [platform in typeof process.platform]?: T;
};
