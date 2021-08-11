import Ractive from 'ractive';

// TODO: allow relative keys to be used in wild and list with a . prefix

function dispose(validator, disposer) {
  if (validator.disposing) validator.disposers.splice(validator.disposers.indexOf(disposer), 1);
}

export class Validator {
  constructor(ractive, debounce = 500) {
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
  }

  reset() {
    this.disposing = true;
    this.disposers.slice().forEach(d => d.cancel());
    this.state = {};
    this.hooks = {};
    this.patternHooks = [];
    this.groupHooks = {};
    this.checks = [];
    this.fns = [];
    this.many = [];
    this.disposing = false;
  }

  check(keys, deps, fn, opts) {
    const ks = Array.isArray(keys) ? keys.slice() : [keys];
    const all = ks.concat(Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []);
    if (typeof deps === 'function') {
      opts = fn;
      fn = deps;
      deps = [];
    }
    const set = [ks, deps, fn, opts && opts.group && (Array.isArray(opts.group) ? opts.group : [opts.group])];
    this.fns.push(set);
    const handle = this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
      checker.call(this, fn, ks, all.map(k => this.ractive.get(k)));
    }, this), { init: opts && opts.init === false ? false : true });
    const disposer = {
      cancel: () => {
        dispose(this, disposer);
        this.fns.splice(this.fns.indexOf(set), 1);
        handle.cancel();
      }
    };
    this.disposers.push(disposer);
    return disposer;
  }

  checkList(path, fn, opts) {
    const checks = {};
    let len = 0;
    const callback = (v, o, k) => {
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
              check: (keys, deps, fn, opts) => {
                const ks = (Array.isArray(keys) ? keys.slice() : [keys]).map(s => s[0] === '.' ? k + s : s);
                const all = ks.concat((Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []).map(s => s[0] === '.' ? k + s : s));
                if (typeof deps === 'function') {
                  opts = fn;
                  fn = deps;
                  deps = [];
                }
                chks.push([ks, this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
                  checker.call(this, fn, ks, all.map(k => this.ractive.get(k)), k);
                }, this), { init: opts && opts.init === false ? false : true })]);
                this.fns.push([ks, deps, fn, opts && opts.group && (Array.isArray(opts.group) ? opts.group : [opts.group])]);
                ks.prefix = k;
              },
              checkList: (path, fn, opts) => {
                chks.push([[], this.checkList(path[0] === '.' ? k + path : path, fn, opts)]);
              },
              checkDefer: (path, fn, opts) => {
                chks.push([[], this.checkDefer(path[0] === '.' ? k + path : path, fn, opts)]);
              }
            };
            fn(k, o, i);
            checks[i] = chks;
          }
        }
        len = v.length;
      }
    };
    const observer = this.ractive.observe(path, debounceMany(this.debounce, callback, this, 2), { init: opts && opts.init === false ? false : true });
    const paths = path.split(/\s+/);
    const handle = [paths, () => {
      paths.forEach(path => {
        const arr = this.ractive.get(path);
        if (!Array.isArray(arr)) return;
        for (let i = 0; i < arr.length; i++) callback(arr[i], undefined, `${path}.${i}`);
      });
    }];
    this.many.push(handle);
    const disposer = {
      cancel: () => {
        dispose(this, disposer);
        const cks = Object.keys(checks);
        cks.forEach(c => {
          cks[c].forEach(([ks, handle]) => {
            handle.cancel();
            const idx = this.fns.findIndex(([k]) => k === ks);
            this.fns.splice(idx, 1);
          });
        });
        let i = this.many.length;
        while (i--) if (this.many[i][1] === callback) this.many.splice(i, 1);
        observer.cancel();
      }
    };
    this.disposers.push(disposer);
    return disposer;
  }

  checkDefer(path, fn, opts) {
    const checks = {};
    const callback = (v, o, k, p) => {
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
          check: (keys, deps, fn, opts) => {
            const ks = (Array.isArray(keys) ? keys.slice() : [keys]).map(s => s[0] === '.' ? k + s : s);
            const all = ks.concat((Array.isArray(deps) ? deps : typeof deps === 'string' ? [deps] : []).map(s => s[0] === '.' ? k + s : s));
            if (typeof deps === 'function') {
              opts = fn;
              fn = deps;
              deps = [];
            }
            chks.push([ks, this.ractive.observe(all.join(' '), debounce(this.debounce, function() {
              checker.call(this, fn, ks, all.map(k => this.ractive.get(k)), k);
            }, this), { init: opts && opts.init === false ? false : true })]);
            this.fns.push([ks, deps, fn, opts && opts.group && (Array.isArray(opts.group) ? opts.group : [opts.group])]);
            ks.prefix = k;
          },
          checkList: (path, fn, opts) => {
            chks.push([[], this.checkList(path[0] === '.' ? k + path : path, fn, opts)]);
          },
          checkDefer: (path, fn, opts) => {
            chks.push([[], this.checkDefer(path[0] === '.' ? k + path : path, fn, opts)]);
          }
        };
        fn(k, o, p);
        checks[k] = chks;
      }
    };
    const observer = this.ractive.observe(path, debounceMany(this.debounce, callback, this, 2), { init: opts && opts.init === false ? false : true });
    const parent = path.split(/\s+/);
    const handle = [parent, () => {
      parent.forEach(path => {
        const obj = this.ractive.get(path);
        if (obj) callback(obj, undefined, path);
      });
    }];
    this.many.push(handle);
    const disposer = {
      cancel: () => {
        dispose(this, disposer);
        const cks = Object.keys(checks);
        cks.forEach(c => {
          cks[c].forEach(([ks, handle]) => {
            handle.cancel();
            const idx = this.fns.findIndex(([k]) => k === ks);
            this.fns.splice(idx, 1);
          });
        });
        let i = this.many.length;
        while (i--) if (this.many[i][1] === callback) this.many.splice(i, 1);
        observer.cancel();
      }
    };
    this.disposers.push(disposer);
    return disposer;
  }

  refresh(path, recurse = true) {
    const paths = Array.isArray(path) ? path : [path];

    paths.forEach(path => {
      if (path.test) {
        for (let i = 0; i < this.many.length; i++) {
          const [kk, refresh] = this.many[i];
          kk.find(k => path.test(k)) && refresh();
        }
      } else {
        for (let i = 0; i < this.many.length; i++) {
          const [ks, refresh] = this.many[i];
          ks.includes(path) && refresh();
        }
      }
    });

    paths.forEach(path => {
      if (path.test) this.fns.forEach(([ks, deps, fn]) => ks.find(k => path.test(k)) && checker.call(this, fn, ks, ks.concat(deps).map(k => this.ractive.get(k)), ks.prefix));
      else this.fns.forEach(([ks, deps, fn]) => ks.includes(path) && checker.call(this, fn, ks, ks.concat(deps).map(k => this.ractive.get(k)), ks.prefix));
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

    const groups = [];
    for (let i = 0; i < this.fns.length; i++) {
      const [ks,,,gs] = this.fns[i];
      if (gs && Array.isArray(ks) && ks.includes(key)) {
        gs.forEach(g => !groups.includes(g) && groups.push(g));
      }
    }
    for (let i = 0; i < groups.length; i++) {
      const hooks = this.groupHooks[groups[i]] || [];
      hooks.forEach(h => h());
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
    if (key.group) key = keysForGroup(this, key.group);
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
    if (key.group) key = keysForGroup(this, key.group);
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

  hook(keys, fn) {
    if (keys.group) {
      const gs = Array.isArray(keys.group) ? keys.group : [keys.group];
      gs.forEach(g => (this.groupHooks[g] || (this.groupHooks[g] = [])).push(fn));
    } else {
      const ks = Array.isArray(keys) ? keys : [keys];
      ks.forEach(key => {
        if (typeof key === 'string') (this.hooks[key] || (this.hooks[key] = [])).push(fn);
        else if (key.test) this.patternHooks.push([key, fn]);
      });
    }

    const disposer = {
      cancel: () => this.unhook(keys, fn, disposer)
    };
    this.disposers.push(disposer);
    return disposer;
  }

  unhook(keys, fn, disposer) {
    if (disposer) dispose(this, disposer);
    if (keys.group) {
      const gs = Array.isArray(keys.group) ? keys.group : [keys.group];
      gs.forEach(key => {
        const arr = this.groupHooks[key] || [];
        const idx = arr.indexOf(fn);
        arr.splice(idx, 1);
      });
    } else {
      const ks = Array.isArray(keys) ? keys : [keys];
      ks.forEach(key => {
        if (typeof key === 'string') {
          const arr = this.hooks[key] || [];
          const idx = arr.indexOf(fn);
          arr.splice(idx, 1);
        } else if (key.test) {
          const idx = this.patternHooks.findIndex(h => h[0] === key && h[1] === fn);
          this.patternHooks.splice(idx, 1);
        }
      });
    }
  }

  decorator(opts = {}) {
    const v = this;
    return function(node, ...keys) {
      const ctx = this.getLocalContext();
      let root = ctx.resolve();

      let ks;
      let keyList;
      function setKeys(keys) {
        const list = keys.join(',');
        if (keyList === list) return false;
        keyList = list;
        if (opts.regex) ks = keys.map(k => typeof k === 'string' ? new RegExp(k) : k)
        else if (opts.group) ks = { group: keys };
        else ks = keys.map(k => ctx.resolve(k));
        return true;
      }
      setKeys(keys);

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
          fn = ev => {
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
        if (tab) return;
        const level = v.level(ks, true);
        syncClass(node, levels, levels[levelMap[level]]);
        if (opts.indicator) {
          if (level !== 'none') indicator.setAttribute('title', messageGroupString(groupMessages(v.messages(ks, true))));
          else indicator.setAttribute('title', '');
        }
      }

      v.hook(ks, hook);

      if (!opts.tab && !opts.regex) setTimeout(hook, v.debounce || 500);

      const res = {
        update(...keys) {
          const old = ks;
          if (setKeys(keys)) {
            v.unhook(old, hook);
            v.hook(ks, hook);
            hook();
          }
        },
        teardown() {
          v.unhook(ks, hook);
          syncClass(node, levels);
          node.style.position = position;
          if (indicator) indicator.remove();
          if (tab) tab[0].removeEventListener('blur', tab[1]);
        },
      }

      if (opts.regex) {
        res.update = function update(...keys) {
          const next = ctx.resolve();
          v.unhook(ks, hook);
          ks = opts.regex ? keys.map(k => typeof k === 'string' ? new RegExp(k) : k) : keys.map(k => ctx.resolve(k));
          v.hook(ks, hook);
          root = next;
          hook();
        }
      } else if (!opts.group) {
        res.shuffled = function shuffled() {
          const next = ctx.resolve();
          if (next !== root) {
            v.unhook(ks, hook);
            ks = opts.regex ? keys.map(k => typeof k === 'string' ? new RegExp(k) : k) : keys.map(k => ctx.resolve(k));
            v.hook(ks, hook);
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
  let notifies;

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
    notifies = notifies || keys.slice();
    const ks = k ? Array.isArray(k) ? k : [k] : keys;
    for (let j = 0; j < ks.length; j++) {
      const key = ks[j];
      if (!notifies.includes(key)) notifies.push(key);
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
    notifies = notifies || keys.slice();
    const ks = k ? Array.isArray(k) ? k : [k] : keys;
    for (let j = 0; j < ks.length; j++) {
      const key = ks[j];
      if (!notifies.includes(key)) notifies.push(key);
      (this.state[key] || (this.state[key] = [])).push([t, m]);
    }
  }

  checks.messages = res;

  // notify the hooks that stuff changed
  if (changed) {
    notifies.forEach(key => this.notify(key, true));
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

function debounceMany(time, fn, context, which) {
  const tms = {};
  return function(...args) {
    if (tms[args[which]]) return;
    else {
      tms[args[which]] = setTimeout(function() {
        fn.apply(context, args);
        tms[args[which]] = null;
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

function keysForGroup(validator, group) {
  const grps = Array.isArray(group) ? group : [group];
  const res = [];
  for (let i = 0; i < grps.length; i++) {
    const fns = validator.fns;
    for (let j = 0; j < fns.length; j++) {
      const ks = fns[j][0];
      if (Array.isArray(ks) && fns[j][3] && fns[j][3].includes(grps[i])) {
        for (let c = 0; c < ks.length; c++) {
          if (!res.includes(ks[c])) res.push(ks[c]);
        }
      }
    }
  }
  return res;
}

function groupMessages(messages) {
  const res = [];
  let cur = messages.filter(m => m[0] === 'error');
  if (cur.length) res.push(['Errors', cur.map(m => m[1])]);
  cur = messages.filter(m => m[0] === 'warn');
  if (cur.length) res.push(['Warnings', cur.map(m => m[1])]);
  cur = messages.filter(m => m[0] === 'info' || m[0] === 'none');
  if (cur.length) res.push(['Info', cur.map(m => m[1])]);
  return res;
}

function messageGroupString(groups) {
  if (groups.length === 1) return groups[0][1].join('\n');
  return groups.map(g => `${g[0]}:\n${g[1].join('\n')}`).join('\n\n');
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

const probably = 'should probably';
export function required(name, level = 'error') { return v => { if (!v) return [[level, `${name} ${level !== 'error' ? 'should probably be provided' : 'is required'}`]]; } }
export function lt(name, num, level = 'error') { return v => { if (v >= num) return [[level, `${name} ${level !== 'error' ? probably : 'must'} be at most ${num - 1}`]]; }; }
export function lte(name, num, level = 'error') { return v => { if (v > num) return [[level, `${name} ${level !== 'error' ? probably : 'must'} be at most ${num}`]]; }; }
export function gt(name, num, level = 'error') { return v => { if (v <= num) return [[level, `${name} ${level !== 'error' ? probably : 'must'} be at least ${num + 1}`]]; }; }
export function gte(name, num, level = 'error') { return v => { if (v <= num) return [[level, `${name} ${level !== 'error' ? probably : 'must'} be at least ${num}`]]; }; }
export function between(name, lower, upper, level = 'error') { return v => { if (v < lower || v > upper) return [[level, `${name} ${level !== 'error' ? probably : 'must'} be between ${lower} and ${upper}`]]; }; }

