import globalRegister from './globalRegister';

export function style(data) {
  return `
  label.field {
    display: inline-block;
    font-size: 0.8em;
    color: ${data('form.color.accent') || data('fg1') || '#222'};
    min-height: 6.5em;
    transition: 0.2s ease-in-out;
    transition-property: color;
    vertical-align: middle;
    box-sizing: border-box;
    padding: ${data('form.boxy') ? '0.8em 1em' : '0.8em 0.5em'};
  }

  label.field.textarea {
    display: block;
    border: 1px solid ${data('form.color.accent') || data('fg1') || '#222'};
    padding: 0.5em 0.8em 0.8em 0.8em;
    border-radius: 2px;
    box-shadow: none;
    transition-property: color, border-color, box-shadow;
  label.field.check.focus > input:before  margin: 0.8em 0.2em;
    min-height: auto;
  }

  label.field.focus {
    color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }

  label.field.textarea.focus {
    border-color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
    ${!data('form.boxy') ? `box-shadow: 1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'};` : ''}
  }

  label.field input,
  label.field select,
  label.field textarea
  {
    display: block;
    border-width: ${data('form.boxy') ? '0.0625em' : '0 0 0.0625em 0'};
    border-color: ${data('form.color.accent') || data('fg1') || '#222'};
    border-style: solid;
    box-sizing: border-box;
    background-color: transparent;
    transition: 0.2s ease-in-out;
    transition-property: box-shadow, color;
    outline: none;
    ${data('form.boxy') ? 'padding: 0.7em 1.5em 0.7em 0.7em;' : ''}
    box-shadow: none;
    width: 100%;
    margin-bottom: 0.8em;
    font-size: 1.2em;${data('form.boxy') ? '\n  border-radius: 0.2em;' : ''}
  }
  ${!data('form.boxy') ? `label.field > select, label.field > input {
    height: 2.5em;
  }` : ''}

  ${!data('form.boxy') ? `label.field:hover > input,
  label.field:hover select,
  label.field.file:hover:after {
    box-shadow: 0 1px 0 0 ${data('form.color.accent') || data('fg1') || '#222'};
  }
  label.field.check:hover input:before,
  label.field.radio:hover input:before,
  label.field.textarea:hover {
    box-shadow: 1px 1px ${data('form.color.accent') || data('fg1') || '#222'},
      -1px 1px ${data('form.color.accent') || data('fg1') || '#222'},
      1px -1px ${data('form.color.accent') || data('fg1') || '#222'},
      -1px -1px ${data('form.color.accent') || data('fg1') || '#222'};
  }
  label.field.check.focus input:before,
  label.field.radio.focus input:before {
    box-shadow: 1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }
  label.field.textarea.focus:hover {
    box-shadow: 1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }
  label.field.check input:checked:before,
  label.field.radio input:checked:before {
    box-shadow: 0px 1px ${data('form.color.accent') || data('fg1') || '#222'},
      -1px 0px ${data('form.color.accent') || data('fg1') || '#222'};
  }
  label.field.check.focus input:checked:before,
  label.field.radio.focus input:checked:before {
    box-shadow: 0px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 0px ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }` : ''}

  label.field.check, label.field.radio {
    padding-top: 2.75em;
    cursor: pointer;
  }

  label.field.check input, label.field.radio input {
    width: 1em;
    height: 1em;
    border: none;
    margin-right: 1em;
    float: left;
    box-shadow: none;
  }

  label.field select {
    padding-right: 2em;
  }

  label.field.select {
    cursor: pointer;
    position: relative;
  }

  label.field.select:after {
    content: ' ';
    position: absolute;
    display: block;
    width: 0.6em;
    height: 0.6em;
    right: 1em;
    top: 3.25em;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    pointer-events: none;
  }

  label.field textarea {
    font-size: 1.4em;
    border: none;
  }

  label.field.check input:before,
  label.field.radio input:before {
    content: '';
    display: block;
    border: 1px solid ${data('form.color.accent') || data('fg1') || '#222'};
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    transition: 0.2s ease-in-out;
    transition-property: transform, border-color, height, width, box-shadow;
    margin-top: -0.125em;
  }

  label.field.check.focus input:before,
  label.field.radio.focus input:before {
    border-color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }

  label.field.check input:checked:before,
  label.field.radio input:checked:before {
    height: 0.7em;
    width: 1.3em;
    border-width: 2px;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-50deg);
  }

  label.field.check input,
  label.field > select {
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  label.field input:focus,
  label.field select:focus,
  label.field.file.focus:after
  {
    border-color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
    ${!data('form.boxy') ? `box-shadow: 0 1px 0 0 ${data('form.color.accentActive') || data('fga1') || '#07e'};` : ''}
  }

  label.field input[type=checkbox]:focus,
  label.field input[type=radio]:focus {
    box-shadow: none;
  }

  label.field.file.focus:after {
    color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }
  label.field.file [type=file] {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }
  label.field.file:after {
    position: absolute;
    content: 'Choose a file';
    width: calc(100% - 1em);
    height: 1.22em;
    color: ${data('form.color.accent') || data('fg1') || '#222'};
    border-color: ${data('form.color.accent') || data('fg1') || '#222'};
    border-bottom-style: solid;
    border-bottom-width: 0.0625em;
    text-align: center;
    padding: 1em 0;
    cursor: pointer;
    font-style: oblique;
    left: 0.5em;
    bottom: 1.78em;
    transition: 0.2s ease-in-out;
    transition-property: color, border-bolor, box-shadow;
  }

  label.field.button button {
    position: relative;
    top: 1.2em;
    font-size: 1.2em;
  }

  label.field.plain div {
    position: absolute;
    font-size: 1.2em;
    top: 2.28em;
  }
  `;
}

function noop() {}

function focused(ev) {
  if (!~this.className.indexOf('focus')) this.className += ' focus';
}

function blurred(ev) {
  this.className = this.className.replace(/\bfocus\b/, '').trim();
}

export function field(node) {
  const ctx = this.getContext(node);
  let cls = [];

  let isField, isCheck, isRadio, isArea, isSelect, isFile, isButton, isPlain, isInput;

  function invalidate() {
    setup();

    isField = !!~node.className.indexOf('field');
    if (!isField) cls.push('field');

    isCheck = !!node.querySelector('input[type=checkbox]');
    if (isCheck) cls.push('check');

    isRadio = !!node.querySelector('input[type=radio]');
    if (isRadio) cls.push('radio');

    isArea = !!node.querySelector('textarea');
    if (isArea) cls.push('textarea');

    isSelect = !!node.querySelector('select');
    if (isSelect) cls.push('select');

    isFile = !!node.querySelector('input[type=file]');
    if (isFile) cls.push('file');

    isButton = !!node.querySelector('button');
    if (isButton) cls.push('button');

    isPlain = !!node.querySelector('div');
    if (isPlain) cls.push('plain');

    isInput = !isCheck && !isRadio && !isFile && !!node.querySelector('input');
    if (isInput) cls.push('input');

    node.className += (node.className.length ? ' ' : '') + cls.join(' ');
  }

  function setup() {
    let cls = node.className;

    if (!isField) cls = cls.replace(/\bfield\b/, '').trim();
    if (isCheck) cls = cls.replace(/\bcheck\b/, '').trim();
    if (isRadio) cls = cls.replace(/\bradio\b/, '').trim();
    if (isArea) cls = cls.replace(/\btextarea\b/, '').trim();
    if (isSelect) cls = cls.replace(/\bselect\b/, '').trim();
    if (isFile) cls = cls.replace(/\bfile\/b/, '').trim();
    if (isButton) cls = cls.replace(/\bbutton\/b/, '').trim();
    if (isPlain) cls = cls.replace(/\bplain\/b/, '').trim();
    
    node.className = cls;
  }

  const focus = ctx.listen('focusin', focused);
  const blur = ctx.listen('focusout', blurred);

  invalidate();

  return {
    update: noop,
    invalidate,
    teardown() {
      let cls = node.className;
      setup();
      cls = cls.replace(/\bfocus\b/, '').trim();

      focus.cancel();
      blur.cancel();

      node.className = cls;
    }
  }
}

field.style = style;

export function autofocus(node) {
  if (typeof node.focus === 'function') node.focus();
  return { teardown: noop };
}

export function plugin(opts = {}) {
  return function({ Ractive, instance }) {
    // if an extension, offer to include style
    if (!Ractive.isInstance(instance)) {
      if (opts.includeStyle) {
        // handle global use
        if (instance === Ractive) {
          Ractive.addCSS('form-decorator', style);
        } else {
          const css = instance.css;
          instance.css = function(data) {
            const res = typeof css !== 'function' ? (css || '') : css(data);
            return res + style(data);
          }
        }
      }
    }

    instance.decorators[opts.name || 'field'] = field;
    instance.decorators[opts.autofocusName || 'autofocus'] = autofocus;
  }
}

globalRegister('field', 'decorators', field);
globalRegister('autofocus', 'decorators', autofocus);

export default plugin;