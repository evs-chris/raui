import Ractive from 'ractive';
import globalRegister from './globalRegister';
import { expand } from './transition-expand';

var template = {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-wrapper",g:1},{t:8,r:"extra-attributes"},{n:"class-rcard-margin",t:13,f:[{t:2,r:"_card.margin"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard",g:1},{n:"class-rcard-no-pad",t:13,f:[{t:2,r:"_card.noPad"}]},{n:"class-rcard-section",t:13,f:[{t:2,r:"_card.section"}]},{n:"class-rcard-flat",t:13,f:[{t:2,x:{r:["_card","_card.flat","@style.card.flat"],s:"\"flat\" in _0?_1:_2"}}]},{n:"class-rcard-deep",t:13,f:[{t:2,x:{r:["_card","_card.flat","@style.card.flat"],s:"\"flat\" in _0?!_1:!_2"}}]},{n:"class-rcard-popout",t:13,f:[{t:2,r:"_card.popout"}]},{n:"class-rcard-collapsed",t:13,f:[{t:2,x:{r:["_card.expandable","_card.expanded"],s:"_0&&_1===false"}}]},{n:"class-rcard-expandable",t:13,f:[{t:2,r:"_card.expandable"}]},{n:"class-rcard-arrow",t:13,f:[{t:2,r:"_card.arrow"}]}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-header",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["@context","_card.expanded"],s:"[(_0).set(\"_card.expanded\",_1===false?true:false)]"}}],n:50,r:"_card.expandable"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-avatar",g:1},{n:"class-rcard-avatar-round",t:13,f:[{t:2,r:"_card.round"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-avatar-inner",g:1},{n:"style-background-image",f:["url(",{t:2,r:"_card.avatar"},")"],t:13}]}]}],n:50,x:{r:["_card.avatar"],s:"_0&&typeof _0===\"string\""}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-avatar",g:1},{t:4,f:[{t:8,r:"_card.avatarA"}],n:50,r:"_card.avatarA"}],f:[{t:8,r:"_card.avatarP"}]}],n:50,r:"_card.avatarP",l:1}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-titles",g:1},{n:"class-rcard-with-sub",t:13,f:[{t:2,x:{r:["_card.subtitle","_card.subtitleP"],s:"_0||_1"}}]}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-title",g:1}],f:[{t:2,r:"_card.title"}]}],n:50,r:"_card.title"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-title",g:1},{t:4,f:[{t:8,r:"_card.titleA"}],n:50,r:"_card.titleA"}],f:[{t:8,r:"_card.titleP"}]}],n:51,l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-subtitle",g:1}],f:[{t:2,r:"_card.subtitle"}]}],n:50,r:"_card.subtitle"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-subtitle",g:1},{t:4,f:[{t:8,r:"_card.subtitleA"}],n:50,r:"_card.subtitleA"}],f:[{t:8,r:"_card.subtitleP"}]}],n:50,r:"_card.subtitleP",l:1}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-expand",g:1},{n:"class-rcard-expanded",t:13,f:[{t:2,x:{r:["_card.expanded"],s:"_0!==false"}}]}],f:[{t:7,e:"svg",f:[{t:7,e:"path",m:[{n:"d",f:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",t:13,g:1}]}]}]}],n:50,x:{r:["_card.arrow","_card.expandable"],s:"_0&&_1"}}]}],n:50,x:{r:["_card.titleP","_card.subtitleP","_card.avatarP","_card.title","_card.subtitle","_card.avatar"],s:"_0||_1||_2||_3||_4||(_5&&typeof _5===\"string\")"}}," ",{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-image",g:1},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,r:"_card.expandable"}],f:[{t:7,e:"img",m:[{n:"src",f:[{t:2,r:"_card.image"}],t:13},{n:"alt",f:[{t:2,r:"_card.alt"}],t:13}]}]}],n:50,r:"_card.image"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-image",g:1},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,r:"_card.expandable"},{t:4,f:[{t:8,r:"_card.imageA"}],n:50,r:"_card.imageA"}],f:[{t:8,r:"_card.imageP"}]}],n:50,r:"_card.imageP",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-content",g:1},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,r:"_card.expandable"}],f:[{t:8,r:"_card.contentP"}]}],n:50,r:"_card.contentP"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-footer",g:1},{t:4,f:[{t:8,r:"_card.footerA"}],n:50,r:"_card.footerA"},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,r:"_card.expandable"}],f:[{t:8,r:"_card.footerP"}]}],n:50,r:"_card.footerP"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rcard-actions",g:1},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,r:"_card.expandable"}],f:[{t:4,f:[{t:4,f:[{t:8,r:".P"}],n:50,r:".P"},{t:4,f:[{t:7,e:"button",m:[{t:8,r:".attrs"}],f:[{t:8,r:".content"}]}],n:51,l:1}],n:52,r:"_card.actions"}]}],n:50,r:"_card.actions.length"}],n:50,x:{r:["_card.expandable","_card.expanded"],s:"!_0||_1!==false"}}]}]}],e:{"\"flat\" in _0?_1:_2":function (_0,_1,_2){return("flat" in _0?_1:_2);},"\"flat\" in _0?!_1:!_2":function (_0,_1,_2){return("flat" in _0?!_1:!_2);},"_0&&_1===false":function (_0,_1){return(_0&&_1===false);},"[(_0).set(\"_card.expanded\",_1===false?true:false)]":function (_0,_1){return([(_0).set("_card.expanded",_1===false?true:false)]);},"_0&&typeof _0===\"string\"":function (_0){return(_0&&typeof _0==="string");},"_0||_1":function (_0,_1){return(_0||_1);},"_0!==false":function (_0){return(_0!==false);},"_0&&_1":function (_0,_1){return(_0&&_1);},"_0||_1||_2||_3||_4||(_5&&typeof _5===\"string\")":function (_0,_1,_2,_3,_4,_5){return(_0||_1||_2||_3||_4||(_5&&typeof _5==="string"));},"!_0||_1!==false":function (_0,_1){return(!_0||_1!==false);}}};

export var Card = Ractive.macro(
  function (handle) {
    init(handle);
    handle.setTemplate(template);

    return {
      update: function update() {
        updateAttrs(handle);
      },
      teardown: function teardown() {
        if (handle._link && typeof handle._link === 'string') { handle.unlink(handle._link); }
      }
    }
  }, {
    cssId: 'rm-card',
    css: function(data) { return [(function(data) {
   var primary = Object.assign({}, data('raui.primary'), data('raui.card.primary'));
   var header = Object.assign({}, primary, data('raui.card.primary.header'));
   var themes = (data('raui.themes') || []).slice();
   (data('raui.card.themes') || []).forEach(function (t) {
     if (!~themes.indexOf(t)) { themes.push(t); }
   });
   return "\n   .rcard-margin {\n     padding: 0.5em;\n     box-sizing: border-box;\n   }\n   .rcard {\n     display: block;\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n     border-radius: " + (primary.radius || '0.2em') + ";\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: box-shadow, border, background-color, color, margin, padding;\n   }\n \n   .rcard-section {\n     overflow: hidden;\n   }\n \n   .rcard-deep {\n     box-shadow: " + (primary.shadow || '0 1px 4px 0 rgba(0,0,0,0.14)') + ";\n     border: 1px solid " + (primary.bc || '#ccc') + ";\n   }\n   .rcard-flat {\n     border: 0.0625em solid " + (primary.bc || '#ccc') + ";\n     box-shadow: none;\n   }\n \n   .rcard-no-pad > .rcard-content {\n     padding: 0;\n   }\n \n   .rcard > div:nth-last-of-type(n + 2) {\n     padding-bottom: 0;\n   }\n \n   .rcard-header, .rcard-content {\n     padding: 1em;\n   }\n \n   .rcard-header {\n     display: flex;\n     align-items: center;\n     height: 3em;\n     transition-duration: " + (header.duration || '0.2s') + ";\n     transition-timing-function: " + (header.easing || 'ease-in-out') + ";\n     transition-property: color, background-color, padding, height;\n   }\n \n   .rcard-section > .rcard-header {\n     background-color: " + (header.fga || '#07e') + ";\n     color: " + (header.bg || '#fff') + ";\n     height: auto;\n   }\n \n   .rcard-section > .rcard-header:first-of-type {\n     padding: " + (header.padding || '0.5em 1em') + ";" + (header.gradient ? ("\n     background: " + (header.gradient) + ";\n     color: " + (header.fg || '#222') + ";\n     border-bottom: 1px solid " + (header.bc || '#ccc') + ";") : '') + "\n   }\n \n   .rcard-avatar {\n     width: 3em;\n     height: 3em;\n     margin-right: 1em;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: width, height, bottom;\n   }\n \n   .rcard-avatar-inner {\n     height: 100%;\n     background-size: cover;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: border-radius, box-shadow;\n   }\n \n   .rcard-avatar-round .rcard-avatar-inner {\n     border-radius: 100%;\n   }\n \n   .rcard-popout {\n     margin-top: 2em;\n   }\n   .rcard-section.rcard-popout {\n     overflow: visible;\n   }\n   .rcard-popout > .rcard-header {\n     position: relative;\n   }\n   .rcard-section.rcard-popout > .rcard-header {\n     border-radius: " + (primary.easing || '0.2em') + " " + (primary.radius || '0.2em') + " 0 0;\n   }\n   .rcard-popout > .rcard-header .rcard-avatar {\n     position: absolute;\n     bottom: 0;\n     width: 6em;\n     height: 6em;\n   }\n   .rcard-popout > .rcard-header .rcard-avatar ~ .rcard-titles {\n     margin-left: 7em;\n   }\n   .rcard-popout.rcard-section > .rcard-header .rcard-avatar {\n     bottom: 0.5em;\n     width: 3.75em;\n     height: 3.75em;\n   }\n   .rcard-popout.rcard-section > .rcard-header .rcard-avatar ~ .rcard-titles {\n     margin-left: 5em;\n   }\n   .rcard-popout.rcard-deep > .rcard-header .rcard-avatar-inner {\n     box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);\n   }\n \n   .rcard-titles {\n     flex-grow: 1;\n     display: flex;\n     flex-direction: column;\n     justify-content: center;\n     line-height: 1em;\n     transition-duration: " + (primary.duration || '0.2s') + ";\n     transition-timing-function: " + (primary.easing || 'ease-in-out') + ";\n     transition-property: margin;\n   }\n \n   .rcard-with-sub {\n     justify-content: space-evenly;\n   }\n   .rcard-with-sub > .rcard-title {\n     font-size: 1.2em;\n   }\n \n   .rcard-title {\n     font-size: 1.5em;\n   }\n \n   .rcard-subtitle {\n     opacity: 0.7;\n     font-size: 1em;\n   }\n \n   .rcard-section > .rcard-header .rcard-titles {\n     line-height: 1.2em;\n   }\n   .rcard-section > .rcard-header .rcard-with-sub {\n     line-height: 1em;\n   }\n   .rcard-section > .rcard-header .rcard-with-sub > .rcard-title {\n     font-size: 1.1em;\n   }\n   .rcard-section > .rcard-header .rcard-title {\n     font-size: 1.2em;\n   }\n \n   .rcard-expandable > .rcard-header {\n     cursor: pointer;\n     transition-property: color, background-color, height;\n   }\n   .rcard-expand {\n     flex-shrink: 1;\n     height: 24px;\n     transition: transform 0.2s ease-in-out;\n   }\n   .rcard-expand.rcard-expanded {\n     transform: rotate(180deg);\n     transform-origin: center;\n   }\n   .rcard-expand svg {\n     width: 24px;\n     height: 24px;\n   }\n   .rcard-expand svg path {\n     fill: " + (header.fg || '#222') + ";\n     stroke: " + (header.fg || '#222') + ";\n   }\n   .rcard-section > .rcard-header .rcard-expand svg path {\n     fill: " + (header.bg || '#fff') + ";\n     stroke: " + (header.bg || '#fff') + ";\n   }\n \n   .rcard-popout.rcard-collapsed > .rcard-header .rcard-avatar {\n     bottom: 1em;\n   }\n   .rcard-popout.rcard-collapsed.rcard-section > .rcard-header .rcard-avatar {\n     bottom: 0.5em;\n   }\n \n   .rcard > div:first-of-type.rcard-image {\n     margin-top: 0;\n   }\n \n   .rcard-image {\n     margin-top: 1em;\n   }\n \n   .rcard-image > img {\n     width: 100%;\n   }\n \n   .rcard-actions {\n     padding: 0.5em;\n   }\n \n   .rcard-actions > button {\n     text-decoration: none;\n     text-align: center;\n     letter-spacing: 0.5px;\n     cursor: pointer;\n     user-select: none;\n     border: none;\n     border-radius: 2px;\n     padding: 0 2rem;\n     transition: 0.2s ease-in-out;\n     transition-property: box-shadow, opacity, background-color;\n     font-size: 1em;\n     line-height: 1.5em;\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n     vertical-align: middle;\n     min-height: 2.25em;\n     outline: 0;\n     margin: 0.25em;\n     position: relative;\n     overflow: hidden;\n     font-weight: 500;\n     -webkit-tap-highlight-color: transparent;\n     box-shadow: none;\n   }\n \n   .rcard-actions > button[disabled], .btn.disabled {\n     opacity: 0.7;\n     cursor: not-allowed;\n   }\n \n   .rcard-actions > button[disabled]:hover {\n     opacity: 0.7;\n   }\n \n   .rcard-actions > button.flat:hover {\n     box-shadow: none;\n   }\n \n   .rcard-actions > button:after {\n     content: ' ';\n     position: absolute;\n     top: 0;\n     left: 0;\n     height: 100%;\n     width: 100%;\n     background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);\n     opacity: 0;\n     transform: scale(5, 5);\n     transition: opacity 0.6s ease-out, transform 0.5s ease-in;\n   }\n \n   .rcard-actions > button:before {\n     content: ' ';\n     position: absolute;\n     height: 100%;\n     width: 100%;\n     background-color: rgba(0, 0, 0, 0.075);\n     opacity: 0;\n     top: 0;\n     left: 0;\n     transition: opacity 0.4s ease-in-out;\n   }\n \n   .rcard-actions > button:focus:before {\n     opacity: 1;\n   }\n   .rcard-actions > button:hover:before {\n     opacity: 0.5;\n   }\n   \n   .rcard-actions > button:active:after {\n     transform: scale(1, 1);\n     opacity: 1;\n     transition: none;\n   }\n   " + themes.map(function (t) {
     var theme = Object.assign({}, data('raui.primary'), data('raui.card.primary'), data(("raui." + t)), data(("raui.card." + t)));
     var header = Object.assign({}, theme, data('raui.card.primary.header'), data(("raui.card." + t + ".header")));
     return ("\n   ." + t + ".rcard {\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bg || '#fff') + ";\n     border-radius: " + (theme.radius || '0.2em') + ";\n   }\n   ." + t + ".rcard-deep {\n     box-shadow: " + (primary.shadow || '0 1px 4px 0 rgba(0,0,0,0.14)') + ";\n     border: 1px solid " + (primary.bc || '#ccc') + ";\n   }\n   ." + t + ".rcard-flat {\n     border: 0.0625em solid " + (primary.bc || '#ccc') + ";\n   }\n \n   ." + t + ".rcard-section > .rcard-header {\n     background-color: " + (header.fga || '#07e') + ";\n     color: " + (header.bg || '#fff') + ";\n   }\n \n   ." + t + ".rcard-section > .rcard-header:first-of-type {\n     padding: " + (header.padding || '0.5em 1em') + ";" + (header.gradient ? ("\n     background: " + (header.gradient) + ";\n     color: " + (header.fg || '#222') + ";\n     border-bottom: 1px solid " + (header.bc || '#ccc') + ";") : '') + "\n   }\n \n   ." + t + " > .rcard-header.rcard-expand svg path {\n     fill: " + (header.fg || '#222') + ";\n     stroke: " + (header.fg || '#222') + ";\n   }\n   ." + t + ".rcard-section > .rcard-header .rcard-expand svg path {\n     fill: " + (header.bg || '#fff') + ";\n     stroke: " + (header.bg || '#fff') + ";\n   }\n   ." + t + " > .rcard-actions > button {\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n   }\n     ");
   }).join('');
}).call(this, data)].join(' '); },
    noCssTransform: true,
    attributes: ['title', 'subtitle', 'image', 'avatar', 'avatar-round', 'no-pad', 'image-alt', 'section', 'flat', 'popout', 'margin', 'expandable', 'expanded', 'no-arrow']
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

var keys = ['title', 'subtitle', 'image', 'section', 'flat', 'popout', 'margin', 'expandable'];
function updateAttrs(h) {
  keys.forEach(function (k) { return k in h.attributes && h.set(("@local." + k), h.attributes[k]); });
  'avatar-round' in h.attributes && h.set('@local.round', h.attributes['avatar-round']);
  'avatar' in h.attributes && h.set('@local.avatar', h.attributes.avatar || h.attributes['avatar-image']);
  'image-alt' in h.attributes && h.set('@local.alt', h.attributes['image-alt']);
  'no-pad' in h.attributes && h.set('@local.noPad', h.attributes['no-pad']);
  h.set('@local.arrow', !h.attributes['no-arrow']);
  if ('expanded' in h.attributes && h._link !== h.attributes.expanded) {
    if (h._link && typeof h._link === 'string') { h.unlink(h._link); }
    h._link = h.attributes.expanded;
    if (h._link && typeof h._link === 'string') { h.link(h._link, '_card.expanded'); }
    else { h.set('_card.expanded', h.attributes.expanded); }
  }
}

export function plugin(opts) {
  if ( opts === void 0 ) opts = {};

  return function(ref) {
    var instance = ref.instance;

    if (!instance.transitions.expand) { instance.transitions.expand = expand; }
    instance.partials[opts.name || 'card'] = Card;
  };
}

globalRegister('RMCard', 'partials', Card);

export default plugin;
