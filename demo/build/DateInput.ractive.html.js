System.register(['./chunk18.js', './chunk11.js', './chunk10.js', './chunk2.js'], function (exports, module) {
  'use strict';
  var DatePicker, Popover, trigger, date, Window;
  return {
    setters: [function (module) {
      DatePicker = module.DatePicker;
    }, function (module) {
      Popover = module.Popover;
      trigger = module.trigger;
    }, function (module) {
      date = module.default;
    }, function (module) {
      Window = module.Window;
    }],
    execute: function () {

      function setup(ctx) {
        if (ctx.strObserver) { ctx.strObserver.cancel(); }

        if (ctx.attributes.value) { ctx.link(ctx.attributes.value, 'rdi.val'); }
        else { ctx.unlink('rdi.val'); }

        if (ctx.attributes.display) { ctx.link(ctx.attributes.display, 'rdi.display'); }
        else { ctx.unlink('rdi.display'); }

        if (ctx.attributes.string) { ctx.strObserver = ctx.observe('rdi.val', function (v) { return ctx.set(ctx.attributes.string, v ? v.toString() : ''); }); }

        var opts = { value: 'rdi.val', display: 'rdi.display' };
        ['null', 'lazy', 'mask', 'min', 'max', 'mask', 'no-pick'].forEach(function (k) {
          if (k in ctx.attributes) { opts[k.replace(/-/g, '')] = ctx.attributes[k]; }
        });

        ctx.set('rdi.opts', opts);
      }

      var DateInput = Ractive.macro(function (ctx) {
        ctx.aliasLocal('rdi');
        setup(ctx);
        ctx.setTemplate({v:4,t:[{t:7,e:"span",m:[{t:13,n:"class",f:"rdi-date field-wrapper",g:1}],f:[{t:7,e:"input",m:[{n:"rdi-reg",t:71,f:{r:[],s:"[\"node\"]"}},{n:"rdi-date",t:71,f:{r:["rdi.opts"],s:"[_0]"}},{n:"class-rdi-date",t:13},{t:8,r:"extra-attributes"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rdi-x",g:1},{n:["click"],t:70,f:{r:["@context"],s:"[(_0).set(\"rdi.val\",null)]"}},{n:"title",f:"Clear",t:13,g:1}],f:["×"]}],n:50,x:{r:["rdi.opts.null","rdi.val"],s:"_0&&_1!==null"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rdi-pop",g:1},{n:"rdi-pop",t:71,f:{r:["rdi.node","rdi.tail"],s:"[{path:\"rdi.popped\",node:_0,tail:_1}]"}},{n:["click"],t:70,f:{r:[],s:"[false,false]"}},{n:"title",f:"Select from calendar",t:13,g:1}],f:[{t:7,e:"svg",m:[{n:"rdi-reg",t:71,f:{r:[],s:"[\"tail\"]"}},{n:"x",f:"0px",t:13,g:1},{n:"y",f:"0px",t:13,g:1},{n:"viewBox",f:"0 0 48 48",t:13,g:1},{n:"xml:space",f:"preserve",t:13}],f:[{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.5;fill:none;stroke-width:1;",g:1},{n:"y",f:"1",t:13,g:1},{n:"x",f:"1",t:13,g:1},{n:"height",f:"46",t:13,g:1},{n:"width",f:"46",t:13,g:1}]}," ",{t:7,e:"rect",m:[{n:"y",f:"1",t:13,g:1},{n:"x",f:"1",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"46",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"13",t:13,g:1},{n:"x",f:"3",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.8;stroke:none;",g:1},{t:13,n:"class",f:"rdi-today",g:1},{n:"y",f:"13",t:13,g:1},{n:"x",f:"14",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"13",t:13,g:1},{n:"x",f:"25",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.4;stroke:none;",g:1},{n:"y",f:"13",t:13,g:1},{n:"x",f:"37",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"24",t:13,g:1},{n:"x",f:"3",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"24",t:13,g:1},{n:"x",f:"14",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"24",t:13,g:1},{n:"x",f:"25",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.4;stroke:none;",g:1},{n:"y",f:"24",t:13,g:1},{n:"x",f:"37",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"35",t:13,g:1},{n:"x",f:"3",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"35",t:13,g:1},{n:"x",f:"14",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.2;stroke:none;",g:1},{n:"y",f:"35",t:13,g:1},{n:"x",f:"25",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}," ",{t:7,e:"rect",m:[{t:13,n:"style",f:"opacity:0.4;stroke:none;",g:1},{n:"y",f:"35",t:13,g:1},{n:"x",f:"37",t:13,g:1},{n:"height",f:"8",t:13,g:1},{n:"width",f:"8",t:13,g:1}]}]}]}],n:51,r:"rdi.opts.nopick"}]}," ",{t:7,e:"rdi-pop",m:[{n:"popped",t:13,f:[{t:2,r:"rdi.popped"}]},{n:"tail",f:0,t:13},{n:"align",f:"end",t:13,g:1}],f:[{t:7,e:"rdi-picker",m:[{n:["init"],t:70,f:{r:["@context","rdi.val"],s:"[(_0).component.set(\"target\",_1)]"}},{n:"date",t:13,f:[{t:2,r:"rdi.val"}]}]}]}],e:{"[\"node\"]":function (){return(["node"]);},"[_0]":function (_0){return([_0]);},"[(_0).set(\"rdi.val\",null)]":function (_0){return([(_0).set("rdi.val",null)]);},"_0&&_1!==null":function (_0,_1){return(_0&&_1!==null);},"[{path:\"rdi.popped\",node:_0,tail:_1}]":function (_0,_1){return([{path:"rdi.popped",node:_0,tail:_1}]);},"[false,false]":function (){return([false,false]);},"[\"tail\"]":function (){return(["tail"]);},"[(_0).component.set(\"target\",_1)]":function (_0,_1){return([(_0).component.set("target",_1)]);}}});

        return {
          update: function update() { setup(ctx); }
        };
      }, {
        css: function(data) { return [(function(data) {
         return (".rdi-date {\n     position: relative;\n     display: inline-block;\n   }\n \n   .rdi-date input.rdi-date {\n     width: 100%;\n     box-sizing: border-box;\n   }\n \n   .rdi-x {\n     position: absolute;\n     right: 2em;\n     top: 0.025em;\n     cursor: pointer;\n   }\n \n   .rdi-pop {\n     position: absolute;\n     display: flex;\n     justify-content: space-around;\n     align-items: flex-end;\n     flex-direction: column;\n     right: 0.5em;\n     height: 100%;\n     top: 0;\n     cursor: pointer;\n   }\n \n   .rdi-pop > svg {\n     height: 48px;\n     max-height: 60%;\n     fill: " + (data('raui.dateInput.primary.fg') || data('raui.primary.fg') || '#222') + ";\n   }\n   \n   .rdi-today {\n     fill: " + (data('raui.dateInput.primary.fga') || data('raui.primary.fga') || '#07e') + ";\n   }");
      }).call(this, data)].join(' '); },
        cssId: 'rdi',
        noCssTransform: true,
        attributes: ['value', 'null', 'lazy', 'mask', 'string', 'display', 'min', 'max', 'no-pick']
      });

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components['rdi-picker'] = DatePicker;
          instance.components['rdi-pop'] = Popover;
          trigger({ name: 'rdi-pop' })({ instance: instance });
          date({ name: 'rdi-date' })({ instance: instance });
          instance.partials[opts.name || 'date-input'] = DateInput;
          instance.decorators['rdi-reg'] = function(node, name) {
            this.getContext(node).set(("rdi." + name), function () { return node; });
            return { teardown: function teardown() {} };
          };
        };
      }

      var DateInput_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The `DateInput` macro combines the `date` decorator, the `DatePicker` component, and a `Popover` into a convenient package wrapped up in an input. You can control the format, minimum, maximum, and bindings of the `date` decorator with attributes. The rendered component includes an icon to pop up the `DatePicker` in a `Popover`, which allows the user to navigate around a calendar to select a date.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    All options are optional.\n\n    * `name: string = 'date-input'` - the name to use when registering the plugin as a macro\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `mask: string` - set the mask for the date field\n    * `value: keypath` - the keypath to which the date should be bound\n    * `lazy: boolean` - if provided, the date input won't fire changes until the field is blurred\n    * `null: boolean` - whether the date should be allowed to be left blank\n    * `string: keypath` - the keypath to which the text of the input should be bound\n    * `min: Date` - the minimum value for the date input\n    * `max: Date` - the maximum value for the date input\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n      <date-input />\n      <date-input value=\".date\" />\n      <date-input value=\".date\" mask=\"MM/dd/yyyy\" string=\".dateString\" />\n      <date-input value=\".minDate\" min=\"{{.min}}\" />\n      <date-input value=\".maxDate\" max=\"{{.max}}\" />\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"dates",g:1}],f:[{t:7,e:"date-input"}," ",{t:7,e:"date-input",m:[{n:"value",f:".date",t:13}]}," ",{t:7,e:"date-input",m:[{n:"value",f:".date",t:13},{n:"mask",f:"MM/dd/yyyy",t:13,g:1},{n:"string",f:".dateString",t:13,g:1}]}," ",{t:7,e:"date-input",m:[{n:"value",f:".minDate",t:13},{n:"min",f:[{t:2,r:".min"}],t:13}]}," ",{t:7,e:"date-input",m:[{n:"value",f:".maxDate",t:13},{n:"max",f:[{t:2,r:".max"}],t:13}]}]}," ",{t:7,e:"code",f:[{t:7,e:"pre",f:["      Date: ",{t:2,r:".date"},"\n      Min Date: ",{t:2,r:".minDate"},"\n      Max Date: ",{t:2,r:".maxDate"},"\n      Date String: ",{t:2,r:".dateString"},"\n    "]}]}]}]}]},
        css: " .dates { display: flex; flex-wrap: wrap; } .dates span.rdi-date { width: 16em; margin: 1em; flex-shrink: 0; } .dates input { padding: 0.5em; }",
        use: [plugin()],
        options: {
          title: 'Component :: DateInput',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            min: new Date(new Date() - 86400000 * 30),
            max: new Date(new Date() + 86400000 * 30),
          };
        }
      }));

    }
  };
});
