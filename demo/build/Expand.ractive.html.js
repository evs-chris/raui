System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Expand_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"secondary",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is a fairly simple two-step transition that will make a space big enough for the target content and then fade it in on intro and fade it out and shrink the space back to nothing on outro. It defaults to working on the Y axis for things laid out vertically, but it can also be told to use the X axis instead.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'expand'` - the name to use when registering the plugin as a transition\n\n    ### Parameters\n\n    Parameters, as with most transitions, are passed in an options argument e.g. `expand-in=\"{ ... }\"`. Any Ractive transition args can be passed in in addition to the following:\n\n    * `axis: string = 'y'` - the axis in which the transition should expand. Set this to `'x'` for horizontally oriented layouts.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["### Template:\n      ```hbs\n      <div style-display=flex style-flex-direction=\"{{.x ? 'row' : 'column'}}\">\n        <div>Before</div>\n        {{#if .show}}\n          <div expand-in-out=\"{ axis: .x ? 'x' : 'y' }\">\n            Midst<br/>Midst<br/>Midst<br/>Midst<br/>\n          </div>\n        {{/if}}\n        <div>After</div>\n      </div>\n      ```\n      ### Result:"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".x"}],t:13}]}," X-axis"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"show\")]"}}],f:[{t:2,x:{r:[".show"],s:"_0?\"Hide\":\"Show\""}}]}]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"display: flex;",g:1},{n:"style-flex-direction",f:[{t:2,x:{r:[".x"],s:"_0?\"row\":\"column\""}}],t:13}],f:[{t:7,e:"div",f:["Before"]}," ",{t:4,f:[{t:7,e:"div",m:[{n:"expand",t:72,f:{r:[".x"],s:"[{axis:_0?\"x\":\"y\"}]"},v:"t0"}],f:["Midst",{t:7,e:"br"},"Midst",{t:7,e:"br"},"Midst",{t:7,e:"br"},"Midst",{t:7,e:"br"}]}],n:50,r:".show"}," ",{t:7,e:"div",f:["After"]}]}]}]}],e:{"[_0.toggle(\"show\")]":function (_0){return([_0.toggle("show")]);},"_0?\"Hide\":\"Show\"":function (_0){return(_0?"Hide":"Show");},"_0?\"row\":\"column\"":function (_0){return(_0?"row":"column");},"[{axis:_0?\"x\":\"y\"}]":function (_0){return([{axis:_0?"x":"y"}]);}}},
        options: {
          title: 'Transition :: Expand',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        }
      }));

    }
  };
});
