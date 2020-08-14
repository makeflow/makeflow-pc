/**
 * Inject Electron things into web page.
 */

import {MakeflowEvents, startWatchingMakeflow} from '@src/renderer/event';
import {addGoBackButton} from '@src/renderer/platform/common';
import {adjustStyleForWindowControl} from '@src/renderer/platform/mac';
import {insertWindowTitlebar} from '@src/renderer/platform/win';
import {resources} from '@src/resources';
import {whenMacOS, whenWindows} from '@src/utils';
import {webFrame} from 'electron';

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

window.addEventListener(MakeflowEvents.ThirdPartyPage, addGoBackButton);
