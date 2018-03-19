import Ractive from 'ractive';
import globalRegister from './globalRegister';

export function keys(...keys) {
  return function KeyEvent(node, fire) {
    const ctx = Ractive.getContext(node);

    const listener = ctx.listen('keydown', ev => {
      if (~keys.indexOf(ev.which)) {
        fire(ev);
        ev.preventDefault();
      }
    });

    return {
      teardown() {
        listener.cancel();
      }
    }
  }
}

const tabQuery = 'input:not(:disabled):not([tabIndex="-1"]), select:not(:disabled):not([tabIndex="-1"]), a:not([tabIndex="-1"]), button:not(:disabled):not([tabIndex="-1"])';

export function tab(instance) {
  let nodes;

  if (instance) {
    nodes = instance.findAll(tabQuery);
  } else {
    nodes = document.querySelectorAll(tabQuery);
  }

  const node = document.activeElement;

  const idx = nodes.indexOf(node);

  if (idx === -1 || idx === nodes.length - 1) {
    nodes[0].focus();
  } else {
    nodes[idx + 1].focus();
  }
}

globalRegister('RMKeyEvent', 'events', keys);
globalRegister('RMTabEvent', 'events', tab);
