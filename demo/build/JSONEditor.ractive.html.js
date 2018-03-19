System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var JSONEditor_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    This is a tree-style data editor that allows managing objects and arrays filled with primitive values. It can be set up as read only to just display the data or as editable  to allow adding and removing keys and indices and changing values.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    \n  "]},"\n"]}]},
        options: {
          title: 'Component :: JSONEditor',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        }
      }));

    }
  };
});
