export enum MakeflowEvents {
  LoadSpinning = 'load-spinning',
  DoneLoadSpinning = 'done-load-spinning',
}

let isLoadSpinning = false;

/**
 * This will start a MutationObserver to watch
 * specific dom changes under document for knowning
 * what's happening in Makeflow web, and then dispatch
 * custom events on window object for global useage.
 */
export function startWatchMakeflowDOMChange(): void {
  let observer = new MutationObserver(() => {
    if (document.getElementById('loading-circle-container')) {
      if (!isLoadSpinning) {
        isLoadSpinning = true;
        window.dispatchEvent(new CustomEvent(MakeflowEvents.LoadSpinning));
      }
    } else {
      if (isLoadSpinning) {
        isLoadSpinning = false;
        window.dispatchEvent(new CustomEvent(MakeflowEvents.DoneLoadSpinning));
      }
    }
  });

  observer.observe(document, {childList: true, subtree: true});
}
