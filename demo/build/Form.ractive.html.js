System.register(['./chunk2.js', './chunk6.js'], function (exports, module) {
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
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"secondary",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    TODO\n\n    Material forms a little bit polarizing, but this decorator tries to take a fairly unobtrusive approach. You wrap your input element in a `label` with the `field` decorator, and the decorator handles the rest based on the content of the label. It also provides a CSS function to apply the styling at the root of your app.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",m:[{n:"grid",t:71}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"row",g:1}],f:[{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:["Input Field",{t:7,e:"input"}]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:["Select Field",{t:7,e:"select",f:[{t:7,e:"option",f:["option1"]},{t:7,e:"options",f:["option2"]}]}]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13}]}," Checkbox"]}]}]}]}]}]}, css: "",
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
