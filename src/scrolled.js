export function scrolled(node, opts = {}) {
  const bind = typeof opts === 'string' ? opts : opts.bind;
  if (typeof bind !== 'string') return { teardown() {} };

  const allow = opts.allow || 2;

  const ctx = this.getContext(node);
  let pending = false;

  function watch() {
    pending = false;
    let str = '';
    if (node.scrollHeight > node.clientHeight) str += 'vscroll';
    if (node.scrollWidth > node.clientWidth) str += (str ? ' ' : '') + 'hscroll';

    if (node.scrollTop <= allow) str += ' top';
    if (node.scrollTop >= node.scrollHeight - node.clientHeight - allow) str += ' bottom';
    if (!~str.indexOf('top') && !~str.indexOf('bottom')) str += ' vmiddle';

    if (node.scrollLeft <= allow) str += ' left';
    if (node.scrollLeft >= node.scrollWidth - node.clientWidth - allow) str += ' right';
    else if (!~str.indexOf('left') && !~str.indexOf('right')) str += ' hmiddle';

    ctx.set(bind, str);
    if (ctx.hasListener('scrolled')) ctx.raise('scrolled', {});
  }

  node.addEventListener('scroll', watch, { passive: true });

  requestAnimationFrame(watch);

  return {
    refresh() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(watch);
    },
    teardown() {
      node.removeEventListener('scroll', watch);
      ctx.set(bind, '');
    }
  }
}

export function plugin(options = {}) {
  return function({ instance }) {
    instance.decorators[options.name || 'scrolled'] = scrolled;
  }
}

export default plugin;
