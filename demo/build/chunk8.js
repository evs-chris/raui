System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('default', plugin);
      function plugin(options) {
        if ( options === void 0 ) options = {};

        var lib = options.marked || window.marked;
        if (!lib) { throw new Error("Marked must be either passed in or provided globally as 'marked'.") }

        function marked(node, opts) {
          var div = document.createElement('div');
          div.setAttribute('class', 'marked-container');
          var display = node.style.display;
          node.style.display = 'none';

          var content = document.createElement('div');
          content.setAttribute('class', 'marked-content');
          div.appendChild(content);

          var html = node.innerText;
          var lines = html.split(/\r?\n/);
          var indent = lines.find(function (l) { return /[^\s]/.test(l); });
          if (indent) { html = html.replace(new RegExp(("^" + (indent.replace(/(\s*).*/, '$1'))), 'gm'), ''); }

          lib(html, function (err, res) {
            content.innerHTML = res;
            node.parentNode.insertBefore(div, node.nextSibling);
          });

          return { teardown: function teardown() {
            node.parentNode.removeChild(div);
            node.style.display = display;
          } };
        }

        return function plugin(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          instance.decorators[options.name || 'marked'] = marked;
          instance.partials[options.name || 'marked'] = Ractive.macro(function (handle) {
            var content = handle.partials.content || [];
            if (content.length === 1 && typeof content[0] === 'string') {
              handle.aliasLocal('_marked');
              handle.setTemplate(['Marking down...']);
              var tpl = content[0];
              var indent = tpl.split(/\r?\n/).find(function (l) { return /[^\s]/.test(l); });
              if (indent) { tpl = tpl.replace(new RegExp(("^" + (indent.replace(/(\s*).*/, '$1'))), 'gm'), ''); }
              lib(tpl, function (err, res) {
                if (!err) { handle.set('@local.content', res); }
              });
              handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 13, n: 'class-marked-container' }], f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-marked-content' }], f: [{ t: 3, r: '_marked.content' }] }] }]);
            } else {
              handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 71, n: 'marked' }], f: handle.template.f }]);
            }
          }, {
            css: function css(data) { return (".marked-container { display: flex; justify-content: space-around; } .marked-content { max-width: " + (data('marked.max') || '70em') + "; width: 100%; box-sizing: border-box; }") },
            noCssTransform: true
          });
        }
      }

    }
  };
});
