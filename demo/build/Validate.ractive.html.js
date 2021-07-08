System.register(['ractive', './chunk2.js', './chunk14.js'], function (exports, module) {
  'use strict';
  var Ractive$1, Window, tabs;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      Window = module.Window;
    }, function (module) {
      tabs = module.default;
    }],
    execute: function () {

      // TODO: allow relative keys to be used in wild and list with a . prefix

      function dispose(validator, disposer) {
        if (validator.disposing) { validator.disposers.splice(validator.disposers.indexOf(disposer), 1); }
      }

      var Validator = function Validator(ractive, debounce) {
        if ( debounce === void 0 ) debounce = 500;

        this.ractive = ractive;
        this.debounce = debounce;
        this.state = {};
        this.hooks = {};
        this.patternHooks = [];
        this.groupHooks = {};
        this.checks = [];
        this.fns = [];
        this.many = [];
        this.disposers = [];
      };

      Validator.prototype.reset = function reset () {
        this.disposing = true;
        this.disposers.slice().forEach(function (d) { return d.cancel(); });
        this.state = {};
        this.hooks = {};
        this.patternHooks = [];
        this.groupHooks = {};
        this.checks = [];
        this.fns = [];
        this.many = [];
        this.disposing = false;
      };

      Validator.prototype.check = function check (keys, deps, fn, opts) {
          var this$1 = this;

        var ks = Array.isArray(keys) ? keys.slice() : [keys];
        var all = ks.concat(Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []);
        if (typeof deps === 'function') {
          opts = fn;
          fn = deps;
          deps = [];
        }
        var set = [ks, deps, fn, opts && opts.group && (Array.isArray(opts.group) ? opts.group : [opts.group])];
        this.fns.push(set);
        var handle = this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
            var this$1 = this;

          checker.call(this, fn, ks, all.map(function (k) { return this$1.ractive.get(k); }));
        }, this), { init: opts && opts.init === false ? false : true });
        var disposer = {
          cancel: function () {
            dispose(this$1, disposer);
            this$1.fns.splice(this$1.fns.indexOf(set), 1);
            handle.cancel();
          }
        };
        this.disposers.push(disposer);
        return disposer;
      };

      Validator.prototype.checkList = function checkList (path, fn, opts) {
          var this$1 = this;

        var checks = {};
        var len = 0;
        var callback = function (v, o, k) {
          if (!Array.isArray(v)) { return; }
          if (v.length !== len) {
            if (len > v.length) {
              for (var i = v.length; i < len; i++) {
                if (checks[i]) {
                  checks[i].forEach(function (ref) {
                      var ks = ref[0];
                      var handle = ref[1];

                    handle.cancel();
                    ks.forEach(function (k) {
                      this$1.clear(k, true);
                      this$1.notify(k, true, true);
                    });
                    var idx = this$1.fns.findIndex(function (ref) {
                        var k = ref[0];

                        return k === ks;
                      });
                    this$1.fns.splice(idx, 1);
                  });
                  delete checks[i];
                }
              }
            } else {
              var loop = function ( i ) {
                var k$1 = path + "." + i;
                var chks = [];
                var o$1 = {
                  check: function (keys, deps, fn, opts) {
                    var ks = (Array.isArray(keys) ? keys.slice() : [keys]).map(function (s) { return s[0] === '.' ? k$1 + s : s; });
                    var all = ks.concat((Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []).map(function (s) { return s[0] === '.' ? k$1 + s : s; }));
                    if (typeof deps === 'function') {
                      opts = fn;
                      fn = deps;
                      deps = [];
                    }
                    chks.push([ks, this$1.ractive.observe(all.join(' '), debounce(this$1.debounce, function() {
                        var this$1 = this;

                      checker.call(this, fn, ks, all.map(function (k) { return this$1.ractive.get(k); }), k$1);
                    }, this$1), { init: opts && opts.init === false ? false : true })]);
                    this$1.fns.push([ks, deps, fn, opts && opts.group && (Array.isArray(opts.group) ? opts.group : [opts.group])]);
                    ks.prefix = k$1;
                  },
                  checkList: function (path, fn, opts) {
                    chks.push([[], this$1.checkList(path[0] === '.' ? k$1 + path : path, fn, opts)]);
                  },
                  checkDefer: function (path, fn, opts) {
                    chks.push([[], this$1.checkDefer(path[0] === '.' ? k$1 + path : path, fn, opts)]);
                  }
                };
                fn(k$1, o$1, i);
                checks[i] = chks;
              };

                for (var i$1 = len; i$1 < v.length; i$1++) loop( i$1 );
            }
            len = v.length;
          }
        };
        var observer = this.ractive.observe(path, debounceMany(this.debounce, callback, this, 2), { init: opts && opts.init === false ? false : true });
        var paths = path.split(/\s+/);
        var handle = [paths, function () {
          paths.forEach(function (path) {
            var arr = this$1.ractive.get(path);
            if (!Array.isArray(arr)) { return; }
            for (var i = 0; i < arr.length; i++) { callback(arr[i], undefined, (path + "." + i)); }
          });
        }];
        this.many.push(handle);
        var disposer = {
          cancel: function () {
            dispose(this$1, disposer);
            var cks = Object.keys(checks);
            cks.forEach(function (c) {
              cks[c].forEach(function (ref) {
                  var ks = ref[0];
                  var handle = ref[1];

                handle.cancel();
                var idx = this$1.fns.findIndex(function (ref) {
                    var k = ref[0];

                    return k === ks;
                  });
                this$1.fns.splice(idx, 1);
              });
            });
            var i = this$1.many.length;
            while (i--) { if (this$1.many[i][1] === callback) { this$1.many.splice(i, 1); } }
            observer.cancel();
          }
        };
        this.disposers.push(disposer);
        return disposer;
      };

      Validator.prototype.checkDefer = function checkDefer (path, fn, opts) {
          var this$1 = this;

        var checks = {};
        var callback = function (v, o, k, p) {
          if (v == null && checks[k]) {
            checks[k].forEach(function (ref) {
                var ks = ref[0];
                var handle = ref[1];

              handle.cancel();
              ks.forEach(function (k) {
                this$1.clear(k, true);
                this$1.notify(k, true, true);
              });
              var idx = this$1.fns.findIndex(function (ref) {
                  var k = ref[0];

                  return k === ks;
                });
              this$1.fns.splice(idx, 1);
            });
            delete checks[k];
          } else if (v != null && !checks[k]) {
            var chks = [];
            var o$1 = {
              check: function (keys, deps, fn, opts) {
                var ks = (Array.isArray(keys) ? keys.slice() : [keys]).map(function (s) { return s[0] === '.' ? k + s : s; });
                var all = ks.concat((Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []).map(function (s) { return s[0] === '.' ? k + s : s; }));
                if (typeof deps === 'function') {
                  opts = fn;
                  fn = deps;
                  deps = [];
                }
                chks.push([ks, this$1.ractive.observe(all.join(' '), debounce(this$1.debounce, function() {
                    var this$1 = this;

                  checker.call(this, fn, ks, all.map(function (k) { return this$1.ractive.get(k); }), k);
                }, this$1), { init: opts && opts.init === false ? false : true })]);
                this$1.fns.push([ks, deps, fn, opts && opts.group && (Array.isArray(opts.group) ? opts.group : [opts.group])]);
                ks.prefix = k;
              },
              checkList: function (path, fn, opts) {
                chks.push([[], this$1.checkList(path[0] === '.' ? k + path : path, fn, opts)]);
              },
              checkDefer: function (path, fn, opts) {
                chks.push([[], this$1.checkDefer(path[0] === '.' ? k + path : path, fn, opts)]);
              }
            };
            fn(k, o$1, p);
            checks[k] = chks;
          }
        };
        var observer = this.ractive.observe(path, debounceMany(this.debounce, callback, this, 2), { init: opts && opts.init === false ? false : true });
        var parent = path.split(/\s+/);
        var handle = [parent, function () {
          parent.forEach(function (path) {
            var obj = this$1.ractive.get(path);
            if (obj) { callback(obj, undefined, path); }
          });
        }];
        this.many.push(handle);
        var disposer = {
          cancel: function () {
            dispose(this$1, disposer);
            var cks = Object.keys(checks);
            cks.forEach(function (c) {
              cks[c].forEach(function (ref) {
                  var ks = ref[0];
                  var handle = ref[1];

                handle.cancel();
                var idx = this$1.fns.findIndex(function (ref) {
                    var k = ref[0];

                    return k === ks;
                  });
                this$1.fns.splice(idx, 1);
              });
            });
            var i = this$1.many.length;
            while (i--) { if (this$1.many[i][1] === callback) { this$1.many.splice(i, 1); } }
            observer.cancel();
          }
        };
        this.disposers.push(disposer);
        return disposer;
      };

      Validator.prototype.refresh = function refresh (path, recurse) {
          var this$1 = this;
          if ( recurse === void 0 ) recurse = true;

        var paths = Array.isArray(path) ? path : [path];

        paths.forEach(function (path) {
          if (path.test) {
            for (var i = 0; i < this$1.many.length; i++) {
              var ref = this$1.many[i];
                var kk = ref[0];
                var refresh = ref[1];
              kk.find(function (k) { return path.test(k); }) && refresh();
            }
          } else {
            for (var i$1 = 0; i$1 < this$1.many.length; i$1++) {
              var ref$1 = this$1.many[i$1];
                var ks = ref$1[0];
                var refresh$1 = ref$1[1];
              ks.includes(path) && refresh$1();
            }
          }
        });

        paths.forEach(function (path) {
          if (path.test) { this$1.fns.forEach(function (ref) {
              var ks = ref[0];
              var deps = ref[1];
              var fn = ref[2];

              return ks.find(function (k) { return path.test(k); }) && checker.call(this$1, fn, ks, ks.concat(deps).map(function (k) { return this$1.ractive.get(k); }), ks.prefix);
              }); }
          else { this$1.fns.forEach(function (ref) {
              var ks = ref[0];
              var deps = ref[1];
              var fn = ref[2];

              return ks.includes(path) && checker.call(this$1, fn, ks, ks.concat(deps).map(function (k) { return this$1.ractive.get(k); }), ks.prefix);
            }); }
        });
      };

      Validator.prototype.notify = function notify (key, up, recurse) {
          var this$1 = this;

        if (up) {
          var path = Ractive$1.splitKeypath(key);
          path.pop();
          while (path.length) {
            var p = Ractive$1.joinKeys.apply(Ractive$1, path);
            var hooks = this.hooks[p];
            if (hooks) {
              hooks.forEach(function (h) { return h(); });
            }
            path.pop();
          }
        }

        if (this.hooks[key]) { this.hooks[key].forEach(function (h) { return h(); }); }

        if (recurse) {
          var keys = Object.keys(this.hooks);
          var start = key + ".";
          keys.forEach(function (k) {
            if (k.startsWith(start)) { this$1.hooks[k].forEach(function (h) { return h(); }); }
          });
        }

        var pats = this.patternHooks;
        for (var i = 0; i < pats.length; i++) {
          if (pats[i][0].test(key)) { pats[i][1](); }
        }

        var groups = [];
        for (var i$1 = 0; i$1 < this.fns.length; i$1++) {
          var ref = this.fns[i$1];
            var ks = ref[0];
            var gs = ref[3];
          if (gs && Array.isArray(ks) && ks.includes(key)) {
            gs.forEach(function (g) { return !groups.includes(g) && groups.push(g); });
          }
        }
        for (var i$2 = 0; i$2 < groups.length; i$2++) {
          var hooks$1 = this.groupHooks[groups[i$2]] || [];
          hooks$1.forEach(function (h) { return h(); });
        }
      };

      Validator.prototype.clear = function clear (key, recurse) {
          var this$1 = this;

        delete this.state[key];
        if (recurse) {
          var keys = Object.keys(this.state);
          var start = key + ".";
          keys.forEach(function (k) {
            if (k.startsWith(start)) { delete this$1.state[k]; }
          });
        }
      };

      Validator.prototype.level = function level (key, recurse) {
          if ( recurse === void 0 ) recurse = true;

        if (key.group) { key = keysForGroup(this, key.group); }
        var keys = Array.isArray(key) ? key : [key];
        var level = 'none';

        for (var i = 0; i < keys.length; i++) {
          var key$1 = keys[i];

          if (typeof key$1 === 'string') {
            var msgs = this.state[key$1] || [];
            for (var j = 0; j < msgs.length; j++) {
              var t = msgs[j][0];
              if (t === 'error') { return 'error'; }
              else if (t === 'warn') { level = 'warn'; }
              else if (t === 'info' && level !== 'warn') { level = 'warn'; }
            }
          }

          if (recurse || key$1.test) {
            var state = this.state;
            var ks = Object.keys(state);
            var start = key$1 + ".";

            for (var j$1 = 0; j$1 < ks.length; j$1++) {
              var k = ks[j$1];
              if (key$1.test ? key$1.test(k) : k.startsWith(start)) {
                var msgs$1 = state[k];
                for (var c = 0; c < msgs$1.length; c++) {
                  var t$1 = msgs$1[c][0];
                  if (t$1 === 'error') { return 'error'; }
                  else if (t$1 === 'warn') { level = 'warn'; }
                  else if (t$1 === 'info' && level !== 'warn') { level = 'info'; }
                }
              }
            }
          }
        }

        return level;
      };

      Validator.prototype.messages = function messages (key, recurse) {
          var this$1 = this;

        if (key.group) { key = keysForGroup(this, key.group); }
        var keys = Array.isArray(key) ? key : [key];
        var res = [];
        keys.forEach(function (key) {
          if (typeof key === 'string') {
            var msgs = this$1.state[key] || [];
            res.push.apply(res, msgs);
          }

          if (recurse || key.test) {
            var state = this$1.state;
            var keys = Object.keys(state);

            var start = key + ".";
            keys.forEach(function (k) {
              if (key.test ? key.test(k) : k.startsWith(start)) { res.push.apply(res, state[k]); }
            });
          }
        });

        return res;
      };

      Validator.prototype.hook = function hook (keys, fn) {
          var this$1 = this;

        if (keys.group) {
          var gs = Array.isArray(keys.group) ? keys.group : [keys.group];
          gs.forEach(function (g) { return (this$1.groupHooks[g] || (this$1.groupHooks[g] = [])).push(fn); });
        } else {
          var ks = Array.isArray(keys) ? keys : [keys];
          ks.forEach(function (key) {
            if (typeof key === 'string') { (this$1.hooks[key] || (this$1.hooks[key] = [])).push(fn); }
            else if (key.test) { this$1.patternHooks.push([key, fn]); }
          });
        }

        var disposer = {
          cancel: function () { return this$1.unhook(keys, fn, disposer); }
        };
        this.disposers.push(disposer);
        return disposer;
      };

      Validator.prototype.unhook = function unhook (keys, fn, disposer) {
          var this$1 = this;

        if (disposer) { dispose(this, disposer); }
        if (keys.group) {
          var gs = Array.isArray(keys.group) ? keys.group : [keys.group];
          gs.forEach(function (key) {
            var arr = this$1.groupHooks[key] || [];
            var idx = arr.indexOf(fn);
            arr.splice(idx, 1);
          });
        } else {
          var ks = Array.isArray(keys) ? keys : [keys];
          ks.forEach(function (key) {
            if (typeof key === 'string') {
              var arr = this$1.hooks[key] || [];
              var idx = arr.indexOf(fn);
              arr.splice(idx, 1);
            } else if (key.test) {
              var idx$1 = this$1.patternHooks.findIndex(function (h) { return h[0] === key && h[1] === fn; });
              this$1.patternHooks.splice(idx$1, 1);
            }
          });
        }
      };

      Validator.prototype.decorator = function decorator (opts) {
          if ( opts === void 0 ) opts = {};

        var v = this;
        return function(node) {
            var keys = [], len = arguments.length - 1;
            while ( len-- > 0 ) keys[ len ] = arguments[ len + 1 ];

          var ctx = this.getLocalContext();
          var root = ctx.resolve();

          var ks;
          var keyList;
          function setKeys(keys) {
            var list = keys.join(',');
            if (keyList === list) { return false; }
            keyList = list;
            if (opts.regex) { ks = keys.map(function (k) { return typeof k === 'string' ? new RegExp(k) : k; }); }
            else if (opts.group) { ks = { group: keys }; }
            else { ks = keys.map(function (k) { return ctx.resolve(k); }); }
            return true;
          }
          setKeys(keys);

          var levels = opts.levels || Validator.defaults.levels;
          var position = node.style.position;
          var indicator;
          if (opts.indicator && !position) { node.style.position = 'relative'; }
          if (opts.indicator) {
            register();
            indicator = document.createElement('span');
            indicator.setAttribute('class', 'valid-indicator');
            node.appendChild(indicator);
          }
          var tab;
          if (opts.tab && !opts.regex) {
            var n = node.querySelector('input,select,textarea');
            if (n) {
              var fn;
              fn = function (ev) {
                n.removeEventListener('blur', fn);
                n.removeEventListener('input', fn);
                tab = null;
                if (ev.type === 'blur') {
                  v.refresh(ks);
                  hook();
                }
              };
              tab = [n, fn];
              n.addEventListener('blur', fn);
              n.addEventListener('input', fn);
            }
          }

          function hook() {
            if (tab) { return; }
            var level = v.level(ks, true);
            syncClass(node, levels, levels[levelMap[level]]);
            if (opts.indicator) {
              if (level !== 'none') { indicator.setAttribute('title', messageGroupString(groupMessages(v.messages(ks, true)))); }
              else { indicator.setAttribute('title', ''); }
            }
          }

          v.hook(ks, hook);

          if (!opts.tab && !opts.regex) { setTimeout(hook, v.debounce || 500); }

          var res = {
            update: function update() {
                var keys = [], len = arguments.length;
                while ( len-- ) keys[ len ] = arguments[ len ];

              var old = ks;
              if (setKeys(keys)) {
                v.unhook(old, hook);
                v.hook(ks, hook);
                hook();
              }
            },
            teardown: function teardown() {
              v.unhook(ks, hook);
              syncClass(node, levels);
              node.style.position = position;
              if (indicator) { indicator.remove(); }
              if (tab) { tab[0].removeEventListener('blur', tab[1]); }
            },
          };

          if (opts.regex) {
            res.update = function update() {
                var keys = [], len = arguments.length;
                while ( len-- ) keys[ len ] = arguments[ len ];

              var next = ctx.resolve();
              v.unhook(ks, hook);
              ks = opts.regex ? keys.map(function (k) { return typeof k === 'string' ? new RegExp(k) : k; }) : keys.map(function (k) { return ctx.resolve(k); });
              v.hook(ks, hook);
              root = next;
              hook();
            };
          } else if (!opts.group) {
            res.shuffled = function shuffled() {
              var next = ctx.resolve();
              if (next !== root) {
                v.unhook(ks, hook);
                ks = opts.regex ? keys.map(function (k) { return typeof k === 'string' ? new RegExp(k) : k; }) : keys.map(function (k) { return ctx.resolve(k); });
                v.hook(ks, hook);
                root = next;
                hook();
              }
            };
          }

          return res;
        }
      };

      Validator.defaults = {
        levels: ['', 'info', 'warn', 'error']
      };

      function checker(fn, keys, values, prefix) {
        var this$1 = this;

        var changed = false;

        var checks = this.checks.find(function (c) { return c.keys === keys; });
        if (!checks) {
          checks = { keys: keys, messages: [] };
          this.checks.push(checks);
        }
        // run the check
        var res = fn.apply(this.ractive, values) || [];
        if (prefix) {
          for (var i = 0; i < res.length; i++) {
            if (!res[i][2]) { continue; }
            var ks = Array.isArray(res[i][2]) ? res[i][2] : [res[i][2]];
            res[i][2] = ks.map(function (k) { return k[0] === '.' ? prefix + k : k; });
          }
        }

        // remove the missing messages from state
        for (var i$1 = 0; i$1 < checks.messages.length; i$1++) {
          var ref = checks.messages[i$1];
          var t = ref[0];
          var m = ref[1];
          var k = ref[2];
          var go = true;
          for (var j = 0; j < res.length; j++) {
            var ref$1 = res[j];
            var type = ref$1[0];
            var msg = ref$1[1];
            var key = ref$1[2];
            if (t === type && m === msg && keysStr(k) === keysStr(key)) {
              go = false;
              break;
            }
          }
          if (!go) { continue; }
          changed = true;
          var ks$1 = k ? Array.isArray(k) ? k : [k] : keys;
          for (var j$1 = 0; j$1 < ks$1.length; j$1++) {
            var key$1 = ks$1[j$1];
            var state = this.state[key$1] || [];
            for (var i$2 = 0; i$2 < state.length; i$2++) {
              if (state[i$2][0] === t && state[i$2][1] === m) {
                state.splice(i$2, 1);
                break;
              }
            }
          }
        }

        // add the new messages to state
        for (var i$3 = 0; i$3 < res.length; i$3++) {
          var ref$2 = res[i$3];
          var t$1 = ref$2[0];
          var m$1 = ref$2[1];
          var k$1 = ref$2[2];
          var go$1 = true;
          for (var j$2 = 0; j$2 < checks.messages.length; j$2++) {
            var ref$3 = checks.messages[j$2];
            var type$1 = ref$3[0];
            var msg$1 = ref$3[1];
            var key$2 = ref$3[2];
            if (t$1 === type$1 && m$1 === msg$1 && keysStr(k$1) === keysStr(key$2)) {
              go$1 = false;
              break;
            }
          }
          if (!go$1) { continue; }
          changed = true;
          var ks$2 = k$1 ? Array.isArray(k$1) ? k$1 : [k$1] : keys;
          for (var j$3 = 0; j$3 < ks$2.length; j$3++) {
            var key$3 = ks$2[j$3];
            (this.state[key$3] || (this.state[key$3] = [])).push([t$1, m$1]);
          }
        }

        checks.messages = res;

        // notify the hooks that stuff changed
        if (changed) {
          keys.forEach(function (key) { return this$1.notify(key, true); });
        }
      }

      function debounce(time, fn, context) {
        var tm;
        return function() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          if (tm) { return; }
          else {
            tm = setTimeout(function() {
              fn.apply(context, args);
              tm = null;
            }, time);
          }
        }
      }

      function debounceMany(time, fn, context, which) {
        var tms = {};
        return function() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          if (tms[args[which]]) { return; }
          else {
            tms[args[which]] = setTimeout(function() {
              fn.apply(context, args);
              tms[args[which]] = null;
            }, time);
          }
        }
      }

      var levelMap = {
        none: 0,
        info: 1,
        warn: 2,
        error: 3
      };

      function syncClass(node, list, cls) {
        var cl = node.classList;
        list.forEach(function (c) {
          if (c && cls !== c && cl.contains(c)) { cl.remove(c); }
        });
        if (cls && !cl.contains(cls)) { cl.add(cls); }
      }

      function keysStr(keys) {
        if (typeof keys === 'string') { return keys; }
        if (Array.isArray(keys)) { return keys.join(','); }
      }

      function keysForGroup(validator, group) {
        var grps = Array.isArray(group) ? group : [group];
        var res = [];
        for (var i = 0; i < grps.length; i++) {
          var fns = validator.fns;
          for (var j = 0; j < fns.length; j++) {
            var ks = fns[j][0];
            if (Array.isArray(ks) && fns[j][3] && fns[j][3].includes(grps[i])) {
              for (var c = 0; c < ks.length; c++) {
                if (!res.includes(ks[c])) { res.push(ks[c]); }
              }
            }
          }
        }
        return res;
      }

      function groupMessages(messages) {
        var res = [];
        var cur = messages.filter(function (m) { return m[0] === 'error'; });
        if (cur.length) { res.push(['Errors', cur.map(function (m) { return m[1]; })]); }
        cur = messages.filter(function (m) { return m[0] === 'warn'; });
        if (cur.length) { res.push(['Warnings', cur.map(function (m) { return m[1]; })]); }
        cur = messages.filter(function (m) { return m[0] === 'info' || m[0] === 'none'; });
        if (cur.length) { res.push(['Info', cur.map(function (m) { return m[1]; })]); }
        return res;
      }

      function messageGroupString(groups) {
        if (groups.length === 1) { return groups[0][1].join('\n'); }
        return groups.map(function (g) { return ((g[0]) + ":\n" + (g[1].join('\n'))); }).join('\n\n');
      }

      var registered = false;
      function register() {
        if (!registered) {
          Ractive$1.addCSS('validation-decorator', "\n      span.valid-indicator {\n        display: none;\n        position: absolute;\n        top: 0.25em;\n        right: 0.5em;\n        width: 1em;\n        height: 1em;\n        border-radius: 1em;\n        z-index: 19;\n      }\n      span.valid-indicator:after {\n        color: #fff;\n        width: 100%;\n        display: block;\n        font-weight: bold;\n        text-align: center;\n        line-height: 1.1em;\n        font-size: 1.1em;\n      }\n      .none > span.valid-indicator {\n        display: flex;\n        background-color: #16ab39;\n      }\n      .error > span.valid-indicator {\n        display: flex;\n        background-color: #ca3c3c;\n      }\n      .warn > span.valid-indicator {\n        display: flex;\n        background-color: #f79e0b;\n      }\n      .info > span.valid-indicator {\n        display: flex;\n        background-color: #1f5b93;\n      }\n    ");
          registered = true;
        }
      }

      var probably = 'should probably';
      function required(name, level) {
      if ( level === void 0 ) level = 'error';
       return function (v) { if (!v) { return [[level, (name + " " + (level !== 'error' ? 'should probably be provided' : 'is required'))]]; } } }
      function between(name, lower, upper, level) {
      if ( level === void 0 ) level = 'error';
       return function (v) { if (v < lower || v > upper) { return [[level, (name + " " + (level !== 'error' ? probably : 'must') + " be between " + lower + " and " + upper)]]; } }; }

      var Validate_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The Raui `Validate` helper is a rule-based validator that supports three levels of messages across any keypaths observed by the rules. It also includes a decorator that can be used to provide feedback on various raui (and possibly other) widgets, like form elements and tabs.\n    \n    A validator employs Ractive observers to watch keypaths in a few different ways that can include wildcards. The validator also provides an event system to provide notifications based on a path that may also be specified as a regular expression, so you can collect messages for a particular chunk of data to know its validity state.\n\n    As the observers are fired, the matching rules are applied, and any decorators that are registered with the validator are notified. A decorator will show the highest level, so error, then warn, then info. All messages are collected into a title for any particular decorator. The decorators can be scoped to a single keypath, a list of keypaths, a keypath regex, or a named group.\n\n    Validations can be scoped to a single keypath or a list of keypaths, both of which may include wildcards. There is a helper to apply validations to arrays (lists) within the data, which will create a validation scope at the keypath of the given keypath and apply the scope for each item in the list. There is also a helper that allows deferred validator creation using a scope similar to the list helper. The deferred validation scope is applied once the target value exists.\n\n    Validations produce messages, which are simply tuples of levels and messages. Any particular keypath can have any number of messages at any level associated with it. Individual validations may overlap, as the validator only allows a validation to affect messages that it has set.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Class\n\n    The validator class constructor takes a ractive instance and an optional debounce interval that defaults to 500ms. The typescript definitions included in the source are a more thorough reference for the validation API, but there is a lighter overview included here.\n\n    #### Types\n\n    * `MessageLevel = 'error'|'warn'|'info'`\n    * `CheckOptions { group?: string|string[]; init?: boolean }`\n    * `ValidatorFN = (...values: any[]) => ValidationResult`\n    * `ValidationResult = Array<[MessageLevel, string]|[MessageLevel, string, string|string[]]>`\n    * `CheckHelper { check(...); checkList(...); checkDefer(...) }`\n    * `CheckScope = (path: string, check: CheckHelper, key: index|string) => void`\n    * `Path = string|string[]` - any of which may include wildcards\n    * `Group { name: string|string[] }`\n\n    #### Methods\n\n    * `check(keys: Path, deps?: string|string[], callback: (...values: any) => ValidationResult, options?: CheckOptions)` - install a validator for the given key(s)\n    * `checkList(path: string, scope: CheckScope, opts?: CheckOptions)` - install validators for a list, where each item is run through the scope individually\n    * `checkDefer(path: string, scope: CheckScope, opts?: CheckOptions)` - install validators for an object once it is defined, which is when the scope is run\n    * `refresh(path: Path|RegExp, recurse?: boolean = true)` - re-validate the matching paths\n    * `clear(path: string|RegExp, recurse?: boolean = false)` - remove validations for the matching paths\n    * `level(path: Path|RegExp|Group, recurse?: boolean = true): MessageLevel` - get the message level for the matching paths\n    * `messages(path: Path|RegExp|Group, recurse?: boolean): ValidationResult` - get the messages for the matching paths\n    * `hook(path: Path|RegExp|Group, hook: () => void): { cancel(): void }` - register a hook to fire when the matching paths change valid state\n    * `unhook(path: Path|RegExp|Group, hook: () => void)` - unregistered a hook\n    * `decorator(opts): Decorator` - create a ractive decorator that can display a validation status\n\n    #### Decorator Options\n\n    * `indicator: boolean` - should this decorator create an indicator element\n    * `tab: boolean` - should this decorator refresh when any children of the decorated element blur\n    * `regex: boolean` - should any paths passed to this decorator be turned in to regexes\n    * `levels: [string, string, string, string]` - the class names for each level in order none, info, warn, and error.\n    * `group: boolean` - whether any paths passed to this decorator should be turned into group names\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n        Current level for all paths: {{level}}.\n        <tabs pad>\n          <tab>\n            <title style-padding-right=\"2em\" as-validg=`tab1`>Tab 1</title>\n            <div>\n              <label as-field as-valid=`name`>Name<input value=\"{{name}}\" /></label>\n            </div>\n          </tab>\n          <tab>\n            <title style-padding-right=\"2em\" as-validg=`tab2`>Tab 2</title>\n            <div>\n              <button on-click=\"@.push('things', {})\">Add Thing</button>\n              {{#each things}}\n                <div>\n                  <label as-field as-valid=`.name`>Name<input value=\"{{.name}}\" /></label>\n                  <label as-field as-valid=`.age`>Age<input type=nubmer value=\"{{.age}}\" /></label>\n                  <label as-field><button on-click=\"@.splice('things', @index, 1)\">&times;</button></label>\n                </div>\n              {{/each}}\n            </div>\n          </tab>\n        </tabs>\n      ```\n\n      ```js\n        // in the init event for the ractive instance\n        const validator = new Validator(this);\n        validator.check('name', required('Name'), { group: 'tab1' });\n        validator.check('name', (v) => /dave/i.test(v) ? [['error', 'Dave\\'s not here, man.']] : [], { group: 'tab1' });\n        validator.check('things.length', between('Number of things', 1, 10, 'warn'), { group: 'tab2' });\n        validator.checkList('things', (path, v) => {\n          v.check('.name', required('Name'), { group: 'tab2' });\n          v.check('.age', between('Age', 9, 99), { group: 'tab2' });\n        });\n        this.decorators.valid = validator.decorator({ indicator: true });\n        this.decorators.validg = validator.decorator({ indicator: true, group: true });\n        validator.hook(/.*/, () => this.set('level', validator.level(/.*/)));\n      ```\n      ### Result:\n    "]}," Current level for all paths: ",{t:2,r:"level"},". ",{t:7,e:"tabs",m:[{n:"pad",f:0,t:13}],f:[{t:7,e:"tab",f:[{t:7,e:"title",m:[{t:13,n:"style",f:"padding-right: 2em;",g:1},{n:"validg",t:71,f:{r:[],s:"[\"tab1\"]"}}],f:["Tab 1"]}," ",{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71},{n:"valid",t:71,f:{r:[],s:"[\"name\"]"}}],f:["Name",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"name"}],t:13}]}]}]}]}," ",{t:7,e:"tab",f:[{t:7,e:"title",m:[{t:13,n:"style",f:"padding-right: 2em;",g:1},{n:"validg",t:71,f:{r:[],s:"[\"tab2\"]"}}],f:["Tab 2"]}," ",{t:7,e:"div",f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.push(\"things\",{})]"}}],f:["Add Thing"]}," ",{t:4,f:[{t:7,e:"div",f:[{t:7,e:"label",m:[{n:"field",t:71},{n:"valid",t:71,f:{r:[],s:"[\".name\"]"}}],f:["Name",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".name"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71},{n:"valid",t:71,f:{r:[],s:"[\".age\"]"}}],f:["Age",{t:7,e:"input",m:[{n:"type",f:"nubmer",t:13},{n:"value",f:[{t:2,r:".age"}],t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0.splice(\"things\",_1,1)]"}}],f:["×"]}]}]}],n:52,r:"things"}]}]}]}]}]}],e:{"[\"tab1\"]":function (){return(["tab1"]);},"[\"name\"]":function (){return(["name"]);},"[\"tab2\"]":function (){return(["tab2"]);},"[_0.push(\"things\",{})]":function (_0){return([_0.push("things",{})]);},"[\".name\"]":function (){return([".name"]);},"[\".age\"]":function (){return([".age"]);},"[_0.splice(\"things\",_1,1)]":function (_0,_1){return([_0.splice("things",_1,1)]);}}},
        options: {
          title: 'Helpers :: Validate',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        use: [tabs()],
        data: function data() {
          return { things: [] };
        },
        on: {
          init: function init() {
            var this$1 = this;

            var validator = new Validator(this);
            validator.check('name', required('Name'), { group: 'tab1' });
            validator.check('name', function (v) { return /dave/i.test(v) ? [['error', 'Dave\'s not here, man.']] : []; }, { group: 'tab1' });
            validator.check('things.length', between('Number of things', 1, 10, 'warn'), { group: 'tab2' });
            validator.checkList('things', function (path, v) {
              v.check('.name', required('Name'), { group: 'tab2' });
              v.check('.age', between('Age', 9, 99), { group: 'tab2' });
            });
            this.decorators.valid = validator.decorator({ indicator: true });
            this.decorators.validg = validator.decorator({ indicator: true, group: true });
            validator.hook(/.*/, function () { return this$1.set('level', validator.level(/.*/)); });
          }
        }
      }));

    }
  };
});
