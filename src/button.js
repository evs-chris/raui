export default function button(data) {
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
      transition-property: box-shadow, opacity;
      font-size: 1em;
      line-height: 1.5em;
      background-color: ${data('button.bg') || data('bg2') || '#ddd'};
      color: ${data('button.fg') || data('fg2') || '#222'};
      vertical-align: middle;
      min-height: 2.25em;
    }

    button[disabled], .btn.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    button.round {
      width: 2.2em;
      height: 2.2em;
      border-radius: 1.1em;
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
  `;
}
