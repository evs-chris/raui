System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
    }],
    execute: function () {

      var AppBar = /*@__PURE__*/(function (Ractive) {
        function AppBar(opts) { Ractive.call(this, opts); }

        if ( Ractive ) AppBar.__proto__ = Ractive;
        AppBar.prototype = Object.create( Ractive && Ractive.prototype );
        AppBar.prototype.constructor = AppBar;

        var prototypeAccessors = { waiting: { configurable: true } };

        prototypeAccessors.waiting.get = function () { return this.get('waiting'); };
        prototypeAccessors.waiting.set = function (show) { this.add('waiting', show ? 1 : -1); };
        AppBar.prototype.wait = function wait (show) { this.waiting = show; };

        Object.defineProperties( AppBar.prototype, prototypeAccessors );

        return AppBar;
      }(Ractive$1));

      Ractive$1.extendWith(AppBar, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rappbar",g:1},{t:16,r:"extra-attributes"}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rappbar-left",g:1},{t:4,f:[{t:16,r:"._leftAttrs"}],n:50,r:"._leftAttrs"}],f:[{t:4,f:[{t:16,r:"._leftP"}],n:50,r:"._leftP"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rappbar-center",g:1},{t:4,f:[{t:16,r:"._centerAttrs"}],n:50,r:"._centerAttrs"}],f:[{t:4,f:[{t:16,r:"._centerP"}],n:50,r:"._centerP"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rappbar-right",g:1},{t:4,f:[{t:16,r:"._rightAttrs"}],n:50,r:"._rightAttrs"}],f:[{t:4,f:[{t:16,r:"._rightP"}],n:50,r:"._rightP"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rappbar-wait",g:1},{n:"class-waiting",t:13,f:[{t:2,r:"waiting"}]}]}]}]},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.appbar.primary'));
         return "\n   .rappbar {\n     display: flex;\n     padding: 0.7em;\n     background-color: " + (primary.fga || '#07e') + ";\n     color: " + (primary.bg || '#fff') + ";\n     position: relative;\n     justify-content: space-between;\n     align-items: center;\n   }\n \n   .rappbar.alt {\n     background-color: " + (primary.fg || '#222') + ";\n   }\n \n   .rappbar-left {\n     display: flex;\n     justify-content: flex-start;\n   }\n \n   .rappbar-right {\n     display: flex;\n     justify-content: flex-end;\n   }\n \n   .rappbar-center {\n     flex-shrink: 1;\n   }\n \n   .rappbar-wait {\n     position: absolute;\n     bottom: 0;\n     left: 0;\n     width: 100%;\n     height: 0.75em;\n     opacity: 0;\n     transition: opacity 0.3s ease-in-out;\n     background: linear-gradient(to left, " + (data('raui.appbar.wait.color1') || 'rgba(255, 255, 255, 0.7)') + ", " + (data('raui.appbar.wait.color2') || 'rgba(0, 0, 0, 0.1)') + ", " + (data('raui.appbar.wait.color1') || 'rgba(255, 255, 255, 0.7)') + ");\n     background-size: 600% 600%;\n     animation: rappbar-roll 10s linear infinite;\n     animation-play-state: paused;\n   }\n \n   .rappbar-wait.waiting {\n     opacity: 1;\n     animation-play-state: running;\n   }\n \n   @keyframes rappbar-roll {\n     0% { background-position: 0% 50%; }\n     50% { background-position: 100% 50%; }\n     100% { background-position: 0% 50%; }\n   }\n   " + (data('raui.themes') || []).map(function (t) {
           var theme = Object.assign({}, primary, data(("raui." + t)), data(("raui.appbar." + t)));
           return (".rappbar." + t + " {\n       background-color: " + (theme.fga || '#07e') + ";\n       color: " + (theme.bg || primary.bg || '#fff') + ";\n     }\n     .rappbar." + t + ".alt {\n       background-color: " + (theme.fg || '#222') + "\n     }\n     ");
         });
      }).call(this, data)].join(' '); },
        cssId: 'appbar',
        attributes: ['waiting'],
        noCssTransform: true,
        data: function data() { return { waiting: 0 }; },
        on: {
          config: function config() {
            var this$1 = this;

            var tpl = this.partials.content;
            if (tpl) {
              tpl.filter(function (e) { return e.e === 'left' || e.e === 'right' || e.e === 'center'; }).forEach(function (e) {
                this$1.set(("_" + (e.e) + "P"), e.f);
                if (e.m) { this$1.set(("_" + (e.e) + "Attrs"), e.m); }
              });
            }
          }
        }
      });

      globalRegister('RMAppBar', 'components', AppBar);

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'app-bar'] = AppBar;
        }
      }
      exports('default', plugin);

    }
  };
});
