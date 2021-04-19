# animation-frame-event-listener

A util that uses window.requestAnimationFrame to better performance of scroll/resize event listeners.

## usage

```js
import {addAnimationFrameEventListener, removeAnimationFrameEventListener} from 'animation-frame-event-listener';

const exampleCallBack = () => {
  console.log(window.scrollY);
};

// addEvent
addAnimationFrameEventListener(window, 'scroll', 'anyUniqueIdForEvent', exampleCallBack);

// removeEvent
removeAnimationFrameEventListener(window, 'anyUniqueIdForEvent');
```