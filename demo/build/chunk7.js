System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('sized', sized);
      /** @param { HTMLElement } node  */
      function sized(node, attrs) {
        var ctx = attrs.context || this.getContext(node);
        var start = {
          position: node.style.position,
          overflowY: node.style.overflowY
        };

        if (node.style.position === '' || node.style.position === 'static') { node.style.position = 'relative'; }

        var obj = document.createElement('object');
        obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
        obj.setAttribute('tabindex', '-1');
        obj.type = 'text/html';

        var refresh = function () {
          if (attrs.offsetWidth) { ctx.set(attrs.offsetWidth, node.offsetWidth); }
          if (attrs.offsetHeight) { ctx.set(attrs.offsetHeight, node.offsetHeight); }
          if (attrs.clientWidth) { ctx.set(attrs.clientWidth, node.clientWidth); }
          if (attrs.clientHeight) { ctx.set(attrs.clientHeight, node.clientHeight); }
          if (attrs.diffWidth) { ctx.set(attrs.diffWidth, node.offsetWidth - node.clientWidth); }
          if (attrs.diffHeight) { ctx.set(attrs.diffHeight, node.offsetHeight - node.clientHeight); }
        };

        obj.onload = function () {
          obj.contentDocument.defaultView.addEventListener('resize', refresh);
          refresh();
        };
        
        if (/Trident/.test(navigator.userAgent)) {
          node.appendChild(obj);
          obj.data = 'about:blank';
        } else {
          obj.data = 'about:blank';
          node.appendChild(obj);
        }

        return {
          refresh: refresh,
          teardown: function teardown() {
            node.removeChild(obj);
            node.style.position = start.position;
            node.style.overflowY = start.overflowY;
          }
        }
      }

    }
  };
});
