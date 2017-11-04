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

function style(data) {
  return ("\n  label.field {\n    display: inline-block;\n    font-size: 0.8em;\n    color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    min-height: 6.5em;\n    transition: 0.2s ease-in-out;\n    transition-property: color;\n    vertical-align: middle;\n    box-sizing: border-box;\n    padding: 0.8em 0.5em;\n  }\n\n  label.field.textarea {\n    width: 100%;\n    border: 1px solid " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    padding: 0.5em 0.8em 0.8em 0.8em;\n    border-radius: 2px;\n    box-shadow: none;\n    transition-property: color, border-color, box-shadow;\n    margin: 0.8em 0.2em;\n  }\n\n  label.field.inline {\n    padding-top: 3em;\n    cursor: pointer;\n  }\n\n  label.field.focus {\n    color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.textarea.focus {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n    box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field > input,\n  label.field > select,\n  label.field > textarea\n  {\n    display: block;\n    border-width: 0 0 0.0625em 0;\n    border-color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-style: solid;\n    background-color: transparent;\n    transition: 0.2s ease-in-out;\n    transition-property: box-shadow, color;\n    outline: none;\n    padding: 0.5em 0;\n    box-shadow: none;\n    width: 100%;\n    margin-bottom: 0.8em;\n    font-size: 1.2em;\n  }\n  label.field > select {\n    height: 2.22em;\n    box-sizing: border-box;\n  }\n\n  label.field:hover > input,\n  label.field:hover > select,\n  label.field.file:hover:after {\n    box-shadow: 0 1px 0 0 " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.inline:hover > input:before,\n  label.field.textarea:hover {\n    box-shadow: 1px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      1px -1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px -1px " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.textarea.focus:hover {\n    box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.inline:hover > input:checked:before {\n    box-shadow: 0px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px 0px " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.inline.focus:hover > input:checked:before {\n    box-shadow: 0px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 0px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field > textarea {\n    font-size: 1.4em;\n    border: none;\n  }\n\n  label.field.inline > input {\n    width: auto;\n    float: left;\n    width: 0;\n    margin-right: 1.5em;\n  }\n\n  label.field.inline > input:before {\n    content: '';\n    display: block;\n    border: 1px solid " + (data('fg1')) + ";\n    width: 1em;\n    height: 1em;\n    box-sizing: border-box;\n    transition: 0.2s ease-in-out;\n    transition-property: transform, border-color, height, width, box-shadow;\n    margin-top: -0.125em;\n  }\n\n  label.field.inline.focus > input:before {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.inline > input:checked:before {\n    height: 0.7em;\n    width: 1.3em;\n    border-width: 2px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    transform: rotate(-50deg);\n  }\n\n  label.field > input:focus,\n  label.field > select:focus,\n  label.field.file.focus:after\n  {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n    box-shadow: 0 1px 0 0 " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.file.focus:after {\n    color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.file [type=file] {\n    position: absolute;\n    width: 0;\n    height: 0;\n    opacity: 0;\n    z-index: -1;\n  }\n  label.field.file:after {\n    position: absolute;\n    content: 'Choose a file';\n    width: calc(100% - 1em);\n    height: 1.22em;\n    color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-bottom-style: solid;\n    border-bottom-width: 0.0625em;\n    text-align: center;\n    padding: 0.5em 0;\n    cursor: pointer;\n    font-style: oblique;\n    left: 0.5em;\n    bottom: 1.78em;\n    transition: 0.2s ease-in-out;\n    transition-property: color, border-bolor, box-shadow;\n  }\n\n  label.field.button > button {\n    position: relative;\n    top: 1.2em;\n    font-size: 1.2em;\n  }\n\n  label.field.plain > div {\n    position: absolute;\n    font-size: 1.2em;\n    top: 2.28em;\n  }\n  ");
}

function noop() {}

function focused(ev) {
  if (!~this.className.indexOf('focus')) { this.className += ' focus'; }
}

function blurred(ev) {
  this.className = this.className.replace(/\bfocus\b/, '').trim();
}

function field(node) {
  var ctx = this.getContext(node);
  var cls = [];

  var isField = !!~node.className.indexOf('field');
  if (!isField) { cls.push('field'); }

  var isCheck = !!node.querySelector('input[type=checkbox], input[type=radio]');
  if (isCheck) { cls.push('inline'); }

  var isArea = !!node.querySelector('textarea');
  if (isArea) { cls.push('textarea'); }

  var isFile = !!node.querySelector('input[type=file]');
  if (isFile) { cls.push('file'); }

  var isButton = !!node.querySelector('button');
  if (isButton) { cls.push('button'); }

  var isPlain = !!node.querySelector('div');
  if (isPlain) { cls.push('plain'); }

  var focus = ctx.listen('focusin', focused);
  var blur = ctx.listen('focusout', blurred);

  node.className += (node.className.length ? ' ' : '') + cls.join(' ');

  return {
    update: noop,
    teardown: function teardown() {
      var cls = node.className;

      if (!isField) {
        cls = cls.replace(/\bfield\b/, '').trim();
      }

      if (isCheck) {
        cls = cls.replace(/\binline\b/, '').trim();
      }

      if (isArea) {
        cls = cls.replace(/\btextarea\b/, '').trim();
      }

      if (isFile) {
        cls = cls.replace(/\bfile\/b/, '').trim();
      }

      if (isButton) {
        cls = cls.replace(/\bbutton\/b/, '').trim();
      }

      if (isPlain) {
        cls = cls.replace(/\bplain\/b/, '').trim();
      }

      focus.cancel();
      blur.cancel();

      node.className = cls;
    }
  }
}

field.style = style;

globalRegister('field', 'decorators', field);

export { style, field };
