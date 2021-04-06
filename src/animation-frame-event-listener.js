/**
 * Add event.
 * @param {string} element event target
 * @param {string} eventName scroll | resize
 * @param {string} eventId any unique id(use for add/remove)
 * @param {function} callback
 */
export const addAnimationFrameEventListener = (element, eventName, eventId, callback) => {
  if (element[eventId] && element[eventId].callback) {
    console.error('Event id is duplicate.');
  }

  element[eventId] = {};
  element[eventId].isRunning = false;
  element[eventId].callback = () => {
    // 呼び出されるまで何もしない
    if (!element[eventId].isRunning) {
      element[eventId].isRunning = true;

      // 描画する前のタイミングで呼び出してもらう
      element.requestAnimationFrame(() => {
        callback();

        element[eventId].isRunning = false;
      });
    }
  };

  element.addEventListener(eventName, element[eventId].callback);
};

/**
 * Remove event.
 * @param {string} element event target
 * @param {string} eventName scroll | resize
 * @param {string} eventId any unique id(use for add/remove)
*/
export const removeAnimationFrameEventListener = (element, eventName, eventId) => {
  if (element[eventId] && element[eventId].callback) {
    element.removeEventListener(eventName, element[eventId].callback);
    element[eventId] = {};
  }
};
