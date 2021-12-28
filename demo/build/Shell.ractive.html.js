System.register(['./chunk2.js', './chunk3.js', './chunk16.js'], function (exports, module) {
  'use strict';
  var Window, Shell, split;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      Shell = module.default;
    }, function (module) {
      split = module.default;
    }],
    execute: function () {

      var Shell_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1},{n:"flat",f:0,t:13},{n:"flex",f:0,t:13}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Every app needs a good wrapper, and this aims to be it. The Shell provides three sections, `<left>`, `<center>`, and `<right>`, which are managed responsively, so the left and right containers are automatically shown and hidden based on the available width of the window, whereas the center is always rendered. The Shell also exposes hooks to dynamically show and hide the left and right sides, and there are appropriate swipe events installed in each container to pull out or push in the sides. The `left` and `right` sections can be flagged as primary, which detremines the order in which they are hidden automatically as the width of the container changes. The primary side will stay expanded as long as there is room, so the secondary is hidden first.\n\n    There are also `<top>` and `<bottom>` sections that can be used to display content above and below the three side-by-side sections. The shell tries to complete fill in its parent element, so the `top` and `bottom` should end up at the top and bottom of the parent element, respectively. This works out well if you mount your app in the `body` element, make sure it has no padding or margins, and is filling the page.\n\n    There are also `<left-pop>` and `<right-pop>` sections that can be uses to show content modally over the entire shell. These sections behave like the `left` and `right` sections when the shell is not wide enough to display them full-time, except they appear above the `left` and `right` sections by `z-index`. These are useful for popping up temporary modals for input or further information.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'shell'` - the name to use when installing the plugin as a component\n\n    ### Attributes\n\n    * `adaptive: boolean` - whether to listen to root `*.resize` events to check to see if sides need to be hidden or shown\n\n    ### Children\n\n    * `left` - the content to display in the left section\n      * #### Attributes\n        * `hidden: boolean` - whether the section is hidden. If this is a binding, it can be used to show/hide the section and also to control content in the containing instance, as the bindings are updated when the shell adapts to width changes.\n        * `primary: boolean` - whether this secion is the primary\n        * `over: boolean` - whether the section is displayed modally over the center when displayed\n    * `left-pop` - the content to display in the left popup section. An anchor would be ideal for installing dynamic content.\n      * #### Attributes\n        * `popped: boolean` - trigger to display the left popup section\n    * `center` - the content to display in the center section\n    * `right` - the content to display in the right section\n      * #### Attributes\n        * `hidden: boolean` - whether the section is hidden. If this is a binding, it can be used to show/hide the section and also to control content in the containing instance, as the bindings are updated when the shell adapts to width changes.\n        * `primary: boolean` - whether this secion is the primary\n        * `over: boolean` - whether the section is displayed modally over the center when displayed\n    * `right-pop` - the content to display in the right popup section. An anchor would be ideal for installing dynamic content.\n      * #### Attributes\n        * `popped: boolean` - trigger to display the right popup section\n    * `top` - the content to display across the top of all side-by-side sections\n    * `top-pop` - the content to display in the top popup section. An anchor would be ideal for installing dynamic content.\n      * #### Attributes\n        * `popped: boolean` - trigger to display the top popup section\n    * `bottom` - the content to display across the bottom of all side-by-side sections\n    * `bottom-pop` - the content to display in the bottom popup section. An anchor would be ideal for installing dynamic content.\n      * #### Attributes\n        * `popped: boolean` - trigger to display the bottom popup section\n\n    ### API\n\n    * `adaptSize(reinit: boolean)` - when something changes in a non-observable way, this can be used to tell the shell it should check to see if everything still fits. The `reinit` option controls whether or not the resize listeners are torn down and reinstalled, which is useful for changing the `adaptive` setting.\n\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;",g:1},{n:"size",f:"20",t:13,g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Zoom % ",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".zoom"}],t:13},{n:["change"],t:70,f:{r:["@this"],s:"[_0.findComponent(\"shell\").adaptSize()]"}}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".leftHidden"}],t:13}]}," Left hidden"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".leftOver"}],t:13}]}," Left over"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".leftPrimary"}],t:13},{n:["change"],t:70,f:{r:["@this","@node.checked"],s:"[_0.set(\"rightPrimary\",!_1)]"}}]}," Left primary"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".rightHidden"}],t:13}]}," Right hidden"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".rightOver"}],t:13}]}," Right over"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".rightPrimary"}],t:13},{n:["change"],t:70,f:{r:["@this","@node.checked"],s:"[_0.set(\"leftPrimary\",!_1)]"}}]}," Right primary"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".leftPop"}],t:13}]}," Left pop popped"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".rightPop"}],t:13}]}," Right pop popped"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".topPop"}],t:13}]}," Top pop popped"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".bottomPop"}],t:13}]}," Bottom pop popped"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"textarea",f:[{t:2,r:".bottomPopHTML"}]}]}," ",{t:7,e:"marked",f:["          ### Template:\n          ```handlebars\n          <shell adaptive style-font-size=\"{{.zoom}}%\">\n            <top>Top</top>\n            <bottom>Bottom</bottom>\n            <left hidden=\"{{.leftHidden}}\" over=\"{{.leftOver}}\" primary=\"{{.leftPrimary}}\" style-background-color=\"#fff\">Left</left>\n            <right hidden=\"{{.rightHidden}}\" over=\"{{.rightOver}}\" primary=\"{{.rightPrimary}}\" style-background-color=\"#fff\">Right</right>\n            <center style-background-color='#fafafa'>In the middle</center>\n            <left-pop popped=\"{{.leftPop}}\" style=\"background-color: #fff; width: 50%;\">Pop on the left</left-pop>\n            <right-pop popped=\"{{.rightPop}}\" style=\"background-color: #fff; width: 50%;\">Pop on the right</right-pop>\n            <top-pop popped=\"{{.topPop}}\" style=\"background-color: #fff; height: 50%;\">Pop on the top</top-pop>\n            <bottom-pop popped=\"{{.bottomPop}}\" style=\"background-color: #fff;\">{{{.bottomPopHTML}}}</bottom-pop>\n          </shell>\n          ```\n          ### Result:\n        "]}]}," ",{t:7,e:"div",f:[{t:7,e:"split",m:[{n:"vertical",f:0,t:13}],f:[{t:7,e:"shell",m:[{n:"adaptive",f:0,t:13},{n:"style-font-size",f:[{t:2,r:".zoom"},"%"],t:13}],f:[{t:7,e:"top",f:["Top"]}," ",{t:7,e:"bottom",f:["Bottom"]}," ",{t:7,e:"left",m:[{t:13,n:"style",f:"background-color: #fff;",g:1},{n:"hidden",f:[{t:2,r:".leftHidden"}],t:13},{n:"over",f:[{t:2,r:".leftOver"}],t:13},{n:"primary",f:[{t:2,r:".leftPrimary"}],t:13}],f:["Left"]}," ",{t:7,e:"right",m:[{t:13,n:"style",f:"background-color: #fff;",g:1},{n:"hidden",f:[{t:2,r:".rightHidden"}],t:13},{n:"over",f:[{t:2,r:".rightOver"}],t:13},{n:"primary",f:[{t:2,r:".rightPrimary"}],t:13}],f:["Right"]}," ",{t:7,e:"center",m:[{t:13,n:"style",f:"background-color: #fafafa;",g:1}],f:["In the middle"]}," ",{t:7,e:"left-pop",m:[{t:13,n:"style",f:"background-color: #fff; width: 50%;",g:1},{n:"popped",f:[{t:2,r:".leftPop"}],t:13}],f:["Pop on the left"]}," ",{t:7,e:"right-pop",m:[{t:13,n:"style",f:"background-color: #fff; width: 50%;",g:1},{n:"popped",f:[{t:2,r:".rightPop"}],t:13}],f:["Pop on the right"]}," ",{t:7,e:"top-pop",m:[{t:13,n:"style",f:"background-color: #fff; height: 50%;",g:1},{n:"popped",f:[{t:2,r:".topPop"}],t:13}],f:["Pop on the top"]}," ",{t:7,e:"bottom-pop",m:[{t:13,n:"style",f:"background-color: #fff;",g:1},{n:"popped",f:[{t:2,r:".bottomPop"}],t:13}],f:[{t:3,r:".bottomPopHTML"}]}]}," ",{t:7,e:"div",m:[{n:"minimize",f:0,t:13}]}]}]}]}]}]}],e:{"[_0.findComponent(\"shell\").adaptSize()]":function (_0){return([_0.findComponent("shell").adaptSize()]);},"[_0.set(\"rightPrimary\",!_1)]":function (_0,_1){return([_0.set("rightPrimary",!_1)]);},"[_0.set(\"leftPrimary\",!_1)]":function (_0,_1){return([_0.set("leftPrimary",!_1)]);}}}, css: " li h4 { margin: 0; }",
        cssId: 'demo-shell',
        use: [Shell(), split()],
        options: {
          title: 'Components :: Shell',
          width: '40em', height: '30em',
          flex: true
        },
        data: function data() {
          return {
            zoom: '100',
            bottomPopHTML: '<h1>Bottom Pop</h1>\n<p>You can put any old content here. You can also use an &lt;#anchor&gt; or macro partial here for nice dynamic templating.</p>'
          }
        }
      }));

    }
  };
});
