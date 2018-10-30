System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('default', plugin);
      // TODO: support for non-numeric formats?
      // TODO: 12 hour time format and am/pm

      function plugin(options) {
        if ( options === void 0 ) options = {};

        var defaultMask = options.mask || 'yyyy-MM-dd';
        var defaultTime = options.time || '00:00:00.000';
        var defaultDate = options.date || (function () { return new Date('0000-01-01T' + defaultTime); });
        if (typeof defaultDate !== 'function') {
          var dt = defaultDate;
          defaultDate = function () { return dt; };
        }

        return function(ref) {
          var instance = ref.instance;

          instance.decorators[options.name || 'date'] = function(/** @type { HTMLInputElement } */ node, opts, other) {
            if ( opts === void 0 ) opts = {};

            if (typeof opts === 'string') { opts = { value: opts }; }
            if (typeof other === 'string') { opts.mask = other; }
            var ctx = this.getContext(node);
            var mask = opts.mask || defaultMask;
            var handles = { observers: [], listeners: [] };
            var pending;
            var tm;

            if (node.tagName !== 'INPUT') {
              console.warn(("Attempted to add a date decorator a " + (node.tagName)));
              return noop;
            }

            if (!mask) { return noop; }

            var groups = [];
            var match, last = 0;
            while (match = dateRE.exec(mask)) {
              var group = { mask: match[0], type: match[0][0], length: match[0].length, start: match.index, end: match.index + match[0].length, chunk: groups.length, prefix: mask.substring(last, match.index), groups: groups };
              last = group.end;
              groups.push(group);
            }
            groups.suffix = mask.substring(groups[groups.length - 1].end);

            if (groups.slice(1).find(function (g) { return !g.prefix; })) {
              console.warn(("Attempted to add a date decorator missing interstitial between fields '" + mask + "'"));
              return noop;
            }
            
            if (typeof opts.value === 'string') {
              handles.observers.push(ctx.observe(opts.value, function (v) {
                if (!v) { v = defaultDate(); }
                groups.value = v;
                updateDate(v, groups);
                node.value = printDate(groups);
              }));
            } else { groups.value = getDateValue(opts.date || defaultDate()); }

            function sendValue() {
              if (typeof opts.value === 'string') {
                handles.observers.forEach(function (h) { return h.silence(); });
                ctx.set(opts.value, groups.value);
                handles.observers.forEach(function (h) { return h.resume(); });
              }
            }

            function mouseup(ev) {
              if (pending) {
                var group = pending;
                pending = false;
                var str = node.value;
                var ref = currentInput(node, group);
                var prefix = ref[0];
                var val = ref[1];
                group.value = +(val || 1);
                if (group.type === 'M') { group.value--; }
                else if (group.type === 'y' && group.value < 100) {
                  var yr = (new Date()).getFullYear() + '';
                  if (group.value - +(yr.substr(2)) < 20) { group.value = +(yr.substr(0, 2) + '00') + group.value; }
                  else { group.value = +(yr.substr(0, 2) + '00') - 100 + group.value; }
                }
                revalue(groups);
                updateDisplay(group);
                redraw(node, groups);
                if ((prefix.length + val.length) < node.selectionStart) {
                  var pos = node.selectionStart + (node.value.length - str.length);
                  node.setSelectionRange(pos, pos);
                }
              }
              if (ev.type === 'mouseup') { document.removeEventListener('mouseup', mouseup); }
              var len = node.selectionStart > node.selectionEnd ? node.selectionStart - node.selectionEnd : node.selectionEnd - node.selectionStart;
              if (len === node.value.length && ev.type !== 'focus') { return; }
              if (tm) { clearTimeout(tm); }
              if (ev.type === 'focus') {
                tm = setTimeout(function () { return selectGroup(node, groupForPos(groups, node.selectionStart)); });
              } else {
                selectGroup(node, groupForPos(groups, node.selectionStart));
              }
            }

            handles.listeners.push(ctx.listen('focus', function (ev) {
              mouseup(ev);
            }));

            handles.listeners.push(ctx.listen('blur', function () {
              if (pending) {
                var group = groupForPos(groups, node.selectionStart);
                checkPending(node, group);
                revalue(groups);
                updateDisplay(group);
                redraw(node, groups);
                pending = false;
              }
              sendValue();
            }));

            handles.listeners.push(ctx.listen('dragstart', function (ev) {
              ev.preventDefault();
              ev.stopPropagation();
            }));

            handles.listeners.push(ctx.listen('keydown', function (/** @type { KeyboardEvent } */ ev) {
              var group = groupForPos(groups, node.selectionStart);

              var stop = true;
              var reval = false;
              var step = 0;

              switch (ev.key) {
                case 'ArrowDown':
                  bumpValue(group, true);
                  reval = group;
                  break;

                case 'ArrowRight':
                  var ref = currentInput(node, group);
              var right_prefix = ref[0];
              var str = ref[1];
                  if (node.selectionStart >= (right_prefix + str).length) { step = 1; }
                  else { stop = false; }
                  break;
                
                case 'ArrowLeft':
                  var ref$1 = currentInput(node, group);
              var left_prefix = ref$1[0];
                  if (node.selectionStart <= left_prefix.length && (node.selectionStart - node.selectionEnd === 0)) { step = -1; }
                  else { stop = false; }
                  break;
                
                case 'ArrowUp':
                  bumpValue(group, false);
                  reval = group;
                  break;

                case 'Enter':
                  if (ev.shiftKey) { step = -1; }
                  else { step = 1; }
                  break;
                
                case 'Backspace':
                case 'Delete':
                  stop = false;
                  break;

                case 'Tab':
                  if (ev.shiftKey) {
                    if (group.chunk === 0) { stop = false; }
                    else { step = -1; }
                  } else {
                    if (group.chunk === groups.length - 1) { stop = false; }
                    else { step = 1; }
                  }
                  break;
              }

              if (ev.key >= '0' && ev.key <= '9') {
                pending = group;
                var start = node.selectionStart, end = node.selectionEnd;
                if (start !== end) { node.value = node.value.slice(0, start > end ? end : start) + node.value.slice(start > end ? start : end); }
                var ref$2 = currentInput(node, group);
                var prefix = ref$2[0];
                var str$1 = ref$2[1];
                var suffix = ref$2[2];
                str$1 += ev.key;
                node.value = prefix + str$1 + suffix;
                node.setSelectionRange(prefix.length + str$1.length, prefix.length + str$1.length);

                if (
                  (group.type === 'y' && ((group.length <= 2 && str$1.length > 1) || str$1.length >= 4)) ||
                  (group.type === 'M' && (+str$1 > 1 || str$1.length > 1)) ||
                  (group.type === 'd' && (+str$1 > 3 || str$1.length > 1)) ||
                  (group.type === 'H' && (+str$1 > 2 || str$1.length > 1)) ||
                  ((group.type === 'm' || group.type === 's') && (+str$1 > 6 || str$1.length > 1)) ||
                  (group.type === 'S' && str$1.length === 3)
                ) {
                  group.value = group.type === 'M' ? +str$1 - 1 : +str$1;
                  reval = group;
                  if (group.chunk < groups.length - 1) { step = 1; }
                  pending = false;
                }
              } else if (ev.ctrlKey || ev.metaKey || ev.altKey) {
                stop = false;
              } else if (ev.key.length === 1 && pending) {
                step = 1;
              }

              if (stop) {
                ev.preventDefault();
                ev.stopPropagation();
              }

              if (step && !reval && pending) {
                reval = true;
                checkPending(node, group);
              }

              if (reval) {
                revalue(groups);
                updateDisplay(group);
                redraw(node, groups);
                if (!step && reval.groups) {
                  selectGroup(node, reval);
                }
              }

              if (step) {
                if (step > 0) { selectNextGroup(node, group); }
                else if (step < 0) { selectPrevGroup(node, group); }
              }
            }));

            handles.listeners.push(ctx.listen('mousedown', function () {
              document.addEventListener('mouseup', mouseup);
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

      var dateRE = /y+|M+|d+|E+|H+|m+|s+|S+|k+|a+/g;
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      function updateDate(v, groups) {
        if (!v) { return ''; }
        if (typeof v === 'string') {
          v = new Date(v);
          v = new Date(+v + (v.getTimezoneOffset() * 60 * 1000));
          groups.value = v;
        }
        else if (Object.prototype.toString.call(v) !== '[object Date]') { return ''; }

        groups.forEach(function (g) {
          updateValue(v, g);
          updateDisplay(g);
        });
      }

      var noop = { teardown: function teardown() {} };

      function updateValue(date, group) {
        switch (group.type) {
          case 'y':
            group.value = date.getFullYear();
            break;
          
          case 'M':
            group.value = date.getMonth();
            break;
          
          case 'd':
            group.value = date.getDate();
            break;
          
          case 'H':
            group.value = date.getHours();
            break;

          case 'm':
            group.value = date.getMinutes();
            break;

          case 's':
            group.value = date.getSeconds();
            break;
          
          case 'S':
            group.value = date.getMilliseconds();
            break;
        }
      }

      function updateDisplay(group) {
        switch (group.type) {
          case 'y':
            group.display = group.length <= 2 ? ('' + group.value).substr(2, 2) : '' + lpad(group.value, '0', 4);
            break;
          
          case 'M':
            if (group.length === 1) { group.display = '' + (group.value + 1); }
            else if (group.length === 2) { group.display = (group.value < 9 ? '0' : '') + (group.value + 1); }
            else if (group.length === 3) { group.display = months[group.value].substr(0, 3); }
            else { group.display = months[group.value]; }
            break;
          
          case 'd':
            if (group.length === 1) { group.display = '' + group.value; }
            else if (group.length === 2) { group.display = (group.value <= 9 ? '0' : '') + group.value; }
            else if (group.length === 3) { group.display = days[group.groups.value.getDay()].substr(0, 3); }
            else { group.display = days[group.groups.value.getDay()]; }
            break;
          
          case 'H':
          case 'm':
          case 's':
            if (group.length === 1) { group.display = '' + group.value; }
            else { group.display = lpad(group.value, '0', 2); }
            break;
          
          case 'S':
            if (group.length === 1) { group.display = '' + group.value; }
            else { group.display = lpad(group.value, '0', 3); }
        }
      }

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
          
          case 'd':
            if (down) {
              group.value = group.value < 2 ? lastDay(group.groups.value) : group.value - 1;
            } else {
              group.value = group.value + 1 > lastDay(group.groups.value) ? 1 : group.value + 1;
            }
            break;
          
          case 'H':
            group.value = down ?
              group.value < 1 ? 23 : group.value - 1 :
              group.value > 22 ? 0 : group.value + 1;
            break;
          
          case 'm':
          case 's':
            group.value = down ?
              group.value < 1 ? 59 : group.value - 1 :
              group.value > 58 ? 0 : group.value + 1;
            break;
          
          case 'S':
            group.value.down ?
              group.value < 1 ? 999 : group.value - 1 :
              group.value > 998 ? 0 : group.value + 1;
            break;
        }
      }

      function printDate(groups) {
        return groups.reduce(function (a, c) { return a + c.prefix + c.display; }, '') + groups.suffix;
      }

      function groupForPos(groups, pos) {
        var len = 0;
        var group;
        for (var i = 0; i < groups.length; i++) {
          group = groups[i];
          len += group.prefix.length + (group.display || '').length;
          if (pos <= len) { return group; }
        }
        return groups[0];
      }

      function lastDay(date) {
        return (new Date((new Date(date.getFullYear(), date.getMonth() + 1, 1)) - 86400000)).getDate();
      }

      function selectGroup(node, group) {
        var len = 0;
        var groups = group.groups;
        var g;
        for (var i = 0; i <= group.chunk; i++) {
          g = groups[i];
          len += g.prefix.length;
          if (i === group.chunk) { node.setSelectionRange(len, len + (g.display || '').length); }
          else { len += (g.display || '').length; }
        }
      }

      function selectNextGroup(node, group) {
        selectGroup(node, group.groups[group.chunk + 1] ? group.groups[group.chunk + 1] : group.groups[0]);
      }

      function selectPrevGroup(node, group) {
        selectGroup(node, group.groups[group.chunk - 1] ? group.groups[group.chunk - 1] : group.groups[group.groups.length - 1]);
      }

      function currentInput(node, group) {
        var str = node.value;
        var groups = group.groups;
        var len = 0, i = 0;
        var res = [];
        for (i = 0; i < group.chunk; i++) {
          len += groups[i].prefix.length;
          len += (groups[i].display || '').length;
        }
        len += groups[i].prefix.length;
        res[0] = str.substr(0, len);
        var next;
        if (groups[i + 1]) { next = str.indexOf(groups[i + 1].prefix, len); }
        res[1] = str.substring(len, next);
        res[2] = typeof next === 'number' ? str.substr(next) : '';
        return res;
      }

      var origin = new Date('0000-01-01T00:00:00');
      function getDateValue(thing) {
        var v = thing;
        if (typeof v === 'function') { v = thing(); }
        if (typeof v === 'string') { try { v = Date.parse(v); } catch (e) { return defaultDate(); } }
        if (Object.toString.call(Object, v) === '[object Date]') { return v; }
        else { return origin; }
      }

      function redraw(node, groups) {
        var pos = node.selectionStart;
        node.value = printDate(groups);
        node.setSelectionRange(pos, pos);
      }

      function lpad(str, char, total) {
        var v = '' + str;
        for (var i = v.length; i < total; i++) {
          v = char + v;
        }
        return v;
      }

      function revalue(groups) {
        var v = groups.value || new Date();
        var nums = [v.getFullYear(), v.getMonth() + 1, v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()];

        groups.forEach(function (g) {
          switch (g.type) {
            case 'y':
              nums[0] = g.value;
              break;
            
            case 'M':
              nums[1] = g.value;
              if (nums[1] < 0) {
                nums[1] = g.value = 0;
                updateDisplay(g);
              } else if (nums[1] > 11) {
                nums[1] = g.value = 11;
                updateDisplay(g);
              }
              nums[1]++;
              break;
            
            case 'd':
              nums[2] = g.value;
              if (nums[2] < 1) {
                nums[2] = g.value = 1;
                updateDisplay(g);
              } else if (nums[2] > 31) {
                nums[2] = g.value = 31;
                updateDisplay(g);
              }
              break;
            
            case 'H':
              nums[3] = g.value;
              if (nums[3] < 0) {
                nums[3] = g.value = 0;
                updateDisplay(g);
              } else if (nums[3] > 23) {
                nums[3] = g.value = 23;
                updateDisplay(g);
              }
              break;
            
            case 'm':
              nums[4] = g.value;
              if (nums[4] < 0) {
                nums[4] = g.value = 0;
                updateDisplay(g);
              } else if (nums[4] > 59) {
                nums[4] = g.value = 59;
                updateDisplay(g);
              }
              break;

            case 's':
              nums[5] = g.value;
              if (nums[5] < 0) {
                nums[5] = g.value = 0;
                updateDisplay(g);
              } else if (nums[5] > 59) {
                nums[5] = g.value = 59;
                updateDisplay(g);
              }
              break;

            case 'S':
              nums[6] = g.value;
              if (nums[6] < 0) {
                nums[6] = g.value = 0;
                updateDisplay(g);
              } else if (nums[6] > 999) {
                nums[6] = g.value = 999;
                updateDisplay(g);
              }
              break;
          }
        });

        var next;
        
        for (var i = 0; i < 4; i++) {
          next = new Date(((lpad(nums[0], '0', 4)) + "-" + (lpad(nums[1], '0', 2)) + "-" + (lpad(nums[2], '0', 2)) + "T" + (lpad(nums[3], '0', 2)) + ":" + (lpad(nums[4], '0', 2)) + ":" + (lpad(nums[5], '0', 2)) + "." + (lpad(nums[6], '0', 3))));
          if (isNaN(next.getDate()) || next.getDate() !== nums[2]) {
            nums[2]--;
          } else {
            groups.value = next;
            if (i > 0) {
              groups.filter(function (g) { return g.type === 'd'; }).forEach(function (g) {
                g.value = nums[2];
                updateDisplay(g);
              });
            }
            return;
          }
        }
      }

      function checkPending(node, group) {
        group.value = +(currentInput(node, group)[1] || 1);
        if (group.type === 'M') { group.value--; }
        else if (group.type === 'y' && group.value < 100) {
          var yr = (new Date()).getFullYear() + '';
          if (group.value - +(yr.substr(2)) < 20) { group.value = +(yr.substr(0, 2) + '00') + group.value; }
          else { group.value = +(yr.substr(0, 2) + '00') - 100 + group.value; }
        }
      }

    }
  };
});
