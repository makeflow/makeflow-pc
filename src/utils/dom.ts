export function htmlToElement(html: string): Element {
  let template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  let element = template.content.firstElementChild;

  if (!element) {
    throw new Error(`parse html error! html: ${html}`);
  }

  return element;
}

export function runAfterDOMContentLoaded(callback: () => void): void {
  window.addEventListener('DOMContentLoaded', callback, {once: true});
}

export function runAfterLoad(callback: () => void): void {
  window.addEventListener('load', callback, {once: true});
}
