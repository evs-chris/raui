System.register(['./chunk2.js', './chunk7.js', './chunk8.js'], function (exports, module) {
  'use strict';
  var Window, Split, json;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      Split = module.default;
    }, function (module) {
      json = module.default;
    }],
    execute: function () {

      function init(initOpts) {
        if ( initOpts === void 0 ) initOpts = {};

        CodeMirror = initOpts.CodeMirror || window.CodeMirror;
        if (!CodeMirror) { throw new Error('CodeMirror must be provided or available globally.'); }

        if (!CodeMirror.inputStyles.password) {
          function PasswordInput(cm) {
            CodeMirror.inputStyles.textarea.call(this, cm);
          }
          var proto = PasswordInput.prototype = Object.create(CodeMirror.inputStyles.textarea.prototype);
          proto.constructor = PasswordInput;
          proto.createField = function() {
            var div = document.createElement('div');
            div.setAttribute('style', "overflow: hidden; position: relative; width: 3px; height: 0px;");
            var input = document.createElement('input');
            input.setAttribute('type', 'password');
            input.setAttribute('style', 'position: absolute; padding: 0; width: 1000px; height: 1em; outline: none; border 1px solid black; display: inline-block;');
            div.appendChild(input);
            this.wrapper = div;
            this.textarea = input;
          };
          CodeMirror.inputStyles.password = PasswordInput;
        }

        var defaultOpts = {};
        for (var k in initOpts) {
          if (k in CodeMirror.defaults) { defaultOpts[k] = initOpts[k]; }
        }

        function codemirror(node, options) {
          var ctx = this.getContext(node);
          if (typeof options === 'string') { options = { bind: options }; }
          var opts = Object.assign({}, defaultOpts, options);
          var editor, observer, lock;

          var cmOpts = {};
          for (var k in opts) { if (k in CodeMirror.defaults) { cmOpts[k] = opts[k]; } }

          if (node.nodeName.toLowerCase() === 'textarea') {
            editor = CodeMirror.fromTextArea(node, cmOpts);
          } else {
            editor = new CodeMirror(node, cmOpts);
          }

          editor.on('change', function () {
            if (observer && !lock) {
              lock = true;
              ctx.set(opts.bind, editor.getValue());
              if (ctx.hasListener('change')) {
                ctx.raise('change');
              }
              lock =false;
            }
          });

          function resize() {
            editor.display.wrapper.style.height = '20px';
            editor.display.wrapper.style.height = (editor.display.wrapper.parentNode.clientHeight) + "px";
            editor && editor.refresh();
          }
          var listener = ctx.get('@.root').on('*.resize', resize);

          function bind() {
            var cur = editor.getCursor();

            if (observer) {
              observer.cancel();
              observer = null;
            }

            if (opts.bind) {
              observer = ctx.observe(opts.bind, function (v) {
                if (!lock) {
                  lock = true;
                  if (editor.getValue() !== v) {
                    var cur = editor.getCursor();
                    editor.setValue(v);
                    editor.setCursor(cur);
                  }
                  lock = false;
                }
              });
            }

            // sync up the codemirror options
            for (var k in opts) {
              if (k in CodeMirror.defaults && editor.getOption(k) !== opts[k]) { editor.setOption(k, opts[k]); }
            }

            editor.setCursor(cur);
          }

          setTimeout(resize, 300);

          bind();

          return {
            editor: editor,
            resize: resize,
            teardown: function teardown() {
              if (observer) { observer.cancel(); }
              if (editor.toTextEditor) { editor.toTextEditor(); }
              editor = null;
              listener.cancel();
            },
            update: function update(options) {
              if (typeof options === 'string') { options = { bind: options }; }
              opts = Object.assign({}, defaultOpts, options);
                  
              bind();
            }
          };
        }

        function plugin(ref) {
          var instance = ref.instance;

          instance.decorators[initOpts.name || 'codemirror'] = codemirror;
        }

        plugin.plugin = plugin;
        plugin.codemirror = codemirror;

        return plugin;
      }

      var CodeMirrorEditor = (function (Window) {
          function CodeMirrorEditor(opts) { Window.call(this, opts); }

          if ( Window ) CodeMirrorEditor.__proto__ = Window;
          CodeMirrorEditor.prototype = Object.create( Window && Window.prototype );
          CodeMirrorEditor.prototype.constructor = CodeMirrorEditor;

          return CodeMirrorEditor;
        }(Window));
      exports('default', CodeMirrorEditor);
        // lazy load codemirror via script injection if it's not already available
        var CM = typeof CodeMirror === 'undefined' ?
          new Promise(function (ok) {
            var waits = [];
            [
              'https://cdn.jsdelivr.net/npm/codemirror@5/lib/codemirror.js',
              'https://cdn.jsdelivr.net/npm/codemirror@5/mode/javascript/javascript.js',
              'https://cdn.jsdelivr.net/npm/codemirror@5/mode/gfm/gfm.js',
              'https://cdn.jsdelivr.net/npm/codemirror@5/mode/sql/sql.js',
              'https://cdn.jsdelivr.net/npm/codemirror@5/mode/shell/shell.js',
              'https://cdn.jsdelivr.net/npm/codemirror@5/keymap/vim.js',
              'https://cdn.jsdelivr.net/npm/codemirror@5/addon/selection/active-line.js'
            ].forEach(function (src) {
              var tag = document.createElement('script');
              tag.src = src;
              tag.async = false;
              waits.push(new Promise(function (ok) {
                tag.onload = function () { return ok(); };
              }));
              document.head.appendChild(tag);
            });

            [
              'https://cdn.jsdelivr.net/npm/codemirror@5.35.0/lib/codemirror.css',
              'https://cdn.jsdelivr.net/npm/codemirror@5.35.0/theme/ambiance.css',
              'https://cdn.jsdelivr.net/npm/codemirror@5.35.0/theme/monokai.css',
              'https://cdn.jsdelivr.net/npm/codemirror@5.35.0/theme/solarized.css',
              'https://cdn.jsdelivr.net/npm/codemirror@5.35.0/theme/railscasts.css' ].forEach(function (href) {
              var tag = document.createElement('link');
              tag.rel = 'stylesheet';
              tag.href = href;
              waits.push(new Promise(function (ok) {
                tag.onload = function () { return ok(); };
              }));
              document.head.appendChild(tag);
            });
            
            Promise.all(waits).then(function () {
              CM = CodeMirror;
              ok();
            });
          }) :
          CodeMirror;

        Window.extendWith(CodeMirrorEditor, {
          template: {v:4,t:[{t:55,f:[{f:["\n  Loading CodeMirror...\n"],t:4},{t:62,f:["\n",{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    The `codemirror` decorator turns an element into a [CodeMirror](https://codemirror.net) editor. Since this requires an external library, it is packaged as a plugin constructor that will accept a `CodeMirror` singleton as an option. If no `CodeMirror` option is supplied, the decorator will try to use the global `CodeMirror` and throw an error if none is found.\n\n    Since CodeMirror options tend not to be complicated, the decorator simply merges in the object you to it with those supplied to the plugin constructor and calls `setOption` for all of the keys that exist within `CodeMirror.defaults`.\n\n    CodeMirror instances aren't as touchy about changing size as some plugins, but they still need to be notified when their parent container is resized. To that end, the decorator will automatically install a listener on the root Ractive instance listening for `resize` events, which will catch things like window and split resizes.\n\n    One of the benefits to CodeMirror is its flexible input model, which means that for those mobile browsers with pesky forced autocomplete/autocapitalize/auto-erase-stuff-I-just-typed, you can use a password input as a backing field to have all of that forcibly disabled. This is available in CodeMirror starting with 5.36.0.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin Options\n\n    All options are optional.\n\n    * `CodeMirror: CodeMirror = CodeMirror` - the CodeMirror singleton to use to create editor instances\n    * `name: string = 'codemirror`' - the name to use when installing the decorator as a plugin\n\n    ### Decorator Options\n\n    All options are optional.\n\n    Any of the [CodeMirror options](https://codemirror.net/doc/manual.html#config) can be passed here as well.\n\n    * `bind: string` - a local keypath to which to bind the editor value\n\n    ### Decorator Events\n\n    * `change` - if present on the decorated element, a change event will be fired every time the editor fires a change event\n\n    ### Decorator Handle\n\n    Decorator handles are accessible from the context of the decorated node e.g. `ractive.getContext('.ace-editor').decorators['ace-editor']`;\n\n    * `editor` - the editor instance installed by the decorator\n    * `focus()` - focus the editor\n    * `resize()` - request that the editor respond to a change in size\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13},{n:"no-pad",f:0,t:13}],f:["\n    ",{t:7,e:"split",f:["\n      ",{t:7,e:"div",m:[{n:"size",f:"20",t:13}],f:["\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Wrap\n          ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".wrap"}],t:13}]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Line numbers\n          ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".num"}],t:13}]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Highlight active\n          ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".hiline"}],t:13}]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            Syntax\n            ",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".syntax"}],t:13}],f:["\n              ",{t:7,e:"option",m:[{n:"value",f:"text",t:13}],f:["(default)"]},"\n              ",{t:7,e:"option",f:["javascript"]},"\n              ",{t:7,e:"option",f:["sql"]},"\n              ",{t:7,e:"option",f:["shell"]},"\n              ",{t:7,e:"option",f:["gfm"]},"\n            "]},"\n          "]},"\n        \n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Theme\n          ",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".theme"}],t:13}],f:["\n            ",{t:7,e:"option",f:["default"]},"\n            ",{t:7,e:"option",f:["ambiance"]},"\n            ",{t:7,e:"option",f:["monokai"]},"\n            ",{t:7,e:"option",f:["solarized"]},"\n            ",{t:7,e:"option",f:["railscasts"]},"\n          "]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Key Mode\n          ",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".keys"}],t:13}],f:["\n            ",{t:7,e:"option",m:[{n:"value",f:"default",t:13}],f:["(none)"]},"\n            ",{t:7,e:"option",f:["vim"]},"\n            ",{t:7,e:"option",f:["emacs"]},"\n          "]},"\n        "]},"\n\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n          Value\n          ",{t:7,e:"textarea",f:[{t:2,r:".text"}]},"\n        "]},"\n      "]},"\n      ",{t:7,e:"div",m:[{n:"codemirror",t:71,f:{r:[".wrap",".num",".hiline",".keys",".syntax",".theme"],s:"[{bind:\".text\",lineWrapping:_0,lineNumbers:_1,styleActiveLine:_2,keyMap:_3,mode:_4,theme:_5}]"}},{n:"style-height",f:"100%",t:13},{n:"style-overflow",f:"hidden",t:13}]},"\n    "]},"\n  "]},"\n"]},"\n"]}],r:"codemirror"}],e:{"[{bind:\".text\",lineWrapping:_0,lineNumbers:_1,styleActiveLine:_2,keyMap:_3,mode:_4,theme:_5}]":function (_0,_1,_2,_3,_4,_5){return([{bind:".text",lineWrapping:_0,lineNumbers:_1,styleActiveLine:_2,keyMap:_3,mode:_4,theme:_5}]);}}}, css: "",
          use: [json(), Split()],
          options: {
            id: 'Codemirror',
            title: 'Decorators :: CodeMirror',
            width: '40em', height: '30em',
            resizable: true, flex: true
          },
          data: function data() {
            return { codemirror: CM };
          }
        });

        if (CM instanceof Promise) {
          CM.then(function () { return CodeMirrorEditor.use(init({ tabSize: 2, indentWithTabs: false, inputStyle: 'password' })); });
        } else {
          CodeMirrorEditor.use(init({ tabSize: 2, indentWithTabs: false, inputStyle: 'password' }));
        }

    }
  };
});
