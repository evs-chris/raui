import globalRegister from './globalRegister';

const observables = ['value', 'masked', 'display'];

export function masked(options = {}) {
	return function(node, opt1, opt2, opt3) {
		const ctx = this.getContext(node);

		let opts = Object.assign({}, masked.defaults, options);
		if (typeof opt1 === 'object') Object.assign(opts, opt1);
		else if (typeof opt2 === 'object') Object.assign(opts, opt2);
		else if (typeof opt3 === 'object') Object.assign(opts, opt3);

		if (typeof opt1 === 'string') {
      if (opts.mask) opts.value = opt1;
      else opts.mask = opt1;
    }
		if (typeof opt2 === 'string') {
      if (opts.value) opts.mask = opt2;
      else opts.value = opt2;
    }

		opts.mask = opts.mask || '';
		opts.masks = opts.masks || masked.defaults.masks;
		opts.maskChars = '';
		opts.bind_value = opts.value;
		opts.bind_masked = opts.masked;
		opts.bind_display = opts.display;

		for (const k in opts.masks) {
			if (k.length > 1) {
				for (let i = 0; i < k.length; i++) opts.masks[k[i]] = opts.masks[k];
			}
		}

		let value = {};
		let bound = {};
		let observe;
		let sync;

		function update(init, nav, blur) {
      const blurred = blur || document.activeElement !== node;

      if (init && opts.privateMask) {
        const start = node.selectionStart;
        const end = node.selectionEnd;
        node.value = value.masked;
        node.selectionStart = start;
        node.selectionEnd = end;
      }

			// if this isn't a focus event and there's more than one character selected, all bets are off, let the user do whatever
			if (!blurred && !init && Math.abs(node.selectionEnd - node.selectionStart) > 1) return;

			let cursor = node.selectionStart;

			const val = node.value || '';
			const mask = opts.mask;
			const len = mask.length;
			let res = '';
			let unmasked = '';
			let masked = '';
			let last = 0;
			let range = 0;

			for (let i = 0, j = 0; i < len; i++) {
				const m = opts.masks[mask[i]];
				let match = j < val.length && m && m.test(val[j])

				if (match) {
					unmasked += val[j];
					masked += val[j];
          if (blurred && opts.privateMask) res += opts.masks[opts.privateMask[i]] ? val[j++] : opts.privateMask[(j++, i)];
					else res += val[j++];
					last = i + 1;
				} else {
					// if looking for a mask match, skip forward in val until one is found
					if (m) {
						while (!match && j++ < val.length) {
							match = m.test(val[j]);
						}
						if (match && last === i) range--;
					} else if (last === i) {
						last = i + 1;
						range++;
						masked += mask[i];
					}

					if (!match) {
						if (opts.blurMask && blurred && m) res += opts.blurMask[0];
						else res += mask[i];
					}	else i--;
				}
			}

			value.value = unmasked;
			value.masked = masked;
			value.display = res;

			node.value = res;

			// update the cursor position and selection if necessary
			if (init) cursor = last; // on initial focus, select the last mask char
			else if (!nav) { // don't adjust stuff on nav keys
				if (cursor > last + range || (last + range <= mask.length && cursor + range === last)) cursor = last;
				for (let i = cursor; i <= len; i++) {
					if (opts.masks[mask[i]]) break;
					cursor++;
				}
			}

			// if not a nav key, select the char or value
			if (document.activeElement === node && typeof node.setSelectionRange === 'function') {
				if (!nav) {
					if (init && cursor === mask.length) node.setSelectionRange(0, cursor + 1);
					else node.setSelectionRange(cursor, cursor + 1);
				} else node.setSelectionRange(cursor, cursor); // otherwise move the cursor back to where it should be
			}

			if (sync && opts.lazy === false) {
				sync();
			}
		}

		observables.forEach(k => {
			if (opts[`bind_${k}`]) {
				if (!observe) observe = {};
				observe[k] = ctx.observe(opts[`bind_${k}`], v => {
					node.value = v;
					update(false, false);
				}, { init: false });
				bound[k] = ctx.get(opts[`bind_${k}`]);
			}
		});

		if (observe) {
			sync = function(e) {
				observables.forEach(k => {
					if (observe[k] && value[k] !== bound[k]) {
						observe[k].silence();
						ctx.set(opts[`bind_${k}`], value[k]);
						bound[k] = value[k];
						observe[k].resume();
					}
				});
			};

			ctx.listen('blur', sync);
		}

		const listener = function(e) {
			update(e.type === 'focus', e.key && (~e.key.indexOf('Arrow') || ~e.key.indexOf('Backspace') || ~e.key.indexOf('Del')), e.type === 'blur');
		};

		ctx.listen('focus', listener);
		// yech
		if (window.navigator && ~window.navigator.userAgent.indexOf('Android')) ctx.listen('input', listener);
		else ctx.listen('keyup', listener);

		// initialize the input mask
		node.value = bound.value || bound.masked || bound.display || opts.mask;
		update(false, false);
		ctx.listen('blur', listener);

		return {
			teardown() {
				ctx.unlisten('keyup', listener);
				ctx.unlisten('focus', listener);
				ctx.unlisten('blur', listener);
				if (observe) {
					ctx.unlisten('blur', sync);
					observables.forEach(k => observe[k] && observe[k].cancel());
				}
			},
      shuffled() {
        observables.forEach(k => {
          if (opts[`bind_${k}`]) {
            bound[k] = ctx.get(opts[`bind_${k}`]);
          }
        });
      }
		};
	}
}

masked.defaults = {
	masks: {
		'#': /\d/,
		'?': /\w/,
		'@': /[a-zA-Z]/
	}
};

export function plugin(opts = {}) {
	return function({ instance }) {
		instance.decorators[opts.name || 'masked'] = masked(opts);
	}
}

globalRegister('masked', 'decorators', masked);

export default plugin;
