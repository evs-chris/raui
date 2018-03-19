import globalRegister from './globalRegister';

export function fade(t, params) {
  const p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
  if (t.isIntro) {
    t.setStyle('opacity', 0);
    return t.animateStyle('opacity', 1, p);
  } else {
    t.setStyle('opacity', 1);
    return t.animateStyle('opacity', 0, p);
  }
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.transitions[opts.name || 'fade'] = fade;
  }
}

globalRegister('fade', 'transitions', fade);

export default plugin;
