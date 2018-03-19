export default function plugin(options = {}) {
  const lib = options.marked || window.marked;
  if (!lib) throw new Error(`Marked must be either passed in or provided globally as 'marked'.`)

  function marked(node, opts) {
    const div = document.createElement('div');
    div.setAttribute('class', 'marked-container');
    const display = node.style.display;
    node.style.display = 'none';

    const content = document.createElement('div');
    content.setAttribute('class', 'marked-content');
    div.appendChild(content)

    let html = node.innerText;
    const lines = html.split(/\r?\n/);
    const indent = lines.find(l => /[^\s]/.test(l));
    if (indent) html = html.replace(new RegExp(`^${indent.replace(/(\s*).*/, '$1')}`, 'gm'), '');

    lib(html, (err, res) => {
      content.innerHTML = res;
      node.parentNode.insertBefore(div, node.nextSibling);
    });

    return { teardown() {
      node.parentNode.removeChild(div);
      node.style.display = display;
    } };
  }

  return function plugin({ Ractive, instance }) {
    instance.decorators[options.name || 'marked'] = marked;
    instance.partials[options.name || 'marked'] = Ractive.macro(handle => {
      handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 71, n: 'marked' }], f: handle.template.f }]);
    }, {
      css(data) { return `.marked-container { display: flex; justify-content: space-around; } .marked-content { max-width: ${data('marked.max') || '70em'}; width: 100%; box-sizing: border-box; }` },
      noCssTransform: true
    });
  }
}