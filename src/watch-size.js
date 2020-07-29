/** @param { HTMLElement } node  */
export function sized(node, attrs) {
  const ctx = attrs.context || this.getContext(node);
  const start = {
    position: node.style.position,
    overflowY: node.style.overflowY
  }

  if (node.style.position === '' || node.style.position === 'static') node.style.position = 'relative';

  const obj = document.createElement('object');
  obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
  obj.setAttribute('tabindex', '-1');
  obj.type = 'text/html';

  const refresh = () => {
    if (attrs.offsetWidth) ctx.set(attrs.offsetWidth, node.offsetWidth);
    if (attrs.offsetHeight) ctx.set(attrs.offsetHeight, node.offsetHeight);
    if (attrs.clientWidth) ctx.set(attrs.clientWidth, node.clientWidth);
    if (attrs.clientHeight) ctx.set(attrs.clientHeight, node.clientHeight);
    if (attrs.diffWidth) ctx.set(attrs.diffWidth, node.offsetWidth - node.clientWidth);
    if (attrs.diffHeight) ctx.set(attrs.diffHeight, node.offsetHeight - node.clientHeight);
  };

  obj.onload = () => {
    obj.contentDocument.defaultView.addEventListener('resize', refresh);
    refresh();
  };
  
  if (/Trident/.test(navigator.userAgent)) {
    node.appendChild(obj);
    obj.data = 'about:blank';
  } else {
    obj.data = 'about:blank';
    node.appendChild(obj);
  }

  return {
    refresh,
    teardown() {
      node.removeChild(obj);
      node.style.position = start.position;
      node.style.overflowY = start.overflowY;
    }
  }
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.decorators[opts.name || 'watch-size'] = sized;
  };
}
