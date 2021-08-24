System.register(['./chunk2.js', './chunk19.js'], function (exports, module) {
  'use strict';
  var Window, date;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      date = module.default;
    }],
    execute: function () {

      var DatePicker_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The `DatePicker` displays a calendar that allows selecting a date.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'date-picker'` - the name to use when registering the component\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `date: binding` - the value to which the date should be bound\n    * `mode: 'month'|'months'|'year' = 'month'` - the mode for the picker\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n      <date-picker />\n      <date-picker date=\"{{date}}\" />\n      <date-picker mode=\"months\" bind-date />\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"dates",g:1}],f:[{t:7,e:"date-picker"}," ",{t:7,e:"date-picker",m:[{n:"date",f:[{t:2,r:"date"}],t:13}]}," ",{t:7,e:"date-picker",m:[{n:"mode",f:"months",t:13,g:1},{n:"date",t:13,f:[{t:2,r:"date"}]}]}]}," ",{t:7,e:"code",f:[{t:7,e:"pre",f:["      Date: ",{t:2,r:"date"},"\n    "]}]}]}]}]},
        css: " .dates { display: flex; flex-wrap: wrap; }",
        use: [date()],
        options: {
          title: 'Component :: DatePicker',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
      }));

    }
  };
});
