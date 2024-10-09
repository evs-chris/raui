System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var tip_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    A tooltip indicator that places its content in a title attribute for a hover message and rejects clicks. A top level click handler that checks for class `just-the` can be used to display the tip in something like a message or toast if desired.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Attributes\n\n    * `type: 'error'|'warn'|'info'` - how the tip should be styled, with the default being info\n    * `sign: html` - what should be rendered as the content of the tip sigil\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Tip",{t:7,e:"textarea",m:[{n:"value",f:[{t:2,r:"tip"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Type",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"type"}],t:13}],f:[" ",{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"undefined"}}],t:13}],f:["(Default)"]}," ",{t:7,e:"option",f:["error"]}," ",{t:7,e:"option",f:["warn"]}," ",{t:7,e:"option",f:["info"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Sign",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"sign"}],t:13}]}]}]}," ",{t:7,e:"marked",f:["      ### Template:\n      ```hbs\n      Check out this <tip bind-type bind-sign>{{tip}}</tip>\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"margin: 0 auto;",g:1}],f:["Check out this ",{t:7,e:"tip",m:[{n:"type",f:[{t:2,r:"type"}],t:13},{n:"sign",f:[{t:2,r:"sign"}],t:13}],f:[{t:2,r:"tip"}]}]}]}]}],e:{"undefined":function (){return(undefined);}}},
        options: {
          title: 'Component :: Tip',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        }
      }));

    }
  };
});
