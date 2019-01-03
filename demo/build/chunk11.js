System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('scrolled', scrolled);
      function scrolled(node, opts) {
        if ( opts === void 0 ) opts = {};

        var bind = typeof opts === 'string' ? opts : opts.bind;
        if (typeof bind !== 'string') { return { teardown: function teardown() {} }; }

        var ctx = this.getContext(node);

        function watch() {
          var str = '';
          if (node.scrollHeight > node.clientHeight) { str += 'vscroll'; }
          if (node.scrollWidth > node.clientWidth) { str += (str ? ' ' : '') + 'hscroll'; }

          if (node.scrollTop === 0) { str += ' top'; }
          else if (node.scrollTop === node.scrollHeight - node.clientHeight) { str += ' bottom'; }
          else { str += ' vmiddle'; }

          if (node.scrollLeft === 0) { str += ' left'; }
          else if (node.scrollLeft === node.scrollWidth - node.clientWidth) { str += ' right'; }
          else { str += ' hmiddle'; }

          ctx.set(bind, str);
        }

        node.addEventListener('scroll', watch, { passive: true });

        requestAnimationFrame(watch);

        return {
          refresh: watch,
          teardown: function teardown() {
            node.removeEventListener('scroll', watch);
          }
        }
      }

      function plugin(options) {
        if ( options === void 0 ) options = {};

        return function(ref) {
          var instance = ref.instance;

          instance.decorators[options.name || 'scrolled'] = scrolled;
        }
      }
      exports('default', plugin);

    }
  };
});
