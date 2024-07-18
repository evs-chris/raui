System.register(['./chunk2.js', 'ractive'], function (exports, module) {
  'use strict';
  var globalRegister, Ractive$1;
  return {
    setters: [function (module) {
      globalRegister = module.default;
    }, function (module) {
      Ractive$1 = module.default;
    }],
    execute: function () {

      exports('autofocus', autofocus);
      function style(data) {
        var primary = Object.assign({}, data('raui.primary'), data('raui.form.primary'));
        var active = Object.assign({}, data('raui.primary.active'), data('raui.form.primary.active'));
        var disabled = Object.assign({}, data('raui.primary.disabled'), data('raui.form.primary.disabled'));
        var boxy = data('raui.form.boxy');
        return ("\n  label.field, .field-manual {\n    display: inline-block;\n    font-size: 0.9em;\n    font-weight: 500;\n    transition: 0.2s ease-in-out;\n    transition-property: color;\n    vertical-align: top;\n    box-sizing: border-box;\n    padding: 0.25em 0.5em;\n    line-height: 1.5em;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-family: inherit;\n  }\n\n  label.field.textarea {\n    display: block;\n    border: 0.0625em solid " + (primary.bc || '#ccc') + ";\n    padding: 0.5em 0.8em 0.8em 0.8em;\n    border-radius: " + (primary.radius || '0.2em') + ";\n    box-shadow: none;\n    transition-property: color, border-color, box-shadow;\n    margin: 0.8em 0.2em;\n    min-height: auto;\n    background-color: " + (boxy ? primary.bg || '#fff' : 'transparent') + ";\n    color: " + (primary.fg || '#222') + ";\n  }\n\n  label.field.focus {\n    color: " + (active.fg || primary.fga || '#07e') + ";\n  }\n\n  label.field.textarea.focus {\n    border-color: " + (active.fg || primary.fga || '#07e') + ";\n    " + (!boxy ? ("box-shadow: 0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ";") : '') + "\n  }\n\n  label.field input,\n  label.field select,\n  label.field textarea,\n  .field-manual .field-body\n  {\n    display: block;\n    border-width: " + (boxy ? '0.0625em' : '0 0 0.0625em 0') + ";\n    border-color: " + (primary.bc || '#ccc') + ";\n    border-style: solid;\n    box-sizing: border-box;\n    background-color: " + (boxy ? primary.bg || '#fff' : 'transparent') + ";\n    color: " + (primary.fg || '#222') + ";\n    transition: 0.2s ease-in-out;\n    transition-property: box-shadow, color;\n    outline: none;\n    box-shadow: none;\n    width: 100%;\n    margin-bottom: 0.8em;\n    font-size: 1.1em;" + (boxy ? ("\n  border-radius: " + (primary.radius || '0.2em') + ";") : '') + "\n    font-weight: 400;\n    font-family: inherit;\n  }\n\n  label.field input" + (boxy ? '' : ':disabled') + ",\n  label.field select" + (boxy ? '' : ':disabled') + " {\n    padding: 0 0.75em;\n  }\n  label.field select" + (boxy ? '' : ':disabled') + " {\n    padding-right: 2em;\n  }\n\n  label.field input:disabled,\n  label.field input[readonly],\n  label.field select:disabled,\n  label.field textarea:disabled,\n  label.field textarea[readonly] {\n    background: " + (disabled.bg || '#f4f4f4') + ";\n    color: " + (disabled.fg || '#444') + ";\n  }\n\n  label.field textarea {\n    line-height: 1.2em;\n  }\n  label.field .field-wrapper {\n    display: block;\n  }\n  label.field > select, label.field > input,\n  label.field > .field-wrapper > input, label.field > .field-wrapper > select {\n    height: 2.5em;\n  }\n\n  " + (!boxy ? ("label.field:hover > input,\n  label.field:hover select,\n  label.field.file:hover:after {\n    box-shadow: 0 0.0625em 0 0 " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field.textarea:hover {\n    box-shadow: 0.0625em 0.0625em " + (primary.bc || '#ccc') + ",\n      -0.0625em 0.0625em " + (primary.bc || '#ccc') + ",\n      0.0625em -0.0625em " + (primary.bc || '#ccc') + ",\n      -0.0625em -0.0625em " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field.textarea.focus:hover {\n    box-shadow: 0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ";\n  }") : '') + "\n\n  /**** CHECK BOXES ****/\n\n  label.field.check, label.field.radio {\n    position:relative;\n    z-index: 0;\n    overflow: visible;\n    cursor: pointer;\n    padding-top: 2.2em;\n    white-space: normal;\n  }\n  label.field.check.inline, label.field.radio.inline {\n    padding-top: 0.7em;\n  }\n\n  label.field.check input, label.field.radio input {\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    z-index: -1;\n    position: absolute;\n    left: -0.5em;\n    top: 1em;\n    display: block;\n    margin: 0;\n    border-radius: 50%;\n    width: 3.2em;\n    height: 3.2em;\n    background-color: " + (primary.bc || '#ccc') + ";\n    box-shadow: none;\n    outline: none;\n    opacity: 0;\n    transform: scale(1);\n    pointer-events: none;\n    transition: opacity 0.3s, transform 0.2s;\n  }\n  label.field.inline.check input, label.field.inline.radio input {\n    top: -0.45em;\n    left: -0.55em;\n  }\n\n  label.field.check input:checked, label.field.radio input:checked {\n    background-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.check:hover > input, label.field.radio:hover > input {\n    opacity: 0.04;\n  }\n\n  label.field.check input:focus, label.field.radio input:focus {\n    opacity: 0.12;\n  }\n\n  label.field.check:hover > input:focus, label.field.radio:hover > input:focus {\n    opacity: 0.16;\n  }\n\n  label.field.check input:active, label.field.radio input:active {\n    opacity: 0.6;\n    transform: scale(0);\n    transition: transform 0s, opacity 0s;\n  }\n\n  label.field.check:before, label.field.radio:before {\n    content: '';\n    display: inline-block;\n    box-sizing: border-box;\n    margin: 0 0.5em 0.2em 0.1em;\n    border: solid 0.125em; /* Safari */\n    border-color: " + (primary.fg || '#222') + ";\n    border-radius: 0.125em;\n    width: 1.2em;\n    height: 1.2em;\n    vertical-align: bottom;\n    transition: border-color 0.2s, background-color 0.2s;\n  }\n\n  label.field.check:after, label.field.radio:after {\n    content: '';\n    display: inline-block;\n    opacity: 0;\n    position: absolute;\n    width: 1.2em;\n    height: 1.2em;\n    top: 2.3em;\n    left: 0.6em;\n    border-radius: 0.125em;\n  }\n  label.field.check.inline:after, label.field.radio.inline:after {\n    top: 0.8em;\n  }\n\n  label.field.check.checked:after {\n    opacity: 1;\n    background: no-repeat center/80% url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill=\"" + ((primary.bg || '#fff').replace(/#/g, '%23')) + "\" d=\"m 15.378906,1.7050781 a 1.0583349,1.0583349 0 0 0 -1.478515,0.234375 L 6.6210937,11.960938 1.8652344,8.5058594 a 1.0583349,1.0583349 0 0 0 -1.47851565,0.234375 1.0583349,1.0583349 0 0 0 0.234375,1.4785156 L 6.234375,14.294922 A 1.0584408,1.0584408 0 0 0 7.7128906,14.060547 L 15.613281,3.1835938 A 1.0583349,1.0583349 0 0 0 15.378906,1.7050781 Z\" /></svg>') " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.radio.checked:after {\n    opacity: 1;\n    background: no-repeat center/80% url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><circle fill=\"" + ((primary.bg || '#fff').replace(/#/g, '%23')) + "\" cx=\"8\" cy=\"8\" r=\"5\" /></svg>') " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.check.checked:before, label.field.radio.checked:before {\n    border-color: " + (primary.fga || '#07e') + ";\n  }\n  label.field.check.focus:before, label.field.radio.focus:before {\n    border-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.check input:disabled, label.field.radio input:disabled {\n    opacity: 0;\n  }\n\n  label.field.check.disabled, label.field.radio.disabled {\n    color: " + (disabled.fg || '#444') + ";\n    cursor: initial;\n  }\n\n  label.field.check.disabled:before, label.field.radio.disabled:before {\n    border-color: " + (disabled.bc || '#ccc') + ";\n    background-color: " + (disabled.bg || '#f4f4f4') + ";\n  }\n\n  label.field.check.checked.disabled:after, label.field.radio.checked.disabled:after {\n    border-color: transparent;\n    background-color: " + (disabled.bc || '#ccc') + ";\n  }\n\n  label.field select {\n    padding-right: 2em;\n  }\n\n  label.field.select {\n    cursor: pointer;\n    position: relative;\n  }\n\n  label.field.select:after {\n    content: ' ';\n    position: absolute;\n    display: block;\n    width: 0.6em;\n    right: 1.125em;\n    height: 0.6em;\n    top: 2.6em;\n    border-bottom: 0.125em solid;\n    border-right: 0.125em solid;\n    transform: rotate(45deg);\n    pointer-events: none;\n    color: " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field textarea {\n    border: none;" + (boxy ? "\n    padding: 0;" : '') + "\n  }\n\n  label.field > select {\n    -moz-appearance: none;\n    -webkit-appearance: none;\n  }\n\n  label.field input:focus,\n  label.field select:focus,\n  label.field.file.focus:after\n  {\n    border-color: " + (active.fg || primary.fga || '#07e') + ";\n    " + (!boxy ? ("box-shadow: 0 0.0625em 0 0 " + (active.fg || primary.fga || '#07e') + ";") : '') + "\n  }\n\n  label.field input[type=checkbox]:focus,\n  label.field input[type=radio]:focus {\n    box-shadow: none;\n  }\n\n  label.field.file.focus:after {\n    color: " + (active.fg || primary.fga || '#07e') + ";\n  }\n  label.field.file [type=file] {\n    position: absolute;\n    width: 0;\n    height: 0;\n    opacity: 0;\n    z-index: -1;\n  }\n  label.field.file {\n    position: relative;\n    min-width: 9em;\n    height: 5em;\n  }\n  label.field.file:after {\n    position: absolute;\n    content: 'Choose a file';\n    box-sizing: border-box;\n    width: calc(100% - 0.3em);\n    height: 2.5em;\n    font-size: 1.1em;\n    line-height: 1.5em;\n    color: " + (primary.fg || '#222') + ";\n    text-align: " + (boxy ? 'center' : 'left') + ";\n    padding: 0.5em " + (boxy ? '0.5em' : '0') + ";\n    cursor: pointer;\n    font-style: oblique;\n    left: 0.25em;\n    top: 1.6em;\n    transition: 0.2s ease-in-out;\n    transition-property: color, border-bolor, box-shadow;" + (boxy ? ("\n    border-radius: " + (primary.radius || '0.2em') + ";\n    border-color: " + (primary.bc || '#ccc') + ";\n    border-style: solid;\n    border-width: 0.0625em;") : ("\n    border-bottom-color: " + (primary.bc || '#ccc') + ";\n    border-bottom-width: 0.0625em;\n    border-bottom-style: solid;\n    ")) + "\n  }\n  label.field.file.inline:after {\n    top: 0.2em;\n  }\n\n  label.field.button {\n    vertical-align: top;\n    padding-top: " + (boxy ? '1.7' : '1.958') + "em;\n  }\n  label.field .with-buttons button, label.field.button button {\n    font-size: 1.1em;\n    margin-top: " + (boxy ? '0.15em' : '0') + ";\n  }\n\n  label.field .field-wrapper.with-buttons {\n    display: flex;\n  }\n  label.field .with-buttons button {\n    flex-shrink: 0;\n    padding-left: 0.5em;\n    padding-right: 0.5em;\n    margin-top: 0;\n    margin-right: 0;\n    " + (boxy ? ("height: 2.5em;\n    box-shadow: none;\n    border-radius: 0;\n    border-left: 1px solid " + (primary.bg || '#fff') + ";\n    margin-left: 0;") : 
          "height: 2.25em;") + "\n  }" + (boxy ? ("\n  label.field .with-buttons button:first-of-type {\n    margin-left: -0.05em;\n    border-left: none;\n  }\n  label.field .with-buttons button:last-of-type {\n    border-radius: 0 " + (primary.radius || '0.2em') + " " + (primary.radius || '0.2em') + " 0;\n  }\n  label.field .with-buttons input {\n    border-radius: " + (primary.radius || '0.2em') + " 0 0 " + (primary.radius || '0.2em') + ";\n    min-width: 0;\n  }\n  ") : '') + "\n\n  label.field.plain > div {\n    position: absolute;\n    font-size: 1.1em;\n    top: 2.4em;\n    font-weight: normal;\n  }\n\n  /* inline fields (no labels) */\n  label.field.inline {\n    min-height: 3.3em;\n  }\n\n  label.field.button.inline {\n    margin-top: 0.2em;\n    padding-top: 0.12em;\n  }\n\n  label.field.button.inline button {\n    margin-top: 0;\n  }\n\n  label.field.inline.select:after {\n    top: 1." + (boxy ? '15' : '1') + "em;\n  }\n\n  label.field .field-tip {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    background-color: " + (primary.fga || '#07e') + ";\n    color: " + (primary.bg || '#fff;') + ";\n    cursor: default;\n    user-select: none;\n    border-radius: 1em;\n    margin-left: 0.5em;\n    line-height: 1.2em;\n    text-align: center;\n    margin-top: -0.2em;\n  }\n\n  label.field .field-solo-tip {\n    margin-left: -0.1em;\n  }\n  ");
        // TODO: other themes
      }

      function noop() {}

      function focused(ev) {
        if (!~this.className.indexOf('focus')) { this.className += ' focus'; }
      }

      function blurred(ev) {
        this.className = this.className.replace(/\bfocus\b/g, '').trim();
      }

      function field$1(node) {
        var ctx = this.getContext(node);

        var isField, isCheck, isRadio, isArea, isSelect, isFile, isButton, isPlain, isInput;
        var change, attrs, desc, last;

        function invalidate() {
          var val = setup().split(/\s+/).filter(function (c) { return !!c; });

          isField = !!~val.indexOf('field');
          if (!isField) {
            val.push('field');
            isField = true;
          }

          isCheck = node.querySelector('input[type=checkbox]');
          if (isCheck && !~val.indexOf('check')) { val.push('check'); }

          isRadio = node.querySelector('input[type=radio]');
          if (isRadio && !~val.indexOf('radio')) { val.push('radio'); }

          var checkable = (isCheck || isRadio);
          if (checkable && checkable.checked && !~val.indexOf('checked')) { val.push('checked'); }
          if (checkable && checkable.disabled && !~val.indexOf('disabled')) { val.push('disabled'); }

          if (!checkable && change) {
            change.cancel();
            change = 0;
            if (attrs) {
              attrs.disconnect();
              attrs = 0;
            }
            delete checkable._form_callback;
            if (last) {
              delete last.checked;
              desc = last = undefined;
            }
          } else if (checkable) {
            checkable._form_callback = function (ev, init) {
              if ( init === void 0 ) init = true;

              if (init && checkable.type === 'radio' && checkable.name) {
                var list = [];
                list.push.apply(list, document.querySelectorAll(("input[type=radio][name=" + (checkable.name) + "]")));
                list = list.filter(function (i) { return i !== checkable; });
                list.forEach(function (l) { return l._form_callback && l._form_callback(ev, false); });
              }

              var checked = checkable.checked;
              if (checked && !~node.className.indexOf('checked')) { node.className += ' checked'; }
              else if (!checked && ~node.className.indexOf('checked')) { node.className = node.className.replace(/\bchecked\b/g, '').replace(/ +/g, ' ').trim(); }
            };

            if (MutationObserver) {
              attrs = new MutationObserver(function () {
                var val;
                val = checkable.disabled;
                if (val && !~node.className.indexOf('disabled')) { node.className += ' disabled'; }
                else if (!val && ~node.className.indexOf('disabled')) { node.className = node.className.replace(/\bdisabled\b/g, '').replace(/ +/g, ' ').trim(); }
              });
              attrs.observe(checkable, { attributes: true });
            }

            change = this.getContext(checkable).listen('change', checkable._form_callback);

            desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(checkable), 'checked');
            if (desc && desc.configurable) {
              last = checkable;
              Object.defineProperty(checkable, 'checked', {
                get: desc.get,
                set: function set(v) {
                  desc.set.call(last, v);
                  checkable._form_callback();
                },
                enumerable: true,
                configurable: true
              });
            }
          }

          isArea = !!node.querySelector('textarea');
          if (isArea && !~val.indexOf('textarea')) { val.push('textarea'); }

          isSelect = !!node.querySelector('select');
          if (isSelect && !~val.indexOf('select')) { val.push('select'); }

          isFile = !!node.querySelector('input[type=file]');
          if (isFile && !~val.indexOf('file')) { val.push('file'); }

          isButton = node.querySelector('button');
          isButton = !!isButton && isButton.parentNode === node;
          if (isButton && !~val.indexOf('button')) { val.push('button'); }

          isPlain = !!node.querySelector('div');
          if (isPlain && !~val.indexOf('plain')) { val.push('plain'); }

          isInput = !isCheck && !isRadio && !isFile && !!node.querySelector('input');
          if (isInput && !~val.indexOf('input')) { val.push('input'); }

          node.className = val.join(' ');
        }

        function setup() {
          var cls = node.className;

          if (!isField) { cls = cls.replace(/\bfield\b/g, '').trim(); }
          if (!isCheck) { cls = cls.replace(/\bcheck(ed)?\b/g, '').trim(); }
          if (!isRadio) { cls = cls.replace(/\bradio\b/g, '').trim(); }
          if (!isArea) { cls = cls.replace(/\btextarea\b/g, '').trim(); }
          if (!isSelect) { cls = cls.replace(/\bselect\b/g, '').trim(); }
          if (!isFile) { cls = cls.replace(/\bfile\b/g, '').trim(); }
          if (!isButton) { cls = cls.replace(/\bbutton\b/g, '').trim(); }
          if (!isPlain) { cls = cls.replace(/\bplain\b/g, '').trim(); }
          if (!isInput) { cls = cls.replace(/\binput\b/g, '').trim(); }
          cls = cls.replace(/  +/g, ' ');

          return cls;
        }

        var focus = ctx.listen('focusin', focused);
        var blur = ctx.listen('focusout', blurred);

        invalidate.call(this);

        var res = {
          update: noop,
          invalidate: invalidate.bind(this),
          teardown: function teardown() {
            ctx.ractive.fire('fieldUnregistered', ctx, node, res);
            var cls = setup();
            cls = cls.replace(/\bfocus\b/g, '').trim();

            focus.cancel();
            blur.cancel();
            change && change.cancel();
            if (attrs) { attrs.disconnect(); }
            if (last) {
              delete last.checked;
              desc = last = undefined;
            }

            node.className = cls;
          },
          setDisabled: function setDisabled(v) {
            var children = node.querySelectorAll('input,button,select,textarea');
            children.forEach(function (c) { return c.disabled = v; });
            this.invalidate();
          },
        };

        ctx.ractive.fire('fieldRegistered', ctx, node, res);

        return res;
      }

      field$1.style = style;

      function findDeep(els, el) {
        if (!els) { return false; }
        for (var i = 0; i < els.length; i++) {
          if (els[i].e === el) { return true; }
          if (els[i].f && findDeep(els[i].f, el)) { return true; }
        }
        return false;
      }

      var macro = Ractive$1.macro(function (handle) {
        var body = [];
        var label = [];
        var attrs = (handle.template.m || []).slice();
        var content = handle.template.f || [];

        // TODO: special field types
        var value = attrs.find(function (a) { return a.n === 'value'; });
        var type = attrs.find(function (a) { return a.n === 'type'; });
        var tip = attrs.find(function (a) { return a.n === 'tip'; });
        var disabled = attrs.find(function (a) { return a.n === 'disabled'; });
        var maxlength = attrs.find(function (a) { return a.n === 'maxlength'; });
        if (tip) { attrs.splice(attrs.indexOf(tip), 1); }

        if (type && typeof macro.types[type.f] === 'function') {
          body.push.apply(body, macro.types[type.f](attrs, content, handle));
        } else if (value) {
          var el = {
            t: 7, e: 'input', m: [value]
          };
          if (disabled) { el.m.push(disabled); }
          if (maxlength) { el.m.push(maxlength); }
          // watch for select
          if (findDeep(content, 'option')) {
            el.e = 'select';
            el.f = content;
          }
          if (type) {
            el.m.push(type);
            if (type.f === 'checkbox' || type.f === 'radio') {
              var target = attrs.find(function (a) { return a.n === 'target'; });
              if (target) { el.m.push(Object.assign({}, target, { n: 'name' })); }
              else { el.m.splice(el.m.indexOf(value), 1, Object.assign({}, value, { n: 'checked' })); }
            }
          }
          el.m = el.m.concat(attrs.filter(function (a) { return a.t === 73 || a.t === 73 || a.n === 'placeholder'; }));
          body.push(el);

          var btns = content.filter(function (e) { return e.e === 'button' || findDeep(e.f, 'button'); });
          if (btns.length) {
            body.push.apply(body, btns);
            body = [{
              t: 7, e: 'span', m: [
                { t: 13, n: 'class', f: 'field-wrapper with-buttons', g: 1 }
              ],
              f: body
            }];
          }
        } else { // mostly passthru
          // check for button wrapping
          content.forEach(function (e) {
            if (e.e === 'label') {
              if (e.f && e.f.length) { label.push.apply(label, e.f); }
            } else {
              body.push(e);
            }
          });
          var els = content.filter(function (e) { return e.e; });
          if (els.find(function (e) { return e.e === 'button'; }) && els.length > 1) {
            body = [{
              t: 7, e: 'span', m: [
                { t: 13, n: 'class', f: 'field-wrapper with-buttons', g: 1 }
              ],
              f: body
            }];
          }
        }

        var labelattr = attrs.find(function (a) { return a.n === 'label'; });
        if (labelattr && labelattr.f && labelattr.f.length) { label.push.apply(label, Array.isArray(labelattr.f) ? labelattr.f : [labelattr.f]); }
        if (tip) { body.unshift({
          t: 7, e: 'span', m: [
            { t: 13, n: 'class', f: ("field-tip" + (!label.length ? ' field-solo-tip' : '')), g: 1 },
            { t: 13, n: 'title', f: tip.f },
            { t: 70, n: ['click'], f: { r: [], s: '[false]' } }
          ],
          f: '?'
        }); }
        var inline = attrs.find(function (a) { return a.n === 'inline'; });
        if (label && !inline) { body.unshift.apply(body, label); }
        else if (!inline) { body.unshift('\xa0'); }

        var outer = {
          t: 7, e: 'label', m: [{ t: 71, n: 'field' }].concat(attrs.filter(function (a) { return (a.t !== 13 && a.t !== 73) || (a.n !== 'value' && a.n !== 'type' && a.n !== 'inline' && a.n !== 'label' && a.n !== 'placeholder' && a.n !== 'target' && a.n !== 'disabled'); })),
          f: body
        };

        if (inline) { outer.m.push({ t: 13, n: 'class', f: 'inline' }); }

        handle.setTemplate([outer]);
      });

      macro.types = {};

      function autofocus(node, opts) {
        if (typeof node.focus === 'function' && !node.disabled) {
          if (opts && opts.immediate) { node.focus(); }
          else { setTimeout(function () { return !node.disabled && node.focus(); }, (opts || {}).timeout || 250); }
        }
        return { teardown: noop };
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          // if an extension, offer to include style
          if (!Ractive.isInstance(instance)) {
            if (opts.includeStyle) {
              // handle global use
              if (instance === Ractive) {
                Ractive.addCSS('form-decorator', style);
              } else {
                var css = instance.css;
                instance.css = function(data) {
                  var res = typeof css !== 'function' ? (css || '') : css(data);
                  return res + style(data);
                };
              }
            }
          }

          instance.partials[opts.name || 'field'] = macro;
          instance.decorators[opts.name || 'field'] = field$1;
          instance.decorators[opts.autofocusName || 'autofocus'] = autofocus;
        }
      }

      globalRegister('field', 'decorators', field$1);
      globalRegister('field', 'partials', macro);
      globalRegister('autofocus', 'decorators', autofocus);
      exports('default', plugin);

    }
  };
});
