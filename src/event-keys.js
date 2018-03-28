import Ractive from 'ractive';
import globalRegister from './globalRegister';

export default function keys(opts = {}) {
  function KeyEvent(node, fire) {
    const options = Object.assign({}, { keys: opts.keys }, arguments[arguments.length - 1]);
    if (arguments.length > 2) {
      options.keys = [];
      for (let i = 2; i < arguments.length; i++) {
        if (typeof arguments[i] === 'number') options.keys.push(arguments[i]);
      }
    }

    const ctx = Ractive.getContext(node);

    const listener = ctx.listen('keydown', ev => {
      if (~options.keys.indexOf(ev.which)) {
        fire({ event: ev });
        if (options.prevent !== false) ev.preventDefault();
      }
    });

    return {
      teardown() {
        listener.cancel();
      }
    }
  }

  function plugin({ instance }) {
    instance.events[opts.name || 'keys'] = KeyEvent;
  }

  plugin.event = KeyEvent;

  return plugin;
}

const tabQuery = 'input:not(:disabled):not([tabIndex="-1"]), select:not(:disabled):not([tabIndex="-1"]), a:not([tabIndex="-1"]), button:not(:disabled):not([tabIndex="-1"]), textarea:no(:disabled):not([tabIndex="-1"])';

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

globalRegister('RMKeyEvent', 'events', keys().event);
