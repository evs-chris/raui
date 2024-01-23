function teardown() {}

export default function plugin(options = {}) {
  return function({ instance }) {
    instance.decorators[options.name || 'autofocus'] = function(node, opts) {
      if (typeof node.focus === 'function') {
        const o = Object.assign({}, options, opts);
        if (o.immediate && !node.disabeld) node.focus();
        else setTimeout(() => !node.disabled && node.focus(), o.timeout || 250);
      }
      return { teardown };
    };
  };
}
