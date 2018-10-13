import globalRegister from './globalRegister';

export function expand(t, params) {
  const p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
  return new Promise(ok => {
    // defer execution to allow for grid stuff
    requestAnimationFrame(() => {
      t.setStyle('overflow', 'hidden');
      const axis = p.axis === 'x' ? 'width' : 'height';
      if (t.isIntro || p.intro) {
        const val = t.getStyle(axis);
        t.setStyle(axis, 0);
        t.setStyle('opacity', 0);
        ok(t.animateStyle(axis, val, p)
          .then(() => t.animateStyle('opacity', 1, p))
          .then(() => {
            t.setStyle(axis, '');
            t.setStyle('overflow', '');
          }));
      } else {
        t.setStyle(axis, t.getStyle(axis));
        t.setStyle('opacity', 1);
        ok(t.animateStyle('opacity', 0, p)
          .then(() => t.animateStyle(axis, 0, p)));
      }
    });
  });
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.transitions[opts.name || 'expand'] = expand;
  }
}

globalRegister('expand', 'transitions', expand);

export default plugin;
