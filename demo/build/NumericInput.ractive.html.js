System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var notNumRE = /[^-0-9\.]/g;
      var numRE = /[-0-9\.]/;
      var notMinusNumRE = /[^0-9\.]/g;
      var intRE = /(\d)(?=(\d{3})+$)/g;
      var decRE = /(\d)(?=(\d{3})+\.)/g;
      var decimalRE = /\./g;
      var endsWithDecRE = /\.$/;
      var startsZeroRE = /^(0(?!\.))+/;

      // TODO: configurable decimal and separators

      function number(v, dec) {
        v = v || '';
        if (dec === 0) { v = v.replace(/\..*/, ''); }
        return v.replace(v.indexOf('.') === -1 ? intRE : decRE, '$1,');
      }

      function numeric(options) {
        if ( options === void 0 ) options = {};

        return function(node, opts, more) {
          if ( opts === void 0 ) opts = {};
          if ( more === void 0 ) more = {};

          if (typeof opts === 'string') { opts = { bind: opts }; }
          var o = Object.assign({}, options, opts, more);
          var ctx = this.getContext(node);
          var cleanup = [];
          var lock = false;
          var leave = false;
          var write;

          if (typeof o.bind !== 'string') { delete o.bind; }
          if (typeof o.number !== 'string') { delete o.number; }

          var type = node.getAttribute('type');
          node.setAttribute('type', 'tel');
          node.className += ' rn-numeric';

          function update() {
            if (lock) { return; }

            var cur = node.value;
            if (!('' + cur).length && o.default != null) { cur = o.default; }
            var num = [cur.substr(0, node.selectionStart).replace(notNumRE, '').length, cur.substr(0, node.selectionEnd).replace(notNumRE, '').length];
            var dir = node.selectionDirection;

            var next = cur.replace(notNumRE, '');
            // handle extra minus chars
            var minus = !!~next.indexOf('-');
            next = next.replace(notMinusNumRE, '');

            if (startsZeroRE.test(next)) {
              var len = next.length;
              next = next.replace(startsZeroRE, '');
              if (!next.length) { next = '0'; }
              num[0] -= len - next.length;
              num[1] -= len - next.length;
            }

            var dec = next.indexOf('.');
            var decIdx = dec;
            if (!~dec && o.decimal && !o.preferInteger) { dec = next.length; }
            if (~dec) {
              var preDec = next.substr(0, dec);
              var postDec = next.substr(dec + 1).replace(decimalRE, '');
              if (typeof o.whole === 'number' && preDec.length > o.whole) {
                preDec = preDec.substr(0, o.whole);
              }
              if (typeof o.decimal === 'number') {
                if (postDec.length > o.decimal) {
                  postDec = postDec.substr(0, o.decimal);
                } else if (postDec.length < o.decimal && leave) {
                  for (var i = postDec.length; i < o.decimal; i++) { postDec += '0'; }
                }
              }
              if (leave && !preDec) { preDec = '0'; }
              if (leave && !+postDec && o.preferInteger) { next = preDec; }
              else { next = "" + preDec + (~decIdx || postDec ? '.' : '') + postDec; }
            } else if (typeof o.whole === 'number' && next.length > o.whole) {
              next = next.substr(0, o.whole);
            }

            if (leave && !o.optional && !next) { next = '0'; }

            if (minus) { next = '-' + next; }

            write = next.replace(endsWithDecRE, '');

            if (o.bind || o.number) {
              if (leave) { setTimeout(writeBack, 5); }
              else if (!o.lazy) { writeBack(); }
            }

            next = "" + (o.prefix || '') + (number(next)) + (o.suffix || '');

            var target = 0;
            var offset = 0;
            var range = [];
            for (var i$1 = 0; i$1 < next.length && target < 2; i$1++) {
              if (numRE.test(next[i$1])) { offset++; }
              if (offset === num[target]) {
                range[target++] = i$1 + 1;
                if (num[target] === offset) { range[target++] = i$1 + 1; }
              }
            }

            if (range.length < 1) { range.push(next.length); }
            if (range.length < 2) { range.push(next.length); }

            node.value = next;
            range.push(dir);
            document.activeElement === node && typeof node.setSelectionRange === 'function' && node.setSelectionRange.apply(node, range);
          }

          function writeBack() {
            if (o.twoway === false) { return; }
            lock = true;
            if (o.bind) {
              var cur = ctx.get(o.bind);
              if (cur === '' && !o.optional) { ctx.set(o.bind, write); }
              else if (+cur !== +write) { ctx.set(o.bind, write); }
            }
            if (o.number) {
              var val = !isNaN(write) ? (write === '' && o.optional ? undefined : +write) : o.optional ? undefined : 0;
              if (ctx.get(o.number) !== val) { ctx.set(o.number, val); }
            }
            lock = false;
          }

          cleanup.push(ctx.listen('input', update).cancel);

          cleanup.push(ctx.listen('blur', function () {
            var cur = node.value.replace(notNumRE, '');
            node.value = cur.replace(endsWithDecRE, '');
            document.activeElement === node && node.setSelectionRange(0, 0);
            leave = true;
            update();
            leave = false;
          }).cancel);

          cleanup.push(ctx.listen('focus', function () {
            var start = node.selectionStart, end = node.selectionEnd;
            if (start === 0 && end === 0) {
              setTimeout(function () {
                var cur = node.value;
                var pos;
                if (!numRE.test(cur)) {
                  pos = (o.prefix || '').length;
                  node.setSelectionRange(pos, pos);
                } else if (decimalRE.test(cur)) {
                  pos = cur.indexOf('.');
                  node.setSelectionRange(pos, pos);
                } else if (numRE.test(cur)) {
                  var i = cur.length;
                  while (i--) {
                    if (numRE.test(cur[i])) {
                      pos = i + 1;
                      node.setSelectionRange(pos, pos);
                      break;
                    }
                  }
                } else {
                  pos = cur.length - (o.suffix || '').length;
                  node.setSelectionRange(pos, pos);
                }
              });
            } else if (start === end) {
              if (start === node.value.length) {
                node.setSelectionRange(0, start);
              } else if ((o.suffix || '').length > 0 && start > node.value.length - o.suffix.length) {
                node.setSelectionRange(start + 1 - o.suffix.length, start + 1 - o.suffix.length);
              }
            }
          }).cancel);

          if (o.bind) {
            cleanup.push(ctx.observe(o.bind, function () {
              if (lock) { return; }
              var cur = ctx.get(o.bind);
              node.value = cur == null ? '' : cur;
              setTimeout(function () {
                leave = true;
                update();
                leave = false;
              }, 1);
            }, { defer: true }).cancel);
          }

          if (o.number) {
            cleanup.push(ctx.observe(o.number, function () {
              if (lock) { return; }
              var cur = ctx.get(o.number);
              node.value = "" + (cur == null ? '' : cur);
              setTimeout(function () {
                leave = true;
                update();
                leave = false;
              }, 1);
            }, { defer: true }).cancel);
          }

          return {
            teardown: function teardown() {
              lock = true;
              cleanup.forEach(function (fn) { return fn(); });
              node.setAttribute('type', type);
              node.className = node.className.replace(/ ?rn-numeric/, '');
            }
          }
        }
      }

      var styled = false;

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          instance.decorators[opts.name || 'numeric'] = numeric(opts);
          if (!styled) {
            styled = true;
            Ractive.addCSS('rn-numeric', "input.rn-numeric { text-align: right; }");
          }
        }
      }

      var NumericInput_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This decorator takes an input and sets it up for display and input of numeric values. It allows specifying number of whole and decimal places, including disallowing decimals entirely.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string ='numeric'` - the name to use when registering the decorator as a plugin\n\n    ### Arguments\n\n    This decorator takes a string or an options object. Passing a string is equivalent to `{ bind: string }`. A second options object can also be passed, allowing a string binding first with additional options set by the following object.\n\n    * `bind: keypath` - a keypath to bind the string version of the number, without prefix or suffix\n    * `number: keypath` - a keypath to use to bind the input value as a number\n    * `optional: boolean = true` - if no number is supplied for a non-optional input, the value with be `0`. For optional inputs, the value will be an empty string and the number will be undefined.\n    * `lazy: boolean = true` - whether or not to immediately update the bound values\n    * `whole: number` - an optional number of whole digits to allow in the input\n    * `decimal: number` - an optional number of decimal digits to all in the input\n    * `preferInteger: boolean = true` - automatically drop `.0+` from the input.\n    * `prefix: string` - optionally prefix the numeric input with a string. Input starts after the prefix and cursor placement is handled automatically.\n    * `suffix: string` - optionally suffix the numeric input with a string. Input starts before the suffix and cursor placement is handled automatically.\n    * `twoway: boolean` - if `false`, will not set the bound value on change, defaults to `true`\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",m:[{n:"grid",t:71}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"row row-s1-4",g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Prefix",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"options.prefix"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Suffix",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"options.suffix"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Whole",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"options.whole"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Decimal",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"options.decimal"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"options.optional"}],t:13}]}," Optional?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"options.lazy"}],t:13}]}," Lazy?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"options.preferInteger"}],t:13}]}," Prefer integer?"]}]}]}," ",{t:7,e:"marked",f:["      Template:\n\n      ```hbs\n      <label as-field>A fistful of digits\n        <input as-numeric=`dollars` />\n      </label>\n      <label as-field>A few digits more\n        <input as-numeric=options />\n      </label>\n      ```\n\n      Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"max-width: 16em; margin: auto;",g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["A fistful of digits ",{t:7,e:"input",m:[{n:"numeric",t:71,f:{r:[],s:"[\"dollars\"]"}}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["A few digits more ",{t:7,e:"input",m:[{n:"numeric",t:71,f:{r:["options"],s:"[_0]"}}]}]}," ",{t:7,e:"dl",m:[{t:13,n:"style",f:"margin-top: 2em;",g:1}],f:[{t:7,e:"dt",f:["A fistful of digits"]}," ",{t:7,e:"dd",f:["​",{t:2,r:"dollars"}]}," ",{t:7,e:"dt",f:["A few digits more"]}," ",{t:7,e:"dd",f:["​",{t:2,r:"custom"}]}]}]}]}]}],e:{"[\"dollars\"]":function (){return(["dollars"]);},"[_0]":function (_0){return([_0]);}}},
        use: [plugin()],
        options: {
          title: 'Decorator :: NumericInput',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            options: {
              number: 'custom',
            }
          }
        }
      }));

    }
  };
});
