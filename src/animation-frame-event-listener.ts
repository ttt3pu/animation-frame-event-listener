/** eventListener type */
type eventType = string;
/** Any unieue ID(use for add/remove) */
type eventId = string;

interface animationFrameProps {
  callback: Function,
  isRunning: boolean,
  eventType: eventType,
};

interface targetElement extends HTMLElement {
  animationFrameEventListener: {
    [key: string]: animationFrameProps,
  },
};

/**
 * Register event props to recieved element.
*/
export const addAnimationFrameEventListener = (
  element: targetElement,
  eventType: eventType,
  eventId: eventId,
  callback: Function,
) => {
  if (
    element.animationFrameEventListener &&
    element.animationFrameEventListener[eventId] &&
    element.animationFrameEventListener[eventId].callback
  ) {
    console.error('Event id is duplicate.');
    return;
  }

  if (!element.animationFrameEventListener) {
    element.animationFrameEventListener = {};
  }

  const newProps = {
    isRunning: false,
    eventType,
    callback: () => {
      if (!element.animationFrameEventListener[eventId].isRunning) {
        element.animationFrameEventListener[eventId].isRunning = true;

        window.requestAnimationFrame(() => {
          callback();

          element.animationFrameEventListener[eventId].isRunning = false;
        });
      }
    },
  };

  element.animationFrameEventListener[eventId] = newProps;
  element.addEventListener(eventType, newProps.callback as EventListener, {passive: true});
};

/**
 * Remove event props to recieved element.
 * @param element event target
 * @param eventId any unique id(use for add/remove)
*/
export const removeAnimationFrameEventListener = (
  element: targetElement,
  eventId: eventId,
) => {
  if (!element.animationFrameEventListener) {
    return;
  }

  const animationFrameProps = element.animationFrameEventListener[eventId];

  if (animationFrameProps) {
    const {callback, eventType} = animationFrameProps;
    element.removeEventListener(eventType, callback as EventListener);
    delete element.animationFrameEventListener[eventId];
  }
};
