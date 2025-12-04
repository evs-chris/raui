export default function makeAceEditor(opts = {}) {
  let Ace = opts.ace;
  if (!Ace) Ace = window.ace;
  if (!Ace) throw new Error('Ace must be passed in or available globally.');

  function aceEditor(node, options = {}) {
    let handle = {};

    const ctx = Ractive.getContext(node);
    const editor = handle.editor = Ace.edit(node);
    editor.$blockScrolling = Infinity;
    const session = editor.getSession();
    let lazyTm;

    if (!node.classList.contains('ace-editor')) node.classList.add('ace-editor');

    let binding;
    let observer;
    let lock = false;
    let lazy = false;

    session.setUseSoftTabs(false);
    session.setTabSize(2);

    function send() {
      if (lock) return;
      lock = true;
      lazyTm = undefined;
      if (binding) ctx.set(binding, editor.getValue());
      if (ctx.hasListener('change')) {
        ctx.raise('change');
      }
      lock = false;
    }

    editor.on('change', function() {
      if (lazy === true || typeof lazy === 'number') {
        if (lazyTm) clearTimeout(lazyTm);
        lazyTm = setTimeout(send, lazy === true ? 500 : lazy);
      } else send();
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
    editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S', sender: 'editor|cli' }, 
      exec: function() {
        ctx.raise('save');
      }
    });

    handle.update = function(options) {
      if (!options) return;
      if (options.syntax) editor.getSession().setMode('ace/mode/' + options.syntax);
      if (options.theme) editor.setTheme('ace/theme/' + options.theme);
      session.setTabSize(options.tabSize || 2);
      if (typeof options.margin === 'boolean') { editor.setShowPrintMargin(options.margin); }
      if (typeof options.wrap === 'boolean') { session.setUseWrapMode(options.wrap); }
      if (typeof options.highlightActive === 'boolean') { editor.setHighlightActiveLine(options.highlightActive); }
      if (typeof options.highlightSelected === 'boolean') { editor.setHighlightSelectedWord(options.highlightSelected); }
      if (options.font) editor.setOptions({ fontFamily: options.font });
      if (options.fontSize) editor.setOptions({ fontSize: options.fontSize });
      if ('printMargin' in options) editor.setOption('showPrintMargin', options.printMargin);
      if (typeof options.lineNumbers === 'boolean') editor.setOption('showLineNumbers', options.lineNumbers);
      if (typeof options.relativeLineNumbers === 'boolean') editor.setOption('relativeLineNumbers', options.relativeLineNumbers);
      lazy = options.lazy;


      if ('keymode' in options && options.keymode) editor.setKeyboardHandler(`ace/keyboard/${options.keymode}`);
      else editor.setKeyboardHandler(null)

      if (options.bind !== binding) {
        var old = observer;
        if (old) observer.cancel();
        if (options.bind) {
          binding = options.bind;
          observer = ctx.observe(binding, observed, { init: false });
          if (old) setTimeout(function() { observed(ctx.get(options.bind)); });
        }
      }
    };

    handle.resize = function() {
      editor && editor.resize();
    }

    handle.focus = function() {
      editor.focus();
    }

    const listener = ctx.get('@.root').on('*.resize', handle.resize);
    window.addEventListener('resize', handle.resize);

    handle.teardown = function() {
      editor.off('change');
      editor.destroy();
      listener.cancel();
      window.removeEventListener('resize', handle.resize);
      node.classList.remove('ace-editor');
    };


    handle.update(options);
    if (options.bind) setTimeout(function() { observed(ctx.get(options.bind)); });

    return handle;
  };

  function plugin({ instance }) {
    instance.decorators[opts.name || 'ace-editor'] = aceEditor;
  }

  plugin.plugin = plugin;
  plugin.aceEditor = aceEditor;

  return plugin;
}
