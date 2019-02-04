System.register(['./chunk14.js', './chunk2.js', './chunk6.js'], function (exports, module) {
  'use strict';
  var split, Window, Menu;
  return {
    setters: [function (module) {
      split = module.default;
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
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    A two- or more paned splitter that can be rendered as either vertical or horizontal. The split tries to be mobile friendly by having a large enough handle to hit with a finger and watching for touch events. Panes also come with minimize and maximize buttons by default that will shrink the pane to 0% and let the surrounding panes absorb its space.\n\n    Split children are set up in their own panes, and you can use the special `pane` child to embed non-element content directly into a pane, as the contents of the `pane` element are used rather than the `pane` element itself.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'split'` - the name to use when registering the plugin as a component\n\n    ### Attributes\n    \n    * `vertical: boolean = false` - whether this split should have vertical panes. This defaults to `false`, so the default split uses horizontal panes.\n    * `draggable: boolean = true` - whether the panes should be resizable by dragging the split handle\n    * `maximizable: boolean = true` - whether the panes are maximizable\n    * `minimizable: boolean = true` - whether the panes are minimizable\n\n    #### Child attributes\n\n    * `size: number` - the width of the pane as a percentage. This defaults to an equal amount of the space available in the split.\n    * `minimize: boolean = false` - whether the split should start out minimized\n\n    ### API\n\n    * `maximize(index: number)` - maximize the pane at the given index\n    * `minimize(index: number)` - minimize the pane at the given index\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;",g:1},{n:"size",f:"30",t:13,g:1}],f:[{t:7,e:"marked",f:["        ### Template:\n        ```hbs\n        <split>\n          <div>1</div>\n          <div>\n            1<br/>\n            2.2 size: <input value=\"{{sizer}}\" lazy=500 />\n          </div>\n          <split vertical>\n            <div minimize>2.1</div>\n            <div size=\"{{sizer}}\">2.2</div>\n            <div>2.3</div>\n          </split>\n          <div size=50>3</div>\n        </split>\n        ```\n        ### Result:\n      "]}]}," ",{t:7,e:"div",f:[{t:7,e:"split",f:[{t:7,e:"div",f:["1",{t:7,e:"br"}," 2.2 size: ",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"sizer"}],t:13},{t:73,v:"l",f:"500"}]}]}," ",{t:7,e:"split",m:[{n:"vertical",f:0,t:13}],f:[{t:7,e:"div",m:[{n:"minimize",f:0,t:13}],f:["2.1"]}," ",{t:7,e:"div",m:[{n:"size",f:[{t:2,r:"sizer"}],t:13}],f:["2.2"]}," ",{t:7,e:"div",f:["2.3"]}]}," ",{t:7,e:"div",m:[{n:"size",f:"50",t:13,g:1}],f:["3"]}]}]}]}]}]}]}, css: "",
        use: [split(), Menu()],
        options: {
          id: 'split',
          title: 'Component :: Split',
          width: '40em', height: '30em',
          flex: true
        },
        data: function data() {
          return { sizer: 60 };
        }
      });

    }
  };
});
