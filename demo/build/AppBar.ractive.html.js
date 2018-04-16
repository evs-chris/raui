System.register(['./chunk2.js', './chunk4.js'], function (exports, module) {
  'use strict';
  var Window, AppBar;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      AppBar = module.default;
    }],
    execute: function () {

      var AppBar_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"secondary",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    An `AppBar` is a pretty simple component. It's designed to go across the top (or bottom if you're feeling funky) of an app and have a little information about the rest of what's on the screen along with whatever interactive elements are needed, like a hamburger to get at a nav menu or a kebab to get at a popup menu. An AppBar can be used at the top of a window host to show the window title and controls when the window is maximized - either via user action or responsive constraint. The AppBar can also show a \"wait spinner\" in the form of a gradient line across the bottom so you can give the user some visual feedback that _something_ is happening.\n\n    The AppBar consists of three sections, `left`, `center`, and `right` that can hold whatever you need to put in them, including nothing. They are positioned using flexbox with `justify-content: space-between` to keep the center relatively centered.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'app-bar'` - the name to use when registering the component as a plugin\n\n    ### Attributes\n\n    * `waiting: boolean` - whether to show the wait spinner\n\n    ### Children\n\n    All children are optional.\n\n    Children are simply nodes that are nested immediately within the content of the component tag e.g. `<app-bar><left>...</left></app-bar>`, where `left` is the only child of `app-bar`.\n\n    Children's templates are yielded, so any interpolators or events within their templates happen in the context of the caller. This means that with `<app-bar><center>{{.title}}</center></app-bar><input value=\"{{.title}}\" />` in your template, changing the value of the input will also change the title in the AppBar.\n\n    * `<left>` - content to go on the left side of the AppBar\n    * `<center>` - content to go in the center of the AppBar\n    * `<right>` - content to go on the right side of the AppBar\n\n    ### API\n\n    * `wait(wait: boolean)` - show or hide the wait spinner\n    * `waiting: boolean` - gets/sets whether the wait spinner is showing\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["### Template:\n      ```hbs\n      <app-bar>\n        <left>Left</left>\n        <center>Center</center>\n        <right>Right</right>\n      </app-bar>\n      ```\n\n      ### Result:"]}," ",{t:7,e:"app-bar",f:[{t:7,e:"left",f:["Left"]}," ",{t:7,e:"center",f:["Center"]}," ",{t:7,e:"right",f:["Right"]}]}," ",{t:7,e:"marked",f:["***\n\n      ### Template:\n\n      ```hbs\n      <app-bar style-font-size=1.3em bind-waiting>\n        <center>{{.title}}</center>\n        <right style-font-weight=bold>extra attrs</right>\n      </app-bar>\n      ```\n\n      ### Result:"]}," ",{t:7,e:"app-bar",m:[{t:13,n:"style",f:"font-size: 1.3em;",g:1},{n:"waiting",t:13,f:[{t:2,r:"waiting"}]}],f:[{t:7,e:"center",f:[{t:2,r:".title"}]}," ",{t:7,e:"right",m:[{t:13,n:"style",f:"font-weight: bold;",g:1}],f:["extra attrs"]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Title",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".title"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".waiting"}],t:13}]}," Waiting"]}]}]}]},
        use: [AppBar()],
        options: {
          title: 'Component :: AppBar',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            title: 'Something is happening...',
            waiting: true
          }
        }
      }));

    }
  };
});
