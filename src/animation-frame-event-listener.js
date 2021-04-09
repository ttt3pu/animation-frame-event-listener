/**
 * @param {string} element event target
 * @param {string} eventType scroll | resize
 * @param {string} eventId any unique id(use for add/remove)
 * @param {function} callback
*/
export const addAnimationFrameEventListener = (element, eventType, eventId, callback) => {
  /**
   * Register event props to recieved element.
   *
   * element.animationFrameEventListener = {
   *   hogeEvent: {
   *    callback: () => ...,
   *    isRunning: boolean,
   *   },
   *   hugaEvent: {
   *    callback: () => ...,
   *    isRunning: boolean,
   *   },
   *   ...
   * }
   */

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

  element.animationFrameEventListener[eventId] = {};

  const animationFrameProps = element.animationFrameEventListener[eventId];

  animationFrameProps.isRunning = false;
  animationFrameProps.eventType = eventType;
  animationFrameProps.callback = () => {
    if (!animationFrameProps.isRunning) {
      animationFrameProps.isRunning = true;

      element.requestAnimationFrame(() => {
        callback();

        animationFrameProps.isRunning = false;
      });
    }
  };

  element.addEventListener(eventType, animationFrameProps.callback);
};

/**
 * @param {string} element event target
 * @param {string} eventId any unique id(use for add/remove)
*/
export const removeAnimationFrameEventListener = (element, eventId) => {
  if (!element.animationFrameEventListener) {
    return;
  }

  const animationFrameProps = element.animationFrameEventListener[eventId];

  if (animationFrameProps) {
    const {callback, eventType} = animationFrameProps;
    element.removeEventListener(eventType, callback);
    delete element.animationFrameEventListener[eventId];
  }
};
