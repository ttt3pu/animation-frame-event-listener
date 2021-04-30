type eventType = 'scroll' | 'resize';

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
 * @param element event target
 * @param eventType scroll | resize
 * @param eventId any unique id(use for add/remove)
 * @param callback
*/
export const addAnimationFrameEventListener = (
  element: targetElement,
  eventType: eventType,
  eventId: string,
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
  eventId: string
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
