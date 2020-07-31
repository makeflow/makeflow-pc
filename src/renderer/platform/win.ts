import {resources} from '../../resources';
import {htmlToElement} from '../../utils';

const windowsTitlebar = htmlToElement(resources.html.win.titlebar);

export function insertWindowTitlebar(): void {
  let appRoot = document.getElementById('app');

  if (!appRoot) {
    return;
  }

  let appRootObserver = new MutationObserver(() => {
    if (appRoot!.contains(windowsTitlebar)) {
      return;
    }

    let header = appRoot!.querySelector('.header');

    if (!header) {
      return;
    }

    header.insertAdjacentElement('beforebegin', windowsTitlebar);
  });

  appRootObserver.observe(appRoot, {childList: true});
}
