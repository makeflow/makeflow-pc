import {remote} from 'electron';
import {SharedGlobalVars} from '../types/shared-var';

export enum MakeflowEvents {
  LoadSpinning = 'load-spinning',
  DoneLoadSpinning = 'done-load-spinning',
  ThirdPartyPage = 'third-party-page',
}

let isLoadSpinning = false;

/**
 * This will start a MutationObserver to watch
 * specific dom changes under document for knowning
 * what's happening in Makeflow web, and then dispatch
 * custom events on window object for global useage.
 */
export function startWatchingMakeflow(): void {
  if (isInApp()) {
    let observer = new MutationObserver(() => {
      if (document.getElementById('loading-circle-container')) {
        if (!isLoadSpinning) {
          isLoadSpinning = true;
          window.dispatchEvent(new CustomEvent(MakeflowEvents.LoadSpinning));
        }
      } else {
        if (isLoadSpinning) {
          isLoadSpinning = false;
          window.dispatchEvent(
            new CustomEvent(MakeflowEvents.DoneLoadSpinning),
          );
        }
      }
    });

    observer.observe(document, {childList: true, subtree: true});
  }

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      if (!isInApp()) {
        window.dispatchEvent(new CustomEvent(MakeflowEvents.ThirdPartyPage));
      }
    },
    {once: true},
  );
}

const appHost: string = remote.getGlobal(SharedGlobalVars.AppHost);

function isInApp(): boolean {
  return location.host === appHost;
}
