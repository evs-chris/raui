System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      // based on ractive-event-tap
      var abs = Math.abs;

      function makeSwipe(name, direction, distance, flick, threshold) {
        if ( direction === void 0 ) direction = 'right';
        if ( distance === void 0 ) distance = 150;
        if ( flick === void 0 ) flick = 200;
        if ( threshold === void 0 ) threshold = 0.2;

        var init = { direction: direction, distance: distance, flick: flick, threshold: threshold };
        return function setup(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          instance.events[name] = function swipe(node, fire, options) {
            if ( options === void 0 ) options = {};

            var handler;
            var opts = Object.assign({}, init, options);
            opts.fire = fire;
            if (handler = node.__r_swipes__) {
              handler.subscribe(opts);
            } else {
              handler = new Handler(Ractive.getContext(node));
              node.__r_swipes__ = handler;
              handler.subscribe(opts);
            }

            return { teardown: function teardown() { handler.unsubscribe(fire); } };
          };
        }
      }

      var left = exports('left', makeSwipe('swipeleft', 'left'));
      var right = exports('right', makeSwipe('swiperight', 'right'));
      var up = exports('up', makeSwipe('swipeup', 'up'));
      var down = exports('down', makeSwipe('swipedown', 'down'));

      var Handler = function Handler(context) {
        this.context = context;
        this.node = context.node;
        this.fires = [];

        this.bind();
      };

      Handler.prototype.subscribe = function subscribe (opts) {
        this.fires.push(opts);
        this.hasBinding = !!this.fires.find(function (f) { return f.bindPx || f.bind; });
        this.hasBounds = !!this.fires.find(function (f) { return f.maxX != null || f.maxY != null || f.minX != null || f.minY != null; });
      };

      Handler.prototype.unsubscribe = function unsubscribe (fire) {
        this.fires = this.fires.filter(function (f) { return f.fire !== fire; });
        if (!this.fires.length) { this.teardown(); }
        this.hasBinding = !!this.fires.find(function (f) { return f.bindPx || f.bind; });
        this.hasBounds = !!this.fires.find(function (f) { return f.maxX != null || f.maxY != null || f.minX != null || f.minY != null; });
      };

      Handler.prototype.bind = function bind () {
        // listen for mouse/pointer events...
        if (window.navigator.pointerEnabled) {
          this.context.listen('pointerdown', handleMousedown);
        } else if (window.navigator.msPointerEnabled) {
          this.context.listen('MSPointerDown', handleMousedown);
        } else {
          this.context.listen('mousedown', handleMousedown);
          this.context.listen('dragstart', handleDragstart);

          // ...and touch events
          this.context.listen('touchstart', handleTouchstart);
        }
      };

      Handler.prototype.fire = function fire (event, startx, starty, endx, endy, duration) {
          var this$1 = this;

        var node = this.node;
        var fired;

        this.fires.forEach(function (f) {
          if (!f.active) { f.active = true; return; }

          var distx = duration < f.flick ? endx - startx + ((f.flick / duration) * (endx - startx)) : endx - startx;
          var disty = duration < f.flick ? endy - starty + ((f.flick / duration) * (endy - starty)) : endy - starty;
          var threshold = abs(f.threshold <= 0 ? Math.max(distx, disty) : f.threshold < 1 ? f.direction === 'right' || f.direction === 'left' ? f.threshold * distx : f.threshold * disty : f.threshold);
          var dist = f.bindPx;
          var pct = f.bind;

          if (distx > 0 && f.direction === 'right' && distx >= f.distance && abs(disty) <= threshold) {
            f.fire({ node: node, event: event });
            fired = true;
          } else if (distx < 0 && f.direction === 'left' && -distx >= f.distance && abs(disty) <= threshold) {
            f.fire({ node: node, event: event });
            fired = true;
          }

          if (disty > 0 && f.direction === 'down' && disty >= f.distance && abs(distx) <= threshold) {
            f.fire({ node: node, event: event });
            fired = true;
          } else if (disty < 0 && f.direction === 'up' && -disty >= f.distance && abs(distx) <= threshold) {
            f.fire({ node: node, event: event });
            fired = true;
          }

          if (dist) { this$1.context.set(dist, 0); }
          if (pct) { this$1.context.set(pct, 0); }
        });

        return fired;
      };

      Handler.prototype.checkBounds = function checkBounds (startx, starty) {
        var rect = this.node.getBoundingClientRect();
        var x = startx - rect.x, y = starty - rect.y;

        this.fires.forEach(function (f) {
          var maxX = f.maxX;
            var maxY = f.maxY;
            var minX = f.minX;
            var minY = f.minY;
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

        return !!this.fires.find(function (f) { return f.active; });
      };

      Handler.prototype.updateBindings = function updateBindings (startx, starty, endx, endy) {
          var this$1 = this;

        this.fires.forEach(function (f) {
          if (!f.active) { return; }

          if (!f.bindPx && !f.bind) { return; }

          var dist = f.bindPx;
          var pct = f.bind;
          var distx = endx - startx;
          var disty = endy - starty;
          var threshold = abs(f.threshold <= 0 ? Math.max(distx, disty) : f.threshold < 1 ? f.direction === 'right' || f.direction === 'left' ? f.threshold * distx : f.threshold * disty : f.threshold);

          if (dist) {
            if (f.direction === 'left') { this$1.context.set(dist, distx < 0 && abs(disty) <= threshold ? -distx : 0); }
            else if (f.direction === 'right') { this$1.context.set(dist, distx > 0 && abs(disty) <= threshold ? distx : 0); }
            else if (f.direction === 'up') { this$1.context.set(dist, disty < 0 && abs(distx) <= threshold ? -disty : 0); }
            else if (f.direction === 'down') { this$1.context.set(dist, disty > 0 && abs(distx) <= threshold ? disty : 0); }
          }

          if (pct) {
            if (f.direction === 'left') { this$1.context.set(pct, distx < 0 && abs(disty) <= threshold ? (-distx / f.distance) * 100 : 0); }
            else if (f.direction === 'right') { this$1.context.set(pct, distx > 0 && abs(disty) <= threshold ? (distx / f.distance) * 100 : 0); }
            else if (f.direction === 'up') { this$1.context.set(pct, disty < 0 && abs(distx) <= threshold ? (-disty / f.distance) * 100 : 0); }
            else if (f.direction === 'down') { this$1.context.set(pct, disty > 0 && abs(distx) <= threshold ? (disty / f.distance) * 100 : 0); }
          }
        });
      };

      Handler.prototype.mousedown = function mousedown (event) {
          var this$1 = this;

        if (this.preventMousedownEvents) {
          return;
        }

        if (event.which !== undefined && event.which !== 1) {
          return;
        }

        var start = new Date();
        var x = event.clientX;
        var y = event.clientY;

        if (this.hasBounds && !this.checkBounds(x, y)) { return; }
       
        // This will be null for mouse events.
        var pointerId = event.pointerId;

        var handleMouseup = function (event) {
          this$1.fire(event, x, y, event.clientX, event.clientY, new Date() - start) && event.cancelable !== false && event.preventDefault();
          cancel();
        };

        var handleMousemove = function (event) {
          if (event.pointerId != pointerId) {
            return;
          }

          if (this$1.hasBinding) {
            this$1.updateBindings(x, y, event.clientX, event.clientY);
          }  
        };

        var cancel = function () {
          this$1.node.removeEventListener('MSPointerUp', handleMouseup, false);
          document.removeEventListener('MSPointerMove', handleMousemove, false);
          document.removeEventListener('MSPointerCancel', cancel, false);
          document.removeEventListener('pointerup', handleMouseup, false);
          document.removeEventListener('pointermove', handleMousemove, false);
          document.removeEventListener('pointercancel', cancel, false);
          document.removeEventListener('mouseup', handleMouseup, false);
          document.removeEventListener('click', handleMouseup, false);
          document.removeEventListener('mousemove', handleMousemove, false);
        };

        if (window.navigator.pointerEnabled) {
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
      };

      Handler.prototype.touchdown = function touchdown (event) {
          var this$1 = this;

        var touch = event.touches[0];

        var start = new Date();
        var x = touch.clientX;
        var y = touch.clientY;

        if (this.hasBounds && !this.checkBounds(x, y)) { return; }
          
        var finger = touch.identifier;

        var handleTouchup = function (event) {
          var touch = event.changedTouches[0];

          if (touch.identifier !== finger) {
            cancel();
            return;
          }

          // for the benefit of mobile Firefox and old Android browsers, we need this absurd hack.
          this$1.preventMousedownEvents = true;
          clearTimeout(this$1.preventMousedownTimeout);

          this$1.preventMousedownTimeout = setTimeout(function () {
            this$1.preventMousedownEvents = false;
          }, 400);

          this$1.fire(event, x, y, touch.clientX, touch.clientY, new Date() - start) && event.cancelable !== false && event.preventDefault();
          cancel();
        };

        var handleTouchmove = function (event) {
          if (event.touches.length !== 1 || event.touches[0].identifier !== finger) {
            cancel();
          }

          var touch = event.touches[0];

          if (event.cancelable) {
            var distX = touch.clientX - x;
            var distY = touch.clientY - y;
            if (abs(distX) > abs(distY)) {
              if (distX > 0 && this$1.fires.find(function (f) { return f.direction === 'right'; })) { event.preventDefault(); }
              if (distX < 0 && this$1.fires.find(function (f) { return f.direction === 'left'; })) { event.preventDefault(); }
            }
          }

          if (this$1.hasBinding) {
            this$1.updateBindings(x, y, touch.clientX, touch.clientY);
          }  
        };

        var cancel = function () {
          this$1.node.removeEventListener('touchend', handleTouchup, false);
          window.removeEventListener('touchmove', handleTouchmove, { passive: false, capture: false });
          window.removeEventListener('touchcancel', cancel, false);
        };

        this.node.addEventListener('touchend', handleTouchup, false);
        window.addEventListener('touchmove', handleTouchmove, { passive: false, capture: false });
        window.addEventListener('touchcancel', cancel, false);
      };

      Handler.prototype.teardown = function teardown () {
        var ctx = this.context;

        ctx.unlisten('pointerdown', handleMousedown);
        ctx.unlisten('MSPointerDown', handleMousedown);
        ctx.unlisten('mousedown', handleMousedown);
        ctx.unlisten('touchstart', handleTouchstart);
        ctx.unlisten('dragstart', handleDragstart);

        delete this.node.__r_swipes__;
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

    }
  };
});
