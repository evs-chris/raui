import Ractive$1 from 'ractive';

var win = typeof window !== 'undefined' ? window : null;

function globalRegister(name, registry, constructor) {
  if (win && win.Ractive && typeof win.Ractive[registry] === 'object') {
    var script = document.currentScript;
    if (!script) {
      script = document.querySelectorAll('script');
      script = script[script.length - 1];
    }

    if (script) {
      var aliases = script.getAttribute('data-alias');
      if (aliases) {
        aliases = aliases.split('&');
        aliases = aliases.reduce(function (a, c) {
          var ref = c.split('=');
          var k = ref[0];
          var v = ref[1];
          a[k] = v;
          return a;
        }, {});
      }

      Ractive[registry][(aliases && aliases[name]) || name] = constructor;
    }
  }
}

function isArray(it) { return !!it && Object.prototype.toString.call(it) === '[object Array]'; }
function getType(it) {
  if (it === null) { return 'null'; }
  else if (typeof it === 'string') { return 'string'; }
  else if (typeof it === 'number') { return 'number'; }
  else if (typeof it === 'boolean') { return 'boolean'; }
  else if (typeof it === 'function') { return 'function'; }
  else if (typeof it === 'object' && isArray(it)) { return 'array'; }
  else if (typeof it === 'object') { return 'object'; }
  else { return 'wat'; }
}
function join(arr) {
  return Ractive$1.joinKeys.apply(Ractive$1, arr);
}

var clipEl = (function() {
  var el;
  return function clipEl() {
    if (!el) {
      el = document.querySelector('.ractive-json-editor-clipboard-el');
      if (!el) {
        el = document.createElement('span');
        el.style.display = 'block';
        el.style.left = '-10000px';
        el.style.position = 'absolute';
        el.setAttribute('class', 'ractive-json-editor-clipboard-el');
        document.body.appendChild(el);
      }
    }
    return el;
  }
})();

var JSONEditor = (function (Ractive) {
  function JSONEditor(opts) { Ractive.call(this, opts); }

  if ( Ractive ) JSONEditor.__proto__ = Ractive;
  JSONEditor.prototype = Object.create( Ractive && Ractive.prototype );
  JSONEditor.prototype.constructor = JSONEditor;

  JSONEditor.prototype.renameKey = function renameKey (path, name) {
    var then = path;
    var value = this.get(then);
    path = Ractive.splitKeypath(path);
    var thenKey = path.pop();
    var base = this.get(join(path));
    path.push(name);
    var now = join(path);
    var edit = 'keys.' + Ractive.escapeKey(then);

    if (name !== thenKey) {
      delete base[thenKey];
      this.update(then);
      this.set(now, value);
    }
    this.set(edit, false);
    return false;
  };

  JSONEditor.prototype.removeKey = function removeKey (path) {
    path = Ractive.splitKeypath(path);
    var key = path.pop();
    var now = join(path);
    var base = this.get(now);
    delete base[key];
    this.update(now);
    return false;
  };

  JSONEditor.prototype.addKey = function addKey (path) {
    var namePath = "values." + (Ractive.escapeKey(path)) + ".name";
    var name = this.get(namePath);
    if (!name) { return; }
    path = Ractive.splitKeypath(path);
    path.push(name);
    this.set(join(path), '');
    this.set(namePath, '');
    return false;
  };

  JSONEditor.prototype.startEdit = function startEdit (path, node) {
    path = "edits." + (Ractive.escapeKey(path));
    if (this.get(path)) { return; } // already editing
    this.set(path, true);
    if (node) { setTimeout(function () { return node.querySelector('textarea,input').focus(); }, 1); }
    return false;
  };

  JSONEditor.prototype.stopEdit = function stopEdit (path, key) {
    this.toggle(((key || 'edits') + "." + (Ractive.escapeKey(path))));
    return false;
  };

  JSONEditor.prototype.changeType = function changeType (path) {
    var val = getType(this.get(path));
    var next = this.event.original.target.value;
    if (val !== next) {
      switch (next) {
        case 'wat': val = undefined; break;
        case 'null': val = null; break;
        case 'string': val = ''; break;
        case 'number': val = 0; break;
        case 'boolean': val = false; break;
        case 'array': val = []; break;
        default: val = {}; break;
      }
      this.set(path, val);
    }
    return false;
  };

  JSONEditor.prototype.deferFocus = function deferFocus (node) {
    setTimeout(function () { return node.querySelector('textarea,input').focus(); }, 1);
    return false;
  };

  JSONEditor.prototype.toClipboard = function toClipboard (str) {
    setTimeout(function () {
      window.getSelection().removeAllRanges();
      var el = clipEl();
      el.innerText = str;
      var range = document.createRange();
      range.selectNodeContents(el);
      window.getSelection().addRange(range);

      try {
        document.execCommand('copy');
      } catch (e) {
        console.log(e);
      }

      window.getSelection().removeAllRanges();
    }, 1);

    return false;
  };

  return JSONEditor;
}(Ractive$1));

Ractive$1.extendWith(JSONEditor, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class",f:"root",t:13}],f:[{t:8,r:"rootValue"}]}],p:{changeType:[{t:7,e:"select",m:[{n:["change"],t:70,f:{r:["@this","@keypath"],s:"[_0.changeType(_1)]"}},{t:73,v:"t",f:"false"},{n:"value",f:[{t:2,x:{r:["~/getType","."],s:"_0(_1)"}}],t:13}],f:[{t:7,e:"option",f:["string"]}," ",{t:7,e:"option",f:["number"]}," ",{t:7,e:"option",f:["boolean"]}," ",{t:7,e:"option",f:["object"]}," ",{t:7,e:"option",f:["array"]}," ",{t:7,e:"option",f:["null"]}]}],editorEnd:[{t:7,e:"button",m:[{n:"title",f:"close editor",t:13},{n:"class",f:"ok icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.stopEdit(_1)]"}}],f:["✓"]},{t:8,r:"changeType"}],wat:[{t:7,e:"span",m:[{n:"class",f:"wat",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.startEdit(_1)]"}}],f:["???"]},{t:7,e:"span",m:[{n:"class",f:"close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],function:[{t:7,e:"span",m:[{n:"class",f:"fn",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.startEdit(_1)]"}}],f:["function() {...}"]},{t:7,e:"span",m:[{n:"class",f:"close",t:13}]}],null:[{t:7,e:"span",m:[{n:"class",f:"null",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.startEdit(_1)]"}}],f:["null"]},{t:7,e:"span",m:[{n:"class",f:"close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],boolean:[{t:7,e:"span",m:[{n:"class",f:"bool",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","@node"],s:"[_0.startEdit(_1,_2)]"}}],f:[{t:4,f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"."}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===27&&_1.stopEdit(_2)]"}}]}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}},{t:4,n:51,f:[{t:2,r:"."}],l:1}]},{t:7,e:"span",m:[{n:"class",f:"close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],number:[{t:7,e:"span",m:[{n:"class",f:"num",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","@node"],s:"[_0.startEdit(_1,_2)]"}}],f:[{t:4,f:[{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"."}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===27&&_1.stopEdit(_2)]"}}]}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}},{t:4,n:51,f:[{t:2,r:"."}],l:1}]},{t:7,e:"span",m:[{n:"class",f:"close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],string:[{t:7,e:"span",m:[{n:"class",f:"str",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","@node"],s:"[_0.startEdit(_1,_2)]"}}],f:[{t:7,e:"span",m:[{n:"class",f:"str",t:13}],f:[{t:4,f:[{t:7,e:"textarea",m:[{n:"rows",f:[{t:4,f:["5"],n:50,x:{r:["."],s:"_0.indexOf(\"\\n\")!==-1"}},{t:4,n:51,f:["1"],l:1}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===27&&_1.stopEdit(_2)]"}}],f:[{t:2,r:"."}]}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}},{t:4,n:51,f:[{t:7,e:"pre",f:[{t:2,r:"."}]}],l:1}]}]},{t:7,e:"span",m:[{n:"class",f:"close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],array:[{t:7,e:"div",m:[{n:"class-array",t:13},{n:"class-open",t:13,f:[{t:2,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}}]}],f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["[",{t:4,f:[{t:7,e:"span",m:[{n:"class",f:"ellipsis",t:13}],f:["…"]}],n:50,x:{r:["@keypath","~/toggles"],s:"!_1[_0]"}}]},{t:4,f:[" ",{t:19,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class",f:"entry",t:13}],f:[{t:7,e:"span",m:[{n:"class",f:"idx",t:13}],f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/escapeKey","array"],s:"[_0.toggle(\"indexes.\"+_1(_2)),false]"}}],f:[{t:2,r:"@index"}]}," ",{t:4,f:[{t:7,e:"button",m:[{n:"class",f:"icon",t:13},{n:"style-margin-left",f:"1em",t:13},{n:"title",f:"remove",t:13},{n:["click"],t:70,f:{r:["@this","array","@index"],s:"[_0.splice(_1,_2,1),false]"}}],f:["−"]}," ",{t:7,e:"button",m:[{n:"class",f:"icon",t:13},{n:"title",f:"move up",t:13},{n:["click"],t:70,f:{r:["@this","array","@index"],s:"[_0.splice(_1,_2-1,0,_0.splice(_1,_2,1).result[0]),false]"}},{t:4,f:[{n:"disabled",f:0,t:13}],n:50,x:{r:["@index"],s:"!_0"}}],f:["^"]}," ",{t:7,e:"button",m:[{n:"class",f:"icon",t:13},{n:"title",f:"move down",t:13},{n:["click"],t:70,f:{r:["@this","array","@index"],s:"[_0.splice(_1,_2+1,0,_0.splice(_1,_2,1).result[0]),false]"}},{t:4,f:[{n:"disabled",f:0,t:13}],n:50,x:{r:["@index","../length"],s:"_0===_1-1"}}],f:["v"]}," ",{t:7,e:"button",m:[{n:"title",f:"copy keypath",t:13},{n:"style-margin-left",f:"1em",t:13},{n:"class",f:"icon copy",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.toClipboard(_1.substr(5))]"}}],f:["⧉"]}],n:50,rx:{r:"~/indexes",m:[{t:30,n:"array"}]}}]}," ",{t:7,e:"div",m:[{n:"class",f:"value",t:13}],f:[{t:8,r:"value"}]}]}],n:52,r:"."}],n:54,z:[{n:"array",x:{r:"@keypath"}}]}],n:50,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}},{t:7,e:"span",m:[{n:"class",f:"close",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["]"]},{t:4,f:[" ",{t:7,e:"button",m:[{n:"title",f:"more actions",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"extras.\"+_1(_2)),false]"}}],f:["⋯"]}," ",{t:4,f:[{t:7,e:"button",m:[{n:"title",f:"push",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.push(_1,\"\"),false]"}}],f:["˃+"]}," ",{t:7,e:"button",m:[{n:"title",f:"unshift",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.unshift(_1,\"\"),false]"}}],f:["+˂"]}," ",{t:7,e:"button",m:[{n:"title",f:"pop",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.pop(_1),false]"}}],f:["˃-"]}," ",{t:7,e:"button",m:[{n:"title",f:"shift",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.shift(_1),false]"}}],f:["-˂"]}," ",{t:8,r:"changeType"}],n:50,rx:{r:"~/extras",m:[{t:30,n:"@keypath"}]}}],n:50,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}}]}],object:[{t:7,e:"div",m:[{n:"class-obj",t:13},{n:"class-open",t:13,f:[{t:2,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}}]}],f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["{",{t:4,f:[{t:7,e:"span",m:[{n:"class",f:"ellipsis",t:13}],f:["…"]}],n:50,x:{r:["@keypath","~/toggles"],s:"!_1[_0]"}}]},{t:4,f:[" ",{t:4,f:[{t:7,e:"div",m:[{n:"class",f:"entry",t:13}],f:[{t:7,e:"span",m:[{n:"class",f:"key",t:13},{n:["click"],t:70,f:{r:["~/escapeKey","@keypath","@key","@this","@node"],s:"[_3.set(\"keys.\"+_0(_1),_2),_3.deferFocus(_4)]"}}],f:[{t:7,e:"span",f:[{t:4,f:[{t:7,e:"textarea",m:[{n:"rows",f:[{t:4,f:["5"],n:50,x:{r:["@key","@keypath","~/keys"],s:"_0.indexOf(\"\\n\")!==-1||_2[_1].indexOf(\"\\n\")!==-1"}},{t:4,n:51,f:["1"],l:1}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath","~/keys"],s:"[_0===27&&_1.renameKey(_2,_3[_2])]"}}],f:[{t:2,rx:{r:"~/keys",m:[{t:30,n:"@keypath"}]}}]}],n:50,x:{r:["@keypath","~/keys"],s:"typeof _1[_0]===\"string\""}},{t:4,n:51,f:[{t:7,e:"pre",f:[{t:2,r:"@key"}]}],l:1}]}," ",{t:4,f:[{t:7,e:"button",m:[{n:"title",f:"apply",t:13},{n:"class",f:"icon ok",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","~/keys"],s:"[_0.renameKey(_1,_2[_1])]"}}],f:["✓"]}," ",{t:7,e:"button",m:[{n:"title",f:"cancel",t:13},{n:"class",f:"icon cancel",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.stopEdit(_1,\"keys\")]"}}],f:["✕"]}," ",{t:7,e:"button",m:[{n:"title",f:"remove key",t:13},{n:"style-margin-left",f:"1em",t:13},{n:"class",f:"icon cancel",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.removeKey(_1)]"}}],f:["−"]}," ",{t:7,e:"button",m:[{n:"title",f:"copy keypath",t:13},{n:"style-margin-left",f:"1em",t:13},{n:"class",f:"icon copy",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.toClipboard(_1.substr(5))]"}}],f:["⧉"]}],n:50,x:{r:["@keypath","~/keys"],s:"typeof _1[_0]===\"string\""}}]}," ",{t:7,e:"div",m:[{n:"class",f:"value",t:13}],f:[{t:8,r:"value"}]}]}],n:52,r:"."}],n:50,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}},{t:7,e:"span",m:[{n:"class",f:"close",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["}"]},{t:4,f:[" ",{t:7,e:"button",m:[{n:"title",f:"more actions",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"extras.\"+_1(_2)),false]"}}],f:["⋯"]}," ",{t:4,f:[{t:7,e:"input",m:[{n:"value",f:[{t:2,rx:{r:"~/values",m:[{t:30,n:"@keypath"},"name"]}}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===13&&_1.addKey(_2)]"}}]},{t:7,e:"button",m:[{n:"title",f:"add key",t:13},{n:"class",f:"icon ok",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.addKey(_1)]"}}],f:["+"]}," ",{t:8,r:"changeType"}],n:50,rx:{r:"~/extras",m:[{t:30,n:"@keypath"}]}}],n:50,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}}]}],rootValue:[{t:4,f:[{t:8,r:"value",c:{r:"root"}}],n:50,x:{r:["root"],s:"_0!==null&&typeof _0===\"object\""}},{t:4,n:51,f:[{t:4,f:[{t:7,e:"span",m:[{n:"class",f:"str",t:13},{n:"style-vertical-align",f:"top",t:13}],f:[{t:7,e:"span",m:[{n:"class",f:"str",t:13}],f:[{t:7,e:"textarea",m:[{n:"rows",f:[{t:4,f:["5"],n:50,x:{r:["root"],s:"_0.indexOf(\"\\n\")!==-1"}},{t:4,n:51,f:["1"],l:1}],t:13}],f:[{t:2,r:"root"}]}]}]}],n:50,x:{r:["root"],s:"typeof _0===\"string\""}},{t:4,n:50,f:[{t:7,e:"span",m:[{n:"class",f:"num",t:13}],f:[{t:7,e:"span",m:[{n:"class",f:"num",t:13}],f:[{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"root"}],t:13}]}]}]}],x:{r:["root"],s:"typeof _0===\"number\""},l:1},{t:4,n:50,f:[" ",{t:7,e:"span",m:[{n:"class",f:"bool",t:13}],f:[{t:7,e:"span",m:[{n:"class",f:"bool",t:13}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"root"}],t:13}]}]}]}],x:{r:["root"],s:"typeof _0===\"boolean\""},l:1},{t:4,n:50,f:[" ",{t:7,e:"span",m:[{n:"class",f:"null",t:13}],f:["null"]}],x:{r:["root"],s:"_0===null"},l:1},{t:4,n:51,f:[" ???"],l:1}," ",{t:7,e:"button",m:[{n:"title",f:"more actions",t:13},{n:"class",f:"icon",t:13},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"extras.root\")]"}}],f:["⋯"]}," ",{t:4,f:[{t:8,r:"changeType",c:{r:"root"}}],n:50,r:"~/extras.root"}],l:1}],value:[{t:8,x:{r:["~/getType","."],s:"_0(_1)"}}]},e:{"[_0.changeType(_1)]":function (_0,_1){return([_0.changeType(_1)]);},"_0(_1)":function (_0,_1){return(_0(_1));},"[_0.stopEdit(_1)]":function (_0,_1){return([_0.stopEdit(_1)]);},"[_0.startEdit(_1)]":function (_0,_1){return([_0.startEdit(_1)]);},"_0&&_2[_1]":function (_0,_1,_2){return(_0&&_2[_1]);},"[_0.startEdit(_1,_2)]":function (_0,_1,_2){return([_0.startEdit(_1,_2)]);},"[_0===27&&_1.stopEdit(_2)]":function (_0,_1,_2){return([_0===27&&_1.stopEdit(_2)]);},"_0.indexOf(\"\\n\")!==-1":function (_0){return(_0.indexOf("\n")!==-1);},"[_0.toggle(\"toggles.\"+_1(_2)),false]":function (_0,_1,_2){return([_0.toggle("toggles."+_1(_2)),false]);},"!_1[_0]":function (_0,_1){return(!_1[_0]);},"[_0.toggle(\"indexes.\"+_1(_2)),false]":function (_0,_1,_2){return([_0.toggle("indexes."+_1(_2)),false]);},"[_0.splice(_1,_2,1),false]":function (_0,_1,_2){return([_0.splice(_1,_2,1),false]);},"[_0.splice(_1,_2-1,0,_0.splice(_1,_2,1).result[0]),false]":function (_0,_1,_2){return([_0.splice(_1,_2-1,0,_0.splice(_1,_2,1).result[0]),false]);},"!_0":function (_0){return(!_0);},"[_0.splice(_1,_2+1,0,_0.splice(_1,_2,1).result[0]),false]":function (_0,_1,_2){return([_0.splice(_1,_2+1,0,_0.splice(_1,_2,1).result[0]),false]);},"_0===_1-1":function (_0,_1){return(_0===_1-1);},"[_0.toClipboard(_1.substr(5))]":function (_0,_1){return([_0.toClipboard(_1.substr(5))]);},"[_0.toggle(\"extras.\"+_1(_2)),false]":function (_0,_1,_2){return([_0.toggle("extras."+_1(_2)),false]);},"[_0.push(_1,\"\"),false]":function (_0,_1){return([_0.push(_1,""),false]);},"[_0.unshift(_1,\"\"),false]":function (_0,_1){return([_0.unshift(_1,""),false]);},"[_0.pop(_1),false]":function (_0,_1){return([_0.pop(_1),false]);},"[_0.shift(_1),false]":function (_0,_1){return([_0.shift(_1),false]);},"[_3.set(\"keys.\"+_0(_1),_2),_3.deferFocus(_4)]":function (_0,_1,_2,_3,_4){return([_3.set("keys."+_0(_1),_2),_3.deferFocus(_4)]);},"_0.indexOf(\"\\n\")!==-1||_2[_1].indexOf(\"\\n\")!==-1":function (_0,_1,_2){return(_0.indexOf("\n")!==-1||_2[_1].indexOf("\n")!==-1);},"[_0===27&&_1.renameKey(_2,_3[_2])]":function (_0,_1,_2,_3){return([_0===27&&_1.renameKey(_2,_3[_2])]);},"typeof _1[_0]===\"string\"":function (_0,_1){return(typeof _1[_0]==="string");},"[_0.renameKey(_1,_2[_1])]":function (_0,_1,_2){return([_0.renameKey(_1,_2[_1])]);},"[_0.stopEdit(_1,\"keys\")]":function (_0,_1){return([_0.stopEdit(_1,"keys")]);},"[_0.removeKey(_1)]":function (_0,_1){return([_0.removeKey(_1)]);},"[_0===13&&_1.addKey(_2)]":function (_0,_1,_2){return([_0===13&&_1.addKey(_2)]);},"[_0.addKey(_1)]":function (_0,_1){return([_0.addKey(_1)]);},"_0!==null&&typeof _0===\"object\"":function (_0){return(_0!==null&&typeof _0==="object");},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"typeof _0===\"number\"":function (_0){return(typeof _0==="number");},"typeof _0===\"boolean\"":function (_0){return(typeof _0==="boolean");},"_0===null":function (_0){return(_0===null);},"[_0.toggle(\"extras.root\")]":function (_0){return([_0.toggle("extras.root")]);}}},
  css: " .root { font-family: monospace; line-height: 1.6em; } span, pre { display: inline-block; cursor: pointer; margin: 0; } button { box-shadow: none; } button.icon { border: 1px solid rgba(153,153,153,0.25); background: #fdfdfd; border-radius: 0.2em; font-size: 0.8em; margin: 0 0.25em; padding: 0; color: #999; cursor: pointer; outline: none; transition-property: color, border; transition-duration: 0.3s; transition-timing-function: ease-in-out; vertical-align: top; width: 1.6em; height: 1.6em; min-height: 1.6em; box-sizing: border-box; line-height: 1.5em; text-align: center; } button.icon[disabled], button.icon[disabled]:hover { color: #ddd; border: 1px solid #ddd; background: #eee; } button.icon:hover { color: #0000bf; border: 1px solid rgba(0,0,191,0.5); } button.icon.ok:hover { color: #006000; border: 1px solid rgba(0,96,0,0.5); } button.icon.cancel:hover { color: #bf0000; border: 1px solid rgba(191,0,0,0.5); } textarea { font-size: 1.025em; border: 1px solid rgba(153,153,153,0.3); border-radius: 0.2em; } select { border: 1px solid rgba(153,153,153,0.3); background: #fdfdfd; padding: 0 0.2em 0 0.2em; vertical-align: top; font-size: 0.8em; outline: none; height: 1.6em; box-sizing: border-box; } input { font-size: 0.8em; border: 1px solid rgba(153,153,153,0.3); border-radius: 0.2em; } input[type=text], input[type=number], input:not([type]) { height: 1.6em; } .obj, .array { display: inline; } .obj > input { vertical-align: top; } .obj:hover > .entry, .array:hover > .entry { border-left: 1px dashed rgba(0,0,0,0.15); } .obj .entry, .array .entry { transition: border-left 0.3s ease-in-out; border-left: 1px dashed transparent; margin-left: 0.25em; padding-left: 0.75em; margin-bottom: 0.3em; } .obj .entry .close:after, .array .entry .close:after { content: ','; color: #606060; font-weight: 600; } .obj > .entry:last-of-type > .value > .close:after, .array > .entry:last-of-type > .value > .close:after, .obj > .entry:last-of-type > .value > * > .close:after, .array > .entry:last-of-type > .value > * > .close:after { content: ''; } .obj .entry .value, .array .entry .value { display: inline; } .obj .entry .key, .array .entry .key { color: #008000; } .obj .entry .key pre, .array .entry .key pre { user-select: none; -webkit-user-select: none; -moz-user-select: none; } .obj .entry .key > *, .array .entry .key > * { vertical-align: top; } .obj .entry .key:after, .array .entry .key:after { content: ':'; } .obj .entry .key > span > *, .array .entry .key > span > * { vertical-align: top; } .obj .entry .key > span:before, .array .entry .key > span:before, .obj .entry .key > span:after, .array .entry .key > span:after { content: '\"'; } .obj .entry .idx, .array .entry .idx { color: #0000e6; } .obj .entry .idx:after, .array .entry .idx:after { content: ':'; } .obj .entry .key, .array .entry .key, .obj .entry .idx, .array .entry .idx { vertical-align: top; } .obj .entry .key:after, .array .entry .idx:after { margin-right: 0.5em; } .obj > span, .array > span { font-weight: 600; color: #606060; } .obj .ellipsis, .array .ellipsis { color: #a0a0a0; } .root { padding: 0.5em; margin: 0.2em; border: 1px solid rgba(153,153,153,0.3); background-color: #fefefe; border-radius: 0.2em; } .root > .obj.open { display: block; } .num { color: #0000e6; font-weight: 500; vertical-align: top; } .bool { color: #cc8400; font-weight: 500; } .wat { color: #e60000; font-weight: 500; } .null { color: #737373; font-weight: 500; } .fn { color: #005a00; } .str { color: #753bb0; vertical-align: top; } .str pre { transition: border-left 0.3s ease-in-out; border-left: 1px dashed transparent; padding-left: 0.1em; } .str pre:hover { border-left: 1px dashed rgba(0,0,0,0.15); } .str span.close { vertical-align: bottom; } .str > span.str { vertical-align: top; } .str > span.str:before, .str > span.str:after { content: '\"'; display: inline-block; color: #4d004d; } .str > span.str:before { vertical-align: top; } .str > span.str:after { vertical-align: bottom; }",
  cssId: "json-editor",
  data: function data() {
    return {
      getType: getType,
      toggles: { root: true },
      edits: {},
      keys: {},
      extras: {},
      indexes: {},
      values: {},
      escapeKey: Ractive$1.escapeKey,
      editable: true
    };
  },
  observe: {
    root: {
      strict: true,
      init: false,
      handler: function handler() {
        this.set({
          toggles: { root: true },
          keys: {},
          values: {},
          extras: {}
        });
      }
    }
  }
});

globalRegister('RMJSONEditor', 'components', JSONEditor);

export default JSONEditor;
