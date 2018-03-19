System.register(['ractive', './chunk5.js', './chunk6.js', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, grid, style, click, expand, globalRegister, Window;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      grid = module.grid;
      style = module.style;
    }, function (module) {
      click = module.default;
    }, function (module) {
      expand = module.default$2;
      globalRegister = module.default;
      Window = module.Window;
    }],
    execute: function () {

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

            return visible.length && true;
          };

          Table.prototype.nodeSet = function nodeSet (node, prop, value) { node[prop] = value; };

          Table.prototype._expand = function _expand (idx) {
            var which = this.get('visibleRows')[idx];
            if (this.get('expanded') === which) { this.set('expanded', null); }
            else { this.set('expanded', which); }
          };

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
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rtable",t:13},{n:"class-rtable-virtual",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"virtual\""}}]},{n:"class-rtable-auto",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"auto\""}}]},{n:"class-rtable-fixed",t:13,f:[{t:2,r:"~/fixed"}]}],f:["\n  ",{t:7,e:"div",m:[{n:"class-rtable-top",t:13}],f:["\n",{t:4,f:["      ",{t:8,r:"grid"},"\n"],n:50,x:{r:["~/display"],s:"_0===\"grid\""}},{t:4,f:["\n      ",{t:8,r:"table"},"\n    "],n:51,l:1},"  "]},"\n  ",{t:8,r:"pagination"},"\n"]}],e:{"_0===\"virtual\"":function (_0){return(_0==="virtual");},"_0===\"auto\"":function (_0){return(_0==="auto");},"_0===\"grid\"":function (_0){return(_0==="grid");},"[_0._setSort(_1,_2)]":function (_0,_1,_2){return([_0._setSort(_1,_2)]);},"[_0._select(_1,_2),false]":function (_0,_1,_2){return([_0._select(_1,_2),false]);},"[[\"select\",_2,_0.indexOf(_2),_1.indexOf(_2)]]":function (_0,_1,_2){return([["select",_2,_0.indexOf(_2),_1.indexOf(_2)]]);},"[_0._expand(_1)]":function (_0,_1){return([_0._expand(_1)]);},"_0.indexOf(_1)":function (_0,_1){return(_0.indexOf(_1));},"_0===_1":function (_0,_1){return(_0===_1);},"_0*_1+1":function (_0,_1){return(_0*_1+1);},"_2+1===_0?_1:(_2+1)*_3":function (_0,_1,_2,_3){return(_2+1===_0?_1:(_2+1)*_3);},"_0&&_1":function (_0,_1){return(_0&&_1);},"_0===1":function (_0){return(_0===1);},"_0.allSelected()&&_1<_2":function (_0,_1,_2){return(_0.allSelected()&&_1<_2);},"_0>0":function (_0){return(_0>0);},"[_0.set(\"page\",_1-1)]":function (_0,_1){return([_0.set("page",_1-1)]);},"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]":function (_0,_1,_2,_3,_4){return([(/^\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set("page",+_1-1))||_2.nodeSet(_3,"value",_4+1)]);},"_0==_1+1":function (_0,_1){return(_0==_1+1);},"[_0.set(\"page\",_2[_1-1])]":function (_0,_1,_2){return([_0.set("page",_2[_1-1])]);},"_0===\"...\"":function (_0){return(_0==="...");},"[_0.set(\"page\",_1+1)]":function (_0,_1){return([_0.set("page",_1+1)]);},"_0<_1-1":function (_0,_1){return(_0<_1-1);},"!_0":function (_0){return(!_0);},"_0+(_1?1:0)":function (_0,_1){return(_0+(_1?1:0));}},p:{"csp-dummy":["\n  ",{t:7,e:"div",m:[{n:["click"],t:70,f:{r:["@this",".index","@event"],s:"[_0._setSort(_1,_2)]"}},{n:["click"],t:70,f:{r:["@this",".","@event"],s:"[_0._select(_1,_2),false]"}},{n:["click"],t:70,f:{r:["~/rows","~/visibleRows","."],s:"[[\"select\",_2,_0.indexOf(_2),_1.indexOf(_2)]]"}},{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0._expand(_1)]"}}]},"\n  ",{t:4,f:["..."],n:50,x:{r:["~/selections","."],s:"_0.indexOf(_1)"}},"\n  ",{t:4,f:["..."],n:50,x:{r:[".","~/expanded"],s:"_0===_1"}},"\n"],empty:["\n  ",{t:7,e:"div",f:[{t:7,e:"div",f:["No data."]}]},"\n"],pagination:["\n  ",{t:7,e:"div",m:[{n:"class-rtable-bottom",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"class-rtable-info",t:13}],f:["\n      ",{t:4,f:[{t:2,x:{r:["~/page","~/pagination.per"],s:"_0*_1+1"}}," - ",{t:2,x:{r:["~/pagination.total","~/rows.length","~/page","~/pagination.per"],s:"_2+1===_0?_1:(_2+1)*_3"}}," of ",{t:2,r:"~/rows.length"},{t:4,f:[" (",{t:2,r:"~/items.length"}," total)"],n:50,r:"~/isFiltered"}],n:50,x:{r:["pagination","rows.length"],s:"_0&&_1"}},"\n      ",{t:4,f:["​"],n:50,x:{r:["_paginate"],s:"_0===1"}},"\n    "]},"\n    ",{t:7,e:"div",m:[{n:"class-rtable-select-all-all",t:13}],f:["\n",{t:4,f:["        ",{t:2,r:"selections.length"}," of ",{t:2,r:"rows.length"}," selected",{t:4,f:[" - ",{t:7,e:"a",m:[{n:"href",f:"#",t:13},{n:["click"],t:70,f:"selectAllAll"}],f:["Select All"]}],n:50,x:{r:["@this","selections.length","rows.length"],s:"_0.allSelected()&&_1<_2"}},"\n"],n:50,x:{r:["selections.length"],s:"_0>0"}},"    "]},"\n    ",{t:7,e:"div",m:[{n:"class-rtable-pages",t:13}],f:["\n    ",{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1-1)]"}}],f:["Previous"]}],n:50,x:{r:["~/page"],s:"_0>0"}},"\n",{t:4,f:["      ",{t:4,f:["\n      ",{t:7,e:"input",m:[{n:["change"],t:70,f:{r:["~/pagination.total","@node.value","@this","@node","~/page"],s:"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]"}},{n:"value",f:[{t:2,r:"."}],t:13},{t:73,v:"t",f:"false"}]},"\n"],n:50,x:{r:[".","~/page"],s:"_0==_1+1"}},{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","@index","../"],s:"[_0.set(\"page\",_2[_1-1])]"}}],f:["..."]},"\n      "],n:50,x:{r:["."],s:"_0===\"...\""},l:1},{t:4,f:["\n        ",{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","."],s:"[_0.set(\"page\",_1-1)]"}}],f:[{t:2,r:"."}]},"\n      "],n:51,l:1}],n:52,r:"~/pagination.array"},"    ",{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1+1)]"}}],f:["Next"]}],n:50,x:{r:["~/page","~/pagination.total"],s:"_0<_1-1"}},"\n    "]},"\n  "]},"\n"],grid:["\n  ",{t:7,e:"div",m:[{t:16,r:"extra-attributes"},{n:"grid",t:71}],f:["\n    ",{t:8,r:"grid-head"},"\n",{t:4,f:["      ",{t:8,r:"grid-row"},"\n"],n:52,r:"~/visibleRows"},"    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rtable-row",t:13},{n:"class-row",t:13},{n:"class-t1",t:13}],f:[{t:16,r:"empty"}]}],n:50,x:{r:["~/rows.length"],s:"!_0"}},"\n  "]},"\n"],"table-body":["\n"],table:["\n  ",{t:7,e:"table",m:[{t:16,r:"extra-attributes"}],f:["\n    ",{t:8,r:"table-head"},"\n",{t:4,f:["      ",{t:8,r:"table-row"},"\n"],n:52,r:"~/visibleRows"},"    ",{t:4,f:[{t:7,e:"tr",m:[{n:"class-rtable-row",t:13}],f:[{t:7,e:"td",m:[{n:"colspan",f:[{t:2,x:{r:["~/columns.length","~/allowSelect"],s:"_0+(_1?1:0)"}}],t:13}],f:[{t:16,r:"empty"}]}]}],n:50,x:{r:["~/rows.length"],s:"!_0"}},"\n  "]},"\n"]}},
          css: function(data) { return [(function(data) {



        return "\n\n  .rtable {\n\n    display: flex;\n\n    flex-direction: column;\n\n    overflow: auto;\n\n    max-width: 100%;\n\n    max-height: 100%;\n\n    box-sizing: border-box;\n\n    flex-grow: 2;\n\n  }\n\n\n\n  .rtable > div > table {\n\n    width: 100%;\n\n    border-collapse: collapse;\n\n    display: table;\n\n  }\n\n\n\n  .rtable-auto > div > table,\n\n  .rtable-fixed > div > table {\n\n    table-layout: fixed;\n\n  }\n\n\n\n  .rtable td {\n\n    padding: 0.5em;\n\n  }\n\n  .rtable-header > div > div,\n\n  .rtable-row > div > div {\n\n    padding: 0.5em;\n\n    overflow: inherit;\n\n    text-overflow: inherit;\n\n  }\n\n\n\n  .rtable-auto td,\n\n  .rtable-auto .row > *,\n\n  .rtable-fixed td,\n\n  .rtable-fixed .row > *\n\n  {\n\n    text-overflow: ellipsis;\n\n    overflow: hidden;\n\n    white-space: nowrap;\n\n  }\n\n\n\n  .rtable-header > div {\n\n    font-weight: bold;\n\n  }\n\n\n\n  .rtable-number-column {\n\n    text-align: right;\n\n  }\n\n  .rtable-date-column {\n\n    text-align: right;\n\n  }\n\n\n\n  .rtable-header {\n\n    border-bottom: 1px solid " + (data('table.divider') || data('table.fg') || data('fg1') || '#ddd') + ";\n\n    text-align: left;\n\n  }\n\n\n\n  .rtable-header > th {\n\n    padding: 0.3em 0.5em 1em 0.5em;\n\n  }\n\n\n\n  .rtable-sortable {\n\n    cursor: pointer;\n\n    user-select: none;\n\n  }\n\n\n\n  .rtable-row {\n\n    color: " + (data('table.fg') || data('fg1') || '#000') + ";\n\n    border-bottom: 1px solid " + (data('table.divider') || data('table.fg') || data('fg1') || '#ddd') + ";\n\n    background-color: " + (data('table.odd') || data('bg1') || '#f9f9f9') + ";\n\n    transition: 0.2s ease-in-out;\n\n    transition-property: background-color, color;\n\n  }\n\n  .rtable-row:nth-child(even) {\n\n    background-color: " + (data('table.even') || data('bga1') || '#fefefe') + ";\n\n  }\n\n  .rtable-row:last-of-type {\n\n    border-bottom: none;\n\n  }\n\n  .rtable-row:hover {\n\n    background-color: " + (data('table.over') || '#eee') + ";\n\n  }\n\n\n\n  .rtable-row.rtable-selected {\n\n    background-color: " + (data('table.selected.bg') || data('bg2') || 'rgba(0, 119, 238, 0.35)') + ";\n\n    color: " + (data('table.selected.fg') || data('fg2') || '#000') + ";\n\n  }\n\n  .rtable-row.rtable-selected:nth-child(even) {\n\n    background-color: " + (data('table.selected.even') || data('bga2') || 'rgba(0, 119, 238, 0.3)') + ";\n\n  }\n\n\n\n  .rtable-top {\n\n    flex-grow: 5;\n\n    flex-shrink: 1;\n\n    overflow-y: auto;\n\n    margin: 0.5em 0;\n\n  }\n\n\n\n  .rtable-bottom {\n\n    display: flex;\n\n    flex-wrap: wrap;\n\n    flex-shrink: 0;\n\n    padding: 0 0.5em 0.5em 0.5em;\n\n    justify-content: space-between;\n\n  }\n\n\n\n  .rtable-bottom > * {\n\n    padding: 0.5em;\n\n  }\n\n\n\n  .rtable-pages span {\n\n    margin: 0.3em;\n\n    cursor: pointer;\n\n    user-select: none;\n\n  }\n\n  .rtable-pages span:first-of-type {\n\n    margin-left: 0;\n\n  }\n\n  .rtable-pages input {\n\n    text-align: center;\n\n    width: 2.5em;\n\n    font-size: 1em;\n\n    background-color: transparent;\n\n    border: none;\n\n    padding: 0;\n\n    font-weight: bold;\n\n    text-decoration: underline;\n\n  }\n\n\n\n  .rtable-select {\n\n    width: 0;\n\n    outline: none;\n\n    margin-left: -1em;\n\n  }\n\n  .rtable-select:before {\n\n    content: '';\n\n    display: block;\n\n    border: 2px solid " + (data('table.fg') || data('fg1') || '#222') + ";\n\n    width: 1em;\n\n    height: 1em;\n\n    box-sizing: border-box;\n\n    transition: 0.2s ease-in-out;\n\n    transition-property: transform, border-color, height, width;\n\n  }\n\n  .rtable-select:checked:before {\n\n    height: 0.7em;\n\n    width: 1.3em;\n\n    border-color: " + (data('table.selected.fg') || data('fg2') || '#000') + ";\n\n    border-top-color: transparent;\n\n    border-right-color: transparent;\n\n    transform: rotate(-50deg);\n\n  }\n\n  .row > .rtable-select-header,\n\n  .row > .rtable-select-row {\n\n    text-align: center;\n\n    width: 2.5em;\n\n  }\n\n  .rtable-select-header .rtable-select:checked:before {\n\n    border-color: " + (data('table.fg') || data('fg1') || '#222') + ";\n\n    border-top-color: transparent;\n\n    border-right-color: transparent;\n\n  }\n\n  " + (data('table.includeGrid') !== false ? style(data) : '');


      }).call(this, data)].join(' '); },
          cssId: 'rtable',
          noCssTransform: true,
          attributes: [ 'paginate', 'items', 'filter', 'sort', 'helpers', 'fixed', 'display', 'allowSelect', 'allowSelectAll' ],
          components: {
            table: false,
            Table: false
          },
          syncComputedChildren: true,
          decorators: { grid: grid },
          events: {},
          use: [click({ name: 'clickd', count: 1 }), click({ name: 'dblclickd', count: 2 }), expand()],
          on: {
            construct: construct,
            config: function config() {
              if (this._items) { this.set(this._items); }
              if (this._table_row) { this.partials['table-row'] = this._table_row; }
              if (this._table_head) { this.partials['table-head'] = this._table_head; }
              if (this._grid_row) { this.partials['grid-row'] = this._grid_row; }
              if (this._grid_head) { this.partials['grid-head'] = this._grid_head; }
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
            },
            selectAllAll: function selectAllAll() {
              var item = null;
              var sel = this.get('rows').slice();
              this.set({
                selections: sel,
                selected: item
              });
              this.fire('selection', {}, { item: item, items: sel });
              return false;
            }
          },
          observe: {
            paginate: {
              handler: function handler(v) {
                var this$1 = this;

                if (v === 'auto' || v instanceof Ractive$1) {
                  if (this._autoObserver) { this._autoObserver.cancel(); } // may be changing instances

                  var root = v === 'auto' ? this.root : v;

                  var fn = function () {
                    if (!this$1.fragment.rendered) { return; }
                    var top = this$1.find('.rtable-top');
                    if (!top) { return; }
                    if (!this$1.get('items.length')) {
                      if (!this$1._autoLenObserver) {
                        this$1._autoLenObserver = this$1.observeOnce('items', function () {
                          this$1._autoLenObserver = 0;
                          setTimeout(fn);
                        });
                      }
                      return;
                    }

                    var size = (top.clientHeight) + "," + (top.clientWidth);
                    if (fn.last === size) { return; }

                    var header = this$1.find('.rtable-header');
                    if (!header) { return; }

                    var rows = Array.apply(null, this$1.findAll('.rtable-row')).map(function (r) { return r.offsetHeight; });
                    if (rows.length < 2) {
                      this$1.set('_paginate', Math.floor(top.clientHeight / header.offsetHeight));
                      rows = Array.apply(null, this$1.findAll('.rtable-row')).map(function (r) { return r.offsetHeight; });
                    }
                    var avg = Math.ceil(rows.reduce(function (a, c) { return a + c; }, 0) / rows.length);

                    this$1.set('_paginate', Math.floor((top.clientHeight - header.offsetHeight) / avg));

                    fn.last = size;
                  };

                  var tm;
                  var fnd = function () {
                    if (tm) { clearTimeout(tm); }
                    tm = setTimeout(function () {
                      fn();
                      tm = null;
                    }, 300);
                  };

                  this._autoObserver = root.on('*.resize', fnd);
                  this._autoObserver.fire = fnd;
                } else if (this._autoObserver) {
                  this._autoObserver.cancel();
                }
              },
              defer: true
            }
          },
          data: function data() {
            return {
              display: 'grid',
              page: 0,
              selections: [],
              allowSelect: true,
              allowSelectAll: true,
              expanded: null
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
                var items = this.get('items') || empty;
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
        var cell = /^[a-z]{1,3}[0-9]+(?:-[0-9]+)?$/;
        var empty = [];
        function construct() {
          // TODO: editable, selection, etc
          var cmp = this.component;
          if ( !cmp ) { return; }

          var rowEl;

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
              var attrs = e.m || empty;
              col.index = columns.length;
              columns.push(col);

              col.content = (e.f || []).filter(function (e) { return e.e !== 'edit'; });

              col.label = attrs.find(function (a) { return a.n === 'label'; });
              if (col.label && col.label.f) { col.label = map(col.label); }
              if (!col.label) { col.label = ''; }
              if (!Array.isArray(col.label)) { col.label = [col.label]; }

              col.type = attrs.find(function (a) { return a.n === 'type'; });
              if (col.type && col.type.f) { col.type = col.type.f; }
              if (!col.type) { col.type = 'string'; }

              col.filter = attrs.find(function (a) { return a.n === 'filter'; });
              if (col.filter && col.filter.f) {
                col.filter = map(col.filter);
                if (col.filter.r) { col.filter = col.filter.r; }
              }

              col.sort = attrs.find(function (a) { return a.n === 'sort'; });
              if (col.sort && col.sort.f) {
                col.sort = map(col.sort);
                if (col.sort.r) { col.sort = col.sort.r; }
              }

              col.hidden = attrs.find(function (a) { return a.n === 'hidden'; });
              if (col.hidden && col.hidden.f === 0) { col.hidden = true; }
              else if (col.hidden && typeof col.hidden.f === 'object') { col.hidden = map(col.hidden); }
              else { col.hidden = false; }
              if (typeof col.hidden === 'string') { col.hidden = false; }

              col.attrs = attrs.filter(function (a) { return !~colAttrs.indexOf(a.n); });

              // handle inline grid sizes without requiring the class prefix
              col.attrs.forEach(function (a, i) {
                if (cell.test(a.n)) {
                  col.attrs[i] = { t: 13, n: ("class-" + (a.n)) };
                }
              });
            } else if (e.e === 'row') {
              rowEl = e;
            }
          });

          this._items = { columns: columns };

          var sortKey = '[_0._setSort(_1,_2)]';
          
          // table
          {
            var header = [{ t: 7, e: 'tr', m: [{ t: 13, n: 'class-rtable-header' }], f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
              var th = { t: 7, e: 'th', f: c.label, m: [{ t: 13, n: 'class-rtable-header' }, { t: 4, n: 53, r: ("~/columns." + (c.index)), f: [{ t: 70, n: ['click'], f: { r: ['@this', '.index', '@event'], s: sortKey } }] }].concat(c.attrs) };
              if (c.type) { th.m.push({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
              if (c.filter || c.sort) { th.m.push({ t: 13, n: 'class-rtable-sortable' }); }
              var res = th;

              if (c.hidden && c.hidden.r) {
                res = { t: 4, n: 51, r: c.hidden.r, f: [th] };
              }

              return res;
            }) }];

            // selectall
            header[0].f.unshift({
              t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'th', m: [{ t: 13, n: 'class-rtable-select-header' }, { t: 13, n: 'title', f: [{ t: 2, r: 'selections.length' }, ' items selected']}], f: [{ t: 4, n: 50, r: '~/allowSelectAll', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this'], s: '_0.allSelected()' } }] }, { t: 70, n: ['click'], f: 'selectAll' }, { t: 13, n: 'class-rtable-select' }] }] }] }]
            });

            var row = [{ t: 7, e: 'tr', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
              var td = { t: 7, e: 'td', f: c.content, m: c.attrs };
              if (c.type) { td.m.unshift({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
              if (!td.m.find(function (a) { return a.n === 'title'; })) { td.m.unshift({ t: 13, n: 'title', f: c.content }); }
              var res = td;

              if (c.hidden && c.hidden.r) {
                res = { t: 4, n: 51, r: c.hidden.r, f: [td] };
              }

              return res;
            }), m: [
              { t: 13, n: 'class-rtable-row' },
              { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] },
              { t: 70, n: ['click'], f: { r: ['~/rows', '~/visibleRows', '.'], s: "[['selected',_2,_0.indexOf(_2),_1.indexOf(_2)]]" } }
            ].concat((rowEl && rowEl.m) || empty)}];

            // select
            row[0].f.unshift({
              t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'th', m: [{ t: 13, n: 'class-rtable-select-row' }, { t: 70, n: ['click'], f: { r: ['@this', '.', '@event'], s: '[_0._select(_1,_2),false]' } }], f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }, { t: 13, n: 'class-rtable-select' }] }] }]
            });

            this._table_row = row;
            this._table_head = header;
          }

          // grid
          {
            var header$1 = [{ t: 7, e: 'div', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
              var div = { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: c.label }], m: [{ t: 4, n: 53, r: ("~/columns." + (c.index)), f: [{ t: 70, n: ['click'], f: { r: ['@this', '.index', '@event'], s: sortKey } }] }, { t: 13, n: 'title', f: c.label }].concat(c.attrs.filter(function (a) { return a.n !== 'title'; })) };
              if (c.type) { div.m.push({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
              if (c.filter || c.sort) { div.m.push({ t: 13, n: 'class-rtable-sortable' }); }
              var res = div;

              if (c.hidden && c.hidden.r) {
                res = { t: 4, n: 51, r: c.hidden.r, f: [div] };
              }

              return res;
            }), 
            m: [
              { t: 13, n: 'class-row' }, { t: 13, n: 'class-rtable-header' }
            ] }];

            // selectall
            header$1[0].f.unshift({
              t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-header' }, { t: 13, n: 'title', f: [{ t: 2, r: 'selections.length' }, ' items selected']}], f: [{ t: 7, e: 'div', f: [{ t: 4, n: 50, r: '~/allowSelectAll', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this'], s: '_0.allSelected()' } }] }, { t: 70, n: ['click'], f: 'selectAll' }, { t: 13, n: 'class-rtable-select' }] }] }] }] }]
            });

            var row$1 = [{ t: 7, e: 'div', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
              var div = { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: c.content }], m: c.attrs };
              if (c.type) { div.m.unshift({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
              if (!div.m.find(function (a) { return a.n === 'title'; })) { div.m.unshift({ t: 13, n: 'title', f: c.content }); }
              var res = div;

              if (c.hidden && c.hidden.r) {
                res = { t: 4, n: 51, r: c.hidden.r, f: [div] };
              }

              return res;
            }), m: [
              { t: 13, n: 'class-row' }, { t: 13, n: 'class-rtable-row' },
              { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] },
              { t: 70, n: (rowEl && rowEl.f ? ['dblclickd'] : ['click', 'dblclick']), f: { r: ['~/rows', '~/visibleRows', '.'], s: "[['selected',_2,_0.indexOf(_2),_1.indexOf(_2)]]" } }
            ].concat((rowEl && rowEl.m) || empty) }];

            // select
            row$1[0].f.unshift({
              t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-row' }, { t: 70, n: ['clickd'], f: { r: ['@this', '.', '@event'], s: '[_0._select(_1,_2),false]' } }], f: [{ t: 7, e: 'div', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }, { t: 13, n: 'class-rtable-select' }] }] }] }]
            });

            // expando rows
            if (rowEl && rowEl.f) {
              row$1[0].f.push({ t: 4, n: 50, x: { r: ['.', '~/expanded'], s: '_0===_1' }, f: [
                { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: rowEl.f }], m: [{ t: 13, n: 'class-t1' }, { t: 13, n: 'class-rtable-row-expand' }, { t: 72, n: 'expand', v: 't0' }] }
              ] });
              row$1[0].m.push({ t: 70, n: ['clickd'], f: { r: ['@this', '@index'], s: '[_0._expand(_1)]' } });
            }

            this._grid_row = row$1;
            this._grid_head = header$1;
          }
        }

        function plugin(opts) {
          if ( opts === void 0 ) opts = {};

          return function(ref) {
            var Ractive = ref.Ractive;
            var instance = ref.instance;

            if ('includeGrid' in opts) { Ractive.styleSet('table.inclideGrid', opts.includeGrid); }
            instance.components[opts.name || 'data-table'] = Table;
          }
        }

        globalRegister('RMTable', 'components', Table);

      var data = [];
        var src = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var loop = function ( i ) {
          var d = {};
          data.push(d);
          ['foo', 'bar'].forEach(function (prop) {
            var len = Math.ceil(Math.random() * 20);
            var str = '';
            for (var c = 0; c < len; c++) {
              str += src[Math.ceil(Math.random() * (src.length - 1))];
            }
            d[prop] = str;
          });
          d.bat = Math.random() > 0.5;
        };

        for (var i = 0; i < 500; i++) loop( i );

        var Table_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"fill",f:0,t:13},{n:"transition",f:"fade",t:13},{n:"class-secondary",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    The RaUI table.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"div",f:["\n      ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Filter",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"filter"}],t:13},{t:73,v:"l",f:"300"}]}]},"\n    "]},"\n    ",{t:7,e:"data-table",m:[{n:"items",t:13,f:[{t:2,r:"items"}]},{n:"filter",t:13,f:[{t:2,r:"filter"}]},{n:"paginate",f:"auto",t:13},{n:["selected"],t:70,f:{r:["$1"],s:"[console.log(_0)]"}}],f:["\n      ",{t:7,e:"row",m:[{n:"fade",t:72,v:"t0"}],f:["\n        ",{t:7,e:"h3",f:["Extra stuff goes here"]},"\n        ",{t:7,e:"p",f:["I have a ",{t:2,r:".foo"}," that is ",{t:2,r:".bar"},"."]},"\n      "]},"\n      ",{t:7,e:"column",m:[{n:"t7-8",f:0,t:13},{n:"s3-8",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"Foo",t:13},{n:"filter",f:"foo",t:13}],f:[{t:2,r:".foo"}]},"\n      ",{t:7,e:"column",m:[{n:"t0",f:0,t:13},{n:"s3-8",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"Bar",t:13},{n:"filter",f:"bar",t:13}],f:[{t:2,r:".bar"}]},"\n      ",{t:7,e:"column",m:[{n:"t0",f:0,t:13},{n:"m1-5",f:0,t:13},{n:"label",f:"???",t:13}],f:[{t:2,x:{r:[".bat"],s:"_0?\"Yep\":\"Nope\""}}]},"\n    "]},"\n  "]},"\n"]}],e:{"[console.log(_0)]":function (_0){return([console.log(_0)]);},"_0?\"Yep\":\"Nope\"":function (_0){return(_0?"Yep":"Nope");}}},
          use: [plugin({ includeGrid: true })],
          options: {
            title: 'Component :: Table',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          },
          data: function data$1() {
            return { items: data, filter: '' };
          }
        }));

    }
  };
});
