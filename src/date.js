// TODO: support for non-numeric formats?
// TODO: 12 hour time format and am/pm

const nonDigits = /[^\d]+/;
const nonDisplay = /[^\d_]+/;
const blankChar = '_';

const map = {
  y: 0, M: 1, d: 2, H: 3, m: 4, s: 5, S: 6
};

export function padl(str, total, char = '0') {
  let v = str == null ? '' : '' + str;
  for (let i = v.length; i < total; i++) {
    v = char + v;
  }
  return v;
}

export function padr(str, total, char = '0') {
  let v = str == null ? '' : '' + str;
  for (let i = v.length; i < total; i++) {
    v += char;
  }
  return v;
}

export const defaults = {
  mask: 'yyyy-MM-dd',
  time: [0, 0, 0, 0],
  date() {
    const now = new Date();
    const tm = defaults.time;
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), tm[0], tm[1], tm[2], tm[3]);
  }
}

function timeArray(value) {
  if (value === 'start') value = [0, 0, 0, 0];
  else if (value === 'end') value = [23, 59, 59, 999];
  else if (value === 'mid') value = [12, 0, 0, 0];
  else if (value === 'now') value = () => {
    const dt = new Date();
    return [dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()];
  };
  else if (typeof value === 'string') {
    const dt = new Date(`2000-05-13T${value}Z`);
    if (+dt) value = [dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds()];
  }
  if (!Array.isArray(value) && typeof value !== 'function' && !Array.isArray(value())) value = [0, 0, 0, 0];
  return value;
}

export default function plugin(options = {}) {
  const defaultMask = options.mask || defaults.mask;
  let defaultTime = timeArray(options.time || defaults.time);
  let defaultDate = options.date || defaults.date;
  if (typeof defaultDate !== 'function') {
    const dt = defaultDate;
    defaultDate = () => dt;
  }

  return function({ instance }) {
    instance.decorators[options.name || 'date'] = function(/** @type { HTMLInputElement } */ node, optsin = {}, other) {
      const opts = Object.assign(
        {},
        options,
        typeof optsin === 'string' ? { value: optsin } : optsin,
        typeof other === 'string' ? { mask: other } : other,
      );

      let defdt = opts.date || defaultDate;
      const deftm = timeArray(opts.time || defaultTime);
      if (typeof defdt !== 'function') {
        const dt = defdt;
        defdt = () => dt;
      }

      const ctx = this.getContext(node);
      const mask = opts.mask || defaultMask;
      const handles = { observers: [], listeners: [] };

      if (node.tagName !== 'INPUT') {
        console.warn(`Attempted to add a date decorator a ${node.tagName}`);
        return noop;
      }

      if (!mask) return noop;

      const groups = [];
      let match, last = 0;
      while (match = dateRE.exec(mask)) {
        const group = { mask: match[0], type: match[0][0], length: match[0].length, start: match.index, end: match.index + match[0].length, chunk: groups.length, prefix: mask.substring(last, match.index), groups, value: null, display: padr('', match[0].length, blankChar) };
        last = group.end;
        groups.push(group);
      }
      groups.suffix = mask.substring(groups[groups.length - 1].end);
      groups.last = null;

      if (groups.slice(1).find(g => !g.prefix)) {
        console.warn(`Attempted to add a date decorator missing interstitial between fields '${mask}'`);
        return noop;
      }

      if (opts.min > opts.max) delete opts.min;
      
      if (typeof opts.value === 'string') {
        handles.observers.push(ctx.observe(opts.value, v => {
          if (!v && opts.null === false) v = defdt();
          groups.value = v;
          receiveValue(groups, v);
          groups.last = v;
          updateDisplay(groups, node);
          if (opts.min && v < opts.min || opts.max && v > opts.max) {
            groups.last = null;
            setTimeout(sendValue);
          }
        }, { defer: true }));
      }

      if (typeof opts.display === 'string') {
        handles.observers.push(ctx.observe(opts.display, v => {
          node.value = v || '';
          readInput(groups, node, mask);
          updateValues(groups);
          applyValues(groups, sendValue, true, defdt, deftm);
          updateDisplay(groups, node);
        }, { defer: true }));
      }

      if (!opts.display && !opts.value) {
        if (opts.date || opts.null === false) groups.value = getDateValue(opts.date || defdt());
        updateDisplay(groups, node);
      }

      function sendValue(focused) {
        if (groups.value === null && groups.last === null || +groups.value === +groups.last) return 1;

        if (focused && opts.lazy !== false) return;

        if (opts.null === false && groups.value === null) return receiveValue(groups, groups.last) && 1 || 1;

        if (opts.min && groups.value < opts.min) {
          receiveValue(groups, opts.min);
          updateDisplay(groups, node);
        } else if (opts.max && groups.value > opts.max) {
          receiveValue(groups, opts.max);
          updateDisplay(groups, node);
        }

        groups.last = groups.value;

        if (typeof opts.value === 'string') {
          handles.observers.forEach(h => h.silence());
          ctx.set(opts.value, groups.value);
          handles.observers.forEach(h => h.resume());
        }

        if (typeof opts.display === 'string') {
          handles.observers.forEach(h => h.silence());
          ctx.set(opts.display, node.value);
          handles.observers.forEach(h => h.resume());
        }
      }

      handles.listeners.push(ctx.listen('input', () => {
        const pos = node.selectionStart;
        const start = node.value;

        readInput(groups, node, mask);
        const active = groupForPos(groups, pos);
        const accepted = updateValues(groups, active, pos);
        applyValues(groups, sendValue, true, defdt, deftm);
        updateDisplay(groups, node);

        if (active && ((start.length >= mask.length && pos === active.end) || accepted) && active !== groups[groups.length - 1]) {
          const next = groups[groups.indexOf(active) + 1];
          node.setSelectionRange(next.start, next.end);
        } else {
          node.setSelectionRange(pos, pos);
        }
      }));

      handles.listeners.push(ctx.listen('blur', () => {
        if (sendValue(false)) receiveValue(groups, groups.value);
        updateDisplay(groups, node);
      }));

      const selectGroup = () => {
        let group;
        if (node.selectionStart === node.value.length && node.selectionEnd === node.value.length) group = groups[0];
        else group = groupForPos(groups, node.selectionStart);
        document.activeElement === node && node.setSelectionRange(group.start, group.end);
      };
      handles.listeners.push(ctx.listen('click', selectGroup));
      handles.listeners.push(ctx.listen('focus', selectGroup));

      handles.listeners.push(ctx.listen('keydown', (/** @type { KeyboardEvent } */ ev) => {
        switch (ev.key) {
          case 'Enter':
          case 'Tab': {
            const g = groupForPos(groups, node.selectionStart);
            const idx = groups.indexOf(g);
            if (updateValues(groups, g, node.selectionStart, true)) {
              updateDisplay(groups, node);
              applyValues(groups, sendValue, ev.shiftKey && idx > 0 || !ev.shiftKey && idx + 1 < groups.length, defdt, deftm);
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
            const [s, e] = [node.selectionStart, node.selectionEnd];
            const g = groupForPos(groups, s);
            if (g.value === null) g.value = 1;
            bumpValue(g, ev.key === 'ArrowDown');
            g.input = g.display = displayForGroup(g);
            applyValues(groups, sendValue, true, defdt, deftm);
            updateDisplay(groups, node);
            ev.preventDefault();
            ev.stopPropagation();
            node.setSelectionRange(s, e);
            break;
          }
        }
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

function readInput(groups, node, mask) {
  const val = node.value;
  const pos = node.selectionStart;
  const active = groupForPos(groups, pos);
  let gidx = 0;
  let group = groups[gidx];
  let next = groups[gidx + 1];
  groups.forEach(g => g.input = '');

  for (let i = 0; i < val.length; i++) {
    if (next && val[i] === next.prefix[0] && (active !== group || group.input.length >= group.length || val.length - i < (mask.length - group.end) + (group.length - group.input.length))) {
      // skip separator
      if (next.prefix.length > 1) i += next.prefix.length - 1;
      // skip duped separator
      if (val[i + 1] === next.prefix[0]) i += next.prefix.length;

      group = groups[++gidx];
      next = groups[gidx + 1];
    } else group.input += val[i];
  }
}

function updateValues(groups, target, pos = 0, leave = false) {
  let accepted = false;
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    let v = (g.input || '').replace(nonDigits, '');
    const hasSep = groups[i + 1] && groups[i + 1].prefix && nonDisplay.test(g.input);
    if (v.length > g.length && g === target) {
      const drop = v.length - target.length;
      v = v.substr(0, pos - target.start) + v.substr((pos - target.start) + drop);
    } else {
      v = v.substr(0, g.length);
    }
    g.input = v;

    if (g.type === 'y' && v.length === 0 && (hasSep || leave)) {
      g.value = (new Date()).getFullYear();
      g.input = g.display = padl(g.value, g.length);
      accepted = true;
    } else if (g.type === 'm' && v.length === 0 && (hasSep || leave)) {
      g.value = 0;
      g.input = g.display = padl(g.value, g.length);
      accepted = true;
    } else if (v === '') {
      g.value = null;
      g.display = displayForGroup(g);
    } else if (g !== target) {
      g.value = +v;
      if (g.type === 'M') g.value--;
      g.display = displayForGroup(g);
    } else {
      if (
        (g.type === 'M' && +v > 1) ||
        (g.type === 'd' && +v > 3) ||
        (g.type === 'H' && +v > 2) ||
        ((g.type === 'm' || g.type === 's') && +v > 6)
      ) {
        g.value = +v;
        if (g.type === 'M') g.value--;
        g.display = padl(v, g.length);
        accepted = true;
      } else if (g.type === 'y' && v.length === 2 && (hasSep || leave)) {
        const n = (new Date()).getFullYear();
        const cen = Math.floor(n / 100) * 100;
        const val = Math.abs(n - (cen + +v)) < 20 ? cen + +v : (cen - 100) + +v;
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
  const parts = v ? [v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()] : [null, null, null, null, null, null, null];
  groups.forEach(g => {
    g.value = parts[map[g.type]];
    g.input = g.display = displayForGroup(g);
  });
}

function applyValues(groups, send, focused, defaultDate, defaultTime) {
  const v = groups.value || defaultDate();
  const parts = [v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()];

  if (!groups.find(p => p.type === 'm' || p.type === 's' || p.type === 'h' || p.type === 'S')) {
    if (typeof defaultTime === 'function') defaultTime = defaultTime();
    for (let i = 0; i < 4; i++) parts[i + 3] = defaultTime[i];
  }
  
  groups.forEach(g => {
    let vv = g.value;
    if (vv !== null && g.type === 'M') {
      if (vv < 0) vv = 0;
      else if (vv > 11) vv = 11;
    } else if (vv !== null && (g.type === 'm' || g.type === 's')) {
      if (vv < 0) vv = 0;
      else if (vv > 59) vv = 59;
    } else if (vv !== null && g.type === 'H') {
      if (vv < 0) vv = 0;
      else if (vv > 23) vv = 23;
    } else if (vv !== null && g.type === 'h') {
      if (vv < 1) vv = 1;
      else if (vv > 12) vv = 12;
    }

    if (vv !== g.value) {
      g.value = vv;
      g.display = displayForGroup(g);
    }

    parts[map[g.type]] = g.value;
  });

  if (parts[0] !== null && parts[1] !== null && parts[2] !== null) {
    const d = groups.find(g => g.type === 'd');
    if (d) {
      if (parts[2] < 1) {
        d.value = parts[2] = 1;
        d.display = displayForGroup(d);
      } else {
        const last = lastDay(new Date(parts[0], parts[1], 1));
        if (parts[2] > last) {
          d.value = parts[2] = last;
          d.display = displayForGroup(d);
        }
      }
    }
  }

  if (groups.find(g => g.value === null) || parts[0] === 0 || parts[1] > 11 || parts[1] < 0 || parts[2] === 0) {
    groups.value = null;
  } else {
    parts.unshift(null);
    groups.value = new (Date.bind.apply(Date, parts))();
  }

  send(focused);
}

function updateDisplay(groups, node) {
  node.value = groups.reduce((a, c) => {
    return a + c.prefix + c.display;
  }, '') + groups.suffix;
}

function groupForPos(groups, pos) {
  return groups.find(g => pos >= g.start && pos <= g.end);
}

function displayForGroup(group) {
  if (group.value === null) return padl('', group.length, blankChar);
  switch (group.type) {
    case 'y':
      if (!group.value) return padl('', group.length, blankChar);
      return group.length <= 2 ? ('' + group.value).substr(2, 2) : '' + padl(group.value, group.length);
    
    case 'M':
      if (!~group.value) return padl('', group.length, blankChar);
      if (group.length === 1) return '' + (group.value + 1);
      else if (group.length === 2) return (group.value < 9 ? '0' : '') + (group.value + 1);
      else if (group.length === 3) return months[group.value].substr(0, 3);
      else return months[group.value];
    
    case 'd':
      if (!group.value) return padl('', group.length, blankChar);
      if (group.length === 1) return '' + group.value;
      else if (group.length === 2) return (group.value <= 9 ? '0' : '') + group.value;
      else if (group.length === 3) return days[group.groups.value.getDay()].substr(0, 3);
      else return days[group.groups.value.getDay()];
    
    case 'H':
    case 'h':
    case 'm':
    case 's':
      if (group.length === 1) return '' + group.value;
      else return padl(group.value, group.length);
    
    case 'S':
      if (group.length === 1) return '' + group.value;
      else return padl(group.value, 3);
  }
}

var dateRE = /y+|M+|d+|E+|H+|m+|s+|S+|k+|a+/g;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const noop = { teardown() {} };

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
      const groups = group.groups;
      const last = lastDay(new Date((groups.find(g => g.type === 'y') || { value: 1 }).value, (groups.find(g => g.type === 'M') || { value: 1 }).value), 1);
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

const origin = new Date('0000-01-01T00:00:00');
function getDateValue(thing) {
  let v = thing;
  if (typeof v === 'function') v = thing();
  if (typeof v === 'string') try { v = new Date(v); } catch (e) { return defaultDate(); }
  if (v instanceof Date) return v;
  else return origin;
}
