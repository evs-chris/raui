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

      var Form = (function (Window) {
          function Form(opts) { Window.call(this, opts); }

          if ( Window ) Form.__proto__ = Window;
          Form.prototype = Object.create( Window && Window.prototype );
          Form.prototype.constructor = Form;

          return Form;
        }(Window));
      exports('default', Form);
        Window.extendWith(Form, {
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    Material forms a little bit polarizing, but this decorator tries to take a fairly unobtrusive approach. You wrap your input element in a `label` with the `field` decorator, and the decorator handles the rest based on the content of the label. It also provides a CSS function to apply the styling at the root of your app.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"grid",t:71}],f:["\n        ",{t:7,e:"div",m:[{n:"class-row",t:13}],f:["\n          ",{t:7,e:"label",m:[{n:"field",t:71},{n:"class-t1-3",t:13}],f:["Input Field",{t:7,e:"input"}]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71},{n:"class-t1-3",t:13}],f:["Select Field",{t:7,e:"select",f:[{t:7,e:"option",f:["option1"]},{t:7,e:"options",f:["option2"]}]}]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71},{n:"class-t1-3",t:13}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13}]}," Checkbox"]},"\n        "]},"\n      "]},"\n  "]},"\n"]}]}, css: "",
          decorators: { grid: grid },
          options: {
            id: 'Form',
            title: 'Decorators :: Form',
            width: '40em', height: '30em',
            flex: true
          }
        });

    }
  };
});
