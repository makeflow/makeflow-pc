/**
 * Inject Electron things into web page.
 */

import {remote} from 'electron';
import {resources} from '../resources';
import {insertCSS, whenMacOS, whenWindows} from '../utils';
import {startWatchingMakeflow} from './event';
import {adjustStyleForWindowControl} from './platform/mac';
import {insertWindowTitlebar} from './platform/win';

const currentWindow = remote.getCurrentWindow();

window.electron = {
  window: currentWindow,
};

startWatchingMakeflow();

insertCSS(resources.css.common);
insertCSS(resources.css.platform);

whenMacOS(adjustStyleForWindowControl);
whenWindows(insertWindowTitlebar);
