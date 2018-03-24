System.register(['./chunk2.js', './chunk1.js'], function (exports, module) {
  'use strict';
  var Window, left, right, up, down;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      left = module.left;
      right = module.right;
      up = module.up;
      down = module.down;
    }],
    execute: function () {

      var Swipe_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"fill",f:0,t:13},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"style-flex-grow",f:"1",t:13},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftpct\",bindPx:\".leftdist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe left\")]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightpct\",bindPx:\".rightdist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe right\")]"}},{n:["swipeup"],t:70,a:{r:[],s:"[{bind:\".uppct\",bindPx:\".updist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe up\")]"}},{n:["swipedown"],t:70,a:{r:[],s:"[{bind:\".downpct\",bindPx:\".downdist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe down\")]"}}],f:["\n      ",{t:7,e:"div",m:[{n:"class-vars",t:13}],f:["\n        left: ",{t:2,r:"leftdist"},"px ",{t:2,x:{r:["leftpct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"},"\n        right: ",{t:2,r:"rightdist"},"px ",{t:2,x:{r:["rightpct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"},"\n        up: ",{t:2,r:"updist"},"px ",{t:2,x:{r:["uppct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"},"\n        down: ",{t:2,r:"downdist"},"px ",{t:2,x:{r:["downpct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"},"\n      "]},"\n      ",{t:4,f:[{t:7,e:"div",f:[{t:2,r:"."}]}],n:52,r:"~/logs"},"\n    "]},"\n  "]},"\n"]}],e:{"[{bind:\".leftpct\",bindPx:\".leftdist\"}]":function (){return([{bind:".leftpct",bindPx:".leftdist"}]);},"[_0.log(\"swipe left\")]":function (_0){return([_0.log("swipe left")]);},"[{bind:\".rightpct\",bindPx:\".rightdist\"}]":function (){return([{bind:".rightpct",bindPx:".rightdist"}]);},"[_0.log(\"swipe right\")]":function (_0){return([_0.log("swipe right")]);},"[{bind:\".uppct\",bindPx:\".updist\"}]":function (){return([{bind:".uppct",bindPx:".updist"}]);},"[_0.log(\"swipe up\")]":function (_0){return([_0.log("swipe up")]);},"[{bind:\".downpct\",bindPx:\".downdist\"}]":function (){return([{bind:".downpct",bindPx:".downdist"}]);},"[_0.log(\"swipe down\")]":function (_0){return([_0.log("swipe down")]);},"Math.round(_0)":function (_0){return(Math.round(_0));}}},
          css: " .vars { position: absolute; right: 0; top: 0; } ",
          use: [ left, right, up, down ],
          options: {
            title: 'Event :: Swipe',
            flex: true,
            width: '40em', height: '30em'
          },
          log: function log(msg) {
            this.unshift('logs', msg);
          }
        }));

    }
  };
});
