import {runAfterDOMContentLoaded} from '../utils';
import {MakeflowEvents} from './event';

export function adjustStyleForWindowControl(): void {
  changeSidebarStyleOnFullScreen();
  hideWindowButtonOnLoadSpinning();
  addDragAreaToWindowTop();
}

function changeSidebarStyleOnFullScreen(): void {
  let win = window.electron.window;

  win.on('enter-full-screen', () => {
    let sidebar = document.querySelector('.normal-sidebar');

    if (!sidebar) {
      return;
    }

    (sidebar as HTMLDivElement).style.paddingTop = '0';
  });

  win.on('leave-full-screen', () => {
    let sidebar = document.querySelector('.normal-sidebar');

    if (!sidebar) {
      return;
    }

    (sidebar as HTMLDivElement).style.removeProperty('padding-top');
  });
}

function hideWindowButtonOnLoadSpinning(): void {
  let win = window.electron.window;

  window.addEventListener(MakeflowEvents.LoadSpinning, () => {
    win.setWindowButtonVisibility(false);
  });

  window.addEventListener(MakeflowEvents.DoneLoadSpinning, () => {
    win.setWindowButtonVisibility(true);
  });
}

function addDragAreaToWindowTop(): void {
  runAfterDOMContentLoaded(() => {
    let dragArea = document.createElement('div');
    dragArea.classList.add('electron-drag');
    document.body.append(dragArea);
  });
}
