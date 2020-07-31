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

export function insertCSS(css: string): void {
  runAfterDOMContentLoaded(() => {
    let style = document.createElement('style');
    style.innerHTML = css;
    style.type = 'text/css';
    document.head.append(style);
  });
}

export function runAfterDOMContentLoaded(callback: () => void): void {
  window.addEventListener('DOMContentLoaded', callback, {once: true});
}
