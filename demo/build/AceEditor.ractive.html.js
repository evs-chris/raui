System.register(['./chunk2.js', './chunk7.js'], function (exports, module) {
  'use strict';
  var Window, Split;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      Split = module.default;
    }],
    execute: function () {

      function makeAceEditor(opts) {
        if ( opts === void 0 ) opts = {};

        var Ace = opts.ace;
        if (!Ace) { Ace = window.ace; }
        if (!Ace) { throw new Error('Ace must be passed in or available globally.'); }

        function aceEditor(node, options) {
          if ( options === void 0 ) options = {};

          var handle = {};

          var ctx = Ractive.getContext(node);
          var editor = handle.editor = Ace.edit(node);
          editor.$blockScrolling = Infinity;
          var session = editor.getSession();

          if (!node.classList.contains('ace-editor')) { node.classList.add('ace-editor'); }

          var binding;
          var observer;
          var lock = false;

          session.setUseSoftTabs(false);
          session.setTabSize(2);

          editor.on('change', function() {
            if (lock) { return; }
            lock = true;
            if (binding) { ctx.set(binding, editor.getValue()); }
            if (ctx.hasListener('change')) {
              ctx.raise('change');
            }
            lock = false;
          });
          function observed(value) {
            if (lock) { return; }
            lock = true;
            var pos = editor.getCursorPosition();
            editor.setValue(value || '', -1);
            editor.clearSelection();
            editor.moveCursorTo(pos.row, pos.column, false);
            lock = false;
          }

          handle.update = function(options) {
            if (!options) { return; }
            if (options.syntax) { editor.getSession().setMode('ace/mode/' + options.syntax); }
            if (options.theme) { editor.setTheme('ace/theme/' + options.theme); }
            session.setTabSize(options.tabSize || 2);
            if (typeof options.margin === 'boolean') { editor.setShowPrintMargin(options.margin); }
            if (typeof options.wrap === 'boolean') { session.setUseWrapMode(options.wrap); }
            if (typeof options.highlightActive === 'boolean') { editor.setHighlightActiveLine(options.highlightActive); }

            if ('keymode' in options) { editor.setKeyboardHandler(options.keymode); }
            else { editor.setKeyboardHandler(null); }

            if (options.bind !== binding) {
              if (observer) { observer.cancel(); }
              if (options.bind) {
                binding = options.bind;
                observer = ctx.observe(binding, observed, { init: false });
              }
            }
          };

          handle.resize = function() {
            editor && editor.resize();
          };

          handle.focus = function() {
            editor.focus();
          };

          var listener = ctx.get('@.root').on('*.resize', handle.resize);

          handle.teardown = function() {
            editor.off('change');
            editor.destroy();
            listener.cancel();
            node.classList.remove('ace-editor');
          };


          handle.update(options);
          if (options.bind) { setTimeout(function() { observed(ctx.get(options.bind)); }); }

          return handle;
        }
        function plugin(ref) {
          var instance = ref.instance;

          instance.decorators[opts.name || 'ace-editor'] = aceEditor;
        }

        plugin.plugin = plugin;
        plugin.aceEditor = aceEditor;

        return plugin;
      }

      var AceEditor = (function (Window) {
          function AceEditor(opts) { Window.call(this, opts); }

          if ( Window ) AceEditor.__proto__ = Window;
          AceEditor.prototype = Object.create( Window && Window.prototype );
          AceEditor.prototype.constructor = AceEditor;

          return AceEditor;
        }(Window));
      exports('default', AceEditor);
        var Ace = typeof ace === 'undefined' ?
          new Promise(function (ok) {
            var waits = [];
            [
              'https://cdn.jsdelivr.net/npm/ace-builds@1.3.1/src-min/ace.js'
            ].forEach(function (link) {
              var tag = document.createElement('script');
              tag.src = link;
              tag.async = false;
              waits.push(new Promise(function (ok) {
                tag.onload = function () { return ok(); };
              }));
              document.head.appendChild(tag);
            });
            
            Promise.all(waits).then(function () {
              Ace = ace;
              ok();
            });
          }) :
          ace;

        Window.extendWith(AceEditor, {
          template: {v:4,t:[{t:55,f:[{f:["\n  Loading...\n"],t:4},{t:62,f:["\n",{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    The `ace-editor` decorator turns an element into an [Ace](https://ace.c9.io/) editor. Since this requires an external library, it is packaged as a plugin constructor that will accept an `ace` singleton as an option. If no `ace` option is supplied, the decorator will try to use the global `ace` and throw an error if none is found.\n\n    This decorator tries to make all of the common Ace settings available as options that can be passed to the decorator. This allows you to bind settings in your UI outside of the editor and have the editor update immediately as they change.\n\n    One thing to note about Ace editors is that they are sensitive to their host elements changing size. This is particularly noticeable in tabs with dynamic heights where the editor is not on the initial tab. The easy way around it is to add a tab listener, `on-enter=\"@.getContext('.ace-editor').decorators['ace-editor'].resize()\"`, which will trigger the `resize` handler on the decorator every time the tab is activated. The decorator will automatically handle actions that fire a `resize` event, such as window and split resizes.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin options\n\n    All options are optional.\n\n    * `ace: ace = window.ace` - an Ace singleton to be used when creating editors\n    * `name: string = 'ace-editor'` - the name to use when installing the decorator as a plugin\n\n    ### Decorator Options\n\n    Since Ace handles its own module loading internally, the module-related settings don't typically require loading extra scripts manually.\n\n    All options are optional.\n\n    * `syntax: string` - the name of a syntax mode to use for the editor e.g. `javascript`\n    * `theme: string` - the name of a theme to use for the editor e.g. `dracula`\n    * `tabSize: number = 2` - the size of tabs/indents\n    * `margin: boolean` - whether to show the print margin\n    * `wrap: boolean` - whether to use word wrapping\n    * `highlightActive: boolean` - whether to highlight the active line\n    * `keymode: string | null` - the name of a key mode to use for the editor e.g. `vim`\n    * `bind: string` - a local keypath to which to bind the text of the editor. The decorator will handle keeping both values in sync with each other.\n\n    ### Decorator Events\n\n    * `change` - if supplied on the decorated node, will be fired every time the editor fires a change event\n\n    ### Decorator Handle\n\n    Decorator handles are accessible from the context of the decorated node e.g. `ractive.getContext('.ace-editor').decorators['ace-editor']`;\n\n    * `editor` - the editor instance installed by the decorator\n    * `focus()` - focus the editor\n    * `resize()` - request that the editor respond to a change in size\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13},{n:"no-pad",f:0,t:13},{n:["enter"],t:70,f:{r:["@this"],s:"[_0.getContext(\".ace-editor\").decorators[\"ace-editor\"].resize()]"}}],f:["\n    ",{t:7,e:"split",f:["\n      ",{t:7,e:"div",m:[{n:"size",f:"20",t:13}],f:["\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Tab size\n          ",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".tabSize"}],t:13}]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Mode\n          ",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".syntax"}],t:13}],f:["\n            ",{t:7,e:"option",f:["text"]},"\n            ",{t:7,e:"option",f:["javascript"]},"\n            ",{t:7,e:"option",f:["sh"]},"\n            ",{t:7,e:"option",f:["sql"]},"\n            ",{t:7,e:"option",f:["markdown"]},"\n          "]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Theme\n          ",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".theme"}],t:13}],f:["\n            ",{t:7,e:"option",f:["github"]},"\n            ",{t:7,e:"option",f:["terminal"]},"\n            ",{t:7,e:"option",f:["solarized_dark"]},"\n            ",{t:7,e:"option",f:["solarized_light"]},"\n            ",{t:7,e:"option",f:["monokai"]},"\n          "]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Key Mode\n          ",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".keymode"}],t:13}],f:["\n            ",{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"null"}}],t:13}],f:["(none)"]},"\n            ",{t:7,e:"option",f:["vim"]},"\n            ",{t:7,e:"option",m:[{n:"value",f:"emacs",t:13}],f:["RSI"]},"\n          "]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".wrap"}],t:13}]}," Wrap\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".margin"}],t:13}]}," Margin\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".highlightActive"}],t:13}]}," Highlight active\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Value\n          ",{t:7,e:"textarea",f:[{t:2,r:".value"}]},"\n        "]},"\n      "]},"\n      ",{t:7,e:"div",m:[{n:"style-height",f:"100%",t:13},{n:"ace-editor",t:71,f:{r:["theme","syntax","wrap","margin","highlightActive","keymode","tabSize"],s:"[{theme:_0,syntax:_1,wrap:_2,margin:_3,highlightActive:_4,keymode:_5,tabSize:_6,bind:\".value\"}]"}}]},"\n    "]},"\n  "]},"\n"]},"\n"]}],r:"~/ace"}],e:{"[_0.getContext(\".ace-editor\").decorators[\"ace-editor\"].resize()]":function (_0){return([_0.getContext(".ace-editor").decorators["ace-editor"].resize()]);},"null":function (){return(null);},"[{theme:_0,syntax:_1,wrap:_2,margin:_3,highlightActive:_4,keymode:_5,tabSize:_6,bind:\".value\"}]":function (_0,_1,_2,_3,_4,_5,_6){return([{theme:_0,syntax:_1,wrap:_2,margin:_3,highlightActive:_4,keymode:_5,tabSize:_6,bind:".value"}]);}}}, css: "",
          use: [Split()],
          options: {
            id: 'Ace',
            title: 'Decorators :: Ace Editor',
            width: '40em', height: '30em',
            flex: true
          },
          data: function data() {
            return { ace: Ace, tabSize: 2 }
          }
        });

        if (Ace instanceof Promise) {
          Ace.then(function () { return AceEditor.use(makeAceEditor()); });
        } else {
          AceEditor.use(makeAceEditor());
        }

    }
  };
});
