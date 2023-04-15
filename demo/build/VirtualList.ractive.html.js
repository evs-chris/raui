System.register(['ractive', './chunk12.js', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, scrolled, sized, globalRegister, Window;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      scrolled = module.default;
    }, function (module) {
      sized = module.sized;
      globalRegister = module.default;
      Window = module.Window;
    }],
    execute: function () {

      var VirtualList = /*@__PURE__*/(function (Ractive) {
        function VirtualList(opts) { Ractive.call(this, opts); }

        if ( Ractive ) VirtualList.__proto__ = Ractive;
        VirtualList.prototype = Object.create( Ractive && Ractive.prototype );
        VirtualList.prototype.constructor = VirtualList;
        VirtualList.prototype.adjust = function adjust () {
          if (!this.rendered) { return; }
          var items = this.get('items') || [];
          var size = this.get('size');
          var top = this.get('virtual.top') || 0;
          var vheight = this.get('virtual.height') || 100;

          if (!items.length) {
            this.set({
              'virtual.padTop': 0,
              'virtual.padBottom': 0,
              'virtual.adjust': 0,
              'virtual.items': [],
              'virtual.length': 0,
            });
            return;
          }

          if (!size) {
            this.set({
              'virtual.items': items.slice(0, 10),
              'virtual.offsetIndex': 0,
            });
            var els = this.findAll('.rvlitem'); 
            size = Math.max(Math.floor(els.reduce(function (a, c) { return a + c.offsetHeight; }, 0) / els.length), 16);
            this.set('size', size);
          }

          var targetEl = this.findAll('.rvlitem').find(function (e) { return top <= e.offsetTop + e.offsetHeight && top >= e.offsetTop; });

          var idx, targetTop = -1;
          if (targetEl) {
            idx = +targetEl.getAttribute('data-index');
            targetTop = targetEl.offsetTop;
          } else {
            idx = idx = Math.min(Math.max(Math.floor(top / size), 0), items.length - 1);
          }
          if (!~idx) { idx = Math.min(Math.max(Math.floor(top / size), 0), items.length - 1); }

          var count = Math.ceil(vheight / size);

          if (idx === this.get('virtual.target') && count === this.get('virtual.count') && items.length === this.get('virtual.length')) { return; }

          var lidx = idx - count;
          var uidx = idx + 2 * count;

          // make sure there are three pages available
          if (lidx < 0) {
            uidx += Math.abs(lidx);
            lidx = 0;
          }
          if (uidx > items.length) {
            lidx -= uidx - (items.length - 1);
            uidx = items.length - 1;
          }
          if (uidx > items.length - 5) {
            uidx = items.length;
            lidx = uidx - 3 * count;
          }
          if (lidx < 0) { lidx = 0; }
          if (lidx > idx) { lidx = idx; }

          var next = items.slice(lidx, uidx);

          this.set({
            'virtual.count': count,
            'virtual.size': size,
            'virtual.items': next,
            'virtual.offsetIndex': lidx,
            'virtual.adjust': 0,
            'virtual.target': idx,
            'virtual.length': items.length,
          });

          var above = lidx * size;
          var below = uidx === items.length ? 0 : (items.length - uidx - 1) * size;

          var refEl = this.find((".rvlitem-" + idx));

          this.set({
            'virtual.padTop': above,
            'virtual.padBottom': below,
          });
          var adjust = ~targetTop ? targetTop - refEl.offsetTop : size * idx - refEl.offsetTop;
          this.set('virtual.adjust', adjust);

          if (Math.abs(adjust) > 2 * count * size || above + adjust < 0 || above === 0 && adjust < 0 || below === 0 && adjust > 0) {
            this.set('virtual.adjust', 0);
            this.scroller.scrollTop -= adjust;
          }
        };

        VirtualList.prototype.estimateSize = function estimateSize () {
          var this$1 = this;

          this.set('size', undefined);
          requestAnimationFrame(function () { return this$1.adjust(); });
        };

        return VirtualList;
      }(Ractive$1));
      Ractive$1.extendWith(VirtualList, {
        template: {v:4,t:[{t:4,f:[{t:16,x:{r:[],s:"\"header\""},c:{rx:{r:"~/items",m:[{t:30,n:"~/virtual.target"}]}},z:[{n:"index",x:{r:"~/virtual.target"}}]}],n:50,r:"header"},{t:7,e:"div",m:[{t:13,n:"class",f:"rvlist",g:1},{t:16,r:"extra-attributes"},{n:"scrolled",t:71},{n:"sized",t:71,f:{r:[],s:"[{offsetHeight:\"virtual.height\",offsetWidth:\"virtual.width\"}]"}},{n:"scroller",t:71}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rvlwindow",g:1},{n:"style",f:["padding-top: ",{t:2,x:{r:["~/virtual.padTop","~/virtual.adjust"],s:"_0+_1"}},"px; padding-bottom: ",{t:2,r:"~/virtual.padBottom"},"px;"],t:13}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rvlblock",g:1}],f:[{t:4,f:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class",f:["rvlitem rvlitem-",{t:2,x:{r:["~/virtual.offsetIndex","@index"],s:"_0+_1"}}],t:13},{n:"data-index",f:[{t:2,x:{r:["~/virtual.offsetIndex","@index"],s:"_0+_1"}}],t:13},{t:16,x:{r:[],s:"\"item-attrs\""},c:{r:"."},z:[{n:"index",x:{x:{r:["~/virtual.offsetIndex","@index"],s:"_0+_1"}}}]}],f:[{t:16,x:{r:[],s:"\"item\""},c:{r:"."},z:[{n:"index",x:{x:{r:["~/virtual.offsetIndex","@index"],s:"_0+_1"}}}]}]}],n:54,rx:{r:"~/items",m:[{r:["~/virtual.offsetIndex","@index"],s:"_0+_1"}]}}],n:52,r:"~/virtual.items"}],n:50,r:"~/virtual.items.length"},{t:4,f:[{t:16,x:{r:[],s:"\"else\""}}],n:51,l:1}]}]}]}],e:{"\"header\"":function (){return("header");},"[{offsetHeight:\"virtual.height\",offsetWidth:\"virtual.width\"}]":function (){return([{offsetHeight:"virtual.height",offsetWidth:"virtual.width"}]);},"_0+_1":function (_0,_1){return(_0+_1);},"\"item-attrs\"":function (){return("item-attrs");},"\"item\"":function (){return("item");},"\"else\"":function (){return("else");}}},
        css: " .rvlist { display: block; min-height: 16px; overflow: auto; } .rvlitem { display: block; }",
        cssId: 'rvlist',
        noCssTransform: true,
        attributes: ['items', 'size'],
        data: function data() {
          return {
            virtual: {
              offsetIndex: 0,
              items: [],
              top: 0,
              adjust: 0,
              count: 0,
              padTop: 0,
              padBottom: 0,
            },
          };
        },
        decorators: {
          sized: sized,
          scroller: function scroller(node) {
            var ctx = Ractive$1.getContext(node);
            var handler = function (ev) {
              if (ev.target !== node) { return; }
              ctx.set({
                '~/virtual.top': node.scrollTop,
                '~/virtual.bottom': node.scrollBottom,
              });
            };
            node.addEventListener('scroll', handler, { passive: true });
            return {
              teardown: function teardown() {
                node.removeEventListener('scroll', handler, { passive: true });
              }
            }
          },
        },
        use: [scrolled()],
        observe: {
          'items.length virtual.height virtual.top': function items_lengthvirtual_heightvirtual_top() {
            var this$1 = this;

            if (this._throttle) { return; }
            this._throttle = setTimeout(function () {
              requestAnimationFrame(function () {
                this$1.adjust();
                this$1._throttle = 0;
              });
            }, 60);
          },
        },
        on: {
          construct: function construct() {
            var cmp = this.component;
            if (!cmp) { return; }

            var tpl = cmp.template.f || [];
            var t = cmp.template;
            cmp.template = { e: t.e, f: t.f, t: t.t, m: t.m, p: t.p || {} };
            var init = {};

            var alt = tpl.find(function (t) { return typeof t === 'object' && 'e' in t && t.e === 'else'; });
            if (alt) { init.else = alt.f; }

            var header = init.header = tpl.find(function (t) { return typeof t === 'object' && 'e' in t && t.e === 'header'; });
            if (header) { init.header = header.f; }

            var item = init.item = tpl.find(function (t) { return typeof t === 'object' && 'e' in t && t.e === 'item'; });
            cmp.template.f = tpl.filter(function (t) { return t !== alt && t !== item && t !== header; });

            if (!item) {
              init.item = cmp.template.f;
              init['item-attrs'] = [];
            } else {
              init['item-attrs'] = init.item.m || [];
              init.item = init.item.f;
            }

            this._init = init;
          },
          config: function config() {
            if (this._init) { Object.assign(this.partials, this._init); }
            if (this.partials.header) { this.set('header', true); }
          },
          render: function render() {
            this.scroller = this.find('.rvlist');
            this.window = this.find('.rvlwindow');
          },
        },
      });

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'virtual-list'] = VirtualList;
        };
      }

      globalRegister('RauiVirtualList', 'components', VirtualList);

      var VirtualList_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is a virtual scroll list that can scroll through thousands of items by only rendering a few viewports worth of elements at a time and adjusting the estimated space above and below the viewport to keep the scrollbar relatively stable. Items should be full width, but height can be variable.\n\n    The area outside the viewport is assumed to have items of a uniform height, so the closer to average size the size is, the more accurate the scrollbar. The list will adjust to keep items from jumping around as they enter and leave the viewport, but once an adjustment threshhold is reached, the adjustment will be zeroed out and the scrollTop will be adjusted to match. This will result in the scroll handle jumping a bit occasionally in highly varied content.\n\n    ### Children\n\n    The content of a virtual list will be used as the partial for each rendered item.\n\n    * `header` - a template to render above the list that is rendered with the context of the current top element. When combined with some extra templating in the item, this can be used to simulate sticky headers within the list.\n    * `item` - the item template, which if supplied, will be used rather than the content of the component template. Attributes from the item element are rendered in the individual list item wrapper elements in the context of their item.\n    * `else` - a template to render if there are no items to render in the list.\n    * `index` is provided as an alias to the content partial, and is set to the current index of the virtual item in the base list.\n\n    ### Attributes\n\n    * `items` - the list of items to render\n    * `size` - the minimum height in px of items that will be rendered. This is used to determine how many items need to be rendered to keep the viewport full. If size is not provided it will be calcuated and cached.\n\n    ### API\n\n    * `estimateSize()` - renders a few items and uses the average of their size to provide the minimum target size for unrendered items.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Count",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{t:73,v:"l"},{n:"value",f:[{t:2,r:".count"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Random Height Min",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{t:73,v:"l"},{n:"value",f:[{t:2,r:".minHeight"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Random Height Max",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{t:73,v:"l"},{n:"value",f:[{t:2,r:".maxHeight"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Size",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"disabled",f:0,t:13},{n:"value",f:[{t:2,r:".size"}],t:13}]}]}]}," ",{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n      <virtual-list items=\"{{list}}\">\n        <div class-odd=\"index % 2 == 0\" style-height=\"{{.height}}px\">{{name}} - {{index}}</div>\n        <else>Nothing to see here.</else>\n      </virtual-list>\n      ```\n      ### Result:  \n    "]}," ",{t:7,e:"virtual-list",m:[{n:"items",f:[{t:2,r:"list"}],t:13},{n:"size",t:13,f:[{t:2,r:"size"}]}],f:[{t:7,e:"div",m:[{n:"class-odd",t:13,f:[{t:2,x:{r:["index"],s:"_0%2==0"}}]},{n:"style-height",f:[{t:2,r:".height"},"px"],t:13}],f:[{t:2,r:"name"}," - ",{t:2,r:"index"}]}," ",{t:7,e:"else",f:["Nothing to see here."]}]}]}]}],e:{"_0%2==0":function (_0){return(_0%2==0);}}}, css: " .odd { background-color: #eee; }",
        cssId: 'demo-virtual-list',
        use: [plugin()],
        data: function data() {
          return { count: 1000, minHeight: 16, maxHeight: 48, minHeight: 16 };
        },
        options: {
          title: 'Component :: Virtual List',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        observe: {
          'count minHeight maxHeight': function countminHeightmaxHeight() {
            var this$1 = this;

            var count = Math.max(this.get('count'), 0);
            var min = Math.max(Math.min(this.get('minHeight'), 200), 16);
            var max = Math.min(Math.max(this.get('maxHeight'), min), 200);
            if (count !== this.get('count') || min !== this.get('minHeight') || max !== this.get('maxHeight')) {
              setTimeout(function () {
                this$1.set({
                  count: count, minHeight: min, maxHeight: max,
                });
              });
              return;
            }
            var list = [];
            for (var i = 0; i < count; i++) { list.push({ name: ("Item " + i), height: Math.floor(Math.random() * (max - min)) + min }); }
            this.set('list', list);
            var cmp = this.findComponent('virtual-list');
            if (cmp) { cmp.estimateSize(); }
          }
        }
      }));

    }
  };
});
