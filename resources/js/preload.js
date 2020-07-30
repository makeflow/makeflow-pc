/**
 * Inject Electron things to web page.
 */

window.electron = {
  window: require('electron').remote.getCurrentWindow(),
};
