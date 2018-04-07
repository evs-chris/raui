System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var globalRegister, Window;
  return {
    setters: [function (module) {
      globalRegister = module.default;
      Window = module.Window;
    }],
    execute: function () {

      function fade(t, params) {
        var p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
        if (t.isIntro) {
          t.setStyle('opacity', 0);
          return t.animateStyle('opacity', 1, p);
        } else {
          t.setStyle('opacity', 1);
          return t.animateStyle('opacity', 0, p);
        }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.transitions[opts.name || 'fade'] = fade;
        }
      }

      globalRegister('fade', 'transitions', fade);

      var Fade_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    This is your bog-standard fade transition. It's only included as a convenience to avoid yet another tiny dependency.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'fade'` - the name to use when registering the plugin as a transition\n\n    ### Parameters\n\n    Parameters, as with most transitions, are passed in an options argument e.g. `fade-in=\"{ ... }\"`. Any Ractive transition args can be passed in, and this transition has no non-standard parameters.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"marked",f:["\n      ### Template:\n      ```hbs\n      {{#if .show}}\n      <div fade-in-out=\"{ duration: 1000 }\">\n        This is a thing that will fade in and out.\n      </div>\n      {{/if}]}\n      ```\n      ### Result:\n    "]},"\n\n    ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n      ",{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"show\")]"}}],f:["Show"]},"\n    "]},"\n",{t:4,f:["    ",{t:7,e:"div",m:[{n:"fade",t:72,f:{r:[],s:"[{duration:1000}]"},v:"t0"}],f:["\n      This is a thing that will fade in and out.\n    "]},"\n"],n:50,r:".show"},"  "]},"\n"]}],e:{"[_0.toggle(\"show\")]":function (_0){return([_0.toggle("show")]);},"[{duration:1000}]":function (){return([{duration:1000}]);}}},
          use: [plugin],
          options: {
            title: 'Transition :: Fade',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          }
        }));

    }
  };
});
