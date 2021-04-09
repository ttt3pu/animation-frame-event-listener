# animation-frame-event-listener

Methods for reduce load on scroll/resize eventListener.

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