System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Window_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is a slightly (okay, very) unusual set of interdependent components for a modern webapp. It consists of two components, the Host and the Window, where the Host is meant to be included directly in your template and the Window is meant to be extended.\n\n    When used together, these two components can allow your app to maintain a usable responsive layout on everything from an iPhone 4 to a 50\" 4k desktop screen. Windows are presented within the Host in the style of a desktop multiple document interface. This allows the usable space on the screen to be utilized by multiple windows at once if possible. By default, the Host will watch its available size and automatically maximize windows once a certain breakpoint is reached (60em).\n\n    #### Host\n\n    A Host contains a list of Windows for which it manages positioning, sizing, and stacking. The Host also manages blocking (modality) of windows that prevent other windows from being the target of interaction. Blocking can take place globally as well, so you can easily implement, for instance, a message box that blocks the entire host until it is closed or a detail input window that only blocks its caller.\n\n    The Host has special support for maximized windows that allows you to render special content at the top of the Host while a window is maximized. This is typically used to integrate the window controls and title into an AppBar. Additionally, there is a mode, controlled by `@style.window.maxFrom`, that will automatically maximize windows when its environment gets narrower than the set value.\n\n    The Host _also_ has support for toasting because with windowed applications, it's much easier to get to the Host than it may be to access a Shell or app instance above it.\n\n    #### Window\n\n    Windows are instantiated and attached to Host, where they are displayed within the Host's bounds. Windows may be movable, resizable, closable, maximizable, and minify-able.  Once a window is minimized, there's no built-in UI to restore it, but you can hook the Host's window list into a Menu fairly easily to provide access to raise and restore windows.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    * `name: string = 'host'` - the name to use when registering the window host as a component\n\n    ### Host\n    \n    #### Attributes\n\n    * `placement: 'grid' | 'smart'` - the placement algorithm to use when placing a new unpositioned window. `grid` placement uses 3x3 grid that remembers where a window was last placed. `smart` placement computes the portion of the host where the window would overlap the least with the other windows.\n    * `transition: false | string` - the name of the transition to use when raising windows. Defaults to `window`.\n    * `windows: object` - this should be a binding supplied to allow a controlling instance to have easier access to the host window control object.\n\n    #### Children\n\n    * `max-top` - content to display at the top of the host when windows are maximized. When a window is maximized, it has no titlebar or controls, so if you need to maintain those, you can do so with the `max-top` section.\n\n    #### API\n\n    * `current: Window` - get the top-level window\n    * `currentId: string` - get the id of the top-level window\n    * `windows: string[]` - get the list of all window ids\n    * `addWindow(window: Window, options)` - add the given window to the host. Options are applied over the default options for the host and any options supplied by the window extension or constructor.\n      * `id: string` - the id to use for the window. If not supplied, one will be generated from a monotonically incrementing sequence.\n      * `show: boolean = true` - whether to display the window immediately\n      * `autoSize: boolean = true` - whether to let the window contents determine its initial size. This is overridden by `width` and `height`.\n      * `close: boolean = true` - whether the window should have a close control\n      * `maximize: boolean = true` - whether the window should have a maximize control\n      * `minimize: boolean = true` - whether the window should have a minimize control\n      * `block: Window | id | boolean = false`\n        * `Window | id` - the window or id of a window that should be blocked by this window\n        * `boolean` - whether this window should block all windows\n      * `fill: boolean = false` - if the window is blocking a parent, enabling fill will automatically size the window to fill its parent with 10px of padding\n      * `width: number | string` - the width to use for the window. This may be a number of pixels or a CSS size in a string.\n      * `height: number | string` - the height to use for the window. This may be a number of pixels or a CSS size in a string.\n      * `top: number` - the top coordinate to place the window in px. If both `top` and `left` are not supplied, then placement is left to the host.\n      * `left: number` - the left coordinate to place the window in px. If both `top` and `left` are not supplied, then placement is left to the host.\n      * `resizable: boolean = false` - whether the window is resizable\n      * `movable: boolean = true` - whether the window is movable\n      * `pad: boolean = false` - whether the window body should have padding applied\n      * `title: string` - the title of the window\n      * `dialog: boolean` - the window is a dialog that should not follow the global maximize setting\n      * `slide: 'left'| 'right' | 'top' | 'bottom'` - the window is a dialog that should slide in from outside of the window and fill its secondary axis (height for sides, width for top and bottom) while sticking to the source edge.\n      * `hideTitle: boolean` - when `true`, hides the window title bar\n    * `getWindow(id: string): Window` - retrieve a window by its id\n    * `windowGet(id: string, path: string): any` - retrieve a value from the data at the given path from the window with the given id\n    * `windowSet(id: string, path: string, val: any)` - set a value in the data at the given path in the window with the given id\n    * `raise(window: Window : id, show: boolean = true) - move the target window to the top of the stack. If the window is currently hidden and the `show` argument is not `false`, then the window will also become visible.\n    * `place(window: Window)` - automatically place the given window based on the host placement algorithm\n\n    ### Window\n\n    #### API\n\n    * `resizable: boolean` - get or set whether the window is resizable\n    * `title: boolean` - get or set the title of the window\n    * `visible: boolean` - get or set whether the window is visible\n    * `pad: boolean` - get or set whether the window is padded\n    * `close(force: boolean = false)` - close the window. If `force` is not `true`, then a blocker or `beforeClose` hook can veto the close.\n    * `maximize()` - make the window fill the host\n    * `hide()` - make the window invisible (minimize)\n    * `show()` - make the window visible (restore)\n    * `raise(show: boolean = true)` - bring the window to the top of the stack. If the window is currently hidden and the `show` argument is not `false`, then the window will become visible.\n    * `size(width: number | string | 'auto', height: number | string)` - resize the window with the given dimensions\n      * `number`s - size in px\n      * `string`s - size in CSS string\n      * `'auto'` - allow content to determine the size of the window\n    * `move(top: number | string, left: number | string)` - move the window to the given coordinates in either pixels or CSS size strings\n\n    #### Children\n\n    * `buttons` - each window has a dedicated button area at the bottom for actions. Any `button`s found within the `buttons` top-level element will be automatically added to the window's buttons array. `button` elements may be nested within conditional sections to be automatically shown and hidden with the condition.\n      * `left | right | center` - buttons may be positioned within the button area with the `left`, `right`, and `center` attributes.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### You are here :)\n\n      This one of those things that's mostly API, so it's hard to make an example. Luckily, the docs you're looking at right now are all in windows embedded in a host, so you've already experienced the example to some extent. If you'd like to see the code, check out the github repo in the `demo-src` directory.\n    "]}," ",{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Block",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"opts.block"}],t:13}],f:[{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"true"}}],t:13}],f:["All"]},{t:7,e:"option",f:["Parent"]},{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"false"}}],t:13}],f:["No"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.close"}],t:13}]},"Close?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.pad"}],t:13}]},"Pad?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.flex"}],t:13}]},"Flex?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.movable"}],t:13}]},"Movable?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.resizable"}],t:13}]},"Resizable?"]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.dialog"}],t:13}]}," Dialog?"]}],n:50,x:{r:["opts.slide"],s:"!_0"}}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.hideTitle"}],t:13}]}," Hide title?"]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"opts.fill"}],t:13}]}," Fill parent?"]}],n:50,x:{r:["opts.block","opts.slide"],s:"_0&&!_1"}}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Slide",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:"opts.slide"}],t:13}],f:[" ",{t:7,e:"option",m:[{n:"value",f:[{t:2,x:{r:[],s:"undefined"}}],t:13}],f:["(none)"]}," ",{t:7,e:"option",f:["left"]}," ",{t:7,e:"option",f:["right"]}," ",{t:7,e:"option",f:["top"]}," ",{t:7,e:"option",f:["bottom"]}]}]}],n:50,x:{r:["opts.dialog"],s:"!_0"}}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Content",{t:7,e:"textarea",f:[{t:2,r:"content"}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this","opts"],s:"[_0.openDialog(_1)]"}}],f:["Open Window"]}]}]}]}]}],e:{"true":function (){return(true);},"false":function (){return(false);},"!_0":function (_0){return(!_0);},"_0&&!_1":function (_0,_1){return(_0&&!_1);},"undefined":function (){return(undefined);},"[_0.openDialog(_1)]":function (_0,_1){return([_0.openDialog(_1)]);}}},
        options: {
          title: 'Component :: Window',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            opts: { close: true, flex: true, pad: true, resizable: true, movable: true, dialog: true, block: true },
            content: '<div style="min-width: 20em; min-height: 10em;"><strong>HTML</strong> content</div>'
          };
        },
        openDialog: function openDialog(opts) {
          opts = Object.assign({}, opts);
          if (opts.block === 'Parent') { opts.block = this; }
          if (opts.fill) { opts.size = 'fill'; }
          var wnd = new Dialog({
            data: { content: this.get('content') }
          });
          this.host.addWindow(wnd, opts);
        }
      }));

      var Dialog = Window.extend({
        options: {
          title: 'Window :: Dialog',
        },
        template: '{{{content}}}<buttons><button on-click="@.close()">Close</button></buttons>'
      });

    }
  };
});
