export function clickout(node, fire) {
  let registered = false, torndown = false;
  function handler(ev) {
    let n = ev.target;
    while (n) {
      if (n === node) return;
      n = n.parentNode;
    }
    fire(ev);
  }


  setTimeout(() => {
    registered = true;
    if (!torndown) {
      document.body.addEventListener('click', handler);
      document.body.addEventListener('touchstop', handler);
    }
  });
  

  return {
    teardown() {
      torndown = true;
      if (registered) {
        document.body.removeEventListener('click', handler);
        document.body.removeEventListener('touchstop', handler);
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