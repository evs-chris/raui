System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('scrolled', scrolled);
      function scrolled(node, opts) {
        if ( opts === void 0 ) opts = {};

        var bind = typeof opts === 'string' ? opts : opts.bind;
        if (typeof bind !== 'string') { return { teardown: function teardown() {} }; }

        var allow = opts.allow || 2;

        var ctx = this.getContext(node);
        var pending = false;
        var tm;

        function watch() {
          pending = false;
          var str = '';
          if (node.scrollHeight > node.clientHeight) { str += 'vscroll'; }
          if (node.scrollWidth > node.clientWidth) { str += (str ? ' ' : '') + 'hscroll'; }

          if (node.scrollTop <= allow) { str += ' top'; }
          if (node.scrollTop >= node.scrollHeight - node.clientHeight - allow) { str += ' bottom'; }
          if (!~str.indexOf('top') && !~str.indexOf('bottom')) { str += ' vmiddle'; }

          if (node.scrollLeft <= allow) { str += ' left'; }
          if (node.scrollLeft >= node.scrollWidth - node.clientWidth - allow) { str += ' right'; }
          else if (!~str.indexOf('left') && !~str.indexOf('right')) { str += ' hmiddle'; }

          ctx.set(bind, str);
          if (ctx.hasListener('scrolled')) { ctx.raise('scrolled', {}); }
        }

        node.addEventListener('scroll', watch, { passive: true });

        requestAnimationFrame(watch);

        return {
          refresh: function refresh() {
            if (pending) { return; }
            if (tm) { clearTimeout(tm); }
            tm = setTimeout(function() {
              tm = null;
              pending = true;
              requestAnimationFrame(watch);
            }, 250);
          },
          teardown: function teardown() {
            node.removeEventListener('scroll', watch);
            ctx.set(bind, '');
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
