export function clickout(node, fire) {
  let registered = false, torndown = false;
  function handler(ev) {
    let n = ev.target;
    while (n) {
      if (n === node) return;
      if (!n.parentNode && n !== document) return;
      n = n.parentNode;
    }
    fire(ev);
  }


  setTimeout(() => {
    registered = true;
    if (!torndown) {
      document.body.addEventListener('click', handler, { capture: true });
      document.body.addEventListener('touchstop', handler, { capture: true });
    }
  });
  

  return {
    teardown() {
      torndown = true;
      if (registered) {
        document.body.removeEventListener('click', handler, { capture: true });
        document.body.removeEventListener('touchstop', handler, { capture: true });
      }
    }
  }
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.events[opts.name || 'clickout'] = clickout;
  }
}

export default plugin;
