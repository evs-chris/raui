import globalRegister from './globalRegister';

export default function fade(t, params) {
  const p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
  if (t.isIntro) {
    t.setStyle('opacity', 0);
    return t.animateStyle('opacity', 1, p);
  } else {
    t.setStyle('opacity', 1);
    return t.animateStyle('opacity', 0, p);
  }
}

globalRegister('fade', 'transitions', fade);
