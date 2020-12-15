System.register(['./chunk2.js', './chunk9.js'], function (exports, module) {
  'use strict';
  var Window, date;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      date = module.default;
    }],
    execute: function () {

      var validate_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n      ```\n      ### Result:\n    "]}]}]}]},
        options: {
          title: 'Helpers :: Validate',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        }
      }));

    }
  };
});
