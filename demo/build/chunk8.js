System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('default', makeClick);
      // based on ractive-event-tap
      var distance = 12;
      var timeout = 400;
      var between = 250;

      function makeClick(opts) {
        if ( opts === void 0 ) opts = {};

        return function setup(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          instance.events[opts.name || ((opts.count || '') + "clicks")] = function clicks(node, fire, options) {
            var o = Object.assign({}, opts, options);
            var handler;
            if (handler = node.__r_clicks__) {
              handler.subscribe(o.count || 1, !!o.hold, fire);
            } else {
              handler = new Handler(Ractive.getContext(node), o.delay || between, o.bubble || false);
              node.__r_clicks__ = handler;
              handler.subscribe(o.count || 1, !!o.hold, fire);
            }

            return { teardown: function teardown() { handler.unsubscribe(o.count || 1, !!o.hold, fire); } };
          };
        }
      }

      var click = makeClick({ name: 'click', count: 1 });
      var dblclick = makeClick({ name: 'dblclick', count: 2 });
      var trpclick = makeClick({ name: 'trpclick', count: 3 });

      var Handler = function Handler(context, delay, bubble) {
        this.context = context;
        this.node = context.node;
        this.delay = delay;
        this.fires = {};
        this.refs = 0;
        this.bubble = bubble;

        this.bind();
      };

      Handler.prototype.subscribe = function subscribe (count, hold, fire) {
        (this.fires[(count + "," + hold)] || (this.fires[(count + "," + hold)] = [])).push(fire);
        this.refs++;
      };

      Handler.prototype.unsubscribe = function unsubscribe (count, hold, fire) {
        var fires = this.fires[(count + "," + hold)] || [];
        fires.splice(fires.indexOf(fire), 1);
        this.refs--;
        if (!this.refs) { this.teardown(); }
      };

      Handler.prototype.bind = function bind () {
        // listen for mouse/pointer events...
        if (window.PointerEvent || window.navigator.pointerEnabled) {
          this.node.addEventListener('pointerdown', handleMousedown);
        } else if (window.navigator.msPointerEnabled) {
          this.node.addEventListener('MSPointerDown', handleMousedown);
        } else {
          this.node.addEventListener('mousedown', handleMousedown);

          // ...and touch events
          this.node.addEventListener('touchstart', handleTouchstart);
        }

        // native buttons, anchors, checkboxes, radios, and button/submit input elements, should fire a tap event
        // when the space key is pressed
        if (this.node.tagName === 'A' || this.node.tagName === 'BUTTON' || this.node.type === 'button' || this.node.type === 'submit' || this.node.type === 'checkbox' || this.node.type === 'radio') {
          this.node.addEventListener('focus', handleFocus);
        }
      };

      Handler.prototype.fire = function fire (event, x, y, hold) {
          var this$1 = this;

        if (this.tm) {
          this.tmCount++;
          clearTimeout(this.tm);
        } else {
          this.tmCount = 1;
        }

        var go = function () {
          this$1.tm = null;
          (this$1.fires[((this$1.tmCount) + "," + (!!hold))] || []).forEach(function (f) {
            f({ node: this$1.node, original: event, x: x, y: y, hold: !!hold });
          });
        };

        if (hold) { go(); }
        else { this.tm = setTimeout(go, this.delay); }

        return this.bubble;
      };

      Handler.prototype.mousedown = function mousedown (event) {
          var this$1 = this;

        if (this.preventMousedownEvents) {
          return;
        }

        if (event.which !== undefined && event.which !== 1) {
          return;
        }

        var tm;

        var x = event.clientX;
        var y = event.clientY;

        // This will be null for mouse events.
        var pointerId = event.pointerId;

        var handleMouseup = function (event) {
          if (event.pointerId != pointerId) {
            return;
          }

          this$1.fire(event, x, y);
          cancel();
        };

        var handleMousemove = function (event) {
          if (event.pointerId != pointerId) {
            return;
          }

          if ((Math.abs(event.clientX - x) >= distance) || (Math.abs(event.clientY - y) >= distance)) {
            cancel();
          }
        };

        var cancel = function () {
          if (tm) { clearTimeout(tm); }
          this$1.node.removeEventListener('MSPointerUp', handleMouseup, false);
          document.removeEventListener('MSPointerMove', handleMousemove, false);
          document.removeEventListener('MSPointerCancel', cancel, false);
          this$1.node.removeEventListener('pointerup', handleMouseup, false);
          document.removeEventListener('pointermove', handleMousemove, false);
          document.removeEventListener('pointercancel', cancel, false);
          this$1.node.removeEventListener('click', handleMouseup, false);
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

        tm = setTimeout(function () {
          cancel();
          this$1.fire(event, x, y, true);
        }, timeout);

        if (!this.bubble) { event.stopPropagation(); }
        return this.bubble;
      };

      Handler.prototype.touchdown = function touchdown (event) {
          var this$1 = this;

        var tm;
        var touch = event.touches[0];

        var x = touch.clientX;
        var y = touch.clientY;

        var finger = touch.identifier;

        var handleTouchup = function (event) {
          var touch = event.changedTouches[0];

          if (touch.identifier !== finger) {
            cancel();
            return;
          }

          event.preventDefault(); // prevent compatibility mouse event

          // for the benefit of mobile Firefox and old Android browsers, we need this absurd hack.
          this$1.preventMousedownEvents = true;
          clearTimeout(this$1.preventMousedownTimeout);

          this$1.preventMousedownTimeout = setTimeout(function () {
            this$1.preventMousedownEvents = false;
          }, 400);

          this$1.fire(event, x, y);
          cancel();
        };

        var handleTouchmove = function (event) {
          if (event.touches.length !== 1 || event.touches[0].identifier !== finger) {
            cancel();
          }

          var touch = event.touches[0];
          if ((Math.abs(touch.clientX - x) >= distance) || (Math.abs(touch.clientY - y) >= distance)) {
            cancel();
          }
        };

        var cancel = function () {
          if (tm) { clearTimeout(tm); }
          this$1.node.removeEventListener('touchend', handleTouchup, false);
          window.removeEventListener('touchmove', handleTouchmove, false);
          window.removeEventListener('touchcancel', cancel, false);
        };

        this.node.addEventListener('touchend', handleTouchup, false);
        window.addEventListener('touchmove', handleTouchmove, false);
        window.addEventListener('touchcancel', cancel, false);

        tm = setTimeout(function () {
          cancel();
          this$1.fire(event, x, y, true);
        }, timeout);

        if (!this.bubble) { event.stopPropagation(); }
        return this.bubble;
      };

      Handler.prototype.teardown = function teardown () {
        this.node.removeEventListener('pointerdown', handleMousedown);
        this.node.removeEventListener('MSPointerDown', handleMousedown);
        this.node.removeEventListener('mousedown', handleMousedown);
        this.node.removeEventListener('touchstart', handleTouchstart);
        this.node.removeEventListener('focus', handleFocus);

        delete this.node.__r_clicks__;
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

    }
  };
});
