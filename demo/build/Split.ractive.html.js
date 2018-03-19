System.register(['./chunk6.js', './chunk2.js', './chunk3.js'], function (exports, module) {
  'use strict';
  var Split, Window, Menu;
  return {
    setters: [function (module) {
      Split = module.default;
    }, function (module) {
      Window = module.Window;
    }, function (module) {
      Menu = module.default;
    }],
    execute: function () {

      var SplitDemo = (function (Window) {
          function SplitDemo(opts) { Window.call(this, opts); }

          if ( Window ) SplitDemo.__proto__ = Window;
          SplitDemo.prototype = Object.create( Window && Window.prototype );
          SplitDemo.prototype.constructor = SplitDemo;

          return SplitDemo;
        }(Window));
      exports('default', SplitDemo);
        Window.extendWith(SplitDemo, {
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    A two or more -sided splitter - either vertical or horizontal.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13},{n:"no-pad",f:0,t:13}],f:["\n    ",{t:7,e:"split",f:["\n        ",{t:7,e:"split",m:[{n:"vertical",f:0,t:13}],f:["\n          ",{t:7,e:"menu"},"\n          ",{t:7,e:"div",f:["right"]},"\n        "]},"\n        ",{t:7,e:"div",f:["middle"]},"\n        ",{t:7,e:"tabs",m:[{n:"flex",f:0,t:13},{n:"fill",f:0,t:13},{n:"class-secondary",t:13},{n:"flat",f:0,t:13},{n:"transition",f:"fade",t:13},{n:"height",f:"dynamic",t:13},{n:"pad",f:0,t:13}],f:["\n          ",{t:7,e:"tab",m:[{n:"title",f:"Demo",t:13}],f:["\n            Tab content\n          "]},"\n        "]},"\n      "]},"\n  "]},"\n"]}]}, css: "",
          use: [Split(), Menu()],
          options: {
            id: 'split',
            title: 'Component :: Split',
            width: '40em', height: '30em',
            flex: true
          }
        });

    }
  };
});
