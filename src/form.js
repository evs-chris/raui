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
    padding: 0.8em 0.5em;
  }

  label.field.textarea {
    display: block;
    border: 1px solid ${data('form.color.accent') || data('fg1') || '#222'};
    padding: 0.5em 0.8em 0.8em 0.8em;
    border-radius: 2px;
    box-shadow: none;
    transition-property: color, border-color, box-shadow;
    margin: 0.8em 0.2em;
    min-height: auto;
  }

  label.field.inline {
    padding-top: 3em;
    cursor: pointer;
  }

  label.field.focus {
    color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }

  label.field.textarea.focus {
    border-color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
    box-shadow: 1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }

  label.field > input,
  label.field > select,
  label.field > textarea
  {
    display: block;
    border-width: 0 0 0.0625em 0;
    border-color: ${data('form.color.accent') || data('fg1') || '#222'};
    border-style: solid;
    background-color: transparent;
    transition: 0.2s ease-in-out;
    transition-property: box-shadow, color;
    outline: none;
    padding: 0.5em 0;
    box-shadow: none;
    width: 100%;
    margin-bottom: 0.8em;
    font-size: 1.2em;
  }
  label.field > select {
    height: 2.22em;
    box-sizing: border-box;
  }

  label.field:hover > input,
  label.field:hover > select,
  label.field.file:hover:after {
    box-shadow: 0 1px 0 0 ${data('form.color.accent') || data('fg1') || '#222'};
  }
  label.field.inline:hover > input:before,
  label.field.textarea:hover {
    box-shadow: 1px 1px ${data('form.color.accent') || data('fg1') || '#222'},
      -1px 1px ${data('form.color.accent') || data('fg1') || '#222'},
      1px -1px ${data('form.color.accent') || data('fg1') || '#222'},
      -1px -1px ${data('form.color.accent') || data('fg1') || '#222'};
  }
  label.field.textarea.focus:hover {
    box-shadow: 1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px -1px ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }
  label.field.inline:hover > input:checked:before {
    box-shadow: 0px 1px ${data('form.color.accent') || data('fg1') || '#222'},
      -1px 0px ${data('form.color.accent') || data('fg1') || '#222'};
  }
  label.field.inline.focus:hover > input:checked:before {
    box-shadow: 0px 1px ${data('form.color.accentActive') || data('fga1') || '#07e'},
      -1px 0px ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }

  label.field > textarea {
    font-size: 1.4em;
    border: none;
  }

  label.field.inline > input {
    width: auto;
    float: left;
    width: 0;
    margin-right: 1.5em;
  }

  label.field.inline > input:before {
    content: '';
    display: block;
    border: 1px solid ${data('fg1')};
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    transition: 0.2s ease-in-out;
    transition-property: transform, border-color, height, width, box-shadow;
    margin-top: -0.125em;
  }

  label.field.inline.focus > input:before {
    border-color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
  }

  label.field.inline > input:checked:before {
    height: 0.7em;
    width: 1.3em;
    border-width: 2px;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-50deg);
  }

  label.field > input:focus,
  label.field > select:focus,
  label.field.file.focus:after
  {
    border-color: ${data('form.color.accentActive') || data('fga1') || '#07e'};
    box-shadow: 0 1px 0 0 ${data('form.color.accentActive') || data('fga1') || '#07e'};
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
    padding: 0.5em 0;
    cursor: pointer;
    font-style: oblique;
    left: 0.5em;
    bottom: 1.78em;
    transition: 0.2s ease-in-out;
    transition-property: color, border-bolor, box-shadow;
  }

  label.field.button > button {
    position: relative;
    top: 1.2em;
    font-size: 1.2em;
  }

  label.field.plain > div {
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

  const isField = !!~node.className.indexOf('field');
  if (!isField) cls.push('field');

  const isCheck = !!node.querySelector('input[type=checkbox], input[type=radio]');
  if (isCheck) cls.push('inline');

  const isArea = !!node.querySelector('textarea');
  if (isArea) cls.push('textarea');

  const isFile = !!node.querySelector('input[type=file]');
  if (isFile) cls.push('file');

  const isButton = !!node.querySelector('button');
  if (isButton) cls.push('button');

  const isPlain = !!node.querySelector('div');
  if (isPlain) cls.push('plain');

  const focus = ctx.listen('focusin', focused);
  const blur = ctx.listen('focusout', blurred);

  node.className += (node.className.length ? ' ' : '') + cls.join(' ');

  return {
    update: noop,
    teardown() {
      let cls = node.className;

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

export function autofocus(node) {
  if (typeof node.focus === 'function') node.focus();
  return { teardown: noop };
}

globalRegister('field', 'decorators', field);
globalRegister('autofocus', 'decorators', autofocus);
