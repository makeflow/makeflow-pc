import commonCss from '@resources/css/common.css';
import macCss from '@resources/css/mac.css';
import winCss from '@resources/css/win.css';
import goBackButtonHtml from '@resources/html/go-back-button.html';
import winTitlebarHtml from '@resources/html/win-titlebar.html';
import macTrayTemplatePng from '@resources/image/icon-tray-Template.png';
import '@resources/image/icon-tray-Template@2x.png';
import logoIco from '@resources/image/logo.ico';
import {switchPlatform} from '@src/utils';

export const resources = {
  images: {
    tray: switchPlatform({
      win32: logoIco,
      darwin: macTrayTemplatePng,
    }),

    windowIcon: switchPlatform({
      win32: logoIco,
      darwin: macTrayTemplatePng,
    }),
  },

  css: {
    common: commonCss,
    platform: switchPlatform({
      win32: winCss,
      darwin: macCss,
    }),
  },

  html: {
    win: {
      titlebar: winTitlebarHtml,
    },
    common: {
      goBackButton: goBackButtonHtml,
    },
  },
};
