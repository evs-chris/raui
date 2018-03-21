System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      function button(data) {
        return ("\n    button, .btn {\n      text-decoration: none;\n      text-align: center;\n      letter-spacing: 0.5px;\n      cursor: pointer;\n      user-select: none;\n      border: none;\n      border-radius: 2px;\n      padding: 0 2rem;\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n        0 1px 5px 0 rgba(0, 0, 0, 0.12),\n        0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      transition: 0.2s ease-in-out;\n      transition-property: box-shadow, opacity, background-color;\n      font-size: 1em;\n      line-height: 1.5em;\n      background-color: " + (data('button.bg') || data('bg2') || '#ddd') + ";\n      color: " + (data('button.fg') || data('fg2') || '#222') + ";\n      vertical-align: middle;\n      min-height: 2.25em;\n      outline: 0;\n      margin: 0.25em;\n      position: relative;\n      overflow: hidden;\n      -webkit-tap-highlight-color: transparent;\n    }\n\n    button[disabled], .btn.disabled {\n      opacity: 0.7;\n      cursor: not-allowed;\n    }\n\n    button.round {\n      width: 2.2em;\n      height: 2.2em;\n      border-radius: 100%;\n      line-height: 2.2em;\n      text-align: center;\n      padding: 0;\n    }\n\n    button.flat, .btn.flat {\n      background-color: " + (data('button.flat.bg') || data('bg1') || '#fefefe') + ";\n      color: " + (data('button.flat.fg') || data('fg1') || '#222') + ";\n      box-shadow: none;\n    }\n\n    button.alt1, .btn.alt1 {\n      bakcground-color: " + (data('alt1.bg2') || '#ddd') + ";\n      color: " + (data('alt1.fg2') || '#222') + ";\n    }\n\n    button.alt1.flat, .btn.alt1.flat {\n      background-color: " + (data('alt1.bg1') || '#fefefe') + ";\n      color: " + (data('alt1.fg1') || '#222') + ";\n    }\n\n    button.alt2, .btn.alt2 {\n      bakcground-color: " + (data('alt2.bg2') || '#ddd') + ";\n      color: " + (data('alt2.fg2') || '#222') + ";\n    }\n\n    button.alt2.flat, .btn.alt2.flat {\n      background-color: " + (data('alt2.bg1') || '#fefefe') + ";\n      color: " + (data('alt2.fg1') || '#222') + ";\n    }\n\n    button:hover, .btn:hover {\n      opacity: 0.9;\n      box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14),\n      0 1px 7px 0 rgba(0,0,0,0.12),\n      0 3px 1px -1px rgba(0,0,0,0.2);\n    }\n\n    button[disabled]:hover, .btn.disabled:hover {\n      opacity: 0.7;\n    }\n\n    button.flat:hover, .btn.flat:hover {\n      box-shadow: none;\n    }\n\n    button:after {\n      content: ' ';\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 2em, transparent 2.1em);\n      opacity: 0;\n      transform: scale(5, 5);\n      transition: opacity 1s ease-out, transform 0.5s ease-in;\n    }\n\n    button.flat:after {\n      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);\n    }\n\n    button.round:after {\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0.75em, transparent 0.76em);\n    }\n\n    button.round.flat:after {\n      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0.75em, transparent 0.76em);\n    }\n\n    button:before {\n      content: ' ';\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      background-color: rgba(0, 0, 0, 0.075);\n      opacity: 0;\n      top: 0;\n      left: 0;\n      transition: opacity 0.4s ease-in-out;\n    }\n    button:focus:before {\n      opacity: 1;\n    }\n    button.flat:hover:before {\n      opacity: 0.5;\n    }\n    \n    button:active:after {\n      transform: scale(1, 1);\n      opacity: 1;\n      transition: none;\n    }\n  ");
      }

      function plugin() {
        return function(ref) {
          var instance = ref.instance;
          var Ractive = ref.Ractive;

          if (instance === Ractive || Ractive.isInstance(instance)) {
            Ractive.addCSS('raui-button', button);
          } else {
            var css = instance.css;
            instance.css = function(data) {
              var res = typeof css === 'string' ? css : typeof css === 'function' ? css(data) : '';
              return res + button(data);
            };
          }
        };
      }

      var Button_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    The button helper is just a CSS function that gives you Material `<button>`s. When passed to an instance, the styles will be registered with `Ractive.addCSS`, and when passed to a constructor (component), they will augment the existing `css` for the constructor.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ```javascript\n    import plugin from 'raui/es/button';\n\n    Ractive.use(plugin());\n\n    // or\n    MyComponent.use(plugin());\n\n    // or\n    const r = new Ractive();\n    r.use(plugin());\n\n    // or\n    new Ractive({\n      use: [plugin(())]\n    });\n\n    // or\n    const MyComponent = Ractive.extend({\n      use: [plugin()]\n    });\n    ```\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"button",f:["Material Button"]}," ",{t:7,e:"button",m:[{n:"class-flat",t:13}],f:["A Flat Button"]}," ",{t:7,e:"button",f:["A Third Button"]}," ",{t:7,e:"button",m:[{n:"class-round",t:13}],f:["+"]},{t:7,e:"br"},"\n    ",{t:7,e:"button",m:[{n:"style",f:"color: #fff; background-color: #07e;",t:13}],f:["Colorful"]},"\n  "]},"\n"]}]},
          use: [plugin()],
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
