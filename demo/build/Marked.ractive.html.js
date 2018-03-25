System.register(['./chunk2.js', './chunk8.js'], function (exports, module) {
  'use strict';
  var Window, marked;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      marked = module.default;
    }],
    execute: function () {

      var Marked_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    This macro and/or decorator combo takes the markdown embedded within it and renders it into the DOM. If the markdown is just a string, the macro will pre-render it into a triple. If the markdown is a template, it will render it inline, hide the host elemnent, and duplicate it into an additional sibling element using the decorator.\n\n    It is important to tell Ractive to preserve whitespace within any `marked` elemnts using `{ preserveWhitespace: { marked: true } }`. If your markdown happens to have any elements or mustaches in it, you'll also want to add in `interpolate: { markdown: false }`.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'marked'` - the name to use when registering the plugin as a macro and decorator\n    * `marked: marked = marked` - the `marked` singleton to use to render markdown. If falsey, the global `marked` object will be used. If no `marked` is found, an error will be thrown.\n\n    ### Content\n\n    The content of the `marked` tag should maintain the same base indent throughout, since the base indent will be stripped off prior to sending it through the marked processor.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"md",f:["\n      ### Template:\n      ```handlebars\n      <marked>\n        ## This is a heading\n        Paragraphs work too. So do code blocks. In fact, all of the docs here are rendered in `<markdown>` tags.\n\n        > Here's a quote.\n\n        http://an.auto.link and [another link](http://google.com).\n      </marked>\n      ```\n      ### Result:\n\n      ## This is a heading\n      Paragraphs work too. So do code blocks. In fact, all of the docs here are rendered in `<markdown>` tags.\n\n      > Here's a quote.\n\n      http://an.auto.link and [another link](http://google.com).\n      "]},"\n  "]},"\n"]}]},
          use: [marked({ name: 'md' })],
          options: {
            title: 'Decorator :: Marked',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          }
        }));

    }
  };
});
