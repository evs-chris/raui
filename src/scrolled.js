export function scrolled(node, opts = {}) {
  const bind = typeof opts === 'string' ? opts : opts.bind;
  if (typeof bind !== 'string') return { teardown() {} };

  const allow = opts.allow || 2;

  const ctx = this.getContext(node);

  function watch() {
    let str = '';
    if (node.scrollHeight > node.clientHeight) str += 'vscroll';
    if (node.scrollWidth > node.clientWidth) str += (str ? ' ' : '') + 'hscroll';

    if (node.scrollTop <= allow) str += ' top';
    else if (node.scrollTop >= node.scrollHeight - node.clientHeight - allow) str += ' bottom';
    else str += ' vmiddle';

    if (node.scrollLeft <= allow) str += ' left';
    else if (node.scrollLeft >= node.scrollWidth - node.clientWidth - allow) str += ' right';
    else str += ' hmiddle';

    ctx.set(bind, str);
  }

  node.addEventListener('scroll', watch, { passive: true });

  requestAnimationFrame(watch);

  return {
    refresh: watch,
    teardown() {
      node.removeEventListener('scroll', watch);
    }
  }
}

export function plugin(options = {}) {
  return function({ instance }) {
    instance.decorators[options.name || 'scrolled'] = scrolled;
  }
}

export default plugin;
