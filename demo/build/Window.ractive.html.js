System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Window_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    This is a slightly (okay, very) unusual set of interdependent components for a modern webapp. It consists of two components, the Host and the Window, where the Host is meant to be included directly in your template and the Window is meant to be extended.\n\n    #### Host\n\n    A Host contains a list of Windows for which it manages positioning, sizing, and stacking. The Host also manages blocking (modality) of windows that prevent other windows from being the target of interaction. Blocking can take place globally as well, so you can easily implement, for instance, a message box that blocks the entire host until it is closed.\n\n    The Host has special support for maximized windows that allows you to render special content at the top of the Host while a window is maximized. This is typically used to integrate the window controls and title into an AppBar. Additionally, there is a mode, controlled by `@style.window.maxFrom`, that will automatically maximize windows when its environment gets narrower than the set value.\n\n    The Host _also_ has support for toasting because with windowed applications, it's much easier to get to the Host that it may be to access a Shell above it.\n\n    #### Window\n\n    Windows are instantiated and attached to Host, where they are displayed within the Host's bounds. Windows may be movable, resizable, closable, maximizable, and minify-able.  Once a window is minimized, there's no built-in UI to restore it, but you can hook the Host's window list into a Menu fairly easily to provide access to raise and restore windows.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    \n  "]},"\n"]}]},
          options: {
            title: 'Component :: Window',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          }
        }));

    }
  };
});
