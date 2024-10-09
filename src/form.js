import globalRegister from './globalRegister';
import Ractive from 'ractive';

export function style(data) {
  const primary = Object.assign({}, data('raui.primary'), data('raui.form.primary'));
  const active = Object.assign({}, data('raui.primary.active'), data('raui.form.primary.active'));
  const disabled = Object.assign({}, data('raui.primary.disabled'), data('raui.form.primary.disabled'));
  const boxy = data('raui.form.boxy');
  return `
  label.field, .field-manual {
    display: inline-block;
    font-size: 0.9em;
    font-weight: 500;
    transition: 0.2s ease-in-out;
    transition-property: color;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0.25em 0.5em;
    line-height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: inherit;
  }

  label.field.textarea {
    display: block;
    border: 0.0625em solid ${primary.bc || '#ccc'};
    padding: 0.5em 0.8em 0.8em 0.8em;
    border-radius: ${primary.radius || '0.2em'};
    box-shadow: none;
    transition-property: color, border-color, box-shadow;
    margin: 0.8em 0.2em;
    min-height: auto;
    background-color: ${boxy ? primary.bg || '#fff' : 'transparent'};
    color: ${primary.fg || '#222'};
  }

  label.field.focus {
    color: ${active.fg || primary.fga || '#07e'};
  }

  label.field.textarea.focus {
    border-color: ${active.fg || primary.fga || '#07e'};
    ${!boxy ? `box-shadow: 0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      0.0625em -0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em -0.0625em ${active.fg || primary.fga || '#07e'};` : ''}
  }

  label.field input,
  label.field select,
  label.field textarea,
  .field-manual .field-body
  {
    display: block;
    border-width: ${boxy ? '0.0625em' : '0 0 0.0625em 0'};
    border-color: ${primary.bc || '#ccc'};
    border-style: solid;
    box-sizing: border-box;
    background-color: ${boxy ? primary.bg || '#fff' : 'transparent'};
    color: ${primary.fg || '#222'};
    transition: 0.2s ease-in-out;
    transition-property: box-shadow, color;
    outline: none;
    box-shadow: none;
    width: 100%;
    margin-bottom: 0.8em;
    font-size: 1.1em;${boxy ? `\n  border-radius: ${primary.radius || '0.2em'};` : ''}
    font-weight: 400;
    font-family: inherit;
  }

  label.field input${boxy ? '' : ':disabled'},
  label.field select${boxy ? '' : ':disabled'} {
    padding: 0 0.75em;
  }
  label.field select${boxy ? '' : ':disabled'} {
    padding-right: 2em;
  }

  label.field input:disabled,
  label.field input[readonly],
  label.field select:disabled,
  label.field textarea:disabled,
  label.field textarea[readonly] {
    background: ${disabled.bg || '#f4f4f4'};
    color: ${disabled.fg || '#444'};
  }

  label.field textarea {
    line-height: 1.2em;
  }
  label.field .field-wrapper {
    display: block;
  }
  label.field > select, label.field > input,
  label.field > .field-wrapper > input, label.field > .field-wrapper > select {
    height: 2.5em;
  }

  ${!boxy ? `label.field:hover > input,
  label.field:hover select,
  label.field.file:hover:after {
    box-shadow: 0 0.0625em 0 0 ${primary.bc || '#ccc'};
  }

  label.field.textarea:hover {
    box-shadow: 0.0625em 0.0625em ${primary.bc || '#ccc'},
      -0.0625em 0.0625em ${primary.bc || '#ccc'},
      0.0625em -0.0625em ${primary.bc || '#ccc'},
      -0.0625em -0.0625em ${primary.bc || '#ccc'};
  }

  label.field.textarea.focus:hover {
    box-shadow: 0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      0.0625em -0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em -0.0625em ${active.fg || primary.fga || '#07e'};
  }` : ''}

  /**** CHECK BOXES ****/

  label.field.check, label.field.radio {
    position:relative;
    z-index: 0;
    overflow: visible;
    cursor: pointer;
    padding-top: 2.2em;
    white-space: normal;
  }
  label.field.check.inline, label.field.radio.inline {
    padding-top: 0.7em;
  }

  label.field.check input, label.field.radio input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    left: -0.5em;
    top: 1em;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 3.2em;
    height: 3.2em;
    background-color: ${primary.bc || '#ccc'};
    box-shadow: none;
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.2s;
  }
  label.field.inline.check input, label.field.inline.radio input {
    top: -0.45em;
    left: -0.55em;
  }

  label.field.check input:checked, label.field.radio input:checked {
    background-color: ${primary.fga || '#07e'};
  }

  label.field.check:hover > input, label.field.radio:hover > input {
    opacity: 0.04;
  }

  label.field.check input:focus, label.field.radio input:focus {
    opacity: 0.12;
  }

  label.field.check:hover > input:focus, label.field.radio:hover > input:focus {
    opacity: 0.16;
  }

  label.field.check input:active, label.field.radio input:active {
    opacity: 0.6;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
  }

  label.field.check:before, label.field.radio:before {
    content: '';
    display: inline-block;
    box-sizing: border-box;
    margin: 0 0.5em 0.2em 0.1em;
    border: solid 0.125em; /* Safari */
    border-color: ${primary.fg || '#222'};
    border-radius: 0.125em;
    width: 1.2em;
    height: 1.2em;
    vertical-align: bottom;
    transition: border-color 0.2s, background-color 0.2s;
  }

  label.field.check:after, label.field.radio:after {
    content: '';
    display: inline-block;
    opacity: 0;
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    top: 2.3em;
    left: 0.6em;
    border-radius: 0.125em;
  }
  label.field.check.inline:after, label.field.radio.inline:after {
    top: 0.8em;
  }

  label.field.check.checked:after {
    opacity: 1;
    background: no-repeat center/80% url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="${(primary.bg || '#fff').replace(/#/g, '%23')}" d="m 15.378906,1.7050781 a 1.0583349,1.0583349 0 0 0 -1.478515,0.234375 L 6.6210937,11.960938 1.8652344,8.5058594 a 1.0583349,1.0583349 0 0 0 -1.47851565,0.234375 1.0583349,1.0583349 0 0 0 0.234375,1.4785156 L 6.234375,14.294922 A 1.0584408,1.0584408 0 0 0 7.7128906,14.060547 L 15.613281,3.1835938 A 1.0583349,1.0583349 0 0 0 15.378906,1.7050781 Z" /></svg>') ${primary.fga || '#07e'};
  }

  label.field.radio.checked:after {
    opacity: 1;
    background: no-repeat center/80% url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle fill="${(primary.bg || '#fff').replace(/#/g, '%23')}" cx="8" cy="8" r="5" /></svg>') ${primary.fga || '#07e'};
  }

  label.field.check.checked:before, label.field.radio.checked:before {
    border-color: ${primary.fga || '#07e'};
  }
  label.field.check.focus:before, label.field.radio.focus:before {
    border-color: ${primary.fga || '#07e'};
  }

  label.field.check input:disabled, label.field.radio input:disabled {
    opacity: 0;
  }

  label.field.check.disabled, label.field.radio.disabled {
    color: ${disabled.fg || '#444'};
    cursor: initial;
  }

  label.field.check.disabled:before, label.field.radio.disabled:before {
    border-color: ${disabled.bc || '#ccc'};
    background-color: ${disabled.bg || '#f4f4f4'};
  }

  label.field.check.checked.disabled:after, label.field.radio.checked.disabled:after {
    border-color: transparent;
    background-color: ${disabled.bc || '#ccc'};
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
    right: 1.125em;
    height: 0.6em;
    top: 2.6em;
    border-bottom: 0.125em solid;
    border-right: 0.125em solid;
    transform: rotate(45deg);
    pointer-events: none;
    color: ${primary.bc || '#ccc'};
  }

  label.field textarea {
    border: none;${boxy ? `
    padding: 0;` : ''}
  }

  label.field > select {
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  label.field input:focus,
  label.field select:focus,
  label.field.file.focus:after
  {
    border-color: ${active.fg || primary.fga || '#07e'};
    ${!boxy ? `box-shadow: 0 0.0625em 0 0 ${active.fg || primary.fga || '#07e'};` : ''}
  }

  label.field input[type=checkbox]:focus,
  label.field input[type=radio]:focus {
    box-shadow: none;
  }

  label.field.file.focus:after {
    color: ${active.fg || primary.fga || '#07e'};
  }
  label.field.file [type=file] {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }
  label.field.file {
    position: relative;
    min-width: 9em;
    height: 5em;
  }
  label.field.file:after {
    position: absolute;
    content: 'Choose a file';
    box-sizing: border-box;
    width: calc(100% - 0.3em);
    height: 2.5em;
    font-size: 1.1em;
    line-height: 1.5em;
    color: ${primary.fg || '#222'};
    text-align: ${boxy ? 'center' : 'left'};
    padding: 0.5em ${boxy ? '0.5em' : '0'};
    cursor: pointer;
    font-style: oblique;
    left: 0.25em;
    top: 1.6em;
    transition: 0.2s ease-in-out;
    transition-property: color, border-bolor, box-shadow;${ boxy ? `
    border-radius: ${primary.radius || '0.2em'};
    border-color: ${primary.bc || '#ccc'};
    border-style: solid;
    border-width: 0.0625em;` : `
    border-bottom-color: ${primary.bc || '#ccc'};
    border-bottom-width: 0.0625em;
    border-bottom-style: solid;
    `}
  }
  label.field.file.inline:after {
    top: 0.2em;
  }

  label.field.button {
    vertical-align: top;
    padding-top: ${boxy ? '1.7' : '1.958'}em;
  }
  label.field .with-buttons button, label.field.button button {
    font-size: 1.1em;
    margin-top: ${boxy ? '0.15em' : '0'};
  }

  label.field .field-wrapper.with-buttons {
    display: flex;
  }
  label.field .with-buttons button {
    flex-shrink: 0;
    padding-left: 0.5em;
    padding-right: 0.5em;
    margin-top: 0;
    margin-right: 0;
    ${boxy ? `height: 2.5em;
    box-shadow: none;
    border-radius: 0;
    border-left: 1px solid ${primary.bg || '#fff'};
    margin-left: 0;` : 
    `height: 2.25em;`}
  }${boxy ? `
  label.field .with-buttons button:first-of-type {
    margin-left: -0.05em;
    border-left: none;
  }
  label.field .with-buttons button:last-of-type {
    border-radius: 0 ${primary.radius || '0.2em'} ${primary.radius || '0.2em'} 0;
  }
  label.field .with-buttons input {
    border-radius: ${primary.radius || '0.2em'} 0 0 ${primary.radius || '0.2em'};
    min-width: 0;
  }
  ` : ''}

  label.field.plain > div {
    position: absolute;
    font-size: 1.1em;
    top: 2.4em;
    font-weight: normal;
  }

  /* inline fields (no labels) */
  label.field.inline {
    min-height: 3.3em;
  }

  label.field.button.inline {
    margin-top: 0.2em;
    padding-top: 0.12em;
  }

  label.field.button.inline button {
    margin-top: 0;
  }

  label.field.inline.select:after {
    top: 1.${boxy ? '15' : '1'}em;
  }

  .just-the.field-tip,
  label.field .field-tip {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: ${primary.fga || '#07e'};
    color: ${primary.bg || '#fff;'};
    cursor: default;
    user-select: none;
    border-radius: 1em;
    margin-left: 0.5em;
    line-height: 1em;
    font-family: monospace;
    text-align: center;
    margin-top: -0.2em;
    cursor: help;
  }
  .just-the.field-tip.field-tip-error {
    background-color: ${primary.error || '#ca3c3c'};
  }
  .just-the.field-tip.field-tip-warn {
    background-color: ${primary.warn || '#f79e0b'};
  }

  label.field .field-solo-tip {
    margin-left: -0.1em;
  }
  `;
  // TODO: other themes
}

function noop() {}

function focused(ev) {
  if (!~this.className.indexOf('focus')) this.className += ' focus';
}

function blurred(ev) {
  this.className = this.className.replace(/\bfocus\b/g, '').trim();
}

export function field(node) {
  const ctx = this.getContext(node);

  let isField, isCheck, isRadio, isArea, isSelect, isFile, isButton, isPlain, isInput;
  let change, attrs, desc, last;

  function invalidate() {
    let val = setup().split(/\s+/).filter(c => !!c);

    isField = !!~val.indexOf('field');
    if (!isField) {
      val.push('field');
      isField = true;
    }

    isCheck = node.querySelector('input[type=checkbox]');
    if (isCheck && !~val.indexOf('check')) val.push('check');

    isRadio = node.querySelector('input[type=radio]');
    if (isRadio && !~val.indexOf('radio')) val.push('radio');

    const checkable = (isCheck || isRadio);
    if (checkable && checkable.checked && !~val.indexOf('checked')) val.push('checked');
    if (checkable && checkable.disabled && !~val.indexOf('disabled')) val.push('disabled');

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
      checkable._form_callback = (ev, init = true) => {
        if (init && checkable.type === 'radio' && checkable.name) {
          let list = [];
          list.push.apply(list, document.querySelectorAll(`input[type=radio][name=${checkable.name}]`));
          list = list.filter(i => i !== checkable);
          list.forEach(l => l._form_callback && l._form_callback(ev, false));
        }

        const checked = checkable.checked;
        if (checked && !~node.className.indexOf('checked')) node.className += ' checked';
        else if (!checked && ~node.className.indexOf('checked')) node.className = node.className.replace(/\bchecked\b/g, '').replace(/ +/g, ' ').trim();
      }

      if (MutationObserver) {
        attrs = new MutationObserver(() => {
          let val;
          val = checkable.disabled;
          if (val && !~node.className.indexOf('disabled')) node.className += ' disabled';
          else if (!val && ~node.className.indexOf('disabled')) node.className = node.className.replace(/\bdisabled\b/g, '').replace(/ +/g, ' ').trim();
        });
        attrs.observe(checkable, { attributes: true });
      }

      change = this.getContext(checkable).listen('change', checkable._form_callback);

      desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(checkable), 'checked');
      if (desc && desc.configurable) {
        last = checkable;
        Object.defineProperty(checkable, 'checked', {
          get: desc.get,
          set(v) {
            desc.set.call(last, v);
            checkable._form_callback();
          },
          enumerable: true,
          configurable: true
        });
      }
    }

    isArea = !!node.querySelector('textarea');
    if (isArea && !~val.indexOf('textarea')) val.push('textarea');

    isSelect = !!node.querySelector('select');
    if (isSelect && !~val.indexOf('select')) val.push('select');

    isFile = !!node.querySelector('input[type=file]');
    if (isFile && !~val.indexOf('file')) val.push('file');

    isButton = node.querySelector('button');
    isButton = !!isButton && isButton.parentNode === node;
    if (isButton && !~val.indexOf('button')) val.push('button');

    isPlain = !!node.querySelector('div');
    if (isPlain && !~val.indexOf('plain')) val.push('plain');

    isInput = !isCheck && !isRadio && !isFile && !!node.querySelector('input');
    if (isInput && !~val.indexOf('input')) val.push('input');

    node.className = val.join(' ');
  }

  function setup() {
    let cls = node.className;

    if (!isField) cls = cls.replace(/\bfield\b/g, '').trim();
    if (!isCheck) cls = cls.replace(/\bcheck(ed)?\b/g, '').trim();
    if (!isRadio) cls = cls.replace(/\bradio\b/g, '').trim();
    if (!isArea) cls = cls.replace(/\btextarea\b/g, '').trim();
    if (!isSelect) cls = cls.replace(/\bselect\b/g, '').trim();
    if (!isFile) cls = cls.replace(/\bfile\b/g, '').trim();
    if (!isButton) cls = cls.replace(/\bbutton\b/g, '').trim();
    if (!isPlain) cls = cls.replace(/\bplain\b/g, '').trim();
    if (!isInput) cls = cls.replace(/\binput\b/g, '').trim();
    cls = cls.replace(/  +/g, ' ');

    return cls;
  }

  const focus = ctx.listen('focusin', focused);
  const blur = ctx.listen('focusout', blurred);

  invalidate.call(this);

  const res = {
    update: noop,
    invalidate: invalidate.bind(this),
    teardown() {
      ctx.ractive.fire('fieldUnregistered', ctx, node, res);
      let cls = setup();
      cls = cls.replace(/\bfocus\b/g, '').trim();

      focus.cancel();
      blur.cancel();
      change && change.cancel();
      if (attrs) attrs.disconnect();
      if (last) {
        delete last.checked;
        desc = last = undefined;
      }

      node.className = cls;
    },
    setDisabled(v) {
      const children = node.querySelectorAll('input,button,select,textarea');
      children.forEach(c => c.disabled = v);
      this.invalidate();
    },
  }

  ctx.ractive.fire('fieldRegistered', ctx, node, res);

  return res;
}

field.style = style;

function findDeep(els, el) {
  if (!els) return false;
  for (let i = 0; i < els.length; i++) {
    if (els[i].e === el) return true;
    if (els[i].f && findDeep(els[i].f, el)) return true;
  }
  return false;
}

export const macro = Ractive.macro(handle => {
  let body = [];
  let label = [];
  const attrs = (handle.template.m || []).slice();
  const content = handle.template.f || [];

  // TODO: special field types
  const value = attrs.find(a => a.n === 'value');
  const type = attrs.find(a => a.n === 'type');
  const tip = attrs.find(a => a.n === 'tip');
  const disabled = attrs.find(a => a.n === 'disabled');
  const maxlength = attrs.find(a => a.n === 'maxlength');
  if (tip) attrs.splice(attrs.indexOf(tip), 1);

  if (type && typeof macro.types[type.f] === 'function') {
    body.push.apply(body, macro.types[type.f](attrs, content, handle));
  } else if (value) {
    const el = {
      t: 7, e: 'input', m: [value]
    };
    if (disabled) el.m.push(disabled);
    if (maxlength) el.m.push(maxlength);
    // watch for select
    if (findDeep(content, 'option')) {
      el.e = 'select';
      el.f = content;
    }
    if (type) {
      el.m.push(type);
      if (type.f === 'checkbox' || type.f === 'radio') {
        const target = attrs.find(a => a.n === 'target');
        if (target) el.m.push(Object.assign({}, target, { n: 'name' }));
        else el.m.splice(el.m.indexOf(value), 1, Object.assign({}, value, { n: 'checked' }));
      }
    }
    el.m = el.m.concat(attrs.filter(a => a.t === 73 || a.t === 73 || a.n === 'placeholder'));
    body.push(el);

    const btns = content.filter(e => e.e === 'button' || findDeep(e.f, 'button'));
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
    content.forEach(e => {
      if (e.e === 'label') {
        if (e.f && e.f.length) label.push.apply(label, e.f);
      } else {
        body.push(e);
      }
    });
    const els = content.filter(e => e.e);
    if (els.find(e => e.e === 'button') && els.length > 1) {
      body = [{
        t: 7, e: 'span', m: [
          { t: 13, n: 'class', f: 'field-wrapper with-buttons', g: 1 }
        ],
        f: body
      }];
    }
  }

  const labelattr = attrs.find(a => a.n === 'label');
  if (labelattr && labelattr.f && labelattr.f.length) label.push.apply(label, Array.isArray(labelattr.f) ? labelattr.f : [labelattr.f]);
  if (tip) body.unshift({
    t: 7, e: 'span', m: [
      { t: 13, n: 'class', f: `field-tip${!label.length ? ' field-solo-tip' : ''}`, g: 1 },
      { t: 13, n: 'title', f: tip.f },
      { t: 70, n: ['click'], f: { r: [], s: '[false]' } }
    ],
    f: '?',
  });
  const inline = attrs.find(a => a.n === 'inline');
  if (label && !inline) body.unshift.apply(body, label);
  else if (!inline) body.unshift('\xa0');

  const outer = {
    t: 7, e: 'label', m: [{ t: 71, n: 'field' }].concat(attrs.filter(a => (a.t !== 13 && a.t !== 73) || (a.n !== 'value' && a.n !== 'type' && a.n !== 'inline' && a.n !== 'label' && a.n !== 'placeholder' && a.n !== 'target' && a.n !== 'disabled'))),
    f: body
  };

  if (inline) outer.m.push({ t: 13, n: 'class', f: 'inline' });

  handle.setTemplate([outer]);
});

macro.types = {};

const tip = Ractive.macro(handle => {
  handle.aliasLocal('__rtip');
  const body = [{
    t: 7, e: 'span', m: (handle.template.m || []).concat([
      { t: 13, n: 'class', f: [`just-the field-tip`, { t: 4, f: [' field-tip-error'], x: { r: ['__rtip.attrs.type'], s: '_0==="error"' } }, { t: 4, f: [' field-tip-warn'], x: { r: ['__rtip.attrs.type'], s: '_0==="warn"' } }] },
      { t: 13, n: 'title', f: Array.isArray(handle.template.f) || typeof handle.template.f === 'string' ? handle.template.f : [handle.template.f] },
      { t: 70, n: ['click'], f: { r: [], s: '[false]' } }
    ]),
    f: [{ t: 4, f: [{ t: 3, r: '__rtip.attrs.sign' }], n: 50, r: '__rtip.attrs.sign' }, { t: 4, f: ['!'], n: 50, x: { r: ['__rtip.attrs.type'], s: '_0==="error"||_0==="warn"' }, l: 1 }, { t: 4, f: ['?'], n: 51, l: 1 }],
  }];

  handle.set('__rtip.attrs', handle.attributes);

  handle.setTemplate(body);

  return {
    update() {
      handle.set('__rtip.attrs', handle.attributes);
    }
  };
}, {
  attributes: ['sign', 'type'],
});

export function autofocus(node, opts) {
  if (typeof node.focus === 'function' && !node.disabled) {
    if (opts && opts.immediate) node.focus();
    else setTimeout(() => !node.disabled && node.focus(), (opts || {}).timeout || 250);
  }
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

    instance.partials[opts.name || 'field'] = macro;
    instance.partials[opts.tipName || 'tip'] = tip;
    instance.decorators[opts.name || 'field'] = field;
    instance.decorators[opts.autofocusName || 'autofocus'] = autofocus;
  }
}

globalRegister('field', 'decorators', field);
globalRegister('field', 'partials', macro);
globalRegister('tip', 'partials', tip);
globalRegister('autofocus', 'decorators', autofocus);

export default plugin;
