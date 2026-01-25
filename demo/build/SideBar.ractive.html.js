System.register(['ractive', './chunk2.js', './chunk18.js'], function (exports, module) {
  'use strict';
  var Ractive$1, sized, sizeInEm, globalRegister, Window, split;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      sized = module.sized;
      sizeInEm = module.sizeInEm;
      globalRegister = module.default;
      Window = module.Window;
    }, function (module) {
      split = module.default;
    }],
    execute: function () {

      var SideBar = /*@__PURE__*/(function (Ractive) {
        function SideBar(opts) {
          Ractive.call(this, opts);
        }

        if ( Ractive ) SideBar.__proto__ = Ractive;
        SideBar.prototype = Object.create( Ractive && Ractive.prototype );
        SideBar.prototype.constructor = SideBar;

        SideBar.prototype.select = function select (idx, open) {
          if (idx < 0 || idx > (this.get('tabs.length') || 0) - 1) { return; }
          if (open !== false) { this.open(); }
          return this.set('selected', idx);
        };

        SideBar.prototype.blur = function blur () {
          if (this.get('size') !== 'wide' && this.get('open')) { return this.close().then(function () { return true; }); }
          else { return Promise.resolve(false); }
        };

        SideBar.prototype.open = function open () { return this.set('open', true); };
        SideBar.prototype.close = function close () { return this.set('open', false); };
        SideBar.prototype.toggle = function toggle (key) {
          var this$1 = this;

          if (key === undefined) {
            return Ractive.prototype.toggle.call(this, 'open').then(function () { return this$1.get('open'); });
          } else {
            return Ractive.prototype.toggle.call(this, key);
          }
        };

        return SideBar;
      }(Ractive$1));

      Ractive$1.extendWith(SideBar, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:16,r:"extra-attributes",z:[{n:"sidebar",x:{r:"@this"}}]},{n:"class",f:["rsidebar rsb-",{t:2,r:"~/size"}],t:13},{n:"class-rsb-open",t:13,f:[{t:2,r:"~/open"}]},{n:"class-rsb-closed",t:13,f:[{t:2,x:{r:["~/open"],s:"!_0"}}]},{n:"class-rsb-right",t:13,f:[{t:2,r:"~/right"}]},{n:"class-rsb-left",t:13,f:[{t:2,x:{r:["~/right"],s:"!_0"}}]},{n:"class-rsb-has-tabs",t:13,f:[{t:2,r:"~/tabs.length"}]},{n:"class-rsb-no-tabs",t:13,f:[{t:2,x:{r:["~/tabs.length"],s:"!_0"}}]},{n:"sized",t:71,f:{r:[],s:"[{clientWidth:\"~/clientWidth\"}]"}}],f:[{t:4,f:[{t:4,f:[{t:16,r:"~/tabs.mobile",z:[{n:"sidebar",x:{r:"@this"}}]}],n:50,r:"~/tabs.mobile"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-mobile",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"open\")]"}}],f:[{t:7,e:"svg",m:[{n:"viewBox",f:"4 7 16 10",t:13,g:1}],f:[{t:7,e:"path",m:[{n:"d",f:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",t:13,g:1}]}]}]}],n:51,l:1}],n:50,x:{r:["~/size","~/open","~/"],s:"_0===\"narrow\"&&!_1&&!_2[\"no-mobile\"]"}}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-bar",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-tabs",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-tab rsb-indicator",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"open\")]"}}],f:[{t:7,e:"svg",m:[{n:"viewBox",f:"4 7 16 10",t:13,g:1}],f:[{t:7,e:"path",m:[{n:"d",f:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",t:13,g:1}]}]}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-tab",g:1},{n:"class-rsb-selected",t:13,f:[{t:2,x:{r:["@index","~/selected"],s:"_0===_1"}}]},{t:4,f:[{n:"label",f:[{t:16,r:".label"}],t:13}],n:50,r:".label"},{t:4,f:[{t:16,r:".tabattrs"}],n:50,r:".tabattrs"},{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0.set({selected:_1,open:true})]"}}],f:[{t:16,r:".tab",z:[{n:"sidebar",x:{r:"@this"}}]}]}],n:52,r:"~/tabs"}]}],n:50,r:"~/tabs.length"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-tab-contents",g:1},{t:4,f:[{n:"style-min-width",f:[{t:2,r:"~/width"},"em"],t:13}],n:50,r:"~/width"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-tab-content",g:1},{n:"class-rsb-selected",t:13,f:[{t:2,x:{r:["@index","~/selected"],s:"_0===_1"}}]},{t:16,r:".attrs"}],f:[{t:16,r:".content",z:[{n:"sidebar",x:{r:"@this"}}]}]}],n:52,r:"~/tabs"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-contents",g:1},{t:16,r:"~/tabs.sideattrs"}],f:[{t:16,r:"~/tabs.side",z:[{n:"sidebar",x:{r:"@this"}}]}]}],n:50,r:"~/tabs.side"}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rsb-main",g:1}],f:[{t:16,r:"~/tabs.main",z:[{n:"sidebar",x:{r:"@this"}}]}]}]}],e:{"!_0":function (_0){return(!_0);},"[{clientWidth:\"~/clientWidth\"}]":function (){return([{clientWidth:"~/clientWidth"}]);},"[_0.toggle(\"open\")]":function (_0){return([_0.toggle("open")]);},"_0===\"narrow\"&&!_1&&!_2[\"no-mobile\"]":function (_0,_1,_2){return(_0==="narrow"&&!_1&&!_2["no-mobile"]);},"_0===_1":function (_0,_1){return(_0===_1);},"[_0.set({selected:_1,open:true})]":function (_0,_1){return([_0.set({selected:_1,open:true})]);}}},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.sidebar.primary'));
         var themes = (data('raui.themes') || []).slice();
         (data('raui.sidebar.themes') || []).forEach(function (t) {
           if (!~themes.indexOf(t)) { themes.push(t); }
         });
       
         return ("\n     .rsidebar {\n       display: flex;\n       flex-grow: 1;\n       overflow: hidden;\n     }\n \n     .rsidebar.rsb-right {\n       flex-direction: row-reverse;\n     }\n \n     .rsb-left.rsb-narrow.rsb-closed .rsb-bar,\n     .rsb-left.rsb-medium.rsb-closed.rsb-no-tabs .rsb-bar,\n     .rsb-left.rsb-wide.rsb-closed.rsb-no-tabs .rsb-bar {\n       transform: translateX(-100%);\n     }\n     .rsb-right.rsb-narrow.rsb-closed .rsb-bar,\n     .rsb-right.rsb-medium.rsb-closed.rsb-no-tabs .rsb-bar,\n     .rsb-right.rsb-wide.rsb-closed.rsb-no-tabs .rsb-bar {\n       transform: translateX(100%);\n     }\n     .rsb-left.rsb-wide.rsb-closed .rsb-bar,\n     .rsb-left.rsb-medium.rsb-closed .rsb-bar {\n       transform: translateX(calc(-100% + " + (primary.tabsize || '3em') + " + " + (primary.border || 1) + "px));\n     }\n     .rsb-right.rsb-wide.rsb-closed .rsb-bar,\n     .rsb-right.rsb-medium.rsb-closed .rsb-bar {\n       transform: translateX(calc(100% - " + (primary.tabsize || '3em') + " - " + (primary.border || 1) + "px));\n     }\n     .rsb-narrow.rsb-open .rsb-bar,\n     .rsb-narrow.rsb-open .rsb-bar {\n       transform: translateX(0);\n     }\n \n     .rsb-bar {\n       flex-shrink: 0;\n       display: flex;\n       border-color: " + (primary.bc || '#ccc') + ";\n       border-style: solid;\n       border-width: 0;\n       transition: transform 0.2s ease-in-out;\n       transform: translateX(0);\n       z-index: 2;\n       background-color: " + (primary.bg || '#fff') + ";\n     }\n     .rsb-narrow .rsb-bar,\n     .rsb-medium .rsb-bar {\n       position: absolute;\n       height: 100%;\n     }\n     .rsb-narrow.rsb-open .rsb-bar,\n     .rsb-medium.rsb-open .rsb-bar {\n       box-shadow: 0em 0em 0.5em 0.25em rgba(0, 0, 0, 0.25);\n     }\n     .rsb-right .rsb-bar {\n       border-left-width: 1px;\n     }\n     .rsb-left .rsb-bar {\n       flex-direction: row-reverse;\n       border-right-width: 1px;\n     }\n \n     .rsb-indicator svg, .rsb-mobile svg {\n       transition: transform 0.2s ease-in-out;\n       width: 1.2em;\n       height: 1.2em;\n     }\n     .rsb-open.rsb-left .rsb-indicator svg,\n     .rsb-closed.rsb-right .rsb-indicator svg,\n     .rsb-closed.rsb-right .rsb-mobile svg,\n     .rsb-closed.rsb-right .rsb-moble svg {\n       transform: rotate(90deg);\n     }\n     .rsb-closed.rsb-left .rsb-indicator svg,\n     .rsb-open.rsb-right .rsb-indicator svg,\n     .rsb-closed.rsb-left .rsb-mobile svg,\n     .rsb-open.rsb-right .rsb-mobile svg {\n       transform: rotate(-90deg);\n     }\n \n     .rsb-tabs {\n       display: flex;\n       flex-direction: column;\n       border-color: " + (primary.bc || '#ccc') + ";\n       border-style: solid;\n       border-width: 0;\n     }\n     .rsb-right .rsb-tabs {\n       border-right-width: 1px;\n     }\n     .rsb-left .rsb-tabs {\n       border-left-width: 1px;\n     }\n \n     .rsb-tab {\n       display: flex;\n       position: relative;\n       align-items: center;\n       justify-content: center;\n       width: " + (primary.tabsize || '3em') + ";\n       height: " + (primary.tabsize || '3em') + ";\n       border-style: solid;\n       border-color: transparent;\n       border-width: " + (primary.border || 1) + "px 0 " + (primary.border || 1) + "px 0;\n       background-color: " + (primary.bg || '#fff') + ";\n       color: " + (primary.fg || '#222') + ";\n       cursor: pointer;\n     }\n     .rsb-tab.rsb-selected {\n       border-color: " + (primary.bc || '#ccc') + ";\n       background-color: " + (primary.bg || '#fff') + ";\n       color: " + (primary.fga || '#07e') + ";\n       width: calc(" + (primary.tabsize || '3em') + " + " + (primary.border || 1) + "px);\n     }\n     .rsb-right .rsb-tab.rsb-selected {\n       margin-right: -" + (primary.border || 1) + "px;\n     }\n     .rsb-left .rsb-tab.rsb-selected {\n       margin-left: -" + (primary.border || 1) + "px;\n     }\n     .rsb-tab[label]:hover:after {\n       position: absolute;\n       content: attr(label);\n       top: 50%;\n       display: block;\n       padding: 0.4em;\n       background: #333;\n       color: #fff;\n       font-family: Arial, Helvetica, sans-serif;\n       font-size: 1em;\n       font-weight: 400;\n       border-radius: 0.4em;\n       pointer-events: none;\n       white-space: nowrap;\n       transform: translateY(-50%);\n     }\n     .rsb-left .rsb-tab[label]:after {\n       left: 110%;\n     }\n     .rsb-right .rsb-tab[label]:after {\n       right: 110%;\n     }\n \n     .rsb-tab-contents {\n       position: relative;\n       flex-grow: 1;\n       overflow: hidden;\n       box-sizing: border-box;\n       transition: transform 0.2s ease-in-out;\n       background-color: " + (primary.bg || '#fff') + ";\n       min-width: 16em;\n     }\n \n     .rsb-open .rsb-content {\n       padding: " + (primary.padding || '0.5em') + ";\n     }\n \n     .rsb-contents, .rsb-tab-content {\n       position: absolute;\n       padding: " + (primary.padding || '0.5em') + ";\n       top: 0;\n       left: 0;\n       box-sizing: border-box;\n       width: 100%;\n       height: 100%;\n       overflow: auto;\n       opacity: 0;\n       z-index: 0;\n       transition: opacity 0.2s ease-in-out;\n     }\n     .rsb-tab-content.rsb-selected {\n       z-index: 1;\n       opacity: 1;\n     }\n \n     .rsb-contents {\n       z-index: 1;\n       opacity: 1;\n     }\n \n     .rsb-main {\n       flex-grow: 1;\n       background-color: " + (primary.bg || '#fff') + ";\n       padding: " + (primary.padding || '0.5em') + ";\n       overflow: auto;\n       box-sizing: border-box;\n       z-index: 1;\n     }\n \n     .rsb-closed.rsb-wide .rsb-main,\n     .rsb-medium .rsb-main {\n       position: absolute;\n       top: 0;\n       left: 0;\n       width: 100%;\n       height: 100%;\n     }\n     .rsb-closed.rsb-wide.rsb-has-tabs .rsb-main,\n     .rsb-medium.rsb-has-tabs .rsb-main {\n       width: calc(100% - " + (primary.tabsize || '3em') + " - 1px);\n     }\n     .rsb-left.rsb-closed.rsb-wide.rsb-has-tabs .rsb-main,\n     .rsb-left.rsb-medium.rsb-has-tabs .rsb-main {\n       left: calc(" + (primary.tabsize || '3em') + " + 1px);\n     }\n     .rsb-right.rsb-closed.rsb-wide.rsb-has-tabs .rsb-main,\n     .rsb-right.rsb-medium.rsb-has-tabs .rsb-main {\n       right: calc(" + (primary.tabsize || '3em') + " + 1px);\n     }\n \n     .rsb-mobile {\n       position: absolute;\n       top: 1em;\n       width: 3em;\n       height: 3em;\n       border-style: solid;\n       border-color: " + (primary.bc || '#ccc') + ";\n       background-color: " + (primary.bg || '#fff') + ";\n       box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);\n       display: flex;\n       align-items: center;\n       justify-content: center;\n       z-index: 2;\n     }\n     .rsb-left .rsb-mobile {\n       border-width: 1px 1px 1px 0;\n       border-radius: 0 0.5em 0.5em 0;\n     }\n     .rsb-right .rsb-mobile {\n       border-width: 1px 0 1px 1px;\n       border-radius: 0.5em 0 0 0.5em;\n     }\n   ");
      }).call(this, data)].join(' '); }, cssId: 'rsidebar',
        attributes: ['right', 'open', 'no-mobile', 'width'],
        decorators: { sized: sized },
        data: function data() {
          return {
            selected: 0,
            open: true,
          };
        },
        computed: {
          size: function size() {
            var size = sizeInEm(this.get('~/clientWidth') || 1280);
            if (size > (this.get('@style.raui.sidebar.wide.break') || 76)) { return 'wide'; }
            else if (size > (this.get('@style.raui.sidebar.medium.break') || 40)) { return 'medium'; }
            else { return 'narrow'; }
          }
        },
        on: {
          construct: initTemplate,
          config: function config() {
            if (this._tabs) {
              var data = this.get('tabs');
              if (Array.isArray(data)) { this._tabs.unshit.apply(this._tabs, data); }
              this.set('tabs', this._tabs, { shuffle: true });
            }
            this._tabs = 0;
          },
        },
        observe: {
          size: function size(n) {
            this.set('open', n === 'wide');
          }
        }
      });

      function initTemplate() {
        var cmp = this.component;
        if (!cmp) { return; }

        var tpl = cmp.template.f || [];
        var attrs = cmp.template.m ? cmp.template.m.slice() : [];
        var orig = cmp.template;
        var main = tpl.filter(function (e) { return e.e !== 'tab' && e.e !== 'side'; });
        cmp.template = { e: orig.e, f: main, t: orig.t, m: attrs, p: Object.assign({}, orig.p, { main: main }) };

        var tabs = tpl.filter(function (e) { return e.e === 'tab'; }).map(function (t) {
          var res = { content: (t.f || []).filter(function (e) { return e.e !== 'tab'; }), attrs: (t.m || []).filter(function (a) { return a.n !== 'label' && a.n !== 'tab'; }) };
          res.label = ((t.m && t.m.find(function (a) { return a.n === 'label'; })) || {}).f;
          if (typeof res.label === 'string') { res.label = [res.label]; }
          res.tab = (t.f || []).find(function (e) { return e.e === 'tab'; });
          if (res.tab) { res.tabattrs = res.tab.m || []; }
          if (!res.tab) { res.tab = t.m.find(function (a) { return a.n === 'tab'; }); }
          if (res.tab) { res.tab = typeof res.tab.f === 'string' ? [res.tab.f] : res.tab.f; }
          return res;
        });

        tabs.side = tpl.find(function (e) { return e.e === 'side'; });
        if (tabs.side) {
          tabs.sideattrs = tabs.side.m || [];
          tabs.side = tabs.side.f;
        }

        tabs.main = main;

        if (tabs.side && tabs.length) { console.warn("Raui SideBar should not have both side and tabs elements"); }

        this._tabs = tabs;
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'sidebar'] = SideBar;
        };
      }

      globalRegister('RauiSideBar', 'components', SideBar);

      var SideBar_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is a bit like a shell, but intended to be wrapped in some other container.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Attributes\n\n    * `right: boolean = false` - when true, the bar will appear on the right side\n    * `no-mobile: boolean = false` - when true, will not show a toggle for the bar at the mobile stop\n    * `open: boolean` - the binding that controls whether the bar is open\n    * `width: number` - the minimum width of bar content in `em`\n\n    ### Children\n\n    The non-content parts of the SideBar are specified as special child elements. Anything that is not a `tab` or `side` element will be displayed as the main content within the SideBar component. You can specify any number of `tab`s or a single `side`, but they should not be mixed.\n\n    * `tab` - a tab on the bar\n      * `tab` - element or attribute that specifies the content of the tab button\n        * any attributes on an inner tab element are carried to the corresponding component element\n      * `label` - attribute that specifies an option hover tooltip\n      * any additional attributes are carried through to the corresponding component element\n      * any other child content becomes the content of the tab on the bar\n    * `side` - element whose content is shown as the bar with no tabs\n      * any additional attributes are carrried through to the corresponding component element\n\n    ### API\n\n    * `close()` - close the side bar\n    * `open()` - open the side bar\n    * `select(idx: number)` - select the bar tab by number\n    * `toggle()` - toggle the side bar\n\n    ### Styles\n\n    * `raui.sidebar.tabsize` - Specifies the size of the tab squares - `'3em'`\n    * `raui.sidebar.border` - Specifies the size of the borders in px - `1`\n    * the usual `bg`, `bc`, `fg`, and `fga` are also used\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"~/right"}],t:13}]}," Right?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,rx:{r:"~/",m:[{r:[],s:"\"no-mobile\""}]}}],t:13}]}," No mobile?"]}]}," ",{t:7,e:"marked",f:["    ***\n    ### Template:\n    ```handlebars\n    <div class=\"container\">\n      <sidebar bind-right bind-no-mobile>\n        <tab tab=\"JJ\">Some stuff</tab>\n        <tab tab=\"YY\">Other Stuff</tab>\n        Content!\n      </sidebar>\n    </div>\n    ```\n    ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"container",g:1}],f:[{t:7,e:"split",m:[{n:"vertical",f:0,t:13},{n:"flex",f:0,t:13}],f:[{t:7,e:"sidebar",m:[{n:"right",t:13,f:[{t:2,r:"right"}]},{n:"no-mobile",t:13,f:[{t:2,r:"no-mobile"}]}],f:[{t:7,e:"tab",m:[{n:"tab",f:"JJ",t:13,g:1},{n:"label",f:"Look, some stuff",t:13,g:1}],f:["Some stuff"]}," ",{t:7,e:"tab",m:[{n:"tab",f:"YY",t:13,g:1}],f:["Other Stuff"]}," Content!"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"space",g:1}]}]}]}," ",{t:7,e:"marked",f:["    ***\n    ### Template:\n    ```handlebars\n    <div class=\"container\">\n      <sidebar bind-right bind-no-mobile>\n        <side class=\"blueish\">Bar content! {{#if sidebar.data.size !== 'wide'}}<button on-click=\"sidebar.close()\">Close</button>{{/if}}</side>\n        Content!<br/><button on-click=\"sidebar.toggle()\">Toggle SideBar</button>\n      </sidebar>\n    </div>\n    ```\n    ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"container",g:1}],f:[{t:7,e:"split",m:[{n:"vertical",f:0,t:13},{n:"flex",f:0,t:13}],f:[{t:7,e:"sidebar",m:[{n:"right",t:13,f:[{t:2,r:"right"}]},{n:"no-mobile",t:13,f:[{t:2,r:"no-mobile"}]}],f:[{t:7,e:"side",m:[{t:13,n:"class",f:"blueish",g:1}],f:["Bar content! ",{t:4,f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["sidebar"],s:"[_0.close()]"}}],f:["Close"]}],n:50,x:{r:["sidebar.data.size"],s:"_0!==\"wide\""}}]}," Content!",{t:7,e:"br"},{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["sidebar"],s:"[_0.toggle()]"}}],f:["Toggle SideBar"]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"space",g:1}]}]}]}]}]}],e:{"\"no-mobile\"":function (){return("no-mobile");},"[_0.close()]":function (_0){return([_0.close()]);},"_0!==\"wide\"":function (_0){return(_0!=="wide");},"[_0.toggle()]":function (_0){return([_0.toggle()]);}}}, css: " .container { display: flex; width: 80vw; max-width: 100%; height: 30em; margin: 0 auto; box-shadow: 1px 1px 0.5em rgba(0, 0, 0, 0.25); position: relative; } .space { flex-grow: 1; background-color: #656565; opacity: 1; background-image: repeating-linear-gradient(45deg, #5c5c5c 25%, transparent 25%, transparent 75%, #5c5c5c 75%, #5c5c5c), repeating-linear-gradient(45deg, #5c5c5c 25%, #656565 25%, #656565 75%, #5c5c5c 75%, #5c5c5c); background-position: 0 0, 7px 7px; background-size: 14px 14px; } .blueish { background-color: lightblue; }",
        options: {
          title: 'Components :: Side Bar',
          width: '40em', height: '30em',
          flex: true, resizable: true,
        },
        use: [plugin(), split()],
      }));

    }
  };
});
