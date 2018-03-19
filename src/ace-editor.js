export function aceEditor(node, options) {
  let handle = {};

  const ctx = Ractive.getContext(node);
  const editor = handle.editor = ace.edit(node);
  editor.$blockScrolling = Infinity;
  const session = editor.getSession();

  if (!node.classList.contains('ace-editor')) node.classList.add('ace-editor');

  let binding;
  let observer;
  const listener = ctx.get('@.root').on('*.resize', () => {
    editor && editor.resize();
  });
  let lock = false;

  session.setUseSoftTabs(false);
  session.setTabSize(2);

  editor.on('change', function() {
    if (lock) return;
    lock = true;
    ctx.set(binding, editor.getValue());
    if (ctx.hasListener('change')) {
      ctx.raise('change');
    }
    lock = false;
  });
  function observed(value) {
    if (lock) return;
    lock = true;
    var pos = editor.getCursorPosition();
    editor.setValue(value || '', -1);
    editor.clearSelection();
    editor.moveCursorTo(pos.row, pos.column, false);
    lock = false;
  }

  handle.update = function(options) {
    if (!options) return;
    if (options.syntax) editor.getSession().setMode('ace/mode/' + options.syntax);
    if (options.theme) editor.setTheme('ace/theme/' + options.theme);
    session.setTabSize(options.tabSize || 2);
    if (typeof options.margin === 'boolean') editor.setShowPrintMargin(options.margin);
    if (typeof options.wrap === 'boolean') session.setUseWrapMode(options.wrap);
    if (typeof options.highlightActive === 'boolean') editor.setHighlightActiveLine(options.highlightActive);

    if (options.keymode) editor.setKeyboardHandler(options.keymode);
    else editor.setKeyboardHandler(null)

    if (options.bind !== binding) {
      if (observer) observer.cancel();
      if (options.bind) {
        binding = options.bind;
        observer = ctx.observe(binding, observed, { init: false });
      }
    }
  };

  handle.teardown = function() {
    editor.off('change');
    editor.destroy();
    listener.cancel();
    node.classList.remove('ace-editor');
  };

  handle.resize = function() {
    editor.resize();
  }

  handle.focus = function() {
    editor.focus();
  }

  handle.update(options);
  if (options.bind) setTimeout(function() { observed(ctx.get(options.bind)); });

  return handle;
};

export function plugin(opts = {}) {
  return function({ instance }) {
    instance.decorators[opts.name || 'ace-editor'] = aceEditor;
  }
}

export default plugin;