import {resources} from '../../resources';
import {htmlToElement, runAfterDOMContentLoaded} from '../../utils';
import {MakeflowEvents} from '../event';

let windowsTitlebar = htmlToElement(resources.html.win.titlebar);

let minimizeBtn = windowsTitlebar.querySelector(
  '.minimize',
) as HTMLButtonElement;

let maximizeBtn = windowsTitlebar.querySelector(
  '.maximize',
) as HTMLButtonElement;

let restoreBtn = windowsTitlebar.querySelector('.restore') as HTMLButtonElement;
restoreBtn.style.display = 'none';

let closeBtn = windowsTitlebar.querySelector('.close') as HTMLButtonElement;

windowsTitlebar.addEventListener('click', event => {
  let {target} = event;

  if (!target) {
    return;
  }

  let node = target as Node;

  if (node.nodeName !== 'BUTTON') {
    return;
  }

  let button = node as HTMLButtonElement;
  let win = window.electron.window;

  if (button === minimizeBtn) {
    win.minimize();
  } else if (button === maximizeBtn) {
    win.maximize();
  } else if (button === restoreBtn) {
    win.restore();
  } else if (button === closeBtn) {
    win.close();
  }
});

runAfterDOMContentLoaded(() => {
  let win = window.electron.window;

  win.on('maximize', () => {
    maximizeBtn.style.display = 'none';
    restoreBtn.style.removeProperty('display');
  });

  win.on('unmaximize', () => {
    restoreBtn.style.display = 'none';
    maximizeBtn.style.removeProperty('display');
  });
});

export function insertWindowTitlebar(): void {
  window.addEventListener(MakeflowEvents.DoneLoadSpinning, () => {
    let appRoot = document.getElementById('app')!;

    if (appRoot.contains(windowsTitlebar)) {
      return;
    }

    let header = appRoot.querySelector('.header');

    if (!header) {
      return;
    }

    header.insertAdjacentElement('beforebegin', windowsTitlebar);
  });
}
