(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ractive')) :
	typeof define === 'function' && define.amd ? define(['ractive'], factory) :
	(global.RMTable = factory(global.Ractive));
}(this, (function (Ractive$1) { 'use strict';

Ractive$1 = Ractive$1 && Ractive$1.hasOwnProperty('default') ? Ractive$1['default'] : Ractive$1;

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

var sortRE = /^([-+])?([^\s]+)$/;

var Table = (function (Ractive) {
  function Table(opts) { Ractive.call(this, opts); }

  if ( Ractive ) Table.__proto__ = Ractive;
  Table.prototype = Object.create( Ractive && Ractive.prototype );
  Table.prototype.constructor = Table;

  Table.prototype.allSelected = function allSelected () {
    var sel = this.get('selections');
    var visible = this.get('visibleRows');

    for (var i = 0; i < visible.length; i++) {
      if (!~sel.indexOf(visible[i])) { return false; }
    }

    return true;
  };

  Table.prototype.nodeSet = function nodeSet (node, prop, value) { node[prop] = value; };

  Table.prototype._setSort = function _setSort (idx, ev) {
    var col = this.get(("columns." + idx));
    if (!col || !(col.sort || col.filter)) { return; }
    var sort = col.sort || col.filter;
    if (typeof sort === 'string' && sort[0] === '~') { sort = this.get(sort); }

    var multi = ev.ctrlKey;
    var sorts = this.get('sort');

    if (!Array.isArray(sort)) { sort = [sort]; }
    if (!sorts) { sorts = []; }
    else if (!Array.isArray(sorts)) { sorts = [sorts]; }

    if (!sorts.length) { this.set('sort', sort.map(function (s) { return ("+" + s); })); }
    else {
      var cur = sorts.map(function (s) { return sortRE.exec(s).slice(1); });
      var overlap = sort.reduce(function (a, c) { return a && !!cur.find(function (s) { return s[1] === c; }); }, true);
      if (overlap && sorts.length !== sort.length && !multi) { this.set('sort', sort.map(function (s) { return ("+" + sort); })); }
      else if (!multi) {
        if (overlap) { this.set('sort', cur.map(function (s) { return ("" + (s[0] === '+' ? '-' : '+') + (s[1])); })); }
        else { this.set('sort', sort.map(function (s) { return ("+" + s); })); }
      } else {
        if (overlap) { this.set('sort', cur.map(function (s) { return ~sort.indexOf(s[1]) ? ("" + (s[0] === '+' ? '-' : '+') + (s[1])) : s[0] + s[1]; })); }
        else { this.set('sort', sorts.concat(sort.map(function (s) { return ("+" + s); }))); }
      }
    }
  };

  Table.prototype._select = function _select (src, ev) {
    var sels = this.get('selections');
    if (!sels) {
      sels = [];
      this.set('selections', sels);
    }

    var i = sels.indexOf(src);

    if (~i) { this.splice('selections', i, 1); }
    else { this.push('selections', src); }

    if (i >= sels.length || sels.length === 1) { this.set('selected', sels[sels.length - 1]); }

    this.fire('selection', {}, { item: sels[sels.length - 1], items: sels });

    setTimeout(function () { return ev.target.checked = !~i; });
  };

  Table.prototype.select = function select () {
    var selected = this.get('selected');

    if (selected) {
      this.fire('selected', {}, selected, this.get('rows').indexOf(selected), this.get('visibleRows').indexOf(selected));
    }
  };

  Table.prototype.selectionOffset = function selectionOffset (offset) {
    var selected = this.get('selected');
    var visible = this.get('visibleRows');
    if (!selected || !~visible.indexOf(selected)) {
      var next = offset > 0 ? visible[0] : visible[visible.length - 1];
      this.set({
        selected: next,
        selections: [next]
      });
    } else {
      var idx = visible.indexOf(selected);
      if (offset > 0 ? idx + offset >= visible.length : idx + offset < 0 ) {
        var move = (offset < 1 ? -1 : 1);
        if ((move < 0 && this.get('page') + move >= 0) || (move > 0 && this.get('page') + move < this.get('pagination.total'))) {
          this.add('page', move);
        }
        visible = this.get('visibleRows');
        var next$1 = offset > 0 ? visible[0] : visible[visible.length - 1];
        this.set({
          selected: next$1,
          selections: [next$1]
        });
      } else {
        this.set({
          selected: visible[idx + offset],
          selections: [visible[idx + offset]]
        });
      }
    }

    this.fire('selection', {}, { item: this.get('selected'), items: this.get('selections') });
  };

  Table.prototype.selectionDown = function selectionDown () {
    this.selectionOffset(1);
  };

  Table.prototype.selectionUp = function selectionUp () {
    this.selectionOffset(-1);
  };

  return Table;
}(Ractive$1));

Ractive$1.extendWith(Table, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rtable",t:13},{n:"class-rtable-virtual",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"virtual\""}}]},{n:"class-rtable-auto",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"auto\""}}]}],f:[{t:7,e:"div",m:[{n:"class-rtable-top",t:13}],f:[{t:7,e:"table",m:[{t:16,r:"extra-attributes"}],f:[{t:8,r:"head"}," ",{t:8,r:"body"}," ",{t:4,f:[{t:7,e:"tr",m:[{n:"class-rtable-row",t:13}],f:[{t:7,e:"td",m:[{n:"colspan",f:[{t:2,x:{r:["~/columns.length","~/allowSelect"],s:"_0+(_1?1:0)"}}],t:13}],f:[{t:16,r:"empty"}]}]}],n:50,x:{r:["~/rows.length"],s:"!_0"}}]}]}," ",{t:8,r:"pagination"}]}],e:{"_0===\"virtual\"":function (_0){return(_0==="virtual");},"_0===\"auto\"":function (_0){return(_0==="auto");},"_0+(_1?1:0)":function (_0,_1){return(_0+(_1?1:0));},"!_0":function (_0){return(!_0);},"[_0._setSort(_1,_2)]":function (_0,_1,_2){return([_0._setSort(_1,_2)]);},"[_0._select(_1,_2),false]":function (_0,_1,_2){return([_0._select(_1,_2),false]);},"[[\"select\",_2,_0.indexOf(_2),_1.indexOf(_2)]]":function (_0,_1,_2){return([["select",_2,_0.indexOf(_2),_1.indexOf(_2)]]);},"~_0.indexOf(_1)":function (_0,_1){return(~_0.indexOf(_1));},"_0*_1+1":function (_0,_1){return(_0*_1+1);},"_2+1===_0?_1:(_2+1)*_3":function (_0,_1,_2,_3){return(_2+1===_0?_1:(_2+1)*_3);},"_0&&_1":function (_0,_1){return(_0&&_1);},"_0===1":function (_0){return(_0===1);},"[_0.set(\"page\",_1-1)]":function (_0,_1){return([_0.set("page",_1-1)]);},"_0>0":function (_0){return(_0>0);},"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]":function (_0,_1,_2,_3,_4){return([(/^\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set("page",+_1-1))||_2.nodeSet(_3,"value",_4+1)]);},"_0==_1+1":function (_0,_1){return(_0==_1+1);},"[_0.set(\"page\",_2[_1-1])]":function (_0,_1,_2){return([_0.set("page",_2[_1-1])]);},"_0===\"...\"":function (_0){return(_0==="...");},"[_0.set(\"page\",_1+1)]":function (_0,_1){return([_0.set("page",_1+1)]);},"_0<_1-1":function (_0,_1){return(_0<_1-1);}},p:{"csp-dummy":[{t:7,e:"div",m:[{n:["click"],t:70,f:{r:["@this",".index","@event"],s:"[_0._setSort(_1,_2)]"}},{n:["click"],t:70,f:{r:["@this",".","@event"],s:"[_0._select(_1,_2),false]"}},{n:["click"],t:70,f:{r:["~/rows","~/visibleRows","."],s:"[[\"select\",_2,_0.indexOf(_2),_1.indexOf(_2)]]"}}]}," ",{t:4,f:["..."],n:50,x:{r:["~/selections","."],s:"~_0.indexOf(_1)"}}],empty:["No data."],pagination:[{t:7,e:"div",m:[{n:"class-rtable-bottom",t:13}],f:[{t:7,e:"div",m:[{n:"class-rtable-info",t:13}],f:[{t:4,f:[{t:2,x:{r:["~/page","~/pagination.per"],s:"_0*_1+1"}}," - ",{t:2,x:{r:["~/pagination.total","~/rows.length","~/page","~/pagination.per"],s:"_2+1===_0?_1:(_2+1)*_3"}}," of ",{t:2,r:"~/rows.length"},{t:4,f:[" (",{t:2,r:"~/items.length"}," total)"],n:50,r:"~/isFiltered"}],n:50,x:{r:["pagination","rows.length"],s:"_0&&_1"}}," ",{t:4,f:[" "],n:50,x:{r:["_paginate"],s:"_0===1"}}]}," ",{t:7,e:"div",m:[{n:"class-rtable-pages",t:13}],f:[{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1-1)]"}}],f:["Previous"]}],n:50,x:{r:["~/page"],s:"_0>0"}}," ",{t:4,f:[{t:4,f:[{t:7,e:"input",m:[{n:["change"],t:70,f:{r:["~/pagination.total","@node.value","@this","@node","~/page"],s:"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]"}},{n:"value",f:[{t:2,r:"."}],t:13},{t:73,v:"t",f:"false"}]}],n:50,x:{r:[".","~/page"],s:"_0==_1+1"}},{t:4,n:50,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","@index","../"],s:"[_0.set(\"page\",_2[_1-1])]"}}],f:["..."]}],x:{r:["."],s:"_0===\"...\""},l:1},{t:4,n:51,f:[" ",{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","."],s:"[_0.set(\"page\",_1-1)]"}}],f:[{t:2,r:"."}]}],l:1}],n:52,r:"~/pagination.array"}," ",{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1+1)]"}}],f:["Next"]}],n:50,x:{r:["~/page","~/pagination.total"],s:"_0<_1-1"}}]}]}],body:[{t:4,f:[{t:8,r:"row"}],n:52,r:"~/visibleRows"}]}},
  css: function(data) { return [(function(data) {
   return ("\n   .rtable {\n     display: flex;\n     flex-direction: column;\n     overflow: auto;\n     max-width: 100%;\n     max-height: 100%;\n     box-sizing: border-box;\n     flex-grow: 2;\n   }\n \n   .rtable > div > table {\n     width: 100%;\n     border-collapse: collapse;\n   }\n \n   .rtable td {\n     padding: 0.5em;\n   }\n \n   .rtable-header {\n     padding: 0.5em;\n     text-align: left;\n   }\n \n   .rtable-number-column {\n     text-align: right;\n   }\n   .rtable-date-column {\n     text-align: right;\n   }\n \n   .rtable-header {\n     border-bottom: 1px solid " + (data('table.divider') || data('table.fg') || data('fg1') || '#999') + ";\n   }\n \n   .rtable-header > th {\n     padding: 0.3em 0.5em 1em 0.5em;\n   }\n \n   .rtable-row {\n     color: " + (data('table.fg') || data('fg1') || '#000') + ";\n     border-bottom: 1px solid " + (data('table.divider') || data('table.fg') || data('fg1') || '#999') + ";\n     background-color: " + (data('table.odd') || data('bg1') || '#fff') + ";\n     transition: 0.2s ease-in-out;\n     transition-property: background-color, color;\n   }\n   .rtable-row:nth-child(even) {\n     background-color: " + (data('table.even') || data('bga1') || '#eee') + ";\n   }\n   .rtable-row:last-of-type {\n     border-bottom: none;\n   }\n   .rtable-row:hover {\n     background-color: " + (data('table.over') || '#eee') + ";\n   }\n \n   .rtable-row.rtable-selected {\n     background-color: " + (data('table.selected.bg') || data('bg2') || '#fe7') + ";\n     color: " + (data('table.selected.fg') || data('fg2') || '#fff') + ";\n   }\n \n   .rtable-top {\n     flex-grow: 5;\n     flex-shrink: 1;\n     overflow-y: auto;\n     margin: 0.5em 0;\n   }\n \n   .rtable-bottom {\n     display: flex;\n     flex-wrap: wrap;\n     flex-shrink: 0;\n   }\n \n   .rtable-info {\n     min-width: 50%;\n   }\n   .rtable-pages {\n     min-width: 50%;\n     text-align: right;\n   }\n   .rtable-pages span {\n     margin: 0.3em;\n     cursor: pointer;\n     user-select: none;\n   }\n   .rtable-pages span:first-of-type {\n     margin-left: 0;\n   }\n   .rtable-pages input {\n     text-align: center;\n     width: 2.5em;\n     font-size: 1em;\n     background-color: transparent;\n     border: none;\n     padding: 0;\n     font-weight: bold;\n     text-decoration: underline;\n   }\n \n   .rtable-select {\n     width: 0;\n     outline: none;\n     margin-right: 1em;\n   }\n   .rtable-select:before {\n     content: '';\n     display: block;\n     border: 2px solid " + (data('fg1') || '#222') + ";\n     width: 1em;\n     height: 1em;\n     box-sizing: border-box;\n     transition: 0.2s ease-in-out;\n     transition-property: transform, border-color, height, width;\n   }\n   .rtable-select:checked:before {\n     height: 0.7em;\n     width: 1.3em;\n     border-color: " + (data('fg2') || '#f9f9f9') + ";\n     border-top-color: transparent;\n     border-right-color: transparent;\n     transform: rotate(-50deg);\n   }\n   .rtable-select-header {\n     text-align: center;\n   }\n   .rtable-select-header,\n   .rtable-select-row {\n     width: 3em;\n   }\n   .rtable-select-header .rtable-select:checked:before {\n     border-color: " + (data('fg1') || '#222') + ";\n     border-top-color: transparent;\n     border-right-color: transparent;\n   }\n   ");
}).call(this, data)].join(' '); },
  cssId: 'rtable',
  attributes: [ 'paginate', 'items', 'filter', 'sort' ],
  components: {
    table: false,
    Table: false
  },
  on: {
    construct: construct,
    config: function config() {
      if (this._items) { this.set(this._items); }
      if (this._row) { this.partials.row = this._row; }
      if (this._head) { this.partials.head = this._head; }
    },
    render: function render() {
      if (this._autoObserver) { this._autoObserver.fire(); }
    },
    selectAll: function selectAll() {
      var sel, item;
      if (this.allSelected()) {
        item = null;
        sel = [];
        this.set({
          selections: sel,
          selected: item
        });
      } else {
        sel = this.get('visibleRows').slice();
        item = sel[0];
        this.set({
          selections: sel,
          selected: item
        });
      }

      this.fire('selection', {}, { item: item, items: sel });
    }
  },
  observe: {
    paginate: function paginate(v) {
      var this$1 = this;

      if (v === 'auto' || v instanceof Ractive$1) {
        if (this._autoObserver) { this._autoObserver.cancel(); } // may be changing instances

        var root = v === 'auto' ? this.root : v;

        var fn = function () {
          if (!this$1.fragment.rendered) { return; }
          var top = this$1.find('.rtable-top');
          if (!top) { return; }

          if (fn.last === top.clientHeight) { return; }

          this$1.set('_paginate', 1);
          var rows = this$1.findAll('tr');

          this$1.set('_paginate', Math.floor((top.clientHeight - rows[0].offsetHeight) / rows[1].offsetHeight));

          fn.last = top.clientHeight;
        };

        this._autoObserver = root.on('*.resize', fn);
        this._autoObserver.fire = fn;
      } else if (this._autoObserver) {
        this._autoObserver.cancel();
      }
    }
  },
  data: function data() {
    return {
      page: 0,
      selections: [],
      allowSelect: true,
      allowSelectAll: true
    }
  },
  computed: {
    rows: {
      get: function get() {
        var this$1 = this;

        var cols = this.viewmodel.value.columns.filter(function (c) { return c.filter; }).map(function (c) {
          var v = c.filter;
          if (v.indexOf('~/') === 0) { v = this$1.get(v); }
          if (typeof v === 'string') { v = Ractive$1.splitKeypath(v); }
          if (!Array.isArray(v)) { return; }
          return v;
        }).filter(function (c) { return c; });
        var list = this.get('items') || [];
        var src = list;
        var filter = this.get('filter');
        var sort = this.get('sort');

        // TODO: object filter with operators targeting specific cols e.g. age > 20
        if (typeof filter === 'string') {
          var nocase = filter === filter.toLowerCase() || filter === filter.toUpperCase();
          var re = new RegExp(filter, nocase ? 'i' : '');
          list = list.filter(function (l) {
            var i = cols.length;
            while (i--) {
              var v = applyPath(l, cols[i]);
              if (re.test(v)) { return true; }
            }
            return false;
          });
        } else if (filter instanceof RegExp) {
          list = list.filter(function (l) {
            var i = cols.length;
            while (i--) {
              var v = applyPath(l, cols[i]);
              if (l && typeof v === 'string' && filter.test(v)) { return true; }
            }
          });
        }

        if (typeof sort === 'string') { sort = [sort]; }

        if (Array.isArray(sort)) {
          sort = sort.map(function (f) { return ({
            dir: f[0] === '-' ? -1 : 1,
            path: Ractive$1.splitKeypath(f[0] === '-' || f[0] === '+' ? f.substr(1) : f)
          }); });

          list.sort(function (a, b) {
            var aa, bb, p;
            for (var i = 0; i < sort.length; i++) {
              aa = applyPath(a, sort[i].path);
              bb = applyPath(b, sort[i].path);
              p = sort[i].dir * compare(aa, bb);

              if (p !== 0) { return p; }
            }

            return p;
          });
        }

        this.set('isFiltered', src.length !== list.length);

        return list;
      }
    },
    visibleRows: {
      get: function get() {
        var this$1 = this;

        var rows = this.get('rows');
        var per = this.get('paginate');
        var intPer = this.get('_paginate');
        var offset = this.get('page') || 0;

        if (!per) { return rows; }

        if (typeof per !== 'number' && isNaN(+per)) {
          if (per === 'auto' || per instanceof Ractive$1) { per = intPer || 1; }
          else { per = 30; } // TODO: virtual table/auto size
        }

        if (offset * per > rows.length) { setTimeout(function () { return this$1.set('page', 0); }, 0); }

        return rows.slice(per * offset, per * offset + per);
      }
    },
    pagination: {
      get: function get() {
        var items = this.get('items');
        var rows = this.get('rows');
        var per = this.get('paginate');
        var offset = this.get('page') || 0;

        if (typeof per !== 'number' && isNaN(per)) {
          per = this.get('_paginate');
        }

        if (!per) { return; }

        var total = Math.ceil(rows.length / per);
        var info = {
          max: Math.ceil(items.length / per),
          total: total,
          per: per
        };

        if (info.total > 14) {
          var arr = info.array = [];

          if (offset > 5) { arr.push(1, 2, 3, '...'); }
          else { arr.push(1, 2, 3, 4, 5, 6, 7, 8); }

          if (offset > 5 && offset + 6 < total) { arr.push(offset - 1, offset, offset + 1, offset + 2, offset + 3, '...', total - 2, total - 1, total); }
          else if (offset + 6 < total) { arr.push('...', total - 2, total - 1, total); }
          else { arr.push(total - 7, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1, total); }
        } else {
          info.array = Array.apply(null, { length: info.total }).map(function (v, i) { return i + 1; });
        }

        return info;
      }
    }
  }
});

function applyPath(src, path) {
  if (path.length && typeof src !== 'object') { return; }
  var res = src;
  for (var i = 0; i < path.length; i++) {
    res = res[path[i]];
    if (typeof res !== 'object') { return i + 1 < path.length ? undefined : res; }
  }
  return res;
}

function compare(a, b) {
  return a < b ? -1 :
    a > b ? 1 :
    a == b ? 0 :
    !a && b ? -1 :
    a && !b ? 1 :
    0;
}

var colAttrs = ['label', 'type', 'filter', 'hidden', 'sort'];
function construct() {
  var cmp = this.component;
  if ( !cmp ) { return; }

  var tpl = cmp.template.f || [];
  var attrs = cmp.template.m ? cmp.template.m.slice() : [];
  var t = cmp.template;
  cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

  var columns = [];

  var id = 0;
  function map(attr, partial) {
    if (attr && attr.f && attr.f.length === 1 && attr.f[0].t === 2) {
      var n = "_a" + (id++);
      attrs.push({ t: 13, n: n, f: attr.f });
      return partial ? { t: [{ t: 2, r: ("~/" + n) }] } : { t: 2, r: ("~/" + n) };
    }
    return attr && attr.f;
  }

  // get column defs
  // build row partial
  tpl.forEach(function (e) {
    if (e.e === 'column') {
      var col = {};
      col.index = columns.length;
      columns.push(col);

      col.content = (e.f || []).filter(function (e) { return e.e !== 'edit'; });

      col.label = e.m.find(function (a) { return a.n === 'label'; });
      if (col.label && col.label.f) { col.label = map(col.label); }
      if (!col.label) { col.label = ''; }
      if (!Array.isArray(col.label)) { col.label = [col.label]; }

      col.type = e.m.find(function (a) { return a.n === 'type'; });
      if (col.type && col.type.f) { col.type = col.type.f; }
      if (!col.type) { col.type = 'string'; }

      col.filter = e.m.find(function (a) { return a.n === 'filter'; });
      if (col.filter && col.filter.f) {
        col.filter = map(col.filter);
        if (col.filter.r) { col.filter = col.filter.r; }
      }

      col.sort = e.m.find(function (a) { return a.n === 'sort'; });
      if (col.sort && col.sort.f) {
        col.sort = map(col.sort);
        if (col.sort.r) { col.sort = col.sort.r; }
      }

      col.hidden = e.m.find(function (a) { return a.n === 'hidden'; });
      if (col.hidden && col.hidden.f === 0) { col.hidden = true; }
      else if (col.hidden && typeof col.hidden.f === 'object') { col.hidden = map(col.hidden); }
      else { col.hidden = false; }
      if (typeof col.hidden === 'string') { col.hidden = false; }

      col.attrs = e.m.filter(function (a) { return !~colAttrs.indexOf(a.n); });
    }
  });

  this._items = { columns: columns };

  var sortKey = '[_0._setSort(_1,_2)]';
  var header = [{ t: 7, e: 'tr', m: [{ t: 13, n: 'class-rtable-header' }], f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
    var th = { t: 7, e: 'th', f: c.label, m: [{ t: 13, n: 'class-rtable-header' }, { t: 4, n: 53, r: ("~/columns." + (c.index)), f: [{ t: 70, n: ['click'], f: { r: ['@this', '.index', '@event'], s: sortKey} }] }] };
    if (c.type) { th.m.push({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
    var res = th;

    if (c.hidden && c.hidden.r) {
      res = { t: 4, n: 51, r: c.hidden.r, f: [th] };
    }

    return res;
  }) }];

  // selectall
  header[0].f.unshift({
    t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'th', m: [{ t: 13, n: 'class-rtable-select-header' }], f: [{ t: 4, n: 50, r: '~/allowSelectAll', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this'], s: '_0.allSelected()' } }] }, { t: 70, n: ['click'], f: 'selectAll' }, { t: 13, n: 'class-rtable-select' }] }] }] }]
  });

  var row = [{ t: 7, e: 'tr', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
    // TODO: editable, selection, etc
    var td = { t: 7, e: 'td', f: c.content, m: c.attrs };
    if (c.type) { td.m = [{ t: 13, n: ("class-rtable-" + (c.type) + "-column") }]; }
    var res = td;

    if (c.hidden && c.hidden.r) {
      res = { t: 4, n: 51, r: c.hidden.r, f: [td] };
    }

    return res;
  }), m: [
    { t: 13, n: 'class-rtable-row' },
    { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] },
    { t: 70, n: ['click'], f: { r: ['~/rows', '~/visibleRows', '.'], s: "[['selected',_2,_0.indexOf(_2),_1.indexOf(_2)]]" } }
  ]}];

  // select
  row[0].f.unshift({
    t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'th', m: [{ t: 13, n: 'class-rtable-select-row' }], f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }, { t: 70, n: ['click'], f: { r: ['@this', '.', '@event'], s: '[_0._select(_1,_2),false]' } }, { t: 13, n: 'class-rtable-select' }] }] }]
  });

  this._row = row;
  this._head = header;
}

globalRegister('RMTable', 'components', Table);

return Table;

})));
