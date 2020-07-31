/**
 * Inject Electron things into web page.
 */

import {remote} from 'electron';
import {resources} from '../resources';
import {insertCSS, whenMacOS} from '../utils';
import {startWatchMakeflowDOMChange} from './event';
import {adjustStyleForWindowControl} from './mac';

const currentWindow = remote.getCurrentWindow();

window.electron = {
  window: currentWindow,
};

startWatchMakeflowDOMChange();

insertCSS(resources.css.common);
insertCSS(resources.css.platform);

whenMacOS(adjustStyleForWindowControl);
