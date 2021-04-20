function teardown() {}

export default function plugin(options = {}) {
  return function({ instance }) {
    instance.decorators[options.name || 'autofocus'] = function(node, opts) {
      const o = Object.assign({}, options, opts);
      if (o.immediate) node.focus();
      else setTimeout(() => node.focus(), o.timeout || 250);
      return { teardown };
    };
  };
}
