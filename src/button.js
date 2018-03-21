export function button(data) {
  return `
    button, .btn {
      text-decoration: none;
      text-align: center;
      letter-spacing: 0.5px;
      cursor: pointer;
      user-select: none;
      border: none;
      border-radius: 2px;
      padding: 0 2rem;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
      transition: 0.2s ease-in-out;
      transition-property: box-shadow, opacity, background-color;
      font-size: 1em;
      line-height: 1.5em;
      background-color: ${data('button.bg') || data('bg2') || '#ddd'};
      color: ${data('button.fg') || data('fg2') || '#222'};
      vertical-align: middle;
      min-height: 2.25em;
      outline: 0;
      margin: 0.25em;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
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
      background-color: ${data('button.flat.bg') || data('bg1') || '#fefefe'};
      color: ${data('button.flat.fg') || data('fg1') || '#222'};
      box-shadow: none;
    }

    button.alt1, .btn.alt1 {
      bakcground-color: ${data('alt1.bg2') || '#ddd'};
      color: ${data('alt1.fg2') || '#222'};
    }

    button.alt1.flat, .btn.alt1.flat {
      background-color: ${data('alt1.bg1') || '#fefefe'};
      color: ${data('alt1.fg1') || '#222'};
    }

    button.alt2, .btn.alt2 {
      bakcground-color: ${data('alt2.bg2') || '#ddd'};
      color: ${data('alt2.fg2') || '#222'};
    }

    button.alt2.flat, .btn.alt2.flat {
      background-color: ${data('alt2.bg1') || '#fefefe'};
      color: ${data('alt2.fg1') || '#222'};
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
  `;
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