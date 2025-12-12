export default function plugin(options = {}) {
  const lib = options.marked || window.marked;
  let hl = options.highlight;
  if (hl === true) hl = window.hljs;

  if (!lib) throw new Error(`Marked must be either passed in or provided globally as 'marked'.`)

  if (hl && hl.getLanguage) {
    const renderer = new lib.Renderer();
    renderer.code = (code, lang) => {
      const highlighted = lang && hl.getLanguage(lang) ? hl.highlight(lang, code).value : code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre><code class="hljs ${lang}">${highlighted}</code></pre>`;
    }
    lib.setOptions({ renderer });
  }

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
      const content = handle.partials.content || [];
      if (content.length === 1 && typeof content[0] === 'string') {
        handle.aliasLocal('_marked');
        handle.setTemplate(['Marking down...']);
        let tpl = content[0];
        const indent = tpl.split(/\r?\n/).find(l => /^\s/.test(l));
        if (indent) tpl = tpl.replace(new RegExp(`^${indent.replace(/(\s*).*/, '$1')}`, 'gm'), '');
        lib(tpl, (err, res) => {
          if (!err) handle.set('@local.content', res);
        });
        handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 13, n: 'class-marked-container' }].concat(handle.template.m || []), f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-marked-content' }], f: [{ t: 3, r: '_marked.content' }] }] }]);
      } else {
        handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 71, n: 'marked' }].concat(handle.template.m || []), f: handle.template.f }]);
      }
    }, {
      css(data) { return `.marked-content { max-width: ${data('marked.max') || '70em'}; width: 100%; box-sizing: border-box; margin: 0 auto; }` },
      noCssTransform: true,
      cssId: 'rmarked'
    });
  }
}
