/**
 * Inject Electron things into web page.
 */

import {webFrame} from 'electron';
import {resources} from '../resources';
import {whenMacOS, whenWindows} from '../utils';
import {startWatchingMakeflow} from './event';
import {adjustStyleForWindowControl} from './platform/mac';
import {insertWindowTitlebar} from './platform/win';

window.electron = {
  get window() {
    let win = require('electron').remote.getCurrentWindow();

    window.addEventListener(
      'beforeunload',
      () => win.removeAllListeners('browser-window:clear-all-except-fixed'),
      {once: true},
    );

    return win;
  },
};

// for jquery used by wechat login.
delete window.exports;
delete window.module;

startWatchingMakeflow();

webFrame.insertCSS(resources.css.common);
webFrame.insertCSS(resources.css.platform);

whenMacOS(adjustStyleForWindowControl);
whenWindows(insertWindowTitlebar);
