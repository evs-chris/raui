System.register(['ractive', './chunk12.js', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, scrolled, sized, globalRegister;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      scrolled = module.scrolled;
    }, function (module) {
      sized = module.sized;
      globalRegister = module.default;
    }],
    execute: function () {

      var Tabs = /*@__PURE__*/(function (Ractive) {
        function Tabs(opts) {
          Ractive.call(this, opts);
        }

        if ( Ractive ) Tabs.__proto__ = Ractive;
        Tabs.prototype = Object.create( Ractive && Ractive.prototype );
        Tabs.prototype.constructor = Tabs;

        var prototypeAccessors = { selection: { configurable: true },visibleSelection: { configurable: true } };

        Tabs.prototype.addTab = function addTab (tab, idx) {
          if (!tab.template) { tab.template = []; }

          if (typeof idx === 'number') {
            this.splice('tabs', idx, 0, tab);
          } else {
            this.push('tabs', tab);
          }

          var res = new Handle(this, tab);

          if (tab.select) { this.select(res.index); }

          return res;
        };

        Tabs.prototype.getTab = function getTab (id) {
          var tabs = this.get('tabs');
          var tab = tabs.find(function (t) { return t.id === id; });
          if (tab) { return new Handle(this, tab); }
          else if (id in tabs && typeof tabs[id] === 'object') { return new Handle(this, tabs[id]); }
        };

        Tabs.prototype.updateIndicator = function updateIndicator () {
          if (!this.rendered || !this._tabs) { return; }
          var ctx = this.getContext(this.find('.rtabs-tab-window'));
          if (ctx.decorators.scrolled) { ctx.decorators.scrolled.refresh(); }
          if (this.get('@style.raui.tabs.boxy')) { return; }
          var node = this._tabs[this.get('selected')];
          if (!node || !node.offsetParent) { return; }

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

        Tabs.prototype.checkSelection = function checkSelection (ctx, idx) {
          if (this.get('selected') !== idx) { select.call(this, ctx, idx); }
        };

        Tabs.prototype.select = function select (idx) {
          if (idx < 0 || idx >= (this.get('tabs.length') || 0) || this._hidden(idx)) { return false; }
          this.fire('select', {}, idx);
          return true;
        };

        Tabs.prototype._hidden = function _hidden (idx) {
          var hidden = this.get(("tabs." + idx + ".hidden"));
          if (typeof hidden === 'string') { hidden = this.get(hidden); }
          return hidden;
        };

        Tabs.prototype.stopHorizontalScroll = function stopHorizontalScroll (node) {
          if (node.scrollLeft) { node.scrollLeft = 0; }
        };

        Tabs.prototype._scrollsRight = function _scrollsRight (scroll) {
          if (/hscroll.*(hmiddle|left)/.test(scroll) && !/right/.test(scroll)) { return true; }
        };

        Tabs.prototype._scrollsUp = function _scrollsUp (scroll) {
          if (/vscroll.*(vmiddle|bottom)/.test(scroll) && !/top/.test(scroll)) { return true; }
        };

        Tabs.prototype._scrollsLeft = function _scrollsLeft (scroll) {
          if (/hscroll.*(hmiddle|right)/.test(scroll) && !/left/.test(scroll)) { return true; }
        };

        Tabs.prototype._scrollsDown = function _scrollsDown (scroll) {
          if (/vscroll.*(vmiddle|top)/.test(scroll) && !/bottom/.test(scroll)) { return true; }
        };

        prototypeAccessors.selection.get = function () {
          return this.get('selected');
        };

        prototypeAccessors.visibleSelection.get = function () {
          var idx = 0;
          var tabs = this.get('tabs');
          var active = this.get('selected');
          for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (active === i) { return idx; }
            var hidden = tab.hidden;
            if (typeof hidden === 'string') { hidden = this.get(hidden); }
            if (!hidden) { idx++; }
          }
          return idx;
        };

        Object.defineProperties( Tabs.prototype, prototypeAccessors );

        return Tabs;
      }(Ractive$1));

      var tabAttrs = ['closable', 'disabled', 'title', 'right', 'button', 'no-pad', 'hidden', 'id', 'load'];

      // TODO: api handles
      Ractive$1.extendWith(Tabs, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs",g:1},{t:16,r:"extra-attributes"},{n:"class-rtabs-flat",t:13,f:[{t:2,r:"~/flat"}]},{n:"class-rtabs-margin",t:13,f:[{t:2,r:"~/margin"}]},{n:"class-rtabs-fill",t:13,f:[{t:2,r:"~/fill"}]},{n:"sized",t:71,f:{r:[],s:"[{clientWidth:\"~/clientWidth\"}]"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-window-wrapper",g:1},{n:"class-rtabs-scroll-right",t:13,f:[{t:2,x:{r:["@this","~/scrollStatus"],s:"_0._scrollsRight(_1)"}}]},{n:"class-rtabs-scroll-left",t:13,f:[{t:2,x:{r:["@this","~/scrollStatus"],s:"_0._scrollsLeft(_1)"}}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-window",g:1},{t:4,f:[{n:"class-rtabs-going-left",t:13}],n:50,x:{r:[".direction"],s:"_0===\"left\""}},{t:4,f:[{n:"class-rtabs-going-right",t:13}],n:51,l:1},{t:4,f:[{n:"scrolled",t:71,f:{r:[],s:"[\"~/scrollStatus\"]"}}],n:51,r:"@style.raui.tabs.noscrollindicators"}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tabs",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-left",g:1},{n:"class-rtabs-center",t:13,f:[{t:2,r:"~/center"}]}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,x:{r:[".right","@this","@index"],s:"!_0&&!_1._hidden(_2)"}}],n:52,r:".tabs"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-right",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,x:{r:[".right","@this","@index"],s:"_0&&!_1._hidden(_2)"}}],n:52,r:".tabs"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-indicator",g:1},{n:"style-left",f:[{t:2,r:".selectedLeft"},"px"],t:13},{t:4,f:[{n:"style-right",f:[{t:2,r:".selectedRight"},"px"],t:13}],n:50,x:{r:[".selectedRight"],s:"_0!==undefined"}}]}],n:51,r:"@style.raui.tabs.boxy"}]}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-content-wrapper",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-content-window",g:1},{t:4,f:[{n:"class-rtabs-trans-fade",t:13}],n:50,x:{r:[".transition"],s:"_0===\"fade\""}},{t:4,f:[{n:"class-rtabs-trans-slide",t:13}],n:50,x:{r:[".transition"],s:"_0===\"slide\""},l:1},{n:["scroll"],t:70,f:{r:["@this","@node"],s:"[_0.stopHorizontalScroll(_1)]"}},{n:"class-rtab-scroll-right",t:13,f:[{t:2,x:{r:["@this","selected","tabs"],s:"_0._scrollsRight(_2[_1]&&_2[_1].scrollStatus)"}}]},{n:"class-rtab-scroll-left",t:13,f:[{t:2,x:{r:["@this","selected","tabs"],s:"_0._scrollsLeft(_2[_1]&&_2[_1].scrollStatus)"}}]},{n:"class-rtab-scroll-top",t:13,f:[{t:2,x:{r:["@this","selected","tabs"],s:"_0._scrollsUp(_2[_1]&&_2[_1].scrollStatus)"}}]},{n:"class-rtab-scroll-bottom",t:13,f:[{t:2,x:{r:["@this","selected","tabs"],s:"_0._scrollsDown(_2[_1]&&_2[_1].scrollStatus)"}}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-contents",g:1},{n:"style-opacity",f:[{t:2,r:"~/opacity"}],t:13},{n:"style-left",f:[{t:2,x:{r:[".selectedContent"],s:"_0*-100"}},"%"],t:13},{n:"class-rtabs-pad",t:13,f:[{t:2,r:"~/pad"}]}],f:[{t:4,f:[{t:8,r:"tab-content"}],n:52,r:".tabs"}]}]}]}]}],e:{"[{clientWidth:\"~/clientWidth\"}]":function (){return([{clientWidth:"~/clientWidth"}]);},"_0._scrollsRight(_1)":function (_0,_1){return(_0._scrollsRight(_1));},"_0._scrollsLeft(_1)":function (_0,_1){return(_0._scrollsLeft(_1));},"_0===\"left\"":function (_0){return(_0==="left");},"[\"~/scrollStatus\"]":function (){return(["~/scrollStatus"]);},"!_0&&!_1._hidden(_2)":function (_0,_1,_2){return(!_0&&!_1._hidden(_2));},"_0&&!_1._hidden(_2)":function (_0,_1,_2){return(_0&&!_1._hidden(_2));},"_0!==undefined":function (_0){return(_0!==undefined);},"_0===\"fade\"":function (_0){return(_0==="fade");},"_0===\"slide\"":function (_0){return(_0==="slide");},"[_0.stopHorizontalScroll(_1)]":function (_0,_1){return([_0.stopHorizontalScroll(_1)]);},"_0._scrollsRight(_2[_1]&&_2[_1].scrollStatus)":function (_0,_1,_2){return(_0._scrollsRight(_2[_1]&&_2[_1].scrollStatus));},"_0._scrollsLeft(_2[_1]&&_2[_1].scrollStatus)":function (_0,_1,_2){return(_0._scrollsLeft(_2[_1]&&_2[_1].scrollStatus));},"_0._scrollsUp(_2[_1]&&_2[_1].scrollStatus)":function (_0,_1,_2){return(_0._scrollsUp(_2[_1]&&_2[_1].scrollStatus));},"_0._scrollsDown(_2[_1]&&_2[_1].scrollStatus)":function (_0,_1,_2){return(_0._scrollsDown(_2[_1]&&_2[_1].scrollStatus));},"_0*-100":function (_0){return(_0*-100);},"_0===_1":function (_0,_1){return(_0===_1);},"_0===\"dynamic\"":function (_0){return(_0==="dynamic");},"_0!==_1":function (_0,_1){return(_0!==_1);},"_0===false":function (_0){return(_0===false);},"[_0.checkSelection((_1),_2)]":function (_0,_1,_2){return([_0.checkSelection((_1),_2)]);},"[\".scrollStatus\"]":function (){return([".scrollStatus"]);},"[\"content\",_0]":function (_0){return(["content",_0]);},"(_3===\"always\"&&_0===_1)||(_3&&_2)||!_3":function (_0,_1,_2,_3){return((_3==="always"&&_0===_1)||(_3&&_2)||!_3);},"!_0":function (_0){return(!_0);},"_0===_1&&!_2":function (_0,_1,_2){return(_0===_1&&!_2);},"typeof _1===\"string\"?_0.get(_1):_1":function (_0,_1){return(typeof _1==="string"?_0.get(_1):_1);},"[[\"select\",_0]]":function (_0){return([["select",_0]]);},"[_0.button()]":function (_0){return([_0.button()]);},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"[\"tab\",_0]":function (_0){return(["tab",_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"[[\"close\",_0]]":function (_0){return([["close",_0]]);},"_0&&!_1":function (_0,_1){return(_0&&!_1);}},p:{"tab-content":[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-content",g:1},{n:"class-rtabs-selected-content",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0===_1"}}]},{n:"class-rtabs-dyna",t:13,f:[{t:2,x:{r:["~/height"],s:"_0===\"dynamic\""}}]},{n:"class-rtabs-not-selected",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0!==_1"}}]},{t:4,f:[{t:16,r:".extra"}],n:50,r:".extra"},{t:4,f:[{n:"class-rtabs-no-pad",t:13}],n:50,x:{r:[".pad"],s:"_0===false"}},{t:4,f:[{n:"class-rtabs-no-pad",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".padRef"}]}}]}],n:50,r:".padRef",l:1},{n:["focusin"],t:70,f:{r:["@this","@context","@index"],s:"[_0.checkSelection((_1),_2)]"}},{t:4,f:[{n:"scrolled",t:71,f:{r:[],s:"[\".scrollStatus\"]"}}],n:51,r:"@style.raui.tabs.noscrollindicators"},{n:"registered",t:71,f:{r:["@index"],s:"[\"content\",_0]"}}],f:[{t:4,f:[{t:16,r:".template"}],n:50,x:{r:["~/selectedContent","@index",".load","~/defer"],s:"(_3===\"always\"&&_0===_1)||(_3&&_2)||!_3"}}]}],n:50,x:{r:[".button"],s:"!_0"}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-placeholder",g:1}]}],n:51,l:1}],tab:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab",g:1},{n:"class-rtabs-selected",t:13,f:[{t:2,x:{r:["~/selected","@index",".button"],s:"_0===_1&&!_2"}}]},{t:4,f:[{n:"class-rtabs-disabled",t:13}],n:50,x:{r:["@this",".disabled"],s:"typeof _1===\"string\"?_0.get(_1):_1"}},{t:4,f:[{n:["click"],t:70,f:{r:["@index"],s:"[[\"select\",_0]]"}}],n:50,x:{r:[".button"],s:"!_0"},l:1},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.button()]"}}],n:50,x:{r:[".button"],s:"typeof _0===\"function\""},l:1},{n:"registered",t:71,f:{r:["@index"],s:"[\"tab\",_0]"}},{t:4,f:[{t:16,r:".extraTab"}],n:50,r:".extraTab"},{n:"data-tab-index",f:[{t:2,r:"@index"}],t:13}],f:[{t:4,f:[{t:2,r:"title"}],n:50,x:{r:[".title"],s:"typeof _0===\"string\""}},{t:4,f:[{t:16,r:".title"}],n:50,r:".title",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-close",g:1},{n:["click"],t:70,f:{r:["@index"],s:"[[\"close\",_0]]"}}],f:["×"]}],n:50,x:{r:[".closable",".button"],s:"_0&&!_1"}}]}]}},
        cssId: 'rtab',
        noCssTransform: true,
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.tabs.primary'));
         primary.selected = Object.assign({}, data('raui.tabs.selected'), data('raui.tabs.primary.selected'));
         primary.indicator = Object.assign({}, data('raui.tabs.indicator'), data('raui.tabs.primary.indicator'));
         var themes = (data('raui.themes') || []).slice();
         (data('raui.tabs.themes') || []).forEach(function (t) {
           if (!~themes.indexOf(t)) { themes.push(t); }
         });
         var boxy = data('raui.tabs.boxy') || data('raui.tabs.primary.boxy');
         var bottom = ((data('raui.tabs.bottom') || 1) * 0.0625) + "em";
       
         return "\n   .rtabs {\n     position: relative;\n     display: flex;\n     flex-direction: column;\n     width: 100%;\n   }\n \n   .rtabs-tab-window {\n     overflow-y: hidden;\n     overflow-x: auto;\n     " + (!boxy ? ("box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";") :
           ("border-color: " + (primary.bc || '#ccc') + ";\n     border-style: solid;\n     border-width: 1px 1px 0 1px;\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n     ")) + "\n     position: relative;\n     flex-shrink: 0;\n   }\n   .alt > div > .rtabs-tab-window {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }" + (boxy ? ("\n   .alt > div > .rtabs-tab-window .rtabs-tab {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }") : '') + "\n \n   .rtabs-tab-window-wrapper {\n     position: relative;\n     z-index: 10;\n   }\n \n   .rtabs-tab-window-wrapper:before,\n   .rtabs-tab-window-wrapper:after {\n     content: '';\n     position: absolute;\n     top: 0;\n     height: 100%;\n     width: " + (primary.indicator.size || '1em') + ";\n     opacity: 0;\n     z-index: 999;\n     pointer-events: none;\n   }\n   .rtabs-tab-window-wrapper:before {\n     background: linear-gradient(to right, " + (primary.indicator.highlight || primary.indicator.color || primary.fga || '#07e') + ", transparent);\n     left: 0;\n   }\n   .rtabs-tab-window-wrapper:after {\n     background: linear-gradient(to left, " + (primary.indicator.highlight || primary.indicator.color || primary.fga || '#07e') + ", transparent);\n     right: 0;\n   }\n   .rtabs-tab-window-wrapper.rtabs-scroll-right:after,\n   .rtabs-tab-window-wrapper.rtabs-scroll-left:before {\n     opacity: 0.5;\n   }\n \n   .rtabs-flat > div > .rtabs-tab-window {\n     box-shadow: none;\n     border-width: 0;\n   }\n   " + (!boxy ? (".rtabs-flat > div > .rtabs-tab-window:after {\n     content: '';\n     height: 0.15em;\n     position: absolute;\n     bottom: 0px;\n     width: 100%;\n     display: block;\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n   }\n   .rtabs-flat.alt > div > .rtabs-tab-window:after {\n     background-color: " + (primary.fga || '#07e') + ";\n   }") : ("\n   .rtabs-flat > div > .rtabs-tab-window {\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .alt.rtabs-flat > div > .rtabs-tab-window {\n     background-color: " + (primary.fga || '#07e') + ";\n   }\n   .rtabs-flat > div > .rtabs-tab-window .rtabs-tab {\n     border-top-width: 1px;\n   }")) + "\n \n   .rtabs-center.rtabs-left {\n     text-align: center;\n   }" + (boxy ? "\n   .rtabs-center > .rtabs-tab:first-child {\n     border-left-width: 1px;\n   }" : '') + "\n \n   .rtabs-pad {\n     padding: 1em;\n   }\n \n   .rtabs-fill {\n     flex-grow: 1;\n     height: 100%;\n   }\n \n   .rtabs-tabs {\n     display: table;\n     position: relative;\n     min-width: 100%;\n     white-space: nowrap;" + (boxy ? ("\n     border-style: solid;\n     border-width: 0 0 " + bottom + " 0;\n     border-color: " + (primary.bc || '#ccc') + ";\n     line-height: 1.5em;") : '') + "\n   }\n \n   .rtabs-tab {\n     display: inline-flex;\n     align-items: center;\n     padding: 0.5em 1em;\n     height: 1.5em;\n     transition: opacity 0.2s ease-in-out;\n     user-select: none;\n     cursor: pointer;" + (!boxy ? "\n     opacity: 0.9;" : ("\n     border-color: " + (primary.bc || '#ccc') + ";\n     border-style: solid;\n     border-width: 0 1px " + bottom + " 0;\n     margin-bottom: -" + bottom + ";\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n     ")) + "\n   }\n   .rtabs-tab:hover {\n     opacity: 1;\n   }\n \n   .rtabs-selected" + (boxy ? ",\n   .alt > div > .rtabs-tab-window .rtabs-selected" : '') + " {\n     opacity: 1;" + (boxy ? ("\n     font-weight: bold;\n     border-bottom-color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.selected.bg || primary.bg || '#fff') + ";\n     color: " + (primary.selected.fg || primary.fg || '#222') + ";") : '') + "\n   }\n \n   .rtabs-disabled {\n     opacity: 0.4;\n   }\n \n   .rtabs-right {\n     text-align: right;\n     display: table-cell;\n   }\n \n   .rtabs-left {\n     text-align: left;\n     display: table-cell;\n   }\n \n   .rtabs-close {\n     display: inline-block;\n     margin-right: -0.5em;\n     font-weight: 700;\n     opacity: 0.3;\n     transition: opacity: 0.2s ease-in-out;\n   }\n \n   .rtabs-close:hover {\n     opacity: 1;\n   }\n \n   .rtabs-indicator {\n     position: absolute;\n     bottom: 0;\n     height: 0.15em;\n     background-color: " + (primary.indicator.color || primary.fga || '#07e') + ";\n     z-index: 2;\n   }\n \n   .alt > div > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n \n   .rtabs-going-left .rtabs-indicator {\n     transition: left 0.2s ease-in-out, right 0.2s ease-in-out 0.1s;\n   }\n   .rtabs-going-right .rtabs-indicator {\n     transition: left 0.2s ease-in-out 0.1s, right 0.2s ease-in-out;\n   }\n \n   .rtabs-content-wrapper {\n     width: 100%;\n     box-sizing: border-box;\n     display: flex;\n     flex-direction: column;\n     flex-grow: 2;\n     overflow: hidden;\n   }\n \n   .rtabs-content-window {\n     width: 100%;\n     display: flex;\n     flex-grow: 1;\n     overflow-y: auto;\n     overflow-x: hidden;\n     position: relative;\n   }\n \n   .rtabs {\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   \n   .rtabs-contents {\n     list-style: none;\n     padding: 0;\n     margin: 0;\n     position: relative;\n     left: 0;\n     display: flex;\n     flex-wrap: nowrap;\n     white-space: nowrap;\n     width: 100%;\n   }\n   .rtabs-trans-slide > .rtabs-contents {\n     transition: left 0.2s ease-in-out;\n   }\n   .rtabs-trans-fade > .rtabs-contents {\n     transition: opacity 0.15s ease;\n     opacity: 1;\n     white-space: nowrap;\n   }\n \n   .rtabs-fill > div > div > .rtabs-contents {\n     display: flex;\n   }\n \n   .rtabs-tab-content {\n     position: relative;\n     width: 100%;\n     overflow: auto;\n     vertical-align: top;\n     white-space: initial;\n     transition: opacity 0.1s ease-in-out;\n     flex-shrink: 0;\n     white-space: initial;\n     display: flex;\n     flex-direction: column;\n     flex-grow: 1;\n   }\n \n   .rtabs-content-window:before,\n   .rtabs-content-window:after {\n     content: '';\n     display: block;\n     position: absolute;\n     z-index: 999;\n     height: " + (primary.indicator.size || '1em') + ";\n     width: 100%;\n     opacity: 0;\n     pointer-events: none;\n   }\n   .rtabs-content-window:before {\n     top: 0;\n     background: linear-gradient(to bottom, " + (primary.indicator.highlight || primary.indicator.color || primary.fga || '#07e') + ", transparent);\n   }\n   .rtabs-content-window:after {\n     bottom: 0;\n     background: linear-gradient(to top, " + (primary.indicator.highlight || primary.indicator.color || primary.fga || '#07e') + ", transparent);\n   }\n   .rtabs-content-window.rtab-scroll-top:before,\n   .rtabs-content-window.rtab-scroll-bottom:after {\n     opacity: 0.5;\n   }\n \n   .rtabs-placeholder {\n     display: inline-block;\n     width: 100%;\n     height: 1px;\n     flex-shrink: 0;\n   }\n   .rtabs-dyna.rtabs-not-selected {\n     height: 1px;\n     opacity: 0;\n     overflow: hidden;\n   }\n   .rtabs-pad > .rtabs-tab-content {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   .rtabs-pad > .rtabs-tab-content.rtabs-no-pad {\n     padding: 0;\n   }\n   .rtabs > .rtabs-tab-content.rtabs-pad {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   " + themes.map(function (t) {
           var theme = Object.assign({}, data('raui.primary'), data('raui.tabs.primary'), data(("raui." + t)), data(("raui.tabs." + t)));
           theme.selected = Object.assign({}, data('raui.tabs.selected'), data('raui.tabs.primary.selected'), data(("raui.tabs." + t + ".selected")));
           theme.indicator = Object.assign({}, data('raui.tabs.indicator'), data('raui.tabs.primary.indicator'), data(("raui.tabs." + t + ".indicator")));
           var boxy = 'boxy' in theme ? theme.boxy : data('raui.tabs.boxy');
       
           return (".rtabs." + t + " > div > .rtabs-tab-window {\n     " + (!boxy ? ("box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bg || '#fff') + ";") :
           ("border-color: " + (theme.bc || '#ccc') + ";\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bga || '#f4f4f4') + ";\n     ")) + "\n   }\n   .rtabs." + t + " > .rtabs-tab-window-wrapper:before {\n     background: linear-gradient(to right, " + (theme.indicator.highlight || theme.indicator.color || theme.fga || '#07e') + ", transparent);\n   }\n   .rtabs." + t + " > .rtabs-tab-window-wrapper:after {\n     background: linear-gradient(to left, " + (theme.indicator.highlight || theme.indicator.color || theme.fga || '#07e') + ", transparent);\n   }\n   .rtabs." + t + " > .rtabs-content-wrapper > .rtabs-content-window:before {\n     background: linear-gradient(to bottom, " + (theme.indicator.highlight || theme.indicator.color || theme.fga || '#07e') + ", transparent);\n   }\n   .rtabs." + t + " > .rtabs-content-wrapper > .rtabs-content-window:after {\n     background: linear-gradient(to top, " + (theme.indicator.highlight || theme.indicator.color || theme.fga || '#07e') + ", transparent);\n   }\n   .rtabs." + t + ".alt > div > .rtabs-tab-window {\n     color: " + (theme.bg || '#fff') + ";\n     background-color: " + (theme.fga || '#07e') + ";\n   }" + (boxy ? ("\n   .rtabs." + t + ".alt > div > .rtabs-tab-window .rtabs-tab {\n     color: " + (theme.bg || '#fff') + ";\n     background-color: " + (theme.fga || '#07e') + ";\n   }") : '') + "\n \n   " + (!boxy ? (".rtabs-flat." + t + " > div > .rtabs-tab-window:after {\n     background-color: " + (theme.bga || '#f4f4f4') + ";\n   }\n   .rtabs-flat.alt." + t + " > div > .rtabs-tab-window:after {\n     background-color: " + (theme.fga || '#07e') + ";\n   }") : ("\n   .rtabs-flat." + t + " > div > .rtabs-tab-window {\n     background-color: " + (theme.bg || '#fff') + ";\n   }\n   .alt.rtabs-flat." + t + " > div > .rtabs-tab-window {\n     background-color: " + (theme.fga || '#07e') + ";\n   }")) + "\n \n   " + (boxy ? (".rtabs." + t + " > div > .rtabs-tab-window .rtabs-tabs {\n     border-color: " + (theme.bc || '#ccc') + ";\n   }") : '') + "\n \n   .rtabs." + t + " > div > .rtabs-tab-window > .rtabs-tab {\n     cursor: pointer;" + (!boxy ? '' : ("\n     border-color: " + (theme.bc || '#ccc') + ";\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bga || '#f4f4f4') + ";\n     ")) + "\n   }\n \n   .rtabs." + t + " > div > .rtabs-tab-window .rtabs-selected" + (boxy ? (",\n   .rtabs." + t + ".alt > div > .rtabs-tab-window .rtabs-selected") : '') + " {" + (boxy ? ("\n     border-bottom-color: " + (them.bg || '#fff') + ";\n     background-color: " + (theme.selected.bg || theme.bg || '#fff') + ";" + (theme.indicator ? ("\n     background-image: linear-gradient(to bottom, " + (theme.indicator.color || theme.fga || '#07e') + ", " + (theme.bg || '#fff') + " 3px);") : '') + "\n     color: " + (theme.selected.fg || theme.fg || '#222') + ";") : '') + "\n   }\n \n   .rtabs." + t + " > div > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (theme.indicator.color || theme.fga || '#07e') + ";\n   }\n \n   .rtabs." + t + ".alt > div > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (theme.bg || '#fff') + ";\n   }\n \n   .rtabs." + t + " {\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bg || '#fff') + ";\n   }\n   ");
         }).join('\n');
      }).call(this, data)].join(' '); },
        attributes: ['transition', 'flat', 'pad', 'center', 'height', 'fill', 'defer', 'selected'],
        data: function data() {
          return {
            tabs: [],
            rightTabs: [],
            selected: -1,
            selectedContent: -1,
            opacity: 1,
            scrollStatus: ''
          }
        },
        on: {
          construct: construct,
          config: function config() {
            var this$1 = this;

            if (this._ctabs) { this.set('tabs', (this.get('tabs') || []).concat(this._ctabs), { shuffle: true }); }
            this._ctabs = 0;
            var tabs = this.get('tabs');
            var xs = this.indicatorObservers = [];
            tabs.forEach(function (t) {
              if (typeof t.hidden === 'string') { xs.push(this$1.observe(t.hidden, function () { return setTimeout(function () { return this$1.updateIndicator(); }); }, { init: false, defer: true })); }
            });
            xs.push(this.observe('tabs.*.hidden', function () { return setTimeout(function () { return this$1.updateIndicator(); }); }, { init: false, defer: true }));

            this.once('render', function () {
              var sel = this$1.get('selected');
              if (sel === -1) { this$1.select(0); }
              else { this$1.set('selectedContent', sel); }
            });
          },
          select: select,
          close: close,
          teardown: function teardown() {
            this.indicatorObservers.forEach(function (o) { return o.cancel(); });
          }
        },
        observe: {
          selected: {
            handler: function handler(v) {
              var this$1 = this;

              var hidden = this._hidden(v);
              var tabs = this.get('tabs');
              if (hidden) { setTimeout(function () {
                var trans = this$1.get('transition');
                this$1.set('transition', '');
                var tabs = this$1.get('tabs');
                for (var i = 0; i < tabs.length; i++) {
                  var t = tabs[i];
                  var h = t.hidden;
                  if (typeof h === 'string') { h = this$1.get(h); }
                  if (!h) {
                    this$1.select(i);
                    break;
                  }
                }
                this$1.set('transition', trans);
              }); }
              else if (v > 0 && v < tabs.length && this.get('selectedContent') !== v) { this.set('selectedContent', v); }
            },
            init: false, defer: true,
          },
          clientWidth: function clientWidth() {
            this.updateIndicator();
          }
        },
        decorators: {
          registered: function registered(node, where, idx) {
            var me = this;
            var ctx = this.getContext(node);

            if (!this._tabs) { this._tabs = []; }
            if (!this._contents) { this._contents = []; }

            this['_' + where + 's'][idx] = node;
            if (where === 'tab') { this.updateIndicator(); }
            else if (ctx.decorators.scrolled) { ctx.decorators.scrolled.refresh(); }

            return {
              teardown: function teardown() {},
              invalidate: function invalidate() {
                if (where === 'tab') { me.updateIndicator(); }
                else if (ctx.decorators.scrolled) { ctx.decorators.scrolled.refresh(); }
              },
              update: function update(idx) {
                me['_' + where + 's'][idx] = node;
                if (where === 'tab') { setTimeout(function () { return me.updateIndicator(); }); }
                else if (ctx.decorators.scrolled) { setTimeout(function () { return ctx.decorators.scrolled.refresh(); }); }
              }
            };
          },
          scrolled: scrolled, sized: sized
        }
      });

      function construct() {
        var cmp = this.component;
        if (!cmp) { return; }

        var tpl = cmp.template.f || [];
        var attrs = cmp.template.m ? cmp.template.m.slice() : [];
        var t = cmp.template;
        cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

        var tabs = tpl.filter(function (n) { return n.e === 'tab'; }).map(function (t) {
          var tab = {
            template: { t: (t.f || []).filter(function (n) { return n.e !== 'title'; }) }
          };
          var extra = [];
          var extraTab = [];

          t.m && t.m.forEach(function (a) {
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
              } else if (a.n === 'hidden' && a.f && a.f.length === 1 && a.f[0].t === 2) {
                var cnd$2 = "_cnd" + (attrs.length);
                tab.hidden = cnd$2;
                attrs.push({ t: 13, n: cnd$2, f: a.f });
              } else {
                tab[a.n] = a.f === 0 ? true : typeof a.f === 'string' ? a.f : { t: a.f };
              }
            }
            else if (a.t === 70) { extraTab.push(a); }
            else { extra.push(a); }
          });

          var tmp;
          tmp = (t.f || []).find(function (n) { return n.e === 'title'; });
          if (tmp) {
            tab.title = tmp.f;
            if (tmp.m) {
              extraTab.push.apply(extraTab, tmp.m);
            }
          }

          if (extra.length) { tab.extra = { t: extra }; }
          if (extraTab.length) { tab.extraTab = { t: extraTab }; }

          return tab;
        });

        this._ctabs = tabs;
      }

      function select(ctx, idx) {
        var this$1 = this;
        var obj;

        if (idx < -1 || idx >= this.get('tabs.length')) { return; }
        var current = this.get('selected');
        var trans = this.get('transition');

        if (this._fadetm) {
          this.set('opacity', 1);
          clearTimeout(this._fadetm);
          this._fadetm = 0;
        }

        if (this._contents) {
          var el = this._contents[idx];
          if (el) {
            var ctx$1 = this.getContext(el);
            if (ctx$1.decorators.scrolled) { ctx$1.decorators.scrolled.refresh(); }
          }
        }
        if (current !== idx) {
          if (this.rendered) {
            var cur = this.getContext(this.find('.rtabs-selected'));
            var window = this.find('.rtabs-content-window');
            if (~current) { this.set(("scroll." + (cur.get('@index'))), window.scrollTop); }
            if (cur.hasListener('leave')) { cur.raise('leave'); }
            if (trans === 'fade') {
              this.set({
                opacity: 0,
                selected: idx
              });
              this.updateIndicator();
              var ctx$2 = this.getContext(this.find('.rtabs-selected'));

              this._fadetm = setTimeout(function () {
                var obj;

                this$1._fadetm = 0;
                this$1.set(( obj = {
                  selectedContent: idx
                }, obj[("tabs." + idx + ".load")] = true, obj.opacity = 1, obj));
                if (ctx$2.hasListener('enter')) { ctx$2.raise('enter'); }
                if (window && ~current) { window.scrollTop = this$1.get(("scroll." + idx)) || 0; }
              }, 150);
            } else if (trans === 'slide') {
              this.set('selected', idx);
              this.set(("tabs." + idx + ".load"), true);
              this.set('selectedContent', idx);
              this.updateIndicator();
              var ctx$3 = this.getContext(this.find('.rtabs-selected'));
              if (ctx$3.hasListener('enter')) { ctx$3.raise('enter'); }
              if (window && ~current) { window.scrollTop = this.get(("scroll." + idx)) || 0; }
            } else {
              this.set(( obj = {
                selected: idx
              }, obj[("tabs." + idx + ".load")] = true, obj.selectedContent = idx, obj));
              this.updateIndicator();
              var ctx$4 = this.getContext(this.find('.rtabs-selected'));
              if (ctx$4.hasListener('enter')) { ctx$4.raise('enter'); }
              if (window) { window.scrollTop = this.get(("scroll." + idx)) || 0; }
            }

            if (~current && window && window.scrollLeft) { window.scrollLeft = 0; }
          } else {
            this.set({
              selected: idx,
              selectedContent: idx
            });
          }
        }
      }

      function close(ctx, idx) {
        var tab = this.getContext(this._tabs[idx]);
        var ok = true;

        if (typeof tab.onclose === 'function') {
          ok = tab.onclose.call(undefined) !== false;
        }

        if (ok && tab.element.events.find(function (e) { return e.events.find(function (e) { return e.name === 'close'; }); })) {
          ok = tab.raise('close') !== false;
        }

        if (ok) { this.splice('tabs', idx, 1); }

        return false;
      }

      var Handle = function Handle(tabs, item) {
        this.tabs = tabs;
        this.item = item;
      };

      var prototypeAccessors$1 = { keypath: { configurable: true },id: { configurable: true },index: { configurable: true },title: { configurable: true },template: { configurable: true },hidden: { configurable: true },right: { configurable: true },pad: { configurable: true },disabled: { configurable: true },button: { configurable: true },closable: { configurable: true },load: { configurable: true } };

      prototypeAccessors$1.keypath.get = function () {
        if (this.removed) { return; }
        return ("tabs." + (this.index));
      };

      prototypeAccessors$1.id.get = function () { return this.get('id'); };
      prototypeAccessors$1.id.set = function (v) { this.set('id', v); };
      prototypeAccessors$1.index.get = function () { return this.tabs.get('tabs').indexOf(this.item); };

      prototypeAccessors$1.title.get = function () { return this.get('title'); };
      prototypeAccessors$1.title.set = function (v) { this.set('title', v); };

      prototypeAccessors$1.template.get = function () { return this.get('template'); };
      prototypeAccessors$1.template.set = function (v) { return this.set('template', v); };

      prototypeAccessors$1.hidden.get = function () { return this.get('hidden'); };
      prototypeAccessors$1.hidden.set = function (v) { return this.set('hidden', v); };

      prototypeAccessors$1.right.get = function () { return this.get('right'); };
      prototypeAccessors$1.right.set = function (v) { return this.set('right', v); };

      prototypeAccessors$1.pad.get = function () { return this.get('pad'); };
      prototypeAccessors$1.pad.set = function (v) { return this.set('pad', v); };

      prototypeAccessors$1.disabled.get = function () { return this.get('disabled'); };
      prototypeAccessors$1.disabled.set = function (v) { return this.set('disabled', v); };

      prototypeAccessors$1.button.get = function () { return this.get('button'); };
      prototypeAccessors$1.button.set = function (v) { return this.set('button', v); };

      prototypeAccessors$1.closable.get = function () { return this.get('closable'); };
      prototypeAccessors$1.closable.set = function (v) { return this.set('closable', v); };

      prototypeAccessors$1.load.get = function () { return this.get('load'); };
      prototypeAccessors$1.load.set = function (v) { return this.set('load', v); };

      Handle.prototype.select = function select () {
        if (this.removed) { return; }
        this.tabs.select(this.index);
      };

      Handle.prototype.remove = function remove () {
        if (this.removed) { return false; }
        this.tabs.splice('tabs', this.index, 1);
        this.removed = true;
        return true;
      };

      Handle.prototype.get = function get (keypath) {
        if (this.removed) { return false; }
        if (!keypath) { return this.tabs.get(this.keypath); }
        var key = keypath.replace(/^[\.\/]*/, '');
        return this.tabs.get(((this.keypath) + "." + key));
      };

      Handle.prototype.set = function set (keypath, value) {
        if (this.removed) { return false; }
        var key = keypath.replace(/^[\.\/]*/, '');
        return this.tabs.set(((this.keypath) + "." + key), value);
      };

      Object.defineProperties( Handle.prototype, prototypeAccessors$1 );

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'tabs'] = Tabs;
        }
      }

      globalRegister('RauiTabs', 'components', Tabs);
      exports('default', plugin);

    }
  };
});
