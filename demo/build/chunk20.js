System.register(['ractive'], function (exports, module) {
  'use strict';
  var Ractive$1;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }],
    execute: function () {

      exports('default', plugin);
      var ref = (function() {
        try {
          var lang = navigator.language || navigator.browserLanguage || navigator.languages[0] || 'en';
          return [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (m) { return new Date(2006, m, 1).toLocaleString(lang, { month: 'long' }); }),
            [1, 2, 3, 4, 5, 6, 7].map(function (d) { return new Date(2006, 0, d).toLocaleString(lang, { weekday: 'long' }); })
          ]
        } catch (e) {
          return [
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          ]
        }
      })();
      var months = ref[0];
      var weekdays = ref[1];
      var _days = weekdays.map(function (d) { return d[0]; }).concat(weekdays.map(function (d) { return d[0].toUpperCase(); }));
      var shortMonths = months.map(function (m) { return m.substr(0, 3); });

      var DatePicker = /*@__PURE__*/(exports('DatePicker', function (Ractive) {
        function DatePicker(opts) { Ractive.call(this, opts); }

        if ( Ractive ) DatePicker.__proto__ = Ractive;
        DatePicker.prototype = Object.create( Ractive && Ractive.prototype );
        DatePicker.prototype.constructor = DatePicker;

        DatePicker.prototype.month = function month (date, offset) {
          if ( offset === void 0 ) offset = 0;

          var dt = date || new Date();
          if (!(dt instanceof Date)) { return {}; }
          if (isNaN(dt)) { dt = new Date(); }

          if (offset) { dt = new Date(dt.getFullYear(), dt.getMonth() + offset, dt.getDate()); }

          var first;
          try { first = +this.get('firstDay'); } catch (e) {}
          if (typeof first !== 'number' || isNaN(first)) { first = 0; }
          if (first > 6) { first = 0; }
          
          var prev = new Date(dt.getFullYear(), dt.getMonth(), 0);
          var last = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
          var next = new Date(dt.getFullYear(), dt.getMonth() + 1, 1);
          var start = new Date(dt.getFullYear(), dt.getMonth(), 1).getDay();

          var res = [];
          var st = res[0] = [];
          for (var i = 0; i < 7; i++) {
            res[0].unshift({ y: prev.getFullYear(), m: prev.getMonth(), d: prev.getDate() - i });
            res[0].push({ y: dt.getFullYear(), m: dt.getMonth(), d: i + 1 });
          }

          if (first <= start) { res[0] = res[0].slice(7 - (start - first), 14 - (start - first)); }
          else { res[0] = res[0].slice(first - start, 7 + first - start); }

          if (res[0][0].d === 1) { res.unshift(st.slice(0, 7)); }

          var d = res[res.length - 1][res[res.length - 1].length - 1].d;
          for (var i$1 = res.length; i$1 < 5; i$1++) {
            res[i$1] = [];
            for (var j = 0; j < 7 && d + 1 <= last; j++) { res[i$1].push({ y: dt.getFullYear(), m: dt.getMonth(), d: ++d }); }
            if (res[i$1].length < 7) {
              var offset$1 = 7 - res[i$1].length;
              for (var j$1 = 1; j$1 <= offset$1; j$1++) { res[i$1].push({ y: next.getFullYear(), m: next.getMonth(), d: j$1 }); }
              res[i$1 + 1] = [];
              for (var j$2 = 0, k = offset$1 + 1; j$2 < 7; j$2++, k++) { res[i$1 + 1].push({ y: next.getFullYear(), m: next.getMonth(), d: k }); }
            }
          }

          if (!res[5]) {
            res[5] = [];
            while (d < last) { res[5].push({ y: dt.getFullYear(), m: dt.getMonth(), d: ++d }); }
            for (var i$2 = 1; i$2 < 8; i$2++) { res[5].push({ y: next.getFullYear(), m: next.getMonth(), d: i$2 }); }
            res[5] = res[5].slice(0, 7);
          }

          var obj = { days: _days.slice(first, first + 7), weeks: res, year: dt.getFullYear(), month: dt.getMonth(), currentYear: (new Date()).getFullYear() };

          return obj;
        };

        DatePicker.prototype.year = function year (date, offset) {
          if ( offset === void 0 ) offset = 0;

          var dt = date || new Date();
          if (!(dt instanceof Date)) { return {}; }

          if (offset) { dt = new Date(dt.getFullYear() + offset, dt.getMonth(), dt.getDate()); }

          var res = [];
          for (var i = 0; i < 4; i++) {
            res.push([]);
            for (var j = 0; j < 3; j++) {
              res[i].push({ m: (i * 3) + j, y: dt.getFullYear() });
            }
          }

          return {
            year: dt.getFullYear(),
            months: res
          }
        };

        DatePicker.prototype.decade = function decade (date, offset) {
          if ( offset === void 0 ) offset = 0;

          var dt = date || new Date();
          if (!(dt instanceof Date)) { return {}; }

          if (offset) { dt = new Date(dt.getFullYear() + (offset * 10), dt.getMonth(), dt.getDate()); }

          var start = Math.floor(dt.getFullYear() / 10) * 10;
          var first = start - 1;
          var res = [];
          for (var i = 0; i < 4; i++) {
            res.push([]);
            for (var j = 0; j < 3; j++) {
              res[i].push({ y: first + (i * 3) + j });
            }
          }

          return {
            start: start, end: start + 9, years: res
          };
        };

        DatePicker.prototype.monthName = function monthName (num) {
          return months[num];
        };

        DatePicker.prototype.shortMonthName = function shortMonthName (num) {
          return shortMonths[num];
        };

        DatePicker.prototype.dayName = function dayName (num) { 
          return weekdays[num];
        };

        DatePicker.prototype.select = function select (dt) {
          if (dt && dt instanceof Date) { this.set('date', dt); }
          else {
            var current = this.get('safeCurrent');

            if (dt) { this.set('date', new Date(dt.y || current.getFullYear(), typeof dt.m === 'number' ? dt.m : current.getMonth(), dt.d || current.getDate())); }

            var mode = this.get('mode');
            if (mode === 'year') { this.set('mode', 'months'); }
            else if (mode === 'months') { this.set('mode', 'month'); }

            this.set('target', this.get('date'));
          }
        };

        DatePicker.prototype.isCurrent = function isCurrent (dt) {
          var current = this.get('safeCurrent');
          if (!current) { return false; }
          return dt && dt.y === current.getFullYear() && (dt.m == null || dt.m === current.getMonth()) && (dt.d == null || dt.d === current.getDate());
        };

        DatePicker.prototype.next = function next () {
          var target = this.get('safeTarget');
          var mode = this.get('mode');
          if (mode === 'month') { this.set('target', new Date(target.getFullYear(), target.getMonth() + 1, 1)); }
          if (mode === 'months') { this.set('target', new Date(target.getFullYear() + 1, target.getMonth(), 1)); }
          if (mode === 'year') { this.set('target', new Date(target.getFullYear() + 10, target.getMonth(), 1)); }
        };

        DatePicker.prototype.prev = function prev () {
          var target = this.get('safeTarget');
          var mode = this.get('mode');
          if (mode === 'month') { this.set('target', new Date(target.getFullYear(), target.getMonth() - 1, 1)); }
          if (mode === 'months') { this.set('target', new Date(target.getFullYear() - 1, target.getMonth(), 1)); }
          if (mode === 'year') { this.set('target', new Date(target.getFullYear() - 10, target.getMonth(), 1)); }
        };

        DatePicker.prototype.today = function today () {
          this.set('date', new Date());
          this.set('target', this.get('date'));
        };

        return DatePicker;
      }(Ractive$1)));

      Ractive$1.extendWith(DatePicker, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal",g:1}],f:[{t:4,f:[{t:4,f:[{t:19,f:[{t:8,r:"~/mode"}],n:54,z:[{n:"left",x:{x:{r:["@index"],s:"_0===0"}}},{n:"right",x:{x:{r:["@last","@index"],s:"_0===_1"}}}]}],n:52,z:[{n:"offset",x:{r:"."}}],r:"~/padding"}],n:50,r:"~/padding"},{t:4,f:[{t:19,f:[{t:8,r:"~/mode"}],n:54,z:[{n:"offset",x:{x:{r:[],s:"0"}}},{n:"left",x:{x:{r:[],s:"true"}}},{n:"right",x:{x:{r:[],s:"true"}}}]}],n:51,l:1}]}],e:{"0":function (){return(0);},"_0===0":function (_0){return(_0===0);},"_0===_1":function (_0,_1){return(_0===_1);},"true":function (){return(true);},"[_0.prev(),false]":function (_0){return([_0.prev(),false]);},"[_0.set(\"mode\",\"month\"),false]":function (_0){return([_0.set("mode","month"),false]);},"[_0.next(),false]":function (_0){return([_0.next(),false]);},"_1>_0||_1<_2":function (_0,_1,_2){return(_1>_0||_1<_2);},"_0.isCurrent(_1)":function (_0,_1){return(_0.isCurrent(_1));},"[_0.select(_1),false]":function (_0,_1){return([_0.select(_1),false]);},"_0.decade(_1,_2)":function (_0,_1,_2){return(_0.decade(_1,_2));},"[_0.set(\"mode\",\"year\"),false]":function (_0){return([_0.set("mode","year"),false]);},"_0.shortMonthName(_1)":function (_0,_1){return(_0.shortMonthName(_1));},"_0.year(_1,_2)":function (_0,_1,_2){return(_0.year(_1,_2));},"[_0.set(\"mode\",\"months\"),false]":function (_0){return([_0.set("mode","months"),false]);},"_0.monthName(_1)":function (_0,_1){return(_0.monthName(_1));},"_0!==_1":function (_0,_1){return(_0!==_1);},"[_0.select(_1)]":function (_0,_1){return([_0.select(_1)]);},"_0.month(_1,_2)":function (_0,_1,_2){return(_0.month(_1,_2));}},p:{year:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-wrapper",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-block-outer",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-block-header",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-arrow",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.prev(),false]"}}],n:50,r:"left"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-left",g:1}]}],n:50,r:"left"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-title",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.set(\"mode\",\"month\"),false]"}}],f:[{t:2,r:".start"}," - ",{t:2,r:".end"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-arrow",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.next(),false]"}}],n:50,r:"right"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-right",g:1}]}],n:50,r:"right"}]}]}," ",{t:19,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-decade",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-inner-row",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-inner-pick",g:1},{n:"class-rcal-off-day",t:13,f:[{t:2,x:{r:["year.end",".y","year.start"],s:"_1>_0||_1<_2"}}]},{n:"class-rcal-current",t:13,f:[{t:2,x:{r:["@this","."],s:"_0.isCurrent(_1)"}}]},{n:["click"],t:70,f:{r:["@this","."],s:"[_0.select(_1),false]"}}],f:[{t:2,r:".y"}]}],n:52,r:"."}]}],n:52,r:".years"}]}],n:54,z:[{n:"year",x:{r:"."}}]}]}]}],n:54,x:{r:["@this","~/safeTarget","offset"],s:"_0.decade(_1,_2)"}}],months:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-wrapper",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-block-outer",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-block-header",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-arrow",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.prev(),false]"}}],n:50,r:"left"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-left",g:1}]}],n:50,r:"left"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-title",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.set(\"mode\",\"year\"),false]"}}],f:[{t:2,r:".year"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-arrow",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.next(),false]"}}],n:50,r:"right"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-right",g:1}]}],n:50,r:"right"}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-year",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-inner-row",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-inner-pick",g:1},{n:"class-rcal-current",t:13,f:[{t:2,x:{r:["@this","."],s:"_0.isCurrent(_1)"}}]},{n:["click"],t:70,f:{r:["@this","."],s:"[_0.select(_1),false]"}}],f:[{t:2,x:{r:["@this",".m"],s:"_0.shortMonthName(_1)"}}]}],n:52,r:"."}]}],n:52,r:".months"}]}]}]}],n:54,x:{r:["@this","~/safeTarget","offset"],s:"_0.year(_1,_2)"}}],month:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-wrapper",g:1},{n:"class-rcal-pad",t:13,f:[{t:2,r:"~/pad"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-block-outer",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-block-header",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-arrow",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.prev(),false]"}}],n:50,r:"left"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-left",g:1}]}],n:50,r:"left"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-title",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.set(\"mode\",\"months\"),false]"}}],f:[{t:2,x:{r:["@this",".month"],s:"_0.monthName(_1)"}},{t:4,f:[" ",{t:2,r:".year"}],n:50,x:{r:[".currentYear",".year"],s:"_0!==_1"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-click rcal-arrow",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.next(),false]"}}],n:50,r:"right"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-right",g:1}]}],n:50,r:"right"}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-month",g:1}],f:[{t:19,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-week rcal-week-header",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-day rcal-day-header",g:1}],f:[{t:2,r:"."}]}],n:52,r:".days"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-week",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcal-day",g:1},{n:"class-rcal-off-day",t:13,f:[{t:2,x:{r:[".m","month.month"],s:"_0!==_1"}}]},{n:"class-rcal-current",t:13,f:[{t:2,x:{r:["@this","."],s:"_0.isCurrent(_1)"}}]},{n:["click"],t:70,f:{r:["@this","."],s:"[_0.select(_1)]"}}],f:[{t:2,r:".d"}]}],n:52,r:"."}]}],n:52,r:".weeks"}],n:54,z:[{n:"month",x:{r:"."}}]}]}]}]}],n:54,x:{r:["@this","~/safeTarget","offset"],s:"_0.month(_1,_2)"}}]}},
        css: function(data) { return [(function(data) {
         return (".rcal-wrapper {\n     display: flex;\n     flex-direction: column;\n     width: 15em;\n     height: 17em;\n   }\n \n   .rcal-pad {\n     padding: 0.5em;\n   }\n \n   .rcal-block-outer {\n     border: 1px solid " + (data('raui.datePicker.primary.bga') || data('raui.primary.bga') || '#f4f4f4') + ";\n     display: flex;\n     flex-direction: column;\n     flex-grow: 1;\n   }\n \n   .rcal-block-header {\n     text-align: center;\n     background-color: " + (data('raui.datePicker.primary.fga') || data('raui.primary.fga') || '#07e') + ";\n     color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n     cursor: default;\n     display: flex;\n     justify-content: space-between;\n     line-height: 2em;\n     height: 2em;\n     align-items: center;\n   }\n \n   .rcal-arrow {\n     width: 2em;\n   }\n   .rcal-title {\n     flex-grow: 1;\n   }\n \n   .rcal-click {\n     cursor: pointer;\n   }\n \n   .rcal-left, .rcal-right {\n     height: 0.8em;\n     display: inline-block;\n     box-sizing: border-box;\n     border: 0.4em solid transparent;\n     cursor: pointer;\n   }\n   .rcal-left {\n     border-right-color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n   }\n   .rcal-right {\n     border-left-color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n   }\n \n   .rcal-month, .rcal-year, .rcal-decade {\n     display: flex;\n     flex-direction: column;\n     background-color: " + (data('raui.datePicker.primary.bga') || data('raui.primary.bga') || '#f4f4f4') + ";\n     justify-content: space-between;\n     flex-grow: 1;\n   }\n   .rcal-year, .rcal-decade {\n     justify-content: space-around;\n   }\n \n   .rcal-week {\n     height: 2em;\n     display: flex;\n     justify-content: space-between;\n   }\n \n   .rcal-inner-row {\n     height: 2em;\n     display: flex;\n     justify-content: space-around;\n   }\n \n   .rcal-inner-pick {\n     background-color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n     width: 3em;\n     height: 2em;\n     line-height: 2em;\n     text-align: center;\n     cursor: pointer;\n   }\n \n   .rcal-week-header {\n     background-color: " + (data('raui.datePicker.primary.fga') || data('raui.primary.fga') || '#07e') + ";\n   }\n \n   .rcal-day {\n     background-color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n     width: 2em;\n     height: 2em;\n     text-align: center;\n     line-height: 2em;\n     cursor: pointer;\n   }\n \n   .rcal-day-header {\n     color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n     background-color: " + (data('raui.datePicker.primary.fga') || data('raui.primary.fga') || '#07e') + ";\n     cursor: default;\n   }\n \n   .rcal-off-day {\n     background-color: " + (data('raui.datePicker.primary.bc') || data('raui.primary.bc') || '#ccc') + ";\n   }\n \n   .rcal-current {\n     color: " + (data('raui.datePicker.primary.bg') || data('raui.primary.bg') || '#fff') + ";\n     background-color: " + (data('raui.datePicker.primary.fg') || data('raui.primary.fg') || '#222') + ";\n   }\n   ");
      }).call(this, data)].join(' '); },
        noCssTransform: true,
        data: function data() {
          return {
            mode: 'month',
            target: new Date()
          };
        },
        computed: {
          safeCurrent: function safeCurrent() {
            var current = this.get('date');
            if (typeof current === 'string') {
              try { current = new Date(current); } catch (e) {}
            }
            if (!current || !(current instanceof Date) || isNaN(current)) { return new Date(); }
            return current;
          },
          safeTarget: function safeTarget() {
            var target = this.get('target');
            if (!target) { target = this.get('date'); }
            if (typeof target === 'string') {
              try { target = new Date(target); } catch (e) {}
            }
            if (!target || !(target instanceof Date) || isNaN(target)) { return new Date(); }
            return target;
          }
        }
      });

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'date-picker'] = DatePicker;
        };
      }

    }
  };
});
