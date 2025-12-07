System.register(['./chunk2.js', 'ractive'], function (exports, module) {
  'use strict';
  var globalRegister, Window, Ractive$1;
  return {
    setters: [function (module) {
      globalRegister = module.default;
      Window = module.Window;
    }, function (module) {
      Ractive$1 = module.default;
    }],
    execute: function () {

      function findParent(el, fn) {
        if (fn(el)) { return el; }
        while (el = (el && el.parentElement)) {
          if (fn(el)) { return el; }
        }
      }

      var noop = { teardown: function teardown() {} };

      function move(opts) {
        if ( opts === void 0 ) opts = {};
        var suffix = opts.suffix || '';
        var prefix = "move" + suffix;
        var moving;
        var from;
        var sidx;
        var didx;

        function src(el, o) {
          if ( o === void 0 ) o = {};

          var path;
          if (typeof o === 'string') {
            path = o;
            o = Object.assign({}, opts);
          } else if (typeof o === 'object') {
            path = o.path;
          }
          o = Object.assign({}, opts, o);

          if (!path) {
            console.error("Move decorator requires either a path string or an object with a path property");
            return noop;
          }
          var pos = el.style.position;
          if (pos === '' || pos === 'static') { el.style.position = 'relative'; }
          var indicator;
          var vh;

          function checkVH() {
            if (el.children.length > 1) {
              var els = el.children;
              var x1 = els[0].offsetLeft;
              var y1 = els[0].offsetTop;
              var x2 = els[1].offsetLeft;
              var y2 = els[1].offsetTop;
              if (x1 < x2 && y1 === y2) { vh = 'h'; }
              else if (y1 < y2 && x1 === x2) { vh = 'v'; }
              else if (y2 > y1) { vh = 'v'; }
              else if (x2 > x1) { vh = 'h'; }
              else { vh = 'v'; }
            } else {
              vh = 'v';
            }
          }
          checkVH();

          var dragenter = function (ev) {
            if (el === from && o.sort === false) { return; }
            if (el.contains(ev.target) && !el.classList.contains((prefix + "ing"))) { el.classList.add((prefix + "ing")); }
            if (!indicator) {
              checkVH();
              indicator = document.createElement('div');
              indicator.style.border = '1px solid';
              indicator.style.margin = '0';
              indicator.style.padding = '0';
              indicator.style.position = 'absolute';
              var e = el.children[0] || moving;
              if (vh === 'v') {
                indicator.style.width = (e.offsetWidth) + "px";
                indicator.style.height = '0';
              } else {
                indicator.style.height = (e.offsetHeight) + "px";
                indicator.style.width = '0';
              }
              el.appendChild(indicator);
            }
          };
          var dragleave = function (ev) {
            if (el.contains(ev.relatedTarget)) { return; }
            el.classList.remove((prefix + "ing"));
            if (indicator) {
              indicator.remove();
              indicator = undefined;
            }
          };
          var dragover = function (ev) {
            ev.preventDefault();
            if (indicator && ev.target !== el && ev.target !== indicator && !o.appendOnly) {
              var t = findParent(ev.target, function (e) { return e.parentElement === el; });
              if (!t) { return; }
              if (vh === 'v') {
                var top;
                if (ev.offsetY > t.clientHeight / 2) {
                  var n = t.nextElementSibling;
                  didx = Ractive$1.getContext(t).get('@index') + 1;
                  if (n && n !== indicator && n.offsetLeft === t.offsetLeft) {
                    var p = t.offsetTop + t.offsetHeight;
                    top = p + ((n.offsetTop - p) / 2);
                  } else {
                    var p$1 = t.offsetTop + t.offsetHeight;
                    top = p$1 + ((el.offsetHeight - p$1) /2);
                  }
                } else {
                  var n$1 = t.previousElementSibling;
                  didx = Ractive$1.getContext(t).get('@index');
                  if (n$1 && n$1 !== indicator && n$1.offsetLeft === t.offsetLeft) {
                    var p$2 = n$1.offsetTop + n$1.offsetHeight;
                    top = p$2 + ((t.offsetTop - p$2) / 2);
                  } else {
                    var p$3 = t.offsetTop;
                    top = p$3 - (p$3 / 2);
                  }
                }
                indicator.style.top = (Math.floor(top - 1)) + "px";
                indicator.style.left = (t.offsetLeft) + "px";
              } else {
                var left;
                if (ev.offsetX > t.clientWidth / 2) {
                  var n$2 = t.nextElementSibling;
                  didx = Ractive$1.getContext(t).get('@index') + 1;
                  if (n$2 && n$2 !== indicator && n$2.offsetTop === t.offsetTop) {
                    var p$4 = t.offsetLeft + t.offsetWidth;
                    left = p$4 + ((n$2.offsetLeft - p$4) / 2);
                  } else {
                    var p$5 = t.offsetLeft + t.offsetWidth;
                    left = p$5 + ((el.offsetWidth - p$5) /2);
                  }
                } else {
                  var n$3 = t.previousElementSibling;
                  didx = Ractive$1.getContext(t).get('@index');
                  if (n$3 && n$3 !== indicator && n$3.offsetTop === t.offsetTop) {
                    var p$6 = n$3.offsetLeft + n$3.offsetWidth;
                    left = p$6 + ((t.offsetLeft - p$6) / 2);
                  } else {
                    var p$7 = t.offsetLeft;
                    left = p$7 - (p$7 / 2);
                  }
                }
                indicator.style.left = (Math.floor(left - 1)) + "px";
                indicator.style.top = (t.offsetTop) + "px";
              }
            }
          };
          var drop = function (ev) {
            ev.preventDefault();
            var m = moving, f = from;
            moving = undefined;
            from = undefined;
            if (indicator) {
              indicator.remove();
              indicator = undefined;
            }
            el.classList.remove((prefix + "ing"));
            if (m.classList.contains((prefix + "ing"))) { m.classList.remove((prefix + "ing")); }
            if (el === f && o.sort === false) { return; }
            var sctx = Ractive$1.getContext(f);
            var dctx = Ractive$1.getContext(el);
            var ictx = Ractive$1.getContext(m);
            if (!sctx || !dctx || !ictx) { return; }
            var spath = sctx.decorators[prefix].path;
            var slist = sctx.get(spath);
            if (!Array.isArray(slist) && !o.eventsOnly) { return; }
            var dpath = dctx.decorators[prefix].path;
            var dlist = dctx.get(dpath);
            if (!Array.isArray(dlist) && dlist !== undefined && !o.eventsOnly) { return; }
            var i = ictx.get();
            if (f === el && sidx < didx && typeof didx === 'number') { didx--; }
            if (f == el && didx === sidx) { return; }
            ictx.raise(prefix, {}, { src: sctx, srcPath: spath, srcIndex: sidx, dest: dctx, destPath: dpath, destIndex: didx, item: i, context: ictx });
            sctx.raise((prefix + "out"), {}, { src: sctx, srcPath: spath, srcIndex: sidx, dest: dctx, destPath: dpath, destIndex: didx, item: i, context: ictx });
            dctx.raise((prefix + "in"), {}, { src: sctx, srcPath: spath, srcIndex: sidx, dest: dctx, destPath: dpath, destIndex: didx, item: i, context: ictx });
            if (!o.eventsOnly) {
              sctx.splice(spath, sidx, 1);
              if (o.appendOnly) { dctx.push(dpath, i); }
              else { dctx.splice(dpath, didx, 0, i); }
            }
            checkVH();
          };
          el.addEventListener('dragenter', dragenter);
          el.addEventListener('dragleave', dragleave);
          el.addEventListener('dragover', dragover);
          el.addEventListener('drop', drop);
          return {
            path: path,
            teardown: function teardown() {
              el.removeEventListener('dragenter', dragover);
              el.removeEventListener('dragleave', dragleave);
              el.removeEventListener('dragover', dragover);
              el.removeEventListener('drop', drop);
              el.style.position = pos;
            }
          };
        }

        function item(el, o) {
          var dragstart = function (ev) {
            moving = el;
            from = findParent(el, function (el) { return Ractive$1.getContext(el).decorators[prefix]; });
            sidx = Ractive$1.getContext(el).get('@index');
            if (!el.classList.contains((prefix + "ing"))) { el.classList.add((prefix + "ing")); }
          };
          var dragend = function (ev) {
            if (moving && moving.classList.contains((prefix + "ing"))) { moving.classList.remove((prefix + "ing")); }
            moving = undefined;
            from = undefined;
          };
          var dragAttr = el.getAttribute('draggable');
          el.setAttribute('draggable', 'true');
          el.classList.add((prefix + "Item"));
          el.addEventListener('dragstart', dragstart);
          el.addEventListener('dragend', dragend);
          return {
            teardown: function teardown() {
              if (dragAttr === null) { el.removeAttribute('draggable'); }
              else { el.setAttribute('draggable', dragAttr); }
              el.classList.remove((prefix + "Item"));
              el.removeEventListener('dragstart', dragstart);
              el.removeEventListener('dragend', dragend);
            }
          };
        }

        return {
          move: src,
          moveItem: item,
          plugin: function plugin(ref) {
            var instance = ref.instance;

            instance.decorators[prefix] = src;
            instance.decorators[(prefix + "Item")] = item;
          },
        };
      }

      var alpha = 'abcdefghijklmnopqrstuvwxyz';
      function rand(max) {
        return Math.round(Math.random() * max);
      }
      function name() {
        var len = rand(12) + 1;
        var n = alpha[rand(25)].toUpperCase();
        for (var i = 1; i <= len; i++) { n += alpha[rand(25)]; }
        return n;
      }

      var drag_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    <h2>Move</h2>\n    <p>A draggable list decorator set that allows moving items among arrays, and optionally within arrays. All elements with the same decoration will allow moving elements among them. Multiple namespaces can be set up by supplying a prefix to the plugin.</p>\n    <p>The move plugin can be configured as <code>eventsOnly</code>, which will defer the actual handling of drop actions to events raised on the moved item, source list, and/or destination list.</p>\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    * `suffix: string` - an optional suffix to add to the the default `move` name of the decorators\n    * `sort: boolean` - default true - allow sorting within lists\n    * `appendOnly: boolean` - default false - if true, only allow appending items to lists and not dropping at a specific index\n    * `eventsOnly: boolean` - default false - if true, items will not be moved from one list to another. This also allows the path to be any arbitrary string.\n\n    ### Decorator Options\n\n    There are two decorators available in the set: `move` and `moveItem`. If the suffix were set to `Things`, the decorators would be `moveThings` and `moveThingsItem`, respectively. Similarly, any events with a suffixed set of decorators will also have suffixed names e.g. `moveThings`, `moveThingsin`, and `moveThingsout`.\n\n    The raised events have an object argument with the source context (src), the source path (srcPath), the source index (srcIndex), the destination context (dest), the destination path (destPath), the destination index (destIndex), the item (item), and the item context (context). The source and destination contexts are the contexts that exist on the elements that have the move decorators applied to them, so the array will be available as a child e.g. `src.get(srcPath)`.\n\n    #### `move`\n\n    * `path: string` - what array in the element context is going to be managed - this may also be supplied as the only string argument to the decorator\n\n    ##### Events\n\n    * `movein` - fired when an item is dropped on this list\n    * `moveout` - fired when an item is dropped on this list\n\n    #### `moveItem`\n\n    ##### Events\n\n    * `move` - fired when an item is dropped\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["List 1 Style",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"list1style"}],t:13}],f:[" ",{t:7,e:"option",f:["vertical"]}," ",{t:7,e:"option",f:["vertical-overflow"]}," ",{t:7,e:"option",f:["horizontal"]}," ",{t:7,e:"option",f:["horizontal-overflow"]}," ",{t:7,e:"option",f:["vertical-grid"]}," ",{t:7,e:"option",f:["horizontal-grid"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["List 2 Style",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"list2style"}],t:13}],f:[" ",{t:7,e:"option",f:["vertical"]}," ",{t:7,e:"option",f:["vertical-overflow"]}," ",{t:7,e:"option",f:["horizontal"]}," ",{t:7,e:"option",f:["horizontal-overflow"]}," ",{t:7,e:"option",f:["vertical-grid"]}," ",{t:7,e:"option",f:["horizontal-grid"]}]}]}]}," ",{t:7,e:"marked",f:["      ### Template:\n      ```hbs\n      <div style=\"display: flex;\">\n        <div as-move=`list1` class=\"move-list {{list2style}}\">\n          {{#each list1}}\n            <div as-moveItem><span>{{.name}}</span><span>{{.age}}</span></div>\n          {{/each}}\n        </div>\n        <div as-move=`list2` class=\"move-list {{list2style}}\">\n          {{#each list2}}\n            <div as-moveItem><span>{{.name}}</span><span>{{.age}}</span></div>\n          {{/each}}\n        </div>\n      </div>\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"display: flex;",g:1}],f:[{t:7,e:"div",m:[{n:"move",t:71,f:{r:[],s:"[\"list1\"]"}},{n:"class",f:["move-list ",{t:2,r:"list1style"}],t:13}],f:[{t:4,f:[{t:7,e:"div",m:[{n:"moveItem",t:71}],f:[{t:7,e:"span",f:[{t:2,r:".name"}]},{t:7,e:"span",f:[{t:2,r:".age"}]}]}],n:52,r:"list1"}]}," ",{t:7,e:"div",m:[{n:"move",t:71,f:{r:[],s:"[\"list2\"]"}},{n:"class",f:["move-list ",{t:2,r:"list2style"}],t:13}],f:[{t:4,f:[{t:7,e:"div",m:[{n:"moveItem",t:71}],f:[{t:7,e:"span",f:[{t:2,r:".name"}]},{t:7,e:"span",f:[{t:2,r:".age"}]}]}],n:52,r:"list2"}]}]}]}]}],e:{"[\"list1\"]":function (){return(["list1"]);},"[\"list2\"]":function (){return(["list2"]);}}},
        options: {
          title: 'Decorator :: Drag',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        css: "\n    .move-list { background-color: rgba(128, 128, 128, 0.1); padding: 1em; margin: 1em; }\n    .move-list.moveing { background-color: rgba(128, 128, 128, 0.25); }\n    .move-list .moveItem { padding: 0.25em; border: 1px solid; margin: 0.25em; border-radius: 0.5em; width: 16em; display: flex; justify-content: space-between; }\n    .move-list .moveing { opacity: 0.5; }\n    .move-list.vertical {}\n    .move-list.horizontal { display: flex; }\n    .move-list.vertical-overflow { overflow: auto; height: 90vh; }\n    .move-list.horizontal-overflow { display: flex; overflow: auto; width: 80vw; }\n    .move-list.vertical-grid { display: flex; flex-direction: column; flex-wrap: wrap; width: 40vw; height: 45vh; overflow: auto; }\n    .move-list.horizontal-grid { display: flex; flex-wrap: wrap; width: 40vw; height: 45vh; overflow: auto; }\n  ",
        data: function data() {
          var list1 = [], list2 = [];
          for (var i = 0; i < 100; i++) { list1.push({ name: name(), age: rand(100) }); }
          for (var i$1 = 0; i$1 < 10; i$1++) { list2.push({ name: name(), age: rand(100) }); }
          return {
            list1: list1,
            list2: list2
          };
        },
        use: [move().plugin],
      }));

    }
  };
});
