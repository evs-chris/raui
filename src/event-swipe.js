// based on ractive-event-tap
const abs = Math.abs;

export default function makeSwipe(opts) {
  const init = Object.assign({}, { distance: 150, flick: 200, threshold: 0.2 }, opts);
  return function setup({ Ractive, instance }) {
    instance.events[opts.name || `swipe${opts.direction || ''}`] = function swipe(node, fire, options = {}) {
      let handler;
      const opts = Object.assign({}, { direction: 'right' }, init, options);
      opts.fire = fire;
      if (handler = node.__r_swipes__) {
        handler.subscribe(opts);
      } else {
        handler = new Handler(Ractive.getContext(node));
        node.__r_swipes__ = handler;
        handler.subscribe(opts);
      }

      return { teardown() { handler.unsubscribe(fire); } };
    }
  }
}

export const left = makeSwipe({ direction: 'left' });
export const right = makeSwipe({ direction: 'right' });
export const up = makeSwipe({ direction: 'up' });
export const down = makeSwipe({ direction: 'down' });

class Handler {
  constructor(context) {
    this.context = context;
    this.node = context.node;
    this.fires = [];

    this.bind();
  }

  subscribe(opts) {
    this.fires.push(opts);
    this.hasBinding = !!this.fires.find(f => f.bindPx || f.bind);
    this.hasBounds = !!this.fires.find(f => f.maxX != null || f.maxY != null || f.minX != null || f.minY != null);
  }

  unsubscribe(fire) {
    this.fires = this.fires.filter(f => f.fire !== fire);
    if (!this.fires.length) this.teardown();
    this.hasBinding = !!this.fires.find(f => f.bindPx || f.bind);
    this.hasBounds = !!this.fires.find(f => f.maxX != null || f.maxY != null || f.minX != null || f.minY != null);
  }

  bind() {
    // listen for mouse/pointer events...
    if (window.PointerEvent || window.navigator.pointerEnabled) {
      this.context.listen('pointerdown', handleMousedown);
    } else if (window.navigator.msPointerEnabled) {
      this.context.listen('MSPointerDown', handleMousedown);
    } else {
      this.context.listen('mousedown', handleMousedown);
      this.context.listen('dragstart', handleDragstart);

      // ...and touch events
      this.context.listen('touchstart', handleTouchstart);
    }
  }

  fire(event, startx, starty, endx, endy, duration) {
    const node = this.node;
    let fired;

    this.fires.forEach(f => {
      if (!f.active) { f.active = true; return; }

      const distx = duration < f.flick ? endx - startx + ((f.flick / duration) * (endx - startx)) : endx - startx;
      const disty = duration < f.flick ? endy - starty + ((f.flick / duration) * (endy - starty)) : endy - starty;
      const threshold = abs(f.threshold <= 0 ? Math.max(distx, disty) : f.threshold < 1 ? f.direction === 'right' || f.direction === 'left' ? f.threshold * distx : f.threshold * disty : f.threshold);
      const dist = f.bindPx;
      const pct = f.bind;

      if (distx > 0 && f.direction === 'right' && distx >= f.distance && abs(disty) <= threshold) {
        f.fire({ node, event });
        fired = true;
      } else if (distx < 0 && f.direction === 'left' && -distx >= f.distance && abs(disty) <= threshold) {
        f.fire({ node, event });
        fired = true;
      }

      if (disty > 0 && f.direction === 'down' && disty >= f.distance && abs(distx) <= threshold) {
        f.fire({ node, event });
        fired = true;
      } else if (disty < 0 && f.direction === 'up' && -disty >= f.distance && abs(distx) <= threshold) {
        f.fire({ node, event });
        fired = true;
      }

      if (dist) this.context.set(dist, 0);
      if (pct) this.context.set(pct, 0);
    });

    return fired;
  }

  checkBounds(startx, starty) {
    const rect = this.node.getBoundingClientRect();
    const x = startx - rect.x, y = starty - rect.y;

    this.fires.forEach(f => {
      const { maxX, maxY, minX, minY } = f;
      if (maxX > 0 && x > maxX) { f.active = false; return; }
      if (maxX < 0 && x > rect.width + maxX) { f.active = false; return; }
      if (maxY > 0 && y > maxY) { f.active = false; return; }
      if (maxY < 0 && y > rect.height + maxY) { f.active = false; return; }
      if (minX > 0 && x < minX) { f.active = false; return; }
      if (minX < 0 && x < rect.width - minX) { f.active = false; return; }
      if (minY > 0 && y < minY) { f.active = false; return; }
      if (minY < 0 && y < rect.width - minY) { f.active = false; return; }
      f.active = true;
    });

    return !!this.fires.find(f => f.active);
  }

  updateBindings(startx, starty, endx, endy) {
    this.fires.forEach(f => {
      if (!f.active) return;

      if (!f.bindPx && !f.bind) return;

      const dist = f.bindPx;
      const pct = f.bind;
      const distx = endx - startx;
      const disty = endy - starty;
      const threshold = abs(f.threshold <= 0 ? Math.max(distx, disty) : f.threshold < 1 ? f.direction === 'right' || f.direction === 'left' ? f.threshold * distx : f.threshold * disty : f.threshold);

      if (dist) {
        if (f.direction === 'left') this.context.set(dist, distx < 0 && abs(disty) <= threshold ? -distx : 0);
        else if (f.direction === 'right') this.context.set(dist, distx > 0 && abs(disty) <= threshold ? distx : 0);
        else if (f.direction === 'up') this.context.set(dist, disty < 0 && abs(distx) <= threshold ? -disty : 0);
        else if (f.direction === 'down') this.context.set(dist, disty > 0 && abs(distx) <= threshold ? disty : 0);
      }

      if (pct) {
        if (f.direction === 'left') this.context.set(pct, distx < 0 && abs(disty) <= threshold ? (-distx / f.distance) * 100 : 0);
        else if (f.direction === 'right') this.context.set(pct, distx > 0 && abs(disty) <= threshold ? (distx / f.distance) * 100 : 0);
        else if (f.direction === 'up') this.context.set(pct, disty < 0 && abs(distx) <= threshold ? (-disty / f.distance) * 100 : 0);
        else if (f.direction === 'down') this.context.set(pct, disty > 0 && abs(distx) <= threshold ? (disty / f.distance) * 100 : 0);
      }
    });
  }

  mousedown(event) {
    if (this.preventMousedownEvents) {
      return;
    }

    if (event.which !== undefined && event.which !== 1) {
      return;
    }

    const start = new Date();
    const x = event.clientX;
    const y = event.clientY;

    if (this.hasBounds && !this.checkBounds(x, y)) return;
 
    // This will be null for mouse events.
    const pointerId = event.pointerId;

    const handleMouseup = event => {
      this.fire(event, x, y, event.clientX, event.clientY, new Date() - start) && event.cancelable !== false && event.preventDefault();
      cancel();
    };

    const handleMousemove = event => {
      if (event.pointerId != pointerId) {
        return;
      }

      if (this.hasBinding) {
        this.updateBindings(x, y, event.clientX, event.clientY);
      }  
    };

    const cancel = () => {
      this.node.removeEventListener('MSPointerUp', handleMouseup, false);
      document.removeEventListener('MSPointerMove', handleMousemove, false);
      document.removeEventListener('MSPointerCancel', cancel, false);
      document.removeEventListener('pointerup', handleMouseup, false);
      document.removeEventListener('pointermove', handleMousemove, false);
      document.removeEventListener('pointercancel', cancel, false);
      document.removeEventListener('mouseup', handleMouseup, false);
      document.removeEventListener('click', handleMouseup, false);
      document.removeEventListener('mousemove', handleMousemove, false);
    };

    if (window.PointerEvent || window.navigator.pointerEnabled) {
      document.addEventListener('pointerup', handleMouseup, false);
      document.addEventListener('pointermove', handleMousemove, false);
      document.addEventListener('pointercancel', cancel, false);
    } else if (window.navigator.msPointerEnabled) {
      document.addEventListener('MSPointerUp', handleMouseup, false);
      document.addEventListener('MSPointerMove', handleMousemove, false);
      document.addEventListener('MSPointerCancel', cancel, false);
    } else {
      document.addEventListener('mouseup', handleMouseup, false);
      document.addEventListener('click', handleMouseup, false);
      document.addEventListener('mousemove', handleMousemove, false);
    }
  }

  touchdown(event) {
    const touch = event.touches[0];

    const start = new Date();
    const x = touch.clientX;
    const y = touch.clientY;

    if (this.hasBounds && !this.checkBounds(x, y)) return;
    
    const finger = touch.identifier;

    const handleTouchup = event => {
      const touch = event.changedTouches[0];

      if (touch.identifier !== finger) {
        cancel();
        return;
      }

      // for the benefit of mobile Firefox and old Android browsers, we need this absurd hack.
      this.preventMousedownEvents = true;
      clearTimeout(this.preventMousedownTimeout);

      this.preventMousedownTimeout = setTimeout(() => {
        this.preventMousedownEvents = false;
      }, 400);

      this.fire(event, x, y, touch.clientX, touch.clientY, new Date() - start) && event.cancelable !== false && event.preventDefault();
      cancel();
    };

    const handleTouchmove = event => {
      if (event.touches.length !== 1 || event.touches[0].identifier !== finger) {
        cancel();
      }

      const touch = event.touches[0];

      if (event.cancelable) {
        const distX = touch.clientX - x;
        const distY = touch.clientY - y;
        if (abs(distX) > abs(distY)) {
          if (distX > 0 && this.fires.find(f => f.direction === 'right')) event.preventDefault();
          if (distX < 0 && this.fires.find(f => f.direction === 'left')) event.preventDefault();
        }
      }

      if (this.hasBinding) {
        this.updateBindings(x, y, touch.clientX, touch.clientY);
      }  
    };

    const cancel = () => {
      this.node.removeEventListener('touchend', handleTouchup, false);
      window.removeEventListener('touchmove', handleTouchmove, { passive: false, capture: false });
      window.removeEventListener('touchcancel', cancel, false);
    };

    this.node.addEventListener('touchend', handleTouchup, false);
    window.addEventListener('touchmove', handleTouchmove, { passive: false, capture: false });
    window.addEventListener('touchcancel', cancel, false);
  }

  teardown() {
    const ctx = this.context;

    ctx.unlisten('pointerdown', handleMousedown);
    ctx.unlisten('MSPointerDown', handleMousedown);
    ctx.unlisten('mousedown', handleMousedown);
    ctx.unlisten('touchstart', handleTouchstart);
    ctx.unlisten('dragstart', handleDragstart);

    delete this.node.__r_swipes__;
  }
};

function handleMousedown(event) {
  return this.__r_swipes__.mousedown(event);
}

function handleTouchstart(event) {
  return this.__r_swipes__.touchdown(event);
}

function handleDragstart(event) {
  event.preventDefault();
}