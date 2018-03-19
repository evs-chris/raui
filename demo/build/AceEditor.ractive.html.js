System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var AceEditor = (function (Window) {
          function AceEditor(opts) { Window.call(this, opts); }

          if ( Window ) AceEditor.__proto__ = Window;
          AceEditor.prototype = Object.create( Window && Window.prototype );
          AceEditor.prototype.constructor = AceEditor;

          return AceEditor;
        }(Window));
      exports('default', AceEditor);
        Window.extendWith(AceEditor, {
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n\n  "]},"\n"]}]}, css: "",
          options: {
            id: 'Ace',
            title: 'Decorators :: Ace Editor',
            width: '40em', height: '30em',
            flex: true
          }
        });

    }
  };
});
