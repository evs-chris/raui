System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window, toast;
  return {
    setters: [function (module) {
      Window = module.Window;
      toast = module.default$3;
    }],
    execute: function () {

      var Toast_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Nearly every app needs to give user feedback when some actions occur, and one reasonably good Material-ish way to achieve that is with toast and/or snackbar messages. To that end, raui provides a helper to add toasting to any old instance, though it is particularly suited to things like the shell and window host.\n\n    Toasts can appear top-center (the default), top-left, rop-right, bottom-center, bottom-left, or bottom-right. They have a message and a defaulted close button that can be disabled on a toast by toast basis. You can also add user-defined buttons to any toast, and there are five built-in types - plain, info, warn, error, and success - that can be added to fairly easily. By default, toasts will automatically close after six seconds, but the timeout is also overridable (or disable-able) on a toast by toast basis.\n\n    Only one toast message can be displayed at a time, so toasts are queued in an internal queue. When a toast is closed, the queue is checked for pending messages, and if one is found, it is shifted from the queue and displayed. This process repeats until the queue is drained.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'toast'` - the name to use when registering the partial in the host\n    * `timeout: number = 6000` - default number of milliseconds to display a message before it is automatically closed\n    * `top: boolean = true` - default toast position to the top of its container\n    * `bottom: boolean` - default toast position to the bottom of its container\n    * `left: boolean` - default toast position to the left of its container\n    * `right: boolean` - default toast position to the right of its container\n    * `type: 'success' | 'info' | 'warn' | 'error'` - the type of the message. You can add additional message types as `.rtoast-${type}`\n    * `class: string` - additional class(es) to add to the message container\n    * `dismissable: boolean` - if not `false`, the message won't close when clicked\n    * `buttons: Button[]` - a list of buttons to display at the end of the message. If no buttons are supplied and the message is dismissable, a close button is automatically provided\n      * `class: string` - additional class(es) to add to the button\n      * `label: string` - the label to display on the button\n      * `action: () => void` - a function to call when the button is activated\n    * `stack: boolean` - if true, multiple messages will be displayed at once\n\n    ### API\n\n    Message location defaults to the top center of the container. The left or right option can be combined with the top or bottom option so that you can hit the four corners or top or bottom center.\n\n    * `toastDefaults = { timeout: 6000, top: true }` - plus any other options you passed to the plugin\n    * `toast(message, options)` - queue a message to displayed in the toast area in the order queued\n      * options are assigned over the defaults above\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:8,r:"toast"}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Message",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".message"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["More",{t:7,e:"textarea",f:[{t:2,r:".options.more"}]}]}," ",{t:7,e:"div",f:[{t:7,e:"label",m:[{t:13,n:"class",f:"inline",g:1},{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this",".message",".options"],s:"[_0.set(\"@global.lastToast\",_0.toast(_1||\"This is a toast\",_2))]"}}],f:["Toast"]}]}," ",{t:7,e:"em",f:[{t:7,e:"strong",f:["*"]}]}," The most recently added toast is set to the global variable ",{t:7,e:"em",f:["lastToast"]}," if you want to play with the handle interface in the console."]}," ",{t:7,e:"h3",f:["Options"]}," ",{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"@this.toastDefaults.left"}],t:13}]}," Left?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"@this.toastDefaults.right"}],t:13}]}," Right?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"@this.toastDefaults.top"}],t:13}]}," Top?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"@this.toastDefaults.bottom"}],t:13}]}," Bottom?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".options.dismissable"}],t:13}]}," Dismissable?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Timeout",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".options.timeout"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Type",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".options.type"}],t:13}],f:[" ",{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"undefined"}}],t:13}],f:["None"]}," ",{t:7,e:"option",f:["success"]}," ",{t:7,e:"option",f:["info"]}," ",{t:7,e:"option",f:["warn"]}," ",{t:7,e:"option",f:["error"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"@this.toastDefaults.stack"}],t:13}]}," Stack?"]}]}]}]}],e:{"[_0.set(\"@global.lastToast\",_0.toast(_1||\"This is a toast\",_2))]":function (_0,_1,_2){return([_0.set("@global.lastToast",_0.toast(_1||"This is a toast",_2))]);},"undefined":function (){return(undefined);}}}, css: "",
        cssId: 'toast-demo',
        use: [toast()],
        options: {
          title: 'Helper :: Toast',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            options: {
              timeout: 6000,
              top: true,
              bottom: false,
              left: false,
              right: false,
              dismissable: true,
            }
          }
        }
      }));

    }
  };
});
