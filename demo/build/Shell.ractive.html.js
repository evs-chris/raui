System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Shell_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"pad",f:0,t:13},{n:"height",f:"dynamic",t:13},{n:"flat",f:0,t:13},{n:"class-secondary",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    Every app needs a good wrapper, and this aims to be it. The Shell provides three sections, `<left>`, `<center>`, and `<right>`, which are managed responsively, so the left and right containers are automatically shown and hidden based on the available width of the window, whereas the center is always rendered. The Shell also exposes hooks to dynamically show and hide the left and right sides.\n\n    Shell also contains support for toasting, because most apps also need a convenient way to give the user feedback.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n\n  "]},"\n"]}]}, css: "",
          use: [],
          options: {
            title: 'Components :: Shell',
            width: '40em', height: '30em',
            flex: true
          }
        }));

    }
  };
});
