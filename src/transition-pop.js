import globalRegister from './globalRegister';

export function pop(t, params = {}) {
  const p = t.processParams(params, { duration: 400, easing: 'easeInOut' });
  params.dir = params.dir || false;
  const distance = params.distance || '20px';
  const scale = params.scale || '0.9';
  const dir = params.dir === 'above' ? `translateY(${distance})` :
    params.dir === 'left' ? `translateX(${distance})` :
    params.dir === 'right' ? `translateX(-${distance})` :
    `translateY(-${distance})`;

  if (t.isIntro || p.intro) {
    t.setStyle('opacity', 0);
    t.setStyle('transform', `scale(${scale}) ${dir}`);
    return t.animateStyle({
      opacity: 1,
      transform: 'none'
    }, p);
  } else {
    t.setStyle('opacity', 1);
    t.setStyle('transform', 'none');
    return t.animateStyle({
      opacity: 0,
      transform: `scale(${scale}) ${dir}`
    }, p);
  }
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.transitions[opts.name || 'pop'] = pop;
  }
}

globalRegister('pop', 'transitions', pop);

export default plugin;
