type SwitchPlatformCases<T> = {
  [platform in typeof process.platform]?: T;
};

type SwitchDevAndProdCases<T> = {
  dev: T;
  prod: T;
};
