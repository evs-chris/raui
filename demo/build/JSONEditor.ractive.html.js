System.register(['./chunk2.js', './chunk17.js'], function (exports, module) {
  'use strict';
  var Window, json;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      json = module.default;
    }],
    execute: function () {

      var JSONEditor_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is a tree-style data editor that allows managing objects and arrays filled with primitive values. It can be set up as read only to just display the data or as editable  to allow adding and removing keys and indices and changing values. It supports all of the usual JSON types, along with indicating if a value is a function or unknown.\n\n    * String editing supports single and multiline strings automatically.\n    * Number editing just uses a `type=\"number\"` input.\n    * Boolean editing uses a `type=\"checkbox\"` input.\n    * You can change the type of any value.\n    * You can change, add, and remove keys in objects.\n    * You can splice, push, pop, shift, unshift arrays.\n    * You can move items in an array up and down the list.\n    * All entries have a button to copy the keypath to the clipboard, and when in read-only mode, clicking a key will copy its keypath to the clipboard.\n\n    Any sort of hierarchichal data structure is collapsible, and everything after the first level starts out collapsed automatically. Clicking on the braces of an object or the brackets of an array will toggle hiding of its contents.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'json-editor'` - The name to use when registering the plugin as a component\n\n    ### Attributes\n\n    * `root: any` - The root of the data to edit\n    * `editable: boolean = true` - Whether the data is editable\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".editable"}],t:13}]}," Editable?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["JSON",{t:7,e:"textarea",m:[{t:73,v:"t",f:"false"},{n:"rows",f:"10",t:13}],f:[{t:2,x:{r:[".item"],s:"JSON.stringify(_0,null,\"  \")"}}]}]}]}," ",{t:7,e:"marked",f:["      ### Template:\n\n      ```handlebars\n      <json-editor bind-editable root=\"{{.item}}\" />\n      ```\n\n      ### Result:\n    "]}," ",{t:7,e:"json-editor",m:[{n:"editable",t:13,f:[{t:2,r:"editable"}]},{n:"root",f:[{t:2,r:".item"}],t:13}]}]}]}],e:{"JSON.stringify(_0,null,\"  \")":function (_0){return(JSON.stringify(_0,null,"  "));}}},
        use: [json()],
        options: {
          title: 'Component :: JSONEditor',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            item: {
              string: 'this is a string',
              multiline: 'this is a\nmultiline string\nwhich is different\nbecause you automatically\nget a textarea editor',
              object: {
                nested: true,
                fn: function fn() { return 'I am a function'; },
                array: [
                  'item 1',
                  2,
                  3,
                  {
                    nested: 'again',
                    null: null,
                    undefined: undefined
                  }
                ]
              },
              array: [
                true,
                null,
                42,
                'and a string'
              ]
            }
          }
        }
      }));

    }
  };
});
