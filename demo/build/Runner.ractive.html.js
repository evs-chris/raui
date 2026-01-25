System.register(['./chunk2.js', './chunk9.js'], function (exports, module) {
  'use strict';
  var Window, runner, WindowList, MenuList;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      runner = module.default;
      WindowList = module.WindowList;
      MenuList = module.MenuList;
    }],
    execute: function () {

      var Runner_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    A keyboard-centric way to interact with an application is often more convenient than any other way for more complex applications. To aid with that, Raui provides a Runner component that has an input that it passes to registered plugins and displays any plugin results in a list.\n\n    The runner input automatically focuses when the runner is shown, and it will handle Esc to hide, up and down arrows to select results, and Enter to select results.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'runner'` - the name to use when registering the partial in the host\n\n    ### API\n\n    * `addPlugin(plugin)` - registers a plugin with the runner. Plugins are objects that have a string name and a function run, which should accept a string used to produce results. Results may be a string, a two-value array with a string first and arbitrary value second, or an object with a string label property and arbitrary value value property. Results may be returned as a Promise (or then-able object). The plugin may also provide an action function, which will be called with a result value when a result is selected. The action may return false or a Promise that resolves to false to prevent closing the runner upon selection.\n    * `show()` - shows the runner.\n    * `hide()` - hides the runner.\n    * `showHide()` - toggles the visibilty of the runner.\n    * `popped` - the binding that controls whether the runner is visible.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"runner",m:[{n:"popped",t:13,f:[{t:2,r:"popped"}]},{n:["init"],t:70,f:{r:["@this","$1"],s:"[_0.setup(_1)]"}}]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"inline",g:1},{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"popped\")]"}}],f:["Show Runner"]}]}," ",{t:7,e:"div",f:["There is also a runner built into the demo application that gives access to all of the menu items. Press Ctrl+p or Cmd+p to activate the application's runner."]}]}]}],e:{"[_0.setup(_1)]":function (_0,_1){return([_0.setup(_1)]);},"[_0.toggle(\"popped\")]":function (_0){return([_0.toggle("popped")]);}}}, css: "",
        cssId: 'runner-demo',
        use: [runner()],
        options: {
          title: 'Component :: Runner',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            options: {
            }
          }
        },
        setup: function setup(run) {
          run.addPlugin(WindowList(app.host));
          run.addPlugin(MenuList(app.findComponent('menu'), { flat: true }));
        },
      }));

    }
  };
});
