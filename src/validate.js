import Ractive from 'ractive';

// TODO: allow relative keys to be used in wild and list with a . prefix

export class Validator {
  constructor(ractive, debounce = 500) {
    this.ractive = ractive;
    this.debounce = debounce;
    this.state = {};
    this.hooks = {};
    this.patternHooks = [];
    this.checks = [];
    this.fns = [];
  }

  check(keys, deps, fn) {
    const ks = Array.isArray(keys) ? keys.slice() : [keys];
    const all = ks.concat(Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []);
    if (typeof deps === 'function') {
      fn = deps;
      deps = [];
    }
    const set = [ks, deps, fn];
    this.fns.push(set);
    const handle = this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
      checker.call(this, fn, ks, all.map(k => this.ractive.get(k)));
    }, this), { init: false });
    return {
      cancel() {
        this.fns.splice(this.fns.indexOf(set), 1);
        handle.cancel();
      }
    };
  }

  checkList(path, fn) {
    const checks = {};
    let len = 0;
    const handle = this.ractive.observe(path, debounce(this.debounce, (v, o, k) => {
      if (!Array.isArray(v)) return;
      if (v.length !== len) {
        if (len > v.length) {
          for (let i = v.length; i < len; i++) {
            if (checks[i]) {
              checks[i].forEach(([ks, handle]) => {
                handle.cancel();
                ks.forEach(k => {
                  this.clear(k, true);
                  this.notify(k, true, true);
                });
                const idx = this.fns.findIndex(([k]) => k === ks);
                this.fns.splice(idx, 1);
              });
              delete checks[i];
            }
          }
        } else {
          for (let i = len; i < v.length; i++) {
            const k = `${path}.${i}`;
            const chks = [];
            const o = {
              check: (keys, deps, fn) => {
                const ks = (Array.isArray(keys) ? keys.slice() : [keys]).map(s => s[0] === '.' ? k + s : s);
                const all = ks.concat((Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []).map(s => s[0] === '.' ? k + s : s));
                if (typeof deps === 'function') {
                  fn = deps;
                  deps = [];
                }
                chks.push([ks, this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
                  checker.call(this, fn, ks, all.map(k => this.ractive.get(k)), k);
                }, this), { init: false })]);
                this.fns.push([ks, deps, fn]);
              },
              checkList: (path, fn) => {
                chks.push([[], this.checkList(path[0] === '.' ? k + path : path, fn)]);
              },
              checkWild: (path, fn) => {
                chks.push([[], this.checkWild(path[0] === '.' ? k + path : path, fn)]);
              }
            };
            fn(k, o, i);
            checks[i] = chks;
          }
        }
        len = v.length;
      }
    }));
    return {
      cancel() {
        const cks = Object.keys(checks);
        cks.forEach(c => {
          cks[c].forEach(([ks, handle]) => {
            handle.cancel();
            const idx = this.fns.findIndex(([k]) => k === ks);
            this.fns.splice(idx, 1);
          });
        });
        handle.cancel();
      }
    };
  }

  checkWild(path, fn) {
    const checks = {};
    const handle = this.ractive.observe(path, debounce(this.debounce, (v, o, k, p) => {
      if (v == null && checks[k]) {
        checks[k].forEach(([ks, handle]) => {
          handle.cancel();
          ks.forEach(k => {
            this.clear(k, true);
            this.notify(k, true, true);
          });
          const idx = this.fns.findIndex(([k]) => k === ks);
          this.fns.splice(idx, 1);
        });
        delete checks[k];
      } else if (v != null && !checks[k]) {
        const chks = [];
        const o = {
          check: (keys, deps, fn) => {
            const ks = (Array.isArray(keys) ? keys.slice() : [keys]).map(s => s[0] === '.' ? k + s : s);
            const all = ks.concat((Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []).map(s => s[0] === '.' ? k + s : s));
            if (typeof deps === 'function') {
              fn = deps;
              deps = [];
            }
            chks.push([ks, this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
              checker.call(this, fn, ks, all.map(k => this.ractive.get(k)), k);
            }, this), { init: false })]);
          },
          checkList: (path, fn) => {
            chks.push([[], this.checkList(path[0] === '.' ? k + path : path, fn)]);
          },
          checkWild: (path, fn) => {
            chks.push([[], this.checkWild(path[0] === '.' ? k + path : path, fn)]);
          }
        };
        fn(k, o, p);
        checks[k] = chks;
      }
    }));
    return {
      cancel() {
        const cks = Object.keys(checks);
        cks.forEach(c => {
          cks[c].forEach(([ks, handle]) => {
            handle.cancel();
            const idx = this.fns.findIndex(([k]) => k === ks);
            this.fns.splice(idx, 1);
          });
        });
        handle.cancel();
      }
    };
  }

  refresh(path, recurse = true) {
    const paths = Array.isArray(path) ? path : [path];
    const checks = [];

    paths.forEach(path => {
      this.fns.forEach(([ks, deps, fn]) => {
        if (ks.includes(path)) checker.call(this, fn, ks, ks.concat(deps).map(k => this.ractive.get(k)));
      });
    });
  }

  notify(key, up, recurse) {
    if (up) {
      const path = Ractive.splitKeypath(key);
      path.pop();
      while (path.length) {
        const p = Ractive.joinKeys(...path);
        const hooks = this.hooks[p];
        if (hooks) {
          hooks.forEach(h => h());
        }
        path.pop();
      }
    }

    if (this.hooks[key]) this.hooks[key].forEach(h => h());

    if (recurse) {
      const keys = Object.keys(this.hooks);
      const start = `${key}.`;
      keys.forEach(k => {
        if (k.startsWith(start)) this.hooks[k].forEach(h => h());
      });
    }

    const pats = this.patternHooks;
    for (let i = 0; i < pats.length; i++) {
      if (pats[i][0].test(key)) pats[i][1]();
    }
  }

  clear(key, recurse) {
    delete this.state[key];
    if (recurse) {
      const keys = Object.keys(this.state);
      const start = `${key}.`
      keys.forEach(k => {
        if (k.startsWith(start)) delete this.state[k];
      });
    }
  }

  level(key, recurse = true) {
    const keys = Array.isArray(key) ? key : [key];
    let level = 'none';

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (typeof key === 'string') {
        const msgs = this.state[key] || [];
        for (let j = 0; j < msgs.length; j++) {
          const t = msgs[j][0];
          if (t === 'error') return 'error';
          else if (t === 'warn') level = 'warn';
          else if (t === 'info' && level !== 'warn') level = 'warn';
        }
      }

      if (recurse || key.test) {
        const state = this.state;
        const ks = Object.keys(state);
        const start = `${key}.`;

        for (let j = 0; j < ks.length; j++) {
          const k = ks[j];
          if (key.test ? key.test(k) : k.startsWith(start)) {
            const msgs = state[k];
            for (let c = 0; c < msgs.length; c++) {
              const t = msgs[c][0];
              if (t === 'error') return 'error';
              else if (t === 'warn') level = 'warn';
              else if (t === 'info' && level !== 'warn') level = 'info';
            }
          }
        }
      }
    }

    return level;
  }

  messages(key, recurse) {
    const keys = Array.isArray(key) ? key : [key];
    const res = [];
    keys.forEach(key => {
      if (typeof key === 'string') {
        const msgs = this.state[key] || [];
        res.push.apply(res, msgs);
      }

      if (recurse || key.test) {
        const state = this.state;
        const keys = Object.keys(state);

        const start = `${key}.`;
        keys.forEach(k => {
          if (key.test ? key.test(k) : k.startsWith(start)) res.push.apply(res, state[k]);
        });
      }
    });

    return res;
  }

  hook(key, fn) {
    if (typeof key === 'string') (this.hooks[key] || (this.hooks[key] = [])).push(fn);
    else if (key.test) this.patternHooks.push([key, fn]);
  }

  unhook(key, fn) {
    if (typeof key === 'string') {
      const arr = this.hooks[key] || [];
      const idx = arr.indexOf(fn);
      arr.splice(idx, 1);
    } else if (key.test) {
      const idx = this.patternHooks.findIndex(h => h[0] === key && h[1] === fn);
      this.patternHooks.splice(idx, 1);
    }
  }

  decorator(opts = {}) {
    const v = this;
    return function(node, ...keys) {
      const ctx = this.getLocalContext();
      let root = ctx.resolve();
      let ks = opts.regex ? keys.map(k => typeof k === 'string' ? new RegExp(k) : k) : keys.map(k => ctx.resolve(k));
      const levels = opts.levels || Validator.defaults.levels;
      const position = node.style.position;
      let indicator;
      if (opts.indicator && !position) node.style.position = 'relative';
      if (opts.indicator) {
        register();
        indicator = document.createElement('span');
        indicator.setAttribute('class', 'valid-indicator');
        node.appendChild(indicator);
      }
      let tab;
      if (opts.tab && !opts.regex) {
        const n = node.querySelector('input,select,textarea');
        if (n) {
          let fn;
          fn = () => {
            v.refresh(ks);
            n.removeEventListener('blur', fn);
            tab = null;
          };
          tab = [n, fn];
          n.addEventListener('blur', fn);
        }
      }

      function hook() {
        const level = v.level(ks, true);
        syncClass(node, levels, levels[levelMap[level]]);
        if (opts.indicator) {
          if (level !== 'none') indicator.setAttribute('title', v.messages(ks, true).map(m => m[1]).sort().join('\n'));
          else indicator.setAttribute('title', '');
        }
      }

      ks.forEach(k => v.hook(k, hook));

      const res = {
        teardown() {
          ks.forEach(k => v.unhook(k, hook));
          syncClass(node, levels);
          node.style.position = position;
          if (indicator) indicator.remove();
          if (tab) tab[0].removeEventListener('blur', tab[1]);
        },
      }

      if (opts.regex) {
        res.update = function update(...keys) {
          const next = ctx.resolve();
          ks.forEach(k => v.unhook(k, hook));
          ks = opts.regex ? keys.map(k => typeof k === 'string' ? new RegExp(k) : k) : keys.map(k => ctx.resolve(k));
          ks.forEach(k => v.hook(k, hook));
          root = next;
          hook();
        }
      } else {
        res.shuffled = function shuffled() {
          const next = ctx.resolve();
          if (next !== root) {
            ks.forEach(k => v.unhook(k, hook));
            ks = opts.regex ? keys.map(k => typeof k === 'string' ? new RegExp(k) : k) : keys.map(k => ctx.resolve(k));
            ks.forEach(k => v.hook(k, hook));
            root = next;
            hook();
          }
        }
      }

      return res;
    }
  }
}

Validator.defaults = {
  levels: ['', 'info', 'warn', 'error']
};

function checker(fn, keys, values, prefix) {
  let changed = false;

  let checks = this.checks.find(c => c.keys === keys);
  if (!checks) {
    checks = { keys, messages: [] };
    this.checks.push(checks);
  }
  // run the check
  const res = fn.apply(this.ractive, values) || [];
  if (prefix) {
    for (let i = 0; i < res.length; i++) {
      if (!res[i][2]) continue;
      const ks = Array.isArray(res[i][2]) ? res[i][2] : [res[i][2]];
      res[i][2] = ks.map(k => k[0] === '.' ? prefix + k : k);
    }
  }

  // remove the missing messages from state
  for (let i = 0; i < checks.messages.length; i++) {
    const [t, m, k] = checks.messages[i];
    let go = true;
    for (let j = 0; j < res.length; j++) {
      const [type, msg, key] = res[j];
      if (t === type && m === msg && keysStr(k) === keysStr(key)) {
        go = false;
        break;
      }
    }
    if (!go) continue;
    changed = true;
    const ks = k ? Array.isArray(k) ? k : [k] : keys;
    for (let j = 0; j < ks.length; j++) {
      const key = ks[j];
      const state = this.state[key] || [];
      for (let i = 0; i < state.length; i++) {
        if (state[i][0] === t && state[i][1] === m) {
          state.splice(i, 1);
          break;
        }
      }
    }
  }

  // add the new messages to state
  for (let i = 0; i < res.length; i++) {
    const [t, m, k] = res[i];
    let go = true;
    for (let j = 0; j < checks.messages.length; j++) {
      const [type, msg, key] = checks.messages[j];
      if (t === type && m === msg && keysStr(k) === keysStr(key)) {
        go = false;
        break;
      }
    }
    if (!go) continue;
    changed = true;
    const ks = k ? Array.isArray(k) ? k : [k] : keys;
    for (let j = 0; j < ks.length; j++) {
      const key = ks[j];
      (this.state[key] || (this.state[key] = [])).push([t, m]);
    }
  }

  checks.messages = res;

  // notify the hooks that stuff changed
  if (changed) {
    keys.forEach(key => this.notify(key, true));
  }
}

function debounce(time, fn, context) {
  let tm;
  return function(...args) {
    if (tm) return;
    else {
      tm = setTimeout(function() {
        fn.apply(context, args);
        tm = null;
      }, time);
    }
  }
}

const levelMap = {
  none: 0,
  info: 1,
  warn: 2,
  error: 3
};

function syncClass(node, list, cls) {
  const cl = node.classList;
  list.forEach(c => {
    if (c && cls !== c && cl.contains(c)) cl.remove(c);
  });
  if (cls && !cl.contains(cls)) cl.add(cls);
}

function keysStr(keys) {
  if (typeof keys === 'string') return keys;
  if (Array.isArray(keys)) return keys.join(',');
}

let registered = false;
function register() {
  if (!registered) {
    Ractive.addCSS('validation-decorator', `
      span.valid-indicator {
        display: none;
        position: absolute;
        top: 0.25em;
        right: 0.5em;
        width: 1em;
        height: 1em;
        border-radius: 1em;
        z-index: 19;
      }
      span.valid-indicator:after {
        color: #fff;
        width: 100%;
        display: block;
        font-weight: bold;
        text-align: center;
        line-height: 1.1em;
        font-size: 1.1em;
      }
      .none > span.valid-indicator {
        display: flex;
        background-color: #16ab39;
      }
      .error > span.valid-indicator {
        display: flex;
        background-color: #ca3c3c;
      }
      .warn > span.valid-indicator {
        display: flex;
        background-color: #f79e0b;
      }
      .info > span.valid-indicator {
        display: flex;
        background-color: #1f5b93;
      }
    `);
    registered = true;
  }
}

export function required(name) { return v => { if (!v) return [['error', `${name} is required`]]; } }
export function lt(name, num) { return v => { if (v >= num) return [['error', `${name} must be at most ${num - 1}`]]; }; }
export function lte(name, num) { return v => { if (v > num) return [['error', `${name} must be at most ${num}`]]; }; }
export function gt(name, num) { return v => { if (v <= num) return [['error', `${name} must be at least ${num + 1}`]]; }; }
export function gte(name, num) { return v => { if (v <= num) return [['error', `${name} must be at least ${num}`]]; }; }
export function between(name, lower, upper) { return v => { if (v < lower || v > upper) return [['error', `${name} must be between ${lower} and ${upper}`]]; }; }

