System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var Window;
  return {
    setters: [function (module) {
      Window = module.Window;
    }],
    execute: function () {

      var Tabs_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    This is a pretty standard tab component that behaves about how you'd expect a tab component to behave. The component is named `tabs` by default, though you can change that when installing it as a plugin or in the components registry. The tabs have a few different switches that make them behave better in certain environments, like a flex box, where the container should fill any available space, or in inline content, where the container should only be as large as the current content requires.\n\n    There are three transitions included for tab switching:\n\n    * none - tabs just appear in place immediately\n    * fade - tabs fade out and in as they change positions\n    * slide - tabs slide across as they change positions\n\n    By default, the tabs have a sliding indicator that shows which tab is currently active. The tabs are also forced to stay in a single row because multiline tabs tend to be confusing and hard to target precisely when switching. As a result, for browsers that don't already use an on-demand scrollbar, as most evergreens and mobile browsers do, you'll get a horizontal scrollbar if you have too many tabs or tabs with long titles.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Container Attributes\n\n    * `center: boolean = false` - when true, align tabs in the center of the tab bar\n    * `fill: boolean = false` - when true, fill the parent container using flex grow\n    * `flat: boolean = false` - controls the style of the tab bar, and when true removes any depth styles. This is useful for embedding tabs into other controls seamlessly.\n    * `height: string` - if `'dynamic'`, each tab body will be shrunk when the tab is hidden and re-expanded when it is selected\n    * `pad: boolean = false` - when true, add a bit of padding to the tab content\n    * `transition: string` - if specified,  `'slide'` or `'fade'`\n\n    ### Tab Attributes\n\n    * `button: boolean = false` - when true, the tab has no content and just behaves as a button\n    * `closable: boolean = false` - when true, add a close button on the tab\n    * `disabled: boolean = false` - when true, the tab is not selectable\n    * `no-pad: boolean = false` - when true and in a container with `pad`, skips padding for the tab\n    * `right: boolean = false` - when true, the tab is kept separately on the right end of the tab bar\n    * `title: string` - the title to display in the tab bar\n\n    ### Events\n\n    * `close` - fires when a tab is about to be closed by user action. If this returns false, the tab will not be closed.\n    * `enter` - fires when a tab is about to become active\n    * `leave` - fires when a tab is about to become inactive\n\n    ### API\n\n    * `select(index: integer)` - causes the given index to become active\n    * `updateIndicator()` - if the size of the container changes in a way that's not observable, call this to refresh the indicator\n\n    ### Styles\n\n    * `tabs.tab.fg` - `fg1`, `#222` - foreground color for tabs\n    * `tabs.tab.bg` - `bg1`, `#fff` - background color for tabs\n    * `tabs.indicator.color` - `fga1`, `#07e` - color for indicator\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"marked",f:["\n    ### Template:\n    ```handlebars\n    <tabs pad>\n      <tab title=\"Just\">A plain old tab in a padded container.<p>This one is a bit taller.</p></tab>\n      <tab title=\"Tabs\" no-pad>Another plain old tab, but without the padding.</tab>\n    </tabs\n    ```\n    ### Result:\n    "]},"\n\n    ",{t:7,e:"tabs",m:[{n:"pad",f:0,t:13}],f:["\n      ",{t:7,e:"tab",m:[{n:"title",f:"Just",t:13}],f:["A plain old tab in a padded container.",{t:7,e:"p",f:["This one is a bit taller."]}]},"\n      ",{t:7,e:"tab",m:[{n:"title",f:"Tabs",t:13},{n:"no-pad",f:0,t:13}],f:["Another plain old tab, but without the padding."]},"\n    "]},"\n\n    ",{t:7,e:"marked",f:["\n    ***\n    ### Template:\n    ```handlebars\n    <tabs height=dynamic transition=fade>\n      <tab title=\"Dynamic\">\n        <p>This tab has slightly longer content.</p>\n        <p>This tab has slightly longer content.</p>\n        <p>This tab has slightly longer content.</p>\n        <p>This tab has slightly longer content.</p>\n      </tab>\n      <tab title=\"Content\">\n        <p>This tab has shorter content, and the content fades during transitions.</p>\n      </tab>\n    </tabs>\n    ```\n    ### Result:\n    "]},"\n\n    ",{t:7,e:"tabs",m:[{n:"height",f:"dynamic",t:13},{n:"transition",f:"fade",t:13}],f:["\n      ",{t:7,e:"tab",m:[{n:"title",f:"Dynamic",t:13}],f:["\n        ",{t:7,e:"p",f:["This tab has slightly longer content."]},"\n        ",{t:7,e:"p",f:["This tab has slightly longer content."]},"\n        ",{t:7,e:"p",f:["This tab has slightly longer content."]},"\n        ",{t:7,e:"p",f:["This tab has slightly longer content."]},"\n      "]},"\n      ",{t:7,e:"tab",m:[{n:"title",f:"Content",t:13}],f:["\n        ",{t:7,e:"p",f:["This tab has shorter content, and the content fades during transitions."]},"\n      "]},"\n    "]},"\n\n    ",{t:7,e:"marked",f:["\n    ***\n    ### Template:\n    ```handlebars\n    <tabs center flat transition=slide pad>\n      <tab title=Centered>Centered tabs with the slide transition.</tab>\n      <tab title=\"Flat Tabs\">The content slides by.</tab>\n    </tabs>\n    ```\n    ### Result:\n    "]},"\n\n    ",{t:7,e:"tabs",m:[{n:"center",f:0,t:13},{n:"flat",f:0,t:13},{n:"transition",f:"slide",t:13},{n:"pad",f:0,t:13}],f:["\n      ",{t:7,e:"tab",m:[{n:"title",f:"Centered",t:13}],f:["Centered tabs with the slide transition."]},"\n      ",{t:7,e:"tab",m:[{n:"title",f:"Flat Tabs",t:13}],f:["The content slides by."]},"\n    "]},"\n    ",{t:7,e:"hr"},"\n    ",{t:7,e:"p",f:["Fin."]},">\n  "]},"\n"]}]}, css: "",
          options: {
            title: 'Components :: Tabs',
            width: '40em', height: '30em',
            flex: true
          }
        }));

    }
  };
});
