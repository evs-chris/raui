/** @param { HTMLElement } node  */
export function sized(node, attrs) {
  const ctx = attrs.context || this.getContext(node);
  const start = {
    position: node.style.position,
    overflowY: node.style.overflowY
  }

  if (node.style.position === '' || node.style.position === 'static') node.style.position = 'relative';

  const refresh = () => {
    if (attrs.offsetWidth) ctx.set(attrs.offsetWidth, node.offsetWidth);
    if (attrs.offsetHeight) ctx.set(attrs.offsetHeight, node.offsetHeight);
    if (attrs.clientWidth) ctx.set(attrs.clientWidth, node.clientWidth);
    if (attrs.clientHeight) ctx.set(attrs.clientHeight, node.clientHeight);
    if (attrs.diffWidth) ctx.set(attrs.diffWidth, node.offsetWidth - node.clientWidth);
    if (attrs.diffHeight) ctx.set(attrs.diffHeight, node.offsetHeight - node.clientHeight);
  };

  const obj = initObject(node, refresh);

  return {
    refresh,
    teardown() {
      node.removeChild(obj);
      node.style.position = start.position;
      node.style.overflowY = start.overflowY;
    }
  }
}

function initObject(parent, refresh) {
  const obj = document.createElement('object');
  obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
  obj.setAttribute('tabindex', '-1');
  obj.type = 'text/html';

  obj.onload = () => {
    obj.contentDocument.defaultView.addEventListener('resize', refresh);
    refresh();
  };
  
  if (/Trident/.test(navigator.userAgent)) {
    parent.appendChild(obj);
    obj.data = 'about:blank';
  } else {
    obj.data = 'about:blank';
    parent.appendChild(obj);
  }

  return obj;
}

let emSize = 16;
let emEl;

function setEmSize(size) {
  emSize = size;
}

function initEmEl() {
  if (!emEl && window && 'document' in window && typeof document.createElement === 'function') {
    emEl = document.createElement('div');
    emEl.setAttribute('style', 'position: absolute; left: -2em; width: 1em; height: 1em;')

    initObject(emEl, () => setEmSize(emEl.getBoundingClientRect().width));

    window.addEventListener('resize', () => {
      initEmEl();
      setEmSize(emEl.getBoundingClientRect().width);
    });
  }

  if (emEl && !emEl.parent) {
    document.body.appendChild(emEl);
  }
}

export function refreshSizer() {
  initEmEl();
}

export function sizeInEm(px) {
  if (!emEl) initEmEl();
  if (typeof px === 'string') px = px.replace(/[^-.\d]/g, '');
  return +px / emSize;
}

export function sizeInPx(em) {
  if (!emEl) initEmEl();
  if (typeof em === 'string') em = em.replace(/[^-.\d]/g, '');
  return +em * emSize;
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.decorators[opts.name || 'watch-size'] = sized;
  };
}
