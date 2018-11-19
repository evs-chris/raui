export function autoResize(node) {
  const init = node.style.height;

  const listener = function() {
    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight}px`;
  }

  node.addEventListener('input', listener);

  listener();

  return {
    teardown() {
      node.removeEventListener('input', listener);
      node.style.height = init;
    }
  }
}

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.decorators[opts.name || 'auto-resize'] = autoResize;
  }
}

export default plugin;