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

var observables = ['value', 'masked', 'display'];

function masked(node, opt1, opt2, opt3) {
	var ctx = this.getContext(node);

	var opts;
	if (typeof opt1 === 'object') { opts = opt1; }
	else if (typeof opt2 === 'object') { opts = opt2; }
	else if (typeof opt3 === 'object') { opts = opt3; }
	else { opts = {}; }

	if (typeof opt1 === 'string') { opts.mask = opt1; }
	if (typeof opt2 === 'string') { opts.bind = opt2; }

	opts.mask = opts.mask || '';
	opts.masks = opts.masks || masked.defaults.masks;
	opts.maskChars = '';
	opts.bind_value = opts.bindValue || opts.bind;
	opts.bind_masked = opts.bindMasked;
	opts.bind_display = opts.bindDisplay;

	for (var k in opts.masks) {
		if (k.length > 1) {
			for (var i = 0; i < k.length; i++) { opts.masks[k[i]] = opts.masks[k]; }
		}
	}

	var value = {};
	var bound = {};
	var observe;
	var sync;

	function update(init, nav) {
		// if this isn't a focus event and there's more than one character selected, all bets are off, let the user do whatever
		if (!init && Math.abs(node.selectionEnd - node.selectionStart) > 1) { return; }

		var cursor = node.selectionStart;

		var val = node.value;
		var mask = opts.mask;
		var len = mask.length;
		var res = '';
		var unmasked = '';
		var masked = '';
		var last = 0;
		var range = 0;

		for (var i = 0, j = 0; i < len; i++) {
			var m = opts.masks[mask[i]];
			var match = j < val.length && m && m.test(val[j]);

			if (match) {
				unmasked += val[j];
				masked += val[j];
				res += val[j++];
				last = i + 1;
			} else {
				// if looking for a mask match, skip forward in val until one is found
				if (m) {
					while (!match && j++ < val.length) {
						match = m.test(val[j]);
					}
					if (match && last === i) { range--; }
				} else if (last === i) {
					last = i + 1;
					range++;
					masked += mask[i];
				}

				if (!match) { res += mask[i]; }
				else { i--; }
			}
		}

		value.value = unmasked;
		value.masked = masked;
		value.display = res;

		node.value = res;

		// update the cursor position and selection if necessary
		if (init) { cursor = last; } // on initial focus, select the last mask char
		else if (!nav) { // don't adjust stuff on nav keys
			if (cursor > last + range || (last + range <= mask.length && cursor + range === last)) { cursor = last; }
			for (var i$1 = cursor; i$1 <= len; i$1++) {
				if (opts.masks[mask[i$1]]) { break; }
				cursor++;
			}
		}

		// if not a nav key, select the char or value
		if (!nav) {
			if (init && cursor === mask.length) { node.setSelectionRange(0, cursor + 1); }
			else { node.setSelectionRange(cursor, cursor + 1); }
		} else { node.setSelectionRange(cursor, cursor); } // otherwise move the cursor back to where it should be

		if (sync && opts.lazy === false) {
			sync();
		}
	}

	observables.forEach(function (k) {
		if (opts[("bind_" + k)]) {
			if (!observe) { observe = {}; }
			observe[k] = ctx.observe(opts[("bind_" + k)], function (v) {
				node.value = v;
				update(false, false);
			}, { init: false });
			bound[k] = ctx.get(opts[("bind_" + k)]);
		}
	});

	if (observe) {
		sync = function(e) {
			observables.forEach(function (k) {
				if (observe[k] && value[k] !== bound[k]) {
					observe[k].silence();
					ctx.set(opts[("bind_" + k)], value[k]);
					bound[k] = value[k];
					observe[k].resume();
				}
			});
		};

		ctx.listen('blur', sync);
	}

	var listener = function(e) {
		update(e.type === 'focus', e.key && (~e.key.indexOf('Arrow') || ~e.key.indexOf('Backspace') || ~e.key.indexOf('Del')));
	};

	ctx.listen('keyup', listener);
	ctx.listen('focus', listener);

	// initialize the input mask
	node.value = bound.value || bound.masked || bound.display || opts.mask;
	if (observe) {
		update(false, false);
	}

	return {
		teardown: function teardown() {
			ctx.unlisten('keyup', listener);
			ctx.unlisten('focus', listener);
			if (observe) {
				ctx.unlisten('blur', sync);
				observables.forEach(function (k) { return observe[k] && observe[k].cancel(); });
			}
		}
	};
}

masked.defaults = {
	masks: {
		'#': /\d/,
		'?': /\w/,
		'@': /[a-zA-Z]/
	}
};

globalRegister('masked', 'decorators', masked);

export default masked;
