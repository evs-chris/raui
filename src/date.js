// TODO: support for non-numeric formats?
// TODO: 12 hour time format and am/pm

export default function plugin(options = {}) {
  const defaultMask = options.mask || 'yyyy-MM-dd';
  const defaultTime = options.time || '00:00:00.000';
  const defaultDate = options.date || new Date('0000-01-01T' + defaultTime);

  return function({ instance }) {
    instance.decorators[options.name || 'date'] = function(/** @type { HTMLInputElement } */ node, opts = {}) {
      if (typeof opts === 'string') opts = { value: opts };
      const ctx = this.getContext(node);
      const mask = opts.mask || defaultMask;
      const handles = { observers: [], listeners: [] };
      let pending;
      let tm;

      if (node.tagName !== 'INPUT') {
        console.warn(`Attempted to add a date decorator a ${node.tagName}`);
        return noop;
      }

      if (!mask) return noop;

      const groups = [];
      let match, last = 0;
      while (match = dateRE.exec(mask)) {
        const group = { mask: match[0], type: match[0][0], length: match[0].length, start: match.index, end: match.index + match[0].length, chunk: groups.length, prefix: mask.substring(last, match.index), groups };
        last = group.end;
        groups.push(group);
      }
      groups.suffix = mask.substring(groups[groups.length - 1].end);

      if (groups.slice(1).find(g => !g.prefix)) {
        console.warn(`Attempted to add a date decorator missing interstitial between fields '${mask}'`);
        return noop;
      }
      
      if (typeof opts.value === 'string') {
        handles.observers.push(ctx.observe(opts.value, v => {
          if (!v) v = defaultDate;
          groups.value = v;
          updateDate(v, groups);
          node.value = printDate(groups)
        }));
      } else groups.value = getDateValue(opts.date || defaultDate);

      function sendValue() {
        if (typeof opts.value === 'string') {
          handles.observers.forEach(h => h.silence());
          ctx.set(opts.value, groups.value);
          handles.observers.forEach(h => h.resume());
        }
      }

      function mouseup(ev) {
        if (pending) {
          const group = pending;
          pending = false;
          const str = node.value;
          const [prefix, val] = currentInput(node, group);
          group.value = +(val || 1);
          if (group.type === 'M') group.value--;
          else if (group.type === 'y' && group.value < 100) {
            const yr = (new Date()).getFullYear() + '';
            if (group.value - +(yr.substr(2)) < 20) group.value = +(yr.substr(0, 2) + '00') + group.value;
            else group.value = +(yr.substr(0, 2) + '00') - 100 + group.value;
          }
          revalue(groups);
          updateDisplay(group);
          redraw(node, groups);
          if ((prefix.length + val.length) < node.selectionStart) {
            const pos = node.selectionStart + (node.value.length - str.length);
            node.setSelectionRange(pos, pos);
          }
        }
        if (ev.type === 'mouseup') document.removeEventListener('mouseup', mouseup);
        const len = node.selectionStart > node.selectionEnd ? node.selectionStart - node.selectionEnd : node.selectionEnd - node.selectionStart;
        if (len === node.value.length && ev.type !== 'focus') return;
        if (tm) clearTimeout(tm);
        if (ev.type === 'focus') {
          tm = setTimeout(() => selectGroup(node, groupForPos(groups, node.selectionStart)));
        } else {
          selectGroup(node, groupForPos(groups, node.selectionStart))
        }
      }

      handles.listeners.push(ctx.listen('focus', ev => {
        mouseup(ev);
      }));

      handles.listeners.push(ctx.listen('blur', () => {
        sendValue();
      }));

      handles.listeners.push(ctx.listen('dragstart', ev => {
        ev.preventDefault();
        ev.stopPropagation();
      }));

      handles.listeners.push(ctx.listen('keydown', (/** @type { KeyboardEvent } */ ev) => {
        const group = groupForPos(groups, node.selectionStart);

        let stop = true;
        let reval = false;
        let step = 0;

        switch (ev.key) {
          case 'ArrowDown':
            bumpValue(group, true);
            reval = group;
            break;

          case 'ArrowRight':
            const [right_prefix, str] = currentInput(node, group);
            if (node.selectionStart >= (right_prefix + str).length) step = 1;
            else stop = false;
            break;
          
          case 'ArrowLeft':
            const [left_prefix] = currentInput(node, group);
            if (node.selectionStart <= left_prefix.length && (node.selectionStart - node.selectionEnd === 0)) step = -1;
            else stop = false;
            break;
          
          case 'ArrowUp':
            bumpValue(group, false);
            reval = group;
            break;

          case 'Enter':
            if (ev.shiftKey) step = -1;
            else step = 1;
            break;
          
          case 'Backspace':
          case 'Delete':
            stop = false;
            break;

          case 'Tab':
            if (ev.shiftKey) {
              if (group.chunk === 0) stop = false;
              else step = -1
            } else {
              if (group.chunk === groups.length - 1) stop = false;
              else step = 1;
            }
            break;
        }

        if (ev.key >= '0' && ev.key <= '9') {
          pending = group;
          const start = node.selectionStart, end = node.selectionEnd;
          if (start !== end) node.value = node.value.slice(0, start > end ? end : start) + node.value.slice(start > end ? start : end);
          let [prefix, str, suffix] = currentInput(node, group);
          str += ev.key;
          node.value = prefix + str + suffix;
          node.setSelectionRange(prefix.length + str.length, prefix.length + str.length);

          if (
            (group.type === 'y' && ((group.length <= 2 && str.length > 1) || str.length >= 4)) ||
            (group.type === 'M' && (+str > 1 || str.length > 1)) ||
            (group.type === 'd' && (+str > 3 || str.length > 1)) ||
            (group.type === 'H' && (+str > 2 || str.length > 1)) ||
            ((group.type === 'm' || group.type === 's') && (+str > 6 || str.length > 1)) ||
            (group.type === 'S' && str.length === 3)
          ) {
            group.value = group.type === 'M' ? +str - 1 : +str;
            reval = group;
            if (group.chunk < groups.length - 1) step = 1;
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
          group.value = +(currentInput(node, group)[1] || 1);
          if (group.type === 'M') group.value--;
          else if (group.type === 'y' && group.value < 100) {
            const yr = (new Date()).getFullYear() + '';
            if (group.value - +(yr.substr(2)) < 20) group.value = +(yr.substr(0, 2) + '00') + group.value;
            else group.value = +(yr.substr(0, 2) + '00') - 100 + group.value;
          }
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
          if (step > 0) selectNextGroup(node, group);
          else if (step < 0) selectPrevGroup(node, group);
        }
      }));

      handles.listeners.push(ctx.listen('mousedown', () => {
        document.addEventListener('mouseup', mouseup);
      }));

      return {
        teardown() {
          handles.observers.forEach(o => o.cancel());
          handles.listeners.forEach(o => o.cancel());
        }
      }
    };
  }
}

var dateRE = /y+|M+|d+|E+|H+|m+|s+|S+|k+|a+/g;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function updateDate(v, groups) {
  if (!v) return '';
  if (typeof v === 'string') {
    v = new Date(v);
    v = new Date(+v + (v.getTimezoneOffset() * 60 * 1000));
    groups.value = v;
  }
  else if (Object.prototype.toString.call(v) !== '[object Date]') return '';

  groups.forEach(g => {
    updateValue(v, g);
    updateDisplay(g);
  });
}

const noop = { teardown() {} };

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
      if (group.length === 1) group.display = '' + (group.value + 1);
      else if (group.length === 2) group.display = (group.value < 9 ? '0' : '') + (group.value + 1);
      else if (group.length === 3) group.display = months[group.value].substr(0, 3);
      else group.display = months[group.value];
      break;
    
    case 'd':
      if (group.length === 1) group.display = '' + group.value;
      else if (group.length === 2) group.display = (group.value <= 9 ? '0' : '') + group.value;
      else if (group.length === 3) group.display = days[group.groups.value.getDay()].substr(0, 3);
      else group.display = days[group.groups.value.getDay()];
      break;
    
    case 'H':
    case 'm':
    case 's':
      if (group.length === 1) group.display = '' + group.value;
      else group.display = lpad(group.value, '0', 2);
      break;
    
    case 'S':
      if (group.length === 1) group.display = '' + group.value;
      else group.display = lpad(group.value, '0', 3);
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
  return groups.reduce((a, c) => a + c.prefix + c.display, '') + groups.suffix;
}

function groupForPos(groups, pos) {
  let len = 0;
  let group;
  for (let i = 0; i < groups.length; i++) {
    group = groups[i];
    len += group.prefix.length + group.display.length;
    if (pos <= len) return group;
  }
  return groups[0];
}

function lastDay(date) {
  return (new Date((new Date(date.getFullYear(), date.getMonth() + 1, 1)) - 86400000)).getDate();
}

function selectGroup(node, group) {
  let len = 0;
  const groups = group.groups;
  let g;
  for (let i = 0; i <= group.chunk; i++) {
    g = groups[i];
    len += g.prefix.length;
    if (i === group.chunk) node.setSelectionRange(len, len + g.display.length);
    else len += g.display.length;
  }
}

function selectNextGroup(node, group) {
  selectGroup(node, group.groups[group.chunk + 1] ? group.groups[group.chunk + 1] : group.groups[0]);
}

function selectPrevGroup(node, group) {
  selectGroup(node, group.groups[group.chunk - 1] ? group.groups[group.chunk - 1] : group.groups[group.groups.length - 1]);
}

function currentInput(node, group) {
  const str = node.value;
  const groups = group.groups;
  let g;
  let len = 0, i = 0;
  const res = [];
  for (i = 0; i < group.chunk; i++) {
    len += groups[i].prefix.length;
    len += groups[i].display.length;
  }
  len += groups[i].prefix.length;
  res[0] = str.substr(0, len)
  let next;
  if (groups[i + 1]) next = str.indexOf(groups[i + 1].prefix, len);
  res[1] = str.substring(len, next);
  res[2] = typeof next === 'number' ? str.substr(next) : '';
  return res;
}

const origin = new Date('0000-01-01T00:00:00');
function getDateValue(thing) {
  let v = thing;
  if (typeof v === 'function') v = thing();
  if (typeof v === 'string') try { v = Date.parse(v); } catch (e) {}
  if (Object.toString.call(Object, v) === '[object Date]') return v;
  else return origin;
}

function redraw(node, groups) {
  const pos = node.selectionStart;
  node.value = printDate(groups);
  node.setSelectionRange(pos, pos);
}

function lpad(str, char, total) {
  let v = '' + str;
  for (let i = v.length; i < total; i++) {
    v = char + v;
  }
  return v;
}

function revalue(groups) {
  const v = groups.value || new Date();
  const nums = [v.getFullYear(), v.getMonth() + 1, v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()];

  groups.forEach(g => {
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

  let next;
  
  for (let i = 0; i < 4; i++) {
    next = new Date(`${lpad(nums[0], '0', 4)}-${lpad(nums[1], '0', 2)}-${lpad(nums[2], '0', 2)}T${lpad(nums[3], '0', 2)}:${lpad(nums[4], '0', 2)}:${lpad(nums[5], '0', 2)}.${lpad(nums[6], '0', 3)}`);
    if (isNaN(next.getDate()) || next.getDate() !== nums[2]) {
      nums[2]--;
    } else {
      groups.value = next;
      if (i > 0) {
        groups.filter(g => g.type === 'd').forEach(g => {
          g.value = nums[2];
          updateDisplay(g);
        });
      }
      return;
    }
  }
}