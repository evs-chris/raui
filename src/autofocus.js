function teardown() {}

export default function plugin(options = {}) {
  return function({ instance }) {
    instance.decorators[options.name || 'autofocus'] = function(node, opts = {}) {
      node.focus();
      return { teardown };
    };
  };
}