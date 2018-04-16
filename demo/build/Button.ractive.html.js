System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Button_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"secondary",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The button helper is just a CSS function that gives you Material `<button>`s. When passed to an instance, the styles will be registered with `Ractive.addCSS`, and when passed to a constructor (component), they will augment the existing `css` for the constructor.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ```javascript\n    import plugin from 'raui/es/button';\n\n    Ractive.use(plugin());\n\n    // or\n    MyComponent.use(plugin());\n\n    // or\n    const r = new Ractive();\n    r.use(plugin());\n\n    // or\n    new Ractive({\n      use: [plugin(())]\n    });\n\n    // or\n    const MyComponent = Ractive.extend({\n      use: [plugin()]\n    });\n    ```\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"button",f:["Material Button"]}," ",{t:7,e:"button",m:[{t:13,n:"class",f:"flat",g:1}],f:["A Flat Button"]}," ",{t:7,e:"button",f:["A Third Button"]}," ",{t:7,e:"button",m:[{t:13,n:"class",f:"round",g:1}],f:["+"]},{t:7,e:"br"}," ",{t:7,e:"button",m:[{t:13,n:"style",f:"color: #fff; background-color: #07e;;",g:1}],f:["Colorful"]}]}]}]},
        use: [],
        options: {
          title: 'Helper :: Button',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        css: true
      }));

    }
  };
});
