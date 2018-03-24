System.register(['./chunk2.js', './chunk5.js'], function (exports, module) {
  'use strict';
  var Window, grid;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      grid = module.grid;
    }],
    execute: function () {

      var Grid = (function (Window) {
          function Grid(opts) { Window.call(this, opts); }

          if ( Window ) Grid.__proto__ = Window;
          Grid.prototype = Object.create( Window && Window.prototype );
          Grid.prototype.constructor = Grid;

          return Grid;
        }(Window));
      exports('default', Grid);
        Window.extendWith(Grid, {
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    The grid decorator takes your usual CSS grid (no, not `display: grid`) and makes it container-aware, meaning that it will respond to its container changing sizes rather than just the window. It does so by listening to both window resize events and any Ractive resize events that happen to bubble up to its root instance.\n\n    You can also customize the breakpoints and sizes available in the grid fairly easily, as it provides a CSS function to be included in your main instance that handles the breakpoints and their corresponding sizes. The defaults cover a range from tiny (t at 0 to 20em) to ginormous (g at 150em+) and halves, thirds, quarters, fifths, and eighths for the smaller breakpoints up to tenths, twelfths, twentieths, twenty-fourths, thirty-seconds, and sixty-fourths for the largest.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"grid",t:71}],f:["\n        ",{t:7,e:"div",m:[{n:"class-row",t:13},{n:"class-row-t1-2",t:13},{n:"class-row-m1-3",t:13},{n:"class-row-l1-4",t:13}],f:["\n          ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 1"]},"\n          ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 2"]},"\n          ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 3"]},"\n          ",{t:7,e:"div",m:[{n:"class",f:"pad m1-2",t:13}],f:[{t:7,e:"div",m:[{n:"class",f:"thing",t:13},{n:"class-m1-2",t:13}],f:["Thing 4"]}]},"\n          ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 5"]},"\n          ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 6"]},"\n          ",{t:7,e:"div",m:[{n:"class-t1-2",t:13}],f:["\n            ",{t:7,e:"div",m:[{n:"class-row",t:13},{n:"class-row-t1-3",t:13},{n:"class-row-pad",t:13}],f:["\n              ",{t:7,e:"div",f:[{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 7.1"]}]},"\n              ",{t:7,e:"div",f:[{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 7.2"]}]},"\n              ",{t:7,e:"div",f:[{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 7.3"]}]},"\n              ",{t:7,e:"div",f:[{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 7.4"]}]},"\n            "]},"\n          "]},"\n        "]},"\n        ",{t:7,e:"div",m:[{n:"class-row",t:13}],f:["\n          ",{t:7,e:"div",m:[{n:"class-t4-5",t:13}],f:["\n            ",{t:7,e:"div",m:[{n:"class-row",t:13},{n:"class-row-t1-4",t:13}],f:["\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 10"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 11"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 12"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 13"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 14"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 15"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 16"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 17"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 18"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 19"]},"\n            "]},"\n          "]},"\n          ",{t:7,e:"div",m:[{n:"class-t1-5",t:13}],f:["\n            ",{t:7,e:"div",m:[{n:"class-row",t:13}],f:["\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 20"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 21"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 22"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 23"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 24"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 25"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 26"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 27"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 28"]},"\n              ",{t:7,e:"div",m:[{n:"class",f:"thing",t:13}],f:["Thing 29"]},"\n            "]},"\n          "]},"\n        "]},"\n      "]},"\n    "]},"\n  "]}]}, css: " div.thing { padding: 1.5em; border: 1px solid black; } ",
          decorators: { grid: grid },
          options: {
            id: 'grid',
            title: 'Decorators :: Grid',
            width: '40em', height: '30em',
            flex: true,
            resizable: true
          }
        });

    }
  };
});
