System.register(['./chunk2.js', './chunk11.js', './chunk17.js', 'ractive'], function (exports, module) {
  'use strict';
  var Window, pop, trigger, split, Ractive$1;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      pop = module.default;
      trigger = module.trigger;
    }, function (module) {
      split = module.default;
    }, function (module) {
      Ractive$1 = module.default;
    }],
    execute: function () {

      var Popover_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1},{n:"flat",f:0,t:13},{n:"flex",f:0,t:13}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["      Do you need to pop up some more info, or maybe an interactive form? You can probably use a popover for that.\n      \n      The Raui popover is a fairly simple component with a companion decorator. The component, named `pop` by default, takes your content and packages it into an absolutely positioned wrapper. The decorator, which takes the same name, again, `pop` by default, as the component, is used to toggle the variable that manages showing and hiding the popover content. The decorator is necessary to track the source for the popover, which is needed for positioning.\n    "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Plugin options\n  \n      All options are optional.\n  \n      * `name: string = 'shell'` - the name to use when installing the plugin as a component and decorator\n  \n      ## Component\n\n      ### Attributes\n  \n      * `popped: boolean` - the binding used to trigger show/hide\n      * `tail: boolean` - whether or not the popover should have a tail\n      * `where: 'below'|'above'|'left'|'right' = 'below'` - where the popover should appear relative to the trigger\n      * `align: 'start'|'middle'|'end' = 'middle'` - how to align the popover with the trigger - start to start (top or left), middle to middle, or end to end (right or bottom)\n      * `fit: boolean` - whether to try to keep the popover within the bounds of its offset parent. Be careful if you are using a lot of positioned small containers.\n      * `clickClose: boolean` - whether to close the popover when it is clicked\n      * `noClickout: boolean` - if `false` (the default), clicking outside of the popover will close it.\n  \n      ### API\n  \n      * `position(node?: Element)` - adjust the popover position, optionally relative to a specific node\n      * `show(trigger: Element)` - show the popover as if it were triggered by the given element\n      * `hide()` - hide the popover\n\n      ## Decorator\n  \n    "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;",g:1},{n:"size",f:"20",t:13,g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Where",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".where"}],t:13}],f:[{t:7,e:"option",f:["below"]},{t:7,e:"option",f:["above"]},{t:7,e:"option",f:["left"]},{t:7,e:"option",f:["right"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Align",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".align"}],t:13}],f:[{t:7,e:"option",f:["middle"]},{t:7,e:"option",f:["start"]},{t:7,e:"option",f:["end"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".tail"}],t:13}]}," Tail?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".fit"}],t:13}]}," Fit in container?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".popped"}],t:13},{t:73,v:"t",f:"false"},{n:["change"],t:70,f:"hover"}]},"Popped?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".click"}],t:13}]},"Click to close?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".noClick"}],t:13}]},"No clickout close?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"textarea",f:[{t:2,r:".template"}]}]}," ",{t:7,e:"marked",f:["            ### Template:\n            ```handlebars\n              <button style=\"position: absolute; left: 5%; top: 5%; width: 6em;\" as-pop=`.popped`>Pop</button>\n            <button style=\"position: absolute; right: 5%; top: 5%; width: 6em;\" as-pop=`.popped`>Pop</button>\n            <div as-pophover=`.popped` id=\"hover\" style=\"position: absolute; left: 5%; top: calc(50% - 1em); height: 2em; width: 4em; border: 1px solid #ccc; border-radius: 4px; padding: 0.2em;\">Hover</div>\n            <button style=\"position: absolute; right: calc(50% - 3em); top: calc(50% - 1em); width: 6em;\" as-pop=`.popped`>Pop</button>\n            <button style=\"position: absolute; left: 5%; bottom: 5%; width: 6em;\" as-pop=`.popped`>Pop</button>\n            <button style=\"position: absolute; right: 5%; bottom: 5%; width: 6em;\" as-pop=`.popped`>Pop</button>\n            <pop fit=\"{{.fit}}\" popped=\"{{.popped}}\" tail=\"{{.tail}}\" where=\"{{.where}}\" align=\"{{.align}}\" clickClose=\"{{.click}}\" noClickout=\"{{.noClick}}\">{{>@.tpl(.template)}}</pop>\n            <button style=\"position: absolute; left: 195%; top: 195%; width: 6em;\" as-pop=`.popped`>Pop</button>\n            ```\n            ### Result:\n          "]}]}," ",{t:7,e:"div",f:[{t:7,e:"button",m:[{t:13,n:"style",f:"position: absolute; left: 5%; top: 5%; width: 6em;",g:1},{n:"pop",t:71,f:{r:[],s:"[\".popped\"]"}}],f:["Pop"]}," ",{t:7,e:"button",m:[{t:13,n:"style",f:"position: absolute; right: 5%; top: 5%; width: 6em;",g:1},{n:"pop",t:71,f:{r:[],s:"[\".popped\"]"}}],f:["Pop"]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"position: absolute; left: 5%; top: calc(50% - 1em); height: 2em; width: 4em; border: 1px solid #ccc; border-radius: 4px; padding: 0.2em;",g:1},{n:"pophover",t:71,f:{r:[],s:"[\".popped\"]"}},{n:"id",f:"hover",t:13,g:1}],f:["Hover"]}," ",{t:7,e:"button",m:[{t:13,n:"style",f:"position: absolute; right: calc(50% - 3em); top: calc(50% - 1em); width: 6em;",g:1},{n:"pop",t:71,f:{r:[],s:"[\".popped\"]"}}],f:["Pop"]}," ",{t:7,e:"button",m:[{t:13,n:"style",f:"position: absolute; left: 5%; bottom: 5%; width: 6em;",g:1},{n:"pop",t:71,f:{r:[],s:"[\".popped\"]"}}],f:["Pop"]}," ",{t:7,e:"button",m:[{t:13,n:"style",f:"position: absolute; right: 5%; bottom: 5%; width: 6em;",g:1},{n:"pop",t:71,f:{r:[],s:"[\".popped\"]"}}],f:["Pop"]}," ",{t:7,e:"pop",m:[{n:"fit",f:[{t:2,r:".fit"}],t:13},{n:"popped",f:[{t:2,r:".popped"}],t:13},{n:"tail",f:[{t:2,r:".tail"}],t:13},{n:"where",f:[{t:2,r:".where"}],t:13},{n:"align",f:[{t:2,r:".align"}],t:13},{n:"clickClose",f:[{t:2,r:".click"}],t:13},{n:"noClickout",f:[{t:2,r:".noClick"}],t:13}],f:[{t:8,x:{r:["@this",".template"],s:"_0.tpl(_1)"}}]}," ",{t:7,e:"button",m:[{t:13,n:"style",f:"position: absolute; left: 195%; top: 195%; width: 6em;",g:1},{n:"pop",t:71,f:{r:[],s:"[\".popped\"]"}}],f:["Pop"]}]}]}]}]}],e:{"[\".popped\"]":function (){return([".popped"]);},"_0.tpl(_1)":function (_0,_1){return(_0.tpl(_1));}}},
          cssId: 'demo-pop',
          use: [pop(), split(), trigger({ name: 'pophover', hover: true })],
          options: {
            title: 'Components :: Popover',
            width: '40em', height: '30em',
            flex: true
          },
          on: {
            hover: function hover() {
              if (!this.get('popped')) { this.findComponent('pop').show(document.getElementById('hover')); }
              else { this.set('popped', false); }
            }
          },
          data: function data() {
            return {
              template: "<marked>\n## Look!\n\nIt's some markdown content!\n\nAnd it's poppin'!\n</marked>",
              noClick: true,
              fit: true
            };
          },
          tpl: function tpl(tpl$1) {
            return Ractive$1.parse(tpl$1, {
              interpolate: { marked: false },
              preserveWhitespace: { marked: true }
            });
          }
        }));

    }
  };
});
