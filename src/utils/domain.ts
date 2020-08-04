export function getHostFromUrl(url: string): string {
  return new URL(url).host;
}
