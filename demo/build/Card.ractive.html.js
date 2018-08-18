System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister, Window;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
      Window = module.Window;
    }],
    execute: function () {

      var template = {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-wrapper",g:1},{t:8,r:"extra-attributes"},{n:"class-rcard-margin",t:13,f:[{t:2,r:"_card.margin"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard",g:1},{n:"class-rcard-no-pad",t:13,f:[{t:2,r:"_card.noPad"}]},{n:"class-rcard-section",t:13,f:[{t:2,r:"_card.section"}]},{n:"class-rcard-flat",t:13,f:[{t:2,x:{r:["_card","_card.flat","@style.card.flat"],s:"\"flat\" in _0?_1:_2"}}]},{n:"class-rcard-deep",t:13,f:[{t:2,x:{r:["_card","_card.flat","@style.card.flat"],s:"\"flat\" in _0?!_1:!_2"}}]},{n:"class-rcard-popout",t:13,f:[{t:2,r:"_card.popout"}]}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-header",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-avatar",g:1},{n:"class-rcard-avatar-round",t:13,f:[{t:2,r:"_card.round"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-avatar-inner",g:1},{n:"style-background-image",f:["url(",{t:2,r:"_card.avatar"},")"],t:13}]}]}],n:50,x:{r:["_card.avatar"],s:"_0&&typeof _0===\"string\""}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-avatar",g:1},{t:4,f:[{t:8,r:"_card.avatarA"}],n:50,r:"_card.avatarA"}],f:[{t:8,r:"_card.avatarP"}]}],n:50,r:"_card.avatarP",l:1}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-titles",g:1},{n:"class-rcard-with-sub",t:13,f:[{t:2,x:{r:["_card.subtitle","_card.subtitleP"],s:"_0||_1"}}]}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-title",g:1}],f:[{t:2,r:"_card.title"}]}],n:50,r:"_card.title"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-title",g:1},{t:4,f:[{t:8,r:"_card.titleA"}],n:50,r:"_card.titleA"}],f:[{t:8,r:"_card.titleP"}]}],n:51,l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-subtitle",g:1}],f:[{t:2,r:"_card.subtitle"}]}],n:50,r:"_card.subtitle"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-subtitle",g:1},{t:4,f:[{t:8,r:"_card.subtitleA"}],n:50,r:"_card.subtitleA"}],f:[{t:8,r:"_card.subtitleP"}]}],n:50,r:"_card.subtitleP",l:1}]}]}],n:50,x:{r:["_card.titleP","_card.subtitleP","_card.avatarP","_card.title","_card.subtitle","_card.avatar"],s:"_0||_1||_2||_3||_4||(_5&&typeof _5===\"string\")"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-image",g:1}],f:[{t:7,e:"img",m:[{n:"src",f:[{t:2,r:"_card.image"}],t:13},{n:"alt",f:[{t:2,r:"_card.alt"}],t:13}]}]}],n:50,r:"_card.image"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-image",g:1},{t:4,f:[{t:8,r:"_card.imageA"}],n:50,r:"_card.imageA"}],f:[{t:8,r:"_card.imageP"}]}],n:50,r:"_card.imageP",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-content",g:1}],f:[{t:8,r:"_card.contentP"}]}],n:50,r:"_card.contentP"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-footer",g:1},{t:4,f:[{t:8,r:"_card.footerA"}],n:50,r:"_card.footerA"}],f:[{t:8,r:"_card.footerP"}]}],n:50,r:"_card.footerP"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-actions",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".P"}],n:50,r:".P"},{t:4,f:[{t:7,e:"button",m:[{t:8,r:".attrs"}],f:[{t:8,r:".content"}]}],n:51,l:1}],n:52,r:"_card.actions"}]}],n:50,r:"_card.actions.length"}]}]}],e:{"\"flat\" in _0?_1:_2":function (_0,_1,_2){return("flat" in _0?_1:_2);},"\"flat\" in _0?!_1:!_2":function (_0,_1,_2){return("flat" in _0?!_1:!_2);},"_0&&typeof _0===\"string\"":function (_0){return(_0&&typeof _0==="string");},"_0||_1":function (_0,_1){return(_0||_1);},"_0||_1||_2||_3||_4||(_5&&typeof _5===\"string\")":function (_0,_1,_2,_3,_4,_5){return(_0||_1||_2||_3||_4||(_5&&typeof _5==="string"));}}};

      var Card = Ractive$1.macro(
        function (handle) {
          init(handle);
          handle.setTemplate(template);

          return {
            update: function update() {
              updateAttrs(handle);
            }
          }
        }, {
          cssId: 'rm-card',
          css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.card.primary'));
         return ("\n   .rcard-margin {\n     padding: 0.5em;\n     box-sizing: border-box;\n   }\n   .rcard {\n     display: block;\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n     border-radius: " + (primary.radius || '0.2em') + ";\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: box-shadow, border, background-color, color, margin, padding;\n   }\n \n   .rcard-section {\n     overflow: hidden;\n   }\n \n   .rcard-deep {\n     box-shadow: " + (primary.shadow || '0 1px 4px 0 rgba(0,0,0,0.14)') + ";\n     border: 1px solid " + (primary.bc || '#ccc') + ";\n   }\n   .rcard-flat {\n     border: 0.0625em solid " + (primary.bc || '#ccc') + ";\n     box-shadow: none;\n   }\n \n   .rcard-no-pad > .rcard-content {\n     padding: 0;\n   }\n \n   .rcard > div:nth-last-of-type(n + 2) {\n     padding-bottom: 0;\n   }\n \n   .rcard-header, .rcard-content {\n     padding: 1em;\n   }\n \n   .rcard-header {\n     display: flex;\n     height: 3em;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: color, background-color, padding, height;\n   }\n \n   .rcard-section > .rcard-header {\n     background-color: " + (primary.fga || '#07e') + ";\n     color: " + (primary.bg || '#fff') + ";\n     height: auto;\n   }\n \n   .rcard-section > .rcard-header:first-of-type {\n     padding: " + (primary.headerPadding || '0.5em 1em') + ";" + (primary.headerGradient ? ("\n     background: " + (primary.headerGradient) + ";\n     color: " + (primary.fg || '#222') + ";\n     border-bottom: 1px solid " + (primary.bc || '#ccc') + ";") : '') + "\n   }\n \n   .rcard-avatar {\n     width: 3em;\n     height: 3em;\n     margin-right: 1em;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: width, height, bottom;\n   }\n \n   .rcard-avatar-inner {\n     height: 100%;\n     background-size: cover;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: border-radius, box-shadow;\n   }\n \n   .rcard-avatar-round .rcard-avatar-inner {\n     border-radius: 100%;\n   }\n \n   .rcard-popout {\n     margin-top: 2em;\n   }\n   .rcard-section.rcard-popout {\n     overflow: visible;\n   }\n   .rcard-popout > .rcard-header {\n     position: relative;\n   }\n   .rcard-section.rcard-popout > .rcard-header {\n     border-radius: " + (primary.easing || '0.2em') + " " + (primary.radius || '0.2em') + " 0 0;\n   }\n   .rcard-popout > .rcard-header .rcard-avatar {\n     position: absolute;\n     bottom: 0;\n     width: 6em;\n     height: 6em;\n   }\n   .rcard-popout > .rcard-header .rcard-avatar ~ .rcard-titles {\n     margin-left: 7em;\n   }\n   .rcard-popout.rcard-section > .rcard-header .rcard-avatar {\n     bottom: 0.5em;\n     width: 3.75em;\n     height: 3.75em;\n   }\n   .rcard-popout.rcard-section > .rcard-header .rcard-avatar ~ .rcard-titles {\n     margin-left: 5em;\n   }\n   .rcard-popout.rcard-deep > .rcard-header .rcard-avatar-inner {\n     box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);\n   }\n \n   .rcard-titles {\n     flex-grow: 1;\n     display: flex;\n     flex-direction: column;\n     justify-content: center;\n     line-height: 1em;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: margin;\n   }\n \n   .rcard-with-sub {\n     justify-content: space-evenly;\n   }\n   .rcard-with-sub > .rcard-title {\n     font-size: 1.2em;\n   }\n \n   .rcard-title {\n     font-size: 1.5em;\n   }\n \n   .rcard-subtitle {\n     opacity: 0.7;\n     font-size: 1em;\n   }\n \n   .rcard-section > .rcard-header .rcard-titles {\n     line-height: 1.2em;\n   }\n   .rcard-section > .rcard-header .rcard-with-sub {\n     line-height: 1em;\n   }\n   .rcard-section > .rcard-header .rcard-with-sub > .rcard-title {\n     font-size: 1.1em;\n   }\n   .rcard-section > .rcard-header .rcard-title {\n     font-size: 1.2em;\n   }\n \n   .rcard > div:first-of-type.rcard-image {\n     margin-top: 0;\n   }\n \n   .rcard-image {\n     margin-top: 1em;\n   }\n \n   .rcard-image > img {\n     width: 100%;\n   }\n \n   .rcard-actions {\n     padding: 0.5em;\n   }\n \n   .rcard-actions > button {\n     text-decoration: none;\n     text-align: center;\n     letter-spacing: 0.5px;\n     cursor: pointer;\n     user-select: none;\n     border: none;\n     border-radius: 2px;\n     padding: 0 2rem;\n     transition: 0.2s ease-in-out;\n     transition-property: box-shadow, opacity, background-color;\n     font-size: 1em;\n     line-height: 1.5em;\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n     vertical-align: middle;\n     min-height: 2.25em;\n     outline: 0;\n     margin: 0.25em;\n     position: relative;\n     overflow: hidden;\n     font-weight: 500;\n     -webkit-tap-highlight-color: transparent;\n     box-shadow: none;\n   }\n \n   .rcard-actions > button[disabled], .btn.disabled {\n     opacity: 0.7;\n     cursor: not-allowed;\n   }\n \n   .rcard-actions > button[disabled]:hover {\n     opacity: 0.7;\n   }\n \n   .rcard-actions > button.flat:hover {\n     box-shadow: none;\n   }\n \n   .rcard-actions > button:after {\n     content: ' ';\n     position: absolute;\n     top: 0;\n     left: 0;\n     height: 100%;\n     width: 100%;\n     background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);\n     opacity: 0;\n     transform: scale(5, 5);\n     transition: opacity 0.6s ease-out, transform 0.5s ease-in;\n   }\n \n   .rcard-actions > button:before {\n     content: ' ';\n     position: absolute;\n     height: 100%;\n     width: 100%;\n     background-color: rgba(0, 0, 0, 0.075);\n     opacity: 0;\n     top: 0;\n     left: 0;\n     transition: opacity 0.4s ease-in-out;\n   }\n \n   .rcard-actions > button:focus:before {\n     opacity: 1;\n   }\n   .rcard-actions > button:hover:before {\n     opacity: 0.5;\n   }\n   \n   .rcard-actions > button:active:after {\n     transform: scale(1, 1);\n     opacity: 1;\n     transition: none;\n   }\n   ");
         // TODO: other themes
      }).call(this, data)].join(' '); },
          noCssTransform: true,
          attributes: ['title', 'subtitle', 'image', 'avatar', 'avatar-round', 'no-pad', 'image-alt', 'section', 'flat', 'popout', 'margin']
        }
      );

      function init(h) {
        var data = h.get('@local');
        h.aliasLocal('_card');

        updateAttrs(h);
        
        var tpl = h.partials.content;
        var content = [];

        tpl.forEach(function (n) {
          if (n.e === 'title') {
            data.titleA = n.m;
            data.titleP = n.f;
          }
          else if (n.e === 'subtitle') {
            data.subtitleA = n.m;
            data.subtitleP = n.f;
          }
          else if (n.e === 'avatar') {
            var img;
            if (n.m) {
              data.avatarA = n.m.filter(function (a) { return a.n !== 'round' && a.n !== 'image' && a.n !== 'popout'; });
              var a;
              if (a = n.m.find(function (a) { return a.n === 'round'; })) {
                if (a.f === 0) { data.avatarA.push({ t: 13, g: 1, n: 'class', f: 'rcard-avatar-round' }); }
                else { data.avatarA.push({ t: 13, n: 'class-rcard-avatar-round', f: a.f }); }
              }
              if (a = n.m.find(function (a) { return a.n === 'image'; })) { img = a.f; }
            }

            if (img) {
              data.avatarP = [{ t: 7, e: 'div', m: [{ t: 13, n: 'class',f: 'rcard-avatar-inner', g: 1 }, { n: 'style-background-image', f: [ 'url(' ].concat( img, [')'] ), t: 13 }] }];
              if (img.length === 1 && img[0].t === 2) { data.avatarP = [Object.assign({}, img[0], { t: 4, n: 50, f: data.avatarP })]; }
            } else if (n.f && n.f.length) {
              data.avatarP = n.f;
            }
          }
          else if (n.e === 'footer') {
            data.footerA = n.m;
            data.footerP = n.f;
          }
          else if (n.e === 'action') {
            (data.actions || (data.actions = [])).push({
              attrs: n.m,
              content: n.f
            });
          }
          else if (n.t === 4 && n.n === 50 && n.f && n.f.filter(function (n) { return typeof n !== 'string'; }).length === 1 && n.f.find(function (e) { return e.e === 'action'; })) { // if action
            var section = Object.assign({}, n);
            var b = section.f.find(function (e) { return e.e === 'action'; });
            section.f = [{ t: 7, e: 'button', m: b.m, f: b.f }];
            (data.actions || (data.actions = [])).push({ P: [section] });
          }
          else { content.push(n); }
        });

        data.contentP = content;
      }

      var keys = ['title', 'subtitle', 'image', 'section', 'flat', 'popout', 'margin'];
      function updateAttrs(h) {
        keys.forEach(function (k) { return k in h.attributes && h.set(("@local." + k), h.attributes[k]); });
        'avatar-round' in h.attributes && h.set('@local.round', h.attributes['avatar-round']);
        'avatar' in h.attributes && h.set('@local.avatar', h.attributes.avatar || h.attributes['avatar-image']);
        'image-alt' in h.attributes && h.set('@local.alt', h.attributes['image-alt']);
        'no-pad' in h.attributes && h.set('@local.noPad', h.attributes['no-pad']);
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.partials[opts.name || 'card'] = Card;
        };
      }

      globalRegister('RMCard', 'partials', Card);

      var Card_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is your fairly standard Material card de-boilerplated a bit as a macro. It has sections for an avatar, title, subtitle, image, content, footer, and actions. It tries to adapt pleasantly to any elements being absent, so it's useful for everything from a box around some text, to a section wrapper in forms, to full-fledged cards displaying an image with actions.\n\n    Most of the items within the card also try to be smart about when they render. If you use the attribute shortcut forms, then an empty string in, for instance, the subtitle, will remove the subtitle from the DOM and cause the title to use a larger font and become fully centered in its allocated space.\n\n    Cards play well with the grid decorator.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    * `name: string = 'card'` - the name to use when registering the plugin as a macro\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `title: string` - The title to display on the card\n    * `subtitle: string` - The subtitle to display on the card\n    * `avatar: string` - The URL to an avatar to display on the card\n    * `avatar-round: string | boolean` - The URL to an avatar to display on the card as rounded, or if a boolean, whether to display the `avatar` as rounded. This appears next to the title.\n    * `popout: boolean = false` - Whether the avatar, if supplied, should pop out of the top of the card.\n    * `image: string` - The URL to an image to display on the card. This appears between the title and the content, taking up the full width of the card.\n    * `image-alt: string` - An `alt` string for the image.\n    * `no-pad: boolean` - Whether to pad the content of the card. This is useful for using other containers, like tabs, as the content of the card.\n    * `section: boolean = false` - Whether the card should more resemble a section group than a card. This is useful for making form sections stand out more.\n\n    ### Children\n\n    For greater control over the render process, you can also specify most of the portions of the card as child elements. These will also pass their attributes through to their containing element.\n\n    Additionally, card actions are specified as `<action>` tags that are rendered as flat Material buttons. An action may be enclosed in an `{{#if}}` section to conditionally render it. The only thing to watch out for in conditional sections is that there will be an additional `{{#each}}` wrapped around your content, so use `^^/` rather than `.` as a prefix to get at the context surrounding the card.\n\n    * `title`\n    * `subtitle`\n    * `avatar` - Bring your own `<img>` or `style=\"background-image: url(...)\"`.\n      * `round` - attribute - When present will add the `rcard-avatar-round` class to the avatar container.\n    * `image` - Bring your own `<img>`\n    * `footer` - appears below content\n    * `action` - zero or more actions to add to the bottom of the card. Handle activation by supplying an `on-click` event listener.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"grid",t:71},{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"row row-s1-2 row-m1-4",g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Title",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".title"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Subtitle",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".subtitle"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Avatar",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".avatar"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".round"}],t:13}]}," Round avatar?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".popout"}],t:13}]}," Popout?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Image",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".image"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Image Alt",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".alt"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".share"}],t:13}]}," Share button?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".section"}],t:13}]}," Section?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".flat"}],t:13}]}," Flat?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".margin"}],t:13}]}," Margin?"]}," ",{t:7,e:"label",m:[{t:13,n:"class",f:"t1",g:1},{n:"field",t:71}],f:["Content",{t:7,e:"textarea",m:[{t:73,v:"l",f:"1000"}],f:[{t:2,r:".content"}]}]}]}," ",{t:7,e:"marked",f:["### Template:\n      ```handlebars\n      <card title=\"{{.title}}\" subtitle=\"{{.subtitle}}\" avatar=\"{{.avatar}}\" avatar-round=\"{{.round}}\" image=\"{{.image}}\" image-alt=\"{{.alt}}\" section=\"{{.section}}\" flat=\"{{.flat}}\" popout=\"{{.popout}}\" style-max-width=\"30em\" margin=\"{{.margin}}\">\n        <avatar image=\"{{.avatar}}\" round=\"{{.round}}\" />\n        {{>{ template: .content }}}\n        <action on-click=\"console.log('Liked!')\" title=\"Like this breed on FriendFace\">Like</action>\n        {{#if ^^/share}}<action on-click=\"console.log('Shared!')\" title=\"Share this breed on FriendFace\">Share</action>{{/if}}\n      </card>\n      ```\n      ### Result:"]}," ",{t:7,e:"card",m:[{t:13,n:"style",f:"max-width: 30em;",g:1},{n:"title",f:[{t:2,r:".title"}],t:13},{n:"subtitle",f:[{t:2,r:".subtitle"}],t:13},{n:"avatar",f:[{t:2,r:".avatar"}],t:13},{n:"avatar-round",f:[{t:2,r:".round"}],t:13},{n:"image",f:[{t:2,r:".image"}],t:13},{n:"image-alt",f:[{t:2,r:".alt"}],t:13},{n:"section",f:[{t:2,r:".section"}],t:13},{n:"flat",f:[{t:2,r:".flat"}],t:13},{n:"popout",f:[{t:2,r:".popout"}],t:13},{n:"margin",f:[{t:2,r:".margin"}],t:13}],f:[{t:7,e:"avatar",m:[{n:"image",f:[{t:2,r:".avatar"}],t:13},{n:"round",f:[{t:2,r:".round"}],t:13}]}," ",{t:8,x:{r:[".content"],s:"{template:_0}"}}," ",{t:7,e:"action",m:[{n:["click"],t:70,f:{r:[],s:"[console.log(\"Liked!\")]"}},{n:"title",f:"Like this breed on FriendFace",t:13,g:1}],f:["Like"]}," ",{t:4,f:[{t:7,e:"action",m:[{n:["click"],t:70,f:{r:[],s:"[console.log(\"Shared!\")]"}},{n:"title",f:"Share this breed on FriendFace",t:13,g:1}],f:["Share"]}],n:50,r:"^^/share"}]}," ",{t:7,e:"br"}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Avatar Content",{t:7,e:"textarea",m:[{t:73,v:"l",f:"1000"}],f:[{t:2,r:".avatarContent"}]}]}," ",{t:7,e:"marked",f:["Here's the same card with the avatar content as a template.\n      ### Template:\n      ```handlebars\n      <card title=\"{{.title}}\" subtitle=\"{{.subtitle}}\" image=\"{{.image}}\" image-alt=\"{{.alt}}\" section=\"{{.section}}\" flat=\"{{.flat}}\" popout=\"{{.popout}}\" style-max-width=\"30em\" margin=\"{{.margin}}\">\n        <avatar>{{>{ template: .avatarContent }}}</avatar>\n        {{>{ template: .content}}}\n        <action on-click=\"console.log('Liked!')\" title=\"Like this breed on FriendFace\">Like</action>\n        {{#if ^^/share}}<action on-click=\"console.log('Shared!')\" title=\"Share this breed on FriendFace\">Share</action>{{/if}}\n      </card>\n      ```\n      ### Result:"]}," ",{t:7,e:"card",m:[{t:13,n:"style",f:"max-width: 30em;",g:1},{n:"title",f:[{t:2,r:".title"}],t:13},{n:"subtitle",f:[{t:2,r:".subtitle"}],t:13},{n:"image",f:[{t:2,r:".image"}],t:13},{n:"image-alt",f:[{t:2,r:".alt"}],t:13},{n:"section",f:[{t:2,r:".section"}],t:13},{n:"flat",f:[{t:2,r:".flat"}],t:13},{n:"popout",f:[{t:2,r:".popout"}],t:13},{n:"margin",f:[{t:2,r:".margin"}],t:13}],f:[{t:7,e:"avatar",f:[{t:8,x:{r:[".avatarContent"],s:"{template:_0}"}}]}," ",{t:8,x:{r:[".content"],s:"{template:_0}"}}," ",{t:7,e:"action",m:[{n:["click"],t:70,f:{r:[],s:"[console.log(\"Liked!\")]"}},{n:"title",f:"Like this breed on FriendFace",t:13,g:1}],f:["Like"]}," ",{t:4,f:[{t:7,e:"action",m:[{n:["click"],t:70,f:{r:[],s:"[console.log(\"Shared!\")]"}},{n:"title",f:"Share this breed on FriendFace",t:13,g:1}],f:["Share"]}],n:50,r:"^^/share"}]}," ",{t:7,e:"marked",f:["Try your own card here:"]}," ",{t:7,e:"br"}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"textarea",m:[{t:73,v:"l",f:"1000"}],f:[{t:2,r:".play"}]}]}," ",{t:7,e:"br"}," ",{t:8,x:{r:[".play"],s:"{template:_0}"}}," ",{t:7,e:"br"}]}]}],e:{"{template:_0}":function (_0){return({template:_0});},"[console.log(\"Liked!\")]":function (){return([console.log("Liked!")]);},"[console.log(\"Shared!\")]":function (){return([console.log("Shared!")]);}}},
        use: [plugin()],
        options: {
          title: 'Component :: Card',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            title: 'Shiba Inu',
            subtitle: 'Dog Breed',
            round: true,
            avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
            image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
            alt: 'Shiba Inu',
            content: '<p>The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.</p>',
            avatarContent: '<div style="background: linear-gradient(to top, #027de1, #47abdd); border-radius: 0.5em; width: 100%; height: 100%; box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.15)"></div>',
            share: true,
            play: '<card title="Play"><input value="{{.thing}}" />Do all the things you want to do {{.thing}}</card>',
            thing: 'here'
          };
        }
      }));

    }
  };
});
