System.register(['./chunk2.js', './chunk9.js'], function (exports, module) {
  'use strict';
  var Window, date;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      date = module.default;
    }],
    execute: function () {

      var Date_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This decorator converts an input into a date/time editor based on a mask. Each group within the input gets focus independently, and invalid values are moved to the nearest valid value automatically. The binding is always lazy.\n\n    Within the input, `tab` and `enter` will switch between fields, with `enter` wrapping and `tab` leaving the input from the last field. The left and right arrows will also jump to the next field when at the edge of a field. The up and down arrows will cycle the value of the selected field. Number keys will change the current value, and any other single char key will accept the value in the current field and move to the next field.\n\n    There is also support for two-digit years, where any two-digit year more than twenty years in the future is assumed to be from last century e.g. 99 is 1999, 37 is 2037, and 40 is 1940.\n\n    Months, days, hours, minutes, and seconds will automatically complete on a single number if there's no possibility that another number could be input e.g. 2 through 9 for a month or 3 through 9 for an hour.\n\n    Any characters in the mask that aren't reserved are left as literals. This means you can split up your date with `.`, or `-`, or `/`, or whatever makes you happy. Fields are required to have non-reserved characters between them so that the decorator can determine which field is currently focused based on cursor position within the input.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'marked'` - the name to use when registering the plugin as a macro and decorator\n    * `mask: string = 'yyyy-MM-dd'` - the mask to use for the editor. The mask chars are based on the java SimpleDateFormat as follows:\n      * `y` - year\n      * `M` - month\n      * `d` - day of month\n      * `H` - hour of day (24)\n      * `m` - minute\n      * `s` - second\n      * `S` - millisecond\n    * `time: string = '00:00:00.000'` - the default time to use as a starting point for an undefined base value\n    * `date: string = '0000-01-01'` - the default date to use as a starting point for an undefined base value\n\n    ### Decorator options\n\n    The decorator will also accept an options object:\n\n    * `mask: string` - overrides the plugin mask for this field\n    * `value: keypath` - the keypath to which the date should be bound\n\n    Alternatively, you can pass just a keypath string, optionally followed by a mask.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n      <input as-date=`.date` />\n      <input as-date=\"'.date', 'MM'\" />\n      <input as-date=\"{ value: '.date', mask: 'yyyy-MM-dd HH:mm:ss.SSS' }\" />\n      <input as-date=\"{ value: '.date', mask: 'HH:mm:ss'}\" />\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"input",m:[{n:"date",t:71,f:{r:[],s:"[\".date\"]"}}]}," ",{t:7,e:"input",m:[{n:"date",t:71,f:{r:[],s:"[\".date\",\"MM\"]"}}]}," ",{t:7,e:"input",m:[{n:"date",t:71,f:{r:[],s:"[{value:\".date\",mask:\"yyyy-MM-dd HH:mm:ss.SSS\"}]"}}]}," ",{t:7,e:"input",m:[{n:"date",t:71,f:{r:[],s:"[{value:\".date\",mask:\"HH:mm:ss\"}]"}}]}]}]}],e:{"[\".date\"]":function (){return([".date"]);},"[\".date\",\"MM\"]":function (){return([".date","MM"]);},"[{value:\".date\",mask:\"yyyy-MM-dd HH:mm:ss.SSS\"}]":function (){return([{value:".date",mask:"yyyy-MM-dd HH:mm:ss.SSS"}]);},"[{value:\".date\",mask:\"HH:mm:ss\"}]":function (){return([{value:".date",mask:"HH:mm:ss"}]);}}},
        use: [date()],
        options: {
          title: 'Decorator :: Date',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        }
      }));

    }
  };
});
