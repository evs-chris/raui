System.register(['./chunk2.js', './chunk10.js'], function (exports, module) {
  'use strict';
  var Window, toast, json;
  return {
    setters: [function (module) {
      Window = module.Window;
      toast = module.default$3;
    }, function (module) {
      json = module.default;
    }],
    execute: function () {

      var Toast_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:8,r:"toast"},"\n",{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    Nearly every app needs to give user feedback when some actions occur, and one reasonably good Material-ish way to achieve that is with toast and/or snackbar messages. To that end, raui provides a helper to add toasting to any old instance, though it is particularly suited to things like the shell and window host.\n\n    \n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'toast'` - the name to use when registering the partial in the host\n    * `timeout: number = 6000` - default number of milliseconds to display a message before it is automatically closed\n    * `top: boolean = true` - default toast position to the top of its container\n    * `bottom: boolean` - default toast position to the bottom of its container\n    * `left: boolean` - default toast position to the left of its container\n    * `right: boolean` - default toast position to the right of its container\n    * `type: 'success' | 'info' | 'warn' | 'error'` - the type of the message. You can add additional message types as `.rtoast-${type}`\n    * `class: string` - additional class(es) to add to the message container\n    * `dismissable: boolean` - if not `false`, the message won't close when clicked\n    * `buttons: Button[]` - a list of buttons to display at the end of the message. If no buttons are supplied and the message is dismissable, a close button is automatically provided\n      * `class: string` - additional class(es) to add to the button\n      * `label: string` - the label to display on the button\n      * `action: () => void` - a function to call when the button is activated\n\n    ### API\n\n    Message location defaults to the top center of the container. The left or right option can be combined with the opt or bottom option so that you can hit the four corners or top or bottom center.\n\n    * `toastDefaults = { timeout: 6000, top: true }` - plus any other options you passed to the plugin\n    * `toast(message, options)` - queue a message to displayed in the toast area in the order queued\n      * options are assigned over the defaults above\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Message",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".message"}],t:13}]}]},"\n    ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this",".message",".options"],s:"[_0.toast(_1||\"This is a toast\",_2)]"}}],f:["Toast"]}]},"\n    ",{t:7,e:"h3",f:["Options"]},"\n    ",{t:7,e:"json-editor",m:[{n:"root",f:[{t:2,r:".options"}],t:13}]},"\n  "]},"\n"]}],e:{"[_0.toast(_1||\"This is a toast\",_2)]":function (_0,_1,_2){return([_0.toast(_1||"This is a toast",_2)]);}}}, css: "",
          cssId: 'toast-demo',
          use: [toast(), json()],
          options: {
            title: 'Helper :: Toast',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          },
          data: function data() {
            return {
              options: {
                timeout: 6000,
                top: true
              }
            }
          }
        }));

    }
  };
});
