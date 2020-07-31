/**
 * Inject Electron things into web page.
 */

import {remote} from 'electron';
import {resources} from '../resources';
import {insertCSS, whenMacOS} from '../utils';
import {startWatchingMakeflowDOMChange} from './event';
import {adjustStyleForWindowControl} from './platform/mac';

const currentWindow = remote.getCurrentWindow();

window.electron = {
  window: currentWindow,
};

startWatchingMakeflowDOMChange();

insertCSS(resources.css.common);
insertCSS(resources.css.platform);

whenMacOS(adjustStyleForWindowControl);
