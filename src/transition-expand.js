import globalRegister from './globalRegister';

export default function expand(t, params) {
  const p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
  t.setStyle('overflow', 'hidden');
  const axis = p.axis === 'x' ? 'width' : 'height';
  if (t.isIntro) {
    const val = t.getStyle(axis);
    t.setStyle(axis, 0);
    t.setStyle('opacity', 0);
    return t.animateStyle(axis, val, p).then(() => t.animateStyle('opacity', 1, p));
  } else {
    t.setStyle(axis, t.getStyle(axis));
    t.setStyle('opacity', 1);
    return t.animateStyle('opacity', 0, p).then(() => t.animateStyle(axis, 0, p));
  }
}

globalRegister('expand', 'transitions', expand);
