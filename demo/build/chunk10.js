System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('default', plugin);
      // TODO: support for non-numeric formats?
      // TODO: 12 hour time format and am/pm

      var nonDigits = /[^\d]+/;
      var nonDisplay = /[^\d_]+/;
      var blankChar = '_';

      var map = {
        y: 0, M: 1, d: 2, H: 3, m: 4, s: 5, S: 6
      };

      function padl(str, total, char) {
        if ( char === void 0 ) char = '0';

        var v = str == null ? '' : '' + str;
        for (var i = v.length; i < total; i++) {
          v = char + v;
        }
        return v;
      }

      function padr(str, total, char) {
        if ( char === void 0 ) char = '0';

        var v = str == null ? '' : '' + str;
        for (var i = v.length; i < total; i++) {
          v += char;
        }
        return v;
      }

      var defaults = {
        mask: 'yyyy-MM-dd',
        time: '00:00:00.000',
        date: function date() {
          var now = new Date();
          return new Date(((now.getFullYear()) + "-" + (padl(now.getMonth() + 1, 2)) + "-" + (padl(now.getDate(), 2)) + "T" + (defaults.time)));
        }
      };

      function plugin(options) {
        if ( options === void 0 ) options = {};

        var defaultMask = options.mask || defaults.mask;
        var defaultTime = options.time || defaults.time;
        var defaultDate = options.date || defaults.date;
        if (typeof defaultDate !== 'function') {
          var dt = defaultDate;
          defaultDate = function () { return dt; };
        }

        return function(ref) {
          var instance = ref.instance;

          instance.decorators[options.name || 'date'] = function(/** @type { HTMLInputElement } */ node, optsin, other) {
            if ( optsin === void 0 ) optsin = {};

            var opts = Object.assign(
              {},
              options,
              typeof optsin === 'string' ? { value: optsin } : 0,
              typeof other === 'string' ? { mask: other } : 0,
              typeof optsin === 'object' ? optsin : 0
            );

            var ctx = this.getContext(node);
            var mask = opts.mask || defaultMask;
            var handles = { observers: [], listeners: [] };

            if (node.tagName !== 'INPUT') {
              console.warn(("Attempted to add a date decorator a " + (node.tagName)));
              return noop;
            }

            if (!mask) { return noop; }

            var groups = [];
            var match, last = 0;
            while (match = dateRE.exec(mask)) {
              var group = { mask: match[0], type: match[0][0], length: match[0].length, start: match.index, end: match.index + match[0].length, chunk: groups.length, prefix: mask.substring(last, match.index), groups: groups, value: null, display: padr('', match[0].length, blankChar) };
              last = group.end;
              groups.push(group);
            }
            groups.suffix = mask.substring(groups[groups.length - 1].end);
            groups.last = null;

            if (groups.slice(1).find(function (g) { return !g.prefix; })) {
              console.warn(("Attempted to add a date decorator missing interstitial between fields '" + mask + "'"));
              return noop;
            }

            if (opts.min > opts.max) { delete opts.min; }
            
            if (typeof opts.value === 'string') {
              handles.observers.push(ctx.observe(opts.value, function (v) {
                if (!v && opts.null === false) { v = defaultDate(); }
                groups.value = v;
                receiveValue(groups, v);
                groups.last = v;
                updateDisplay(groups, node);
                if (opts.min && v < opts.min || opts.max && v > opts.max) {
                  groups.last = null;
                  setTimeout(sendValue);
                }
              }, { defer: true }));
            } else {
              if (opts.date || opts.null === false) { groups.value = getDateValue(opts.date || defaultDate()); }
              updateDisplay(groups, node);
            }

            function sendValue(focused) {
              if (groups.value === null && groups.last === null || +groups.value === +groups.last) { return 1; }

              if (focused && opts.lazy !== false) { return; }

              if (opts.null === false && groups.value === null) { return receiveValue(groups, groups.last) && 1 || 1; }

              if (opts.min && groups.value < opts.min) {
                receiveValue(groups, opts.min);
                updateDisplay(groups, node);
              } else if (opts.max && groups.value > opts.max) {
                receiveValue(groups, opts.max);
                updateDisplay(groups, node);
              }

              groups.last = groups.value;

              if (typeof opts.value === 'string') {
                handles.observers.forEach(function (h) { return h.silence(); });
                ctx.set(opts.value, groups.value);
                handles.observers.forEach(function (h) { return h.resume(); });
              }
            }

            handles.listeners.push(ctx.listen('input', function () {
              var pos = node.selectionStart;
              var start = node.value;

              readInput(groups, node, mask);
              var active = groupForPos(groups, pos);
              var accepted = updateValues(groups, active, pos);
              applyValues(groups, sendValue, true);
              updateDisplay(groups, node);

              if (active && ((start.length >= mask.length && pos === active.end) || accepted) && active !== groups[groups.length - 1]) {
                var next = groups[groups.indexOf(active) + 1];
                node.setSelectionRange(next.start, next.end);
              } else {
                node.setSelectionRange(pos, pos);
              }
            }));

            handles.listeners.push(ctx.listen('blur', function () {
              if (sendValue(false)) { receiveValue(groups, groups.value); }
              updateDisplay(groups, node);
            }));

            var selectGroup = function () {
              var group;
              if (node.selectionStart === node.value.length && node.selectionEnd === node.value.length) { group = groups[0]; }
              else { group = groupForPos(groups, node.selectionStart); }
              document.activeElement === node && node.setSelectionRange(group.start, group.end);
            };
            handles.listeners.push(ctx.listen('click', selectGroup));
            handles.listeners.push(ctx.listen('focus', selectGroup));

            handles.listeners.push(ctx.listen('keydown', function (/** @type { KeyboardEvent } */ ev) {
              switch (ev.key) {
                case 'Enter':
                case 'Tab': {
                  var g = groupForPos(groups, node.selectionStart);
                  var idx = groups.indexOf(g);
                  if (updateValues(groups, g, node.selectionStart, true)) {
                    updateDisplay(groups, node);
                    applyValues(groups, sendValue, ev.shiftKey && idx > 0 || !ev.shiftKey && idx + 1 < groups.length);
                  }
                  if (ev.shiftKey && idx > 0) {
                    node.setSelectionRange(groups[idx - 1].start, groups[idx - 1].end);
                    ev.preventDefault();
                    ev.stopPropagation();
                  } else if (!ev.shiftKey && idx + 1 < groups.length) {
                    node.setSelectionRange(groups[idx + 1].start, groups[idx + 1].end);
                    ev.preventDefault();
                    ev.stopPropagation();
                  }
                  break;
                }

                case 'ArrowUp':
                case 'ArrowDown': {
                  var ref = [node.selectionStart, node.selectionEnd];
                  var s = ref[0];
                  var e = ref[1];
                  var g$1 = groupForPos(groups, s);
                  if (g$1.value === null) { g$1.value = 1; }
                  bumpValue(g$1, ev.key === 'ArrowDown');
                  g$1.input = g$1.display = displayForGroup(g$1);
                  applyValues(groups, sendValue, true);
                  updateDisplay(groups, node);
                  ev.preventDefault();
                  ev.stopPropagation();
                  node.setSelectionRange(s, e);
                  break;
                }
              }
            }));

            return {
              teardown: function teardown() {
                handles.observers.forEach(function (o) { return o.cancel(); });
                handles.listeners.forEach(function (o) { return o.cancel(); });
              }
            }
          };
        }
      }

      function readInput(groups, node, mask) {
        var val = node.value;
        var pos = node.selectionStart;
        var active = groupForPos(groups, pos);
        var gidx = 0;
        var group = groups[gidx];
        var next = groups[gidx + 1];
        groups.forEach(function (g) { return g.input = ''; });

        for (var i = 0; i < val.length; i++) {
          if (next && val[i] === next.prefix[0] && (active !== group || group.input.length >= group.length || val.length - i < (mask.length - group.end) + (group.length - group.input.length))) {
            // skip separator
            if (next.prefix.length > 1) { i += next.prefix.length - 1; }
            // skip duped separator
            if (val[i + 1] === next.prefix[0]) { i += next.prefix.length; }

            group = groups[++gidx];
            next = groups[gidx + 1];
          } else { group.input += val[i]; }
        }
      }

      function updateValues(groups, target, pos, leave) {
        if ( pos === void 0 ) pos = 0;
        if ( leave === void 0 ) leave = false;

        var accepted = false;
        for (var i = 0; i < groups.length; i++) {
          var g = groups[i];
          var v = g.input.replace(nonDigits, '');
          var hasSep = groups[i + 1] && groups[i + 1].prefix && nonDisplay.test(g.input);
          if (v.length > g.length && g === target) {
            var drop = v.length - target.length;
            v = v.substr(0, pos - target.start) + v.substr((pos - target.start) + drop);
          } else {
            v = v.substr(0, g.length);
          }
          g.input = v;

          if (g.type === 'y' && v.length === 0 && (hasSep || leave)) {
            g.value = (new Date()).getFullYear();
            g.input = g.display = padl(g.value, g.length);
            accepted = true;
          } else if (v === '') {
            g.value = null;
            g.display = displayForGroup(g);
          } else if (g !== target) {
            g.value = +v;
            if (g.type === 'M') { g.value--; }
            g.display = displayForGroup(g);
          } else {
            if (
              (g.type === 'M' && +v > 1) ||
              (g.type === 'd' && +v > 3) ||
              (g.type === 'H' && +v > 2) ||
              ((g.type === 'm' || g.type === 's') && +v > 6)
            ) {
              g.value = +v;
              if (g.type === 'M') { g.value--; }
              g.display = padl(v, g.length);
              accepted = true;
            } else if (g.type === 'y' && v.length === 2 && (hasSep || leave)) {
              var n = (new Date()).getFullYear();
              var cen = Math.floor(n / 100) * 100;
              var val = Math.abs(n - (cen + +v)) < 20 ? cen + +v : (cen - 100) + +v;
              g.value = val;
              g.input = g.display = padl(val, g.length);
              accepted = true;
            } else {
              g.display = padr(v, g.length, blankChar);
              g.value = +v;
            }
          }
        }
        return accepted;
      }

      function receiveValue(groups, v) {
        v = groups.value = v && getDateValue(v);
        var parts = v ? [v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()] : [null, null, null, null, null, null, null];
        groups.forEach(function (g) {
          g.value = parts[map[g.type]];
          g.input = g.display = displayForGroup(g);
        });
      }

      function applyValues(groups, send, focused) {
        var v = groups.value || origin;
        var parts = [v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()];
        
        groups.forEach(function (g) {
          var vv = g.value;
          if (vv !== null && g.type === 'M') {
            if (vv < 0) { vv = 0; }
            else if (vv > 11) { vv = 11; }
          } else if (vv !== null && (g.type === 'm' || g.type === 's')) {
            if (vv < 0) { vv = 0; }
            else if (vv > 59) { vv = 59; }
          } else if (vv !== null && g.type === 'H') {
            if (vv < 0) { vv = 0; }
            else if (vv > 23) { vv = 23; }
          } else if (vv !== null && g.type === 'h') {
            if (vv < 1) { vv = 1; }
            else if (vv > 12) { vv = 12; }
          }

          if (vv !== g.value) {
            g.value = vv;
            g.display = displayForGroup(g);
          }

          parts[map[g.type]] = g.value;
        });

        if (parts[0] !== null && parts[1] !== null && parts[2] !== null) {
          var d = groups.find(function (g) { return g.type === 'd'; });
          if (d) {
            if (parts[2] < 1) {
              d.value = parts[2] = 1;
              d.display = displayForGroup(d);
            } else {
              var last = lastDay(new Date(parts[0], parts[1], 1));
              if (parts[2] > last) {
                d.value = parts[2] = last;
                d.display = displayForGroup(d);
              }
            }
          }
        }

        if (groups.find(function (g) { return g.value === null; }) || parts[0] === 0 || parts[1] > 11 || parts[1] < 0 || parts[2] === 0) {
          groups.value = null;
        } else {
          parts.unshift(null);
          groups.value = new (Date.bind.apply(Date, parts))();
        }

        send(focused);
      }

      function updateDisplay(groups, node) {
        node.value = groups.reduce(function (a, c) {
          return a + c.prefix + c.display;
        }, '') + groups.suffix;
      }

      function groupForPos(groups, pos) {
        return groups.find(function (g) { return pos >= g.start && pos <= g.end; });
      }

      function displayForGroup(group) {
        if (group.value === null) { return padl('', group.length, blankChar); }
        switch (group.type) {
          case 'y':
            if (!group.value) { return padl('', group.length, blankChar); }
            return group.length <= 2 ? ('' + group.value).substr(2, 2) : '' + padl(group.value, group.length);
          
          case 'M':
            if (!~group.value) { return padl('', group.length, blankChar); }
            if (group.length === 1) { return '' + (group.value + 1); }
            else if (group.length === 2) { return (group.value < 9 ? '0' : '') + (group.value + 1); }
            else if (group.length === 3) { return months[group.value].substr(0, 3); }
            else { return months[group.value]; }
          
          case 'd':
            if (!group.value) { return padl('', group.length, blankChar); }
            if (group.length === 1) { return '' + group.value; }
            else if (group.length === 2) { return (group.value <= 9 ? '0' : '') + group.value; }
            else if (group.length === 3) { return days[group.groups.value.getDay()].substr(0, 3); }
            else { return days[group.groups.value.getDay()]; }
          
          case 'H':
          case 'h':
          case 'm':
          case 's':
            if (group.length === 1) { return '' + group.value; }
            else { return padl(group.value, group.length); }
          
          case 'S':
            if (group.length === 1) { return '' + group.value; }
            else { return padl(group.value, 3); }
        }
      }

      var dateRE = /y+|M+|d+|E+|H+|m+|s+|S+|k+|a+/g;
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var noop = { teardown: function teardown() {} };

      function bumpValue(group, down) {
        switch (group.type) {
          case 'y':
            group.value = group.value + (down ? -1 : 1);
            break;
          
          case 'M':
            group.value = down ?
              group.value < 1 ? 11 : group.value - 1 :
              group.value > 10 ? 0 : group.value + 1;
            break;
          
          case 'd': {
            var groups = group.groups;
            var last = lastDay(new Date((groups.find(function (g) { return g.type === 'y'; }) || { value: 1 }).value, (groups.find(function (g) { return g.type === 'M'; }) || { value: 1 }).value), 1);
            if (down) {
              group.value = group.value < 2 ? last : group.value - 1;
            } else {
              group.value = group.value + 1 > last ? 1 : group.value + 1;
            }
            break;
          }
          
          case 'H':
            group.value = down ?
              group.value < 1 ? 23 : group.value - 1 :
              group.value > 22 ? 0 : group.value + 1;
            break;
          
          case 'h':
            group.value = down ?
              group.value < 1 ? 12 : group.value - 1 :
              group.value > 11 ? 1 : group.value + 1;
            break;
          
          case 'm':
          case 's':
            group.value = down ?
              group.value < 1 ? 59 : group.value - 1 :
              group.value > 58 ? 0 : group.value + 1;
            break;
          
          case 'S':
            group.value = down ?
              group.value < 1 ? 999 : group.value - 1 :
              group.value > 998 ? 0 : group.value + 1;
            break;
        }
      }

      function lastDay(date) {
        return (new Date((new Date(date.getFullYear(), date.getMonth() + 1, 1)) - 86400000)).getDate();
      }

      var origin = new Date('0000-01-01T00:00:00');
      function getDateValue(thing) {
        var v = thing;
        if (typeof v === 'function') { v = thing(); }
        if (typeof v === 'string') { try { v = new Date(v); } catch (e) { return defaultDate(); } }
        if (v instanceof Date) { return v; }
        else { return origin; }
      }

    }
  };
});
