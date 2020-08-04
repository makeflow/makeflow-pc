/**
 * This is a hack, for clearing event handlers registered
 * in renderer process by remote module. It protects some
 * crucial event handlers from being removed.
 */

import {BrowserWindow} from 'electron';

const fixedEventMap = new WeakMap<
  BrowserWindow,
  Map<string | symbol, Function[]>
>();

export const CLEAR_ALL_EXCEPT_FIXED = 'browser-window:clear-all-except-fixed';

const browserWindowRemoveAllListeners =
  BrowserWindow.prototype.removeAllListeners;

BrowserWindow.prototype.removeAllListeners = function (
  event?: string | symbol,
) {
  if (event === CLEAR_ALL_EXCEPT_FIXED) {
    clearEventListenersExceptFixed(this);
  } else {
    browserWindowRemoveAllListeners.call(this, event);
  }

  return this;
};

export function recordFixedEventHandler(
  win: BrowserWindow,
  eventName: string,
  handlerFunc: Function,
): void {
  if (!fixedEventMap.has(win)) {
    fixedEventMap.set(win, new Map());
  }

  let fixedHandlerMap = fixedEventMap.get(win)!;
  let fixedHandlers = fixedHandlerMap.get(eventName);

  if (!fixedHandlers) {
    fixedHandlers = [];
    fixedHandlerMap.set(eventName, fixedHandlers);
  }

  fixedHandlers.push(handlerFunc);
}

export function clearEventListenersExceptFixed(win: BrowserWindow): void {
  let fixedHandlerMap = fixedEventMap.get(win);

  if (!fixedHandlerMap) {
    win.removeAllListeners();
    return;
  }

  let eventNames = win.eventNames();

  for (let eventName of eventNames) {
    let listeners = win.listeners(eventName);
    let fixedHandlers = fixedHandlerMap.get(eventName);

    if (!fixedHandlers) {
      win.removeAllListeners(eventName);
      continue;
    }

    let listenersToMove = listeners.filter(
      listener => !fixedHandlers!.includes(listener),
    );

    listenersToMove.forEach(listener => {
      win.removeListener(eventName as any, listener as any);
    });
  }
}
