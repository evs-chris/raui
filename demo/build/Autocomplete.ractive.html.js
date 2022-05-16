System.register(['ractive', './chunk10.js', './chunk15.js', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, Popover, autofocus, Window;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      Popover = module.Popover;
    }, function (module) {
      autofocus = module.autofocus;
    }, function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var template = {v:4,t:[{t:7,e:"span",m:[{t:13,n:"class",f:"rautocomplete field-wrapper",g:1},{n:["pop"],t:70,f:{r:["@context","$1"],s:"[(_0).set(\"rac.pop\",_1)]"}}],f:[{t:7,e:"input",m:[{t:8,r:"extra-attributes"},{n:["dblclick"],t:70,f:{r:["rac.pop","@node"],s:"[_0.show(_1)]"}},{n:["focus"],t:70,f:{r:["rac"],s:"[_0.stash()]"}},{n:["blur"],t:70,f:{r:["rac","@node"],s:"[_0.checkBlur(_1)]"}},{n:["input"],t:70,f:{r:["rac","@event"],s:"[_0.input(_1)]"}},{n:["keydown"],t:70,f:{r:["rac","@event"],s:"[_0.key(_1)]"}},{t:73,v:"t",f:"false"},{n:"value",f:[{t:2,r:"rac.display"}],t:13}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rac-drop",g:1},{n:["click"],t:70,f:{r:["rac.pop","@context"],s:"[_0.show((_1).find(\"input\"))]"}}]}," ",{t:7,e:"rac-pop",m:[{t:13,n:"style",f:"padding: 0;",g:1},{t:13,n:"class",f:"rac-pop",g:1},{n:["init"],t:70,f:{r:["@context","$1"],s:"[(_0).raise(\"pop\",{},_1)]"}},{n:"popped",t:13,f:[{t:2,r:"rac.popped"}]},{n:"where",f:"below",t:13,g:1},{n:"align",f:"end",t:13,g:1},{n:"gap",f:[{t:2,x:{r:[],s:"2"},s:1}],t:13},{n:"offsets",t:13,f:[{t:2,r:"rac.offsets"}]},{n:"fit",t:13,f:[{t:2,r:"rac.fit"}]}],f:[{t:4,f:[{t:7,e:"input",m:[{n:"class-rac-modal",t:13},{n:["input"],t:70,f:{r:["rac","@event"],s:"[_0.input(_1)]"}},{n:["keydown"],t:70,f:{r:["rac","@event"],s:"[_0.key(_1)]"}},{t:73,v:"t",f:"false"},{n:"value",f:[{t:2,r:"rac.display"}],t:13},{n:["blur"],t:70,f:{r:["rac"],s:"[_0.checkBlur()]"}},{n:"autocompletefocus",t:71}]}],n:50,r:"inModal"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rac-list",g:1},{n:"tabindex",f:"-1",t:13,g:1}],f:[{t:55,f:[{f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rac-item rac-invalid",g:1}],f:["Loading..."]}],t:4},{t:62,f:[" ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rac-item",g:1},{n:"tabindex",f:"-1",t:13,g:1},{t:4,f:[{n:"class-rac-selected",t:13,f:[{t:2,x:{r:["rac.value","."],s:"_0===_1"}}]}],n:50,r:"rac.valueBound"},{n:"class-rac-hover",t:13,f:[{t:2,x:{r:["rac.selected","@index"],s:"_0===_1"}}]},{t:4,f:[{n:["click"],t:70,f:{r:["@context",".","rac"],s:"[(_0).set(\"rac.value\",_1),_2._drawDisplay()]"}},{n:["mouseover"],t:70,f:{r:["@context","@index"],s:"[(_0).set(\"rac.selected\",_1)]"}}],n:50,r:"rac.popped"}],f:[{t:2,x:{r:["rac","."],s:"_0._display(_1)"}}]}],n:52,r:"items"}," "],n:"items"},{t:63,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rac-item rac-invalid",g:1}],f:["Load failed."]}]}],r:"rac.list"}]}]}]}],e:{"2":function (){return(2);},"[(_0).set(\"rac.pop\",_1)]":function (_0,_1){return([(_0).set("rac.pop",_1)]);},"[_0.show(_1)]":function (_0,_1){return([_0.show(_1)]);},"[_0.stash()]":function (_0){return([_0.stash()]);},"[_0.checkBlur(_1)]":function (_0,_1){return([_0.checkBlur(_1)]);},"[_0.input(_1)]":function (_0,_1){return([_0.input(_1)]);},"[_0.key(_1)]":function (_0,_1){return([_0.key(_1)]);},"[_0.show((_1).find(\"input\"))]":function (_0,_1){return([_0.show((_1).find("input"))]);},"[(_0).raise(\"pop\",{},_1)]":function (_0,_1){return([(_0).raise("pop",{},_1)]);},"[_0.checkBlur()]":function (_0){return([_0.checkBlur()]);},"_0===_1":function (_0,_1){return(_0===_1);},"[(_0).set(\"rac.value\",_1),_2._drawDisplay()]":function (_0,_1,_2){return([(_0).set("rac.value",_1),_2._drawDisplay()]);},"[(_0).set(\"rac.selected\",_1)]":function (_0,_1){return([(_0).set("rac.selected",_1)]);},"_0._display(_1)":function (_0,_1){return(_0._display(_1));}}};

      function safeGet(obj, path) {
        return path.reduce(function (a, c) { return a ? a[c] : a; }, obj)
      }

      var formNodes = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];

      var Autocomplete = Ractive$1.macro(function (h) {
        var tm;
        var root;

        h.aliasLocal('rac');
        h.set('rac.list', []);
        h.set('rac.popped', false);
        h.set('rac.stash', function() {
          h.set('rac.tempDisplay', h.get('rac.display'));
          h.set('rac.tempValue', h.get('rac.value'));
        });

        h.set('rac.key', function(e) {
          var k = e.which;
          if (k === 27) {
            h.set('rac.popped', false);
            h.set('rac.display', h.get('rac.tempDisplay'));
            h.set('rac.value', h.get('rac.tempValue'));
          } else if (k === 38 || k === 40) {
            e.preventDefault();
            h.get('rac.pop').show(h.find('input'));
            var i = h.get('rac.selected');
            var list = h.get('rac.list');
            if (k === 38) {
              if (i <= 0 || i == null) { h.set('rac.selected', Array.isArray(list) ? list.length - 1 : 0); }
              else { h.set('rac.selected', i - 1); }
            } else {
              if (Array.isArray(list)) {
                h.set('rac.selected', i < list.length - 1 ? i + 1 : 0);
              } else { h.set('rac.selected', 0); }
            }
          } else if (k === 10 || k === 13) {
            var list$1 = h.get('rac.list');
            if (Array.isArray(list$1)) {
              h.set('rac.value', list$1[h.get('rac.selected')]);
              display();
            }
          } else if (k === 9) {
            if (h.get('rac.popped')) {
              var list$2 = h.get('rac.list');
              if (Array.isArray(list$2)) {
                var v = list$2[h.get('rac.selected')];
                if (v == null) { v = getval(v, true); }
                h.set('rac.value', v);
              }
              // always update the display if tabbing out with the popup popped
              if (!h.get('rac.limit')) { setTimeout(function () { return display(); }, 140); }
            } else if (h.get('rac.value') == null || !~h.get('rac.selected') || h.get('rac.display') != h.get('rac.tempDisplay')) {
              h.set('rac.value', getval(null, true));
            }
            h.set('rac.popped', false);
            h.get('rac.updateDisplay')();
          }
        });
        h.set('rac.input', function(e) {
          if (tm) { clearTimeout(tm); }
          tm = setTimeout(function() {
            tm = null;
            list(e.target.value);
            var el = h.find('input');
            if (el && document.activeElement === el) { h.get('rac.pop').show(el); }
          }, 500);
          if (!h.attributes.lazy) { h.set('rac.display', e.target.value); }
        });
        h.setTemplate(template);

        function list(filter) {
          if (filter == null) { filter = h.get('rac.value') == null ? '' : h.get('rac.display'); }
          if (filter === h.get('rac.tempDisplay')) { filter = ''; }
          var items = h.get('rac._items');
          if (typeof items === 'function') {
            var res = items(filter);
            if (typeof res === 'object' && typeof res.then === 'function') { res.then(function (v) { return h.set('rac.list', v); }); }
            else { h.set('rac.list', res); }
          } else if (Array.isArray(items)) {
            var member = h.get('rac._display');
            var re;
            try {
              re = new RegExp(filter || '', 'i');
            } catch (e) {
              re = new RegExp((filter || '').replace(/([\{\(\[\]\)\}\?\*\^\$])/g, '\\$1'));
            }
            h.set('rac.list', items.filter(function (i) { return re.test(member(i)); }));
          } else { h.set('rac.list', []); }
        }

        function getval(v, nofetch) {
          var def = h.get('rac.default');
          v = v == null && !nofetch ? h.get('rac.value') : v;
          if (v == null && def) {
            if (typeof def === 'function') { v = def(h.get('rac.display')); }
            else { v = def; }
          }
          return v;
        }

        function refresh(value, old, path) {
          var v = h.get('rac.displayprop');
          if (h.get('rac.__display') !== v || h.get('rac._display') === undefined) {
            var def = function () { return h.attributes['display-value'] ? h.get('rac.display') : '(none)'; };
            if (typeof v === 'string') {
              var path$1 = Ractive$1.splitKeypath(v);
              v = function (v) {
                if (v == null) { v = getval(); }
                return v == null ? def() : safeGet(v, path$1);
              };
            } else if (Array.isArray(v)) {
              var path$2 = v;
              v = function (v) {
                if (v == null) { v = getval(); }
                return v == null ? def() : safeGet(v, path$2);
              };
            } else if (!v) {
              v = function (v) {
                if (v == null) { v = getval(); }
                return v == null ? def() : ("" + v);
              };
            }

            h.set('rac._display', v);
            h.set('rac.__display', h.get('rac.displayprop'));
            h.set('rac.display', v(h.get('rac.value')));
          }

          v = h.get('rac.member');
          if (h.get('rac.__member') !== v || h.get('rac._member') === undefined) {
            if (typeof v === 'string') {
              var path$3 = Ractive$1.splitKeypath(v);
              v = function (v) { return safeGet(getval(v), path$3); };
            } else if (Array.isArray(v)) {
              var path$4 = v;
              v = function (v) { return safeGet(getval(v), path$4); };
            } else if (!v) {
              v = function (v) { return getval(v); };
            }

            h.set('rac._member', v);
            h.set('rac.__member', h.get('rac.member'));
          }

          v = h.get('rac.items');
          if (h.get('rac.__items') !== v || h.get('rac._items') === undefined) {
            if (Array.isArray(v)) { h.set('rac._items', v); }
            else if (typeof v === 'function') { h.set('rac._items', v); }
            else if (typeof v === 'object' && typeof v.then === 'function') { v.then(function (v) {
              h.set('rac._items', v);
              list();
            }); }
            else { h.set('rac._items', []); }
            h.set('rac.__items', h.get('rac.items'));
          }

          if (root && path === 'rac.display' && h.get('rac.limit') && !root.contains(document.activeElement)) { display(); }

          list();
        }

        function display() {
          var member = h.get('rac._display');
          if (typeof member === 'function') {
            var disp = member(h.get('rac.value'));
            h.set('rac.display', disp);
            h.set('rac.tempDisplay', disp);
          }
        }
        h.set('rac._drawDisplay', display);

        function value() {
          if (h.get('rac._value') && !h.get('rac.value')) { return; }
          var member = h.get('rac._member');
          if (typeof member === 'function') {
            var v = member(h.get('rac.value'));
            h.set('rac._value', v);
          }
          (h.ractive.getContext(h.find('input'))).raise('selected', {}, h.get('rac._value'), h.get('rac.display'));
        }

        h.set('rac.updateDisplay', function(ev) {
          setTimeout(function () { if (root && h.get('rac.limit') && !root.contains(document.activeElement)) { display(); } }, 140);
        });

        function update(attrs) {
          if (attrs.items) { h.link(attrs.items, 'rac.items'); }
          if (attrs.value) { h.link(attrs.value, 'rac._value'); }
          h.set('rac.valueBound', !!attrs.value);
          if (attrs.selected) { h.link(attrs.selected, 'rac.selected'); }
          if (attrs['display-value']) { h.link(attrs['display-value'], 'rac.display'); }
          if ('display' in attrs) { h.set('rac.displayprop', attrs.display); }
          if ('member' in attrs) { h.set('rac.member', attrs.member); }
          if ('offsets' in attrs) {
            h.set('rac.offsets', attrs.offsets);
            h.set('rac.fit', 'fit' in attrs ? attrs.fit : true);
          } else {
            h.set('rac.fit', 'fit' in attrs ? attrs.fit : false);
          }
          h.set('rac.limit', attrs['limit-set']);
          h.set('rac.default', attrs.default);
          if (h.get('rac.limit') && h.get('input')) {
            var el = h.get('input');
            if (el !== document.activeElement) { display(); }
          }
          refresh();
        }

        update(h.attributes);

        var tmScroll;
        function scrollView() {
          if (tmScroll) { clearTimeout(tm); }
          tmScroll = setTimeout(function () {
            tmScroll = null;
            var el = h.find('.rac-hover');
            if (el) { el.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'}); }
          }, 14);
        }

        var opts = { init: false, defer: true };
        var watches = [
          h.observe('rac.displayprop', refresh, opts),
          h.observe('rac.memberprop', refresh, opts),
          h.observe('rac.items', refresh, opts),
          h.observe('rac.list', function (v) {
            if (Array.isArray(v)) { h.set('rac.selected', v.indexOf(h.get('rac.value'))); }
            else { h.set('rac.selected', -1); }
          }, opts),
          h.observe('rac.value', function (v) {
            display();
            value();
            h.set('rac.popped', false);
            h.set('rac.tempValue', v);
          }),
          h.observe('rac._value', function (v) {
            var member = h.get('rac._member');
            var which = h.get('rac.list').find(function (i) { return member(i) === v; });
            if (which !== h.get('rac.value')) { h.set('rac.value', which); }
            if (!which && v && h.get('rac.valueBound')) {
              h.set('rac.display', v);
              refresh();
            }
          }),
          h.observe('rac.selected', scrollView) ];

        h.set('rac.checkBlur', function checkBlur(node) {
          var active = document.activeElement;
          if (!~formNodes.indexOf(active.nodeName) && !active.getAttribute('tabindex')) { return; }
          var inputs = h.findAll('input');
          if (document.activeElement && !~inputs.indexOf(document.activeElement)) { h.get('rac.key')({ which: 9 }); }
        });

        function teardown() {
          h.unlink('rac.items');
          h.unlink('rac._value');
          h.unlink('rac.selected');
          h.unlink('rac.display');

          watches.forEach(function (w) { return w.cancel(); });
        }

        return { teardown: teardown, update: update, render: function render() { root = h.find('span'); } };
      }, {
        attributes: ['items', 'selected', 'display', 'value', 'member', 'limit-set', 'fit', 'offsets', 'display-value', 'default'],
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data("raui.primary"), data("raui.autocomplete"), data("raui.autocomplete.primary"));
         var drop = Object.assign({}, data('raui.autocomplete.drop'), data('raui.autocomplete.primary.drop'));
         return (".rautocomplete {\n     position: relative;\n     display: inline-block;\n   }\n   \n   .rac-drop {\n     width: 2em;\n     height: 100%;\n     position: absolute;\n     top: 0;\n     right: 2px;\n     cursor: pointer;\n   }\n   .rac-drop:after {\n     font-family: " + (drop.font || 'sans-serif') + ";\n     content: " + (drop.string || '\'\u25be\'') + ";\n     position: absolute;\n     top: calc(50% - 0.5em);\n     height: 1em;\n     line-height: 1em;\n     width: 100%;\n     text-align: center;\n     font-weight: " + (drop.weight || 'normal') + ";\n     color: " + (drop.color || primary.bc || '#ccc') + ";\n   }\n   \n   .rac-pop {\n     min-width: 100%;\n   }\n \n   .rac-pop > .rpop {\n     padding: 0;\n   }\n \n   .rac-list {\n     display: flex;\n     flex-direction: column;\n     max-height: 50vh;\n     min-height: 2.125em;\n     max-width: 100%;\n     overflow: auto;\n   }\n   \n   .rac-item {\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n     padding: 0.25em;\n     cursor: pointer;\n   }\n   \n   .rac-selected {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }\n \n   .rac-hover {\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bc || '#ccc') + ";\n   }\n \n   .rac-selected.rac-hover {\n     background-color: " + (primary.bc || '#ccc') + ";\n     color: " + (primary.fga || '#07e') + ";\n   }\n   \n   .rac-invalid {\n     cursor: not-allowed;\n   }\n   \n   input.rac-modal {\n     width: 100%;\n     box-sizing: border-box;\n   }");
      }).call(this, data)].join(' '); },
        cssId: 'rautocomplete',
        noCssTransform: true
      });

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.partials[opts.name || 'autocomplete'] = Autocomplete;
          instance.components['rac-pop'] = Popover;
          instance.decorators['autocompletefocus'] = autofocus;
        }
      }

      var Autocomplete_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    An `Autocomplete` is an input that has an associated completion list. There is built-in keyboard navigation for those with arrow keys available, and the list is automatically filtered as you type. There is a flag to only allow completion or allow anything to be typed with completion optional.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'autocomplete'` - the name to use when registering the component as a plugin\n\n    ### Attributes\n\n    * `items: array` - the list of items for completion\n    * `selected: keypath` - the value to be bound to the selected/hovered index\n    * `display: keypath|array` - the property of the selected item to display\n    * `value: keypath` - the value to be bound to the autocomplete\n    * `display-value: keypath` - the string to be bound to the input text of the autocomplete\n    * `member: keypath|array` - the value to be selected from within the selected item\n    * `offsets: number[]` - offsets to be passed to the Popover\n    * `fit: boolean` - to be passed to the Popover - defaults to true if offsets are provided\n\n    ### Theming\n\n    #### Namespace\n\n    `autocomplete`\n\n    #### Variables\n\n    * `fg` - list foreground\n    * `bg` - list background, selected item foreground\n    * `fga` - selected item background\n    * `bc` - default border color\n    * `drop.string` - dropdown indicator, defaults to \"'\\u25be'\";\n    * `drop.font` - dropdown indicator font\n    * `drop.color` - dropdown indicator color, defaults to bc\n    * `drop.weight` - dropdown indicator font weight, defaults to normal\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      There are two arrays in the data: `names` and `objects`. `names` is an array if strings, and `objects` is an array of objects with name properties that are strings.\n      ### Template:\n      ```hbs\n      <autocomplete items=\"names\" value=\"strname\" />\n      <br />\n      {{strname}}\n      ```\n\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"center",g:1}],f:[{t:7,e:"autocomplete",m:[{n:"items",f:"names",t:13,g:1},{n:"value",f:"strname",t:13},{n:"fit",f:"true",t:13,g:1}]}," ",{t:7,e:"br"}," ",{t:2,r:"strname"}]}," ",{t:7,e:"marked",f:["      ***\n\n      ### Template:\n      ```hbs\n      <autocomplete items=\"objects\" display=\"name\" value=\"objnames\" display-value=\"objdisplay\" />\n      <br />\n      Value: {{JSON.stringify(objnames)}}\n      <br />\n      Display: {{objdisplay}}\n      ```\n\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"center",g:1}],f:[{t:7,e:"autocomplete",m:[{n:"items",f:"objects",t:13,g:1},{n:"display",f:"name",t:13,g:1},{n:"value",f:"objnames",t:13},{n:"display-value",f:"objdisplay",t:13,g:1},{n:"fit",f:"true",t:13,g:1}]}," ",{t:7,e:"br"}," Value: ",{t:2,x:{r:["objnames"],s:"JSON.stringify(_0)"}}," ",{t:7,e:"br"}," Display: ",{t:2,r:"objdisplay"}]}," ",{t:7,e:"marked",f:["      ***\n\n      ### Template:\n      ```hbs\n      <autocomplete items=\"objects\" display=\"name\" display-value=\"strdisplay\" />\n      <br />\n      {{strdisplay}}\n      ```\n\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"center",g:1}],f:[{t:7,e:"autocomplete",m:[{n:"items",f:"objects",t:13,g:1},{n:"display",f:"name",t:13,g:1},{n:"display-value",f:"strdisplay",t:13,g:1}]}," ",{t:7,e:"br"}," ",{t:2,r:"strdisplay"}]}]}]}],e:{"JSON.stringify(_0)":function (_0){return(JSON.stringify(_0));}}},
        css: " input { position: relative; } .center { margin: 1em auto; }",
        use: [plugin()],
        options: {
          title: 'Component :: Autocomplete',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            title: 'Something is happening...',
            names: ['George', 'Paul', 'John', 'Ringo', 'Simon', 'Lars', 'James', 'Kirk', 'Robert', 'Cliff', 'Jason', 'Dave', 'Bob', 'Ron', 'Elton', 'Freddie', 'Brian', 'Roger', 'Mike', 'Doug', 'Barry'],
            objects: [{ name: 'George' }, { name: 'Paul' }, { name: 'John' }, { name: 'Ringo' }]
          }
        }
      }));

    }
  };
});
