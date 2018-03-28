// based on ractive-event-tap
const distance = 5;
const timeout = 400;
const between = 250;

export default function makeClick(opts = {}) {
  return function setup({ Ractive, instance }) {
    instance.events[opts.name || `${opts.count || ''}clicks`] = function clicks(node, fire, options) {
      const o = Object.assign({}, opts, options);
      let handler;
      if (handler = node.__r_clicks__) {
        handler.subscribe(o.count || 1, !!o.hold, fire);
      } else {
        handler = new Handler(Ractive.getContext(node), o.delay || between, o.bubble || false);
        node.__r_clicks__ = handler;
        handler.subscribe(o.count || 1, !!o.hold, fire);
      }

      return { teardown() { handler.unsubscribe(o.count || 1, !!o.hold, fire); } };
    }
  }
}

export const click = makeClick({ name: 'click', count: 1 });
export const dblclick = makeClick({ name: 'dblclick', count: 2 });
export const trpclick = makeClick({ name: 'trpclick', count: 3 });

class Handler {
  constructor(context, delay, bubble) {
    this.context = context;
    this.node = context.node;
    this.delay = delay;
    this.fires = {};
    this.refs = 0;
    this.bubble = bubble;

    this.bind();
  }

  subscribe(count, hold, fire) {
    (this.fires[`${count},${hold}`] || (this.fires[`${count},${hold}`] = [])).push(fire);
    this.refs++;
  }

  unsubscribe(count, hold, fire) {
    const fires = this.fires[`${count},${hold}`] || [];
    fires.splice(fires.indexOf(fire), 1);
    this.refs--;
    if (!this.refs) this.teardown();
  }

  bind() {
    // listen for mouse/pointer events...
    if (window.PointerEvent || window.navigator.pointerEnabled) {
      this.context.listen('pointerdown', handleMousedown);
    } else if (window.navigator.msPointerEnabled) {
      this.context.listen('MSPointerDown', handleMousedown);
    } else {
      this.context.listen('mousedown', handleMousedown);

      // ...and touch events
      this.context.listen('touchstart', handleTouchstart);
    }

    // native buttons, anchors, and button/submit input elements, should fire a tap event
    // when the space key is pressed
    if (this.node.tagName === 'A' || this.node.tagName === 'BUTTON' || this.node.type === 'button' || this.node.type === 'submit') {
      this.context.listen('focus', handleFocus);
    }
  }

  fire(event, x, y, hold) {
    if (this.tm) {
      this.tmCount++;
      clearTimeout(this.tm);
    } else {
      this.tmCount = 1;
    }

    const go = () => {
      this.tm = null;
      (this.fires[`${this.tmCount},${!!hold}`] || []).forEach(f => {
        f({ node: this.node, original: event, x, y, hold: !!hold });
      });
    };

    if (hold) go();
    else this.tm = setTimeout(go, this.delay);

    return this.bubble;
  }

  mousedown(event) {
    if (this.preventMousedownEvents) {
      return;
    }

    if (event.which !== undefined && event.which !== 1) {
      return;
    }

    let tm;

    const x = event.clientX;
    const y = event.clientY;

    // This will be null for mouse events.
    const pointerId = event.pointerId;

    const handleMouseup = event => {
      if (event.pointerId != pointerId) {
        return;
      }

      this.fire(event, x, y);
      cancel();
    };

    const handleMousemove = event => {
      if (event.pointerId != pointerId) {
        return;
      }

      if ((Math.abs(event.clientX - x) >= distance) || (Math.abs(event.clientY - y) >= distance)) {
        cancel();
      }
    };

    const cancel = () => {
      if (tm) clearTimeout(tm);
      this.node.removeEventListener('MSPointerUp', handleMouseup, false);
      document.removeEventListener('MSPointerMove', handleMousemove, false);
      document.removeEventListener('MSPointerCancel', cancel, false);
      this.node.removeEventListener('pointerup', handleMouseup, false);
      document.removeEventListener('pointermove', handleMousemove, false);
      document.removeEventListener('pointercancel', cancel, false);
      this.node.removeEventListener('click', handleMouseup, false);
      document.removeEventListener('mousemove', handleMousemove, false);
    };

    if (window.PointerEvent || window.navigator.pointerEnabled) {
      this.node.addEventListener('pointerup', handleMouseup, false);
      document.addEventListener('pointermove', handleMousemove, false);
      document.addEventListener('pointercancel', cancel, false);
    } else if (window.navigator.msPointerEnabled) {
      this.node.addEventListener('MSPointerUp', handleMouseup, false);
      document.addEventListener('MSPointerMove', handleMousemove, false);
      document.addEventListener('MSPointerCancel', cancel, false);
    } else {
      this.node.addEventListener('click', handleMouseup, false);
      document.addEventListener('mousemove', handleMousemove, false);
    }

    tm = setTimeout(() => {
      cancel();
      this.fire(event, x, y, true);
    }, timeout);

    return this.bubble;
  }

  touchdown(event) {
    let tm;
    const touch = event.touches[0];

    const x = touch.clientX;
    const y = touch.clientY;

    const finger = touch.identifier;

    const handleTouchup = event => {
      const touch = event.changedTouches[0];

      if (touch.identifier !== finger) {
        cancel();
        return;
      }

      event.preventDefault(); // prevent compatibility mouse event

      // for the benefit of mobile Firefox and old Android browsers, we need this absurd hack.
      this.preventMousedownEvents = true;
      clearTimeout(this.preventMousedownTimeout);

      this.preventMousedownTimeout = setTimeout(() => {
        this.preventMousedownEvents = false;
      }, 400);

      this.fire(event, x, y);
      cancel();
    };

    const handleTouchmove = event => {
      if (event.touches.length !== 1 || event.touches[0].identifier !== finger) {
        cancel();
      }

      const touch = event.touches[0];
      if ((Math.abs(touch.clientX - x) >= distance) || (Math.abs(touch.clientY - y) >= distance)) {
        cancel();
      }
    };

    const cancel = () => {
      if (tm) clearTimeout(tm);
      this.node.removeEventListener('touchend', handleTouchup, false);
      window.removeEventListener('touchmove', handleTouchmove, false);
      window.removeEventListener('touchcancel', cancel, false);
    };

    this.node.addEventListener('touchend', handleTouchup, false);
    window.addEventListener('touchmove', handleTouchmove, false);
    window.addEventListener('touchcancel', cancel, false);

    tm = setTimeout(() => {
      cancel();
      this.fire(event, x, y, true);
    }, timeout);

    return this.bubble;
  }

  teardown() {
    const ctx = this.context;

    ctx.unlisten('pointerdown', handleMousedown);
    ctx.unlisten('MSPointerDown', handleMousedown);
    ctx.unlisten('mousedown', handleMousedown);
    ctx.unlisten('touchstart', handleTouchstart);
    ctx.unlisten('focus', handleFocus);

    delete this.node.__r_clicks__;
  }
};

function handleMousedown(event) {
  return this.__r_clicks__.mousedown(event);
}

function handleTouchstart(event) {
  return this.__r_clicks__.touchdown(event);
}

function handleFocus() {
  this.addEventListener('keydown', handleKeydown, false);
  this.addEventListener('blur', handleBlur, false);
}

function handleBlur() {
  this.removeEventListener('keydown', handleKeydown, false);
  this.removeEventListener('blur', handleBlur, false);
}

function handleKeydown(event) {
  if (event.which === 32 || event.which === 10 || event.which === 13) { // space/enter key
    return this.__r_clicks__.fire();
  }
}