import globalRegister from './globalRegister';

const observables = ['value', 'masked', 'display'];

function masked(node, opt1, opt2, opt3) {
	const ctx = this.getContext(node);

	let opts;
	if (typeof opt1 === 'object') opts = opt1;
	else if (typeof opt2 === 'object') opts = opt2;
	else if (typeof opt3 === 'object') opts = opt3;
	else opts = {};

	if (typeof opt1 === 'string') opts.mask = opt1;
	if (typeof opt2 === 'string') opts.bind = opt2;

	opts.mask = opts.mask || '';
	opts.masks = opts.masks || masked.defaults.masks;
	opts.maskChars = '';
	opts.bind_value = opts.bindValue || opts.bind;
	opts.bind_masked = opts.bindMasked;
	opts.bind_display = opts.bindDisplay;

	for (const k in opts.masks) {
		if (k.length > 1) {
			for (let i = 0; i < k.length; i++) opts.masks[k[i]] = opts.masks[k];
		}
	}

	let value = {};
	let bound = {};
	let observe;
	let sync;

	const orig = {
		val: node.value
	};

	function update(init, nav) {
		// if this isn't a focus event and there's more than one character selected, all bets are off, let the user do whatever
		if (!init && Math.abs(node.selectionEnd - node.selectionStart) > 1) return;

		let cursor = node.selectionStart;

		const val = node.value;
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
				res += val[j++];
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

				if (!match) res += mask[i];
				else i--;
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
		if (!nav) {
			if (init && cursor === mask.length) node.setSelectionRange(0, cursor + 1);
			else node.setSelectionRange(cursor, cursor + 1);
		} else node.setSelectionRange(cursor, cursor); // otherwise move the cursor back to where it should be

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
		teardown() {
			ctx.unlisten('keyup', listener);
			ctx.unlisten('focus', listener);
			if (observe) {
				ctx.unlisten('blur', sync);
				observables.forEach(k => observe[k] && observe[k].cancel());
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
