System.register(['ractive', './chunk7.js', './chunk8.js', './chunk2.js', './chunk12.js'], function (exports, module) {
  'use strict';
  var Ractive$1, grid, style, click, expand, globalRegister, Window, split;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      grid = module.grid;
      style = module.style;
    }, function (module) {
      click = module.default;
    }, function (module) {
      expand = module.default$1;
      globalRegister = module.default;
      Window = module.Window;
    }, function (module) {
      split = module.default;
    }],
    execute: function () {

      var sortRE = /^([-+])?([^\s]+)$/;

      function isString(v) { return typeof v === 'string'; }
      function isNumber(v) { return typeof v === 'number'; }
      function isObject(v) { return typeof v === 'object'; }

      var Table = (function (Ractive) {
        function Table(opts) { Ractive.call(this, opts); }

        if ( Ractive ) Table.__proto__ = Ractive;
        Table.prototype = Object.create( Ractive && Ractive.prototype );
        Table.prototype.constructor = Table;

        Table.prototype.allSelected = function allSelected () {
          var sel = this.get('selections');
          var visible = this.get('paginate') === 'virtual' ? this.get('rows') : this.get('visibleRows');

          for (var i = 0; i < visible.length; i++) {
            if (!~sel.indexOf(visible[i])) { return false; }
          }

          return visible.length && true;
        };

        Table.prototype.nodeSet = function nodeSet (node, prop, value) { node[prop] = value; };

        Table.prototype._expand = function _expand (idx) {
          var this$1 = this;

          var which = this.get('visibleRows')[idx];
          var current = this.get('expanded');
          var expanded = this.find('.rtable-row-expand');
          if (expanded) {
            this.transition('expand', expanded, { outro: true }).then(function () {
              if (current === which) { this$1.set('expanded', null); }
              else {
                this$1.set('expanded', which);
                this$1.transition('expand', this$1.find('.rtable-row-expand'), { intro: true });
              }
            });
          } else {
            if (which === current) { this.set('expanded', null); }
            else {
              this.set('expanded', which);
              this.transition('expand', this.find('.rtable-row-expand'), { intro: true });
            }
          }
        };

        Table.prototype._setSort = function _setSort (idx, ev) {
          var col = this.get(("columns." + idx));
          if (!col || !(col.sort || col.filter)) { return; }
          var sort = col.sort || col.filter;
          if (isString(sort) && sort[0] === '~') { sort = this.get(sort); }

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

        Table.prototype._selectGroup = function _selectGroup (idx) {
          var this$1 = this;

          var grp = idx;
          if (this.get('page')) {
            grp += this.get('page') * this.get('pagination.per');
          }
          var rows = this.get('rows');
          var groups = this.get('groups');
          var sels = this.get('selections');
          var x = rows[grp++];
          var xs = ['selections'];
          var ss = [];
          var i;
          if (!~(i = sels.indexOf(x))) { xs.push(x); }
          else { ss.push(i); }

          while (grp < rows.length && !(grp in groups)) {
            x = rows[grp++];
            if (!~(i = sels.indexOf(x))) { xs.push(x); }
            else { ss.push(i); }
          }

          // select or unselect the things
          if (xs.length === 1) {
            i = ss.length;
            while (i--) {
              this$1.splice('selections', ss[i], 1);
            }
          } else {
            this.push.apply(this, xs);
          }
        };

        Table.prototype._groupSelected = function _groupSelected (idx) {
          var grp = idx;
          if (this.get('page')) {
            grp += this.get('page') * this.get('pagination.per');
          }
          var rows = this.get('rows');
          var groups = this.get('groups');
          var sels = this.get('selections');
          if (!~sels.indexOf(rows[grp++])) { return false; }

          while (grp < rows.length && !(grp in groups)) {
            if (!~sels.indexOf(rows[grp++])) { return false; }
          }

          return true;
        };

        return Table;
      }(Ractive$1));

      function columnGetter(table, col) {
        if (!table || !col) { return; }
        var getters = table._getters || (table._getters = {});
        var v = col.filter;
        if (isString(v) && v.indexOf('~/') === 0) { v = table.get(v); }
        var k = Array.isArray(v) ? v.join('.') : isString(v) ? v : false;
        if (!k) { return; }

        if (!getters[k]) {
          if (isString(v)) { v = Ractive$1.splitKeypath(v); }
          getters[k] = function (obj) { return applyPath(obj, v); };
        }

        return getters[k];
      }

      function fieldGetter(table, field) {
        if (!table || !field) { return; }
        var getters = table._getters || (table._getters = {});
        var v = field.path;
        if (isString(v) && v.indexOf('~/') === 0) { v = table.get(v); }
        var k = Array.isArray(v) ? v.join('.') : isString(v) ? v : false;

        if (k) {
          if (!getters[k]) {
            if (isString(v)) { v = Ractive$1.splitKeypath(v); }
            getters[k] = function (obj) { return applyPath(obj, v); };
          }
          return getters[k];
        } else {
          v = field.value;
          if (isString(v) && v.indexOf('~/') === 0) { v = table.get(v); }
          if (typeof v === 'function') { return v; }
        }
      }

      Ractive$1.extendWith(Table, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable",g:1},{n:"class-rtable-virtual",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"virtual\""}}]},{n:"class-rtable-auto",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"auto\""}}]},{n:"class-rtable-fixed",t:13,f:[{t:2,r:"~/fixed"}]},{n:"class-rtable-border",t:13,f:[{t:2,r:"~/border"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-top",g:1},{t:4,f:[{n:["scroll"],t:70,f:"scroll"}],n:50,x:{r:["~/paginate"],s:"_0===\"virtual\""}}],f:[{t:4,f:[{t:8,r:"grid"}],n:50,x:{r:["~/display"],s:"_0===\"grid\""}},{t:4,f:[{t:8,r:"table"}],n:51,l:1}]}," ",{t:4,f:[{t:8,r:"pagination"}],n:50,x:{r:["~/paginate"],s:"_0!==\"virtual\""}}]}],e:{"_0===\"virtual\"":function (_0){return(_0==="virtual");},"_0===\"auto\"":function (_0){return(_0==="auto");},"_0===\"grid\"":function (_0){return(_0==="grid");},"_0!==\"virtual\"":function (_0){return(_0!=="virtual");},"[_0._setSort(_1,_2)]":function (_0,_1,_2){return([_0._setSort(_1,_2)]);},"[_0._select(_1,_2),false]":function (_0,_1,_2){return([_0._select(_1,_2),false]);},"[[\"select\",_2,_0.indexOf(_2),_1.indexOf(_2)]]":function (_0,_1,_2){return([["select",_2,_0.indexOf(_2),_1.indexOf(_2)]]);},"[_0._expand(_1)]":function (_0,_1){return([_0._expand(_1)]);},"_0.indexOf(_1)":function (_0,_1){return(_0.indexOf(_1));},"_0===_1":function (_0,_1){return(_0===_1);},"_0>0":function (_0){return(_0>0);},"_0*_1+1":function (_0,_1){return(_0*_1+1);},"_2+1===_0?_1:(_2+1)*_3":function (_0,_1,_2,_3){return(_2+1===_0?_1:(_2+1)*_3);},"_0&&_1":function (_0,_1){return(_0&&_1);},"_0===1":function (_0){return(_0===1);},"_0.allSelected()&&_1<_2":function (_0,_1,_2){return(_0.allSelected()&&_1<_2);},"[_0.set(\"page\",_1-1)]":function (_0,_1){return([_0.set("page",_1-1)]);},"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]":function (_0,_1,_2,_3,_4){return([(/^\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set("page",+_1-1))||_2.nodeSet(_3,"value",_4+1)]);},"_0==_1+1":function (_0,_1){return(_0==_1+1);},"[_0.set(\"page\",_2[_1-1])]":function (_0,_1,_2){return([_0.set("page",_2[_1-1])]);},"_0===\"...\"":function (_0){return(_0==="...");},"[_0.set(\"page\",_1+1)]":function (_0,_1){return([_0.set("page",_1+1)]);},"_0<_1-1":function (_0,_1){return(_0<_1-1);},"_0%2===1":function (_0){return(_0%2===1);},"true":function (){return(true);},"!_0":function (_0){return(!_0);},"_0+(_1?1:0)":function (_0,_1){return(_0+(_1?1:0));}},p:{"csp-dummy":[{t:7,e:"div",m:[{n:["click"],t:70,f:{r:["@this",".index","@event"],s:"[_0._setSort(_1,_2)]"}},{n:["click"],t:70,f:{r:["@this",".","@event"],s:"[_0._select(_1,_2),false]"}},{n:["click"],t:70,f:{r:["~/rows","~/visibleRows","."],s:"[[\"select\",_2,_0.indexOf(_2),_1.indexOf(_2)]]"}},{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0._expand(_1)]"}}]}," ",{t:4,f:["..."],n:50,x:{r:["~/selections","."],s:"_0.indexOf(_1)"}}," ",{t:4,f:["..."],n:50,x:{r:[".","~/expanded"],s:"_0===_1"}}," ",{t:4,f:["..."],n:50,x:{r:["~/virtual.offset"],s:"_0>0"}}],empty:[{t:7,e:"div",f:[{t:7,e:"div",f:["No data."]}]}],pagination:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-bottom",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-info",g:1}],f:[{t:4,f:[{t:2,x:{r:["~/page","~/pagination.per"],s:"_0*_1+1"}}," - ",{t:2,x:{r:["~/pagination.total","~/rows.length","~/page","~/pagination.per"],s:"_2+1===_0?_1:(_2+1)*_3"}}," of ",{t:2,r:"~/rows.length"},{t:4,f:[" (",{t:2,r:"~/items.length"}," total)"],n:50,r:"~/isFiltered"}],n:50,x:{r:["pagination","rows.length"],s:"_0&&_1"}}," ",{t:4,f:["​"],n:50,x:{r:["_paginate"],s:"_0===1"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-select-all-all",g:1}],f:[{t:4,f:[{t:2,r:"selections.length"}," of ",{t:2,r:"rows.length"}," selected",{t:4,f:[" - ",{t:7,e:"a",m:[{n:"href",f:"#",t:13,g:1},{n:["click"],t:70,f:"selectAllAll"}],f:["Select All"]}],n:50,x:{r:["@this","selections.length","rows.length"],s:"_0.allSelected()&&_1<_2"}}],n:50,x:{r:["selections.length"],s:"_0>0"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-pages",g:1}],f:[{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1-1)]"}}],f:["Previous"]}],n:50,x:{r:["~/page"],s:"_0>0"}}," ",{t:4,f:[{t:4,f:[{t:7,e:"input",m:[{n:["change"],t:70,f:{r:["~/pagination.total","@node.value","@this","@node","~/page"],s:"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]"}},{n:"value",f:[{t:2,r:"."}],t:13},{t:73,v:"t",f:"false"}]}],n:50,x:{r:[".","~/page"],s:"_0==_1+1"}},{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","@index","../"],s:"[_0.set(\"page\",_2[_1-1])]"}}],f:["..."]}],n:50,x:{r:["."],s:"_0===\"...\""},l:1},{t:4,f:[" ",{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","."],s:"[_0.set(\"page\",_1-1)]"}}],f:[{t:2,r:"."}]}],n:51,l:1}],n:52,r:"~/pagination.array"}," ",{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1+1)]"}}],f:["Next"]}],n:50,x:{r:["~/page","~/pagination.total"],s:"_0<_1-1"}}]}]}],grid:[{t:7,e:"div",m:[{t:16,r:"extra-attributes"},{n:"grid",t:71},{t:4,f:[{n:"style-margin-top",f:[{t:2,r:"~/virtual.above"},"px"],t:13},{n:"style-margin-bottom",f:[{t:2,r:"~/virtual.below"},"px"],t:13}],n:50,x:{r:["~/paginate"],s:"_0===\"virtual\""}}],f:[{t:8,r:"grid-head"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"style",f:"display: none;",g:1},{t:13,n:"class",f:"rtable-row-wrap",g:1}]}],n:50,x:{r:["~/virtual.offset"],s:"_0%2===1"}}," ",{t:4,f:[{t:8,r:"grid-row"}],n:52,z:[{n:"source",x:{r:"~/items"}},{n:"shuffle",x:{x:{r:[],s:"true"}}}],r:"~/visibleRows"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-row row t1",g:1}],f:[{t:16,r:"empty"}]}],n:50,x:{r:["~/rows.length"],s:"!_0"}}]}],table:[{t:7,e:"table",m:[{t:16,r:"extra-attributes"},{t:4,f:[{n:"style-margin-top",f:[{t:2,r:"~/virtual.above"},"px"],t:13},{n:"style-margin-bottom",f:[{t:2,r:"~/virtual.below"},"px"],t:13}],n:50,x:{r:["~/paginate"],s:"_0===\"virtual\""}}],f:[{t:8,r:"table-head"}," ",{t:4,f:[{t:8,r:"table-row"}],n:52,z:[{n:"source",x:{r:"~/items"}},{n:"shuffle",x:{x:{r:[],s:"true"}}}],r:"~/visibleRows"}," ",{t:4,f:[{t:7,e:"tr",m:[{t:13,n:"class",f:"rtable-row",g:1}],f:[{t:7,e:"td",m:[{n:"colspan",f:[{t:2,x:{r:["~/columns.length","~/allowSelect"],s:"_0+(_1?1:0)"}}],t:13}],f:[{t:16,r:"empty"}]}]}],n:50,x:{r:["~/rows.length"],s:"!_0"}}]}]}},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data("raui.primary"), data("raui.table.primary"));
         var active = Object.assign({}, primary, data('raui.primary.active'), data('raui.table.primary.active'));
         var table = Object.assign({ selected: {} }, data('raui.table'));
         return "\n   .rtable {\n     display: flex;\n     flex-direction: column;\n     overflow: auto;\n     max-width: 100%;\n     max-height: 100%;\n     box-sizing: border-box;\n     flex-grow: 2;\n   }\n \n   .rtable > div > table {\n     width: 100%;\n     border-collapse: collapse;\n     display: table;\n   }\n \n   .rtable-auto > div > table,\n   .rtable-fixed > div > table {\n     table-layout: fixed;\n   }\n \n   .rtable td {\n     padding: 0.5em;\n   }\n   .rtable-group > div > div,\n   .rtable-header > div > div,\n   .rtable-row > div > div {\n     padding: 0.5em;\n     overflow: inherit;\n     text-overflow: inherit;\n     line-height: 1em;\n   }\n   .rtable-row > .rtable-no-pad > div {\n     padding: 0;\n   }\n \n   .rtable-auto td,\n   .rtable-auto .row > *,\n   .rtable-fixed td,\n   .rtable-fixed .row > *\n   {\n     text-overflow: ellipsis;\n     overflow: hidden;\n     white-space: nowrap;\n   }\n \n   .rtable-header > div > div, .rtable-column {\n     overflow: hidden;\n   }\n \n   .rtable-number-column {\n     text-align: right;\n   }\n   .rtable-date-column {\n     text-align: right;\n   }\n \n   .rtable-sortable {\n     cursor: pointer;\n     user-select: none;\n     -moz-user-select: none;\n     -ms-user-select: none;\n     -webkit-user-select: none;\n   }\n \n   .grid .row.rtable-row, .grid .rtable-header > .row {\n     width: auto;\n     width: min-content;\n     flex-grow: 1;\n   }\n \n   .rtable-row-wrap {\n     color: " + (primary.fg || '#222') + ";\n     border-bottom: 1px solid " + (table.divider || primary.bc || '#ccc') + ";\n     background-color: " + (table.even || primary.bga || '#f4f4f4') + ";\n     transition: 0.2s ease-in-out;\n     transition-property: background-color, color;\n   }\n   .rtable-row-wrap:nth-child(odd) {\n     background-color: " + (table.odd || primary.bg || '#fff') + ";\n   }\n   .rtable-row-wrap:last-of-type {\n     border-bottom: none;\n   }\n   .rtable-row-wrap:hover, .rtable-row-wrap.rtable-selected:hover {\n     background-color: " + (table.over || active.bg || 'rgba(0, 119, 238, 0.25)') + ";\n   }\n \n   .rtable-row-wrap.rtable-selected {\n     background-color: " + (table.selected.bg || 'rgba(0, 119, 238, 0.12)') + ";\n     color: " + (table.selected.fg || primary.fg || '#222') + ";\n   }\n   .rtable-row-wrap.rtable-selected:nth-child(odd) {\n     background-color: " + (table.selected.odd || 'rgba(0, 119, 238, 0.1)') + ";\n   }\n \n   .rtable-row-wrap {\n     display: flex;\n     flex-wrap: wrap;\n     flex-grow: 1;\n     align-items: center;\n   }\n \n   .rtable-border .rtable-row-wrap .rtable-column:nth-child(n+2),\n   .rtable-border .rtable-group .rtable-column:nth-child(n+2) {\n     border-left: 1px solid " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-border .rtable-row-expand {\n     border-top: 1px solid " + (table.divider || primary.bc || '#ccc') + ";\n     width: 100%;\n   }\n \n   .rtable-group {\n     border-bottom: 2px solid " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-header.rtable-row-wrap, .rtable-header.rtable-row-wrap:hover {\n     font-weight: bold;\n     background-color: " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-header.rtable-row-wrap {\n     border-bottom: 2px solid " + (table.divider || primary.bc || '#ccc') + ";\n     text-align: left;\n   }\n \n   .rtable-header > th {\n     padding: 0.5em;\n   }\n \n   .rtable-top {\n     flex-grow: 5;\n     flex-shrink: 1;\n     overflow-y: auto;\n     margin: 0.5em 0;\n     position: relative;\n   }\n \n   .rtable-bottom {\n     display: flex;\n     flex-wrap: wrap;\n     flex-shrink: 0;\n     padding: 0 0.5em 0.5em 0.5em;\n     justify-content: space-between;\n     user-select: none;\n     -moz-user-select: none;\n     -ms-user-select: none;\n     -webkit-user-select: none;\n   }\n \n   .rtable-bottom > * {\n     padding: 0.5em;\n   }\n \n   .rtable-pages span {\n     margin: 0.3em;\n     cursor: pointer;\n   }\n   .rtable-pages span:first-of-type {\n     margin-left: 0;\n   }\n   .rtable-pages input {\n     text-align: center;\n     width: 2.5em;\n     font-size: 1em;\n     background-color: transparent;\n     border: none;\n     padding: 0;\n     font-weight: bold;\n     text-decoration: underline;\n   }\n \n   .rtable-select {\n     width: 0;\n     height: 0;\n     outline: none;\n     margin-left: -1em;\n   }\n   .rtable-select:before {\n     content: '';\n     display: block;\n     border: 2px solid " + (primary.fg || '#222') + ";\n     width: 1em;\n     height: 1em;\n     margin-left: 0.1em;\n     margin-top: -0.9em;\n     box-sizing: border-box;\n     transition: 0.2s ease-in-out;\n     transition-property: transform, border-color, height, width;\n   }\n   .rtable-select:checked:before {\n     height: 0.7em;\n     width: 1.3em;\n     border-color: " + (primary.fga || '#07e') + ";\n     border-top-color: transparent;\n     border-right-color: transparent;\n     transform: rotate(-50deg);\n   }\n   .rtable-row-wrap > .rtable-select-header,\n   .rtable-row-wrap > .rtable-select-row {\n     text-align: center;\n     width: 1.5em;\n   }\n   .rtable-select-header .rtable-select:before {\n     margin-top: -1em;\n   }\n   .rtable-select-header .rtable-select:checked:before {\n     border-color: " + (primary.fg || '#222') + ";\n     border-top-color: transparent;\n     border-right-color: transparent;\n   }\n \n   .rtable-column button, .rtable-column .btn {\n     padding: 0 0.5em;\n     margin: 0.2em 0.5em;\n     min-height: 0;\n   }\n   " + (data('table.includeGrid') !== false ? style(data) : '');
      }).call(this, data)].join(' '); },
        cssId: 'rtable',
        noCssTransform: true,
        attributes: [ 'paginate', 'items', 'filter', 'sort', 'helpers', 'fixed', 'display', 'allowSelect', 'allowSelectAll', 'border' ],
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
            this.set(this._init.sets);
            Object.assign(this.partials, this._init.partials);
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
              sel = (this.get('paginate') === 'virtual' ? this.get('rows') : this.get('visibleRows')).slice();
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

              if (v === 'auto' || v === 'virtual' || v instanceof Ractive$1) {
                if (this._autoObserver) { this._autoObserver.cancel(); } // may be changing instances
                if (this._scrollListener) { this._scrollListener.cancel(); }

                var root = v === 'auto' || v === 'virtual' ? this.root : v;

                var fn = function () {
                  if (!this$1.rendered) { return; }
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

                  var rows = Array.apply(null, this$1.findAll('.rtable-live')).map(function (r) { return r.offsetHeight; });
                  if (rows.length < 5) {
                    var auto = Math.floor(top.clientHeight / header.offsetHeight);
                    if (auto < 5) { auto = 5; }
                    this$1.set('_paginate', auto);
                    rows = Array.apply(null, this$1.findAll('.rtable-live')).map(function (r) { return r.offsetHeight; });
                  }
                  var avg = Math.ceil(rows.reduce(function (a, c) { return a + c; }, 0) / rows.length);
                  this$1._avgSize = avg;

                  var fit = Math.floor((top.clientHeight - header.offsetHeight) / avg);
                  if (v === 'virtual') {
                    fit = fit * 5;
                    if (fit < 50) { fit = 50; }
                  }
                  this$1.set('_paginate', fit);

                  fn.last = size;
                };

                var tm;
                var fnd = function () {
                  if (tm) { clearTimeout(tm); }
                  tm = setTimeout(function () {
                    fn();
                    tm = null;
                    if (this$1._scrollListener) { this$1._scrollListener.fn(); }
                  }, 300);
                };

                this._autoObserver = root.on('*.resize', fnd);
                this._autoObserver.fire = fnd;

                if (v === 'virtual') {
                  var ready = true;
                  var lock = false;
                  var raf = false;
                  var fn$1 = function () {
                    if (!this$1.rendered) { return; }
                    var node = this$1.find('.rtable-top');
                    if (!ready) {
                      ready = true;
                      return setTimeout(fn$1, 14);
                    }

                    if (!raf) {
                      raf = true;
                      return requestAnimationFrame(fn$1);
                    } else {
                      raf = false;
                      ready = false;

                      var top = node.scrollTop;
                      var virtual = this$1.get('virtual') || {};
                      var offset = virtual.offset;
                      var visible = this$1.get('_paginate');
                      var page = visible / 5;
                      var count = this$1.get('rows.length');
                      if (visible > count) { visible = count; }
                      var avg = this$1._avgSize;
                      var pageSize = page * avg;
                      var wnd = Math.floor(top / avg);
                      var first = wnd - page;
                      if (first < 0) { first = 0; }
                      var hardFirst = first;
                      if (first + visible > count) { first = count - visible; }
                      
                      // check to see if the rendered area is approaching an edge
                      if (!isNumber(offset) || isNaN(offset) || top < virtual.top + pageSize || top > virtual.bottom - pageSize - pageSize || offset > 0 && top < avg * page) {
                        var amtAbove = hardFirst;
                        var amtBelow = count - hardFirst - visible;
                        if (amtAbove < 0) {
                          amtBelow += amtAbove * -1;
                          amtAbove = 0;
                        } else if (amtAbove > count - visible) {
                          amtAbove = count - visible;
                        }
                        if (amtBelow < 0) { amtBelow = 0; }

                        var above = amtAbove * avg;
                        var below = amtBelow * avg;

                        var vis, next;
                        if (first < offset + visible && first > offset - visible) {
                          if (first > offset) { vis = this$1.findAll('.rtable-live')[first - offset]; }
                          else { vis = this$1.findAll('.rtable-live')[offset - first]; }
                        }

                        if (vis && first > 0) { next = vis.offsetTop; }

                        this$1.set({
                          'virtual.above': above,
                          'virtual.below': below,
                          'virtual.offset': first
                        });

                        if (typeof next === 'number') {
                          if (next !== vis.offsetTop) { this$1.set('virtual.above', above + Math.abs(next - vis.offsetTop)); }
                        }

                        this$1.set({
                          'virtual.top': this$1.get('virtual.above'),
                          'virtual.bottom': node.scrollHeight - below
                        });
                      }

                      lock = false;
                    }
                  };
                  var scroll = this._scrollListener = this.on('scroll', function (ref) {
                    var node = ref.node;

                    if (ready) { ready = false; }
                    else if (!lock) {
                      ready = true;
                      lock = true;
                      setTimeout(fn$1, 15);
                    }
                  });
                  this._scrollListener.fn = fn$1;

                  scroll.observer = this.observe('rows.length', function () {
                    this$1.set('virtual.offset', null);
                    fn$1();
                  }, { init: false, strict: true });

                  var cancel = scroll.cancel;
                  scroll.cancel = function () {
                    cancel();
                    scroll.observer.cancel();
                  };
                }

                fnd();
              } else {
                if (this._autoObserver) { this._autoObserver.cancel(); }
                if (this._scrollListener) { this._scrollListener.cancel(); }
              }

              if (isNumber(v)) {
                this.set('_paginate', v);
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
            showGroups: true,
            allowGroupSelect: true,
            expanded: null,
            minPerPage: 10
          }
        },
        computed: {
          rows: {
            get: function get() {
              var this$1 = this;

              var columns = this.viewmodel.value.columns;
              var fields = this.viewmodel.value.fields;

              var cols = columns.filter(function (c) { return c.filter; }).map(function (c) { return columnGetter(this$1, c); }).filter(function (c) { return c; });

              var list = this.get('items') || [];
              var src = list;

              var filter = this.get('filter');
              var sort = this.get('sort');

              if (isObject(filter) && !Array.isArray(filter)) { filter = [filter]; }

              if (filter instanceof RegExp || isString(filter)) {
                var nocase = filter === '' + filter.toLowerCase() || filter === '' + filter.toUpperCase();
                var re = isString(filter) ? new RegExp(filter, nocase ? 'i' : '') : filter;
                list = list.filter(function (l) {
                  var i = cols.length;
                  while (i--) {
                    var v = l && cols[i](l);
                    if (v && isString(v) && re.test(v)) { return true; }
                  }
                });
              } else if (Array.isArray(filter)) {
                var flts = filter.map(function (f) {
                  var flt = { op: f.op || '=', value: f.value || '' };
                  if (f.id) {
                    var field = columns.find(function (c) { return c.id === f.id; });
                    if (field) {
                      flt.get = columnGetter(this$1, field);
                      if (flt.get) {
                        flt.type = field.type || 'string';
                      } else { field = 0; }
                    }
                    
                    if (!field) {
                      field = fields.find(function (c) { return c.id === f.id; });
                      if (field) {
                        flt.get = fieldGetter(this$1, field);
                        flt.type = field.type || 'string';
                      }
                    }
                  }
                  return flt;
                });

                var recache = {};
                list = list.filter(function (l) {
                  return flts.reduce(function (ok, flt) {
                    if (!ok || !flt.get || !l) { return false; }
                    var v = flt.get(l);
                    if (flt.op === '=' || flt.op === '==') {
                      if (flt.type === 'number' || flt.type === 'date') { return +v == +flt.value; }
                      return v == flt.value;
                    } else if (flt.op === '>') {
                      return v > flt.value;
                    } else if (flt.op === '>=') {
                      return v >= flt.value;
                    } else if (flt.op === '<') {
                      return v < flt.value;
                    } else if (flt.op === '<=') {
                      return v <= flt.value;
                    } else if (flt.op === 'like' || flt.op === 'notlike') {
                      var res = flt.op === 'like' ? true : false;
                      if (isString(flt.value)) {
                        var re = recache[flt.value] || (recache[flt.value] = new RegExp((".*" + (flt.value.replace(/\s+/g, '.*')) + ".*"), 'gi'));
                        res = re.test(v);
                      } else if (isRegex(flt.value)) {
                        res = flt.value.test(v);
                      }
                      return flt.op === 'like' ? res : !res;
                    } else if (flt.op === 'contains') {
                      if (Array.isArray(v)) { return !!~v.indexOf(flt.value); }
                    }
                    return ok;
                  }, true);
                });
              }

              if (isString(sort) || (isObject(sort) && !Array.isArray(sort))) { sort = [sort]; }

              if (Array.isArray(sort)) {
                sort = sort.map(function (f) {
                  if (isString(f)) {
                    return {
                      dir: f[0] === '-' ? -1 : 1,
                      get: fieldGetter(this$1, { path: f[0] === '-' || f[0] === '+' ? f.substr(1) : f })
                    };
                  } else if (f) {
                    return {
                      dir: isNumber(f.dir) ? f.dir : f.dir === 'desc' ? -1 : 1,
                      get: (f.id && (columnGetter(this$1, columns.find(function (c) { return c.id === f.id; })) || fieldGetter(this$1, fields.find(function (c) { return c.id === f.id; })))) || 
                           (f.path && (fieldGetter(this$1, { path: f.path, value: f.value })))
                    };
                  }
                }).filter(function (s) { return s && s.get; });

                list.sort(function (a, b) {
                  var aa, bb, p;
                  for (var i = 0; i < sort.length; i++) {
                    aa = sort[i].get(a);
                    bb = sort[i].get(b);
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
              var paginate = this.get('paginate');
              var per = paginate;
              var intPer = this.get('_paginate');
              var offset = this.get('page') || 0;
              var virtual = this.get('virtual');

              if (!per) { return rows; }

              if (typeof per !== 'number' && isNaN(+per)) {
                if (per === 'auto' || per === 'virtual' || per instanceof Ractive$1) { per = intPer || 1; }
                else { per = 30; } // TODO: virtual table/auto size
              }

              if (per < this.get('minPerPage')) { per = this.get('minPerPage'); }

              if (paginate === 'virtual') {
                offset = (virtual && virtual.offset) || 0;
                return rows.slice(offset, offset + per);
              } else {
                if (offset * per > rows.length) { setTimeout(function () { return this$1.set('page', 0); }, 0); }
                return rows.slice(per * offset, per * offset + per);
              }
            }
          },
          pagination: {
            get: function get() {
              var items = this.get('items') || empty;
              var rows = this.get('rows');
              var paginate = this.get('paginate');
              var per = paginate;
              var offset = this.get('page') || 0;

              if (typeof per !== 'number' && isNaN(per)) {
                per = this.get('_paginate');
              }
              if (per < this.get('minPerPage')) { per = this.get('minPerPage'); }

              if (!per) { return; }

              var total = Math.ceil(rows.length / per);
              var info = {
                max: Math.ceil(items.length / per),
                total: total,
                per: per
              };

              if (paginate === 'virtual') {
                info.height = this._avg * rows.length;
              }

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
          },
          groups: {
            get: function get() {
              var this$1 = this;

              var rows = this.get('rows');
              var last, cur;
              var res = {};
              for (var i = 0; i < rows.length; i++) {
                cur = rows[i][this$1._init.by];
                if (cur != last) { res[i] = 1; }
                last = cur;
              }
              return res;
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

      var colAttrs = ['label', 'type', 'filter', 'hidden', 'sort', 'no-pad', 'id'];
      var cell = /^[a-z]{1,3}[0-9]+(?:-[0-9]+)?$/;
      var empty = [];
      function construct() {
        // TODO: editable, selection, etc
        var cmp = this.component;
        if ( !cmp ) { return; }

        var rowEl, groupEl, mappings;

        var tpl = cmp.template.f || [];
        var attrs = cmp.template.m ? cmp.template.m.slice() : [];
        var t = cmp.template;
        cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

        var id = 0;
        function map(attr, partial) {
          if (attr && attr.f && attr.f.length === 1 && attr.f[0].t === 2) {
            var n = "_a" + (id++);
            attrs.push({ t: 13, n: n, f: attr.f });
            return partial ? { t: [{ t: 2, r: ("~/" + n) }] } : { t: 2, r: ("~/" + n) };
          }
          return attr && attr.f;
        }

        function grabColumns(tpl) {
          var columns = [];
          var fields = [];

          tpl.forEach(function (e) {
            if (e.e === 'column' || e.e === 'col') {
              var col = {};
              var attrs = e.m || empty;
              var attr;
              col.index = columns.length;
              columns.push(col);

              col.content = (e.f || []).filter(function (e) { return e.e !== 'edit'; });

              attr = attrs.find(function (a) { return a.n === 'id'; });
              if (attr && isString(attr.f)) { col.id = attr.f; }

              col.label = attrs.find(function (a) { return a.n === 'label'; });
              if (col.label && col.label.f) { col.label = map(col.label); }
              if (!col.label) { col.label = ''; }
              if (!col.id) { col.id = col.label; }
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
              else if (col.hidden && isObject(col.hidden.f)) { col.hidden = map(col.hidden); }
              else { col.hidden = false; }
              if (isString(col.hidden)) { col.hidden = false; }

              col.noPad = attrs.find(function (a) { return a.n === 'no-pad'; });
              if (col.noPad && col.noPad.f === 0) { col.noPad = 0; }
              else if (col.noPad && isObject(col.noPad.f)) { col.noPad = map(col.noPad); }
              else { delete col.noPad; }

              col.attrs = attrs.filter(function (a) { return !~colAttrs.indexOf(a.n); });

              // handle inline grid sizes without requiring the class prefix
              col.attrs.forEach(function (a, i) {
                if (cell.test(a.n)) {
                  col.attrs[i] = { t: 13, n: ("class-" + (a.n)) };
                }
              });
            } else if (e.e === 'field') {
              var field = {};
              var attrs$1 = e.m || empty;
              var a;

              a = attrs$1.find(function (a) { return a.n === 'path'; });
              if (isString(a)) { field.path = a; }
              else if (a && a.f) { field.path = map(a); }

              a = attrs$1.find(function (a) { return a.n === 'value'; });
              if (a && a.f) { field.value = map(a); }
              
              a = attrs$1.find(function (a) { return a.n === 'type'; });
              if (isString(a)) { field.type = a; }
              else if (a && a.f) { field.type = map(a); }

              a = attrs$1.find(function (a) { return a.n === 'id'; });
              if (isString(a.f)) { field.id = a.f; }

              a = attrs$1.find(function (a) { return a.n === 'label'; });
              if (isString(a)) { field.label = a; }
              else if (a && a.f) { field.label = map(a); }
              if (!field.id) { field.id = field.label; }

              fields.push(field);
            }
          });

          return { fields: fields, columns: columns };
        }

        rowEl = tpl.find(function (e) { return e.e === 'row'; });
        groupEl = tpl.find(function (e) { return e.e === 'group'; });
        
        this._init = { sets: grabColumns(tpl), partials: {} };
        var columns = this._init.sets.columns;

        var sortKey = '[_0._setSort(_1,_2)]';
        
        // table
        {
          var header = [{ t: 7, e: 'tr', m: [{ t: 13, n: 'class-rtable-header' }, { t: 4, f: [{ n: 'style-opacity', f: '0', t: 13 }], n: 50, x: { r: ['~/virtual.offset'] , s: '_0>0' } }], f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
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
            var td = { t: 7, e: 'td', f: [{ t: 16, r: ("~/columns." + (columns.indexOf(c)) + ".content"), c: { r: '.' } }], m: c.attrs.slice() };
            if (c.type) { td.m.unshift({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }, { t: 13, n: 'class-rtable-column' }); }
            if (!td.m.find(function (a) { return a.n === 'title'; })) { td.m.unshift({ t: 13, n: 'title', f: c.content.find(function (e) { return e.e; }) ? c.label : c.content }); }
            if (c.noPad === 0) { td.m.push({ t: 13, n: 'class-rtable-no-pad' }); }
            else if (c.noPad) { td.m.push({ t: 13, n: 'class-rtable-no-pad', f: c.noPad }); }
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

          this._init.partials['table-row'] = row;
          this._init.partials['table-head'] = header;
        }

        // grid
        {
          var header$1 = [{ t: 7, e: 'div', m: [
            { t: 13, n: 'class-rtable-row-wrap' },
            { t: 13, n: 'class-row-wrap' },
            { t: 13, n: 'class-rtable-header' },
            { t: 4, f: [{ n: 'style-opacity', f: '0', t: 13 }], n: 50, x: { r: ['~/virtual.offset'] , s: '_0>0' } }
          ], f: [{ t: 7, e: 'div', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
            var div = { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: c.label }], m: [{ t: 4, n: 53, r: ("~/columns." + (c.index)), f: [{ t: 70, n: ['click'], f: { r: ['@this', '.index', '@event'], s: sortKey } }] }, { t: 13, n: 'title', f: c.label }].concat(c.attrs.filter(function (a) { return a.n !== 'title'; })) };
            if (c.type) { div.m.push({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
            if (c.filter || c.sort) { div.m.push({ t: 13, n: 'class-rtable-sortable' }); }
            div.m.push({ t: 13, n: 'class-rtable-column' });
            var res = div;

            if (c.hidden && c.hidden.r) {
              res = { t: 4, n: 51, r: c.hidden.r, f: [div] };
            }

            return res;
          }), 
          m: [
            { t: 13, n: 'class-row' }
          ] }] }];

          // selectall
          header$1[0].f.unshift({
            t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-header' }, { t: 13, n: 'class-rtable-column' }, { t: 13, n: 'title', f: [{ t: 2, r: 'selections.length' }, ' items selected']}], f: [{ t: 7, e: 'div', f: [{ t: 4, n: 50, r: '~/allowSelectAll', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this'], s: '_0.allSelected()' } }] }, { t: 70, n: ['click'], f: 'selectAll' }, { t: 13, n: 'class-rtable-select' }] }] }] }] }]
          });

          var row$1 = [{ t: 7, e: 'div', m: [
            { t: 13, n: 'class-rtable-row-wrap' },
            { t: 13, n: 'class-row-wrap' },
            { t: 13, n: 'class-rtable-live' },
            { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }
          ], f: [{ t: 7, e: 'div', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
            var div = { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: [{ t: 16, r: ("~/columns." + (columns.indexOf(c)) + ".content"), c: { r: '.' } }] }], m: c.attrs.slice() };
            if (c.type) { div.m.unshift({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
            div.m.push({ t: 13, n: 'class-rtable-column' });
            if (!div.m.find(function (a) { return a.n === 'title'; })) { div.m.unshift({ t: 13, n: 'title', f: c.content.find(function (e) { return e.e; }) ? c.label : c.content }); }
            if (c.noPad === 0) { div.m.push({ t: 13, n: 'class-rtable-no-pad' }); }
            else if (c.noPad) { div.m.push({ t: 13, n: 'class-rtable-no-pad', f: c.noPad }); }
            var res = div;

            if (c.hidden && c.hidden.r) {
              res = { t: 4, n: 51, r: c.hidden.r, f: [div] };
            }

            return res;
          }), m: [
            { t: 13, n: 'class-row' }, { t: 13, n: 'class-rtable-row' },
            { t: 70, n: (rowEl && rowEl.f ? ['dblclickd'] : ['click', 'dblclick']), f: { r: ['~/rows', '~/visibleRows', '.'], s: "[['selected',_2,_0.indexOf(_2),_1.indexOf(_2)]]" } }
          ].concat((rowEl && rowEl.m) || empty) }] }];

          // expando rows
          if (rowEl && rowEl.f) {
            row$1[0].f[0].f.push({ t: 4, n: 50, x: { r: ['.', '~/expanded'], s: '_0===_1' }, f: [
              { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: rowEl.f }], m: [{ t: 13, n: 'class-t1' }, { t: 13, n: 'class-rtable-row-expand' }] }
            ] });
            row$1[0].f[0].m.push({ t: 70, n: ['clickd'], f: { r: ['@this', '@index'], s: '[_0._expand(_1)]' } });
          }

          // select
          row$1[0].f.unshift({
            t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-row' }, { t: 13, n: 'class-rtable-column' }, { t: 70, n: ['clickd'], f: { r: ['@this', '.', '@event'], s: '[_0._select(_1,_2),false]' } }], f: [{ t: 7, e: 'div', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }, { t: 13, n: 'class-rtable-select' }, { t: 70, n: ['click'], f: { r: [], s: '[false]' } }] }] }] }]
          });

          // group
          var by;
          if (groupEl && groupEl.m && (by = groupEl.m.find(function (a) { return a.n === 'by'; })) && (isString(by.f) || (by.length === 1 && by[0].t === 2))) {
            var group = {
              t: 4, n: 50, f: [{
                t: 7, e: 'div', m: [
                  { t: 13, n: 'class-row' }, { t: 13, n: 'class-rtable-group' },
                  { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] },
                  { t: 70, n: (rowEl && rowEl.f ? ['dblclickd'] : ['click', 'dblclick']), f: { r: ['~/rows', '~/visibleRows', '.'], s: "[['selected',_2,_0.indexOf(_2),_1.indexOf(_2)]]" } }
                ].concat(groupEl.m.filter(function (a) { return a.n !== 'by' && a.n !== 'select'; }))
              }],
              x: { s: "_0&&_1[(_1&&(_2*_3+_4))||_4]", r: [ '~/showGroups', '~/groups', '~/page', '~/pagination.per', '@index' ] }
            };
            row$1.unshift(group);
            this._init.by = by.f;

            var parts = grabColumns(groupEl.f).columns.filter(function (c) { return c.hidden !== true; }).map(function (c) {
              var div = { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: c.content }], m: c.attrs };
              if (c.type) { div.m.unshift({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
              div.m.push({ t: 13, n: 'class-rtable-column' });
              if (!div.m.find(function (a) { return a.n === 'title'; })) { div.m.unshift({ t: 13, n: 'title', f: c.content }); }
              var res = div;

              if (c.hidden && c.hidden.r) {
                res = { t: 4, n: 51, r: c.hidden.r, f: [div] };
              }

              return res;
            });

            // select
            parts.unshift({
              t: 4, n: 50, r: '~/allowGroupSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-row' }, { t: 13, n: 'class-rtable-column' }, { t: 70, n: ['clickd'], f: { r: ['@this', '@index'], s: '[_0._selectGroup(_1),false]' } }], f: [{ t: 7, e: 'div', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this', '@index'], s: '_0._groupSelected(_1)' } }] }, { t: 13, n: 'class-rtable-select' }, { t: 70, n: ['click'], f: { r: [], s: '[false]' } }] }] }] }]
            });

            
            var attr;
            if (attr = groupEl.m.find(function (a) { return a.n === 'select'; })) {
              (mappings || (mappings = [])).push(Object.assign({}, attr, { n: 'allowGroupSelect' }));
            }

            if (attr = groupEl.m.find(function (a) { return a.n === 'show'; })) {
              (mappings || (mappings = [])).push(Object.assign({}, attr, { n: 'showGroups' }));
            }

            group.f[0].f = parts;
          }

          this._init.partials['grid-row'] = row$1;
          this._init.partials['grid-head'] = header$1;

          if (mappings && this.component) { this.component.mappings = mappings; }
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
        d.when = new Date(Math.random() * 1733679172109);
      };

      for (var i = 0; i < 2000; i++) loop( i );

      var Table_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"height",f:"dynamic",t:13,g:1},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"transition",f:"fade",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Just about every app needs to display some list of data at some point, preferably in a filterable, sortable way. To that end, raui provides a `table`, which is more like a desktop-style grid control than a plain html `table`. It comes with built-in filtering, sorting, declarative columns, pagination, selection, and responsive layout.\n\n    Columns are laid out using `column` child elements that specify the content of the column as their content and any other settings, like the label, filter field, sort field, etc as attributes. There's also an additional `row` child that allows adding an extra detail section to each row that is hidden by default but opens when a row is clicked (or tapped) once. When `row` is preset, row selection defaults to a double click (or tap). When it is absent, selection will fire on eith click or double click (or tap).\n\n    By default, the table uses the grid decorator for sizing columns to maintain some sort of reasonable responsiveness. It also has the benefit of allowing multi-line rows if that's something you need. The downside is that you need to specify column sizes manually, though there is sugared handling using size attributes on each column rather than manually having to add each class e.g. `<column t0 s1-4 l1-8 label=Name>{{.name}}</column>`, where the column will be hidden below the small break, 25% before the large break, and 12.5% after the large break.\n\n    There is also an HTML `table` mode available, should you need it.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'data-table'` - The name to use when installing the plugin as a component\n    * `includeGrid: boolean = false` - Whether to include the grid styles within the table. Set this to `true` if you're not using the grid globally. It generates a pretty good deal of extra CSS, so if you _are_ using the grid globally, you should make sure this stays disabled.\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `items: Object[] = []` - The list of items to display in the table\n    * `filter: string` - The filter used to compare to each item to determine whether or not it should be displayed\n    * `paginate: falsey | number | 'auto' = null` -\n      * `falsey` - no pagination is applied\n      * `number` - the page size is set to the given number\n      * `'auto'` - the table will calculate the number of rows that it can display without causing its container to require a scroll bar (or at the very least have minimal scrolling) when no rows are expanded\n    * `display: 'grid' | 'table' = 'grid'` - Whether to render as a grid or an HTML table\n    * `allowSelect: boolean = true` - Whether to show the select checkbox on individual rows.\n    * `allowSelectAll: boolean = true` - Whether to show the select all checkbox in the header to allow selecting all displayed - and all total - rows.\n    \n    ### Children\n\n    * `column` - Defines a column in the table\n      * `label: string` - The string to display in the column header\n      * `filter: keypath` - A dotted keypath to the property used to filter the column. Filterable fields are automatically sortable.\n      * `sort: keypath = filter` - A dotted keypath to the property used to sort the column. Sortable fields will automatically have their header control sorting by the column.\n      * `hidden: boolean = false` - Whether to actually display the column in the table. This is useful for having a column participate in filtering without having to be displayed.\n\n    * `row` - In grid tables, the content of the `row` child is used for expandable content for each row in the table\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"pane",m:[{n:"size",f:"30",t:13,g:1}],f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;",g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Filter",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"filter"}],t:13},{t:73,v:"l",f:"300"}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Mode",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"mode"}],t:13}],f:[" ",{t:7,e:"option",m:[{n:"value",f:"grid",t:13}],f:["Grid"]}," ",{t:7,e:"option",m:[{n:"value",f:"table",t:13}],f:["Table"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"border"}],t:13}]},"Border"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"select"}],t:13}]},"Select"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"selectAll"}],t:13}]},"Select All"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"groups"}],t:13}]},"Show Groups"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"groupSelect"}],t:13}]},"Group Select"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Pagination",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"paginate"}],t:13}],f:[{t:7,e:"option",f:["auto"]},{t:7,e:"option",f:["virtual"]},{t:7,e:"option",f:["fixed"]},{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"null"}}],t:13}],f:["none"]}]}]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Items per page",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"pages"}],t:13}]}]}],n:50,x:{r:["paginate"],s:"_0===\"fixed\""}}]}," ",{t:7,e:"marked",f:["          The table below is populated with 2,000 objects in the form `{ foo, bar, bat }` that are based on randomly generated strings (foo, bar) and booleans (bat).\n\n          ### Template:\n          ```handlebars\n          <data-table bind-display=mode bind-items bind-filter bind-border bind-paginate=\"paginate === 'fixed' ? pages : paginate\" bind-allowSelect=\"select\" bind-allowSelectAll=\"selectAll\" paginate=auto on-selected=\"console.log($1)\">\n            <row>\n              <h3>Extra stuff goes here</h3>\n              <p>I have a {{.foo}} that is {{.bar}}.</p>\n            </row>\n            <column t1 s1-2 m1-3 label=\"Foo\" filter=foo>{{.foo}}</column>\n            <column t0 s1-2 m1-3 label=\"Bar\" filter=bar>{{.bar}}</column>\n            <column t0 m1-3 label=\"???\">{{.bat ? 'Yep' : 'Nope'}}</column>\n            <group by=bat select=\"{{groupSelect}}\" show=\"{{groups}}\">\n              <column t7-8>{{.bat ? 'Yeps' : 'Nopes'}}</column>\n            </group>\n          </data-table>\n          ```\n          ### Result:\n        "]}]}]},{t:7,e:"pane",m:[{t:13,n:"style",f:"display: flex; flex-direction: column;",g:1}],f:[" ",{t:7,e:"data-table",m:[{n:"display",t:13,f:[{t:2,r:"mode"}]},{n:"items",t:13,f:[{t:2,r:"items"}]},{n:"filter",t:13,f:[{t:2,r:"filter"}]},{n:"border",t:13,f:[{t:2,r:"border"}]},{n:"paginate",t:13,f:[{t:2,x:{r:["pages","paginate"],s:"_1===\"fixed\"?_0:_1"}}]},{n:"allowSelect",t:13,f:[{t:2,r:"select"}]},{n:"allowSelectAll",t:13,f:[{t:2,r:"selectAll"}]},{n:"paginate",f:"auto",t:13,g:1},{n:["selected"],t:70,f:{r:["$1"],s:"[console.log(_0)]"}}],f:[{t:7,e:"row",f:[{t:7,e:"h3",f:["Extra stuff goes here"]}," ",{t:7,e:"p",f:["I have a ",{t:2,r:".foo"}," that is ",{t:2,r:".bar"},"."]}]}," ",{t:7,e:"column",m:[{n:"t1",f:0,t:13},{n:"s1-2",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"Foo",t:13,g:1},{n:"filter",f:"foo",t:13,g:1}],f:[{t:2,r:".foo"}]}," ",{t:7,e:"column",m:[{n:"t0",f:0,t:13},{n:"s1-2",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"Bar",t:13,g:1},{n:"filter",f:"bar",t:13,g:1}],f:[{t:2,r:".bar"}]}," ",{t:7,e:"column",m:[{n:"t0",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"???",t:13,g:1}],f:[{t:2,x:{r:[".bat"],s:"_0?\"Yep\":\"Nope\""}}]}," ",{t:7,e:"field",m:[{n:"id",f:"when",t:13,g:1},{n:"path",f:"when",t:13,g:1},{n:"type",f:"date",t:13,g:1}]}," ",{t:7,e:"group",m:[{n:"by",f:"bat",t:13,g:1},{n:"select",f:[{t:2,r:"groupSelect"}],t:13},{n:"show",f:[{t:2,r:"groups"}],t:13}],f:[{t:7,e:"column",m:[{n:"t7-8",f:0,t:13}],f:[{t:7,e:"strong",f:[{t:2,x:{r:[".bat"],s:"_0?\"Yeps\":\"Nopes\""}}]}]}]}]}]}]}]}]}],e:{"null":function (){return(null);},"_0===\"fixed\"":function (_0){return(_0==="fixed");},"_1===\"fixed\"?_0:_1":function (_0,_1){return(_1==="fixed"?_0:_1);},"[console.log(_0)]":function (_0){return([console.log(_0)]);},"_0?\"Yep\":\"Nope\"":function (_0){return(_0?"Yep":"Nope");},"_0?\"Yeps\":\"Nopes\"":function (_0){return(_0?"Yeps":"Nopes");}}},
        use: [plugin(), split()],
        options: {
          title: 'Component :: Table',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data$1() {
          return { items: data, filter: '', select: true, selectAll: true, pages: 20, paginate: 'auto' };
        }
      }));

    }
  };
});
