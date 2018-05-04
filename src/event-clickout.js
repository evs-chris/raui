export function clickout(node, fire) {
  function handler(ev) {
    let n = ev.target;
    while (n) {
      if (n === node) return false;
      n = n.parentNode;
    }
    fire(ev);
  }

  document.body.addEventListener('click', handler);
  document.body.addEventListener('touchstop', handler);

  return {
    teardown() {
      document.body.removeEventListener('click', handler);
      document.body.removeEventListener('touchstop', handler);
    }
  }
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.events[opts.name || 'clickout'] = clickout;
  }
}

export default plugin;