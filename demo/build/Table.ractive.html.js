System.register(['ractive', './chunk8.js', './chunk9.js', './chunk2.js', './chunk13.js', './chunk7.js', './chunk17.js'], function (exports, module) {
  'use strict';
  var Ractive$1, grid, style, click, expand, globalRegister, Window, scrolled, sized, split;
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
      scrolled = module.default;
    }, function (module) {
      sized = module.sized;
    }, function (module) {
      split = module.default;
    }],
    execute: function () {

      function isString(v) { return typeof v === 'string'; }
      function isNumber(v) { return typeof v === 'number'; }
      function isObject(v) { return typeof v === 'object'; }

      var Table = /*@__PURE__*/(function (Ractive) {
        function Table(opts) { Ractive.call(this, opts); }

        if ( Ractive ) Table.__proto__ = Ractive;
        Table.prototype = Object.create( Ractive && Ractive.prototype );
        Table.prototype.constructor = Table;

        var prototypeAccessors = { selections: { configurable: true },selected: { configurable: true },rows: { configurable: true },visibleRows: { configurable: true },allRows: { configurable: true } };

        Table.prototype._allSelected = function _allSelected () {
          var sel = this.get('selections');
          var visible = this.get('paginate') === 'virtual' ? this.get('rows') : this.get('visibleRows');

          for (var i = 0; i < visible.length; i++) {
            if (!~sel.indexOf(visible[i])) { return false; }
          }

          return visible.length && true;
        };

        Table.prototype._setSort = function _setSort (index, ev) {
          var ref = [this.get('sort-handler'), this.get('@style.raui.table.sort-handler')];
          var localh = ref[0];
          var classh = ref[1];
          var fn = localh || classh;
          if (fn) {
            fn(this, this.get(("columns." + index)), index, ev);
          } else {
            var sort = this.get('sort') || '';
            var col = this.get(("columns." + index));
            var id = col.id;
            if (sort === id || sort.substr(1) === id) {
              if (sort[0] === '-') { this.set('sort', id); }
              else { this.set('sort', ("-" + id)); }
            } else {
              this.set('sort', id);
            }
          }
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

        Table.prototype._hover = function _hover (idx) {
          this.set('hovered', this.get('~/visibleRows')[idx]);
          return false;
        };

        Table.prototype._unhover = function _unhover (idx) {
          if (this.find('.rtable-top .rtable-row-wrap:hover')) { return; }
          else { this.set('hovered', undefined); }
          return false;
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

          return false;
        };

        Table.prototype._open = function _open (row, idx, vidx) {
          var this$1 = this;

          if (this._opentm) { return; }
          this.fire('selected', {}, row, idx, vidx);
          this._opentm = setTimeout(function () {
            this$1._opentm = null;
          }, 500);
        };

        Table.prototype.select = function select () {
          var selected = this.get('selected');

          if (selected) {
            this.fire('selected', {}, selected, this.get('rows').indexOf(selected), this.get('visibleRows').indexOf(selected));
          }
        };

        Table.prototype.deselect = function deselect () {
          this.set({
            selections: [],
            selected: undefined
          });
        };

        prototypeAccessors.selections.get = function () { return this.get('selections') || []; };
        prototypeAccessors.selections.set = function (v) {
          var rows = this.get('rows');
          var sels = Array.isArray(v) ? v.filter(function (i) { return ~rows.indexOf(i); }) : [];
          this.set('selections', sels);
        };

        prototypeAccessors.selected.get = function () { return this.get('selected'); };
        prototypeAccessors.selected.set = function (v) { this.set({ selected: v, selections: [v] }); };

        prototypeAccessors.rows.get = function () { return this.get('rows'); };
        prototypeAccessors.visibleRows.get = function () { return this.get('visibleRows'); };
        prototypeAccessors.allRows.get = function () { return this.get('items'); };

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
              this.splice('selections', ss[i], 1);
            }
          } else {
            this.push.apply(this, xs);
          }

          return false;
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

        Table.prototype._rows = function _rows () {
          var src = (this.get('items') || []).slice();
          var filter = this.get('filter');
          var sort = this.get('sort');
          var ref = [this.get('data-handler'), this.get('@style.raui.table.data-handler')];
          var localh = ref[0];
          var classh = ref[1];
          var handler = localh || classh || defaultFilter;
          if (!filter && !sort) {
            this.set('isFiltered', false);
            return this.set('rows', src);
          }
          var res = handler(this, src, filter, sort, this.get('parameters', { virtual: true }));
          this.set('isFiltered', res.length !== src.length);
          this.set('rows', res);
          var sels = this.get('selections');
          this.set('selections', sels.filter(function (s) { return ~src.indexOf(s); }));
          if (!~src.indexOf(this.get('selection'))) { this.set('selected', undefined); }
        };

        Object.defineProperties( Table.prototype, prototypeAccessors );

        return Table;
      }(Ractive$1));

      function scrollother(node, find) {
        var this$1 = this;

        var scroll = function (ev) {
          requestAnimationFrame(function () { return this$1.find(find).scrollLeft = ev.target.scrollLeft; });
        };
        node.addEventListener('scroll', scroll, { passive: true });
        return {
          teardown: function teardown() { node.removeEventListener('scroll', scroll); }
        };
      }

      Table.settings = {
        valign: 'center',
        border: false,
        'fixed-header': true,
        'allow-select': true,
        'allow-select-all': true,
        'auto-titles': false,
        paginate: 'virtual'
      };

      Ractive$1.extendWith(Table, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable",g:1},{n:"class-rtable-virtual",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"virtual\""}}]},{n:"class-rtable-auto",t:13,f:[{t:2,x:{r:["~/paginate"],s:"_0===\"auto\""}}]},{n:"class-rtable-fixed",t:13,f:[{t:2,r:"~/fixed"}]},{n:"class-rtable-border",t:13,f:[{t:2,r:"~/border"}]},{n:"class-rtable-fixed-header",t:13,f:[{t:2,r:"~/fixedHeader"}]},{n:"class-rtable-scrolled-down",t:13,f:[{t:2,x:{r:["~/scroll"],s:"!~(_0||\"\").indexOf(\"top\")"}}]},{n:"class-rtable-scrolled-up",t:13,f:[{t:2,x:{r:["~/scroll"],s:"!~(_0||\"\").indexOf(\"bottom\")"}}]},{n:"class-rtable-with-select",t:13,f:[{t:2,r:"~/allowSelect"}]},{n:"class-rtable-valign-top",t:13,f:[{t:2,x:{r:["~/valign"],s:"_0===\"top\""}}]},{n:"class-rtable-valign-center",t:13,f:[{t:2,x:{r:["~/valign"],s:"_0===\"center\""}}]},{n:"class-rtable-valign-bottom",t:13,f:[{t:2,x:{r:["~/valign"],s:"_0===\"bottom\""}}]},{n:"class-rtable-nowrap",t:13,f:[{t:2,r:"~/noWrap"}]},{n:"class-rtable-wrap",t:13,f:[{t:2,x:{r:["~/noWrap"],s:"!_0"}}]},{t:16,r:"extra-attributes"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-header-fixed",g:1},{n:"grid",t:71,f:{r:["~/scrollOffset"],s:"[{offset:_0}]"}}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-header-extra",g:1},{t:4,f:[{n:"style-width",f:[{t:2,r:"~/tableWidth"},"px"],t:13}],n:50,r:"~/noWrap"},{n:"class-rtable-noheader",t:13,f:[{t:2,r:"~/noHeader"}]},{t:4,f:[{t:16,r:"meta.topAttrs"}],n:50,r:"meta.topAttrs"}],f:[{t:16,r:"meta.top",z:[{n:"selectedCount",x:{r:"selections.length"}},{n:"rowCount",x:{r:"rows.length"}},{n:"table",x:{r:"@this"}},{n:"selected",x:{r:"selected"}},{n:"selections",x:{r:"selections"}}]}]}],n:50,r:"meta.top"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-header-wrapper row-wrap",g:1},{t:4,f:[{n:"scrollother",t:71,f:{r:[],s:"[\".rtable-top\"]"}}],n:50,r:"~/noWrap"}],f:[{t:8,r:"grid-head"}]}],n:51,r:"~/noHeader"}]}],n:50,x:{r:["~/noHeader","meta.top","~/fixedHeader"],s:"(!_0||_1)&&_2"}}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-top",g:1},{t:4,f:[{n:["scroll"],t:70,f:"scroll"},{n:"sized",t:71,f:{r:[],s:"[{offsetHeight:\"~/tableHeight\",diffWidth:\"~/scrollOffset\"}]"}}],n:50,x:{r:["~/paginate"],s:"_0===\"virtual\""}},{t:4,f:[{n:"scrolled",t:71,f:{r:[],s:"[\"~/scroll\"]"}}],n:50,x:{r:["~/noHeader","~/fixedHeader","~/meta.bottom"],s:"(!_0&&_1)||_2"}},{t:4,f:[{n:"scrollother",t:71,f:{r:[],s:"[\".rtable-header-wrapper\"]"}}],n:50,x:{r:["~/fixedHeader","~/noWrap"],s:"_0&&_1"}}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-header-extra",g:1},{t:4,f:[{n:"style-width",f:[{t:2,r:"~/tableWidth"},"px"],t:13}],n:50,r:"~/noWrap"},{n:"class-rtable-noheader",t:13,f:[{t:2,r:"~/noHeader"}]},{t:4,f:[{t:16,r:"meta.topAttrs"}],n:50,r:"meta.topAttrs"}],f:[{t:16,r:"meta.top",z:[{n:"selectedCount",x:{r:"selections.length"}},{n:"rowCount",x:{r:"rows.length"}},{n:"table",x:{r:"@this"}},{n:"selected",x:{r:"selected"}},{n:"selections",x:{r:"selections"}}]}]}],n:50,x:{r:["~/fixedHeader","meta.top"],s:"!_0&&_1"}}," ",{t:7,e:"div",m:[{n:"grid",t:71,f:{r:[],s:"[{size:\"~/tableWidth\",value:\"~/gridValue\",name:\"~/gridName\",max:\"~/gridMax\"}]"}},{t:4,f:[{n:"style-margin-top",f:[{t:2,r:"~/virtual.above"},"px"],t:13},{n:"style-margin-bottom",f:[{t:2,r:"~/virtual.below"},"px"],t:13}],n:50,x:{r:["~/paginate"],s:"_0===\"virtual\""}}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-header-wrapper row-wrap",g:1}],f:[{t:8,r:"grid-head"}]}],n:50,x:{r:["~/noHeader","~/fixedHeader"],s:"!_0&&!_1"}}," ",{t:4,f:[{t:4,f:[{t:8,r:"grid-row"}],n:52,z:[{n:"source",x:{r:"~/items"}},{n:"shuffle",x:{x:{r:[],s:"true"}}}],r:"~/visibleRows"}],n:50,r:"~/shuffle"},{t:4,f:[{t:4,f:[{t:8,r:"grid-row"}],n:52,r:"~/visibleRows"}],n:51,l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-row row t1",g:1}],f:[{t:16,r:"empty",z:[{n:"message",x:{r:"~/empty"}}]}]}],n:50,x:{r:["~/rows.length"],s:"!_0"}}]}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-bottom",g:1},{t:4,f:[{t:16,r:"meta.bottomAttrs"}],n:50,r:"meta.bottomAttrs"}],f:[{t:4,f:[{t:16,r:"meta.bottom",z:[{n:"selectedCount",x:{r:"selections.length"}},{n:"rowCount",x:{r:"rows.length"}},{n:"table",x:{r:"@this"}},{n:"selected",x:{r:"selected"}},{n:"selections",x:{r:"selections"}}]}],n:50,r:"~/meta.bottom"}," ",{t:4,f:[{t:8,r:"pagination"}],n:50,x:{r:["~/paginate"],s:"_0!==\"virtual\""}}]}],n:50,x:{r:["~/paginate","~/meta.bottom"],s:"_0!==\"virtual\"||_1"}}]}],e:{"_0===\"virtual\"":function (_0){return(_0==="virtual");},"_0===\"auto\"":function (_0){return(_0==="auto");},"!~(_0||\"\").indexOf(\"top\")":function (_0){return(!~(_0||"").indexOf("top"));},"!~(_0||\"\").indexOf(\"bottom\")":function (_0){return(!~(_0||"").indexOf("bottom"));},"_0===\"top\"":function (_0){return(_0==="top");},"_0===\"center\"":function (_0){return(_0==="center");},"_0===\"bottom\"":function (_0){return(_0==="bottom");},"!_0":function (_0){return(!_0);},"[{offset:_0}]":function (_0){return([{offset:_0}]);},"[\".rtable-top\"]":function (){return([".rtable-top"]);},"(!_0||_1)&&_2":function (_0,_1,_2){return((!_0||_1)&&_2);},"[{offsetHeight:\"~/tableHeight\",diffWidth:\"~/scrollOffset\"}]":function (){return([{offsetHeight:"~/tableHeight",diffWidth:"~/scrollOffset"}]);},"[\"~/scroll\"]":function (){return(["~/scroll"]);},"(!_0&&_1)||_2":function (_0,_1,_2){return((!_0&&_1)||_2);},"[\".rtable-header-wrapper\"]":function (){return([".rtable-header-wrapper"]);},"_0&&_1":function (_0,_1){return(_0&&_1);},"!_0&&_1":function (_0,_1){return(!_0&&_1);},"[{size:\"~/tableWidth\",value:\"~/gridValue\",name:\"~/gridName\",max:\"~/gridMax\"}]":function (){return([{size:"~/tableWidth",value:"~/gridValue",name:"~/gridName",max:"~/gridMax"}]);},"!_0&&!_1":function (_0,_1){return(!_0&&!_1);},"true":function (){return(true);},"_0!==\"virtual\"":function (_0){return(_0!=="virtual");},"_0!==\"virtual\"||_1":function (_0,_1){return(_0!=="virtual"||_1);},"(_0+_1)%2===1":function (_0,_1){return((_0+_1)%2===1);},"[_0._setSort(_1,_2)]":function (_0,_1,_2){return([_0._setSort(_1,_2)]);},"[_0._select(_1,_2),false]":function (_0,_1,_2){return([_0._select(_1,_2),false]);},"[_0._open(_3,_1.indexOf(_3),_2.indexOf(_3))]":function (_0,_1,_2,_3){return([_0._open(_3,_1.indexOf(_3),_2.indexOf(_3))]);},"[_0._expand(_1)]":function (_0,_1){return([_0._expand(_1)]);},"[_0.stopPropagation()]":function (_0){return([_0.stopPropagation()]);},"_0.indexOf(_1)":function (_0,_1){return(_0.indexOf(_1));},"_0===_1":function (_0,_1){return(_0===_1);},"_0>0":function (_0){return(_0>0);},"!_0&&_1>0":function (_0,_1){return(!_0&&_1>0);},"_0===\"boolean\"":function (_0){return(_0==="boolean");},"_0._allSelected()":function (_0){return(_0._allSelected());},"_0||\"No data.\"":function (_0){return(_0||"No data.");},"_0*_1+1":function (_0,_1){return(_0*_1+1);},"_2+1===_0?_1:(_2+1)*_3":function (_0,_1,_2,_3){return(_2+1===_0?_1:(_2+1)*_3);},"_0===1":function (_0){return(_0===1);},"_0._allSelected()&&_1<_2":function (_0,_1,_2){return(_0._allSelected()&&_1<_2);},"[_0.set(\"page\",_1-1)]":function (_0,_1){return([_0.set("page",_1-1)]);},"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]":function (_0,_1,_2,_3,_4){return([(/^\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set("page",+_1-1))||_2.nodeSet(_3,"value",_4+1)]);},"_0==_1+1":function (_0,_1){return(_0==_1+1);},"[_0.set(\"page\",_2[_1-1])]":function (_0,_1,_2){return([_0.set("page",_2[_1-1])]);},"_0===\"...\"":function (_0){return(_0==="...");},"[_0.set(\"page\",_1+1)]":function (_0,_1){return([_0.set("page",_1+1)]);},"_0<_1-1":function (_0,_1){return(_0<_1-1);}},p:{"csp-dummy":[{t:7,e:"div",m:[{n:"class-rtable-odd",t:13,f:[{t:2,x:{r:["@index","~/virtual.offset"],s:"(_0+_1)%2===1"}}]},{n:"class-top",t:13,f:[{t:2,x:{r:[".valign"],s:"_0===\"top\""}}]},{n:"class-bottom",t:13,f:[{t:2,x:{r:[".valign"],s:"_0===\"bottom\""}}]},{n:"class-center",t:13,f:[{t:2,x:{r:[".valign"],s:"_0===\"center\""}}]},{n:["click"],t:70,f:{r:["@this",".index","@event"],s:"[_0._setSort(_1,_2)]"}},{n:["click"],t:70,f:{r:["@this",".","@event"],s:"[_0._select(_1,_2),false]"}},{n:["click"],t:70,f:{r:["@this","~/rows","~/visibleRows","."],s:"[_0._open(_3,_1.indexOf(_3),_2.indexOf(_3))]"}},{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0._expand(_1)]"}},{n:["click"],t:70,f:{r:["@event"],s:"[_0.stopPropagation()]"}}]}," ",{t:4,f:["..."],n:50,x:{r:["~/selections","."],s:"_0.indexOf(_1)"}}," ",{t:4,f:["..."],n:50,x:{r:[".","~/expanded"],s:"_0===_1"}}," ",{t:4,f:["..."],n:50,x:{r:["~/virtual.offset"],s:"_0>0"}}," ",{t:4,f:["..."],n:50,x:{r:["~/fixedHeader","~/virtual.offset"],s:"!_0&&_1>0"}}," ",{t:4,f:["..."],n:50,x:{r:["~/columns.0.type"],s:"_0===\"boolean\""}}," ",{t:4,f:["..."],n:50,x:{r:["@this"],s:"_0._allSelected()"}}],empty:[{t:7,e:"div",f:[{t:7,e:"div",f:[{t:2,x:{r:["message"],s:"_0||\"No data.\""}}]}]}],pagination:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-pagination",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-info",g:1}],f:[{t:4,f:[{t:2,x:{r:["~/page","~/pagination.per"],s:"_0*_1+1"}}," - ",{t:2,x:{r:["~/pagination.total","~/rows.length","~/page","~/pagination.per"],s:"_2+1===_0?_1:(_2+1)*_3"}}," of ",{t:2,r:"~/rows.length"},{t:4,f:[" (",{t:2,r:"~/items.length"}," total)"],n:50,r:"~/isFiltered"}],n:50,x:{r:["pagination","rows.length"],s:"_0&&_1"}}," ",{t:4,f:["​"],n:50,x:{r:["_paginate"],s:"_0===1"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-select-all-all",g:1}],f:[{t:4,f:[{t:7,e:"strong",f:[{t:2,r:"selections.length"}]}," of ",{t:7,e:"strong",f:[{t:2,r:"rows.length"}]}," selected",{t:4,f:[" - ",{t:7,e:"a",m:[{n:"href",f:"#",t:13,g:1},{n:["click"],t:70,f:"selectAllAll"}],f:["Select All"]}],n:50,x:{r:["@this","selections.length","rows.length"],s:"_0._allSelected()&&_1<_2"}}],n:50,x:{r:["selections.length"],s:"_0>0"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtable-pages",g:1}],f:[{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1-1)]"}}],f:["Previous"]}],n:50,x:{r:["~/page"],s:"_0>0"}}," ",{t:4,f:[{t:4,f:[{t:7,e:"input",m:[{n:["change"],t:70,f:{r:["~/pagination.total","@node.value","@this","@node","~/page"],s:"[(/^\\d+$/.test(_1)&&+_1>0&&+_1<=_0&&_2.set(\"page\",+_1-1))||_2.nodeSet(_3,\"value\",_4+1)]"}},{n:"value",f:[{t:2,r:"."}],t:13},{t:73,v:"t",f:"false"}]}],n:50,x:{r:[".","~/page"],s:"_0==_1+1"}},{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","@index","../"],s:"[_0.set(\"page\",_2[_1-1])]"}}],f:["..."]}," "],n:50,x:{r:["."],s:"_0===\"...\""},l:1},{t:4,f:[" ",{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","."],s:"[_0.set(\"page\",_1-1)]"}}],f:[{t:2,r:"."}]}],n:51,l:1}],n:52,r:"~/pagination.array"}," ",{t:4,f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/page"],s:"[_0.set(\"page\",_1+1)]"}}],f:["Next"]}],n:50,x:{r:["~/page","~/pagination.total"],s:"_0<_1-1"}}]}]}]}},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data("raui.primary"), data("raui.table.primary"));
         var active = Object.assign({}, primary, data('raui.primary.active'), data('raui.table.primary.active'));
         var table = Object.assign({ selected: {}, header: {}, footer: {} }, data('raui.table'));
         return "\n   .rtable {\n     display: flex;\n     flex-direction: column;\n     overflow: auto;\n     max-width: 100%;\n     max-height: 100%;\n     box-sizing: border-box;\n     flex-grow: 2;\n   }\n \n   .rtable.rtable-border {\n     border: 1px solid " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-header {\n     min-height: 2em;\n   }\n \n   .rtable-group > div > div,\n   .rtable-header > div > div,\n   .rtable-row > div > div {\n     padding: " + (table.padding || '0.5em') + ";\n     overflow: inherit;\n     text-overflow: inherit;\n     line-height: 1em;\n   }\n   .rtable-row > .rtable-no-pad > div {\n     padding: 0;\n   }\n \n   .rtable-auto .row > *,\n   .rtable-fixed .row > *\n   {\n     text-overflow: ellipsis;\n     overflow: hidden;\n     white-space: nowrap;\n   }\n \n   .rtable-header > div > div, .rtable-column {\n     overflow: hidden;\n   }\n \n   .rtable-number-column {\n     text-align: right;\n   }\n   .rtable-date-column {\n     text-align: right;\n   }\n \n   .rtable-sortable {\n     cursor: pointer;\n     user-select: none;\n     -moz-user-select: none;\n     -ms-user-select: none;\n     -webkit-user-select: none;\n   }\n \n   .grid .row.rtable-row, .grid .rtable-header > .row {\n     width: auto;\n     min-width: min-content;\n     flex-grow: 1;\n   }\n \n   .rtable-nowrap .grid .rtable-row, .rtable-nowrap .grid .rtable-header > .row {\n     flex-wrap: nowrap;\n   }\n   .rtable-nowrap .rtable-row-wrap, .rtable-inner-row-wrap {\n     flex-grow: 1;\n   } \n \n   .rtable-row-wrap {\n     display: flex;\n     flex-grow: 1;\n     align-items: center;\n     z-index: 2;\n     align-items: stretch;\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (table.even || primary.bga || '#f4f4f4') + ";\n   }\n   .rtable-row-wrap.rtable-odd {\n     background-color: " + (table.odd || primary.bg || '#fff') + ";\n   }\n   .rtable-row-wrap.row-wrap:hover {\n     z-index: 10;\n   }\n   .rtable-row-wrap:hover .rtable-inner-row-wrap, .rtable-row-wrap:hover .rtable-select-row {\n     background-color: " + (table.over || active.bg || '#e6f0fa') + ";\n   }\n   .rtable-row-wrap:hover .rtable-inner-row-wrap,\n   .rtable-wrap .rtable-row-wrap:hover .rtable-select-row {\n     position: relative;\n   }\n   .rtable-row-wrap:hover .rtable-select-row {\n     z-index: 2;\n     overflow: visible;\n   }\n \n   .rtable-row-wrap:hover .rtable-inner-row-wrap:after, .rtable-row-wrap:hover .rtable-select-row:after {\n     content: ' ';\n     position: absolute;\n     width: 100%;\n     left: 0;\n     bottom: -4px;\n     background-color: " + (table.divider || primary.bc || '#ccc') + ";\n     height: 4px;\n   }\n \n   .rtable-row-wrap.rtable-selected {\n     background-color: " + (table.selected.bg || '#cee5fd') + ";\n     color: " + (table.selected.fg || primary.fg || '#222') + ";\n   }\n   .rtable-row-wrap.rtable-selected.rtable-odd {\n     background-color: " + (table.selected.odd || '#c5dffb') + ";\n   }\n \n   .rtable-nowrap .rtable-row-wrap {\n     display: inline-flex;\n     min-width: 100%;\n     box-sizing: border-box;\n   }\n \n   .rtable-nowrap > .rtable-top > .grid {\n     line-height: 1em;\n   }\n \n   .rtable-border .rtable-row .rtable-column,\n   .rtable-border .rtable-group .rtable-column {\n     border-color: " + (table.divider || primary.bc || '#ccc') + ";\n     border-style: solid;\n     border-width: 0 0 0 1px;\n     margin: 0 0 0 -1px;\n   }\n   .rtable-wrap.rtable-border .rtable-row .rtable-column,\n   .rtable-border .rtable-group .rtable-column {\n     border-width: 0 0 1px 1px;\n     margin: 0 0 -1px -1px;\n   }\n \n   .rtable-border .rtable-header .rtable-column {\n     border-width: 0 0 0 0;\n     margin: 0 0 0 0;\n   }\n   .rtable-wrap.rtable-border .rtable-header .rtable-column {\n     border-width: 0 0 1px 0;\n     margin: 0 0 -1px 0;\n   }\n \n   .rtable-border .rtable-row .rtable-column:nth-child(1),\n   .rtable-border .rtable-group .rtable-column:nth-child(1) {\n     border-left-width: 0;\n   }\n   .rtable-border.rtable-with-select .rtable-row .rtable-column:nth-child(1),\n   .rtable-border.rtable-with-select .rtable-group .rtable-column:nth-child(1) {\n     border-left-width: 1px;\n   }\n \n   .rtable-border .rtable-row-wrap {\n     border-bottom-width: 1px;\n   }\n \n   .rtable-border .rtable-row-expand, .rtable-border .rtable-row-extra {\n     border-color: " + (table.divider || primary.bc || '#ccc') + ";\n     border-style: solid;\n     border-width: 1px 0 0 0;\n     margin-left: -1px;\n     width: 100%;\n   }\n   .rtable-border.rtable-with-select .rtable-row-expand, .rtable-border.rtable-with-select .rtable-row-extra {\n     border-left-width: 1px;\n   }\n \n   .rtable-row-expand, .rtable-row-extra {\n     box-sizing: border-box;\n     padding: " + (table.padding || '0.5em') + ";\n   }\n \n   .rtable-row-hover {\n     pointer-events: none;\n     position: relative;\n     z-index: 1;\n   }\n   .rtable-row-hover-content {\n     position: absolute;\n     top: 0;\n     left: 0;\n     width: 100%;\n   }\n   .rtable-row-hover-content > * {\n     pointer-events: visible;\n   }\n \n   .rtable-group {\n     border-bottom: 2px solid " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-header.rtable-row-wrap, .rtable-header.rtable-row-wrap:hover {\n     font-weight: bold;\n     background-color: " + (table.header.bg || '#dedede') + ";\n   }\n   .rtable-header-fixed {\n     line-height: 1em;\n     background-color: " + (table.header.bg || '#dedede') + ";\n   }\n \n   .rtable-header.rtable-row-wrap, .rtable-header-extra.rtable-noheader {\n     border-bottom: 2px solid " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-header-extra {\n     background-color: " + (table.header.bg || '#dedede') + ";\n     padding: " + (table.padding || '0.5em') + ";\n     line-height: 1em;\n     z-index: 4;\n     box-sizing: border-box;\n     min-width: 100%;\n   }\n   .rtable-nowrap .rtable-header-extra {\n     position: sticky;\n     left: 0;\n   }\n \n   .rtable-top {\n     flex-grow: 5;\n     flex-shrink: 1;\n     overflow-y: auto;\n     position: relative;\n   }\n   .rtable-fixed-header .rtable-header {\n     position: relative;\n     z-index: 3;\n   }\n   .rtable-fixed-header.rtable-scrolled-down .rtable-header-fixed {\n     box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15), 0 0.25em 0.5em rgba(0,0,0,0.25);\n     z-index: 3;\n   }\n   .rtable-fixed-header .rtable-top {\n     margin-top: 0;\n   }\n   .rtable-nowrap.rtable-fixed-header .rtable-header-wrapper {\n     flex-shrink: 0;\n     width: 100%;\n     overflow-x: auto;\n     scrollbar-width: none;\n   }\n   .rtable-nowrap.rtable-fixed-header .rtable-header-wrapper::-webkit-scrollbar {\n     height: 0;\n   }\n   .rtable-fixed-header .rtable-header-fixed::-webkit-scrollbar {\n     width: 0;\n     height: 0;\n   }\n \n   .rtable-nowrap .rtable-fixed-column, .rtable-nowrap .rtable-row-extra, .rtable-nowrap .rtable-row-expand, .rtable-nowrap .rtable-row-hover {\n     position: -webkit-sticky;\n     position: sticky;\n     left: 0;\n   }\n   .rtable-border..rtable-nowrap .rtable-fixed-column, .rtable-border.rtable-nowrap .rtable-row-extra, .rtable-border.rtable-nowrap .rtable-row-expand, .rtable-nowrap .rtable-row-hover  {\n     left: 1px;\n    }\n   .rtable-nowrap.rtable-with-select .rtable-fixed-column, .rtable-nowrap.rtable-with-select .rtable-row-extra, .rtable-nowrap.rtable-with-select .rtable-row-expand, .rtable-nowrap .rtable-row-hover  {\n     left: " + (table.selectWidth || '2em') + ";\n   }\n   .rtabe-border.rtable-nowrap.rtable-with-select .rtable-fixed-column, .rtabe-border.rtable-nowrap.rtable-with-select .rtable-row-extra, .rtabe-border.rtable-nowrap.rtable-with-select .rtable-row-expand, .rtable-nowrap .rtable-row-hover  {\n     left: " + (table.selectWidth || '2em') + ";\n   }\n \n   .rtable-nowrap .rtable-inner-row-wrap {\n     background-color: inherit;\n   }\n \n   .rtable-nowrap .row,\n   .rtable-nowrap .rtable-fixed-column,\n   .rtable-nowrap .rtable-select-row,\n   .rtable-nowrap .rtable-select-header {\n     background-color: inherit;\n     z-index: 1;\n   }\n \n   .rtable-nowrap .rtable-select-row,\n   .rtable-nowrap .rtable-select-header {\n     position: sticky;\n     position: -webkit-sticky;\n     left: 0;\n     z-index: 1;\n   }\n   .rtable-nowrap .rtable-select-header {\n     z-index: 2;\n   }\n \n   .rtable-nowrap.rtable-border .rtable-fixed-column {\n     border-right-width: 1px;\n   }\n \n   .rtable-scrolled-up .rtable-bottom {\n     box-shadow: 0 -1px 2px 0 rgba(60, 64, 67, 0.3), 0 -1px 3px 1px rgba(60, 64, 67, 0.15), 0 -0.25em 0.5em rgba(0,0,0,0.25);\n     z-index: 3;\n   }\n   .rtable-bottom {\n     padding: " + (table.padding || '0.5em') + ";\n     background-color: " + (table.footer.bg || table.header.bg ||  '#dedede') + ";\n     border-top: 2px solid " + (table.divider || primary.bc || '#ccc') + ";\n   }\n \n   .rtable-pagination {\n     display: flex;\n     flex-wrap: wrap;\n     flex-shrink: 0;\n     justify-content: space-between;\n     user-select: none;\n   }\n \n   .rtable-pages span {\n     margin: 0.3em;\n     cursor: pointer;\n   }\n   .rtable-pages span:first-of-type {\n     margin-left: 0;\n   }\n   .rtable-pages input {\n     text-align: center;\n     width: 2.5em;\n     font-size: 1em;\n     background-color: transparent;\n     border: none;\n     padding: 0;\n     font-weight: bold;\n     text-decoration: underline;\n   }\n \n   /* checkboxes */\n   .rtable-select {\n     appearance: none;\n     -moz-appearance: none;\n     -webkit-appearance: none;\n     position: absolute;\n     display: block;\n     margin: 0;\n     width: 2em;\n     height: 2em;\n     box-shadow: none;\n     outline: none;\n     opacity: 0;\n     top: -4px;\n     left: -1.5px;\n     border-radius: 2em;\n     transition: transform 0.2s, opacity 0.2s;\n     background-color: " + (primary.bc || '#ccc') + ";\n     cursor: pointer;\n   }\n \n   .rtable-select-header > div, .rtable-select-row > div, .rtable-header > div.rtable-select-header > div {\n     padding: 0;\n     overflow: visible;\n     width: 1.5em;\n     position: relative;\n     line-height: 1.8em;\n     cursor: pointer;\n     display: flex;\n     justify-content: space-around;\n     align-items: center;\n     flex-grow: 0;\n   }\n \n   .rtable-select:checked {\n     background-color: " + (primary.fga || '#07e') + ";\n   }\n \n   .rtable-select-header:hover .rtable-select, .rtable-select-row:hover .rtable-select {\n     opacity: 0.04;\n   }\n \n   .rtable-select:focus {\n     opacity: 0.12;\n     transform: scale(1);\n   }\n \n   .rtable-select-header:hover .rtable-select:focus, .rtable-select-row:hover .rtable.select:focus {\n     opacity: 0.16;\n   }\n \n   .rtable-select:active {\n     opacity: 0.4;\n     transform: scale(0);\n     transition: transform 0s, opacity 0s;\n   }\n \n   .rtable-select-row > div:before, .rtable-select-header > div:before {\n     content: \"\";\n     display: inline-block;\n     box-sizing: border-box;\n     border: solid 2px; /* Safari */\n     border-color: " + (primary.fg || '#222') + ";\n     border-radius: 2px;\n     width: 18px;\n     height: 18px;\n     vertical-align: middle;\n     transition: border-color 0.2s, background-color 0.2s;\n   }\n \n   .rtable-select-row > div:after, .rtable-select-header > div:after {\n     content: \"\";\n     display: block;\n     position: absolute;\n     top: -5px;\n     left: 0px;\n     width: 10px;\n     height: 5px;\n     border: solid 2px transparent;\n     border-right: none;\n     border-top: none;\n     transform: translate(0.35em, 0.55em) rotate(-45deg);\n     opacity: 0;\n   }\n \n   .rtable-selected .rtable-select-row > div:before, .rtable-all-selected > div:before {\n     border-color: " + (primary.fga || '#07e') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }\n \n   .rtable-selected .rtable-select-row > div:after, .rtable-all-selected > div:after {\n     border-color: " + (primary.bg || '#fff') + ";\n     opacity: 1;\n   }\n \n   .rtable-row-wrap > .rtable-select-header,\n   .rtable-row-wrap > .rtable-select-row {\n     text-align: center;\n     flex-shrink: 0;\n     display: flex;\n     align-items: center;\n     justify-content: space-around;\n     width: " + (table.selectWidth || '2em') + ";\n   }\n   \n   .rtable-row-wrap > .rtable-select-row {\n     border-style: solid;\n     border-color: " + (table.divider || primary.bc || '#ccc') + ";\n     border-width: 0 0 1px 0;\n   }\n \n   .rtable-inner-row-wrap {\n     border-style: solid;\n     border-color: " + (table.divider || primary.bc || '#ccc') + ";\n     border-width: 0 0 1px 0;\n   }\n \n   .rtable-column button, .rtable-column .btn {\n     padding: 0 0.5em;\n     margin: 0.2em 0.5em;\n     min-height: 0;\n   }\n \n   .rtable-column.rtable-editing, .rtable-column.rtable-editing > .rtable-edit  {\n     padding: 0;\n   }\n   .rtable-column.rtable-editing input {\n     width: 100%;\n     box-sizing: border-box;\n     height: 100%;\n     margin: 0;\n     border: none;\n     background-color: transparent;\n     padding: 0.25em 0.5em;\n   }\n \n   .rtable-valign-top .rtable-row:not(.rtable-header) .rtable-column > div,\n   .rtable .rtable-row:not(.rtable-header) > .rtable-column.rtable-valign-col-top > div {\n     display: flex;\n     height: 100%;\n     align-items: flex-start;\n     box-sizing: border-box;\n   }\n   .rtable-valign-bottom .rtable-row:not(.rtable-header) .rtable-column > div,\n   .rtable .rtable-row:not(.rtable-header) > .rtable-column.rtable-valign-col-bottom > div {\n     display: flex;\n     height: 100%;\n     align-items: flex-end;\n     box-sizing: border-box;\n   }\n   .rtable-valign-center .rtable-row:not(.rtable-header) .rtable-column > div,\n   .rtable .rtable-row:not(.rtable-header) > .rtable-column.rtable-valign-col-center > div {\n     display: flex;\n     height: 100%;\n     align-items: center;\n     box-sizing: border-box;\n   }\n   " + (data('table.includeGrid') ? style(data) : '');
      }).call(this, data)].join(' '); },
        cssId: 'rtable',
        noCssTransform: true,
        attributes: ['paginate', 'items', 'filter', 'data-handler', 'sort-handler', 'sort', 'helpers', 'fixed', 'allow-select', 'allow-select-all', 'border', 'fixed-header', 'valign', 'no-header', 'empty', 'shuffle', 'no-wrap', 'parameters'],
        components: {
          table: false,
          Table: false
        },
        syncComputedChildren: true,
        decorators: { grid: grid, sized: sized, scrollother: scrollother },
        events: {},
        use: [click({ name: 'clickd', count: 1 }), click({ name: 'dblclickd', count: 2 }), expand(), scrolled()],
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
            if (this._allSelected()) {
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
            return false;
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
          _rows: function _rows() {
            var this$1 = this;

            if (this._rowbounce) { clearTimeout(this._rowbounce); }
            setTimeout(function () { return this$1._rows(); }, this.get('@style.raui.table.debounce') || 160);
          },
          paginate: {
            handler: function handler(v) {
              var this$1 = this;

              if (v === 'auto' || v === 'virtual' || v instanceof Ractive$1) {
                if (this._autoObserver) { this._autoObserver.cancel(); } // may be changing instances
                if (this._scrollListener) { this._scrollListener.cancel(); }

                var root = v === 'auto' || v === 'virtual' ? this.root : v;
                var sized = false;

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
                  if (fn.last === size && sized) { return; }

                  {
                    var ctx = this$1.getContext(top);
                    if (ctx.decorators && ctx.decorators.scrolled) { ctx.decorators.scrolled.refresh(); }
                  }

                  var header = this$1.find('.rtable-header') || {};

                  var rows = Array.apply(null, this$1.findAll('.rtable-live')).map(function (r) { return r.offsetHeight; });
                  if (rows.length < 5) {
                    var auto = Math.floor(top.clientHeight / (header.offsetHeight || 1));
                    if (auto < 5) { auto = 5; }
                    this$1.set('_paginate', auto);
                    rows = Array.apply(null, this$1.findAll('.rtable-live')).map(function (r) { return r.offsetHeight; });
                  }
                  if (rows.length > 0) { sized = true; }
                  else { rows = [25]; }
                  var avg = Math.ceil(rows.reduce(function (a, c) { return a + c; }, 0) / rows.length);
                  this$1._avgSize = avg;

                  var fit = Math.floor((top.clientHeight - (header.offsetHeight || 1)) / avg);
                  if (v === 'virtual') {
                    fit = fit + 10;
                    if (fit < 30) { fit = 30; }
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
                    if (sized && this$1._scrollListener) { this$1._scrollListener.fn(); }
                  }, 50);
                };

                this._autoObserver = this.observe('~/tableHeight', fnd);
                this._autoObserver.fire = fnd;

                if (v === 'virtual') {
                  var lock = false;
                  var node;
                  var fn$1 = function () {
                    if (!this$1.rendered) {
                      node = null;
                      return;
                    }
                    if (!node) { node = this$1.find('.rtable-top'); }
                    if (!sized) { return fnd(); }

                    var top = node.scrollTop;
                    var virtual = this$1.get('virtual') || {};
                    var offset = virtual.offset;
                    var visible = this$1.get('_paginate');
                    var page = visible - 10;
                    var count = this$1.get('rows.length');
                    if (visible > count) { visible = count; }
                    var avg = this$1._avgSize;
                    var pageSize = page * avg;
                    var wnd = Math.floor(top / avg);
                    var first = wnd - 5;
                    if (first < 0) { first = 0; }
                    var hardFirst = first;
                    if (first + visible > count) { first = count - visible; }

                    if (offset === first && !isNaN(virtual.top)) { return lock = false; }
                    
                    // check to see if the rendered area is approaching an edge
                    if (!isNumber(offset) || isNaN(offset) || isNaN(virtual.top) || top < virtual.top + pageSize || top > virtual.bottom - pageSize || offset > 0 && top < avg * page) {
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

                      if (vis && first > 0 && vis.offsetTop > node.scrollTop - pageSize - 5 && vis.offsetTop < node.scrollTop + pageSize) { next = vis.offsetTop; }

                      this$1.set({
                        'virtual.above': above,
                        'virtual.below': below,
                        'virtual.offset': first
                      });

                      if (typeof next === 'number') {
                        if (next !== vis.offsetTop) { this$1.set('virtual.above', above + (next - vis.offsetTop)); }
                      }

                      this$1.set({
                        'virtual.top': this$1.get('virtual.above'),
                        'virtual.bottom': node.scrollHeight - below
                      });
                    }

                    lock = false;
                  };
                  var scroll = this._scrollListener = this.on('scroll', function (ref) {
                    var node = ref.node;

                    if (!lock) {
                      lock = true;
                      requestAnimationFrame(fn$1);
                    }
                  });
                  scroll.fn = fn$1;

                  scroll.observer = this.observe('rows.length', function () {
                    this$1.set('virtual.offset', null);
                    fn$1();
                  }, { init: false, strict: true, defer: true });

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
          },
          'scrollOffset tableHeight': {
            handler: function handler() {
              var this$1 = this;

              requestAnimationFrame(function () {
                var top = this$1.find('.rtable-top');
                var ctx = top && this$1.getContext(top);
                if (ctx && ctx.decorators && ctx.decorators.scrolled) { ctx.decorators.scrolled.refresh(); }
              });
            },
            init: false
          },
          scroll: function scroll(v, o) {
            if (~(v || '').indexOf('top') && !~(o || '').indexOf('top')) { this.fire('scrolltop', {}); }
            if (~(v || '').indexOf('bottom') && !~(o || '').indexOf('bottom')) { this.fire('scrollbottom', {}); }
          }
        },
        data: function data() {
          return Object.assign({
            page: 0,
            selections: [],
            showGroups: true,
            allowGroupSelect: true,
            expanded: null,
            minPerPage: 10,
            virtual: { offset: 0 },
            shuffle: false,
            rows: [],
          }, Table.settings);
        },
        computed: {
          allowSelect: function allowSelect() { return this.get('allow-select'); },
          allowSelectAll: function allowSelectAll() { return this.get('allow-select-all'); },
          fixedHeader: function fixedHeader() { return this.get('fixed-header'); },
          autoTitles: function autoTitles() { return this.get('auto-titles'); },
          noHeader: function noHeader() { return this.get('no-header'); },
          noWrap: function noWrap() { return this.get('no-wrap'); },
          _rows: function _rows() {
            var src = (this.get('items') || []).slice();
            var filter = this.get('filter');
            var sort = this.get('sort');
            var params = this.get('parameters');
            var ref = [this.get('data-handler'), this.get('@style.raui.table.data-handler')];
            var ref$1 = [this.get('data-pre-handler'), this.get('@style.raui.table.data-pre-handler')];
            var localp = ref$1[0];
            var classp = ref$1[1];
            if (localp || classp) { (localp || classp)(this, src, filter, sort, params); }
            return {};
          },
          visibleRows: function visibleRows() {
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
          },
          pagination: function pagination() {
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
          },
          groups: function groups() {
            var rows = this.get('rows');
            var last, cur;
            var res = {};
            for (var i = 0; i < rows.length; i++) {
              cur = rows[i][this._init.by];
              if (cur != last) { res[i] = 1; }
              last = cur;
            }
            return res;
          }
        }
      });

      var notNumbers = /^[^\d]*/;
      function numberify(v) {
        if (isNumber(v)) { return v; }
        if (!v) { return +Infinity; }
        v = ("" + v).replace(notNumbers, '');
        if (!v) { return +Infinity; }
        return parseFloat(v);
      }

      function columnGetter(table, col, sort) {
        if (typeof col.get === 'function') { return col.get; }
        var path = (sort ? col.sort : 0) || col.path || col.filter || col.id;
        if (typeof path === 'string') {
          var arr = Ractive$1.splitKeypath(path);
          return function (row) {
            var v = row;
            for (var i = 0; i < arr.length; i++) {
              v = v && v[arr[i]];
            }
            return v;
          };
        }
      }

      function defaultFilter(table, rows, filter, sort) {
        var all = [].concat(table.viewmodel.value.columns, table.viewmodel.value.fields);
        var map = all.reduce(function (a, c) { return ((a[c.id] = columnGetter(table, c)) || true) && a; }, {});
        var cols = Object.values(map);

        var list = rows || [];

        if ((filter instanceof RegExp || isString(filter)) && filter) {
          var nocase = filter === '' + filter.toLowerCase() || filter === '' + filter.toUpperCase();
          try {
            var re = isString(filter) ? new RegExp(filter, nocase ? 'i' : '') : filter;
            list = list.filter(function (l) {
              var i = cols.length;
              while (i--) {
                var v = l && cols[i](l);
                if (v && re.test(v)) { return true; }
              }
            });
          } catch (e) {}
        }

        if (isString(sort) || (isObject(sort) && !Array.isArray(sort))) { sort = [sort]; }

        if (Array.isArray(sort)) {
          sort = sort.map(function (f) {
            if (isString(f)) {
              var id$1 = f[0] === '-' || f[0] === '+' ? f.substr(1) : f;
              var col = all.find(function (c) { return c.id === id$1; });
              if (!col) { return; }
              var res = { get: columnGetter(table, col, true), dir: f[0] === '-' ? -1 : 1 };
              if (col && col.type === 'number') {
                var get = res.get;
                res.get = function(v) {
                  return numberify(get.call(table, v));
                };
              }
              return res;
            } else if (f && typeof f === 'object') {
              var col$1 = all.find(function (c) { return c.id === id; });
              if (!col$1) { return; }
              var res$1 = {
                dir: isNumber(f.dir) ? f.dir : f.dir === 'desc' ? -1 : 1,
                get: columnGetter(table, col$1, true)
              };
              if (f.type === 'number' || col$1 && col$1.type === 'number') {
                var get$1 = res$1.get;
                res$1.get = function(v) {
                  return numberify(get$1.call(table, v));
                };
              }
              return res$1;
            }
          }).filter(function (s) { return s && s.get; });

          list.sort(function (a, b) {
            var aa, bb, p;
            for (var i = 0; i < sort.length; i++) {
              aa = sort[i].get.call(table, a);
              bb = sort[i].get.call(table, b);
              p = sort[i].dir * (aa < bb ? -1 : aa > bb ? 1 : 0);

              if (p !== 0) { return p; }
            }

            return p;
          });
        }

        return list;
      }

      var colAttrs = ['label', 'type', 'filter', 'hidden', 'sort', 'no-pad', 'id', 'editable', 'fixed'];
      var cell = /^[a-z]{1,3}[0-9]+(?:-[0-9]+)?$/;
      var empty = [];
      function construct() {
        // TODO: editable, selection, etc
        var cmp = this.component;
        if ( !cmp ) { return; }

        var expandEl, hoverEl, groupEl, wrapperEl, rowEl, topEl, bottomEl, mappings;

        var tpl = cmp.template.f || [];
        var attrs = cmp.template.m ? cmp.template.m.slice() : [];
        var t = cmp.template;
        cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

        var id = 0;
        function map(attr, partial, plain) {
          if (attr && attr.f && attr.f.length === 1 && attr.f[0].t === 2) {
            var n = "_a" + (id++);
            attrs.push({ t: 13, n: n, f: attr.f });
            if (plain) { return n; }
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

              col.content = (e.f || []).filter(function (e) { return e.e !== 'edit' && e.e !== 'header'; });
              col.editP = (e.f || []).find(function (e) { return e.e === 'edit'; });
              if (col.editP) { col.editP = col.editP.f; }

              attr = attrs.find(function (a) { return a.n === 'id'; });
              if (attr && isString(attr.f)) { col.id = attr.f; }

              col.label = (e.f || []).find(function (e) { return e.e === 'header'; });
              if (col.label) {
                col.label = col.label.f;
              } else {
                col.label = attrs.find(function (a) { return a.n === 'label'; });
                if (!col.label) { col.label = attrs.find(function (a) { return a.n === 'header'; }); }
                if (col.label && col.label.f) { col.label = map(col.label); }
              }
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

              col.dir = attrs.find(function (a) { return a.n === 'dir'; });
              if (col.dir && col.dir.f) {
                col.dir = map(col.dir);
                if (col.dir.r) { col.dir = col.dir.r; }
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

              col.editable = attrs.find(function (a) { return a.n === 'editable'; });
              if (col.editable && col.editable.f === 0) { col.editable = true; }
              else if (col.editable && isObject(col.editable.f)) { col.editable = map(col.editable); }
              else { col.editable = false; }

              col.valign = attrs.find(function (a) { return a.n === 'valign'; });
              if (col.valign && isObject(col.valign.f)) { col.valign = map(col.valign); }
              else if (col.valign && typeof col.valign.f === 'string') { col.valign = col.valign.f; }

              col.fixed = attrs.find(function (a) { return a.n === 'fixed'; });
              if (col.fixed && isObject(col.fixed.f)) { col.fixed = { path: map(col.fixed, false, true) }; }
              else if (col.fixed && typeof col.fixed.f === 'string') { col.fixed = col.fixed.f; }

              attr = attrs.find(function (a) { return a.n === 'get'; });
              if (attr && attr.f) {
                var name = map(attr, false, true);
                field.get = function(val) {
                  var fn = this.get(name);
                  return typeof fn === 'function' ? fn.call(this, val) : undefined;
                };
              }

              col.attrs = attrs.filter(function (a) { return !~colAttrs.indexOf(a.n); });

              // handle inline grid sizes without requiring the class prefix
              col.attrs.forEach(function (a, i) {
                if (cell.test(a.n)) {
                  col.attrs[i] = { t: 13, n: ("class-" + (a.n)) };
                }
              });
            } else if (e.e === 'field') {
              var field$1 = {};
              var attrs$1 = e.m || empty;
              var a;

              a = attrs$1.find(function (a) { return a.n === 'path'; });
              if (isString(a)) { field$1.path = a; }
              else if (a && a.f) { field$1.path = map(a); }

              a = attrs$1.find(function (a) { return a.n === 'value'; });
              if (a && a.f) { field$1.value = map(a); }
              
              a = attrs$1.find(function (a) { return a.n === 'type'; });
              if (isString(a)) { field$1.type = a; }
              else if (a && a.f) { field$1.type = map(a); }

              a = attrs$1.find(function (a) { return a.n === 'id'; });
              if (isString(a.f)) { field$1.id = a.f; }

              a = attrs$1.find(function (a) { return a.n === 'dir'; });
              if (isString(a)) { field$1.dir = a; }
              else if (a && isString(a.f)) { field$1.dir = a.f; }

              a = attrs$1.find(function (a) { return a.n === 'label'; });
              if (isString(a)) { field$1.label = a; }
              else if (a && a.f) { field$1.label = map(a); }

              a = attrs$1.find(function (a) { return a.n === 'get'; });
              if (a && a.f) {
                var name$1 = map(a, false, true);
                field$1.get = function(val) {
                  var fn = this.get(name$1);
                  return typeof fn === 'function' ? fn.call(this, val) : undefined;
                };
              }

              if (!field$1.id) { field$1.id = field$1.label; }
              if (!field$1.path) { field$1.path = field$1.id; }

              fields.push(field$1);
            }
          });

          return { fields: fields, columns: columns };
        }

        expandEl = tpl.find(function (e) { return e.e === 'expand'; });
        hoverEl = tpl.find(function (e) { return e.e === 'hover'; });
        groupEl = tpl.find(function (e) { return e.e === 'group'; });
        wrapperEl = tpl.find(function (e) { return e.e === 'wrapper'; });
        rowEl = tpl.find(function (e) { return e.e === 'row'; });
        topEl = tpl.find(function (e) { return e.e === 'top'; });
        bottomEl = tpl.find(function (e) { return e.e === 'bottom'; });
        
        this._init = { sets: grabColumns(tpl), partials: {} };
        var columns = this._init.sets.columns;
        this._init.sets['meta.expand'] = expandEl && expandEl.f && expandEl.f.length && expandEl.f;
        this._init.sets['meta.hover'] = hoverEl && hoverEl.f && hoverEl.f.length && hoverEl.f;
        this._init.sets['meta.extra'] = rowEl && rowEl.f && rowEl.f.length && rowEl.f;
        this._init.sets['meta.top'] = topEl && topEl.f && topEl.f.length && topEl.f;
        this._init.sets['meta.topAttrs'] = topEl && topEl.m;
        this._init.sets['meta.bottom'] = bottomEl && bottomEl.f && bottomEl.f.length && bottomEl.f;
        this._init.sets['meta.bottomAttrs'] = bottomEl && bottomEl.m;

        var sortKey = '[_0._setSort(_1,_2)]';

        // aliases for yielders
        var z = [
          { n: 'gridValue', x: { r: '~/gridValue' } },
          { n: 'gridName', x: { r: '~/gridName' } },
          { n: 'gridSize', x: { r: '~/tableWidth' } },
          { n: 'gridMax', x: { r: '~/gridMax' } },
          { n: 'table', x: { r: '@this' } } ];

        // build header partial
        var header = [{ t: 7, e: 'div', m: [
          { t: 13, n: 'class-rtable-row-wrap' },
          { t: 13, n: 'class-row-wrap' },
          { t: 13, n: 'class-rtable-header' },
          { t: 4, f: [{ n: 'style-opacity', f: '0', t: 13 }], n: 50, x: { r: ['~/fixedHeader', '~/virtual.offset'] , s: '!_0&&_1>0' } },
          { t: 4, n: 50, r: '~/fixedHeader', f: [{ t: 13, n: 'style-padding-right', f: [{ t: 2, r: '~/scrollOffset' }, 'px'] }] }
        ], f: [{ t: 7, e: 'div', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c, cidx) {
          c.attrsHP = c.attrs.filter(function (a) { return a.n !== 'title'; });
          var div = { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: [{ t: 16, r: ("~/columns." + cidx + ".label"), c: { r: '.' }, z: z }] }], m: [{ t: 13, n: 'title', f: c.label }, { t: 16, r: ("~/columns." + cidx + ".attrsHP"), z: z }] };
          if (c.type) { div.m.push({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
          if (c.filter || c.sort) { div.m.push({ t: 13, n: 'class-rtable-sortable' }, { t: 4, n: 53, r: ("~/columns." + cidx), f: [{ t: 70, n: ['click'], f: { r: ['@this', '.index', '@event'], s: sortKey } }] }); }

          div.m.push({ t: 13, n: 'class-rtable-column' });
          if (c.fixed) {
            var path = c.fixed.path || ("~/columns." + cidx + ".fixed");
            div.m.push({ t: 13, n: 'class-rtable-fixed-column', f: [{ t: 2, r: path }] });
            div.m.push({ t: 4, n: 50, x: { r: ["~/noWrap", path], s: "_0&&typeof _1==='string'" }, f: [{ t: 13, n: 'style-left', f: [{ t: 2, r: path }] }] });
          }
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
        header[0].f.unshift({
          t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-header' }, { t: 13, n: 'class-rtable-column' }, { t: 13, n: 'title', f: [{ t: 2, r: 'selections.length' }, ' items selected']}, { t: 13, n: 'class-rtable-all-selected', f: [{ t: 2, x: { r: ['@this'], s: '_0._allSelected()' } }] }], f: [{ t: 7, e: 'div', f: [{ t: 4, n: 50, r: '~/allowSelectAll', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this'], s: '_0._allSelected()' } }] }, { t: 13, n: 'class-rtable-select' }, { t: 70, n: ['click'], f: 'selectAll' }] }] }], m: [{ t: 70, n: ['clickd'], f: 'selectAll' }] }] }]
        });

        // buld row partial
        var row = [{ t: 7, e: 'div', m: [
          { t: 13, n: 'class-rtable-row-wrap' },
          { t: 13, n: 'class-rtable-odd', f: [{ t: 2, x: { r: ['@index','~/virtual.offset'], s: '(_0+_1)%2===1' } }] },
          { t: 13, n: 'class-row-wrap' },
          { t: 13, n: 'class-rtable-live' },
          { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }
        ], f: [{ t: 7, e: 'div', m: [
          { t: 13, n: 'class-row-wrap' },
          { t: 13, n: 'class-rtable-inner-row-wrap' }
        ], f: [{ t: 7, e: 'div', f: columns.filter(function (c) { return c.hidden !== true; }).map(function (c, cidx) {
          var content = [{ t: 7, e: 'div', f: [{ t: 16, r: ("~/columns." + cidx + ".content"), c: { r: '.' }, z: z }] }];
          if (c.attrs.length) {
            c.attrsP = c.attrs;
            c.attrs = [{ t: 16, r: ("~/columns." + cidx + ".attrsP"), c: { r: '.' }, z: z }];
          } else {
            c.attrs = [];
          }
          var attrs = c.attrs;
          if (c.fixed) {
            var path = c.fixed.path || ("~/columns." + cidx + ".fixed");
            attrs.push({ t: 13, n: 'class-rtable-fixed-column', f: [{ t: 2, r: path }] });
            attrs.push({ t: 4, n: 50, x: { r: ["~/noWrap", path], s: "_0&&typeof _1==='string'" }, f: [{ t: 13, n: 'style-left', f: [{ t: 2, r: path }] }] });
          }
          if (c.editable && (c.filter || c.editP)) {
            // TODO: moar types - pick, date, maybe custom via edit tag
            var noclicky = { t: 70, n: ['click', 'mousedown', 'pointerdown', 'MSPointerDown', 'touchstart'], f: { r: ['@event'], s: '[_0.stopPropagation()]' } };
            var editor = [
              { t: 4, n: 50, x: { r: [("~/columns." + cidx + ".editP")], s: "Array.isArray(_0)" }, f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-edit' }, noclicky], f: [{ t: 16, r: ("~/columns." + cidx + ".editP") }] }] },
              { t: 4, n: 50, l:1, x: { r: [("~/columns." + cidx + ".type")], s: "_0==='boolean'" }, f: [{ t: 7, e: 'input', m: [{ t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, r: c.filter }] }, noclicky] }] },
              { t: 4, n: 51, l: 1, f: [{ t: 7, e: 'input', m: [{ t: 13, n: 'value', f: [{ t: 2, r: c.filter }] }, noclicky] }] }
            ];
            if (typeof c.editable === 'object') {
              attrs.push({ t: 13, n: 'class-rtable-editing', f: c.editable });
              content = [
                Object.assign({}, c.editable, { t: 4, n: 50, f: editor }),
                { t: 4, n: 51, l: 1, f: content }
              ];
            } else {
              attrs.push({ t: 13, n: 'class-rtable-editing' });
              content = editor;
            }
          }

          if (c.valign) {
            attrs.push(
              { t: 13, n: 'class-rtable-valign-col-top', f: [{ t: 2, x: { r: [("~/columns." + cidx + ".valign")], s: "_0==='top'" } }] },
              { t: 13, n: 'class-rtable-valign-col-bottom', f: [{ t: 2, x: { r: [("~/columns." + cidx + ".valign")], s: "_0==='bottom'" } }] },
              { t: 13, n: 'class-rtable-valign-col-center', f: [{ t: 2, x: { r: [("~/columns." + cidx + ".valign")], s: "_0==='center'" } }] }
            );
          }

          var div = { t: 7, e: 'div', f: content, m: attrs };
          if (c.type) { attrs.unshift({ t: 13, n: ("class-rtable-" + (c.type) + "-column") }); }
          attrs.push({ t: 13, n: 'class-rtable-column' });

          var title = c.attrsP && c.attrsP.find(function (a) { return a.n === 'title'; });
          if (!title) { attrs.unshift({ t: 4, n: 50, r: '~/autoTitles', f: [{ t: 13, n: 'title', f: c.content.find(function (e) { return e.e; }) ? c.label : c.content }] }); }
          else if (!title.f) {
            attrs.unshift({ t: 13, n: 'title', f: c.content.find(function (e) { return e.e; }) ? c.label : c.content });
            c.attrsP.splice(attrs.indexOf(title), 1);
          }

          if (c.noPad === 0) { attrs.push({ t: 13, n: 'class-rtable-no-pad' }); }
          else if (c.noPad) { attrs.push({ t: 13, n: 'class-rtable-no-pad', f: c.noPad }); }
          var res = div;

          if (c.hidden && c.hidden.r) {
            res = { t: 4, n: 51, r: c.hidden.r, f: [div] };
          }

          return res;
        }), m: [
          { t: 13, n: 'class-row' }, { t: 13, n: 'class-rtable-row' },
          { t: 70, n: (expandEl && expandEl.f ? ['dblclickd'] : ['click', 'dblclick']), f: { r: ['@this', '~/rows', '~/visibleRows', '.'], s: "[_0._open(_3,_1.indexOf(_3),_2.indexOf(_3))]" } }
        ] }] }] }];

        // extra row attrs
        if (rowEl && rowEl.m && rowEl.m.length) {
          this._init.sets.rowAttrs = rowEl.m.slice();
          row[0].f[0].f[0].m.push({ t: 16, r: '~/rowAttrs', c: { r: '.' }, z: z });
        }

        // extra wrapper attrs
        if (wrapperEl && wrapperEl.m && wrapperEl.m.length) {
          this._init.sets.wrapperAttrs = wrapperEl.m.slice();
          row[0].m.push({ t: 16, r: '~/wrapperAttrs', c: { r: '.' }, z: z });
        }

        // extra fixed content
        if (rowEl && rowEl.f && rowEl.f.length) {
          row[0].f[0].f.push({ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-row-extra' }, { t: 4, n: 50, r: '~/noWrap', f: [{ t: 13, n: 'style-width', f: [{ t: 2, x: { r: ['~/tableWidth', '~/allowSelect', '@style.raui.table.selectWidth'], s: "_1?'calc('+_0+'px - '+(_2||'2em')+')':_0+'px'" } }] }] }], f: [{ t: 16, r: '~/meta.extra', c: { r: '.' }, z: z }] });
        }

        // expando rows
        if (expandEl && expandEl.f && expandEl.f.length) {
          var listener = { t: 70, n: ['clickd'], f: { r: ['@this', '@index'], s: '[_0._expand(_1)]' } };
          var ev = expandEl.m && expandEl.m.find(function (a) { return a.n === 'skip'; });
          if (ev && ev.f && ev.f[0] && ev.f[0].t === 2) { ev = Object.assign({}, ev.f[0], { t: 4, n: 51, f: [listener] }); } // unless {{skip}} listener
          else { ev = listener; }
          row[0].f[0].f.push({ t: 4, n: 50, x: { r: ['.', '~/expanded'], s: '_0===_1' }, f: [
            { t: 7, e: 'div', f: [{ t: 7, e: 'div', f: [{ t: 16, r: "~/meta.expand", c: { r: '.' }, z: z }] }], m: [{ t: 13, n: 'class-rtable-row-expand' }, { t: 4, n: 50, r: '~/noWrap', f: [{ t: 13, n: 'style-width', f: [{ t: 2, x: { r: ['~/tableWidth', '~/allowSelect', '@style.raui.table.selectWidth'], s: "_1?'calc('+_0+'px - '+(_2||'2em')+')':_0+'px'" } }] }] }] }
          ] });
          row[0].f[0].f[0].m.push(ev);
          row[0].f[0].f[1].f[0].m.push({ t: 70, n: ['click'], f: { r: ['@this', '@index'], s: '[_0._expand(_1)]' } });
        }

        // row hover
        if (hoverEl && hoverEl.f && hoverEl.f.length) {
          row[0].f[0].f.unshift({ t: 4, n: 50, x: { r: ['.', '~/hovered'], s: '_0===_1' }, f: [
              { t: 7, e: 'div', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-row-hover-content' }].concat(hoverEl.m || []), f: [{ t: 16, r: '~/meta.hover', c: { r: '.' }, z: z }] }], m: [{ t: 13, n: 'class-rtable-row-hover' }, { t: 4, n: 50, r: '~/noWrap', f: [{ t: 13, n: 'style-width', f: [{ t: 2, x: { r: ['~/tableWidth', '~/allowSelect', '@style.raui.table.selectWidth'], s: "_1?'calc('+_0+'px - '+(_2||'2em')+')':_0+'px'" } }] }] }] }
          ] });
          row[0].m.push(
            { t: 70, n: ['mouseenter'], f: { r: ['@this', '@index'], s: '[_0._hover(_1)]' } },
            { t: 70, n: ['mouseleave'], f: { r: ['@this', '@index'], s: '[_0._unhover(_1)]' } }
          );
        }

        // select
        row[0].f.unshift({
          t: 4, n: 50, r: '~/allowSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-row' }, { t: 13, n: 'class-rtable-column' }, { t: 70, n: ['clickd'], f: { r: ['@this', '.', '@event'], s: '[_0._select(_1,_2),false]' } }], f: [{ t: 7, e: 'div', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] }, { t: 13, n: 'class-rtable-select' }, { t: 70, n: ['click'], f: { r: ['@this', '.', '@event'], s: '[_0._select(_1,_2),false]' } }] }] }] }]
        });

        // group
        var by;
        if (groupEl && groupEl.m && (by = groupEl.m.find(function (a) { return a.n === 'by'; })) && (isString(by.f) || (by.length === 1 && by[0].t === 2))) {
          var group = {
            t: 4, n: 50, f: [{
              t: 7, e: 'div', m: [
                { t: 13, n: 'class-row' }, { t: 13, n: 'class-rtable-group' },
                { t: 13, n: 'class-rtable-selected', f: [{ t: 2, x: { r: ['~/selections', '.'], s: '~_0.indexOf(_1)' } }] },
                { t: 70, n: (expandEl && expandEl.f ? ['dblclickd'] : ['click', 'dblclick']), f: { r: ['~/rows', '~/visibleRows', '.'], s: "[['selected',_2,_0.indexOf(_2),_1.indexOf(_2)]]" } }
              ].concat(groupEl.m.filter(function (a) { return a.n !== 'by' && a.n !== 'select'; }))
            }],
            x: { s: "_0&&_1[(_1&&(_2*_3+_4))||_4]", r: [ '~/showGroups', '~/groups', '~/page', '~/pagination.per', '@index' ] }
          };
          row.unshift(group);
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
            t: 4, n: 50, r: '~/allowGroupSelect', f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-rtable-select-row' }, { t: 13, n: 'class-rtable-column' }, { t: 70, n: ['clickd'], f: { r: ['@this', '@index'], s: '[_0._selectGroup(_1),false]' } }, { t: 13, n: 'class-rtable-all-selected', f: [{ t: 2, x: { r: ['@this', '@index'], s: '_0._groupSelected(_1)' } }] }], f: [{ t: 7, e: 'div', f: [{ t: 7, e: 'input', m: [{ t: 73, v: 't', f: 'false' }, { t: 13, n: 'type', f: 'checkbox' }, { t: 13, n: 'checked', f: [{ t: 2, x: { r: ['@this', '@index'], s: '_0._groupSelected(_1)' } }] }, { t: 13, n: 'class-rtable-select' }, { t: 70, n: ['click'], f: { r: ['@this', '@index'], s: '[_0._selectGroup(_1),false]' } }] }] }] }]
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

        this._init.partials['grid-row'] = row;
        this._init.partials['grid-head'] = header;

        if (mappings && this.component) { this.component.mappings = mappings; }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          if ('includeGrid' in opts) { Ractive.styleSet('table.includeGrid', opts.includeGrid); }
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
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"height",f:"dynamic",t:13,g:1},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"transition",f:"fade",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Just about every app needs to display some list of data at some point, preferably in a filterable, sortable way. To that end, raui provides a `table`, which is more like a desktop-style grid control than a plain html `table`. It comes with built-in filtering, sorting, declarative columns, pagination, selection, and responsive layout.\n\n    Columns are laid out using `column` child elements that specify the content of the column as their content and any other settings, like the label, filter field, sort field, etc as attributes. There's also an additional `row` child that allows adding an extra detail section to each row that is hidden by default but opens when a row is clicked (or tapped) once. When `row` is preset, row selection defaults to a double click (or tap). When it is absent, selection will fire on eith click or double click (or tap).\n\n    By default, the table uses the grid decorator for sizing columns to maintain some sort of reasonable responsiveness. It also has the benefit of allowing multi-line rows if that's something you need. The downside is that you need to specify column sizes manually, though there is sugared handling using size attributes on each column rather than manually having to add each class e.g. `<column t0 s1-4 l1-8 label=Name>{{.name}}</column>`, where the column will be hidden below the small break, 25% before the large break, and 12.5% after the large break.\n\n    There is also an HTML `table` mode available, should you need it.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'data-table'` - The name to use when installing the plugin as a component\n    * `includeGrid: boolean = false` - Whether to include the grid styles within the table. Set this to `true` if you're not using the grid globally. It generates a pretty good deal of extra CSS, so if you _are_ using the grid globally, you should make sure this stays disabled.\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `items: Object[] = []` - The list of items to display in the table.\n    * `filter: string|object|object[]` - The filter used to compare to each item to determine whether or not it should be displayed.\n    * `sort: string|string[]` - The sorting to use on the displayed items\n    * `paginate: falsey | number | 'auto' | 'virtual' = 'virtual'` -\n      * `falsey` - no pagination is applied\n      * `number` - the page size is set to the given number.\n      * `'auto'` - the table will calculate the number of rows that it can display without causing its container to require a scroll bar (or at the very least have minimal scrolling) when no rows are expanded\n    * `allow-select: boolean = true` - Whether to show the select checkbox on individual rows.\n    * `allow-select-all: boolean = true` - Whether to show the select all checkbox in the header to allow selecting all displayed - and all total - rows.\n    * `no-header: boolean = false` - Whether to show the header row.\n    * `fixed-header: boolean = true` - Whether the header should be fixed at the top of the table or move with the rows.\n    * `border: boolean = false` - Whether to show a border between columns.\n    * `no-wrap: boolean = false` - Whether columns should not be allowed to wrap to the next line. In this mode, columns should have fixed widths, as percentages will result in mangled rows. This mode also allows for fixed columns.\n    * `shuffle: boolean = true` - Whether the list of rows should shuffle.\n    * `valign: 'top' | 'center' | 'bottom' = 'center'` - Set the default vertical alignment of column values.\n    \n    ### Children\n\n    * `column` - Defines a column in the table\n      * `label: string` - The string to display in the column header\n      * `filter: keypath` - A dotted keypath to the property used to filter the column. Filterable fields are automatically sortable.\n      * `sort: keypath = filter` - A dotted keypath to the property used to sort the column. Sortable fields will automatically have their header control sorting by the column.\n      * `hidden: boolean = false` - Whether to actually display the column in the table. This is useful for having a column participate in filtering without having to be displayed.\n      * `fixed: boolean|string = false` - Whether the column should be fixed in `no-wrap` mode. If the value is a string, it is used to set the left fix point of the column.\n      * `valign: 'top' | 'center' | 'bottom'` - Set the vertical alignment of this column.\n      * Children:\n        * `header` - template to render in the column header\n        * `edit` - template to render when the field is being edited\n\n    * `row` - The content of the `row` child is fixed below the column content for each row. The attributes of the row are applied to each row in the grid.\n    * `wrapper` - The attributes of the wrapper are applied to each rows wrapper.\n    * `expand` - The content of the `expand` element will be shown for each row if the row is selected to be expanded. This is similar to `row`, but will only show for a single row at a time.\n    * `top` - Additional content to be added to the header above the header columns. In both `top` and `bottom`, `selectedCount`, `rowCount`, `table`, `selected`, and `selections` are injected into the context to allow access to the number of selected rows, the total number of rows, the table component, the currently selected item, and the list of all selected items respectively.\n    * `bottom` - Additional content to be added to the footer of the table above the pagination, if any.\n    * `field` - Like column, but without content. These elements along with their `id` attribute are used to make filterable fields that are not displayed.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"pane",m:[{n:"size",f:"30",t:13,g:1}],f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;",g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Filter",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"filter"}],t:13},{t:73,v:"l",f:"300"}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"border"}],t:13}]},"Border"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"fixedHeader"}],t:13}]},"Fixed Header"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"noHeader"}],t:13}]},"No Header"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"select"}],t:13}]},"Select"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"selectAll"}],t:13}]},"Select All"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"groups"}],t:13}]},"Show Groups"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"groupSelect"}],t:13}]},"Group Select"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["valign",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"valign"}],t:13}],f:[{t:7,e:"option",f:["center"]},{t:7,e:"option",f:["top"]},{t:7,e:"option",f:["bottom"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Pagination",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"paginate"}],t:13}],f:[{t:7,e:"option",f:["auto"]},{t:7,e:"option",f:["virtual"]},{t:7,e:"option",f:["fixed"]},{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"null"}}],t:13}],f:["none"]}]}]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Items per page",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"pages"}],t:13}]}]}],n:50,x:{r:["paginate"],s:"_0===\"fixed\""}}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"editable"}],t:13}]}," Editable Bar"]}]}," ",{t:7,e:"marked",f:["          The table below is populated with 2,000 objects in the form `{ foo, bar, bat }` that are based on randomly generated strings (foo, bar) and booleans (bat).\n\n          ### Template:\n          ```handlebars\n            <data-table bind-items bind-filter=\"filter\" bind-border bind-fixed-header=fixedHeader bind-paginate=\"paginate === 'fixed' ? pages : paginate\" bind-allow-select=select bind-allow-select-all=selectAll bind-valign bind-no-header=noHeader on-selected=\"console.log($1)\">\n            <expand>\n              <h3>Extra stuff goes here</h3>\n              <p>I have a {{.foo}} that is {{.bar}}.</p>\n            </expand>\n            <column t1 s1-2 m1-3 label=\"Foo\" filter=foo>{{.foo}}</column>\n            <column t0 s1-2 m1-3 label=\"Bar\" filter=bar bind-editable>{{.bar}}</column>\n            <column t0 m1-3 label=\"???\">{{.bat ? 'Yep' : 'Nope'}}</column>\n            <group by=bat select=\"{{groupSelect}}\" show=\"{{groups}}\">\n              <column t7-8>{{.bat ? 'Yeps' : 'Nopes'}}</column>\n            </group>\n          </data-table>\n          ```\n          ### Result:\n        "]}]}," "]},{t:7,e:"pane",m:[{t:13,n:"style",f:"display: flex; flex-direction: column;",g:1}],f:[" ",{t:7,e:"data-table",m:[{n:"items",t:13,f:[{t:2,r:"items"}]},{n:"filter",t:13,f:[{t:2,r:"filter"}]},{n:"border",t:13,f:[{t:2,r:"border"}]},{n:"fixed-header",t:13,f:[{t:2,r:"fixedHeader"}]},{n:"paginate",t:13,f:[{t:2,x:{r:["pages","paginate"],s:"_1===\"fixed\"?_0:_1"}}]},{n:"allow-select",t:13,f:[{t:2,r:"select"}]},{n:"allow-select-all",t:13,f:[{t:2,r:"selectAll"}]},{n:"valign",t:13,f:[{t:2,r:"valign"}]},{n:"no-header",t:13,f:[{t:2,r:"noHeader"}]},{n:["selected"],t:70,f:{r:["$1"],s:"[console.log(_0)]"}}],f:[{t:7,e:"expand",f:[{t:7,e:"h3",f:["Extra stuff goes here"]}," ",{t:7,e:"p",f:["I have a ",{t:2,r:".foo"}," that is ",{t:2,r:".bar"},"."]}]}," ",{t:7,e:"column",m:[{n:"t1",f:0,t:13},{n:"s1-2",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"Foo",t:13,g:1},{n:"filter",f:"foo",t:13,g:1}],f:[{t:2,r:".foo"}]}," ",{t:7,e:"column",m:[{n:"t0",f:0,t:13},{n:"s1-2",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"Bar",t:13,g:1},{n:"filter",f:"bar",t:13,g:1},{n:"editable",t:13,f:[{t:2,r:"editable"}]}],f:[{t:2,r:".bar"}]}," ",{t:7,e:"column",m:[{n:"t0",f:0,t:13},{n:"m1-3",f:0,t:13},{n:"label",f:"???",t:13,g:1}],f:[{t:2,x:{r:[".bat"],s:"_0?\"Yep\":\"Nope\""}}]}," ",{t:7,e:"field",m:[{n:"id",f:"when",t:13,g:1},{n:"path",f:"when",t:13,g:1},{n:"type",f:"date",t:13,g:1}]}," ",{t:7,e:"group",m:[{n:"by",f:"bat",t:13,g:1},{n:"select",f:[{t:2,r:"groupSelect"}],t:13},{n:"show",f:[{t:2,r:"groups"}],t:13}],f:[{t:7,e:"column",m:[{n:"t7-8",f:0,t:13}],f:[{t:7,e:"strong",f:[{t:2,x:{r:[".bat"],s:"_0?\"Yeps\":\"Nopes\""}}]}]}]}]}]}]}]}]}],e:{"null":function (){return(null);},"_0===\"fixed\"":function (_0){return(_0==="fixed");},"_1===\"fixed\"?_0:_1":function (_0,_1){return(_1==="fixed"?_0:_1);},"[console.log(_0)]":function (_0){return([console.log(_0)]);},"_0?\"Yep\":\"Nope\"":function (_0){return(_0?"Yep":"Nope");},"_0?\"Yeps\":\"Nopes\"":function (_0){return(_0?"Yeps":"Nopes");}}},
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
