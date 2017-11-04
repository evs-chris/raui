import Ractive$1 from 'ractive';

var win = typeof window !== 'undefined' ? window : null;

function globalRegister(name, registry, constructor) {
  if (win && win.Ractive && typeof win.Ractive[registry] === 'object') {
    var script = document.currentScript;
    if (!script) {
      script = document.querySelectorAll('script');
      script = script[script.length - 1];
    }

    if (script) {
      var aliases = script.getAttribute('data-alias');
      if (aliases) {
        aliases = aliases.split('&');
        aliases = aliases.reduce(function (a, c) {
          var ref = c.split('=');
          var k = ref[0];
          var v = ref[1];
          a[k] = v;
          return a;
        }, {});
      }

      Ractive[registry][(aliases && aliases[name]) || name] = constructor;
    }
  }
}

var resizer;
var instances = [];

var Tabs = (function (Ractive) {
  function Tabs(opts) {
    Ractive.call(this, opts);
  }

  if ( Ractive ) Tabs.__proto__ = Ractive;
  Tabs.prototype = Object.create( Ractive && Ractive.prototype );
  Tabs.prototype.constructor = Tabs;

  Tabs.prototype.updateIndicator = function updateIndicator () {
    var node = this._tabs[this.get('selected')];

    if (node) {
      var start = this.get('selectedLeft');
      if (start === undefined) {
        this.set({
          selectedLeft: node.offsetLeft,
          selectedRight: node.offsetParent.clientWidth - (node.offsetLeft + node.offsetWidth)
        });
      } else {
        var max = node.offsetParent.clientWidth;
        var left = node.offsetLeft, width = node.clientWidth, right = max - left - width;

        this.set({
          direction: left < start ? 'left' : 'right',
          selectedLeft: left,
          selectedRight: right
        });
      }
    } else {
      this.set({
        selectedLeft: 0,
        selectedRight: this.find('.tabs').offsetWidth
      });
    }
  };

  return Tabs;
}(Ractive$1));

var tabAttrs = ['closable', 'disabled', 'title', 'right', 'button', 'no-pad'];

// TODO: api handles
Ractive$1.extendWith(Tabs, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rtabs",t:13},{t:16,r:"extra-attributes"},{n:"class-rtabs-flat",t:13,f:[{t:2,r:"~/flat"}]},{n:"class-rtabs-margin",t:13,f:[{t:2,r:"~/margin"}]},{n:"class-rtabs-fill",t:13,f:[{t:2,r:"~/fill"}]}],f:[{t:7,e:"div",m:[{n:"class-rtabs-tab-window",t:13},{t:4,f:[{n:"class-rtabs-going-left",t:13}],n:50,x:{r:[".direction"],s:"_0===\"left\""}},{t:4,n:51,f:[{n:"class-rtabs-going-right",t:13}],l:1}],f:[{t:7,e:"div",m:[{n:"class-rtabs-tabs",t:13}],f:[{t:7,e:"div",m:[{n:"class-rtabs-left",t:13},{n:"class-rtabs-center",t:13,f:[{t:2,r:"~/center"}]}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:51,r:".right"}],n:52,r:".tabs"}]}," ",{t:7,e:"div",m:[{n:"class-rtabs-right",t:13}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,r:".right"}],n:52,r:".tabs"}]}," ",{t:7,e:"div",m:[{n:"class-rtabs-indicator",t:13},{n:"style-left",f:[{t:2,r:".selectedLeft"},"px"],t:13},{t:4,f:[{n:"style-right",f:[{t:2,r:".selectedRight"},"px"],t:13}],n:50,x:{r:[".selectedRight"],s:"_0!==undefined"}}]}]}]}," ",{t:7,e:"div",m:[{n:"class-rtabs-content-wrapper",t:13}],f:[{t:7,e:"div",m:[{n:"class-rtabs-content-window",t:13},{t:4,f:[{n:"class-rtabs-trans-fade",t:13}],n:50,x:{r:[".transition"],s:"_0===\"fade\""}},{t:4,n:50,f:[{n:"class-rtabs-trans-slide",t:13}],x:{r:[".transition"],s:"_0===\"slide\""},l:1}],f:[{t:7,e:"div",m:[{n:"class-rtabs-contents",t:13},{n:"style-opacity",f:[{t:2,r:"~/opacity"}],t:13},{n:"style-left",f:[{t:2,x:{r:[".selectedContent"],s:"_0*-100"}},"%"],t:13},{n:"class-rtabs-pad",t:13,f:[{t:2,r:"~/pad"}]}],f:[{t:4,f:[{t:8,r:"tab-content"}],n:52,r:".tabs"}]}]}]}]}],e:{"_0===\"left\"":function (_0){return(_0==="left");},"_0!==undefined":function (_0){return(_0!==undefined);},"_0===\"fade\"":function (_0){return(_0==="fade");},"_0===\"slide\"":function (_0){return(_0==="slide");},"_0*-100":function (_0){return(_0*-100);},"_0===_1":function (_0,_1){return(_0===_1);},"_0===\"dynamic\"":function (_0){return(_0==="dynamic");},"_0!==_1":function (_0,_1){return(_0!==_1);},"_0===false":function (_0){return(_0===false);},"!_0":function (_0){return(!_0);},"_0===_1&&!_2":function (_0,_1,_2){return(_0===_1&&!_2);},"typeof _1===\"string\"?_0[_1]:_1":function (_0,_1){return(typeof _1==="string"?_0[_1]:_1);},"[[\"select\",_0]]":function (_0){return([["select",_0]]);},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"[[\"close\",_0]]":function (_0){return([["close",_0]]);},"_0&&!_1":function (_0,_1){return(_0&&!_1);}},p:{"tab-content":[{t:4,f:[{t:7,e:"div",m:[{n:"class-rtabs-tab-content",t:13},{n:"class-rtabs-selected-content",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0===_1"}}]},{n:"class-rtabs-dyna",t:13,f:[{t:2,x:{r:["~/height"],s:"_0===\"dynamic\""}}]},{n:"class-rtabs-not-selected",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0!==_1"}}]},{t:4,f:[{t:16,r:".extra"}],n:50,r:".extra"},{t:4,f:[{n:"class-rtabs-no-pad",t:13}],n:50,x:{r:[".pad"],s:"_0===false"}},{t:4,n:50,f:[{n:"class-rtabs-no-pad",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".padRef"}]}}]}],r:".padRef",l:1}],f:[{t:16,r:".template"}]}],n:50,x:{r:[".button"],s:"!_0"}},{t:4,n:51,f:[{t:7,e:"div",m:[{n:"class-rtabs-placeholder",t:13}]}],l:1}],tab:[{t:7,e:"div",m:[{n:"class-rtabs-tab",t:13},{n:"class-rtabs-selected",t:13,f:[{t:2,x:{r:["~/selected","@index",".button"],s:"_0===_1&&!_2"}}]},{t:4,f:[{n:"class-rtabs-disabled",t:13}],n:50,x:{r:["~/",".disabled"],s:"typeof _1===\"string\"?_0[_1]:_1"}},{t:4,n:50,f:[{n:["click"],t:70,f:{r:["@index"],s:"[[\"select\",_0]]"}}],x:{r:[".button"],s:"!_0"},l:1},{n:"registered",t:71,f:{r:["@index"],s:"[_0]"}},{t:4,f:[{t:16,r:".extraTab"}],n:50,r:".extraTab"}],f:[{t:4,f:[{t:2,r:"title"}],n:50,x:{r:[".title"],s:"typeof _0===\"string\""}},{t:4,n:50,f:[{t:16,r:".title"}],r:".title",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rtabs-close",t:13},{n:["click"],t:70,f:{r:["@index"],s:"[[\"close\",_0]]"}}],f:["×"]}],n:50,x:{r:[".closable",".button"],s:"_0&&!_1"}}]}]}},
  cssId: 'rtab',
  noCssTransform: true,
  css: function(data) { return [(function(data) {
   return ("\n   .rtabs {\n     position: relative;\n     display: flex;\n     flex-direction: column;\n     width: 100%;\n   }\n \n   .rtabs-tab-window {\n     overflow-y: hidden;\n     overflow-x: auto;\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     color: " + (data('tabs.tab.fg') || data('fg1') || '#222') + ";\n     background-color: " + (data('tabs.tab.bg') || data('bg1') || '#fff') + ";\n     position: relative;\n     flex-shrink: 0;\n   }\n   .secondary > .rtabs-tab-window {\n     color: " + (data('fg2') || '#fff') + ";\n     background-color: " + (data('bg2') || '#07e') + ";\n   }\n   .alt1 > .rtabs-tab-window {\n     color: " + (data('alt1.fg1') || '#222') + ";\n     background-color: " + (data('alt1.bg1') || '#fff') + ";\n   }\n   .alt1.secondary > .rtabs-tab-window {\n     color: " + (data('alt1.fg2') || '#222') + ";\n     background-color: " + (data('alt1.bg2') || '#fff') + ";\n   }\n   .alt2 > .rtabs-tab-window {\n     color: " + (data('alt2.fg1') || '#222') + ";\n     background-color: " + (data('alt2.bg1') || '#fff') + ";\n   }\n   .alt2.secondary > .rtabs-tab-window {\n     color: " + (data('alt2.fg2') || '#222') + ";\n     background-color: " + (data('alt2.bg2') || '#fff') + ";\n   }\n \n   .rtabs-flat > .rtabs-tab-window {\n     box-shadow: none;\n   }\n   .rtabs-flat > .rtabs-tab-window:after {\n     content: '';\n     height: 0.15em;\n     position: absolute;\n     bottom: 0px;\n     width: 100%;\n     display: block;\n     background-color: " + (data('tabs.tab.fg') || data('bga1') || '#222') + ";\n   }\n   .rtabs-flat.secondary > .rtabs-tab-window:after {\n     background-color: " + (data('tabs.tab.fg') || data('bga2') || '#07e') + ";\n   }\n   .rtabs-flat.alt1 > .rtabs-tab-window:after {\n     background-color: " + (data('alt1.bga1') || '#222') + ";\n   }\n   .rtabs-flat.alt1.secondary > .rtabs-tab-window:after {\n     background-color: " + (data('alt1.bga2') || '#222') + ";\n   }\n   .rtabs-flat.alt2 > .rtabs-tab-window:after {\n     background-color: " + (data('alt2.bga1') || '#222') + ";\n   }\n   .rtabs-flat.alt2.secondary > .rtabs-tab-window:after {\n     background-color: " + (data('alt2.bga2') || '#222') + ";\n   }\n \n   .rtabs-center.rtabs-left {\n     text-align: center;\n   }\n \n   .rtabs-pad {\n     padding: 1em;\n   }\n \n   .rtabs-fill {\n     flex-grow: 1;\n   }\n \n   .rtabs-tabs {\n     display: table;\n     position: relative;\n     min-width: 100%;\n     overflow-x: auto;\n     overflow-y: hidden;\n     white-space: nowrap;\n   }\n \n   .rtabs-tab {\n     display: inline-block;\n     box-sizing: border-box;\n     padding: 0.5em 1em;\n     height: 2.5em;\n     cursor: pointer;\n     opacity: 0.9;\n     transition: opacity 0.2s ease-in-out;\n     user-select: none;\n   }\n   .rtabs-tab:hover {\n     opacity: 1;\n   }\n \n   .rtabs-selected {\n     opacity: 1;\n   }\n \n   .rtabs-disabled {\n     opacity: 0.4;\n   }\n \n   .rtabs-right {\n     text-align: right;\n     display: table-cell;\n   }\n \n   .rtabs-left {\n     text-align: left;\n     display: table-cell;\n   }\n \n   .rtabs-close {\n     display: inline-block;\n     margin-right: -0.5em;\n     font-weight: 700;\n     opacity: 0.3;\n     transition: opacity: 0.2s ease-in-out;\n   }\n \n   .rtabs-close:hover {\n     opacity: 1;\n   }\n \n   .rtabs-indicator {\n     position: absolute;\n     bottom: 0;\n     height: 0.15em;\n     background-color: " + (data('tabs.indicator.color') || data('fga1') || 'darkblue') + ";\n     z-index: 2;\n   }\n \n   .secondary > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('fga2') || '#fff') + ";\n   }\n   .alt1 > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt1.fga1') || 'darkblue') + ";\n   }\n   .alt1.secondary > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt1.fga2') || 'darkblue') + ";\n   }\n   .alt2 > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt2.fga1') || 'darkblue') + ";\n   }\n   .alt2.secondary > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt2.fga2') || 'darkblue') + ";\n   }\n \n   .rtabs-going-left .rtabs-indicator {\n     transition: left 0.2s ease-in-out, right 0.2s ease-in-out 0.1s;\n   }\n   .rtabs-going-right .rtabs-indicator {\n     transition: left 0.2s ease-in-out 0.1s, right 0.2s ease-in-out;\n   }\n \n   .rtabs-content-wrapper {\n     width: 100%;\n     box-sizing: border-box;\n     display: flex;\n     flex-direction: column;\n     flex-grow: 2;\n     overflow: hidden;\n   }\n \n   .rtabs-content-window {\n     width: 100%;\n     display: flex;\n     flex-grow: 1;\n     overflow-y: auto;\n     overflow-x: hidden\n   }\n \n   .rtabs {\n     color: " + (data('tabs.content.fg') || data('fg1') || '#222') + ";\n     background-color: " + (data('tabs.content.bg') || data('bg1') || '#fff') + ";\n   }\n   .rtabs.alt1 {\n     color: " + (data('alt1.fg1') || '#222') + ";\n     background-color: " + (data('alt1.bg1') || '#fff') + ";\n   }\n   rtabs.alt2 {\n     color: " + (data('alt2.fg1') || '#222') + ";\n     background-color: " + (data('alt2.bg1') || '#fff') + ";\n   }\n \n   .rtabs-contents {\n     list-style: none;\n     padding: 0;\n     margin: 0;\n     position: relative;\n     left: 0;\n     display: block;\n     flex-wrap: nowrap;\n     white-space: nowrap;\n     width: 100%;\n   }\n   .rtabs-trans-slide > .rtabs-contents {\n     transition: left 0.2s ease-in-out;\n   }\n   .rtabs-trans-fade > .rtabs-contents {\n     transition: opacity 0.15s ease;\n     opacity: 1;\n     white-space: nowrap;\n   }\n \n   .rtabs-fill > div > div > .rtabs-contents {\n     display: flex;\n   }\n \n   .rtabs-tab-content {\n     display: inline-block;\n     width: 100%;\n     vertical-align: top;\n     white-space: initial;\n     transition: opacity 0.1s ease-in-out;\n     flex-shrink: 0;\n     white-space: initial;\n     display: inline-block;\n     flex-direction: column;\n     flex-grow: 1;\n   }\n   .rtabs-fill > div > div > div > .rtabs-tab-content {\n     display: flex;\n   }\n \n   .rtabs-placeholder {\n     display: inline-block;\n     width: 100%;\n     height: 1px;\n     flex-shrink: 0;\n   }\n   .rtabs-dyna.rtabs-not-selected {\n     height: 1px;\n     opacity: 0;\n     overflow: hidden;\n   }\n   .rtabs-pad > .rtabs-tab-content {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   .rtabs-pad > .rtabs-tab-content.rtabs-no-pad {\n     padding: 0;\n   }\n   ")
}).call(this, data)].join(' '); },
  attributes: ['transition', 'flat', 'pad', 'center', 'height', 'fill'],
  data: function data() {
    return {
      tabs: [],
      rightTabs: [],
      selected: 0,
      selectedContent: 0,
      opacity: 1
    }
  },
  on: {
    construct: construct,
    config: function config() {
      if ( this._tabs ) { this.set('tabs', (this.get('tabs') || []).concat(this._tabs), { shuffle: true }); }
    },
    select: select,
    close: close,
    teardown: function teardown() {
      instances.splice(instances.indexOf(this), 1);
    },
    render: function render() {
      var this$1 = this;

      this._resizeListener = this.root.on('*.resize', function () { return this$1.updateIndicator(); });
      setTimeout(function () { return this$1.updateIndicator(); });
    },
    unrender: function unrender() {
      if (this._resizeListener) {
        this._resizeListener.cancel();
        this._resizeListener = null;
      }
    }
  },
  decorators: {
    registered: function registered(node, idx) {
      var me = this;

      if (!this._tabs) { this._tabs = []; }

      this._tabs[idx] = node;
      this.updateIndicator();

      return {
        teardown: function teardown() {},
        invalidate: function invalidate() {
          me.updateIndicator();
        },
        update: function update(idx) {
          me._tabs[idx] = node;
          setTimeout(function () { return me.updateIndicator(); });
        }
      };
    }
  }
});

function construct() {
  var cmp = this.component;
  if ( !cmp ) { return; }

  var tpl = cmp.template.f || [];
  var attrs = cmp.template.m ? cmp.template.m.slice() : [];
  var t = cmp.template;
  cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

  var tabs = tpl.filter(function (n) { return n.e === 'tab'; }).map(function (t) {
    var tab = {
      template: { t: t.f }
    };
    var extra = [];
    var extraTab = [];

    t.m.forEach(function (a) {
      if (a.t === 13 && ~tabAttrs.indexOf(a.n)) {
        if (a.n === 'disabled' && a.f && a.f.length === 1 && a.f[0].t === 2) {
          var cnd = "_cnd" + (attrs.length);
          tab.disabled = cnd;
          attrs.push({ t: 13, n: cnd, f: a.f });
        } else if (a.n === 'no-pad') {
          if (!a.f) { tab.pad = false; }
          else if (a.f.length === 1 && a.f[0].t === 2) {
            var cnd$1 = "_cnd" + (attrs.length);
            tab.padRef = cnd$1;
            attrs.push({ t: 13, n: cnd$1, f: a.f });
          }
        } else {
          tab[a.n] = a.f === 0 ? true : typeof a.f === 'string' ? a.f : { t: a.f };
        }
      }
      else if (a.t === 70) { extraTab.push(a); }
      else { extra.push(a); }
    });

    if (extra.length) { tab.extra = { t: extra }; }
    if (extraTab.length) { tab.extraTab = { t: extraTab }; }

    return tab;
  });

  this._tabs = tabs;

  if (!resizer && typeof window !== undefined) {
    resizer = true;
    window.addEventListener('resize', function () {
      instances.forEach(function (i) { return i.updateIndicator(); });
    });
  }

  instances.push(this);
}

function select(ctx, idx) {
  var this$1 = this;

  var current = this.get('selected');
  var node = this.find('.contents');
  var trans = this.get('transition');

  if (current !== idx) {
    if (trans === 'fade') {
      this.set({
        opacity: 0,
        selected: idx
      });
      this.updateIndicator();

      setTimeout(function () {
        this$1.set({
          selectedContent: idx,
          opacity: 1
        });
      }, 150);
    } else if (trans === 'slide') {
      this.set('selected', idx);
      this.set('selectedContent', idx);
      this.updateIndicator();
    } else {
      this.set({
        selected: idx,
        selectedContent: idx
      });
      this.updateIndicator();
    }
  }
}

function close(ctx, idx) {
  var tab = this.getContext(this._tabs[idx]);
  var ok = true;

  if (tab.element.events.find(function (e) { return e.events.find(function (e) { return e.name === 'close'; }); })) {
    ok = tab.raise('close');
  }

  if (ok) { this.splice('tabs', idx, 1); }

  return false;
}

globalRegister('RMTabs', 'components', Tabs);

export default Tabs;
