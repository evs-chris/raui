export function button(data) {
  const primary = Object.assign({}, data('raui.primary'), data('raui.button.primary'), { disabled: Object.assign({}, data('raui.primary.disabled'), data('raui.button.primary.disabled')) });
  const themes = (data('raui.themes') || []).slice();
  (data('raui.button.themes') || []).forEach(t => {
    if (!~themes.indexOf(t)) themes.push(t);
  });

  return `
    button, .btn {
      text-decoration: none;
      text-align: center;
      letter-spacing: 0.5px;
      cursor: pointer;
      user-select: none;
      border: none;
      border-radius: ${primary.radius || '0.2em'};
      padding: 0 1.25rem;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
      transition: 0.2s ease-in-out;
      transition-property: box-shadow, opacity, background-color;
      font-size: 1em;
      line-height: 1.5em;
      background-color: ${primary.fga || '#07e'};
      color: ${primary.bg || '#fff'};
      vertical-align: middle;
      min-height: 2.25em;
      outline: 0;
      margin: 0.25em;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      font-family: inherit;
    }
    button.alt, .btn.alt {
      background-color: ${primary.fg || '#222'};
    }

    button[disabled], .btn.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    button.round {
      width: 2.2em;
      height: 2.2em;
      border-radius: 100%;
      line-height: 2.2em;
      text-align: center;
      padding: 0;
    }

    button.flat, .btn.flat {
      background-color: transparent;
      color: ${primary.fg || '#222'};
      box-shadow: none;
    }
    button.flat.alt, .btn.flat.alt {
      color: ${primary.fga || '#07e'};
    }

    button:hover, .btn:hover {
      opacity: 0.9;
      box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14),
      0 1px 7px 0 rgba(0,0,0,0.12),
      0 3px 1px -1px rgba(0,0,0,0.2);
    }

    button[disabled]:hover, .btn.disabled:hover {
      opacity: 0.7;
    }

    button.flat:hover, .btn.flat:hover {
      box-shadow: none;
    }

    button:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 2em, transparent 2.1em);
      opacity: 0;
      transform: scale(5, 5);
      transition: opacity 1s ease-out, transform 0.5s ease-in;
    }

    button.flat:after {
      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);
    }

    button.round:after {
      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0.75em, transparent 0.76em);
    }

    button.round.flat:after {
      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0.75em, transparent 0.76em);
    }

    button:before {
      content: ' ';
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.075);
      opacity: 0;
      top: 0;
      left: 0;
      transition: opacity 0.4s ease-in-out;
    }
    button:focus:before {
      opacity: 1;
    }
    button.flat:hover:before {
      opacity: 0.5;
    }
    
    button:active:after {
      transform: scale(1, 1);
      opacity: 1;
      transition: none;
    }
  ` + themes.map(t => {
    const theme = Object.assign({}, primary, data(`raui.${t}`), data(`raui.button.${t}`), { disabled: Object.assign({}, primary.disabled, data(`raui.${t}.disabled`), data(`raui.button.${t}.disabled`))});
    return `.btn.${t}, button.${t} {
      background-color: ${theme.fga || '#07e'};
      color: ${theme.bg || '#fff'};
    }
    button.${t}.alt, .btn.${t}.alt {
      background-color: ${theme.fg || '#222'};
    }
    .btn.flat.${t}, button.flat.${t} {
      background-color: ${theme.bg || '#fff'};
      color: ${theme.fg || '#222'};
    }
    button.flat.${t}.alt, .btn.flat.${t}.alt {
      color: ${theme.fga || '#07e'};
    }
    `;
  }).join('');
}

export function plugin() {
  return function({ instance, Ractive }) {
    if (instance === Ractive || Ractive.isInstance(instance)) {
      Ractive.addCSS('raui-button', button);
    } else {
      const css = instance.css;
      instance.css = function(data) {
        const res = typeof css === 'string' ? css : typeof css === 'function' ? css(data) : '';
        return res + button(data);
      }
    }
  };
}

export default plugin;