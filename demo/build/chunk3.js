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

      var AppBar = (function (Ractive) {
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
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rappbar",t:13},{t:16,r:"extra-attributes"}],f:["\n  ",{t:7,e:"div",m:[{n:"class-rappbar-left",t:13}],f:[{t:4,f:[{t:16,r:"._leftP"}],n:50,r:"._leftP"}]},"\n  ",{t:7,e:"div",m:[{n:"class-rappbar-center",t:13}],f:[{t:4,f:[{t:16,r:"._centerP"}],n:50,r:"._centerP"}]},"\n  ",{t:7,e:"div",m:[{n:"class-rappbar-right",t:13}],f:[{t:4,f:[{t:16,r:"._rightP"}],n:50,r:"._rightP"}]},"\n  ",{t:7,e:"div",m:[{n:"class-rappbar-wait",t:13},{n:"class-waiting",t:13,f:[{t:2,r:"waiting"}]}]},"\n"]}]},
          css: function(data) { return [(function(data) {



        return ("\n\n  .rappbar {\n\n    display: flex;\n\n    padding: 1em;\n\n    background-color: " + (data('appbar.bg') || data('bg2') || '#07e') + ";\n\n    color: " + (data('appbar.fg') || data('fg2') || '#f9f9f9') + ";\n\n    position: relative;\n\n  }\n\n\n\n  .rappbar-left {\n\n    flex-grow: 3;\n\n    display: flex;\n\n    justify-content: flex-start;\n\n  }\n\n\n\n  .rappbar-right {\n\n    flex-grow: 3;\n\n    display: flex;\n\n    justify-content: flex-end;\n\n  }\n\n\n\n  .rappbar-center {\n\n    flex-shrink: 1;\n\n  }\n\n\n\n  .rappbar-wait {\n\n    position: absolute;\n\n    bottom: 0;\n\n    left: 0;\n\n    width: 100%;\n\n    height: 0.5em;\n\n    opacity: 0;\n\n    transition: opacity 0.3s ease-in-out;\n\n    background: linear-gradient(to left, " + (data('appbar.wait.color1') || 'rgba(255, 255, 255, 0.7)') + ", " + (data('appbar.wait.color2') || 'rgba(0, 0, 0, 0.1)') + ", " + (data('appbar.wait.color1') || 'rgba(255, 255, 255, 0.7)') + ");\n\n    background-size: 600% 600%;\n\n    animation: rappbar-roll 10s linear infinite;\n\n    animation-play-state: paused;\n\n  }\n\n\n\n  .rappbar-wait.waiting {\n\n    opacity: 1;\n\n    animation-play-state: running;\n\n  }\n\n\n\n  @keyframes rappbar-roll {\n\n    0% { background-position: 0% 50%; }\n\n    50% { background-position: 100% 50%; }\n\n    100% { background-position: 0% 50%; }\n\n  }\n\n  ");


      }).call(this, data)].join(' '); },
          cssId: 'appbar',
          attributes: ['waiting'],
          data: function data() { return { waiting: 0 }; },
          on: {
            config: function config() {
              var this$1 = this;

              var tpl = this.partials.content;
              if (tpl) {
                tpl.forEach(function (e) {
                  if (e.e === 'left') { this$1.set('_leftP', { t: e.f }); }
                  if (e.e === 'center') { this$1.set('_centerP', { t: e.f }); }
                  if (e.e === 'right') { this$1.set('_rightP', { t: e.f }); }
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
