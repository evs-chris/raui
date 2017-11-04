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

function expand(t, params) {
  var p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
  t.setStyle('overflow', 'hidden');
  var axis = p.axis === 'x' ? 'width' : 'height';
  if (t.isIntro) {
    var val = t.getStyle(axis);
    t.setStyle(axis, 0);
    t.setStyle('opacity', 0);
    return t.animateStyle(axis, val, p).then(function () { return t.animateStyle('opacity', 1, p); });
  } else {
    t.setStyle(axis, t.getStyle(axis));
    t.setStyle('opacity', 1);
    return t.animateStyle('opacity', 0, p).then(function () { return t.animateStyle(axis, 0, p); });
  }
}

globalRegister('expand', 'transitions', expand);

var Menu = (function (Ractive) {
  function Menu(opt) { Ractive.call(this, opts); }

  if ( Ractive ) Menu.__proto__ = Ractive;
  Menu.prototype = Object.create( Ractive && Ractive.prototype );
  Menu.prototype.constructor = Menu;

  Menu.prototype.addItem = function addItem (item, idx) {
    if (typeof idx === 'number') {
      this.splice('items', idx, 0, item);
    } else {
      this.push('items', item);
    }

    return new Handle(this, null, item);
  };

  Menu.prototype.visibleItems = function visibleItems (items) {
    var this$1 = this;

    return items.filter(function (i) { return i.condition !== false && (typeof i.condition !== 'string' || this$1.get(i.condition) !== false); }).length;
  };

  Menu.prototype.getHandle = function getHandle (what) {
    var this$1 = this;

    var ctx;
    if (typeof what === 'string') {
      if (this.refs[what]) {
        ctx = this.refs[what].ctx;
      } else {
        var el = this.find(what);
        if (el) { ctx = this.getContext(el); }
      }
    } else if (what && what.parentNode) {
      ctx = this.getContext(what);
    }

    if (ctx) {
      var path = [ctx.get()];
      var str = '../../';
      while (ctx.resolve(str) !== '') {
        path.unshift(ctx.get(str));
        str += '../../';
      }

      return path.reduce(function (a, c) {
        return new Handle(this$1, a, c);
      }, null);
    }
  };

  return Menu;
}(Ractive$1));

// TODO: api handles, active elements, and ids
Ractive$1.extendWith(Menu, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rmenu",t:13}],f:[{t:8,r:"items"}]}],p:{container:[{t:4,f:[{t:3,r:".content"}],n:50,r:".content"},{t:4,n:50,f:[{t:16,r:".contentPartial"}],r:".contentPartial",l:1}],section:[{t:7,e:"div",m:[{n:"class-rmenu-main",t:13}],f:[{t:7,e:"div",m:[{n:"class-rmenu-title",t:13}],f:[{t:4,f:[{t:2,r:".title"}],n:50,r:".title"},{t:4,n:50,f:[{t:16,r:".titlePartial"}],r:".titlePartial",l:1}]}]}," ",{t:8,r:"children"}],children:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-items",t:13},{n:"expand",t:72,v:"t0"}],f:[{t:8,r:"items"}]}],n:50,x:{r:[".items.length",".open",".type"],s:"_0&&(_1||_2===\"section\")"}}],item:[{t:7,e:"div",m:[{n:"class-rmenu-main",t:13},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".activeRef"}]}}]}],n:50,r:".activeRef"},{t:4,n:50,f:[{n:"class-rmenu-active",t:13,f:[{t:2,x:{r:["."],s:"_0.active()"}}]}],x:{r:[".active"],s:"typeof _0===\"function\""},l:1},{t:4,n:50,f:[{n:"class-rmenu-active",t:13,f:[{t:2,r:".active"}]}],x:{r:[".active"],s:"typeof _0===\"boolean\""},l:1}],f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-menu-left",t:13}],f:[{t:3,r:".left"}]}],n:50,r:".left"},{t:4,n:50,f:[{t:7,e:"div",m:[{n:"class-rmenu-left",t:13}],f:[{t:16,r:".leftPartial"}]}],r:".leftPartial",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-expand",t:13},{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}},{n:"expand",t:72,f:{r:[],s:"[{axis:\"x\"}]"},v:"t0"}]}],n:50,x:{r:[".items.length","@this",".items"],s:"_2&&_0&&_1.visibleItems(_2)"}}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-menu-right",t:13}],f:[{t:3,r:".right"}]}],n:50,r:".right"},{t:4,n:50,f:[{t:7,e:"div",m:[{n:"class-rmenu-right",t:13}],f:[{t:16,r:".rightPartial"}]}],r:".rightPartial",l:1}," ",{t:7,e:"div",m:[{n:"class-rmenu-title",t:13},{t:4,f:[{t:16,r:".actionPartial"}],n:50,r:".actionPartial"},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.action()]"}}],n:50,x:{r:[".action"],s:"typeof _0===\"function\""}},{t:4,f:[{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}}],n:50,x:{r:[".actionPartial",".action",".items.length"],s:"!_0&&typeof _1!==\"function\"&&_2"}}],f:[{t:4,f:[{t:3,r:".title"}],n:50,r:".title"},{t:4,n:50,f:[{t:16,r:".titlePartial"}],r:".titlePartial",l:1}]}]}," ",{t:8,r:"children"}],items:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-entry",t:13},{t:4,f:[{n:"class-rmenu-item",t:13}],n:50,x:{r:[".type"],s:"!_0||_0===\"item\""}},{t:4,n:50,f:[{n:"class-rmenu-section",t:13}],x:{r:[".type"],s:"_0===\"section\""},l:1},{t:4,n:50,f:[{n:"class-rmenu-container",t:13}],x:{r:[".type"],s:"_0===\"container\""},l:1},{n:"class-rmenu-expanded",t:13,f:[{t:2,r:".open"}]},{n:"expand",t:72,v:"t0"},{t:4,f:[{t:8,r:".refPartial"}],n:50,r:".refPartial"},{t:4,n:50,f:[{n:"ref",t:71,f:{r:[".ref"],s:"[_0]"}}],x:{r:[".ref"],s:"typeof _0===\"string\""},l:1},{t:4,f:[{t:16,r:".attrsPartial"}],n:50,r:".attrsPartial"}],f:[{t:8,x:{r:[".type"],s:"_0||\"item\""}}]}],n:50,x:{r:["~/",".condition","."],s:"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())"}}],n:52,r:".items"}]},e:{"_0&&(_1||_2===\"section\")":function (_0,_1,_2){return(_0&&(_1||_2==="section"));},"_0.active()":function (_0){return(_0.active());},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"typeof _0===\"boolean\"":function (_0){return(typeof _0==="boolean");},"[(_0).toggle(\".open\"),false]":function (_0){return([(_0).toggle(".open"),false]);},"[{axis:\"x\"}]":function (){return([{axis:"x"}]);},"_2&&_0&&_1.visibleItems(_2)":function (_0,_1,_2){return(_2&&_0&&_1.visibleItems(_2));},"[_0.action()]":function (_0){return([_0.action()]);},"!_0&&typeof _1!==\"function\"&&_2":function (_0,_1,_2){return(!_0&&typeof _1!=="function"&&_2);},"!_0||_0===\"item\"":function (_0){return(!_0||_0==="item");},"_0===\"section\"":function (_0){return(_0==="section");},"_0===\"container\"":function (_0){return(_0==="container");},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"_0||\"item\"":function (_0){return(_0||"item");},"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())":function (_0,_1,_2){return(_1===undefined||(typeof _1==="boolean"&&_1)||(typeof _1==="string"&&_0[_1])||(typeof _1==="function"&&_2.condition()));}}},
  css: function(data) { return [(function(data) {
   var base = "\n   .rmenu {\n     font-family: " + (data('menu.font') || 'sans-serif') + ";\n     color: " + (data('menu.fg') || '#fefefe') + ";\n     background-color: " + (data('menu.bg') || '#444') + ";\n     min-height: 100%;\n   }\n   .rmenu-item {\n     border-top: 1px solid transparent;\n     border-bottom: 1px solid transparent;\n     transition: border 0.2s ease-in-out;\n   }\n   .rmenu-expanded {\n     border-top: 1.5px solid " + (data('menu.fgdim') || data('fgdim') || 'rgba(255, 255, 255, 0.3)') + ";\n     border-bottom: 1.5px solid " + (data('menu.fgdim') || data('fgdim') || 'rgba(255, 255, 255, 0.3)') + ";\n   }\n   .rmenu-main {\n     width: 100%;\n     box-sizing: border-box;\n     user-select: none;\n     transition: 0.3s ease-in-out;\n     transition-property: color, background-color;\n   }\n   .rmenu-main.rmenu-active {\n     color: " + (data('menu.fgActive') || data('fga1') || '#07e') + ";\n     background-color: " + (data('menu.bgActive') || data('bg1') || '#dfdfdf') + ";\n   }\n   .rmenu-left {\n     float: left;\n     margin: 0 0 0 0.5em;\n   }\n   .rmenu-right {\n     float: right;\n     margin: 0 0.5em 0 0;\n   }\n   .rmenu-items {\n     display: block;\n   }\n   .rmenu-expand {\n     width: 1.5em;\n     height: 2em;\n     float: right;\n     padding-left: 0.5em;\n   }\n   .rmenu-expand:before {\n     position: relative;\n     display: inline-block;\n     font-size: 0.5em;\n     top: 1em;\n     padding: 0 0.5em 0.5em 0;\n     content: '◢';\n     transform: rotate(45deg);\n     transition: transform 0.2s ease-in-out;\n     box-sizing: border-box;\n   }\n \n   .rmenu-title {\n     white-space: nowrap;\n     overflow: hidden;\n     text-overflow: ellipsis;\n     cursor: pointer;\n     padding: 0.4em 0.5em;\n   }\n \n   .rmenu-section {\n     padding: 0.75em 0;\n   }\n   .rmenu-section > .rmenu-main {\n     cursor: default;\n     font-size: 0.75em;\n     opacity: 0.7;\n     margin-bottom: 0.25em;\n   }\n \n   .rmenu-container {\n     padding: 0.3em;\n     box-sizing: border-box;\n     margin-bottom: 0.5em;\n   }\n \n   .rmenu-expanded > .rmenu-main > .rmenu-expand:before {\n     transform: rotate(-135deg);\n   }\n   ";
 
   return base; //return base + '\n' + [1, 2, 3, 4].map(d => Array.apply(null, { length: d }).map(() => '.rmenu-items').join(' ') + ' .rmenu-main { padding-left: ' + ((d * 0.5) + 0.3) + 'em; }').join('\n');
}).call(this, data)].join(' '); },
  cssId: 'menu',
  noCssTransform: true,
  noIntro: true,
  nestedTransitions: false,
  on: {
    construct: construct,
    config: function config() {
      if ( this._items ) { this.set('items', (this.get('items') || []).concat(this._items), { shuffle: true }); }
    }
  },
  transitions: {
    expand: expand
  },
  decorators: {
    ref: function ref(node, name) {
      var r = this;
      var nm = name;
      if (!r.refs) { r.refs = {}; }

      var handle = {
        update: function update(name) {
          if (r.refs[nm] === handle) { delete r.refs[nm]; }
          nm = name;
          r.refs[nm] = handle;
        },
        teardown: function teardown() {
          if (r.refs[nm] === handle) { delete r.refs[nm]; }
        }
      };

      handle.ctx = r.getContext(node);

      r.refs[nm] = handle;

      return handle;
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

  function item(el) {
    if (el.e !== 'item' && el.e !== 'section' && el.e !== 'container') { return; }

    var res = {};
    var as = [];

    if (el.e !== 'item') { res.type = el.e; }

    el.m && el.m.forEach(function (a) {
      if (a.n === 'title') {
        if (typeof a.f === 'string') { res.title = a.f; }
        else { res.titlePartial = { t: a.f }; }
      } else if (a.t === 70 && a.n[0] === 'action') { // events
        res.actionPartial = { t: [{ n: ['click'], f: a.f, t: a.t }] };
      } else if (a.n === 'guard' && a.f && a.f.length === 1 && a.f[0].t === 2) {
        var cnd = "_cnd" + (attrs.length);
        res.condition = cnd;
        attrs.push({ t: 13, n: cnd, f: a.f });
      } else if (a.n === 'ref') {
        if (typeof a.f === 'string') {
          res.ref = a.f;
        } else if (a.f && a.f.length === 1 && a.f[0].t === 2) {
          var cnd$1 = "_cnd" + (attrs.length);
          attrs.push({ t: 13, n: cnd$1, f: a.f });
          res.refPartials = { t:[{ t: 71, n: 'ref', f: { r: cnd$1, s: '[_0]' } }] };
        }
      } else if (a.n === 'active') {
        if (a.f && a.f.length === 1 && a.f[0].t === 2) {
          var cnd$2 = "_cnd" + (attrs.length);
          res.activeRef = cnd$2;
          attrs.push({ t: 13, n: cnd$2, f: a.f });
        }
      } else {
        as.push(a);
      }
    });

    if (as.length) { res.attrsPartial = { t: as }; }

    if (el.e === 'container') {
      res.contentPartial = { t: el.f };
      return res;
    }

    el.f && el.f.forEach(function (e) {
      if (e.e === 'title') {
        if (e.f.length === 1 && typeof e.f[0] === 'string') { res.title = e.f[0]; }
        else { res.titlePartial = { t: e.f }; }
      }
      else if (e.e === 'item' || e.e === 'section' || e.e === 'container') {
        var i = item(e);
        if (i) { (res.items || (res.items = [])).push(i); }
      }
      else if (e.e === 'left') {
        res.leftPartial = { t: e.f };
      }
      else if (e.e === 'right') {
        res.rightPartial = { t: e.f };
      }
    });

    return res;
  }

  var list = [];
  tpl.forEach(function (e) {
    var i = item(e);
    if (i) { list.push(i); }
  });

  this._items = list;
}

var Handle = function Handle(menu, parent, item) {
  this.menu = menu;
  this.parent = parent;
  this.item = item;
};

var prototypeAccessors = { keypath: { configurable: true },active: { configurable: true } };

prototypeAccessors.keypath.get = function () {
  if (this.removed) { return; }
  if (!this.parent) { return ("items." + (this.menu.get('items').indexOf(this.item))); }
  var path = this.parent.keypath + '.items';
  var parent = this.menu.get(path);
  return (path + "." + (parent.indexOf(this.item)));
};

prototypeAccessors.active.get = function () {
  if (this.removed) { return; }
  var item = this.item;
  if (item.activeRef) { return this.menu.get(item.activeRef); }
  else if (typeof item.active === 'function') { return item.active(); }
  else { return item.active; }
};

prototypeAccessors.active.set = function (v) {
  if (this.removed) { return; }
  var item = this.item;
  if (item.activeRef) { return this.menu.set(item.activeRef, v); }
  else { return this.set(".active", v); }
};

Handle.prototype.addItem = function addItem (item, idx) {
  if (this.removed) { return false; }
  var items = (this.keypath) + ".items";
  if (typeof idx === 'number') {
    this.menu.splice(items, 0, idx, item);
  } else {
    this.menu.push(items, item);
  }
  return new Handle(this.menu, this, item);
};

Handle.prototype.open = function open () {
  if (this.removed) { return false; }
  this.menu.set(((this.keypath) + ".open"), true);
};

Handle.prototype.close = function close () {
  if (this.removed) { return false; }
  this.menu.set(((this.keypath) + ".open"), false);
};

Handle.prototype.remove = function remove () {
  if (this.removed) { return false; }
  var parentPath = (this.parent ? this.parent.keypath + '.' : '') + "items";
  var parent = this.menu.get(parentPath);
  this.menu.splice(parentPath, parent.indexOf(this.item), 1);
  this.removed = true;
  return true;
};

Handle.prototype.get = function get (keypath) {
  if (this.removed) { return false; }
  var key = keypath.replace(/^[\.\/]*/, '');
  return this.menu.get(((this.keypath) + "." + key));
};

Handle.prototype.set = function set (keypath, value) {
  if (this.removed) { return false; }
  var key = keypath.replace(/^[\.\/]*/, '');
  return this.menu.set(((this.keypath) + "." + key), value);
};

Object.defineProperties( Handle.prototype, prototypeAccessors );

globalRegister('RMMenu', 'components', Menu);

export default Menu;
