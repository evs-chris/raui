import globalRegister from './globalRegister';
import Ractive from 'ractive';

function findParent(el, fn) {
  if (fn(el)) return el;
  while (el = (el && el.parentElement)) {
    if (fn(el)) return el;
  }
}

export function move(opts = {}) {
  const lists = [];
  const suffix = opts.suffix || '';
  const prefix = `move${suffix}`;
  let moving;
  let from;
  let over;
  let sidx;
  let didx;

  let xTimeout;
  let yTimeout;

  function src(el, o = {}) {
    let path;
    if (typeof o === 'string') {
      path = o;
      o = Object.assign({}, opts);
    } else if (typeof o === 'object') {
      path = o.path;
    }
    o = Object.assign({}, opts, o);
    const scroll = o.scroll === false ? false : Object.assign({ repeatDelay: 16, distance: 10, initialDelay: 250, threshold: 0.15, behavior: 'instant' }, o.scroll);

    const pos = el.style.position;
    if (pos === '' || pos === 'static') el.style.position = 'relative';
    let indicator;
    let vh;

    function checkVH() {
      if (el.children.length > 1) {
        const els = el.children;
        const x1 = els[0].offsetLeft;
        const y1 = els[0].offsetTop;
        const x2 = els[1].offsetLeft;
        const y2 = els[1].offsetTop;
        if (x1 < x2 && y1 === y2) vh = 'h';
        else if (y1 < y2 && x1 === x2) vh = 'v';
        else if (y2 > y1) vh = 'v';
        else if (x2 > x1) vh = 'h';
        else vh = 'v';
      } else {
        vh = 'v';
      }
    }
    checkVH();

    const dragenter = ev => {
      if (el === from && o.sort === false) return;
      if (el.contains(ev.target) && !el.classList.contains(`${prefix}ing`)) el.classList.add(`${prefix}ing`);
      over = el;
      // chrome doubles this somehow, so query first
      indicator = indicator || el.querySelector(`:scope > .${prefix}-indicator`);
      if (!indicator) {
        checkVH();
        indicator = document.createElement('div');
        indicator.style.border = '1px solid';
        indicator.style.margin = '0';
        indicator.style.padding = '0';
        indicator.style.position = 'absolute';
        indicator.classList.add(`${prefix}-indicator`);
        indicator.style.color = o.color || Ractive.styleGet('raui.primary.fga') || '#07e';
        const e = el.children[0] || moving;
        if (vh === 'v') {
          indicator.style.width = `${e.offsetWidth}px`;
          indicator.style.height = '0';
        } else {
          indicator.style.height = `${e.offsetHeight}px`;
          indicator.style.width = '0';
        }
        el.appendChild(indicator);
      }
    };
    function stop(leave) {
      if (indicator) {
        if (indicator.remove) indicator.remove();
        indicator = undefined;
      }
      if (!leave) {
        if (xTimeout) clearTimeout(xTimeout), xTimeout = undefined;
        if (yTimeout) clearTimeout(yTimeout), yTimeout = undefined;
      }
      if (el.classList.contains(`${prefix}ing`)) el.classList.remove(`${prefix}ing`);
    }
    const dragleave = ev => {
      if (el.contains(ev.relatedTarget)) return;
      stop(true);
    };
    const dragover = ev => {
      ev.preventDefault();
      if (xTimeout) clearTimeout(xTimeout), xTimeout = undefined;
      if (yTimeout) clearTimeout(yTimeout), yTimeout = undefined;
      if (indicator && ev.target !== el && ev.target !== indicator && !o.appendOnly) {
        let t = findParent(ev.target, e => e.parentElement === el);
        if (!t) return;
        if (vh === 'v') {
          let top;
          if (ev.offsetY > t.clientHeight / 2) {
            const n = t.nextElementSibling;
            didx = Ractive.getContext(t).get('@index') + 1;
            if (n && n !== indicator && n.offsetLeft === t.offsetLeft) {
              const p = t.offsetTop + t.offsetHeight;
              top = p + ((n.offsetTop - p) / 2);
            } else {
              const p = t.offsetTop + t.offsetHeight;
              top = p + ((el.scrollHeight - p) / 2);
            }
          } else {
            const n = t.previousElementSibling;
            didx = Ractive.getContext(t).get('@index');
            if (n && n !== indicator && n.offsetLeft === t.offsetLeft) {
              const p = n.offsetTop + n.offsetHeight;
              top = p + ((t.offsetTop - p) / 2);
            } else {
              const p = t.offsetTop;
              top = p - (p / 2);
            }
          }
          indicator.style.top = `${Math.floor(top - 1)}px`;
          indicator.style.left = `${t.offsetLeft}px`;
        } else {
          let left;
          if (ev.offsetX > t.clientWidth / 2) {
            const n = t.nextElementSibling;
            didx = Ractive.getContext(t).get('@index') + 1;
            if (n && n !== indicator && n.offsetTop === t.offsetTop) {
              const p = t.offsetLeft + t.offsetWidth;
              left = p + ((n.offsetLeft - p) / 2);
            } else {
              const p = t.offsetLeft + t.offsetWidth;
              left = p + ((el.scrollWidth - p) / 2);
            }
          } else {
            const n = t.previousElementSibling;
            didx = Ractive.getContext(t).get('@index');
            if (n && n !== indicator && n.offsetTop === t.offsetTop) {
              const p = n.offsetLeft + n.offsetWidth;
              left = p + ((t.offsetLeft - p) / 2);
            } else {
              const p = t.offsetLeft;
              left = p - (p / 2);
            }
          }
          indicator.style.left = `${Math.floor(left - 1)}px`;
          indicator.style.top = `${t.offsetTop}px`;
        }
      }

      if (scroll) {
        const xscroll = findParent(el, e => e.offsetWidth < e.scrollWidth && ['auto', 'scroll'].includes(getComputedStyle(e).overflow));
        const yscroll = findParent(el, e => e.offsetHeight < e.scrollHeight && ['auto', 'scroll'].includes(getComputedStyle(e).overflow));

        if (xscroll) {
          const rect = xscroll.getBoundingClientRect();
          const x = ev.clientX;
          const threshold = rect.width * scroll.threshold;
          if (x < rect.left + threshold || x > rect.right - threshold) {
            function go() {
              if (x < rect.left + threshold && xscroll.scrollLeft === 0) return;
              if (x > rect.right - threshold && xscroll.scrollLeft + xscroll.offsetWidth >= xscroll.scrollWidth) return;
              xscroll.scroll({
                left: xscroll.scrollLeft + (x < rect.left + threshold ? -scroll.distance: scroll.distance),
                behavior: scroll.behavior,
              });
              xTimeout = setTimeout(go, scroll.repeatDelay);
            };
            xTimeout = setTimeout(go, scroll.initialDelay);
          }
        }
        if (yscroll) {
          const rect = yscroll.getBoundingClientRect();
          const y = ev.clientY;
          const threshold = rect.height * scroll.threshold;
          if (y < rect.top + threshold || y > rect.bottom - threshold) {
            function go() {
              if (y < rect.top + threshold && yscroll.scrollTop === 0) return;
              if (y > rect.bottom - threshold && yscroll.scrollTop + yscroll.offsetHeight >= yscroll.scrollHeight) return;
              yscroll.scroll({
                top: yscroll.scrollTop + (y < rect.top + threshold ? -scroll.distance: scroll.distance),
                behavior: scroll.behavior,
              });
              yTimeout = setTimeout(go, scroll.repeatDelay);
            };
            yTimeout = setTimeout(go, scroll.initialDelay);
          }
        }
      }
    };
    const drop = ev => {
      ev.preventDefault();
      over = undefined;
      const m = moving, f = from;
      moving = undefined;
      from = undefined;
      stop();
      if (m.classList.contains(`${prefix}ing`)) m.classList.remove(`${prefix}ing`);
      if (el === f && o.sort === false) return;
      const sctx = Ractive.getContext(f);
      const dctx = Ractive.getContext(el);
      const ictx = Ractive.getContext(m);
      if (!sctx || !dctx || !ictx) return;
      const spath = sctx.decorators[prefix].path;
      const slist = spath === undefined ? undefined : sctx.get(spath);
      const dpath = dctx.decorators[prefix].path;
      const dlist = dpath === undefined ? undefined : dctx.get(dpath);
      const i = ictx.get();
      if (f === el && sidx < didx && typeof didx === 'number') didx--;
      if (f == el && didx === sidx) return;
      ictx.raise(prefix, {}, { src: sctx, srcPath: spath, srcIndex: sidx, dest: dctx, destPath: dpath, destIndex: didx, item: i, context: ictx });
      sctx.raise(`${prefix}out`, {}, { src: sctx, srcPath: spath, srcIndex: sidx, dest: dctx, destPath: dpath, destIndex: didx, item: i, context: ictx });
      dctx.raise(`${prefix}in`, {}, { src: sctx, srcPath: spath, srcIndex: sidx, dest: dctx, destPath: dpath, destIndex: didx, item: i, context: ictx });
      if (!o.eventsOnly && Array.isArray(slist) && (Array.isArray(dlist) || dlist === undefined)) {
        sctx.splice(spath, sidx, 1);
        if (o.appendOnly) dctx.push(dpath, i);
        else dctx.splice(dpath, didx, 0, i);
      }
      checkVH();
    };
    el.addEventListener('dragenter', dragenter);
    el.addEventListener('dragleave', dragleave);
    el.addEventListener('dragover', dragover);
    el.addEventListener('drop', drop);
    return {
      path,
      stop,
      teardown() {
        if (indicator && indicator.remove) indicator.remove();
        indicator = undefined;
        el.removeEventListener('dragenter', dragover);
        el.removeEventListener('dragleave', dragleave);
        el.removeEventListener('dragover', dragover);
        el.removeEventListener('drop', drop);
        el.style.position = pos;
      }
    };
  }

  function item(el, o) {
    const dragstart = ev => {
      moving = el;
      from = findParent(el, el => Ractive.getContext(el).decorators[prefix]);
      sidx = Ractive.getContext(el).get('@index');
      if (!el.classList.contains(`${prefix}ing`)) el.classList.add(`${prefix}ing`);
    };
    const dragend = ev => {
      if (moving && moving.classList.contains(`${prefix}ing`)) moving.classList.remove(`${prefix}ing`);
      moving = undefined;
      from = undefined;
      if (over) {
        const ctx = Ractive.getContext(over);
        if (ctx && ctx.decorators && ctx.decorators[prefix]) ctx.decorators[prefix].stop();
      }
      over = undefined;
    };
    const dragAttr = el.getAttribute('draggable');
    el.setAttribute('draggable', 'true');
    el.classList.add(`${prefix}Item`);
    el.addEventListener('dragstart', dragstart);
    el.addEventListener('dragend', dragend);
    return {
      teardown() {
        if (dragAttr === null) el.removeAttribute('draggable');
        else el.setAttribute('draggable', dragAttr);
        el.classList.remove(`${prefix}Item`);
        el.removeEventListener('dragstart', dragstart);
        el.removeEventListener('dragend', dragend);
      }
    };
  }

  return {
    move: src,
    moveItem: item,
    plugin({ instance }) {
      instance.decorators[prefix] = src;
      instance.decorators[`${prefix}Item`] = item;
    },
  };
};
