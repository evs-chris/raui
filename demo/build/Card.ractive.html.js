System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Card_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    A Material card macro partial that is mostly a placeholder pending me actually needing full card functionality like headers, buttons, tabs, and image stuff. Right now I mostly just use them as convenient blocks for lists of items. They play really well with the grid decorator.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    \n  "]},"\n"]}]},
          options: {
            title: 'Component :: Card',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          }
        }));

    }
  };
});
