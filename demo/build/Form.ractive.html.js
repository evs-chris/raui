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
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"secondary",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Material forms a little bit polarizing, but this decorator tries to take a fairly unobtrusive approach. You wrap your input element in a `label` with the `field` decorator, and the decorator handles the rest based on the content of the label. Handling for fields includes plain inputs, checkboxes, selects, buttons, and textareas.\n\n    The decorator comes with a handlful of styles that need to be applied. When using the plugin, the styles are automatically registered in the appropriate place. When using the decorator directly, you'll need to apply the provided style function as part of a component CSS function.\n\n    There's also an included autofocus decorator that will focus its node automatically when it is rendered.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'field'` - the name to use when registering the field decorator as a plugin\n    * `autofocusName: string = 'autofocus'` - the name to use when registering the autofocus decorator as a plugin\n\n    ### Arguments\n\n    _None_\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["### Template:\n\n      ```hbs\n      <div as-grid>\n        <div class-row>\n          <label as-field class-t1-3>Input field<input /></label>\n          <label as-field class-t1-3>Select field<select><option>option1</option><option>option2</option><options>option2</options></select></label>\n          <label as-field class-t1-3><input type=\"checkbox\" /> Checkbox</label>\n          <label as-field class-t1-3>Another field<input /></label>\n          <label as-field class-t1-3>A file<input type=\"file\" /></label>\n          <label as-field>\n            A text block\n            <textarea></textarea>\n          </label>\n        </div>\n      </div>\n      ```\n\n      ### Result:"]}," ",{t:7,e:"div",m:[{n:"grid",t:71}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"row",g:1}],f:[{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:["Input field",{t:7,e:"input"}]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:["Select field",{t:7,e:"select",f:[{t:7,e:"option",f:["option1"]},{t:7,e:"option",f:["option2"]},{t:7,e:"options",f:["option2"]}]}]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13}]}," Checkbox"]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:["Another field",{t:7,e:"input"}]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1-3",g:1},{n:"field",t:71}],f:["A file",{t:7,e:"input",m:[{n:"type",f:"file",t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["A text block ",{t:7,e:"textarea"}]}]}]}]}]}]}, css: "",
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
