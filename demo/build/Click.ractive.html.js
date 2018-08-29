System.register(['./chunk2.js', './chunk8.js'], function (exports, module) {
  'use strict';
  var Window, click;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      click = module.default;
    }],
    execute: function () {

      var Click_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    It's nearly impossible to mix `click` and `dblclick` when dealing with plain old DOM events. It's also a bit challenging to handle touchscreen taps and double taps. Tap or click and hold also take a bit more work.\n\n    To handle all things poke, raui provides the click event, which can handle as many consecutive pokes as you like, optionally with the last requiring a hold in order to fire. This is based on the `ractive-event-tap` code, so it also handles poke and wiggle, poke and hold (when not desired), and select on buttons.\n\n    __Note:__ Because handling multiple clicks requires waiting around a bit to make sure more aren't coming, this plugin will introduce a slight delay to your UI responding to clicks. It defaults to 250ms, which seems to be a reasonable compromise between making multiple clicks hard to register and making the UI feel laggy.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = '${count || 1}clicks'` - the name to use when registering the plugin as an event. If no `name` and `count` are provided, the default is `'clicks'`.\n    * `count: number = 1` - the number of clicks or taps that this event should handle\n    * `hold: boolean = false` - whether the last click of the event sequence should be held in order to fire\n    * `delay: number = 250` - maximum time between clicks when `count` is greater than 1\n    * `bubble: boolean` - whether the event should be allowed to bubble\n\n    ### Init arguments\n\n    The `count`, `hold`, `delay`, and `bubble` options can also be specified as init arguments on the event e.g. `<button on-clicks({ count: 2, hold: true })=\"console.log('click-click+hold')\">double tap-n-hold me</button>`.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```hbs\n      <button on-clicks({ count: 1 })=\"@.set('message', 'button clicked')\">one click</button>\n      <button on-clicks({ hold: true })=\"@.set('message', 'button held')\">hold me</button>\n      <button on-clicks({ count: 2 })=\"@.set('message', 'double tap')\" on-clicks({ count: 1 })=\"@.set('message', 'just tapped')\">tap or double click and hold</button>\n      <button on-clicks({ count: 3 })=\"@.set('message', 'triple clicked, why not?')\">triple click me</button>\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"div",f:[{t:2,r:"message"}]}," ",{t:7,e:"button",m:[{n:["clicks"],t:70,a:{r:[],s:"[{count:1}]"},f:{r:["@this"],s:"[_0.set(\"message\",\"button clicked\")]"}}],f:["one click"]}," ",{t:7,e:"button",m:[{n:["clicks"],t:70,a:{r:[],s:"[{hold:true}]"},f:{r:["@this"],s:"[_0.set(\"message\",\"button held\")]"}}],f:["hold me"]}," ",{t:7,e:"button",m:[{n:["clicks"],t:70,a:{r:[],s:"[{count:2}]"},f:{r:["@this"],s:"[_0.set(\"message\",\"double tap\")]"}},{n:["clicks"],t:70,a:{r:[],s:"[{count:1}]"},f:{r:["@this"],s:"[_0.set(\"message\",\"just tapped\")]"}}],f:["tap or double click and hold"]}," ",{t:7,e:"button",m:[{n:["clicks"],t:70,a:{r:[],s:"[{count:3}]"},f:{r:["@this"],s:"[_0.set(\"message\",\"triple clicked, why not?\")]"}}],f:["triple click me"]}]}]}],e:{"[{count:1}]":function (){return([{count:1}]);},"[_0.set(\"message\",\"button clicked\")]":function (_0){return([_0.set("message","button clicked")]);},"[{hold:true}]":function (){return([{hold:true}]);},"[_0.set(\"message\",\"button held\")]":function (_0){return([_0.set("message","button held")]);},"[{count:2}]":function (){return([{count:2}]);},"[_0.set(\"message\",\"double tap\")]":function (_0){return([_0.set("message","double tap")]);},"[_0.set(\"message\",\"just tapped\")]":function (_0){return([_0.set("message","just tapped")]);},"[{count:3}]":function (){return([{count:3}]);},"[_0.set(\"message\",\"triple clicked, why not?\")]":function (_0){return([_0.set("message","triple clicked, why not?")]);}}},
        use: [click()],
        options: {
          title: 'Event :: Click',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            message: 'use the buttons'
          };
        }
      }));

    }
  };
});
