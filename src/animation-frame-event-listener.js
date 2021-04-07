/**
 * @param {string} element event target
 * @param {string} eventName scroll | resize
 * @param {string} eventId any unique id(use for add/remove)
 * @param {function} callback
*/
export const addAnimationFrameEventListener = (element, eventName, eventId, callback) => {
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
  animationFrameProps.callback = () => {
    if (!animationFrameProps.isRunning) {
      animationFrameProps.isRunning = true;

      element.requestAnimationFrame(() => {
        callback();

        animationFrameProps.isRunning = false;
      });
    }
  };

  element.addEventListener(eventName, animationFrameProps.callback);
};

/**
 * @param {string} element event target
 * @param {string} eventName scroll | resize
 * @param {string} eventId any unique id(use for add/remove)
*/
export const removeAnimationFrameEventListener = (element, eventName, eventId) => {
  if (!element.animationFrameEventListener) {
    return;
  }

  const animationFrameProps = element.animationFrameEventListener[eventId];

  if (
    animationFrameProps &&
    animationFrameProps.callback
  ) {
    element.removeEventListener(eventName, animationFrameProps.callback);
    delete element.animationFrameEventListener[eventId];
  }
};
